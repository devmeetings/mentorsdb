import Profile from '../../../content-scripts/models/profile.model';

const linkedinService = function linkedinService($rootScope, Bridge) {
  'ngInject';

  const profile = {
    current: null,
    existing: {},
    initial: {},
  };

  Bridge.port.onMessage.addListener(response => {
    if(typeof response === 'object' && response !== 'undefined' && response !== 'null') {
      profile.current = response.current;
      profile.existing = response.existing;
      profile.initial = new Profile(response.current);
      $rootScope.$apply();
    }
  });

  Bridge.popupPushPort.onMessage.addListener(response => {
    if(response === 'refresh') {
      refresh();
    }
  });

  var background = chrome.extension.getBackgroundPage();
  window.addEventListener("unload", function() {
    var profile = new Profile(profile.current);
    var changed = JSON.stringify(profile) !== JSON.stringify(profile.initial);
    var exists = profile.existing? true: false;
    background.setProfileOnClose({
      profile: profile,
      changed: changed,
      exists: exists
    });
  }, true);

  const refresh = () => {
    Bridge.port.postMessage({
      method: 'getProfile'
    });
  };

  const save = () => {
    Bridge.port.postMessage({
      method: 'setProfile',
      profile: new Profile(profile.current),
    });
    profile.initial = new Profile(profile.current);
  };

  return {
    profile,
    refresh,
    save,
  };
};

export default linkedinService;
