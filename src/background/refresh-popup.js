var popupPush;

chrome.runtime.onConnect.addListener(function(port) {
    if(port.name === 'popupPush') {
        popupPush = port;
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.method) {
        case 'refreshPopup':
            if(typeof popupPush !== 'undefined') {
                popupPush.postMessage('refresh');
            }
            break;
    }
});