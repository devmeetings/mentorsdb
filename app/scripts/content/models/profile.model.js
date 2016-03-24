var Profile = (function() {

    function ProfileModel(data) {
        this.id = data.id || null;
        this.name = data.name || null;
        this.img = data.img || null;
        this.email = data.email || null;
        this.city = data.city || null;
        this.status = data.status || null;
        this.comment = data.comment || null;
        this.tags = data.tags || [];
        this.added = data.added || false;
    }

    return ProfileModel;

})();