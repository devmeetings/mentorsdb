import angular from 'angular';
import 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/js/bootstrap';
import 'lodash';
import 'restangular';

angular
.module('App', [
    'restangular',
])
.controller('SettingsCtrl', ['$scope', 'Restangular', function($scope, Restangular) {

    $scope.boards = [];

    $scope.settings = {
        mail: ''
    };

    chrome.storage.sync.get({
        mail: ''
    }, function(items) {
        $scope.settings.mail = items.mail;
        $scope.$apply();
    });

    $scope.getBoards = () => {
        Restangular.all('/trello/boards').getList().then(boards => {
            $scope.boards = boards;
        });
    };

    $scope.addTrackedBoard = board => {
        Restangular.all('/trello/boards/tracked').post({
            boardId: board.id,
        });
    };

    $scope.save = function() {
        chrome.storage.sync.set({
            mail: $scope.settings.mail
        }, function() {
            alert('Ustawienia zostały zapisane.')
        });
    };

    $scope.getBoards();

}])
.config((RestangularProvider) => {
    RestangularProvider.setBaseUrl('https://mentorsdb.yado.pl/');
});