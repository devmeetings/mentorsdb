import angular from 'angular';
import '@angular/router/angular1/angular_1_router';
import '../common/libs/firebase';
import 'lodash';
import 'ng-infinite-scroll';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/js/bootstrap';

import Components from './app/app';
import Common from './common/common';

import './less/main.less';

angular.module('main', [
  'ngComponentRouter',
  'infinite-scroll',

  Components.name,
  Common.name,
])
.value('$routerRootComponent', 'app');
