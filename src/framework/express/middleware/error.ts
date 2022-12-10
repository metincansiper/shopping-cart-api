import express from "express";
const errorHandler = (err: any, req: express.Request, res: express.Response) => {
    const code = err.code || 400;
    res.status(code).send(err.message);
};

export default errorHandler;