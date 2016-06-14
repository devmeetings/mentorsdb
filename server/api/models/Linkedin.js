module.exports = {
  attributes: {
    id: {
      type: 'string',
      primaryKey: true
    },
    name: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    img: {
      type: 'string'
    },
    status: {
      type: 'string'
    },
    comment: {
      type: 'string'
    },
    score: {
      type: 'integer'
    },
    scoring: {
      type: 'json'
    },
    tags: {
      type: 'array'
    },
    education: {
      collection: 'education',
      via: 'linkedin'
    },
    jobs: {
      collection: 'job',
      via: 'linkedin'
    },
    skills: {
      collection: 'skill',
      via: 'linkedin'
    },
    emails: {
      collection: 'email',
      via: 'linkedin'
    }
  }
};
