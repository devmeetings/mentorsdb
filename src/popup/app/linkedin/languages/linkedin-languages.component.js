import template from './linkedin-languages.component.html';

const linkedinLanguagesComponent = {
  template,
  restrict: 'E',
  bindings: {
    $router: '<',
    profile: '=',
  },
  controller: function linkedinLanguagesController() {},
  controllerAs: 'vm',
};

export default linkedinLanguagesComponent;
