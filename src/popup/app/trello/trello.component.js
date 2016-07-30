import template from './trello.component.html';

const trelloComponent = {
  template,
  restrict: 'E',
  bindings: { $router: '<' },
  controller: function trelloController(profileService) {
    'ngInject';

    const vm = this;

    vm.profileService = profileService;
  },
  controllerAs: 'vm',
};

export default trelloComponent;
