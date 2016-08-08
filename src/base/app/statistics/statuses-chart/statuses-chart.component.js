import template from './statuses-chart.component.html';

const statusesChartComponent = {
    template,
    restrict: 'E',
    controller: function statusesChartController(trelloService) {
        'ngInject';

        const vm = this;

        vm.users = [];
        vm.boards = [];
        vm.criteria = {};

        vm.init = () => {
          trelloService.getUsers().then(users => {
            vm.users = users;
          });
          trelloService.getBoards().then(boards => {
            vm.boards = boards;
          });
        };

        vm.chart = {
          type: 'ColumnChart',
          data: {
            cols: [
              {id: "date", label: "Date", type: "date"},
              {id: "a", label: "A", type: "number"},
              {id: "b", label: "B", type: "number"}
            ],
            rows: [
              {c:[{v:new Date(2016,8,8)}, {v:1}, {v:.25}]},
              {c:[{v:new Date(2016,8,9)}, {v:1}, {v:.25}]},
              {c:[{v:new Date(2016,8,10)}, {v:1}, {v:.25}]}
            ]
          }
        };

        vm.init();
    },
    controllerAs: 'vm',
};

export default statusesChartComponent;
