import angular from 'angular';

import MailVerifierService from './services/mail-verifier';
import Bridge from './services/bridge';
import backgroundService from './services/background';
import ProfileService from './services/profile';
import TrelloService from './services/trello';

import MentorsAPI from './factories/mentorsapi';

import TaggleDirective from './directives/taggle';

import ScoringComponent from './components/scoring/scoring';

const appCommonModule = angular.module('app.common', [])

  .service('MailVerifier', MailVerifierService)
  .service('profileService', ProfileService)
  .service('trelloService', TrelloService)
  .service('Bridge', Bridge)
  .service('backgroundService', backgroundService)

  .factory('MentorsAPI', MentorsAPI)

  .directive('taggle', TaggleDirective)

  .component('scoring', ScoringComponent);

export default appCommonModule;
