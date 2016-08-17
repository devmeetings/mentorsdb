import template from './email.component.html';

const emailComponent = {
  template,
  restrict: 'E',
  bindings: { $router: '<' },
  controller: function emailController(profileService, mailVerifierService, Email) {
    'ngInject';

    const vm = this;

    vm.profileService = profileService;
    vm.mailVerifierService = mailVerifierService;

    vm.newmail = '';

    vm.addEmail = function(email) {
      if(email) {
        vm.profileService.data.email.push(new Email({
          address: email,
          source: 'manual'
        }));
      }
    };

    vm.removeEmail = function(i) {
      vm.profileService.data.email.splice(i, 1);
    };
  },
  controllerAs: 'vm',
};

export default emailComponent;
