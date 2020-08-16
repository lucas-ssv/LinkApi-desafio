import { DealsController } from 'pipedrive';
import js2xmlparser from 'js2xmlparser';

class OrdersController {
    async index(req, res) {
        const deals = await DealsController.getAllDeals({ status: 'won' });

        console.log(js2xmlparser.parse("pedido", {
            name: "test",
            age: 10
        }));
        
        return res.json(deals);
    }
}

export default new OrdersController();