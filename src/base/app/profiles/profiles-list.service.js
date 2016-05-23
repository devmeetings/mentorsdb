const profilesListService = function profilesListService(profilesService) {
  'ngInject';

  const data = {
    list: [],
    loading: false,
  };

  const getList = () => {
    data.loading = true;
    return profilesService.getPage().then(profiles => {
      data.list = profiles;
      data.loading = false;
      return profiles;
    });
  };

  return {
    data,
    getList,
  };
};

export default profilesListService;
