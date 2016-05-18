import template from './app.html';

const appComponent = {
    template,
    restrict: 'E',
    controller: function dashboardController() { },
    controllerAs: 'vm',
    $routeConfig: [
        {
            path: '/profiles',
            name: 'Profiles',
            component: 'profilesComponent',
            useAsDefault: true,
        },
        {
            path: '/**',
            redirectTo: ['Profiles'],
        },
    ],
};

export default appComponent;
