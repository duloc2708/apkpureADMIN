const Loader = () => {
	return new Promise(resolve => {
		require.ensure([], () => {
			// require('../../../theme/dist/components/icon.min.css');
			resolve()
		});
	});
};

module.exports = Loader;