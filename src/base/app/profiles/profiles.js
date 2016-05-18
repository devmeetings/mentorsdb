import angular from 'angular';

import ProfilesComponent from './profiles.component';

const profilesModule = angular.module('app.dashboard.profiles', [])
.component('profilesComponent', ProfilesComponent);

export default profilesModule;
