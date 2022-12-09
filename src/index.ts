import UserRepository from './core/repository/UserRepository';
import createServer from './framework/express/server';
import MongoConnectionHandler from './framework/mongodb/MongoConnectionHandler';
import MongoUserRepository from './framework/mongodb/repository/MongoUserRepository';

const port = process.env.PORT || 3000;

const connectionHandler = new MongoConnectionHandler();
connectionHandler.connect().then(() => {
  // TODO: initialize this based on related environment variable
  const userRepository: UserRepository = new MongoUserRepository();
  const { app, listen } = createServer({ userRepository });

  listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});