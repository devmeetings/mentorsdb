const backgroundService = function backgroundService(Bridge) {
  'ngInject';

  const waitingRequests = [];

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  const request = (what, data) => {
    const id = guid();
    return new Promise((resolve, reject) => {
      waitingRequests.push({
        id,
        resolve,
        reject,
      });
      Bridge.popupPort.postMessage({
        id,
        method: what,
        data: data,
      });
    });
  };

  Bridge.popupPort.onMessage.addListener(response => {
    if(typeof response === 'object' && response !== 'undefined' && response !== 'null') {
      if (response.hasOwnProperty('id')) {
        let index;
        const waitingRequest = waitingRequests.find((request, i) => {
          index = i;
          return request.id === response.messageId
        });
        if (waitingRequest) {
          waitingRequests.splice(index, 1);
          waitingRequest.resolve(response.data);
        }
      }
      $rootScope.$apply();
    }
  });

  return {
    request,
  };
};

export default backgroundService;
