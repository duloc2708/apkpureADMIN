const { push } = ReactRouterRedux.routerActions || {}
const {Translate} = ReactReduxI18n || {}
class NotFoundView extends React.Component {
	_onBackHome(){
		const token = Helper._getCookie('token')
		const __bf = Helper._getCookie('__bf')
    const search = __bf ? `?${queryString.stringify({
        c: __bf
    })}` : ''
		if(token && __bf){
			this.props.push({
				pathname: Routes.home.view,
				search: search
		})
		}else{
			this.props.push(Routes.login.view)
		}
	}
  render() {
    return (
      <div className="notfound">
        not found
      </div>
    );
  }
}
const mapStateToProps = ({}) => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return Redux.bindActionCreators({
		push,
	}, dispatch);
};
export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(NotFoundView);
