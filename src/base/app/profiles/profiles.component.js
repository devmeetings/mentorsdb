import template from './profiles.component.html';

const profilesComponent = {
    template,
    restrict: 'E',
    bindings: { $router: '<' },
    controller: function profilesController($scope, profilesListService) {
        'ngInject';

        const vm = this;

        vm.profilesListService = profilesListService;
        vm.pageNo = 1;
        vm.searchText = '';

        vm.refreshProfiles = () => {
          vm.loading = true;
          profilesListService.getPage();
        };

        $scope.$watch('vm.searchText', () => {
          vm.pageNo = 1;
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
          vm.pageNo = Math.min(vm.pageNo + 1, 1000);
          profilesListService.getPage(vm.pageNo);
        };
        };

        vm.refreshProfiles();
    },
    controllerAs: 'vm',
};

export default profilesComponent;
