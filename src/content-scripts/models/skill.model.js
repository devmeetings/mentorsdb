const Skill = (function() {

    function SkillModel(data) {
        this.name = data.name || '';
        this.count = data.count || 0;
    }

    return SkillModel;

})();

export default Skill;