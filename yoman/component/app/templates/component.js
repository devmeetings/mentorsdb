import template from './<%= kebabName %>.component.html';

const <%= camelName %>Component = {
  template,
  restrict: 'E',
  bindings: { $router: '<' },
  controller: function <%= camelName %>Controller() {},
  controllerAs: 'vm',
};

export default <%= camelName %>Component;
