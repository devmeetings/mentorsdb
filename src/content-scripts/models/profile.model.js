import Trello from './trello.model';
import Linkedin from './linkedin.model';
import Github from './github.model';
import Email from './email.model';

const Profile = (function() {

    class ProfileModel {

        constructor(data) {
            data = data || {};
            this.id = data.id || null;
            this.name = data.name || null;
            this.city = data.city || null;
            this.nationality = data.nationality || null;
            this.trello = data.trello? new Trello(data.trello) : null;
            this.linkedin = data.linkedin? new Linkedin(data.linkedin) : null;
            this.github = this.makeModels(Github, data.github);
            this.email = this.makeModels(Email, data.email);
        }

        makeModels(model, data) {
            var result = [];
            if(data) {
                result = data.map(item => new model(item));
            }
            return result;
        }

    }

    return ProfileModel;

})();

export default Profile;