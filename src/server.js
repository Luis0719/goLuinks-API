'use strict';

const Hapi = require('@hapi/hapi');
const { joiValidator } = require('./middleware');

const HapiReactViews = require('hapi-react-views');
require('@babel/register')({
    presets: ['@babel/preset-react', '@babel/preset-env'],
    extensions: [".jsx"],
    only: [
      /views/
    ],
});

const { server: config, cors } = require('config');
config.routes = {
  cors,
  validate: {
    failAction: joiValidator,
  },
};

const configServer = async () => {
  const routes = require('./routes');
  const plugins = require('./plugins')();

  // Creates server instance
  const server = new Hapi.Server(config);

  // Load authentication strategies
  await require('./authentication')(server);

  // Loads service routes and plugins
  await server.register(plugins);

  // Loan generic routes not associated with any service
  server.route(routes);

  server.views({
    engines: {
        jsx: HapiReactViews
    },
    compileOptions: {}, // optional
    relativeTo: __dirname,
    path: 'views'
});

  return server;
};

exports.init = async () => {
  const server = await configServer();
  await server.initialize();
  return server;
};

exports.start = async () => {
  const server = await configServer();
  await server.start();
  return server;
};
