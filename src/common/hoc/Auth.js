import { /*getMaxMinBetSetting, */setToken } from '../../modules/login/actions/form'
import { changeLang } from '../../modules/language/actions/form'
const Auth = ComposedComponent => {
    class Authentication extends React.Component {
        componentDidMount() {
            // this.props.getMaxMinBetSetting();
            this._checkBeforeGoRoute();
        }
        componentDidUpdate() {
            this._checkBeforeGoRoute();
        }
        _checkBeforeGoRoute() {
            const { location } = this.props.ownProps || {}
            if (SportConfig._getCookie('token')) {
                $("#admincss").attr("href", "");
            } else {
                let tk = localStorage.getItem('token');
                if (tk) {
                    // this.props.setToken(decodeURI(location.query.Token))
                    SportConfig._setCookie('token', decodeURI(tk))
                    setTimeout(() => {
                        this.props.push({
                            pathname: location.pathname,
                            search: location ? location.search : ''
                        })
                        // window.location.reload()
                    }, 0)
                }
                else {
                    this.props.push({
                        pathname: Routes.login.view,
                        search: location ? location.search : ''
                    })
                    // const {hostname} = window.location || {}
                    // const subDM = SportConfig._getSubdomain(hostname)
                    // if(subDM!=Config.SUBDOMAIN_ASIA){
                    //     // this.props.push(Routes.login.view)
                    //     this.props.push({
                    //         pathname: Routes.login.view,
                    //         search: location ? location.search : ''
                    //     })
                    // }
                    // else {
                    //     this.props.push({
                    //         pathname: Routes.home.view,
                    //         search: location ? location.search : ''
                    //     })
                    // }
                }
            }
            //check change language
            if (location &&
                location.query &&
                location.query.Lang) {
                const { Lang } = location.query || {}
                this.props.changeLang(Lang)
            }
        }
        render() {
            return <ComposedComponent {...this.props} />
        };
    };

    const mapStateToProps = ({ userAuth }, ownProps) => {
        return { userAuth, ownProps };
    };

    const mapDispatchToProps = (dispatch) => {
        return Redux.bindActionCreators({
            ...ReactRouterRedux.routerActions,
            // getMaxMinBetSetting,
            setToken,
            changeLang
        }, dispatch);
    };

    return ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Authentication);
};

export default Auth;
