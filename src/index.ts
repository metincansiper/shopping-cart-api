import createServer from './framework/express/server';
import { DATASTORE_NAME, PORT } from './config';
import { makeDependencies } from './dependency';
import Logger from './logger';

const dependencies = makeDependencies(DATASTORE_NAME);
const { connectionHandler } = dependencies;

connectionHandler.connect().then(() => {
  const { app, listen } = createServer(dependencies);

  listen(PORT, () => {
    Logger.log(`Listening on port ${PORT}`);
  });
});