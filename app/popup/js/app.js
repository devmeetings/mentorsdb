angular.module('App', ['directives', 'services']);

angular.module('App')
.controller('ProfileCtrl', ['$scope', 'MailVerifier', function($scope, MailVerifier) {

    var port = chrome.runtime.connect({name: "bridge"});
    var popupPushPort = chrome.runtime.connect({name: "popupPush"});

    $scope.profile = {
        current: null,
        existing: {},
        initial: {}
    };

    $scope.githubSearch = '';
    $scope.newmail = '';

    $scope.MailVerifier = MailVerifier;

    $scope.more = {
        emails: false,
        skills: false,
        jobs: false,
        education: false
    };

    port.onMessage.addListener(function(response) {
        var json;
        if(typeof response === 'string' && response !== 'undefined' && response !== 'null') {
            json = JSON.parse(response);
            $scope.profile.current = json.current;
            $scope.profile.existing = json.existing;
            $scope.profile.initial = new Profile(json.current);
            $scope.$apply();
        }
    });

    popupPushPort.onMessage.addListener(function(response) {
        if(response === 'refresh') {
            $scope.refresh();
        }
    });

    var background = chrome.extension.getBackgroundPage();
    window.addEventListener("unload", function() {
        var profile = new Profile($scope.profile.current);
        var changed = JSON.stringify(profile) !== JSON.stringify($scope.profile.initial);
        var exists = $scope.profile.existing? true: false;
        background.setProfileOnClose({
            profile: profile,
            changed: changed,
            exists: exists
        });
    }, true);

    $scope.scoreSum = function() {
        return Object.keys($scope.profile.current.scoring).reduce(function(sum, key) {
            return sum += $scope.profile.current.scoring[key];
        }, 0);
    };

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
        port.postMessage({
            method: 'setProfile',
            profile: new Profile($scope.profile.current)
        });
        $scope.profile.initial = new Profile($scope.profile.current);
        $scope.close();
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

    $scope.addEmail = function(email) {
        if(email) {
            $scope.profile.current.email.push(new Email({
                address: email,
                source: 'manual'
            }));
        }
    };

    $scope.removeEmail = function(i) {
        $scope.profile.current.email.splice(i, 1);
    };

    $scope.refresh();

}]);