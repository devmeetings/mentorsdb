import template from './profile.component.html';

const profileComponent = {
  template,
  restrict: 'E',
  bindings: { $router: '<' },
  controller: function profileController(profileService, Profile) {
    'ngInject';

    const vm = this;

    vm.profileService = profileService;
    vm.profile = new Profile(profileService.data.profile);

    vm.add = () => {
      profileService.addProfile({
        name: vm.profile.name,
        city: vm.profile.city,
      }).then(profile => {
        profileService.data.profile = new Profile(profile);
        vm.profile = new Profile(profileService.data.profile);
      });
    };

    vm.update = () => {
      alert('TO DO: Updating profile');
    };
  },
  controllerAs: 'vm',
};

export default profileComponent;
