var Email = (function() {

    function EmailModel(data) {
        this.address = data.address || '';
        this.source = data.source || '';
        this.confirmed = typeof data.confirmed === 'boolean'? data.confirmed: null;
    }

    return EmailModel;

})();