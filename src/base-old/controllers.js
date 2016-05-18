angular.module('App')
.controller('ProfilesCtrl', ['$scope', '$window', 'Profiles', function($scope, $window, Profiles) {

    $scope.vm = {
      profiles: [],
      showCounter: 30,
      loading: false
    };
    $scope.searchText = "";

    function refreshProfiles() {
      $scope.vm.loading = true;
      Profiles.getAll().then(function(profiles) {
          $scope.vm.profiles = profiles;
          $scope.vm.loading = false;
          $scope.vm.showCounter = 30;
      });
    }
    refreshProfiles();

    $scope.$watch('searchText', function() {
      $scope.vm.showCounter = 30;
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

    $scope.showMore = function() {
      $scope.vm.showCounter = Math.min($scope.vm.showCounter + 30, $scope.vm.profiles.length);
    };

}]);
