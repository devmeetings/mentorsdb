import template from './statistics.component.html';

const statisticsComponent = {
    template,
    restrict: 'E',
    bindings: { $router: '<' },
    controller: function statisticsController() {
        'ngInject';

        const vm = this;
    },
    controllerAs: 'vm',
};

export default statisticsComponent;
