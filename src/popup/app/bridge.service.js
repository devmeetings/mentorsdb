const Bridge = function Bridge() {
  'ngInject';

  return {
    port: chrome.runtime.connect({name: "bridge"}),
    popupPushPort: chrome.runtime.connect({name: "popupPush"}),
  };
};

export default Bridge;
