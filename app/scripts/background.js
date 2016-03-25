'use strict';
chrome.extension.onConnect.addListener(function(port) {

chrome.browserAction.onClicked.addListener(function(tab) { //Fired when User Clicks ICON
    /*var url = chrome.runtime.getURL('scripts/profiles/index.html');
    if (tab.url != url) { // Inspect whether the place where user clicked matches with our list of URL
        chrome.tabs.create({
            url: url,
            active: true
        });
    }*/
    chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
        //if(request.method === '')
    });
});
//port.onMessage.addListener(function(msg) {});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if(request.method === 'setStatus') {
        setStatus(request, sender);
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

});