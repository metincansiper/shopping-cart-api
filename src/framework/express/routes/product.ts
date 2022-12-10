import express from 'express';
import ProductController from '../../../controller/ProductController';
import UserController from '../../../controller/UserController';
import ProductRepository from '../../../core/repository/ProductRepository';
import HttpRequestParams from '../../../param/HttpRequestParams';
import { handleRoute } from '../util';

const productRouter = (productRepository: ProductRepository) => {
    const router = express.Router();
    const controller = new ProductController(productRepository);

    router.post('/product', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        handleRoute(req, res, next, async (httpReqParams: HttpRequestParams) => await controller.createProduct(httpReqParams));
    });

    router.get('/product', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        handleRoute(req, res, next, async (httpReqParams: HttpRequestParams) => await controller.searchProducts(httpReqParams));
    });

    return router;
};

export default productRouter;