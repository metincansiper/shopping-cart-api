import express from "express";
import UserRepository from "../../../core/repository/UserRepository";
import productRouter from "./product";
import userRouter from "./user";

// TODO: do not use any type here
const apiRouter = (dependencies: any) => {
    const routes = express.Router();
    const { userRepository, productRepository } = dependencies;
    const usersRouter = userRouter(userRepository);
    const productsRouter = productRouter(productRepository);
    routes.use('/user', usersRouter);
    routes.use('/product', productsRouter);
    return routes;
};

export default apiRouter;