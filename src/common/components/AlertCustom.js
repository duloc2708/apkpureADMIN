var NotificationSystem = require('react-notification-system');
class AlertCustom extends React.Component {
	constructor() {
		super()
		this.state = {
			_notificationSystem: null
		}
	}
	componentDidMount() {
		this.state._notificationSystem = this.refs.notificationSystem;
		this.props.onRef(this)

	}
	componentWillUnmount() {
		this.props.onRef(null)
	}
	_addNotification(mes,type) {
		this.state._notificationSystem.addNotification({
			message: mes,
			level: type
		});
	}
	render() {
		return (
			<div>
				<NotificationSystem ref="notificationSystem" />
			</div>
		)
	}
}
// AlertCustom.propTypes = {
// 	message: React.PropTypes.string.isRequired,
// 	okBtn: React.PropTypes.string.isRequired,
// 	isOpen: React.PropTypes.bool.isRequired
// }
AlertCustom.defaultProps = {
	message: 'Failed!',
	okBtn: 'OK',
	isOpen: false
}
module.exports = AlertCustom