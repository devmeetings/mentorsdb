import template from './linkedin-education.component.html';

const linkedinEducationComponent = {
  template,
  restrict: 'E',
  bindings: {
    $router: '<',
    profile: '=',
  },
  controller: function linkedinEducationController() {
    const vm = this;

    vm.more = {
      education: false,
    };
  },
  controllerAs: 'vm',
};

export default linkedinEducationComponent;
