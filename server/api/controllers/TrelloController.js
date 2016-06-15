var Trello = require("trello");
var trello = new Trello("ab3e486648b4909be5427ab953859e8a", "c5d4d43264e520d104151f44ec389cb473edbfe0b1f2ab8f8f1b05e40390fecd");

module.exports = {
  lists: function (req, res) {
    trello.getListsOnBoard('M90S6AZb', function(err, data) {
      res.json(data.map(function(list) {
        return list.name;
      }));
    });
  }
};
