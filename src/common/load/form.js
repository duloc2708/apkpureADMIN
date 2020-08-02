const Loader = () => {
	return new Promise(resolve => {
		require.ensure([], () => {
			// require('../../../theme/dist/components/form.min.css');
			resolve()
		});
	});
};

module.exports = Loader;