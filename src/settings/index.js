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
.controller('SettingsCtrl', ['$scope', '$window', 'Restangular', function($scope, $window, Restangular) {

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
        Restangular.all('/trello/boards/tracked').getList().then(tracked => {
            Restangular.all('/trello/boards').getList().then(boards => {
                $scope.boards = boards.map(board => {
                    board.tracked = tracked.find(item => item.boardId === board.id);
                    return board;
                });
            });
        });
    };

    $scope.addTrackedBoard = board => {
        Restangular.all('/trello/boards/tracked').post({
            boardId: board.id,
        })
        .then($scope.getBoards);
    };

    $scope.removeTrackedBoard = board => {
        if ($window.confirm('Czy na pewno chcesz cofnąć trackowanie?')) {
            Restangular.all(`/trello/boards/tracked/${board.id}`).remove()
            .then($scope.getBoards);
        }
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