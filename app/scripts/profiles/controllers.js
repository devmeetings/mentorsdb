angular.module('App')
.controller('ProfilesCtrl', ['$scope', 'Profiles', function($scope, Profiles) {

    $scope.profiles = [];
    $scope.searchText = "";

    Profiles.getAll().then(function(profiles) {
        $scope.profiles = profiles;
    });

    $scope.searchFunction = function(searchText) {
        var keywords = searchText.toLowerCase().split(' ');
        var i;
        return function(item) {
            var match = true;
            var text = JSON.stringify(item).toLowerCase();
            for(i = 0; match && i < keywords.length; i++) {
                if(keywords[i] !== '' && text.indexOf(keywords[i]) < 0) {
                    match = false;
                }
            }
            return match;
        };
    };

}]);