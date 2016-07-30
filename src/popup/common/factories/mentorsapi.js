const MentorsAPI = function(Restangular) {
	'ngInject';

	return Restangular.withConfig(RestangularConfigurer => {
		RestangularConfigurer.setBaseUrl('https://mentorsdb.yado.pl/');
	});
};

export default MentorsAPI;