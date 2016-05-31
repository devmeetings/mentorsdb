chrome.runtime.onConnect.addListener(function(port) {
    if(port.name === 'bridge') {
        port.onMessage.addListener(function(request) {
            switch(request.method) {
                case 'getProfile':
                    chrome.tabs.query({
                        active: true,
                        currentWindow: true
                    }, function(tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, {
                            method: 'getProfileFromContent'
                        }, function(response) {
                            port.postMessage(JSON.parse(response));
                        });
                    });
                    break;
            }
        });
    }
});