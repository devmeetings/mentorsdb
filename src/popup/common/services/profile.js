const profileService = function profileService($rootScope, Bridge, MentorsAPI, Linkedin, Profile, Scoring) {
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
        getProfileByLinkedin(data.linkedin.id)
        .then(profile => {
          if (profile) {
            data.profile = new Profile(profile);
            data.linkedin.comment = data.profile.linkedin.comment;
            data.linkedin.scoring = new Scoring(data.profile.linkedin.scoring);
            data.linkedin.tags = data.profile.linkedin.tags.slice();
          }
        }).finally(() => {
          $rootScope.$apply();
        });
      }
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
    return MentorsAPI.all('/profile').get('', criteria);
  };

  const getProfileByLinkedin = linkedin => {
    return getProfile({
      linkedin,
    });
  };

  const profileDiff = (profile) => JSON.stringify(profile) !== JSON.stringify(data.profile);

  const linkedinDiff = () => JSON.stringify(data.linkedin) !== JSON.stringify(data.profile.linkedin);

  const addProfile = (profile) => {
    return MentorsAPI.all('/profiles').post(profile);
  };

  const addLinkedin = (linkedin) => {
    return MentorsAPI.all(`/profiles/${data.profile.id}/linkedin`).post(linkedin);
  };

  const updateLinkedin = (linkedin) => {
    return MentorsAPI.one(`/profiles/${data.profile.id}/linkedin`).customPUT(linkedin);
  };

  return {
    data,
    refresh,
    getProfile,
    getProfileByLinkedin,
    profileDiff,
    linkedinDiff,
    addProfile,
    addLinkedin,
    updateLinkedin,
  };
};

export default profileService;
