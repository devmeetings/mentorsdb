var Trello = require("trello");
var trello = new Trello("ab3e486648b4909be5427ab953859e8a", "c5d4d43264e520d104151f44ec389cb473edbfe0b1f2ab8f8f1b05e40390fecd");

module.exports = {
  lists: function (req, res) {
    trello.getListsOnBoard('M90S6AZb', function(err, data) {
      res.json(data.map(function(list) {
        return list.name;
      }));
    });
  },

  generate: function(req, res) {
    Profile
      .find()
      .limit(5)
      .populate('linkedin')
      .exec(function(err, profiles) {
        var profile;
        function pushCard(err, trelloCard) {
          if(typeof trelloCard === 'object') {
            Profile.update({
              id: profile.id
            }, {
              trello: trelloCard.id
            }).exec(function() {});
          }
          if(profiles.length > 0) {
            profile = profiles.pop();
            trello.addCard(profile.linkedin.name, profile.linkedin.comment, '5762552263f4a88b0e94c9f5', pushCard, {
              pos: 'top',
              due: null,
              urlSource: profile.linkedin.img
            });
          } else {
            res.json({
              "status": "done"
            });
          }
        }
        pushCard();
      });
  }
};
