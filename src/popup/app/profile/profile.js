import angular from 'angular';

import ProfileComponent from './profile.component';

const profileModule = angular.module('app.profile', [])
.component('profileComponent', ProfileComponent);

export default profileModule;
