'use strict';
(function() {

    function MainController() {
        var me = this;
        chrome.runtime.sendMessage({
            method: 'setStatus',
            status: 'processing'
        });
        me.existing = null;
        me.current = new Profile({
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
        me.getProfile(me.current.id).then(function(existing) {
            me.existing = existing;
            chrome.runtime.sendMessage({
                method: 'setStatus',
                status: 'existing',
                scoring: 0
            });
            me.existing.github.forEach(function(data) {
                var github = new Github(data);
                if(github.removed === true) {
                    me.current.push(github);
                }
            });
            if(me.existing.scoring) {
                me.current.scoring = me.existing.scoring;
            }
        }, function() {
            chrome.runtime.sendMessage({
                method: 'setStatus',
                status: 'new',
                scoring: 0
            });
        }).then(function() {
            chrome.runtime.sendMessage({
                method: 'openGithubSearch',
                name: me.current.name.replace(/ /g, '+')
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
                case 'setGithubProfileContent':
                    var github = new Github(request.github);
                    var removed = false;
                    if(me.existing !== null) {
                        me.existing.github.forEach(function(existing) {
                            if(existing.username === github.username && existing.removed) {
                                removed = true;
                            }
                        });
                    }
                    if(!removed) {
                        me.current.github.push(github);
                    }
                    chrome.runtime.sendMessage({
                        method: 'refreshPopup'
                    });
                    break;
            }
        });
    }

    MainController.prototype.getProfile = function(id) {
        var me = this;
        return new Promise(function(resolve, reject) {
            try {
                Storage.getProfile(id, function(profile) {
                    if(profile) {
                        resolve(profile);
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