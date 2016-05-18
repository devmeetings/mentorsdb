import template from './profile.component.html';

const profileComponent = {
  template,
  restrict: 'E',
  bindings: {
    $router: '<',
    profile: '=',
  },
  controller: function profileController() {
    'ngInject';

    const vm = this;

    vm.scoreGroup = function(score) {
      let group;
      if(score < -60) {
        group = 1;
      } else if(score > 60) {
        group = 10;
      } else {
        group = Math.floor((score + 60) / 13.3333333333);
      }
      return 'group' + group;
    };
  },
  controllerAs: 'vm',
};

export default profileComponent;
