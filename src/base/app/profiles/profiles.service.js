import angular from 'angular';

const profilesService = function profilesService($q, $firebaseArray) {
    'ngInject';


    const getPage = (pageNo) => {
      pageNo = pageNo || 1;
      const ref = firebase.database().ref('profiles').orderByChild('score').limitToLast(pageNo * 30);
      return $firebaseArray(ref).$loaded();
    };

    return {
      getPage,
    };
};

export default profilesService;
