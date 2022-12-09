import createServer from './framework/express/server';

const port = process.env.PORT || 3000;
const { app, listen } = createServer();

listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});