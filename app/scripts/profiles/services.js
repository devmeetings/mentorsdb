angular.module('App').factory('Profiles', function($q) {
    return {
        getAll: function() {
            var deferred = $q.defer();
            chrome.storage.local.get('profiles', function(res) {
                if (res.profiles) { 
                    var resArr = []
                    for(var i in res.profiles) {
                        resArr.push(res.profiles[i])
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
