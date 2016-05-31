import template from './linkedin-skills.component.html';

const linkedinSkillsComponent = {
  template,
  restrict: 'E',
  bindings: {
    $router: '<',
    profile: '=',
  },
  controller: function linkedinSkillsController() {
    const vm = this;

    vm.more = {
      skills: false,
    };
  },
  controllerAs: 'vm',
};

export default linkedinSkillsComponent;
