const ChromeService = (function() {

    function getTab() {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({
                method: 'getTab'
            }, function(tab) {
                resolve(tab);
            });
        });
    }

    function setStatus(status, scoring) {
        chrome.runtime.sendMessage({
            method: 'setStatus',
            status, // new, existing, processing
            scoring,
        });
    }

    function setGithubProfile(tabId, githubProfile) {
        chrome.runtime.sendMessage({
            method: 'setGithubProfile',
            openerTabId: tabId,
            github: githubProfile,
        });
    }

    function openGithubProfile(url, openerTabId) {
        chrome.runtime.sendMessage({
            method: 'openGithubProfile',
            url,
            openerTabId,
        });
    }

    function refreshPopup() {
        chrome.runtime.sendMessage({
            method: 'refreshPopup',
        });
    }

    function openGithubSearch(name) {
        chrome.runtime.sendMessage({
            method: 'openGithubSearch',
            name: name.replace(/ /g, '+'),
        });
    }

    return {
        getTab,
        setStatus,
        setGithubProfile,
        openGithubProfile,
        refreshPopup,
    };

})();

export default ChromeService;