const { badRequest } = require('@hapi/boom');

module.exports = {
  REPEATED_NAME: () => badRequest('A link with this name already exists'),
}