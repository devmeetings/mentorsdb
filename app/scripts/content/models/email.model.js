var Email = (function() {

    function EmailModel(data) {
        this.address = data.address || '';
        this.source = data.source || '';
    }

    return EmailModel;

})();