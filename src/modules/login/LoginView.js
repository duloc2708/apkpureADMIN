
import { check as checkTokenURL, requestLogin } from 'modules/login/actions'
const { push } = ReactRouterRedux.routerActions || {}
class LoginView extends React.Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !Immutable.fromJS(nextProps).equals(Immutable.fromJS(this.props))
    }

    componentDidMount() {
        this.props.checkTokenURL(this.props.ownProps)
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
                username: username,
                password: password
            })
                .then((response) => {
                    let { StatusCode, Data, Message } = response.data
                    if (StatusCode !== 0) {
                        alert(Message)
                    } else {
                        this.props.push(Routes.home.view)
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
    render() {
        return (
            <div className="container" style={{ "width": "450px", "textAlign": "center" }}>
                <div className="card card-container">
                    <h1> ADMIN</h1>
                    <span id="reauth-email" className="reauth-email"></span>
                    <input type="email" id="username" className="form-control" placeholder="Tên đăng nhập" required autoFocus />
                    <input type="password" id="password" className="form-control" placeholder="Mật khẩu" required />
                    <a
                        onClick={event => {
                            this._onLogin()
                        }}
                        className="btn btn-lg btn-primary btn-block btn-signin">Đăng nhập</a>
                </div>
            </div>
        )
    }
}
const mapStateToProps = ({ }, ownProps) => {
    return { ownProps }
}

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        push,
        checkTokenURL,
        requestLogin
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(LoginView)

