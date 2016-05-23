import angular from 'angular';

const profilesService = function profilesService($q, Firebase) {
    'ngInject';

    class ProfilesService {

        getPage(pageNo) {
          const deferred = $q.defer();
          const pageCount = 30;
          Firebase.child('profiles')
            .once('value', function(data) {
            if (data.val()) {
              const resArr = [];
              let res = data.val();
              for(let i in res) {
                if(res[i].hasOwnProperty('scoring')) {
                  res[i].score = Object.keys(res[i].scoring).reduce(function(sum, key) {
                    return sum + res[i].scoring[key];
                  }, 0);
                }
                resArr.push(res[i])
              }
              deferred.resolve(resArr);
            } else deferred.reject('no-profiles');
          });
          return deferred.promise;
        }

    }

    return new ProfilesService();
};

export default profilesService;
