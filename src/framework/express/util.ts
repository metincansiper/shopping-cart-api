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
    error.code = errorParams.getStatusCode();
    return error;
};

export const passError = (errorParams: HttpErrorParams, next: express.NextFunction): void => {
    next(makeError(errorParams));
};