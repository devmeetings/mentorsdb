import angular from 'angular';

import ChangesStatisticsComponent from './changes/changes-statistics.component';
import BoardsStatisticsComponent from './boards/boards-statistics.component';

import StatusesChartComponent from './components/statuses-chart/statuses-chart.component';
import BoardTableComponent from './components/board-table/board-table.component';

const statisticsModule = angular.module('app.statistics', [])

  .component('changesStatisticsComponent', ChangesStatisticsComponent)
  .component('boardsStatisticsComponent', BoardsStatisticsComponent)

  .component('statusesChart', StatusesChartComponent)
  .component('boardTable', BoardTableComponent);

export default statisticsModule;
