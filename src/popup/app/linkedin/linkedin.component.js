import template from './linkedin.component.html';

const linkedinComponent = {
  template,
  restrict: 'E',
  bindings: { $router: '<' },
  controller: function linkedinController(linkedinService) {
    'ngInject';

    const vm = this;

    vm.linkedinService = linkedinService;

    vm.scoreSum = function() {
      return Object.keys(vm.linkedinService.profile.current.scoring).reduce(function(sum, key) {
        return sum += vm.linkedinService.profile.current.scoring[key];
      }, 0);
    };

    vm.save = function() {
      vm.linkedinService.save();
      vm.close();
    };

    vm.showAll = function() {
      chrome.tabs.create({
        url: chrome.runtime.getURL('base/index.html'),
        active: true
      });
    };

    vm.close = function() {
      window.close();
    };

    vm.linkedinService.refresh();
  },
  controllerAs: 'vm',
};

export default linkedinComponent;
