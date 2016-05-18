import angular from 'angular';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/js/bootstrap';

angular
.module('App', [])
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