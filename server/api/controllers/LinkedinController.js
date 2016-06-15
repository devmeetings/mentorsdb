var firebase = require('firebase');
if (!firebase.apps.length) {
  firebase.initializeApp({
    serviceAccount: "config/firebase.json",
    databaseURL: 'https://mentorsdb.firebaseio.com',
  });
}

module.exports = {
  index: function (req, res) {
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
          .find({
            $where: function() {
              return false;
            }
          })
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
    var params = req.params.all();
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
