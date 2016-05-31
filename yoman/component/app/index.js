var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
    this.argument('name', {
      type: String,
      required: true
    });
  },
  generate: function() {
    var kebabName = _.kebabCase(this.name);
    var snakeName = _.snakeCase(this.name);
    var camelName = _.camelCase(this.name);
    var capitalizedName = _.upperFirst(camelName);

    this.fs.copyTpl(
      this.templatePath('component.js'),
      this.destinationPath(kebabName + '.component.js'),
      {
        snakeName: snakeName,
        kebabName: kebabName,
        camelName: camelName,
        capitalizedName: capitalizedName
      }
    );

    this.fs.copyTpl(
      this.templatePath('component.html'),
      this.destinationPath(kebabName + '.component.html'),
      {
        snakeName: snakeName,
        kebabName: kebabName,
        camelName: camelName,
        capitalizedName: capitalizedName
      }
    );
  }
});