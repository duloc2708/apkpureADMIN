import * as userActions from 'modules/login/actions/form'
import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
const { Translate, I18n } = ReactReduxI18n;
class UserFormSignIn extends React.Component {
    componentDidMount(){
    }
    constructor() {
        super()
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
                Password: password
            })
                .then((response) => {
                    let { StatusCode, Message } = response.data || {}

                }, (err) => {

                })
        }
        else {
        }
    }
    render() {
        return (
            <div className="container">
              <LoginFormView/>
            </div>
        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...userActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(UserFormSignIn)
