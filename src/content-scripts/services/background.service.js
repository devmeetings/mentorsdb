const BackgroundService = (function() {

    const resolver = {};

    function request(what, data) {
        return new Promise((resolve, reject) => {
            const json = data || {};
            json.method = what;
            chrome.runtime.sendMessage(json, function(response) {
                if (response && response.hasOwnProperty('error')) {
                    reject(response.error);
                } else {
                    resolve(response);
                }
            });
        });
    }

    function resolve(what, callback) {
        resolver[what] = callback;
    }

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        const resolveFunction = resolver[request.method];
        if (typeof resolveFunction === 'function') {
            sendResponse(
                JSON.stringify(
                    resolveFunction()
                )
            );
        }
    });

    return {
        request,
        resolve,
    };

})();

export default BackgroundService;