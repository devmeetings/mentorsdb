'use strict';
(function() {

    function GithubController() {
        var me = this;
        var body = document.querySelector('body');
        if(body.className.split(' ').indexOf('page-profile') >= 0) {
            this.github = new Github({
                username: GithubDataService.getUsername(),
                email: GithubDataService.getEmail(),
                joindate: GithubDataService.getJoindate(),
                followers: GithubDataService.getFollowers(),
                starred: GithubDataService.getStarred(),
                following: GithubDataService.getFollowing(),
                contributions: GithubDataService.getContributions()
            });
            console.log(this.github);
        }
    }

    return new GithubController;

})();