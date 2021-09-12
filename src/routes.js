const config = require('config');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return h.redirect(config.goLinksAdminUrl);
    },
    config: {
      tags: ['api', 'links'],
      description: 'Home page',
    },
  },
];
