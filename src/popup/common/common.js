import angular from 'angular';

import FirebaseService from './services/firebase';
import MailVerifierService from './services/mail-verifier';

import TaggleDirective from './directives/taggle';

import ScoringComponent from './components/scoring/scoring';

const appCommonModule = angular.module('app.common', [])

  .service('Firebase', FirebaseService)
  .service('MailVerifier', MailVerifierService)

  .directive('taggle', TaggleDirective)

  .component('scoring', ScoringComponent);

export default appCommonModule;
