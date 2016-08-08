import angular from 'angular';

import MentorsAPI from './factories/mentorsapi';

import TrelloService from './services/trello';
import StatisticsService from './services/statistics';

const appCommonModule = angular.module('app.common', [])

  .factory('MentorsAPI', MentorsAPI)

  .service('trelloService', TrelloService)
  .service('statisticsService', StatisticsService);

export default appCommonModule;
