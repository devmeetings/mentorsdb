(function() {

    function GithubSearchController() {
        var me = this;
        var users = document.querySelectorAll('.user-list-item');
        chrome.runtime.sendMessage({
            method: 'getTab'
        }, function(tab) {
            if(tab.openerTabId !== null && tab.pinned) {
                Array.prototype.forEach.call(users, function(user) {
                    chrome.runtime.sendMessage({
                        method: 'openGithubProfile',
                        url: user.querySelector('a').href,
                        openerTabId: tab.openerTabId
                    });
                });
                window.close();
            }
        });
    }

    return new GithubSearchController;

})();