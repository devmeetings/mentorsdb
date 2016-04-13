'use strict';
var Storage = (function() {

    function StorageService() {
        this.firebase = new Firebase('https://mentorsdb.firebaseio.com/profiles');
        this.firebase.authWithPassword({
            email    : "mentors@devmeetings.org",
            password : "im_a_mentor_hunter"
        }, function(error, authData) {});
    }

    StorageService.prototype.getProfile = function(id, callback) {
        this.firebase.child(id).once('value', function(res) {
            var value = res.val();
            if(value) {
                callback(value);
            } else {
                callback(false);
            }
        });
    };

    StorageService.prototype.setProfile = function(data, callback) {
        this.firebase.child(data.id).set(data);
    };

    return new StorageService;

})();