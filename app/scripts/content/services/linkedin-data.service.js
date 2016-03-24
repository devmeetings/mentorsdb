var LinkedinDataService = (function() {

    function getName() {
        return document.querySelector('.full-name');
    }

    return {
        getName: getName
    };

})();