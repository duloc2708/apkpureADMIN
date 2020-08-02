const { Translate, I18n } = ReactReduxI18n;
import { userLogout } from 'modules/login/actions/form'
import HeaderFormView from 'modules/header/HeaderFormView'
import FooterFormView from 'modules/footer/FooterFormView'
import Content from './Content'
import UserFormSignIn from 'modules/user/UserFormSignIn'

class App extends React.Component {
	componentWillMount() {
		Helper.DisableWebKeyboard()
	}
	componentWillUnmount() {

	}
	render() {

		return (
			<div className="page personnal employee" style={{ "width": "1400px" }}>
				{SportConfig._getCookie('token') ?
					<HeaderFormView /> : <span></span>}
				{SportConfig._getCookie('token') ?
					<Content children={this.props.children} />
					:
					<UserFormSignIn />
				}
				{SportConfig._getCookie('token') ?
					<FooterFormView /> : <span></span>}
			</div>


		);
	}
};



const mapStateToProps = ({ userAuth }) => {
	return { userAuth };
};

const mapDispatchToProps = dispatch => {
	return Redux.bindActionCreators({
		...ReactRouterRedux.routerActions,
		userLogout
	}, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(App);