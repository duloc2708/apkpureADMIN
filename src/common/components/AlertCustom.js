class AlertCustom extends React.Component {
	constructor() {
		super();
		this.state = {
			_notificationSystem: null
		};
	}
	componentDidMount() {
		this.state._notificationSystem = this.refs.notificationSystem;
		this.props.onRef(this);
	}
	componentWillUnmount() {
		this.props.onRef(null);
	}
	_addNotification(mes, type) {
		this.state._notificationSystem.addNotification({
			message: mes,
			level: type
		});
	}
	render() {
		return (
			<div>
				<ReactNotif ref="notificationSystem" />
			</div>
		);
	}
}

module.exports = AlertCustom;
