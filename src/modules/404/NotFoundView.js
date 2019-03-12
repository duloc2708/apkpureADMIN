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
        <div className="notfound__logo">
          <img src="/images/banner-top-left.png" className="banner-top-left" />
          <img src="/images/logo_404.png" className="logo_404 pointer" onClick={()=>this._onBackHome()}/>
          <img
            src="/images/banner-top-right.png"
            className="banner-top-right"
          />
        </div>
        <div className="notfound__content">
          <div className="notfound__image">
            <img src="/images/404.png" />
            <div className="notfound__title"><Translate value="page404.pageNotFound"/></div>
          </div>

          <div className="notfound__back">
            <a className="btn" onClick={()=>this._onBackHome()}><Translate value="page404.goHome"/></a>
          </div>
        </div>
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
