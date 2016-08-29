import template from './app.html';

const appComponent = {
    template,
    restrict: 'E',
    controller: function dashboardController() { },
    controllerAs: 'vm',
    $routeConfig: [
        {
            path: '/statistics/boards',
            name: 'BoardsStatistics',
            component: 'boardsStatisticsComponent',
            useAsDefault: true,
        },
        {
            path: '/statistics/changes',
            name: 'ChangesStatistics',
            component: 'changesStatisticsComponent',
        },
        {
            path: '/**',
            redirectTo: ['BoardsStatistics'],
        },
    ],
};

export default appComponent;
