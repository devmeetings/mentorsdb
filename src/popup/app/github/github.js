import angular from 'angular';

import GithubComponent from './github.component';
import GithubsComponent from './githubs/githubs.component';

const githubModule = angular.module('app.github', [])
.component('githubComponent', GithubComponent)
.component('githubs', GithubsComponent);

export default githubModule;
