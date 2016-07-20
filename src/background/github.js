import {
    removeDiacritics
} from '../common/helpers';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.method) {
        case 'openGithubSearch':
            chrome.tabs.create({
                url: 'https://github.com/search?q=' + removeDiacritics(request.name) + '&type=Users',
                active: false,
                openerTabId: sender.tab.id,
                pinned: true
            });
            break;
        case 'openGithubProfile':
            chrome.tabs.create({
                url: request.url,
                active: false,
                openerTabId: request.openerTabId,
                pinned: true
            });
            break;
        case 'setGithubProfile':
            chrome.tabs.sendMessage(request.openerTabId, {
                method: 'setGithubProfileContent',
                github: request.github
            });
            break;
    }
});
