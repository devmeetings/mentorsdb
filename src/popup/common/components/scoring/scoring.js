import template from './scoring.html';

const scoringComponent = {
  template,
  restrict: 'E',
  bindings: {
    'score': '='
  },
  controller: function scoringController() {
    'ngInject';

    const vm = this;

    vm.scores = [-10, -3, 0, 3, 10];

    vm.updateScore = function(value) {
      vm.score = value;
    };
  },
  controllerAs: 'vm',
};

export default scoringComponent;
