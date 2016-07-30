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
    	trelloService.addToList(profileService.profile.existing.id, board.boardId, list.id);
    };

    vm.$routerOnActivate = next => {
    	vm.getTrackedBoards();
    };
  },
  controllerAs: 'vm',
};

export default trelloComponent;
