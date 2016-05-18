import angular from 'angular';

import ProfilesComponent from './profiles.component';
import ProfileComponent from './profile/profile.component';
import ProfilesService from './profiles.service';

const profilesModule = angular.module('app.dashboard.profiles', [])
.component('profilesComponent', ProfilesComponent)
.component('profileComponent', ProfileComponent)
.service('profilesService', ProfilesService);

export default profilesModule;
