import template from './linkedin.component.html';
import Profile from '../../../content-scripts/models/profile.model';

const linkedinComponent = {
  template,
  restrict: 'E',
  bindings: { $router: '<' },
  controller: function linkedinController($scope, Bridge, MailVerifier) {
    'ngInject';

    const vm = this;

    const popupPushPort = chrome.runtime.connect({name: "popupPush"});

    vm.profile = {
      current: null,
      existing: {},
      initial: {}
    };

    vm.githubSearch = '';
    vm.newmail = '';

    vm.MailVerifier = MailVerifier;

    vm.more = {
      emails: false,
      skills: false,
      jobs: false,
      education: false
    };

    Bridge.port.onMessage.addListener(function(response) {
      console.log(response);
      if(typeof response === 'object' && response !== 'undefined' && response !== 'null') {
        vm.profile.current = response.current;
        vm.profile.existing = response.existing;
        vm.profile.initial = new Profile(response.current);
        $scope.$apply();
      }
    });

    popupPushPort.onMessage.addListener(function(response) {
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

    vm.openGithub = function(username) {
      chrome.tabs.create({
        url: 'https://github.com/' + username,
        active: true
      });
    };

    vm.addGithubProfile = function(username) {
      if(username) {
        chrome.tabs.query({
          active: true,
          currentWindow: true
        }, function(tabs) {
          chrome.tabs.create({
            url: 'https://github.com/' + username,
            active: false,
            openerTabId: tabs[0].id
          }, function(tab) {
            vm.refresh();
          });
        });
      }
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

    vm.addEmail = function(email) {
      if(email) {
        vm.profile.current.email.push(new Email({
          address: email,
          source: 'manual'
        }));
      }
    };

    vm.removeEmail = function(i) {
      vm.profile.current.email.splice(i, 1);
    };

    vm.refresh();
  },
  controllerAs: 'vm',
};

export default linkedinComponent;
