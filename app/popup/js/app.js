angular.module('App', []);

angular.module('App')
.controller('ProfileCtrl', ['$scope', function($scope) {

    var port = chrome.runtime.connect({name: "bridge"});

    $scope.profile = {
        current: null,
        existing: {}
    };

    port.onMessage.addListener(function(response) {
        var json;
        if(typeof response === 'string' && response !== 'undefined' && response !== 'null') {
            json = JSON.parse(response);
            $scope.profile.current = json.current;
            $scope.profile.existing = json.existing;
            $scope.$apply();
        }
    });

    $scope.refresh = function() {
        port.postMessage({
            method: 'getProfile'
        });
    };

    $scope.save = function() {
        Storage.setProfile($scope.profile.current, function(res) {
            $scope.close();
        });
    };

    $scope.showAll = function() {
        chrome.tabs.create({
            url: chrome.runtime.getURL('scripts/profiles/index.html'),
            active: true
        });
    };

    $scope.close = function() {
        window.close();
    };

    $scope.refresh();

}]);