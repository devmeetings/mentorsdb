angular.module('App').directive('profile', function() {
    return {
        restrict: 'E',
        scope: {
            profile: '='
        },
        controller: ['$scope', function($scope) {

            $scope.scoreGroup = function(score) {
                var group;
                if(score < -60) {
                    group = 1;
                } else if(score > 60) {
                    group = 10;
                } else {
                    group = Math.floor((score + 60) / 13.3333333333);
                }
                return 'group' + group;
            };

        }],
        templateUrl: 'templates/profile.html'
    }
})