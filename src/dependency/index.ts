import Datastore from "../enum/datastore";
import { makeInmemoryDependencies } from "./inmemory";
import { makeMongoDependencies } from "./mongo";

export const makeDependencies = (datastoreName: string) => {
    switch (datastoreName) {
        case Datastore.MONGO:
            return makeMongoDependencies();
            break;
        
        case Datastore.INMEMORY:
            return makeInmemoryDependencies();
            break;

        default:
            throw Error('Invalid datastoradge type');
            break;
    } 
}

