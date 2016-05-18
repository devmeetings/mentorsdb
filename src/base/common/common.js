import angular from 'angular';

import MentorModel from './models/mentor';

import MentorsService from './services/mentors';

const appCommonModule = angular.module('app.common', [])

    .service('Mentor', MentorModel)

    .service('mentorsService', MentorsService);

export default appCommonModule;
