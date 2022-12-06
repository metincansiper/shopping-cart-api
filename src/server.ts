import express from 'express';
const app = express();

const createServer = () => {
    app.get('/', (req: express.Request, res: express.Response) => {
        res.send('Hello World!');
    });

    return app;
}

export default createServer;
