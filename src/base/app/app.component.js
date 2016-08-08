import template from './app.html';

const appComponent = {
    template,
    restrict: 'E',
    controller: function dashboardController() { },
    controllerAs: 'vm',
    $routeConfig: [
        {
            path: '/statistics',
            name: 'Statistics',
            component: 'statisticsComponent',
            useAsDefault: true,
        },
        {
            path: '/**',
            redirectTo: ['Statistics'],
        },
    ],
};

export default appComponent;
