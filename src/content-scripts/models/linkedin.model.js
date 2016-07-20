import Email from './email.model';
import Skill from './skill.model';
import Job from './job.model';
import Language from './language.model';
import Education from './education.model';
import Scoring from './scoring.model';

const Linkedin = (function() {

    function LinkedinModel(data) {
        this.id = data.id || null;
        this.name = data.name || null;
        this.city = data.city || null;
        this.img = data.img || null;
        this.status = data.status || 'new';
        this.description = data.description || null;
        this.comment = data.comment || '';
        this.score = data.score || null;
        this.scoring = data.scoring? new Scoring(data.scoring): new Scoring();
        this.tags = data.tags || [];
        this.education = this.makeModels(Education, data.education);
        this.languages = this.makeModels(Language, data.languages);
        this.jobs = this.makeModels(Job, data.jobs);
        this.skills = this.makeModels(Skill, data.skills);
        this.email = this.makeModels(Email, data.email);
    }

    LinkedinModel.prototype.makeModels = function(model, data) {
        var me = this;
        var result = [];
        if(data) {
            data.forEach(function(item) {
                result.push(new model(item));
            });
        }
        return result;
    };

    return LinkedinModel;

})();

export default Linkedin;