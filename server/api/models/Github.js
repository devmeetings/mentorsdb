module.exports = {
  attributes: {
    username: {
      type: 'string',
      primaryKey: true
    },
    avatar: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    url: {
      type: 'string'
    },
    contributions: {
      type: 'integer'
    },
    followers: {
      type: 'integer'
    },
    following: {
      type: 'integer'
    },
    starred: {
      type: 'integer'
    },
    joindate: {
      type: 'date'
    },
    profile: {
      model: 'profile'
    }
  }
};
