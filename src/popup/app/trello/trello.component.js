import template from './trello.component.html';

const trelloComponent = {
  template,
  restrict: 'E',
  bindings: { $router: '<' },
  controller: function trelloController(profileService, trelloService) {
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
    	trelloService.addToList(profileService.data.profile.id, board.boardId, list.id).then(trello => {
        profileService.data.profile.trello = trello;
      });
    };

    vm.openTrello = trello => {
      chrome.tabs.create({
        url: `https://trello.com/c/${trello.id}`,
        active: true
      });
    };

    vm.removeTrello = () => {
      if (confirm('Czy na pewno chcesz odwiązać kartę Trello do tego profilu?')) {
        trelloService.detach(profileService.data.profile.id).then(() => {
          profileService.data.profile.trello = undefined;
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
