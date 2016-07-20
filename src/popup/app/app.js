import angular from 'angular';

import Linkedin from './linkedin/linkedin';
import Github from './github/github';

import AppComponent from './app.component';

import Bridge from './bridge.service';

const appComponentsModule = angular.module('app', [
    Linkedin.name,
    Github.name,
])
.component('app', AppComponent)
.service('Bridge', Bridge);

export default appComponentsModule;
