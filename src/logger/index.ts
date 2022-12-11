class Logger {
    static warn(message: any) {
        console.warn(message);
    }

    static log(message: any) {
        console.log(message);
    }

    static error(message: any) {
        console.error(message);
    }
};

export default Logger;