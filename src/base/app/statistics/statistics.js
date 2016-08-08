import angular from 'angular';

import StatisticsComponent from './statistics.component';
import StatusesChartComponent from './statuses-chart/statuses-chart.component';

const statisticsModule = angular.module('app.statistics', [])
.component('statisticsComponent', StatisticsComponent)
.component('statusesChart', StatusesChartComponent);

export default statisticsModule;
