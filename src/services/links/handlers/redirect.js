const { helpers } = require('common');
const { internal } = require('@hapi/boom');
const methods = require('../methods');

const { to } = helpers.functionalHelpers;

module.exports = async ({ logger, params }, h) => {
  const [error, res] = await to(methods.redirect(params));

  if (error) {
    logger.error(error);
    throw internal();
  }

  if (res.error) {
    return res.error();
  }

  return h.redirect(res.link.url);
};
