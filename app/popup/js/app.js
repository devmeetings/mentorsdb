angular.module('App', ['directives']);

angular.module('App')
.controller('ProfileCtrl', ['$scope', function($scope) {

    var port = chrome.runtime.connect({name: "bridge"});
    var popupPush = chrome.runtime.connect({name: "popupPush"});

    $scope.profile = {
        current: null,
        existing: {}
    };

    $scope.githubSearch = '';

    port.onMessage.addListener(function(response) {
        var json;
        if(typeof response === 'string' && response !== 'undefined' && response !== 'null') {
            json = JSON.parse(response);
            $scope.profile.current = json.current;
            $scope.profile.existing = json.existing;
            $scope.$apply();
        }
    });

    popupPush.onMessage.addListener(function(response) {
        if(response === 'refresh') {
            $scope.refresh();
        }
    });

    $scope.openGithub = function(username) {
        chrome.tabs.create({
            url: 'https://github.com/' + username,
            active: true
        });
    };

    $scope.addGithubProfile = function(username) {
        if(username) {
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function(tabs) {
                chrome.tabs.create({
                    url: 'https://github.com/' + username,
                    active: false,
                    openerTabId: tabs[0].id
                }, function(tab) {
                    $scope.refresh();
                });
            });
        }
    };

    $scope.refresh = function() {
        port.postMessage({
            method: 'getProfile'
        });
    };

    $scope.save = function() {
        var profile = new Profile($scope.profile.current);
        Storage.setProfile(profile, function(res) {
            port.postMessage({
                method: 'setProfile'
            });
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