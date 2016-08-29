import template from './statuses-chart.component.html';
import moment from 'moment';

const statusesChartComponent = {
    template,
    restrict: 'E',
    controller: function statusesChartController(trelloService, statisticsService) {
        'ngInject';

        const vm = this;

        vm.users = [];
        vm.boards = [];
        vm.criteria = {
          from: moment().subtract(1, 'month').toDate(),
          to: new Date(),
        };
        vm.loaded = false;

        vm.options = {
          chart: {
            type: 'multiBarChart',
            height: 450,
            margin : {
              top: 20,
              right: 20,
              bottom: 30,
              left: 40
            },
            x: d => d[0],
            y: d => d[1],
            useVoronoi: false,
            clipEdge: true,
            duration: 100,
            useInteractiveGuideline: true,
            xAxis: {
              showMaxMin: false,
              tickFormat: d => d3.time.format('%x')(new Date(d)),
            },
            yAxis: {
              tickFormat: d => d,
            },
            zoom: {
              enabled: true,
              scaleExtent: [1, 10],
              useFixedDomain: false,
              useNiceScale: false,
              horizontalOff: false,
              verticalOff: true,
              unzoomEventType: 'dblclick.zoom'
            }
          }
        };

        vm.data = [];

        vm.init = () => {
          trelloService.getUsers().then(users => {
            vm.users = users;
          });
          trelloService.getBoards().then(boards => {
            vm.boards = boards;
          });
          vm.redrawChart();
        };

        vm.redrawChart = () => {
          vm.loaded = false;
          statisticsService.getStatuses(vm.criteria)
          .then(data => {
            const statuses = {};
            data.forEach(day => {
              day.statuses.forEach(status => {
                if(!statuses.hasOwnProperty(status.status)) {
                  statuses[status.status] = [];
                }
                const date = new Date(day._id.year, day._id.month - 1, day._id.day);
                const time = date.getTime();
                statuses[status.status].push([
                  time,
                  status.count
                ]);
              });
            });
            return Object.keys(statuses).map(name => ({
              key: name,
              values: statuses[name],
            }));
          }).then(data => {
            vm.data = data;
            vm.loaded = true;
          });
        };

        vm.init();
    },
    controllerAs: 'vm',
};

export default statusesChartComponent;
