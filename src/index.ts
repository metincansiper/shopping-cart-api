import ItemRepository from './core/repository/ItemRepository';
import ProductRepository from './core/repository/ProductRepository';
import UserRepository from './core/repository/UserRepository';
import createServer from './framework/express/server';
import MongoConnectionHandler from './framework/mongodb/MongoConnectionHandler';
import MongoItemRepository from './framework/mongodb/repository/MongoItemRepository';
import MongoProductRepository from './framework/mongodb/repository/MongoProductRepository';
import MongoUserRepository from './framework/mongodb/repository/MongoUserRepository';
import { datastoreName } from './config';
import { makeDependencies } from './dependency';

const port = process.env.PORT || 3000;
const dependencies = makeDependencies(datastoreName);
const { connectionHandler } = dependencies;

connectionHandler.connect().then(() => {
  const { app, listen } = createServer(dependencies);

  listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});