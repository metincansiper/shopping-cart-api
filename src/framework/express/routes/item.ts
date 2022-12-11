import express from 'express';
import ItemController from '../../../controller/ItemController';
import ItemRepository from '../../../core/repository/ItemRepository';
// import ProductController from '../../../controller/ProductController';
// import UserController from '../../../controller/UserController';
import ProductRepository from '../../../core/repository/ProductRepository';
import HttpRequestParams from '../../../param/HttpRequestParams';
import { handleRoute } from '../util';

const itemRouter = (itemRepository: ItemRepository) => {
    const router = express.Router();
    const controller = new ItemController(itemRepository);

    router.post('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        handleRoute(req, res, next, async (httpReqParams: HttpRequestParams) => await controller.createItem(httpReqParams));
    });

    router.delete('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        handleRoute(req, res, next, async (httpReqParams: HttpRequestParams) => await controller.deleteItem(httpReqParams));
    });

    router.patch('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        handleRoute(req, res, next, async (httpReqParams: HttpRequestParams) => await controller.updateItemQuantity(httpReqParams));
    });

    return router;
};

export default itemRouter;