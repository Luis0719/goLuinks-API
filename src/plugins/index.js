module.exports = () => [
  require('@hapi/inert'),
  require('@hapi/vision'),
  require('./logging'),
  ...require('./APIs')(),
];
