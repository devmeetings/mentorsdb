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
            id: LinkedinDataService.getId(),
            name: LinkedinDataService.getName(),
            img: LinkedinDataService.getPhoto(),
            description: LinkedinDataService.getDescription(),
            email: LinkedinDataService.getEmail(),
            city: LinkedinDataService.getCity(),
            skills: LinkedinDataService.getSkills(),
            jobs: LinkedinDataService.getJobs(),
            languages: LinkedinDataService.getLanguages(),
            education: LinkedinDataService.getEducation()
        });
        me.findExistingProfile();
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            switch(request.method) {
                case 'getProfileFromContent':
                    sendResponse(JSON.stringify({
                        current: me.current,
                        existing: me.existing
                    }));
                    break;
                case 'setProfileFromContent':
                    me.findExistingProfile(true);
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

    MainController.prototype.findExistingProfile = function(dont_search_for_githubs) {
        var me = this;
        me.getProfile(me.current.id).then(function(existing) {
            me.existing = new Profile(existing);
            chrome.runtime.sendMessage({
                method: 'setStatus',
                status: 'existing',
                scoring: me.existing.scoring.sum()
            });
            me.current.email = me.existing.email;
            me.current.comment = me.existing.comment;
            me.current.status = me.existing.status;
            me.current.tags = me.existing.tags;
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
            if(!dont_search_for_githubs) {
                chrome.runtime.sendMessage({
                    method: 'openGithubSearch',
                    name: me.current.name.replace(/ /g, '+')
                });
            }
        });
    };

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