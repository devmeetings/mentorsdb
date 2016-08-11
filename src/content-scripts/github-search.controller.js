import chromeService from './services/chrome.service';
import githubDataService from './services/github-data.service';

(function() {

    function GithubSearchController() {
        var me = this;
        chromeService.getTab().then(tab => {
            if(tab.openerTabId !== null && tab.pinned) {
                githubDataService.getUsersProfilesUrls().then(profileUrls => {
                    profleUrls.forEach(profileUrl => {
                        chromeService.openGithubProfile(profileUrl, tab.openerTabId);
                    });
                });
                window.close();
            }
        });
    }

    return new GithubSearchController;

})();