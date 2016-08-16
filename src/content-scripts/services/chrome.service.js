import backgroundService from './background.service';

const ChromeService = (function() {

    function getTab() {
        return backgroundService.request('getTab');
    }

    function setStatus(status, scoring) {
        return backgroundService.request('setStatus', {
            status, // new, existing, processing
            scoring,
        });
    }

    function setGithubProfile(tabId, githubProfile) {
        return backgroundService.request('setGithubProfile', {
            openerTabId: tabId,
            github: githubProfile,
        });
    }

    function openGithubProfile(url, openerTabId) {
        return backgroundService.request('openGithubProfile', {
            url,
            openerTabId,
        });
    }

    function refreshPopup() {
        return backgroundService.request('refreshPopup');
    }

    function openGithubSearch(name) {
        return backgroundService.request('openGithubSearch', {
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