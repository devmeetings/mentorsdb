import Trello from './trello.model';
import Linkedin from './linkedin.model';
import Github from './github.model';

const Profile = (function() {

    function ProfileModel(data) {
        this.id = data.id || null;
        this.name = data.name || null;
        this.city = data.city || null;
        this.nationality = data.nationality || null;
        this.trello = data.trello? new Trello(data.trello) : null;
        this.linkedin = this.makeModels(Linkedin, data.linkedin);
        this.github = this.makeModels(Github, data.github);
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