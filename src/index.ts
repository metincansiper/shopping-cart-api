import createServer from './framework/express/server';
import { datastoreName } from './config';
import { makeDependencies } from './dependency';
import Logger from './logger';

const port = process.env.PORT || 3000;
const dependencies = makeDependencies(datastoreName);
const { connectionHandler } = dependencies;

connectionHandler.connect().then(() => {
  const { app, listen } = createServer(dependencies);

  listen(port, () => {
    Logger.log(`Listening on port ${port}`);
  });
});