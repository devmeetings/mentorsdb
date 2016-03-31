'use strict';
(function() {

    function GithubSearchController() {
        var me = this;
        var users = document.querySelectorAll('.user-list-item');
        Array.prototype.forEach.call(users, function(user) {
            chrome.extension.sendRequest({
                method: 'openGithubProfile',
                url: user.querySelector('a').href
            });
        });
        window.close();
    }

    return new GithubSearchController;

})();