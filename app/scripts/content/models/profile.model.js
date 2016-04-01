var Profile = (function() {

    function ProfileModel(data) {
        this.id = data.id || null;
        this.name = data.name || null;
        this.img = data.img || null;
        this.email = data.email || null;
        this.city = data.city || null;
        this.description = data.description || null;
        this.skills = this.makeModels(Skill, data.skills);
        this.jobs = this.makeModels(Job, data.jobs);
        this.languages = this.makeModels(Language, data.languages);
        this.education = this.makeModels(Education, data.education);
        this.github = this.makeModels(Github, data.github);
        this.scoring = data.scoring? new Scoring(data.scoring): new Scoring();
        this.status = data.status || 'lead';
        this.comment = data.comment || '';
        this.tags = data.tags || [];
    }

    ProfileModel.prototype.makeModels = function(model, data) {
        var me = this;
        var result = [];
        if(data) {
            data.forEach(function(item) {
                result.push(new model(item));
            });
        }
        return result;
    };

    return ProfileModel;

})();