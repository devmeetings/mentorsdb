const Bridge = function Bridge() {
  'ngInject';

  return {
    port: chrome.runtime.connect({name: "bridge"}),
  };
};

export default Bridge;
