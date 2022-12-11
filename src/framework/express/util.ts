import express from "express";
import HttpErrorParams from "../../param/HttpErrorParams";
import HttpRequestParams from "../../param/HttpRequestParams";
import HttpResponseParams from "../../param/HttpResponseParams";

export const makeHttpReqParams = (req: express.Request): HttpRequestParams => {
    const { path, method, params, query, body } = req;
    const paramsObj = {
        path,
        method,
        pathParams: params,
        queryParams: query,
        body
    };

    const reqParams: HttpRequestParams = new HttpRequestParams(paramsObj);
    return reqParams;
}

export const prepareExpressResponse = (res: express.Response, resParams: HttpResponseParams): void => {
    const { header, statusCode } = resParams.toJson();
    if ( header ) {
        res.header(header);
    }
    if ( statusCode ) {
        res.statusCode = statusCode;
    }
};

export const sendExpressResponse = (res: express.Response, resParams: HttpResponseParams): void => {
    prepareExpressResponse(res, resParams);
    const data = resParams.getData();
    res.send(data);
};

export const makeError = (errorParams: HttpErrorParams): Error => {
    const error: any = new Error(errorParams.getMessage());
    const code = errorParams.getStatusCode();
    error.code = code;
    return error;
};

export const passError = (errorParams: HttpErrorParams, next: express.NextFunction): void => {
    const error = makeError(errorParams);
    next(error);
};

export const handleRoute = async (req: express.Request, res: express.Response, next: express.NextFunction, controllerFunction: Function) => {
    const httpReqParams: HttpRequestParams = makeHttpReqParams(req);
    const [httpResParams, httpErrParams] = await controllerFunction(httpReqParams);
    if (httpErrParams) {
        passError(httpErrParams, next);
    }
    else if (httpResParams) {
        sendExpressResponse(res, httpResParams);
    }
};