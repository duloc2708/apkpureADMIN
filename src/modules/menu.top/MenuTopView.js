import { requestLogout } from "modules/login/actions";
const { push } = ReactRouterRedux.routerActions || {};

class MenuTopView extends React.Component {
    componentDidMount() {}
    _onLogout() {
        this.props.requestLogout().then(() => {
            this.props.push(Routes.login.view);
        });
    }
    render() {
        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
                <a className="navbar-brand mr-1" href="/admin">
                    Admin
                </a>

                <button
                    className="btn btn-link btn-sm text-white order-1 order-sm-0"
                    id="sidebarToggle"
                    href="#"
                >
                    <i className="fas fa-bars"></i>
                </button>

                {/*Navbar Search */}
                <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search for..."
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                        />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </form>

                {/*Navbar */}
                <ul className="navbar-nav ml-auto ml-md-0">
                    <li className="nav-item dropdown no-arrow mx-1">
                        <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="alertsDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className="fas fa-bell fa-fw"></i>
                            <span className="badge badge-danger">9+</span>
                        </a>
                        <div
                            className="dropdown-menu dropdown-menu-right"
                            aria-labelledby="alertsDropdown"
                        >
                            <a className="dropdown-item" href="#">
                                Action
                            </a>
                            <a className="dropdown-item" href="#">
                                Another action
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">
                                Something else here
                            </a>
                        </div>
                    </li>
                    <li className="nav-item dropdown no-arrow mx-1">
                        <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="messagesDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className="fas fa-envelope fa-fw"></i>
                            <span className="badge badge-danger">7</span>
                        </a>
                        <div
                            className="dropdown-menu dropdown-menu-right"
                            aria-labelledby="messagesDropdown"
                        >
                            <a className="dropdown-item" href="#">
                                Action
                            </a>
                            <a className="dropdown-item" href="#">
                                Another action
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">
                                Something else here
                            </a>
                        </div>
                    </li>
                    <li className="nav-item dropdown no-arrow">
                        <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="userDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className="fas fa-user-circle fa-fw"></i>
                        </a>
                        <div
                            className="dropdown-menu dropdown-menu-right"
                            aria-labelledby="userDropdown"
                        >
                            <a
                                className="dropdown-item"
                                onClick={() => this._onLogout()}
                            >
                                Logout
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>
        );
    }
}
const mapStateToProps = ({ userAuth, i18n, login }, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        login
    };
};
const mapDispatchToProps = dispatch => {
    return Redux.bindActionCreators(
        {
            ...ReactRouterRedux.routerActions,
            requestLogout
        },
        dispatch
    );
};
export default ReactRedux.connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuTopView);
