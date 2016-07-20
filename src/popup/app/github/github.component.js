import template from './github.component.html';

const githubComponent = {
  template,
  restrict: 'E',
  bindings: { $router: '<' },
  controller: function githubController(profileService) {
    'ngInject';

    const vm = this;

    vm.profileService = profileService;
  },
  controllerAs: 'vm',
};

export default githubComponent;
