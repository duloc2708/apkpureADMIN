const Loader = () => {
	return new Promise(resolve => {
		require.ensure([], () => {
			// require('../../../theme/dist/components/checkbox.min.css');
			// require('../../../theme/dist/components/checkbox.min.js');
			resolve()
		});
	});
};

module.exports = Loader;