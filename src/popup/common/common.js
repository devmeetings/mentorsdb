import angular from 'angular';

import MailVerifierService from './services/mail-verifier';
import Bridge from './services/bridge';
import ProfileService from './services/profile';

import TaggleDirective from './directives/taggle';

import ScoringComponent from './components/scoring/scoring';

const appCommonModule = angular.module('app.common', [])

  .service('MailVerifier', MailVerifierService)
  .service('profileService', ProfileService)
  .service('Bridge', Bridge)

  .directive('taggle', TaggleDirective)

  .component('scoring', ScoringComponent);

export default appCommonModule;
