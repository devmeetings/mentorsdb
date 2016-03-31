'use strict';
(function() {

    function GithubSearchController() {
        var me = this;
        var users = document.querySelectorAll('.user-list-item');
        chrome.runtime.sendMessage({
            method: 'getOpenerTabId'
        }, function(openerTabId) {
            Array.prototype.forEach.call(users, function(user) {
                chrome.runtime.sendMessage({
                    method: 'openGithubProfile',
                    url: user.querySelector('a').href,
                    openerTabId: openerTabId
                });
            });
            window.close();
        });
    }

    return new GithubSearchController;

})();