import Trello from '../models/trello.model';

const LinkedinDataService = (function() {

    function getTrello() {
        return new Trello({
            id: getId()
        });
    }

    function textContent(node) {
        return node? node.textContent: '';
    }

    function getId() {
        return window.location.pathname.substr(3).split('/')[0];
    }

    return {
        getTrello,
    };

})();

export default LinkedinDataService;