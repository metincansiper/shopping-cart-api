import Datastore from "../enum/datastore";
import { makeMongoDependencies } from "./mongo";

export const makeDependencies = (datastoreName: string) => {
    switch (datastoreName) {
        case Datastore.MONGO:
            return makeMongoDependencies();
            break;

        default:
            throw Error('Invalid datastoradge type');
            break;
    } 
}

