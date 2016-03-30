'use strict';
(function() {

    function GithubSearchController() {
        var me = this;
        var users = document.querySelectorAll('.user-list-item');
        if(users.length === 0) {
            // nic nie znaleziono
        } else {
            window.location.href = users[0].querySelector('a').href;
        }
    }

    return new GithubSearchController;

})();