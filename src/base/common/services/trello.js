const trelloService = function trelloService(MentorsAPI) {
  'ngInject';

  class TrelloService {

    getBoards() {
      return MentorsAPI.all('/trello/boards/tracked').getList();
    }

    getUsers() {
      return MentorsAPI.all('/trello/users').getList();
    }

  }

  return new TrelloService;
};

export default trelloService;
