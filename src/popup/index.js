import angular from 'angular';
import '@angular/router/angular1/angular_1_router';
import 'lodash';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/js/bootstrap';
import angularComponentRouterActive from 'angular-component-router-active';

import Components from './app/app';
import Common from './common/common';

import './less/main.less';

angular.module('main', [
  'ngComponentRouter',
  angularComponentRouterActive,

  Components.name,
  Common.name,
])
.value('$routerRootComponent', 'app');
