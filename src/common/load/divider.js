const Loader = () => {
	return new Promise(resolve => {
		require.ensure([], () => {
			// require('../../../theme/dist/components/divider.min.css');
			resolve()
		});
	});
};

module.exports = Loader;