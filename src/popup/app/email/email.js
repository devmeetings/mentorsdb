import angular from 'angular';

import EmailComponent from './email.component';

const emailModule = angular.module('app.email', [])
.component('emailComponent', EmailComponent);

export default emailModule;
