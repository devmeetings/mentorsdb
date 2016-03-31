'use strict';
(function() {

    function MainController() {
        var me = this;
        chrome.runtime.sendMessage({
            method: 'setStatus',
            status: 'processing'
        });
        this.existing = null;
        this.current = new Profile({
            id: window.location.pathname.substr(4),
            name: LinkedinDataService.getName(),
            img: LinkedinDataService.getPhoto(),
            description: LinkedinDataService.getDescription(),
            email: '',
            city: LinkedinDataService.getCity(),
            skills: LinkedinDataService.getSkills(),
            jobs: LinkedinDataService.getJobs(),
            languages: LinkedinDataService.getLanguages(),
            education: LinkedinDataService.getEducation()
        });
        chrome.runtime.sendMessage({
            method: 'openGithubSearch',
            name: this.current.name.replace(/ /g, '+')
        });
        this.getProfile(this.current.id).then(function(existing) {
            chrome.runtime.sendMessage({
                method: 'setStatus',
                status: 'existing',
                scoring: 0
            });
        }, function() {
            chrome.runtime.sendMessage({
                method: 'setStatus',
                status: 'new',
                scoring: 0
            });
        });
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            switch(request.method) {
                case 'getProfileFromContent':
                    sendResponse(JSON.stringify({
                        current: me.current,
                        existing: me.existing
                    }));
                    break;
            }
        });
    }

    MainController.prototype.getProfile = function(id) {
        var me = this;
        return new Promise(function(resolve, reject) {
            try {
                Storage.getProfile(id, function(profile) {
                    me.existing = profile || null;
                    if(me.existing !== null) {
                        resolve(me.existing);
                    } else {
                        reject();
                    }
                });
            } catch(error) {
                reject(error);
            }
        });
    };

    return new MainController;

})();