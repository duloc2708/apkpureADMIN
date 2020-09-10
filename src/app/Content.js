const { Translate, I18n } = ReactReduxI18n;
class Content extends React.Component {

	render() {
		const { location } = this.props.children.props || {}
		let code = location && location.pathname
		let { list_function_user, list_function } = this.props.header
		let check = list_function_user.filter(x => x.code.indexOf(code) !== 1)
		let oldUserInfo = SportConfig._getCookie('userInfo')
		try {
			oldUserInfo = JSON.parse(SportConfig.function._base64.decode(oldUserInfo))
		} catch (e) {
			oldUserInfo = null
		}
		return (
			<div >
				{
					check.length > 0 || oldUserInfo && oldUserInfo.user_name.toUpperCase() == 'ADMIN' ?
						<div>{this.props.children}</div>
						: <div></div>
				}

			</div>
		);
	}
};



const mapStateToProps = ({
	header,
	i18n,
	routing
}, ownProps) => {
	return {
		header,
		i18n,
		ownProps,
		routing
	}
}

const mapDispatchToProps = dispatch => {
	return Redux.bindActionCreators({
		...ReactRouterRedux.routerActions,

	}, dispatch);
};

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Content);