import Datastore from "../enum/datastore";
import { makeDependencies } from "./dependency";

export const datastore: string = process.env.DATASTORE || Datastore.MONGO;
export const dependencies = makeDependencies(datastore);