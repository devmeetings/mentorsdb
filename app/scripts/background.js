'use strict';

var popupPush;

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