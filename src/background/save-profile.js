chrome.runtime.onConnect.addListener(function(port) {
    if(port.name === 'bridge') {
        port.onMessage.addListener(function(request) {
            switch(request.method) {
                case 'setProfile':
                    saveProfile(request.profile);
            }
        });
    }
});

/* export const setProfileOnClose = (request) => {
    if(request.exists) {
        saveProfile(request.profile);
    } else if(request.changed) {
        if(window.confirm('Profil został zmodyfikowany, ale osoba nie została dodana do bazy. Naciśnij OK, jeżeli chcesz ją dodać.')) {
            saveProfile(request.profile);
        }
    }
}; */

export const saveProfile = (profile) => {
    Storage.setProfile(profile, function(res) {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                method: 'setProfileFromContent'
            });
        });
    });  
};
