import angular from 'angular';
import '@angular/router/angular1/angular_1_router';
import '../common/libs/firebase';
import 'lodash';
import 'ng-infinite-scroll';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/js/bootstrap';
import 'angularfire';

import Components from './app/app';
import Common from './common/common';

import './less/main.less';

import config from './config';

angular.module('main', [
  'ngComponentRouter',
  'infinite-scroll',
  'firebase',

  Components.name,
  Common.name,
])
.value('$routerRootComponent', 'app')
.config(config);
