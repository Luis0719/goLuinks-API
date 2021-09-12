'use strict';

// There's an issue with docker where it can't find dotenv
// even though it is installed. Therefore, we load dev env vars
// using docker-compose
// TODO: Find a better way to load environment variables
if (process.env.APP_ENV !== 'development') {
  require('dotenv').config({ path: `./config/${process.env.APP_ENV}.env` });
}

const { representations, db } = require('common');
const jiggler = require('jiggler');

representations.init(jiggler);

const { start } = require('./server');
const server = start().then((server) => {
  db.connect(server.logger);

  process.on('unhandledRejection', (err) => {
    server.logger.error(err);
    process.exit(1);
  });

  return server;
});

module.exports = server;
