class Dimmer extends React.Component {
	render() {
		const { active, style } = this.props;
		let newStyle = style || {};
		newStyle.display = active ? "block" : "none";
		return (
			<div className="dimmer" style={newStyle}>
				{this.props.children}
			</div>
		);
	}
}
// Dimmer.propTypes = {
//     active: React.PropTypes.bool
//   }
Dimmer.defaultProps = {
	active: false
};
module.exports = Dimmer;
