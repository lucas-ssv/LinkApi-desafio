import { Router } from 'express';
import OrdersController from './app/controllers/OrdersController';

const routes = new Router();

routes.get('/', OrdersController.index);

export default routes;