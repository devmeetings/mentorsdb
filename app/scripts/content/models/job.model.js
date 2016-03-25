var Job = (function() {

    function JobModel(data) {
        this.position = data.position || '';
        this.company = data.company || '';
        this.locality = data.locality || '';
        this.period = data.period || '';
        this.current = data.current || false;
    }

    return JobModel;

})();