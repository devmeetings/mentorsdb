angular.module('App', []);

angular.module('App')
.controller('ProfileCtrl', ['$scope', function($scope) {

    $scope.profile = null;
    var port = chrome.extension.connect({
        name: 'contentScriptBridge'
    });
    port.onMessage.addListener(function(msg) {
        console.log(msg);
        alert(msg);
    });

}]);