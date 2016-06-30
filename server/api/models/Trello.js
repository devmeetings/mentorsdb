module.exports = {
  attributes: {
    id: {
      type: 'string',
      primaryKey: true
    },
    name: {
      type: 'string'
    },
    idShort: {
      type: 'integer'
    },
    shortLink: {
      type: 'string'
    },
    profile: {
      collection: 'profile',
      via: 'trello'
    }
  }
};
