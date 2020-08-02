const Loader = () => {
	return new Promise(resolve => {
		require.ensure([], () => {
			// require('../../../theme/dist/components/grid.min.css');
			resolve()
		});
	});
};

module.exports = Loader;