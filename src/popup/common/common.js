import angular from 'angular';

import MailVerifierService from './services/mail-verifier';
import Bridge from './services/bridge';
import backgroundService from './services/background';
import ProfileService from './services/profile';
import TrelloService from './services/trello';

import EmailModel from './models/email.model';
import LinkedinModel from './models/linkedin.model';
import ProfileModel from './models/profile.model';
import TrelloModel from './models/trello.model';

import MentorsAPI from './factories/mentorsapi';

import TaggleDirective from './directives/taggle';

import ScoringComponent from './components/scoring/scoring';

const appCommonModule = angular.module('app.common', [])

  .service('mailVerifier', MailVerifierService)
  .service('profileService', ProfileService)
  .service('trelloService', TrelloService)
  .service('backgroundService', backgroundService)
  .service('Bridge', Bridge)

  .factory('Email', EmailModel)
  .factory('Linkedin', LinkedinModel)
  .factory('Profile', ProfileModel)
  .factory('Trello', TrelloModel)

  .factory('MentorsAPI', MentorsAPI)

  .directive('taggle', TaggleDirective)

  .component('scoring', ScoringComponent);

export default appCommonModule;
