import template from './app.html';

const appComponent = {
  template,
  restrict: 'E',
  bindings: { $router: '<' },
  controller: function appController(profileService) {
    'ngInject';
    
    const vm = this;

    vm.profileService = profileService;

    vm.openBaseApp = function() {
      chrome.tabs.create({
        url: chrome.runtime.getURL('base/index.html'),
        active: true
      });
    };

    vm.close = function() {
      window.close();
    };

    vm.profileService.refresh();
  },
  controllerAs: 'vm',
  $routeConfig: [
    {
      path: '/linkedin',
      name: 'Linkedin',
      component: 'linkedinComponent',
      useAsDefault: true,
    },
    {
      path: '/github',
      name: 'Github',
      component: 'githubComponent',
    },
    {
      path: '/trello',
      name: 'Trello',
      component: 'trelloComponent',
    },
    {
      path: '/email',
      name: 'Email',
      component: 'emailComponent',
    },
    {
      path: '/**',
      redirectTo: ['Linkedin'],
    },
  ],
};

export default appComponent;
