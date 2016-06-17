var firebase = require('firebase');
if (!firebase.apps.length) {
  firebase.initializeApp({
    serviceAccount: "config/firebase.json",
    databaseURL: 'https://mentorsdb.firebaseio.com',
  });
}

module.exports = {
  getAll: function (req, res) {
    var params = req.params.all();
    Profile
      .find()
      .exec(function(err, data) {
        res.json(data);
      });
  },

  create: function (req, res) {
    var body = req.body;
    Profile.create(body).exec(function(err, created) {
      res.json(created);
    });
  },

  update: function (req, res) {
    var id = req.params.id;
    var body = req.body;
    Profile.update({
      id: id
    }, body)
    .exec(function(err, updated) {
      res.json(updated);
    });
  },

  find: function (req, res) {
    var id = req.params.id;
    console.log('find', id);
    Profile
    .findOne({
      id: id
    })
    .populate('linkedin')
    .exec(function(err, result) {
      res.json(result);
    });
  },

  generate: function(req, res) {
    Profile.destroy().exec(function() {
      Linkedin
        .find()
        .exec(function(err, data) {
          data.forEach(function(linkedin) {
            Profile.create({
              name: linkedin.name,
              city: linkedin.city,
              linkedin: linkedin.id
            }).exec(function(err, created) {});
          });
          res.json({
            "status": "done"
          });
        });
    });
  }
};
