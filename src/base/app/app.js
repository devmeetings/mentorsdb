import angular from 'angular';

import Profiles from './profiles/profiles';

import AppComponent from './app.component';

const appComponentsModule = angular.module('app', [
    Profiles.name,
])
.component('app', AppComponent);

export default appComponentsModule;
