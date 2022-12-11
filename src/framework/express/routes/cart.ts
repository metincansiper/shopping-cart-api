import express from 'express';
import CartController from "../../../controller/CartController";
import ItemRepository from "../../../core/repository/ItemRepository";
import ProductRepository from "../../../core/repository/ProductRepository";
import HttpRequestParams from '../../../param/HttpRequestParams';
import { handleRoute } from '../util';

const cartRouter = (itemRepository: ItemRepository, productRepository: ProductRepository) => {
    const router = express.Router();
    const controller = new CartController(itemRepository, productRepository);

    router.get('/calculate', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        handleRoute(req, res, next, async (httpReqParams: HttpRequestParams) => await controller.calculateTotalPrice(httpReqParams));
    });

    return router;
};

export default cartRouter;