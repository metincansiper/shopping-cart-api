import express from 'express';
import UserController from '../../../controller/UserController';
import UserRepository from '../../../core/repository/UserRepository';
import HttpRequestParams from '../../../param/HttpRequestParams';
import { makeHttpReqParams, sendExpressResponse, passError, makeError, handleRoute } from '../util';

const userRouter = (userRepository: UserRepository) => {
    const router = express.Router();
    const controller = new UserController(userRepository);

    router.get('/user', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        handleRoute(req, res, next, async (httpReqParams: HttpRequestParams) => await controller.getUser(httpReqParams));
    });

    router.post('/user', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        handleRoute(req, res, next, async (httpReqParams: HttpRequestParams) => await controller.createUser(httpReqParams));
    });

    return router;
};

export default userRouter;