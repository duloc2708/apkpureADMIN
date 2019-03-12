
class MenuNavView extends React.Component {
    componentDidMount() {

    }
    render() {
        const { pathname } = window.location
        const { listMenu } = this.props.menuNav
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

