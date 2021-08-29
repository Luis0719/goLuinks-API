const mongoose = require('mongoose');
const models = require('common').db.models;
const factories = require('./factories');
const prefabs = require('./prefabs')(factories);

const initDatabase = () => {
  return Promise.all(
    Object.values(mongoose.connection.collections).map(collection => collection.deleteMany({}))
  )
};


module.exports = {
  factories,
  initDatabase,
  models,
  prefabs,
};
