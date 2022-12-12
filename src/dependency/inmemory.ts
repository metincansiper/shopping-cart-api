import InmemoryConnectionHandler from "../framework/inmemory/InmemoryConnectionHandler";
import InmemoryItemRepository from "../framework/inmemory/repository/InmemoryItemRepository";
import InmemoryProductRepository from "../framework/inmemory/repository/InmemoryProductRepository";
import InmemoryUserRepository from "../framework/inmemory/repository/InmemoryUserRepository";

export const makeInmemoryDependencies = () => {
    const dependencies = {
        itemRepository: new InmemoryItemRepository(),
        productRepository: new InmemoryProductRepository(),
        userRepository: new InmemoryUserRepository(),
        connectionHandler: new InmemoryConnectionHandler()
    };

    return dependencies;
};