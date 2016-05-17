angular.module('App', []);

angular.module('App')
.controller('SettingsCtrl', ['$scope', function($scope) {

    $scope.settings = {
        mail: ''
    };

    chrome.storage.sync.get({
        mail: ''
    }, function(items) {
        $scope.settings.mail = items.mail;
        $scope.$apply();
    });

    $scope.save = function() {
        chrome.storage.sync.set({
            mail: $scope.settings.mail
        }, function() {
            alert('Ustawienia zostały zapisane.')
        });
    };

}]);