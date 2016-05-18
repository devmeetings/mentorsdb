const Language = (function() {

    function LanguageModel(data) {
        this.name = data.name || '';
        this.proficiency = data.proficiency || '';
    }

    return LanguageModel;

})();

export default Language;