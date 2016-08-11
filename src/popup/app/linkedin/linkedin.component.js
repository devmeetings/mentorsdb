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
      if(vm.profileService.data.linkedin.scoring) {
        scoreSum = Object.keys(vm.profileService.data.linkedin.scoring).reduce(function(sum, key) {
          return sum += vm.profileService.data.linkedin.scoring[key];
        }, 0);
      }
      return scoreSum;
    };

    vm.add = function() {
      vm.profileService.add();
      vm.close();
    };

    vm.update = function() {
      vm.profileService.update();
      vm.close();
    };

    vm.close = function() {
      window.close();
    };
  },
  controllerAs: 'vm',
};

export default linkedinComponent;
