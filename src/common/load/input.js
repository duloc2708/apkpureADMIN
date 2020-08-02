const Loader = () => {
	return new Promise(resolve => {
		require.ensure([], () => {
			// require('../../../theme/dist/components/input.min.css');
			resolve()
		});
	});
};

module.exports = Loader;