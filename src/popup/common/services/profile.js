import Profile from '../../../content-scripts/models/profile.model';

const profileService = function profileService($rootScope, Bridge) {
  'ngInject';

  const profile = {
    current: null,
    existing: {},
    initial: {},
  };

  Bridge.port.onMessage.addListener(response => {
    if(typeof response === 'object' && response !== 'undefined' && response !== 'null') {
      profile.current = new Profile(response.current);
      profile.existing = new Profile(response.existing);
      profile.initial = new Profile(response.current);
      $rootScope.$apply();
    }
  });

  Bridge.popupPushPort.onMessage.addListener(response => {
    if(response === 'refresh') {
      refresh();
    }
  });

  /* const background = chrome.extension.getBackgroundPage();
  window.addEventListener("unload", function() {
    const profile = new Profile(profile.current);
    const changed = JSON.stringify(profile) !== JSON.stringify(profile.initial);
    const exists = profile.existing? true: false;
    background.setProfileOnClose({
      profile: profile,
      changed: changed,
      exists: exists
    });
  }, true); */

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

export default profileService;
