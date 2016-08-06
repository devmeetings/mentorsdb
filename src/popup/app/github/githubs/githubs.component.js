import template from './githubs.component.html';

const githubsComponent = {
  template,
  restrict: 'E',
  bindings: {
    $router: '<',
    profile: '=',
  },
  controller: function githubsController(profileService) {
    'ngInject';
    
    const vm = this;

    vm.githubSearch = '';

    vm.add = (i, github) => {
      vm.profile.existing.github.push(github);
      vm.profile.current.github.splice(i, 1);
    };

    vm.remove = (i, github) => {
      vm.profile.existing.github.splice(i, 1);
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
            profileService.refresh();
          });
        });
      }
    };
  },
  controllerAs: 'vm',
};

export default githubsComponent;
