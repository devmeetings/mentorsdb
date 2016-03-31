angular.module('directives')
.directive('scoring', [
    function () {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/scoring.directive.html',
            scope: {
                'score': '='
            },
            controller: ['$scope', function($scope) {

                $scope.scores = [-10, -3, 0, 3, 10];

                $scope.updateScore = function(value) {
                    $scope.score = value;
                };

            }]
        };
    }
]);