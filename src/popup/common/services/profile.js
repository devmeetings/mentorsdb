import Profile from '../../../content-scripts/models/profile.model';

const profileService = function profileService($rootScope, Bridge, MentorsAPI) {
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

  const add = () => {
    return MentorsAPI.all(`/profiles/${profile.existing.id}/linkedin`).post(profile.current.linkedin);
  };

  const update = () => {
    return MentorsAPI.all(`/profiles/${profile.existing.id}/linkedin`).post(profile.current.linkedin);
  };

  return {
    profile,
    refresh,
    add,
    update,
  };
};

export default profileService;
