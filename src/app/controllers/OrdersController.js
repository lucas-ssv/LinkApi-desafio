import { DealsController } from 'pipedrive';
import jsonxml from '../../utils/jsontoxml';
import axios from 'axios';

import Order from '../schemas/Order';

class OrdersController {
    async index(req, res) {
        const orders = await Order.find();

        return res.json(orders);
    }

    async store(req, res) {
        const deals = await DealsController.getAllDeals({ status: 'won' });

        deals.data.forEach(async deal => {
            const item = {
                name: deal.person_name,
                code: deal.id,
                description: deal.title,
                qtde: 1,
                value: deal.value,
            };

            let xml = jsonxml(item);
            
            await axios.post(`
                ${process.env.BLING_APP_URL}/pedido/json/?apikey=${process.env.BLING_API_KEY}&xml=${xml}
            `);

            await Order.create({
                id: deal.id,
                owner: {
                    name: deal.user_id.name,
                    email: deal.user_id.email,
                },
                customer: {
                    name: deal.person_name,
                },
                item: {
                    code: deal.id,
                    description: deal.title,
                    qtde: 1,
                    value: deal.value,
                }
            });
        });
        
        return res.status(200).json({ success: 'Order released with success!' });
    }
}

export default new OrdersController();