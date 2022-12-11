import MongoConnectionHandler from "../framework/mongodb/MongoConnectionHandler";
import MongoItemRepository from "../framework/mongodb/repository/MongoItemRepository";
import MongoProductRepository from "../framework/mongodb/repository/MongoProductRepository";
import MongoUserRepository from "../framework/mongodb/repository/MongoUserRepository";

export const makeMongoDependencies = () => {
    const dependencies = {
        itemRepository: new MongoItemRepository(),
        productRepository: new MongoProductRepository(),
        userRepository: new MongoUserRepository(),
        connectionHandler: new MongoConnectionHandler()
    };

    return dependencies;
};