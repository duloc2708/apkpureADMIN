class Backend extends React.Component{
	render(){
		const {children} = this.props
		return (
			<div>
				{children}
	    	</div>
		)
	}
}

const mapStateToProps = ({userAuth}) => {
	return {userAuth}
}

const mapDispatchToProps = (dispatch) => {
	return Redux.bindActionCreators({
		...ReactRouterRedux.routerActions,
	}, dispatch)
}

module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Backend)