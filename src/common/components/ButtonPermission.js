class ButtonPermission extends React.Component {
	constructor() {
		super()

	}
	_addNotification(mes, type) {

	}
	_onRowEdit() {
		let { listButton } = this.props.toolbar
		let { nameBtn } = this.props
		let checkPermisson = listButton.filter(x => x.code == nameBtn)
		if (checkPermisson.length == 0) {
			alert('Chức năng này chưa được phân quyền!')
		} else {
			let { data } = this.props
			this.props.parentObject.ChangeRowEdit(data);
		}

	}
	_onRowDetail() {
		let { listButton } = this.props.toolbar
		let { nameBtn } = this.props
		let checkPermisson = listButton.filter(x => x.code == nameBtn)
		if (checkPermisson.length == 0) {
			alert('Chức năng này chưa được phân quyền!')
		} else {
			let { data } = this.props
			this.props.parentObject.ChangeRowDetail(data);
		}

	}
	_onRowPrint() {
		let { listButton } = this.props.toolbar
		let { nameBtn } = this.props
		let checkPermisson = listButton.filter(x => x.code == nameBtn)
		if (checkPermisson.length == 0) {
			alert('Chức năng này chưa được phân quyền!')
		} else {
			let { data } = this.props
			this.props.parentObject.ChangeRowPrint(data);
		}
	}
	_renderButton() {
		let data = []
		let { nameBtn, type, icon, key } = this.props
		switch (nameBtn) {
			case "EDIT":
				data.push(
					<button key={type} onClick={() => this._onRowEdit()}><i className={icon} aria-hidden="true"></i></button>
				)
				break;
			case "DETAIL":
				data.push(
					<button key={type} onClick={() => this._onRowDetail()}><i className={icon} aria-hidden="true"></i></button>
				)
				break;
			case "PRINT":
				data.push(
					<button key={type} onClick={() => this._onRowPrint()}><i className={icon} aria-hidden="true"></i></button>
				)
				break;
			default:
				data.push(<span key="span_temp"></span>)
				break;
		}
		return data
	}
	_onClickButton(nameBtn, type, icon, key, data) {
		let { listButtonPer } = this.props.toolbar
		console.log('listButtonPer',listButtonPer)
		let checkPermisson = listButtonPer.filter(x => x == nameBtn)
		let oldUserInfo = SportConfig._getCookie('userInfo')
		try {
			oldUserInfo = JSON.parse(SportConfig.function._base64.decode(oldUserInfo))
		} catch (e) {
			oldUserInfo = null
		}
		if (oldUserInfo.user_name.toUpperCase() !== 'ADMIN') {
			if (checkPermisson.length == 0) {
				alert('Chức năng này chưa được phân quyền!')
			} else {
				this.props.parentObject.onClickButtonPermission({ data: data, nameBtn: nameBtn });
			}
		} else {
			this.props.parentObject.onClickButtonPermission({ data: data, nameBtn: nameBtn });
		}
	}
	render() {
		let { nameBtn, type, icon, key, data } = this.props
		return (
			<td>
				<button key={type} onClick={() => this._onClickButton(nameBtn, type, icon, key, data)}><i className={icon} aria-hidden="true"></i></button>
				{/* {this._renderButton()} */}
			</td>
		)
	}
}

const mapStateToProps = ({
	toolbar
}, ownProps) => {
	return {
		toolbar
	}
}
module.exports = ReactRedux.connect(mapStateToProps, null)(ButtonPermission) 
