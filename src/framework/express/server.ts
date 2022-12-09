import express from 'express';
import bodyParser from 'body-parser';
import apiRouter from './routes';
import UserRepository from '../../core/repository/UserRepository';
import MongoUserRepository from '../mongodb/repository/MongoUserRepository';

const createServer = () => {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // TODO: initialize this based on related environment variable
    const userRepository: UserRepository = new MongoUserRepository();
    app.use('/api', apiRouter({ userRepository }));

    const listen = (port: string | number, callback: (() => void)) => {
        app.listen(port, callback);
    }

    return { app, listen };
}

export default createServer;
