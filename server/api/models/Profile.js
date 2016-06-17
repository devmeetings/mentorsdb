module.exports = {
  attributes: {
    id: {
      type: 'string',
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    nationality: {
      type: 'string'
    },
    trello: {
      type: 'string'
    },
    linkedin: {
      model: 'linkedin',
      unique: true
    }
  }
};
