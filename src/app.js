import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import lib from 'pipedrive';

import routes from './routes';

import './database';

class App {
    constructor() {
        this.server = express();

        lib.Configuration.apiToken = process.env.API_TOKEN;

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;