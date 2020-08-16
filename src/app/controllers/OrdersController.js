import { DealsController } from 'pipedrive';
import jsonxml from 'jsontoxml';
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
                pedido: {
                    cliente: {
                        nome: deal.person_name,
                    },
                    items: {
                        item: {
                            codigo: deal.id,
                            descricao: deal.title,
                            qtde: 1,
                            vlr_unit: deal.value,
                        }
                    }
                }
            };

            let xml = jsonxml(item);
            
            await axios.post(`https://bling.com.br/Api/v2/pedido/json/?apikey=${process.env.BLING_API_KEY}&xml=${xml}`);

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
        
        return res.json({ success: 'Order released with success!' });
    }
}

export default new OrdersController();