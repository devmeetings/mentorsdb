import template from './linkedin-jobs.component.html';

const linkedinJobsComponent = {
  template,
  restrict: 'E',
  bindings: {
    $router: '<',
    profile: '=',
  },
  controller: function linkedinJobsController() {
    const vm = this;

    vm.more = {
      jobs: false,
    };
  },
  controllerAs: 'vm',
};

export default linkedinJobsComponent;
