import angular from 'angular';

import Linkedin from './linkedin/linkedin';
import Github from './github/github';
import Trello from './trello/trello';

import AppComponent from './app.component';

const appComponentsModule = angular.module('app', [
    Linkedin.name,
    Github.name,
    Trello.name,
])
.component('app', AppComponent);

export default appComponentsModule;
