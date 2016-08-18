import Trello from './models/trello.model';
import trelloDataService from './services/trello-data.service';
import chromeService from './services/chrome.service';

(function() {

    class TrelloController {

        constructor() {
            this.trello = trelloDataService.getTrello();
            chromeService.setStatus('processing');
            this.setListeners();
        }

        setListeners() {
            const me = this;
            chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
                switch(request.method) {
                    case 'getProfileFromContent':
                        sendResponse(JSON.stringify({
                            trello: me.trello,
                        }));
                        break;
                }
            });
        }

    }

    return new TrelloController;

})();