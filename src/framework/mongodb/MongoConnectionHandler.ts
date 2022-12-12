import { connect } from 'mongoose';
import { MONGO_HOST, MONGO_PORT, MONGO_DATABASE } from '../../config';

class MongoConnectionHandler implements DBConnectionHandler {
    async connect(): Promise<void> {
        const url = `${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;
        await connect(url);
    }
}

export default MongoConnectionHandler;