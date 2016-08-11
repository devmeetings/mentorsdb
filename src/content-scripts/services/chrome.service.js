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

    function setStatus(status) {
        chrome.runtime.sendMessage({
            method: 'setStatus',
            status,
        });
    }

    function setGithubProfile(tabId, githubProfile) {
        chrome.runtime.sendMessage({
            method: 'setGithubProfile',
            openerTabId: tabId,
            github: githubProfile
        });
    }

    function openGithubProfile(url, openerTabId) {
        chrome.runtime.sendMessage({
            method: 'openGithubProfile',
            url,
            openerTabId,
        });
    }

    return {
        getTab,
        setStatus,
        setGithubProfile,
        openGithubProfile,
    };

})();

export default ChromeService;