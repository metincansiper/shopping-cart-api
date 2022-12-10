import express from 'express';
import bodyParser from 'body-parser';
import apiRouter from './routes';
import errorHandler from './middleware/error';

const createServer = (dependencies: any) => {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/api', apiRouter(dependencies));
    // app.use(errorHandler);

    const listen = (port: string | number, callback: (() => void)) => {
        app.listen(port, callback);
    }

    return { app, listen };
}

export default createServer;
