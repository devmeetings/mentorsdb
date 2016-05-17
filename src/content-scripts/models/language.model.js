var Language = (function() {

    function LanguageModel(data) {
        this.name = data.name || '';
        this.proficiency = data.proficiency || '';
    }

    return LanguageModel;

})();