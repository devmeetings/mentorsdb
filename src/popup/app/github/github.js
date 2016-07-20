import angular from 'angular';

import GithubComponent from './github.component';

const githubModule = angular.module('app.github', [])
.component('githubComponent', GithubComponent);

export default githubModule;
