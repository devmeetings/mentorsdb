'use strict';

var popupPush;
var accessToken = '';

/* bridge between popup and content script */
chrome.runtime.onConnect.addListener(function(port) {
    if(port.name === 'bridge') {
        port.onMessage.addListener(function(request) {
            switch(request.method) {
                case 'getProfile':
                    chrome.tabs.query({
                        active: true,
                        currentWindow: true
                    }, function(tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, {
                            method: 'getProfileFromContent'
                        }, function(response) {
                            port.postMessage(response);
                        });
                    });
                    break;
                case 'setProfile':
                    chrome.tabs.query({
                        active: true,
                        currentWindow: true
                    }, function(tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, {
                            method: 'setProfileFromContent'
                        });
                    });
            }
        });
    }
    if(port.name === 'popupPush') {
        popupPush = port;
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.method) {
        case 'setStatus':
            setStatus(request, sender);
            break;
        case 'openGithubSearch':
            chrome.tabs.create({
                url: 'https://github.com/search?q=' + request.name + '&type=Users',
                active: false,
                openerTabId: sender.tab.id
            });
            break;
        case 'openGithubProfile':
            chrome.tabs.create({
                url: request.url,
                active: false,
                openerTabId: request.openerTabId
            });
            break;
        case 'getOpenerTabId':
            sendResponse(sender.tab.openerTabId);
            break;
        case 'setGithubProfile':
            chrome.tabs.sendMessage(request.openerTabId, {
                method: 'setGithubProfileContent',
                github: request.github
            });
            break;
        case 'refreshPopup':
            if(typeof popupPush !== 'undefined') {
                popupPush.postMessage('refresh');
            }
            break;
        case 'linkedinAuth':
            requestLinkedin('https://www.linkedin.com/uas/oauth2/accessToken', {
                method: 'post',
                params: {
                    grant_type: 'authorization_code',
                    code: request.code,
                    redirect_uri: 'https%3A%2F%2Fwww.linkedin.com%2Floggedin%2F',
                    client_id: '77teh8bm878lwp',
                    client_secret: 'TRBEpS4AII9zkyJD'
                },
                callback: function(response) {
                    if(response.hasOwnProperty('error')) {
                        alert(response.error_description);
                    } else {
                        accessToken = response.access_token;
                        chrome.storage.sync.set({
                            'accessToken': accessToken
                        });
                    }
                },
                auth: false
            });
            break;
    }
});

function setStatus(request, sender) {
    var color = [0, 0, 0, 0];
    var text = '';
    if(request.status === 'processing') {
        color = [255, 0, 0, 255];
        text = '...';
    }
    if(request.status === 'existing') {
        color = [0, 255, 0, 255];
        text = request.scoring;
    }
    if(request.status === 'new') {
        color = [0, 0, 255, 255];
        text = request.scoring;
    }
    chrome.browserAction.setBadgeBackgroundColor({
        color: color,
        tabId: sender.tab.id
    });
    chrome.browserAction.setBadgeText({
        text: text + '',
        tabId: sender.tab.id
    });
}

function requestLinkedin(url, options) {
    var xhr = new XMLHttpRequest();
    var settings = {
        method: options.method || 'get',
        callback: options.callback || function() {},
        params: options.params || {},
        auth: typeof options.auth === 'undefined'? true: options.auth
    };
    xhr.onload = function() {
        var random;
        if(this.status === 401) {
            random = Math.round(Math.random()*Math.pow(10, 16));
            chrome.tabs.create({
                url: 'https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id=77teh8bm878lwp&redirect_uri=https%3A%2F%2Fwww.linkedin.com%2Floggedin%2F&state=' + random,
                active: true
            });
        } else {
            settings.callback(JSON.parse(this.responseText));
        }
    };
    xhr.open(settings.method, url, true);
    if(settings.auth) {
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
    }
    if(settings.method === 'post') {
        var data = Object.keys(settings.params).map(function(key) {
            return key + '=' + settings.params[key];
        }).join('&');
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Content-length", data.length);
        xhr.setRequestHeader("Connection", "close");
        xhr.send(data);
    } else {
        xhr.send();
    }
}

chrome.storage.sync.get('accessToken', function(res) {
    if (res.accessToken) {
        accessToken = res.accessToken;
    } else {
        accessToken = '';
    }
    requestLinkedin('https://api.linkedin.com/v1/people/~?format=json', {
        callback: function(response) {
            if(response.hasOwnProperty('error')) {
                alert(response.error_description);
            } else {
                alert(JSON.stringify(response));
            }
        }
    });
});