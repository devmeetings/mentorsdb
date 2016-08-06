import template from './email.component.html';
import Email from '../../../content-scripts/models/email.model';

const emailComponent = {
  template,
  restrict: 'E',
  bindings: { $router: '<' },
  controller: function emailController(profileService, MailVerifier) {
    'ngInject';

    const vm = this;

    vm.profileService = profileService;
    vm.MailVerifier = MailVerifier;

    vm.newmail = '';

    vm.addEmail = function(email) {
      if(email) {
        vm.profileService.profile.current.email.push(new Email({
          address: email,
          source: 'manual'
        }));
      }
    };

    vm.removeEmail = function(i) {
      vm.profileService.profile.current.email.splice(i, 1);
    };
  },
  controllerAs: 'vm',
};

export default emailComponent;
