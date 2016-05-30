import Taggle from 'taggle/src/taggle.js';

const taggle = () => ({
  scope: {
    'tags': '='
  },
  link: function taggleLink(scope, element, attrs) {
    var taggle = new Taggle(attrs.id, {
      tags: scope.tags,
      onTagAdd: function() {
        scope.tags.length = 0;
        Array.prototype.push.apply(scope.tags, taggle.getTags().values);
        console.log(scope.tags);
      },
      onTagRemove: function() {
        scope.tags.length = 0;
        console.log(taggle.getTags().values);
        Array.prototype.push.apply(scope.tags, taggle.getTags().values);
        console.log(scope.tags);
      }
    });
  },
});

export default taggle;
