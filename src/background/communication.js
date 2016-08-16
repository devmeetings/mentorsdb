let popupPort = undefined;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method === 'passToPopup') {
        try {
            popupPort.postMessage(JSON.stringify(request.data));
        } catch (exception) {
            sendResponse({
                error: exception.message,
            });
        }
    }
});

chrome.runtime.onConnect.addListener(port => {
    if (port.name === 'popup') {
        popupPort = port;
    }
});
