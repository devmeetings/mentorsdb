import angular from 'angular';

import ProfilesComponent from './profiles.component';
import ProfileComponent from './profile/profile.component';
import ProfilesService from './profiles.service';
import ProfilesListService from './profiles-list.service';

const profilesModule = angular.module('app.profiles', [])
.component('profilesComponent', ProfilesComponent)
.component('profile', ProfileComponent)
.service('profilesService', ProfilesService)
.service('profilesListService', ProfilesListService);

export default profilesModule;
