const config = require('config');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      return reply.redirect(config.goLinksAdminUrl);
    },
    config: {
      tags: ['api', 'links'],
      description: 'Home page',
    },
  },
];
