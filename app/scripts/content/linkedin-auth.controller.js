'use strict';
(function() {

    function getSearchParams() {
        return location.search.substr(1).split('&').reduce(function(obj, item) {
            var kv = item.split('=');
            obj[kv[0]] = kv[1];
            return obj;
        }, {});
    }

    function LinkedinAuthController() {
        var params = getSearchParams();
        chrome.runtime.sendMessage({
            method: 'linkedinAuth',
            code: params.code
        });
        window.close();
    }

    return new LinkedinAuthController;

})();