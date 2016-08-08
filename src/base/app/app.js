import angular from 'angular';

import Statistics from './statistics/statistics';

import AppComponent from './app.component';

const appComponentsModule = angular.module('app', [
    Statistics.name,
])
.component('app', AppComponent);

export default appComponentsModule;
