import template from './linkedin-emails.component.html';
import Email from '../../../../content-scripts/models/email.model';

const linkedinEmailsComponent = {
  template,
  restrict: 'E',
  bindings: {
    $router: '<',
    profile: '=',
  },
  controller: function linkedinEmailsController(MailVerifier) {
    'ngInject';

    const vm = this;

    vm.MailVerifier = MailVerifier;
    vm.more = {
      emails: false,
    };
    vm.newmail = '';

    vm.addEmail = function(email) {
      if(email) {
        vm.profile.current.linkedin[0].email.push(new Email({
          address: email,
          source: 'manual'
        }));
      }
    };

    vm.removeEmail = function(i) {
      vm.profile.current.linkedin[0].email.splice(i, 1);
    };
  },
  controllerAs: 'vm',
};

export default linkedinEmailsComponent;
