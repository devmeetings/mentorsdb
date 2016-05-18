import angular from 'angular';

// import MentorModel from './models/mentor';

import FirebaseService from './services/firebase';

const appCommonModule = angular.module('app.common', [])

    // .service('Mentor', MentorModel)

    .service('Firebase', FirebaseService);

export default appCommonModule;
