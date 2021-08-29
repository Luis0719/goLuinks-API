const { helpers } = require('common');
const { internal } = require('@hapi/boom');
const { store } = require('../methods');

const { to } = helpers.functionalHelpers;
const { representAs } = helpers.response;

module.exports = async ({ logger, auth, payload }) => {
  const [error, link] = await to(store(auth.credentials, payload));

  if (error) {
    logger.error(error);
    throw internal();
  }

  return representAs('link')(link);
};
