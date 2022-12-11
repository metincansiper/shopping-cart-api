import Datastore from "../enum/datastore";
import MongoConnectionHandler from "../framework/mongodb/MongoConnectionHandler";
import MongoItemRepository from "../framework/mongodb/repository/MongoItemRepository";
import MongoProductRepository from "../framework/mongodb/repository/MongoProductRepository";
import MongoUserRepository from "../framework/mongodb/repository/MongoUserRepository";

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

const makeMongoDependencies = () => {
    const dependencies = {
        itemRepository: new MongoItemRepository(),
        productRepository: new MongoProductRepository(),
        userRepository: new MongoUserRepository(),
        connectionHandler: new MongoConnectionHandler()
    };

    return dependencies;
};

