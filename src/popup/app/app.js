import angular from 'angular';

import Profile from './profile/profile';
import Linkedin from './linkedin/linkedin';
import Github from './github/github';
import Trello from './trello/trello';
import Email from './email/email';

import AppComponent from './app.component';

const appComponentsModule = angular.module('app', [
    Profile.name,
    Linkedin.name,
    Github.name,
    Trello.name,
    Email.name,
])
.component('app', AppComponent);

export default appComponentsModule;
