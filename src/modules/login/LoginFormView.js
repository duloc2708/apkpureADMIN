import * as loginActions from 'modules/login/actions/form'
import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
const { Translate, I18n } = ReactReduxI18n;
import LanguageFormView from 'modules/language/LanguageFormView'
class UserFormSignIn extends React.Component {
	constructor() {
		super()
	}
	componentWillMount() {
		const token = SportConfig._getCookie('token')
		const { location } = this.props.ownProps || {}
		if (token) {
			this.props.push({
				pathname: Routes.home.view,
				search: location ? location.search : ''
			})
		}
	}
	componentDidMount() {
		//event enter
		KeyboardJS.bind('enter', (event) => {
			if ($('#username').is(':focus') || $('#password').is(':focus')) {
				$('#password').blur()
				$('#username').blur()
				this._onLogin()
			}
		})
		$('#username').focus()
	}
	componentDidUpdate() {
		const { token } = this.props.login || {}
		const { location } = this.props.ownProps || {}
		if (token) {
			if (SportConfig._getCookie('token')/*localStorage.getItem('token')*/) {
				return this.props.push({
					pathname: Routes.home.view,
					search: location ? location.search : ''
				})
			}
		}
	}
	componentWillUnmount() {
		KeyboardJS.unbind('enter')
	}
	_setCookie(key, value, time) {
		let expires = new Date()
		expires.setTime(expires.getTime() + time)
		document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + expires.toUTCString()
	}
	_getCookie(cname) {
		var name = cname + "="
		var ca = document.cookie.split(';')
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i]
			while (c.charAt(0) == ' ') {
				c = c.substring(1)
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length)
			}
		}
		return ""
	}
	_onLogin() {
		//blur input
		$('#password').blur()
		$('#username').blur()
		//validate
		let username = $('#username').val()
		let password = $('#password').val()
		if (username != '' && password != '' && username != ' ') {
			this.props.requestLogin({
				Username: username,
				Password: Helper.encryptString(password).toString()
			})
				.then((response) => {
					let { StatusCode, Message } = response.data || {}
					if (StatusCode !== 0) {
						//noty
						if (Message.indexOf('password invalid') != -1) {
							Message = `${Message.substr(0, Message.indexOf(','))}, ${I18n.t(`alert.the_pass_is_invalid`)}`
						}
						else if (Message.indexOf('Please contact us to active!') != -1) {
							Message = `${Message.substr(0, Message.indexOf(' '))} ${I18n.t(`alert.has_been_suspended`)}`
						}
						else if (Message.indexOf('user not exist!') != -1) {
							Message = `${Message.substr(0, Message.indexOf(','))}, ${I18n.t(`alert.user_does_not_exist`)}`
						}
						//this.props.showModal({ type: 'modalNoti', message: Message })
						alert(Message)
						$('#username').focus()
					}
					else {
						this.props.UIUnblock()
						window.location.reload()
						// sessionStorage.setItem('is_login', "1");
						// localStorage.saveSyncedSessionData('test', 'key')
					}
				}, (err) => {
					$('#username').focus()
				})
		}
		else {
			//this.props.showModal({ type: 'modalNoti', message: I18n.t(`alert.please_fill_username`) })
			alert('please_fill_username')
			$('#username').focus()
		}
	}
	_onRegister() {
		this.props.newWindowAccount(Routes.register.view)
	}
	_onChangeField(field, value) {
		this.props.formChange(field, value)
	}
	_closeModal() {
		this.props.hideModal({ type: 'modalNoti' })
	}
	_onForgotPass() {
		this.props.newWindowForgotPass(Routes.forgotPassword.view)
	}
	render() {
		const { values } = this.props.login || {}
		const { active } = this.props.dimmer || {}
		const { message, isOpen } = this.props.modal.modalNoti || {}
		let disabledLogin = (values &&
			values.username) ? false : true
		return (
			<section >
				<div className="login">
					<div className="login-triangle"></div>
					<h2 className="login-header">Màn hình đăng nhập</h2>
					<form className="login-container">
						<p><input type="text" id="username" placeholder="Username" style={{ "color": "black" }} /></p>
						<p><input type="password" id="password" placeholder="Password" /></p>
						<p><a className="loginadmin"
							onTouchStart={event => {
								this._onLogin()
							}}
							onClick={event => {
								this._onLogin()
							}}>Đăng nhập</a></p>
					</form>
				</div>
			</section>
		)

	}
}
const mapStateToProps = ({
	login,
	dimmer,
	modal,
	i18n
}, ownProps) => {
	return {
		login,
		dimmer,
		modal,
		i18n,
		ownProps
	}
}
const mapDispatchToProps = (dispatch) => {
	return Redux.bindActionCreators({
		...ReactRouterRedux.routerActions,
		...loginActions,
		...modalActions,
		...dimmerActions
	}, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(UserFormSignIn)
