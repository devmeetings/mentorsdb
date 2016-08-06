const trelloService = function trelloService(MentorsAPI) {
  'ngInject';

  class TrelloService {

    getTrackedBoards() {
      return MentorsAPI.all('/trello/boards/tracked/lists').getList();
    }

    addToList(profileId, boardId, listId) {
      return MentorsAPI.all(`/profiles/${profileId}/trello`).post(null, {
        board_id: boardId,
        list_id: listId,
      });
    }

    detach(profileId) {
      return MentorsAPI.all(`/profiles/${profileId}/trello`).remove();
    }

  }

  return new TrelloService;
};

export default trelloService;
