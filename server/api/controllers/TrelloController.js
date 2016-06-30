require('es6-promise').polyfill();
var TrelloAPI = require("trello");
var trello = new TrelloAPI("ab3e486648b4909be5427ab953859e8a", "c5d4d43264e520d104151f44ec389cb473edbfe0b1f2ab8f8f1b05e40390fecd");

module.exports = {
  boardId: '57625508dc20256493fb9899',
  listId: '5762552263f4a88b0e94c9f5',

  lists: function (req, res) {
    var trelloController = this;
    trello.getListsOnBoard(trelloController.boardId, function(err, data) {
      res.json(data.map(function(list) {
        return list.name;
      }));
    });
  },

  generate: function(req, res) {
    var trelloController = this;
    Profile
      .find()
      .limit(5)
      .populate('linkedin')
      .exec(function(err, profiles) {
        var profile;
        function pushCard() {
          if(profiles.length > 0) {
            profile = profiles.pop();
            trelloController.addCard(profile).then(pushCard);
          } else {
            res.json({
              "status": "done"
            });
          }
        }
        pushCard();
      });
  },

  addCard: function(profile) {
    var trelloController = this;
    return new Promise(function(resolve, reject) {
      trello.addCard(
        profile.linkedin.name,
        profile.linkedin.comment,
        trelloController.listId,
        function(err, trelloCard) {
          Profile.update({
            id: profile.id
          }, {
            trello: trelloCard.id
          }).exec(function() {});
          if(profile.linkedin.tags && profile.linkedin.tags.length > 0) {
            trello.getLabelsForBoard(trelloController.boardId, function(err, labels) {
              profile.linkedin.tags.map(function(tag) {
                var label = labels.find(function(item) {
                  return item.name === tag;
                });
                function addLabel(label) {
                  trello.addLabelToCard(trelloCard.id, label.id);
                }
                if(label) {
                  addLabel(label);
                } else {
                  trello.addLabelOnBoard(trelloController.boardId, tag, null, function(err, trelloLabel) {
                    labels.push(trelloLabel);
                    addLabel(trelloLabel);
                  });
                }
              });
              resolve(trelloCard);
            });
          } else {
            resolve(trelloCard);
          }
        },
        {
          pos: 'top',
          due: null,
          urlSource: profile.linkedin.img
        }
      );
    });
  },

  callback: function(req, res) {
    var data = req.body;
    switch(data.action.type) {
      case 'createCard':
        this.createCardCallback(data);
        break;
      case 'updateCard':
        this.updateCardCallback(data);
        break;
      case 'addAttachmentToCard':
        this.addAttachmentCallback(data);
        break;
      case 'deleteAttachmentFromCard':
        break;
      case 'commentCard':
        break;
      case 'addLabelToCard':
        break;
      default:
        console.log('Trello callback: unhandled action "' + data.action.type + '"');
    }
    res.json({
      'status': 'done'
    });
  },

  createCardCallback: function(data) {
    var card = data.action.data.card;
    console.log(card);
    Profile
    .findOne({
      trello: card.id
    })
    .exec(function(err, profile) {
      if (!profile) {
        Profile.create({
          name: card.name,
          trello: card
        }).exec(function(err, created) {});
      }
    });
  },

  updateCardCallback: function(data) {
    var card = data.action.data.card;
    Trello
    .update({
      id: card.id
    },
    card);
  },

  addAttachmentCallback: function(data) {
    var card = data.action.data.card;
    var attachment = data.action.data.attachment;
    console.log(attachment);
  }
};
