import template from './linkedin-general.component.html';

const linkedinGeneralComponent = {
  template,
  restrict: 'E',
  bindings: {
    $router: '<',
    profile: '=',
  },
  controller: function linkedinGeneralController() {},
  controllerAs: 'vm',
};

export default linkedinGeneralComponent;
