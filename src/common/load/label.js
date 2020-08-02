const Loader = () => {
	return new Promise(resolve => {
		require.ensure([], () => {
			// require('../../../theme/dist/components/label.min.css');
			resolve()
		});
	});
};

module.exports = Loader;