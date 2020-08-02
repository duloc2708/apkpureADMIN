class ModalNoti extends React.Component {
	componentDidUpdate() {
		this._init();
	}
	_init() {
		const { isOpen } = this.props || {};
		if (isOpen) {
			$(".modalNoti").fadeIn("fast");
			$(this.refs.dimmer).fadeIn("fast");
		} else {
			$(".modalNoti").fadeOut("fast");
			$(this.refs.dimmer).fadeOut("fast");
		}
	}
	_closeModal() {
		this.props.onClose();
	}
	render() {
		const { message, okBtn } = this.props || {};
		return (
			<div>
				<div ref="dimmer" className="dimmer"></div>
				<div className="modal modal-alert modalNoti">
					<div className="modal-content">
						<div className="modal__body">
							<p className="text-center">
								{message ? message : ""}
							</p>
							<div className="text-center margin-top-10">
								<a
									className="button"
									onClick={event => this._closeModal()}
								>
									{okBtn}
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
// ModalNoti.propTypes = {
// 	message: React.PropTypes.string.isRequired,
// 	okBtn: React.PropTypes.string.isRequired,
// 	isOpen: React.PropTypes.bool.isRequired
// }
ModalNoti.defaultProps = {
	message: "Failed!",
	okBtn: "OK",
	isOpen: false
};
module.exports = ModalNoti;
