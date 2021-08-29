const { helpers } = require('common');
const { internal } = require('@hapi/boom');
const methods = require('../methods');

const { to } = helpers.functionalHelpers;
const { representAs } = helpers.response;

module.exports = async ({ logger, payload }) => {
  const [error, res] = await to(methods.store(payload));

  if (error) {
    logger.error(error);
    throw internal();
  }

  if (res.error) {
    return res.error();
  }

  return representAs('link')(res.link);
};
