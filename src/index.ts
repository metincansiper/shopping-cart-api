import ProductRepository from './core/repository/ProductRepository';
import UserRepository from './core/repository/UserRepository';
import createServer from './framework/express/server';
import MongoConnectionHandler from './framework/mongodb/MongoConnectionHandler';
import MongoProductRepository from './framework/mongodb/repository/MongoProductRepository';
import MongoUserRepository from './framework/mongodb/repository/MongoUserRepository';

const port = process.env.PORT || 3000;

const connectionHandler = new MongoConnectionHandler();
connectionHandler.connect().then(() => {
  // TODO: initialize this based on related environment variable
  const userRepository: UserRepository = new MongoUserRepository();
  const productRepository: ProductRepository = new MongoProductRepository();
  const { app, listen } = createServer({ userRepository, productRepository });

  listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});