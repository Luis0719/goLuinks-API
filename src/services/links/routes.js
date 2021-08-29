const Joi = require('joi');
const handlers = require('./handlers');

module.exports = () => [
  {
    method: 'POST',
    path: '/create',
    handler: (request) => handlers.store(request),
    config: {
      tags: ['api', 'links'],
      description: 'Create a new go link',
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          link: Joi.string().required(),
          isPrivate: Joi.boolean().default(false),
        }),
      },
    },
  },
];
