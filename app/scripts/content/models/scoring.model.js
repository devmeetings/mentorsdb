var Scoring = (function() {

    function ScoringModel(data) {
        if(typeof data === 'object') {
            this.extra = data.extra || 0;
            this.description = data.description || 0;
            this.skills = data.skills || 0;
            this.experience = data.experience || 0;
            this.languages = data.languages || 0;
            this.education = data.education || 0;
            this.github = data.github || 0;
        }
    }

    return ScoringModel;

})();