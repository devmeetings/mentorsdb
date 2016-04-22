angular.module('App')
.controller('ProfilesCtrl', ['$scope', '$window', 'Profiles', function($scope, $window, Profiles) {

    $scope.profiles = [];
    $scope.searchText = "";
    $scope.showCounter = 30;

    function refreshProfiles() {
      $scope.showCounter = 30;
      Profiles.getAll().then(function(profiles) {
          $scope.profiles = profiles;
      });
    }
    refreshProfiles();

    $scope.$watch('searchText', function() {
      $scope.showCounter = 30;
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

    $scope.import = function(profiles) {
      try {
        profiles = JSON.parse(profiles);
      } catch (e) {
        $window.alert('Malformed data: ' + e);
        return;
      }

      Profiles.import(profiles).then(function () {
        $scope.importing = false;
        refreshProfiles();

        $window.alert('Import complete.');
      });
    };

    $scope.showMore = function() {
      $scope.showCounter = Math.min($scope.showCounter + 30, $scope.profiles.length);
    };

}]);
