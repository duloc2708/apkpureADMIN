const Loader = () => {
	return new Promise(resolve => {
		require.ensure([], () => {
			// require('../../../theme/dist/components/list.min.css');
			resolve()
		});
	});
};

module.exports = Loader;