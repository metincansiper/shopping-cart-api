import Datastore from "../enum/datastore";

export const datastoreName: string = process.env.DATASTORE || Datastore.MONGO;