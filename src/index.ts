import createServer from './framework/express/server';
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