import template from './linkedin.component.html';

const linkedinComponent = {
  template,
  restrict: 'E',
  bindings: { $router: '<' },
  controller: function linkedinController(profileService) {
    'ngInject';

    const vm = this;

    vm.profileService = profileService;

    vm.scoreSum = function() {
      let scoreSum = 0;
      if(vm.profileService.profile.current.linkedin.scoring) {
        scoreSum = Object.keys(vm.profileService.profile.current.linkedin.scoring).reduce(function(sum, key) {
          return sum += vm.profileService.profile.current.linkedin.scoring[key];
        }, 0);
      }
      return scoreSum;
    };

    vm.save = function() {
      vm.profileService.save();
      vm.close();
    };

    vm.close = function() {
      window.close();
    };

    vm.profileService.refresh();
  },
  controllerAs: 'vm',
};

export default linkedinComponent;
