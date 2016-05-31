import Email from './email.model';
import Skill from './skill.model';
import Job from './job.model';
import Language from './language.model';
import Education from './education.model';
import Github from './github.model';
import Scoring from './scoring.model';

const Profile = (function() {

    function ProfileModel(data) {
        this.id = data.id || null;
        this.name = data.name || null;
        this.img = data.img || null;
        this.email = this.makeModels(Email, data.email);
        this.city = data.city || null;
        this.description = data.description || null;
        this.skills = this.makeModels(Skill, data.skills);
        this.jobs = this.makeModels(Job, data.jobs);
        this.languages = this.makeModels(Language, data.languages);
        this.education = this.makeModels(Education, data.education);
        this.github = this.makeModels(Github, data.github);
        this.scoring = data.scoring? new Scoring(data.scoring): new Scoring();
        this.status = data.status || 'new';
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

export default Profile;