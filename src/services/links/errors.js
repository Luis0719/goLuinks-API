const { badRequest, notFound } = require('@hapi/boom');

module.exports = {
  REPEATED_NAME: () => badRequest('A link with this name already exists'),
  LINK_NOT_FOUND: (name) => () => notFound(`${name} not found`),
}