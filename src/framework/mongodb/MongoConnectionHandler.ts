import { connect } from 'mongoose';

class MongoConnectionHandler implements DBConnectionHandler {
    async connect(): Promise<void> {
        // TODO: build url with the parameters from the configuration file
        const url = 'mongodb://127.0.0.1:27017/shoppingcart';
        await connect(url);
    }
}

export default MongoConnectionHandler;