// import { changeLang } from '../../modules/language/actions/form'
// import {logout} from 'modules/header.login/actions'
const Auth = ComposedComponent => {
    class Authentication extends React.Component {
        componentDidMount() {
            return this._checkBeforeGoRoute()
        }
        componentDidUpdate() {
            return this._checkBeforeGoRoute()
            this._scale()
        }
        _scale(){
            //set meta viewport
            setTimeout(() => {
                let siteWidth = Config.siteWidth
                let scale = screen.width / siteWidth
                document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=' + siteWidth + ', initial-scale=' + scale + '');
            }, 0)
        }
        checkURLParams() {
            const { href, search, pathname } = window.location || {}
            const bf = Helper._getCookie('__bf')
            const c = Helper._getParams(href,'c')
            let jsonParams = queryString.parse(search)
            delete jsonParams['c']
            jsonParams = queryString.stringify(jsonParams)
            if(bf != c && c && bf){
                //  return this.props.logout()
            }
            else if(bf!=c && !c){
                return this.context.router.push({
                    pathname: Routes.login.view,
                    search: jsonParams
                })
            }
        }
        _checkBeforeGoRoute() {
            const { href, pathname: pathCurr } = window.location || {}
            let token = Helper._getCookie('token');            
            if (token) {
                // return this.checkURLParams()
            } else if(pathCurr != '/login'){
                 return this.context.router.push(Routes.login.view)
            }
            else {
                return true
            }
    
        }
        render() {
            return <ComposedComponent { ...this.props } />
        };
    };

    Authentication.contextTypes = {
        router: PropTypes.object.isRequired
    }

    const mapStateToProps = ( ownProps) => {
        return { ownProps }
    };

    const mapDispatchToProps = (dispatch) => {
        return Redux.bindActionCreators({
            // logout
            //changeLang
        }, dispatch)
    }

    return ReactRedux.connect(null, mapDispatchToProps)(Authentication)
}

export default Auth