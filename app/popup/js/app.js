angular.module('App', []);

angular.module('App')
.controller('ProfileCtrl', ['$scope', function($scope) {

    $scope.profile = {
        current: null,
        existing: {}
    };

    var port = chrome.runtime.connect({name: "bridge"});
    port.postMessage({
        method: 'getProfile'
    });
    port.onMessage.addListener(function(response) {
        var json;
        if(typeof response === 'string' && response !== 'undefined' && response !== 'null') {
            json = JSON.parse(response);
            $scope.profile.current = json.current;
            $scope.profile.existing = json.existing;
            $scope.$apply();
        }
    });

    $scope.showAll = function() {
        chrome.tabs.create({
            url: chrome.runtime.getURL('scripts/profiles/index.html'),
            active: true
        });
    };

}]);