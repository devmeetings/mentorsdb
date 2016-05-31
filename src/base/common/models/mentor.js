import Model from './model';

const MentorModel = function MentorModel() {
    class Mentor extends Model {

        constructor(initData) {
            super();
            this.id = ''; // string
            this.setData(initData);
        }

    }

    return Mentor;
};

export default MentorModel;
