const { db } = require('common');
const { Link } = db.models;
const errors = require('../errors');

module.exports = (data={}) => {
  return Link.find(data);
};
