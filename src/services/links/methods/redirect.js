const { db } = require('common');
const { Link } = db.models;
const errors = require('../errors');

module.exports = async (data) => {
  const link = await Link.findOne({ name: data.name });

  if (!link) {
    return {
      error: errors.LINK_NOT_FOUND(data.name),
    }
  }

  return { link };
};
