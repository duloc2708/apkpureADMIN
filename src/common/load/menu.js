const Loader = () => {
	return new Promise(resolve => {
		require.ensure([], () => {
			// require('../../../theme/dist/components/menu.min.css');
			resolve();
		});
	});
};

module.exports = Loader;