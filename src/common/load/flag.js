const Flag = () => {
	return new Promise(resolve => {
		require.ensure([], () => {
			// require('../../../theme/dist/components/flag.min.css');
			resolve()
		});
	});
};

module.exports = Flag;