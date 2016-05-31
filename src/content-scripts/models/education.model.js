const Education = (function() {

    function EducationModel(data) {
        this.school = data.school || '';
        this.degree = data.degree || '';
        this.major = data.major || '';
        this.date = data.date || '';
    }

    return EducationModel;

})();

export default Education;