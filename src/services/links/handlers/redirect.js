const { helpers } = require('common');
const { internal } = require('@hapi/boom');
const methods = require('../methods');

const { to } = helpers.functionalHelpers;

module.exports = async ({ logger, params }, reply) => {
  const [error, res] = await to(methods.redirect(params));

  if (error) {
    logger.error(error);
    throw internal();
  }

  if (res.error) {
    return res.error();
  }

  // We have 2 types of links.
  // Routines: Execute some piece of code that handles all the logic.
  //      It's like an action instead of a simple redirect
  // normal: Simple redirect. Match the given name with an url
  //      and redirect to it
  if (res.link.routine) {
    //TODO(luis) support parameters? Needs extra security
    return methods.execRoutine(res.link.routine, params, reply);
  }

  return reply.redirect(res.link.url);
};
