const Loader = () => {
	return new Promise(resolve => {
		require.ensure([], () => {
			// require('../../../theme/dist/components/transition.min.css');
			// require('../../../theme/dist/components/transition.min.js');
			// require('../../../theme/dist/components/dropdown.min.css');
			// require('../../../theme/dist/components/dropdown.min.js');
			resolve();
		});
	});
};

module.exports = Loader;