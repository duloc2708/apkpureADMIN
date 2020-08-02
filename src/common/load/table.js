const Loader = () => {
	return new Promise(resolve => {
		require.ensure([], () => {
			// require('../../../theme/dist/components/table.min.css');
			resolve()
		});
	});
};

module.exports = Loader;