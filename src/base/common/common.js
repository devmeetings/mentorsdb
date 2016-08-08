import angular from 'angular';

import MentorsAPI from './factories/mentorsapi';

import TrelloService from './services/trello';

const appCommonModule = angular.module('app.common', [])

  .factory('MentorsAPI', MentorsAPI)

  .service('trelloService', TrelloService);

export default appCommonModule;
