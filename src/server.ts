import http from 'http';

import App from './app';
import { NODE_ENV } from './config/env';

const server = http.createServer(new App().express);
server.listen(3333, async () => {
  if (NODE_ENV !== 'test') console.log('Started development server 🚀');
});

export default server;
