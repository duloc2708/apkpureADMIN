const Loader = () => {
	return new Promise(resolve => {
		require.ensure([], () => {
			// require('../../../theme/dist/components/image.min.css');
			resolve()
		});
	});
};

module.exports = Loader;