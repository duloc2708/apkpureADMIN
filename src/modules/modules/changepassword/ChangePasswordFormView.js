
const { Translate, I18n } = ReactReduxI18n;
import * as changePassActions from 'modules/changepassword/actions/form'
import { userLogout } from 'modules/login/actions/form'

class ChangePasswordFormView extends React.Component {
	_handleInput(e) {
		let { value, id } = e.target
		let { objData } = this.props.changepassword
		let objDataTemp = _.clone(objData, true)
		objDataTemp[id] = value
		this.props.changePassInputData(objDataTemp)
	}
	_onChangePass() {
		let { objData: { passold, passnew, passnewagain } } = this.props.changepassword
		if (!passold) {
			alert('Vui lòng nhập mật khẩu cũ.')
		} else if (!passnew || !passnewagain) {
			alert('Vui lòng nhập mật khẩu mới.')
		}
		else if (passnew != passnewagain) {
			alert('Mật khẩu mới không khớp.')
		} else {
			this.props.checkPassOld().then(response => {
				let { StatusCode } = response.data
				if (StatusCode != 0) {
					alert('Mật khẩu cũ sai, vui lòng nhập lại.')
				} else {
					this.props.changePassWord().then(res2 => {
						this.props.userLogout()
						setTimeout(() => {
							// this.props.push(Routes.login.view)
							window.location.reload()
						}, 200);
					})
				}
			})
		}
	}
	render() {
		let { objData: { passold, passnew, passnewagain } } = this.props.changepassword
		return (
			<div className="container">
				<section >
					<div className="main__content">
						<div className="form__personnal">
							<hr />
							<div className="row">
								<div className="col-md-4">
									<div className="form-group ">
										<div className="left">
											<label htmlFor="name">Mật khẩu cũ</label>
										</div>
										<div className="right">
											<input className="name form-control"
												value={passold}
												onChange={(e) => this._handleInput(e)}
												type="password"
												ref="passold"
												id="passold"
												name="passold"
												required="" />
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-4">
									<div className="form-group ">
										<div className="left">
											<label htmlFor="name">Mật khẩu mới</label>
										</div>
										<div className="right">
											<input className="name form-control"
												value={passnew}
												onChange={(e) => this._handleInput(e)}
												type="password"
												ref="passnew"
												id="passnew"
												name="passnew"
												required="" />
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-4">
									<div className="form-group ">
										<div className="left">
											<label htmlFor="name">Nhập lại mật khẩu mới</label>
										</div>
										<div className="right">
											<input className="name form-control"
												value={passnewagain}
												onChange={(e) => this._handleInput(e)}
												type="password"
												ref="passnewagain"
												id="passnewagain"
												name="passnewagain"
												required="" />
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-4" style={{ textAlign: "center" }}>
									<div className="form-group ">
										<div className="right">
											<button onClick={() => this._onChangePass()}>
												Thay đổi
											</button>
										</div>
									</div>
								</div>
							</div>

						</div>
						{/* <div className="login main__content">
							<div className="login-triangle"></div>
							<h2 className="login-header">Đổi mật khẩu</h2>
							<form className="login-container">
								<p><input type="text" id="username" placeholder="Username" style={{ "color": "black" }} /></p>
								<p><input type="password" id="password" placeholder="Password" /></p>
								<p><a className="loginadmin"
									onTouchStart={event => {
										this._onLogin()
									}}
									onClick={event => {
										this._onLogin()
									}}>Thay đổi</a></p>
							</form>
						</div> */}
					</div>
				</section>
			</div>
		)

	}
}
const mapStateToProps = ({
	login,
	i18n,
	changepassword
}, ownProps) => {
	return {
		login,
		i18n,
		changepassword
	}
}
const mapDispatchToProps = (dispatch) => {
	return Redux.bindActionCreators({
		...ReactRouterRedux.routerActions,
		...changePassActions,
		userLogout
	}, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ChangePasswordFormView)
