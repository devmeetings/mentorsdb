chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.method) {
        case 'getTab':
            sendResponse(sender.tab);
            break;
    }
});
