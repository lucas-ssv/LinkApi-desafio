import express from 'express';
import lib from 'pipedrive';

import routes from './routes';

class App {
    constructor() {
        this.server = express();

        lib.Configuration.apiToken = 'f4f824b125e0a3b55e08ce07540d038f48d6c0df';

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