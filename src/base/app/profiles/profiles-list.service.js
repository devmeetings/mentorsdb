const profilesListService = function profilesListService(profilesService) {
  'ngInject';

  const data = {
    list: [],
    loading: false,
  };

  const getPage = (pageNo) => {
    data.loading = true;
    return profilesService.getPage(pageNo).then(profiles => {
      data.list = profiles;
      data.loading = false;
    });
  };

  return {
    data,
    getPage,
  };
};

export default profilesListService;
