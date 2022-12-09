interface HttpErrorOptions {
    statusCode?: number,
    message?: string
};

class HttpErrorParams {
    statusCode?: number;
    message?: string;

    constructor({statusCode, message}: HttpErrorOptions ={}) {
        this.statusCode = statusCode;
        this.message = message;
    }

    getMessage(): string | undefined {
        return this.message;
    }

    getStatusCode(): number | undefined {
        return this.statusCode;
    }
};

export default HttpErrorParams;