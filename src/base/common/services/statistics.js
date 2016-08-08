const statisticsService = function statisticsService(MentorsAPI) {
  'ngInject';

  class StatisticsService {

    getStatuses(criteria) {
      return MentorsAPI.all('/statistics/statuses').getList(criteria);
    }

  }

  return new StatisticsService;
};

export default statisticsService;
