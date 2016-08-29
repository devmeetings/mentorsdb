import template from './board-table.component.html';

const component = {
    template,
    restrict: 'E',
    bindings: {
      board: '=',
    },
    controller: function controller(statisticsService) {
        'ngInject';

        const vm = this;

        vm.data = {};

        statisticsService.getBoard(vm.board).then(data => {
            vm.data = data;
        });
    },
    controllerAs: 'vm',
};

export default component;
