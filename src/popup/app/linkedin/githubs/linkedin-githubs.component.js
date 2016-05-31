import template from './linkedin-githubs.component.html';

const linkedinGithubsComponent = {
  template,
  restrict: 'E',
  bindings: { $router: '<' },
  controller: function linkedinGithubsController() {
    const vm = this;

    vm.githubSearch = '';

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
  },
  controllerAs: 'vm',
};

export default linkedinGithubsComponent;
