import angular from 'angular';

import LinkedinComponent from './linkedin.component';

const linkedinModule = angular.module('app.linkedin', [])
.component('linkedinComponent', LinkedinComponent);

export default linkedinModule;
