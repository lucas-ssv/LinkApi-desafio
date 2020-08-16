import { DealsController } from 'pipedrive';
import jsonxml from 'jsontoxml';
import axios from 'axios';

class OrdersController {
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
            
            await axios.post(`https://bling.com.br/Api/v2/pedido/json/?apikey=${process.env.BLING_API_KEY}&xml=${xml}`)
        });
        
        return res.json(deals);
    }
}

export default new OrdersController();