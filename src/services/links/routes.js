const Joi = require('joi');
const handlers = require('./handlers');
const { overrideSuccessStatusCode } = require('common').helpers.response;

module.exports = () => [
  {
    method: 'GET',
    path: '/links',
    handler: handlers.getLinks,
    config: {
      tags: ['api', 'links'],
      description: 'Get links',
    },
  },
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
    handler: overrideSuccessStatusCode(handlers.store, 201),
    config: {
      tags: ['api', 'links'],
      description: 'Create a new go link',
      validate: {
        payload: Joi.alternatives().try(
          Joi.object({
            name: Joi.string().required(),
            url: Joi.string().required(),
            isPrivate: Joi.boolean().default(false),
          }),
          Joi.object({
            name: Joi.string().required(),
            routine: Joi.string().required(),
            isPrivate: Joi.boolean().default(false),
          }),
        )
      },
    },
  },
];
