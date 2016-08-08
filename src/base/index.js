import angular from 'angular';
import '@angular/router/angular1/angular_1_router';
import 'lodash';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/js/bootstrap';
import 'angular-google-chart';
import 'restangular';

import Components from './app/app';
import Common from './common/common';

import './less/main.less';

angular.module('main', [
  'restangular',
  'ngComponentRouter',
  'googlechart',

  Components.name,
  Common.name,
])
.value('$routerRootComponent', 'app');
