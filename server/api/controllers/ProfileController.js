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
    Profile
    .findOne({
      id: id
    })
    .populate('linkedin')
    .exec(function(err, result) {
      res.json(result);
    });
  }
};
