const Loader = () => {
	return new Promise(resolve => {
		require.ensure([], () => {
			// require('../../../theme/dist/components/container.min.css');
			resolve()
		});
	});
};

module.exports = Loader;