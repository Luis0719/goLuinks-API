const { db } = require('common');
const { Link } = db.models;
const errors = require('../errors');

module.exports = async (data) => {
  // Avoid repeated links with same name
  if (await Link.findOne({name: data.name})) {
    return {
      error: errors.REPEATED_NAME,
    }
  }

  const link = await Link.create(data);

  return { link };
};
