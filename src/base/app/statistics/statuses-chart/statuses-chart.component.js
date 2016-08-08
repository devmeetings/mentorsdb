import template from './statuses-chart.component.html';

const statusesChartComponent = {
    template,
    restrict: 'E',
    controller: function statusesChartController() {
        'ngInject';

        const vm = this;

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
    },
    controllerAs: 'vm',
};

export default statusesChartComponent;
