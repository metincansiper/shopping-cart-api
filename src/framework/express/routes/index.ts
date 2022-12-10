import express from "express";
import itemRouter from "./item";
import productRouter from "./product";
import userRouter from "./user";

// TODO: do not use any type here
const apiRouter = (dependencies: any) => {
    const routes = express.Router();
    const { userRepository, productRepository, itemRepository } = dependencies;

    const usersRouter = userRouter(userRepository);
    const productsRouter = productRouter(productRepository);
    const itemsRouter = itemRouter(itemRepository);
    
    routes.use('/user', usersRouter);
    routes.use('/product', productsRouter);
    routes.use('/item', itemsRouter);
    
    return routes;
};

export default apiRouter;