import express from "express";
import UserRepository from "../../../core/repository/UserRepository";
import userRouter from "./user";

// TODO: do not use any type here
const apiRouter = (dependencies: any) => {
    const routes = express.Router();
    const { userRepository } = dependencies;
    const usersRouter = userRouter(userRepository);
    routes.use(usersRouter);
    return routes;
};

export default apiRouter;