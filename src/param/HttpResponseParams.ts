interface HttpResponseOptions {
    header?: Object, 
    statusCode?: number, 
    data?: Object
}

class HttpResponseParams {
    header?: Object;
    statusCode?: number; 
    data?: Object;

    constructor({header, statusCode, data }: HttpResponseOptions = {}) {
        this.header = header;
        this.statusCode = statusCode;
        this.data = data;
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

    toJson(): HttpResponseOptions {
        return {
            data: this.getData(),
            statusCode: this.getStatusCode(),
            header: this.getHeader()
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