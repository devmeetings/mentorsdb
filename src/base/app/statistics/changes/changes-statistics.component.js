import template from './changes-statistics.component.html';

const component = {
    template,
    restrict: 'E',
    bindings: { $router: '<' },
    controller: function controller() {
        'ngInject';

        const vm = this;
    },
    controllerAs: 'vm',
};

export default component;
