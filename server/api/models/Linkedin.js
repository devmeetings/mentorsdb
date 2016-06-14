/**
 * Linkedin.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      type: 'string'
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
    education: {
    },
    jobs: {
    },
    skills: {
    }
  }
};

