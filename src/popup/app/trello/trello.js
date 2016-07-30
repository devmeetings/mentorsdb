import angular from 'angular';

import TrelloComponent from './trello.component';

const trelloModule = angular.module('app.trello', [])
.component('trelloComponent', TrelloComponent);

export default trelloModule;
