import template from './app.html';

const appComponent = {
    template,
    restrict: 'E',
    controller: function appController() { },
    controllerAs: 'vm',
    $routeConfig: [
        {
            path: '/linkedin',
            name: 'Linkedin',
            component: 'linkedinComponent',
            useAsDefault: true,
        },
        {
            path: '/**',
            redirectTo: ['Linkedin'],
        },
    ],
};

export default appComponent;
