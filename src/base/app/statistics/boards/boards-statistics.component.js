import template from './boards-statistics.component.html';

const component = {
    template,
    restrict: 'E',
    bindings: { $router: '<' },
    controller: function controller(trelloService) {
        'ngInject';

        const vm = this;

        vm.boards = [];

        vm.init = () => {
          trelloService.getBoards().then(boards => {
            vm.boards = boards;
          });
        };

        vm.$routerOnActivate = next => {
          vm.init();
        };
    },
    controllerAs: 'vm',
};

export default component;
