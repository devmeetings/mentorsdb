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
    /*var query = {};
    query.sort = 'score DESC';
    Linkedin
      .find(query)
      .paginate({
        page: +params.page,
        limit: +params.limit || 3
      })
      .exec(function(err, data) {
        res.json(data);
      });*/
    Linkedin.count().exec(function(err, count) {
      var limit = +params.limit || 5;
      var page = params.page ? Math.max(1, +params.page) : 1;
      var skip = (page - 1) * limit;
      var pageCount = Math.ceil(count / limit);
      Linkedin.native(function(err, collection) {
        collection
          .find()
          .sort({
            score: -1
          })
          .skip(skip)
          .limit(limit)
          .toArray(function(err, data) {
            res.json({
              count: count,
              limit: limit,
              page: page,
              pageCount: pageCount,
              data: data
            });
          });
      });
    });
  },

  create: function (req, res) {
    var body = req.body;
    Linkedin.create(body).exec(function(err, created) {
      res.json(created);
    });
  },

  update: function (req, res) {
    var id = req.params.id;
    var body = req.body;
    Linkedin.update({
      id: id
    }, body)
    .exec(function(err, updated) {
      res.json(updated);
    });
  },

  find: function (req, res) {
    var id = req.params.id;
    Linkedin.findOne({
      id: id
    }).exec(function(err, result) {
      res.json(result);
    });
  },

  import: function(req, res) {
    Linkedin.destroy().exec(function() {
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
    });
  }
};
