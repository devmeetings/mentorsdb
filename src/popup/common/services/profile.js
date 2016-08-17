const profileService = function profileService($rootScope, Bridge, MentorsAPI, Linkedin, Profile) {
  'ngInject';

  const data = {
    linkedin: null,
    github: null,
    profile: new Profile(),
  };

  Bridge.port.onMessage.addListener(response => {
    if(typeof response === 'object' && response !== 'undefined' && response !== 'null') {
      if (response.hasOwnProperty('linkedin')) {
        data.linkedin = new Linkedin(response.linkedin);
      }
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

  const getProfile = criteria => {
    return MentorsAPI.all('/profiles').getList('', criteria);
  };

  const getProfileByLinkedin = linkedin => {
    return getProfile({
      linkedin,
    });
  };

  const add = () => {
    return MentorsAPI.all('/profiles').post(data);
  };

  const update = () => {
    return MentorsAPI.all(`/profiles/${data.profile.id}/linkedin`).post(data.linkedin);
  };

  /* const add = () => {
    return MentorsAPI.all(`/profiles/${data.profile.id}/linkedin`).post(data.linkedin);
  };

  const update = () => {
    return MentorsAPI.all(`/profiles/${data.profile.id}/linkedin`).post(data.linkedin);
  }; */

  return {
    data,
    refresh,
    getProfile,
    getProfileByLinkedin,
    add,
    update,
  };
};

export default profileService;
