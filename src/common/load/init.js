const Loader = () => {
	return new Promise(resolve => {
		require.ensure([], () => {
			// require('../../../theme/dist/components/reset.min.css');
			// require('../../../theme/dist/components/site.min.css');
			// require('../../../theme/dist/components/site.min.js');
			resolve()
		});
	});
};

module.exports = Loader;