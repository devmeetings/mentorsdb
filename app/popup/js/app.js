angular.module('App', ['directives']);

angular.module('App')
.controller('ProfileCtrl', ['$scope', function($scope) {

    var port = chrome.runtime.connect({name: "bridge"});
    var popupPushPort = chrome.runtime.connect({name: "popupPush"});
    var searchEmailPort = chrome.runtime.connect({name: "searchEmail"});

    $scope.profile = {
        current: null,
        existing: {}
    };

    $scope.githubSearch = '';
    $scope.newmail = '';

    $scope.emailQueue = [];

    port.onMessage.addListener(function(response) {
        var json;
        if(typeof response === 'string' && response !== 'undefined' && response !== 'null') {
            json = JSON.parse(response);
            $scope.profile.current = json.current;
            $scope.profile.existing = json.existing;
            $scope.$apply();
        }
    });

    popupPushPort.onMessage.addListener(function(response) {
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

    $scope.searchEmail = function() {
        var names = $scope.profile.current.name.split(' ').reduce(function permute(res, item, key, arr) {
            return res.concat(arr.length > 1 && arr.slice(0, key).concat(arr.slice(key + 1))
                .reduce(permute, [])
                .map(function(perm) {
                    return [item].concat(perm);
                }) || item
            );
        }, []);
        names.forEach(function(item) {
            $scope.emailQueue.push(item.join('').toLowerCase() + '@gmail.com');
        });
        names.forEach(function(item) {
            $scope.emailQueue.push(item.join('.').toLowerCase() + '@gmail.com');
        });
        names.forEach(function(item) {
            var name = item[0][0] + item.slice(1).join('');
            $scope.emailQueue.push(name.toLowerCase() + '@gmail.com');
        });
        names.forEach(function(item) {
            var name = item[0][0] + '.' + item.slice(1).join('.');
            $scope.emailQueue.push(name.toLowerCase() + '@gmail.com');
        });
        names.forEach(function(item) {
            var name = item.slice(1).join('') + item[0][0];
            $scope.emailQueue.push(name.toLowerCase() + '@gmail.com');
        });
        names.forEach(function(item) {
            var name =  item.slice(1).join('.') + '.' + item[0][0];
            $scope.emailQueue.push(name.toLowerCase() + '@gmail.com');
        });
        $scope.profile.current.github.forEach(function(github) {
            $scope.emailQueue.push(github.username + '@gmail.com');
        });
        $scope.processEmailQueue();
    };

    $scope.checkEmail = function(email) {
        $scope.emailQueue.push(email);
        $scope.processEmailQueue();
    };

    $scope.processEmailQueue = function() {
        if($scope.emailQueue.length > 0) {
            searchEmailPort.postMessage({
                email: $scope.emailQueue.pop()
            });
        }
        $scope.$apply();
    };

    searchEmailPort.onMessage.addListener(function(response) {
        var result = JSON.parse(response);
        if($scope.profile.current.email.filter(function(email) {
            var found = email.address === result.email;
            if(found) {
                email.confirmed = result.found;
            }
            return found;
        }).length === 0 && result.found && result.profile === $scope.profile.current.id) {
            $scope.profile.current.email.push(new Email({
                address: result.email,
                source: 'search',
                confirmed: true
            }));
        }
        $scope.$apply();
        $scope.processEmailQueue();
    });

    $scope.refresh();

}]);