import { Router } from 'express';
import OrdersController from './app/controllers/OrdersController';

const routes = new Router();

routes.post('/', OrdersController.store);

export default routes;