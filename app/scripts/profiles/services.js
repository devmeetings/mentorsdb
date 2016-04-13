angular.module('App').factory('Profiles', function($q) {
    var firebase = new Firebase('https://mentorsdb.firebaseio.com/profiles');
    return {
        getAll: function() {
            var deferred = $q.defer();
            firebase.once('value', function(data) {
                if(data.val()) {
                    var resArr = [];
                    var res = data.val();
                    for(var i in res) {
                        resArr.push(res[i])
                    }
                    deferred.resolve(resArr);
                } else deferred.reject('no-profiles');
            });
            return deferred.promise;
        },
        import: function (newProfiles) {
          return this.getAll().then(function (oldProfiles) {
            var profiles = oldProfiles
              .concat(newProfiles)
              .reduce(function (memo, p) {
                memo[p.id] = p;
                return memo;
              }, {});

            var deferred = $q.defer();
            chrome.storage.local.set({'profiles': profiles}, function() {
              deferred.resolve();
            });

            return deferred.promise;
          });
        }
    }
});
