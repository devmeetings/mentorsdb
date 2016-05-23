import template from './profiles.component.html';

const profilesComponent = {
    template,
    restrict: 'E',
    bindings: { $router: '<' },
    controller: function profilesController($scope, profilesListService) {
        'ngInject';

        const vm = this;

        vm.profilesListService = profilesListService;
        vm.showCounter = 30;
        vm.searchText = '';

        vm.refreshProfiles = () => {
          vm.loading = true;
          profilesListService.getList().then(function() {
              vm.showCounter = 30;
          });
        };

        $scope.$watch('vm.searchText', () => {
          vm.showCounter = 30;
        });

        vm.searchFunction = searchText => {
          const keywords = searchText.toLowerCase().split(' ');
          return item => {
            const text = JSON.stringify(item).toLowerCase();
            let match = true;
            for(let i = 0; match && i < keywords.length; i++) {
              if(keywords[i] !== '' && text.indexOf(keywords[i]) < 0) {
                match = false;
              }
            }
            return match;
          };
        };

        vm.showMore = function() {
          vm.showCounter = Math.min(vm.showCounter + 30, vm.profilesListService.data.list.length);
        };

        vm.refreshProfiles();
    },
    controllerAs: 'vm',
};

export default profilesComponent;
