const statisticsService = function statisticsService(MentorsAPI) {
  'ngInject';

  class StatisticsService {

    getChanges(criteria) {
      return MentorsAPI.all('/statistics/changes').getList(criteria);
    }

    getBoard(board) {
      return MentorsAPI.one('/statistics/board').get({
        id: board.boardId,
      });
    }

  }

  return new StatisticsService;
};

export default statisticsService;
