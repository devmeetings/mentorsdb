import template from './linkedin.component.html';
import Profile from '../../../content-scripts/models/profile.model';

const linkedinComponent = {
  template,
  restrict: 'E',
  bindings: { $router: '<' },
  controller: function linkedinController($scope, Bridge) {
    'ngInject';

    const vm = this;

    vm.profile = {
      current: null,
      existing: {},
      initial: {}
    };

    Bridge.port.onMessage.addListener(function(response) {
      if(typeof response === 'object' && response !== 'undefined' && response !== 'null') {
        vm.profile.current = response.current;
        vm.profile.existing = response.existing;
        vm.profile.initial = new Profile(response.current);
        $scope.$apply();
      }
    });

    Bridge.popupPushPort.onMessage.addListener(function(response) {
      if(response === 'refresh') {
        vm.refresh();
      }
    });

    var background = chrome.extension.getBackgroundPage();
    window.addEventListener("unload", function() {
      var profile = new Profile(vm.profile.current);
      var changed = JSON.stringify(profile) !== JSON.stringify(vm.profile.initial);
      var exists = vm.profile.existing? true: false;
      background.setProfileOnClose({
        profile: profile,
        changed: changed,
        exists: exists
      });
    }, true);

    vm.scoreSum = function() {
      return Object.keys(vm.profile.current.scoring).reduce(function(sum, key) {
        return sum += vm.profile.current.scoring[key];
      }, 0);
    };

    vm.refresh = function() {
      Bridge.port.postMessage({
        method: 'getProfile'
      });
    };

    vm.save = function() {
      Bridge.port.postMessage({
        method: 'setProfile',
        profile: new Profile(vm.profile.current)
      });
      vm.profile.initial = new Profile(vm.profile.current);
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

    vm.refresh();
  },
  controllerAs: 'vm',
};

export default linkedinComponent;
