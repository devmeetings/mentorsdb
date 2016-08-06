import template from './trello.component.html';

const trelloComponent = {
  template,
  restrict: 'E',
  bindings: { $router: '<' },
  controller: function trelloController($window, profileService, trelloService) {
    'ngInject';

    const vm = this;

    vm.profileService = profileService;
    vm.trackedBoards = [];

    vm.getTrackedBoards = () => {
    	trelloService.getTrackedBoards().then(boards => {
    		vm.trackedBoards = boards;
    	});
    };

    vm.addToList = (board, list) => {
    	trelloService.addToList(profileService.profile.existing.id, board.boardId, list.id).then(trello => {
        profileService.profile.existing.trello = trello;
      });
    };

    vm.openTrello = trello => {
      chrome.tabs.create({
        url: `https://trello.com/c/${trello.id}`,
        active: true
      });
    };

    vm.removeTrello = () => {
      if ($window.confirm('Czy na pewno chcesz odwiązać kartę Trello do tego profilu?')) {
        trelloService.detach(profileService.profile.existing.id).then(() => {
          profileService.profile.existing.trello = undefined;
        });
      }
    };

    vm.$routerOnActivate = next => {
    	vm.getTrackedBoards();
    };
  },
  controllerAs: 'vm',
};

export default trelloComponent;
