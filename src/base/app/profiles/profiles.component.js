import template from './profiles.component.html';

const profilesComponent = {
    template,
    restrict: 'E',
    bindings: { $router: '<' },
    controller: function profilesController() {
        'ngInject';

        const vm = this;

        vm.profiles = [];
    },
    controllerAs: 'vm',
};

export default profilesComponent;
