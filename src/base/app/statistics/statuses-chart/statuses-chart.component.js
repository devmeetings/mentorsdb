import template from './statuses-chart.component.html';

const statusesChartComponent = {
    template,
    restrict: 'E',
    controller: function statusesChartController(trelloService, statisticsService) {
        'ngInject';

        const vm = this;

        vm.users = [];
        vm.boards = [];
        vm.criteria = {};

        vm.chart = {
          type: 'ColumnChart',
          data: {
            cols: [
              {id: "date", label: "Date", type: "date"},
              {id: "a", label: "A", type: "number"},
              {id: "b", label: "B", type: "number"},
              {id: "c", label: "C", type: "number"}
            ],
            rows: [
              // {c:[{v:new Date(2016,8,8)}, {v:1}, {v:.25}]}
            ]
          }
        };

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
          statisticsService.getStatuses(vm.criteria).then(data => {
            vm.chart.data.rows = data.map(item => {
              const col = [
                {
                  v: new Date(item._id.year, item._id.month - 1, item._id.day)
                }
              ];
              item.statuses.forEach(status => {
                col.push({
                  v: status.count
                });
              });
              return {
                c: col
              };
            });
          });
        };

        vm.init();
    },
    controllerAs: 'vm',
};

export default statusesChartComponent;
