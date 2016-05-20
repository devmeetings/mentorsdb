import angular from 'angular';

import Linkedin from './linkedin/linkedin';

import AppComponent from './app.component';

const appComponentsModule = angular.module('app', [
    Linkedin.name,
])
.component('app', AppComponent);

export default appComponentsModule;
