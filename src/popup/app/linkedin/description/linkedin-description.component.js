import template from './linkedin-description.component.html';

const linkedinDescriptionComponent = {
  template,
  restrict: 'E',
  bindings: {
    $router: '<',
    profile: '=',
  },
  controller: function linkedinDescriptionController() {},
  controllerAs: 'vm',
};

export default linkedinDescriptionComponent;
