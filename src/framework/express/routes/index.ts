import express from "express";
import UserRepository from "../../../core/repository/UserRepository";
import userRouter from "./user";

const apiRouter = (dependencies: { userRepository: UserRepository }) => {
    const routes = express.Router();
    const { userRepository } = dependencies;
    const usersRouter = userRouter(userRepository);
    routes.use(usersRouter);
    return routes;
};

export default apiRouter;