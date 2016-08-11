import Github from './models/github.model';
import linkedinDataService from './services/linkedin-data.service';
import chromeService from './services/chrome.service';

(function() {

    class LinkedinController {

        constructor() {
            this.linkedin = linkedinDataService.getLinkedin();
            chromeService.setStatus('processing');
            this.setListeners();
        }

        setListeners() {
            const me = this;
            chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
                switch(request.method) {
                    case 'getProfileFromContent':
                        sendResponse(JSON.stringify({
                            linkedin: me.linkedin,
                        }));
                        break;
                    case 'setGithubProfileContent':
                        const github = new Github(request.github);
                        me.linkedin.github.push(github);
                        chromeService.refreshPopup();
                        break;
                }
            });
        }

    }

    return new LinkedinController;

})();