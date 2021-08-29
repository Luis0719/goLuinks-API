const pkg = require('../package.json');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (req, res) => { return "hola" },
    config: {
      tags: ['api', 'links'],
      description: 'Home page',
    },
  },
];
