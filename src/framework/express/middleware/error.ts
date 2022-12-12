import type { ErrorRequestHandler } from "express";
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const code = err.code || 400;
    res.status(code).send({ error: err.message });
};

export default errorHandler;