import App from './app';

const server = new App().express;

server.listen(3333, async () => {
  console.log('Started development server 🚀');
});

export default server;
