const Joi = require('joi');
const handlers = require('./handlers');

module.exports = () => [
  {
    method: 'GET',
    path: '/{name}',
    handler: handlers.redirect,
    config: {
      tags: ['api', 'links'],
      description: 'Get and redirect to link',
      validate: {
        params: Joi.object({
          name: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'POST',
    path: '/api/links/create',
    handler: handlers.store,
    config: {
      tags: ['api', 'links'],
      description: 'Create a new go link',
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          url: Joi.string().required(),
          isPrivate: Joi.boolean().default(false),
        }),
      },
    },
  },
];
