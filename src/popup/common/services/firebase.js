import angular from 'angular';

const firebaseService = function firebaseService() {
    'ngInject';

    const firebase = new Firebase('https://mentorsdb.firebaseio.com');
    
    firebase.authWithPassword({
        email    : "mentors@devmeetings.org",
        password : "im_a_mentor_hunter"
    }, function(error, authData) {});

    return firebase;
};

export default firebaseService;
