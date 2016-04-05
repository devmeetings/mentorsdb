'use strict';
(function() {

    function GithubController() {
        var me = this;
        var body = document.querySelector('body');
        if(body.className.split(' ').indexOf('page-profile') >= 0) {
            this.github = new Github({
                username: GithubDataService.getUsername(),
                avatar: GithubDataService.getAvatar(),
                city: GithubDataService.getCity(),
                email: GithubDataService.getEmail(),
                url: GithubDataService.getUrl(),
                joindate: GithubDataService.getJoindate(),
                followers: GithubDataService.getFollowers(),
                starred: GithubDataService.getStarred(),
                following: GithubDataService.getFollowing(),
                contributions: GithubDataService.getContributions()
            });
            chrome.runtime.sendMessage({
                method: 'getOpenerTabId'
            }, function(openerTabId) {
                if(openerTabId !== null) {
                    chrome.runtime.sendMessage({
                        method: 'setGithubProfile',
                        openerTabId: openerTabId,
                        github: me.github
                    });
                    window.close();
                }
            });
        }
    }

    return new GithubController;

})();