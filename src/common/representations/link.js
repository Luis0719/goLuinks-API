module.exports = {
  init: (J) => {
    J.define('link', [
      J.Field('id'),
      J.Field('name'),
      J.Field('url'),
      J.Field('owner'),
      J.Field('isPrivate'),
      J.Field('sharedWith'),
      J.Field('updatedAt'),
      J.Field('createdAt'),
    ]);
  },
};
