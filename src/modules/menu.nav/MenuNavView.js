
class MenuNavView extends React.Component {
    componentDidMount() {

    }
    render() {
        const { pathname } = window.location
        const { listMenuUser, listMenuAdmin } = this.props.menuNav
        let listMenu = listMenuUser
        let userInfo = Helper._getCookie('userInfo')
        if (userInfo) {
            userInfo = JSON.parse(Helper._base64.decode(userInfo))
            if (userInfo.username.toUpperCase() == "ADMIN") {
                listMenu = listMenuAdmin
            }
        }
        return (
            < ul className="sidebar navbar-nav" >
                {
                    listMenu.map(item => {
                        const { text, icon, key, routes } = item
                        return (
                            <li key={key} className={`nav-item ${pathname == routes ? 'active' : ''}`}>
                                <a className="nav-link" onClick={() => this.props.push(key)} >
                                    <i className={icon}></i>
                                    <span>{text}</span>
                                </a>
                            </li>
                        )
                    })
                }
            </ul >

        )
    }
}

const mapStateToProps = ({
    i18n,
    menuNav
}, ownProps) => {
    return {
        i18n,
        ownProps,
        menuNav
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(MenuNavView)

