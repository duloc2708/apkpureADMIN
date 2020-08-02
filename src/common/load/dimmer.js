const Loader = () => {
	return new Promise(resolve => {
		require.ensure([], () => {
			// require('../../../theme/dist/components/dimmer.min.css');
			// require('../../../theme/dist/components/dimmer.min.js');
			resolve()
		});
	});
};

module.exports = Loader;