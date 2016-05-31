var searchEmailPort;
var oauth_token = '';
var email_processed;
var mail = '';

chrome.runtime.onConnect.addListener(function(port) {
    if(port.name === 'searchEmail') {
        searchEmailPort = port;
        port.onMessage.addListener(function(request) {
            checkEmailInRapportive(request.email);
        });
    }
});

chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
    if(oauth_token === '') {
        for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'oauth_token') {
                oauth_token = details.requestHeaders[i].value;
                if(email_processed && oauth_token) {
                    chrome.tabs.query({
                        active: true,
                        currentWindow: true,
                        pinned: true,
                        highlighted: true
                    }, function(tabs) {
                        if(tabs.length > 0 && tabs[0].url === 'https://mail.google.com/mail/u/0/#drafts?compose=' + mail) {
                            chrome.tabs.remove(tabs[0].id);
                            checkEmailInRapportive(email_processed);
                            alert('Niestety, obecnie musisz jeszcze raz odpalić szukanie e-maili.');
                        }
                    });
                }
                break;
            }
        }
    }
}, {
    urls: ["https://api.linkedin.com/v1/people/email=*"]
}, ["requestHeaders"]);

function requestLinkedin(url, options) {
    var xhr = new XMLHttpRequest();
    var settings = {
        callback: options.callback || function() {}
    };
    xhr.onload = function() {
        if(this.status === 401 || this.status === 500) {
            getRapportiveAuthToken();
        } else {
            settings.callback(JSON.parse(this.responseText));
        }
    };
    if(oauth_token !== '') {
        xhr.open('get', url, true);
        xhr.setRequestHeader("oauth_token", oauth_token);
        xhr.send();
    } else {
        getRapportiveAuthToken();
    }
}

function getRapportiveAuthToken() {
    oauth_token = '';
    chrome.tabs.create({
        url: 'https://mail.google.com/mail/u/0/#drafts?compose=' + mail,
        active: true,
        pinned: true
    }, function(tab) {
        chrome.tabs.highlight(tab.id);
    });
}

function checkEmailInRapportive(email) {
    email_processed = email;
    chrome.storage.sync.get({
        mail: ''
    }, function(items) {
        mail = items.mail;
        if(mail !== '') {
            requestLinkedin('https://api.linkedin.com/v1/people/email=' + encodeURIComponent(email) + ':(public-profile-url)?format=json', {
                callback: function(response) {
                    if(response.hasOwnProperty('error')) {
                        alert(response.error_description);
                    } else {
                        var result = {
                            email: email,
                            found: false,
                            profile: ''
                        };
                        if(response.hasOwnProperty('publicProfileUrl')) {
                            result.found = true;
                            result.profile = response.publicProfileUrl.replace('https://www.linkedin.com/in/', '');
                        }
                        searchEmailPort.postMessage(JSON.stringify(result));
                    }
                    email_processed = undefined;
                }
            });
        } else {
            alert('Uzupełnij identyfikator e-maila do obsługi Rapportive w ustawieniach rozszerzenia.');
        }
    });
}