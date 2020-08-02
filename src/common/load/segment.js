const Loader = () => {
	return new Promise(resolve => {
		require.ensure([], () => {
			// require('../../../theme/dist/components/segment.min.css');
			resolve()
		});
	});
};

module.exports = Loader;