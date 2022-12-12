import Datastore from "../enum/datastore";

export const PORT = process.env.PORT || 3000;
export const DATASTORE_NAME: string = process.env.DATASTORE || Datastore.MONGO;
export const MONGO_HOST: string = process.env.MONGO_HOST || 'mongodb://127.0.0.1';
export const MONGO_PORT: string = process.env.MONGO_PORT || '27017';
export const MONGO_DATABASE: string = 'shoppingcart';
