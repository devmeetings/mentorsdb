var firebase = require('firebase');
firebase.initializeApp({
  serviceAccount: "config/firebase.json",
  databaseURL: 'https://mentorsdb.firebaseio.com',
});

module.exports = {
  index: function (req, res) {
    console.log('index called');
    return res.json({
      todo: 'index() is not implemented yet!'
    });
  },

  create: function (req, res) {
    var params = req.params.all()
    Linkedin.create(params).exec(function(err, created) {
      return res.json(created);
    });
  },

  update: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  },

  delete: function (req, res) {
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  },

  find: function (req, res) {
    return res.json({
      todo: 'find() is not implemented yet!'
    });
  },

  import: function(req, res) {
    var ref = firebase.database().ref('profiles');
    ref.once('value', function(snapshot) {
      var data = snapshot.val();
      for(key in data) {
        Linkedin.create(data[key]).exec(function() {});
      }
      res.json({
        status: true
      });
    });
  }
};

