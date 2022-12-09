interface HttpRequestOptions {
    path?: string,
    method?: string, 
    queryParams?: Object, 
    pathParams?: Object, 
    body?: Object
}

class HttpRequestParams {
    path?: string;
    method?: string;
    queryParams?: Object;
    pathParams?: Object;
    body?: Object;

    constructor({ path, method, queryParams, pathParams, body }: HttpRequestOptions = {}) {
        this.path = path;
        this.method = method;
        this.queryParams = queryParams;
        this.pathParams = pathParams;
        this.body = body;
    }

    getPath(): string | undefined {
        return this.path;
    }

    getMethod(): string | undefined {
        return this.method;
    }

    getQueryParams(): Object | undefined {
        return this.queryParams;
    }

    getPathParams(): Object | undefined {
        return this.pathParams;
    }

    getBody(): Object | undefined {
        return this.body;
    }

    toJson(): HttpRequestOptions {
        return {
            path: this.getPath(),
            method: this.getMethod(),
            queryParams: this.getQueryParams(),
            pathParams: this.getPathParams(),
            body: this.getBody()
        }
    }
}

export default HttpRequestParams;