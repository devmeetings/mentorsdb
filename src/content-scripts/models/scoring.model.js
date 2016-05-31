const Scoring = (function() {

    function ScoringModel(data) {
        data = data || {};
        this.extra = data.extra || 0;
        this.description = data.description || 0;
        this.skills = data.skills || 0;
        this.experience = data.experience || 0;
        this.languages = data.languages || 0;
        this.education = data.education || 0;
        this.github = data.github || 0;
    }

    ScoringModel.prototype.sum = function() {
        return this.extra
            + this.description
            + this.skills
            + this.experience
            + this.languages
            + this.education
            + this.github;
    };

    return ScoringModel;

})();

export default Scoring;