interface HttpResponseOptions {
    headers?: Object, 
    statusCode?: number, 
    data?: Object, 
    isError?: Boolean, 
    errorMessage?: String
}

class HttpResponseParams {
    headers?: Object;
    statusCode?: number; 
    data?: Object;
    isError?: Boolean;
    errorMessage?: String;

    constructor({headers, statusCode, data, isError=false, errorMessage}: HttpResponseOptions = {}
    ) {
        this.headers = headers;
        this.statusCode = statusCode;
        this.data = data;
        this.isError = isError;
        this.errorMessage = errorMessage;
    }
    
    getHeaders(): Object | undefined {
        return this.headers;
    }

    getStatusCode(): number | undefined {
        return this.statusCode;
    }

    getData(): Object | undefined {
        return this.data;
    }

    getIsError(): Boolean | undefined {
        return this.isError;
    }

    setIsError(isError: Boolean): void {
        this.isError = isError;
    }

    getErrorMessage(): String | undefined {
        return this.errorMessage;
    }

    setErrorMessage(): void {
        this.errorMessage = this.errorMessage;
    }

    toJson(): HttpResponseOptions {
        return {
            data: this.getData(),
            statusCode: this.getStatusCode(),
            headers: this.getHeaders(),
            isError: this.getIsError(),
            errorMessage: this.getErrorMessage()
        }
    }

    setStatusCode(statusCode: number): void {
        this.statusCode = statusCode;
    }

    setData(data: Object): void {
        this.data = data;
    }
}

module.exports = HttpResponseParams;