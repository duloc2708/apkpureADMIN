const Loader = () => {
	return new Promise(resolve => {
		require.ensure([], () => {
			// require('../../../theme/dist/components/header.min.css');
			resolve()
		});
	});
};

module.exports = Loader;