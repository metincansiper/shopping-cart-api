interface HttpResponseOptions {
    header?: Object, 
    statusCode?: number, 
    data?: Object, 
    isError?: Boolean, 
    errorMessage?: string
}

class HttpResponseParams {
    header?: Object;
    statusCode?: number; 
    data?: Object;
    isError?: Boolean;
    errorMessage?: string;

    constructor({header, statusCode, data, isError=false, errorMessage}: HttpResponseOptions = {}
    ) {
        this.header = header;
        this.statusCode = statusCode;
        this.data = data;
        this.isError = isError;
        this.errorMessage = errorMessage;
    }

    getHeader(): Object | undefined {
        return this.header;
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

    getErrorMessage(): string | undefined {
        return this.errorMessage;
    }

    setErrorMessage(): void {
        this.errorMessage = this.errorMessage;
    }

    toJson(): HttpResponseOptions {
        return {
            data: this.getData(),
            statusCode: this.getStatusCode(),
            header: this.getHeader(),
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

export default HttpResponseParams;