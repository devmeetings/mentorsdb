import angular from 'angular';
import '@angular/router/angular1/angular_1_router';
import 'lodash';

import Components from './app/app';
import Common from './common/common';

import config from './config';

import './less/main.less';

angular.module('main', [
    'ngComponentRouter',

    Components.name,
    Common.name,
])
.value('$routerRootComponent', 'app')
.config(config);
