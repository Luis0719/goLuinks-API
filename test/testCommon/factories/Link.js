const faker = require('faker');
const { db } = require('common');
const { Link } = db.models;

const defaultValues = {
  name: faker.internet.domainWord(),
  url: faker.internet.url(),
};

module.exports = {
  Model: Link,
  defaultValues,
};
