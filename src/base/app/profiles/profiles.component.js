import template from './profiles.component.html';

const profilesComponent = {
    template,
    restrict: 'E',
    bindings: { $router: '<' },
    controller: function profilesController($scope, profilesService) {
        'ngInject';

        const vm = this;

        vm.profiles = [];
        vm.showCounter = 30;
        vm.loading = false;
        vm.searchText = '';

        vm.refreshProfiles = () => {
          vm.loading = true;
          profilesService.getAll().then(function(profiles) {
              vm.profiles = profiles;
              vm.loading = false;
              vm.showCounter = 30;
          });
        };

        $scope.$watch('vm.searchText', () => {
          vm.showCounter = 30;
        });

        vm.searchFunction = searchText => {
          // const keywords = searchText.toLowerCase().split(' ');
          return item => {
            return true;
            /* const text = JSON.stringify(item).toLowerCase();
            let match = true;
            for(let i = 0; match && i < keywords.length; i++) {
              if(keywords[i] !== '' && text.indexOf(keywords[i]) < 0) {
                match = false;
              }
            }
            return match; */
          };
        };

        vm.showMore = function() {
          vm.showCounter = Math.min(vm.showCounter + 30, vm.profiles.length);
        };

        vm.refreshProfiles();
    },
    controllerAs: 'vm',
};

export default profilesComponent;
