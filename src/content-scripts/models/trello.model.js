const Trello = (function() {

    function TrelloModel(data) {
        this.id = data.id || null;
        this.name = data.name || null;
        this.idShort = data.idShort || null;
        this.shortLink = data.shortLink || null;
    }

    return TrelloModel;

})();

export default Trello;