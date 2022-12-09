import express from 'express';
import UserController from '../../../controller/UserController';
import UserRepository from '../../../core/repository/UserRepository';
import HttpRequestParams from '../../../param/HttpRequestParams';
import { makeHttpReqParams, sendExpressResponse, passError } from '../util';

const userRouter = (userRepository: UserRepository) => {
    const router = express.Router();
    const controller = new UserController(userRepository);

    router.get('/user', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const httpReqParams: HttpRequestParams = makeHttpReqParams(req);
        const [httpResParams, httpErrParams] = await controller.getUser(httpReqParams);
        if (httpErrParams) {
            passError(httpErrParams, next);
        }
        else if (httpResParams) {
            sendExpressResponse(res, httpResParams);
        }
    });

    return router;
};

export default userRouter;