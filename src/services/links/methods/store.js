const { db } = require('common');
const { Link } = db.models;

module.exports = async (owner, data) => {
  data.owner = owner.id;
  const link = await Link.create(data);

  return link;
};
