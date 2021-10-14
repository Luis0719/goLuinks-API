const { db } = require('common');
const { Link } = db.models;
const errors = require('../errors');
const routines = require('../routines');

module.exports = async (data) => {
  // Avoid repeated links with same name
  if (await Link.findOne({name: data.name})) {
    return {
      error: errors.REPEATED_NAME,
    }
  }

  // We should never store a routine if the routine does not exist
  // We are not (and should not be) super verbose on why a link
  // encountered errors. Therefore, we should avoid them
  if (data.routine && !routines[data.routine]) {
    return {
      error: errors.ROUTINE_NOT_FOUND(data.routine),
    }
  }

  const link = await Link.create(data);

  return { link };
};
