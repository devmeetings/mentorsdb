import template from './email.component.html';

const emailComponent = {
  template,
  restrict: 'E',
  bindings: { $router: '<' },
  controller: function emailController(profileService) {
    'ngInject';

    const vm = this;

    vm.profileService = profileService;
  },
  controllerAs: 'vm',
};

export default emailComponent;
