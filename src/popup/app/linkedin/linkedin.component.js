import template from './linkedin.component.html';

const linkedinComponent = {
  template,
  restrict: 'E',
  bindings: { $router: '<' },
  controller: function linkedinController(profileService, Profile) {
    'ngInject';

    const vm = this;

    vm.profileService = profileService;
    vm.mode = 'new';

    vm.toggleMode = () => {
      vm.mode = vm.mode === 'new' ? 'old' : 'new';
    };

    vm.scoreSum = function() {
      let scoreSum = 0;
      if(vm.profileService.data.linkedin.scoring) {
        scoreSum = Object.keys(vm.profileService.data.linkedin.scoring).reduce(function(sum, key) {
          return sum += vm.profileService.data.linkedin.scoring[key];
        }, 0);
      }
      return scoreSum;
    };

    vm.add = function() {
      if (profileService.data.profile.id !== null) {
        profileService.addLinkedin(profileService.data.linkedin)
        .then(() => {
          profileService.refresh();
        });
      } else {
        profileService.addProfile({
          name: profileService.data.linkedin.name,
          city: profileService.data.linkedin.city,
        }).then(profile => {
          profileService.data.profile = new Profile(profile);
          profileService.addLinkedin(profileService.data.linkedin)
          .then(() => {
            profileService.refresh();
          });
        });
      }
    };

    vm.update = function() {
      profileService.updateLinkedin(profileService.data.linkedin)
      .then(() => {
        profileService.refresh();
      });
    };
  },
  controllerAs: 'vm',
};

export default linkedinComponent;
