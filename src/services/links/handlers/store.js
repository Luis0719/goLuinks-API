const { helpers } = require('common');
const { internal } = require('@hapi/boom');
const methods = require('../methods');

const { to } = helpers.functionalHelpers;
const { representAs } = helpers.response;

module.exports = async ({ logger, payload }, reply) => {
  const [error, result] = await to(methods.store(payload));
  if (error) {
    logger.error(error);
    throw internal();
  }

  if (result.error) {
    return result.error();
  }

  return representAs('link', result.link);
};
