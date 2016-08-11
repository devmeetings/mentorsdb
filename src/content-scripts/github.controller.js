import githubDataService from './services/github-data.service';
import chromeService from './services/chrome.service';

(function() {

    class GithubController {

        constructor() {
            var me = this;
            if(githubDataService.isProfilePage()) {
                this.github = githubDataService.getGithub();
                chromeService.getTab().then(tab => {
                    if(tab.openerTabId !== null && tab.pinned) {
                        chromeService.setGithubProfile(tab.openerTabId, me.github);
                        window.close();
                    }
                });
            }
        }
    }

    return new GithubController;

})();