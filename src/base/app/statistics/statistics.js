import angular from 'angular';

import StatisticsComponent from './statistics.component';

const statisticsModule = angular.module('app.statistics', [])
.component('statisticsComponent', StatisticsComponent);

export default statisticsModule;
