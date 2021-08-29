const Joi = require('joi');
const handlers = require('./handlers');

module.exports = () => [
  {
    method: 'POST',
    path: '/links/create',
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
