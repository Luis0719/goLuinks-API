const routines = require('../routines');
const { notFound } = require('@hapi/boom');

module.exports = (routineName, params, reply) => {
  const targetRoutine = routines[routineName];

  if (!targetRoutine) {
    throw notFound(`${routineName} routine not found`);
  }

  return targetRoutine(params, reply);
}