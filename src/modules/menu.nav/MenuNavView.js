class MenuNavView extends React.Component {
  componentDidMount() {}
  render() {
    const { pathname } = window.location;
    const { listMenuUser, listMenuAdmin } = this.props.menuNav;
    const { list_table_config } = this.props.init;
    let listMenu = listMenuUser;
    let userInfo = Helper._getCookie("userInfo");
    if (userInfo) {
      userInfo = JSON.parse(Helper._base64.decode(userInfo));
      if (userInfo.username && userInfo.username.toUpperCase() == "ADMIN") {
        listMenu = listMenuAdmin;
      }
    }
    return (
      <ul className="sidebar navbar-nav">
        {listMenu.map(item => {
          const { text, icon, key, routes } = item;
          return (
            <li
              key={key}
              className={`nav-item ${pathname == routes ? "active" : ""}`}
            >
              <a className="nav-link" onClick={() => this.props.push(key)}>
                <i className={icon}></i>
                <span>{text}</span>
              </a>
            </li>
          );
        })}
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="pagesDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-fw fa-folder"></i>
            <span>Danh mục</span>
          </a>
          <div className="dropdown-menu" aria-labelledby="pagesDropdown">
            {list_table_config.map(item => {
              return (
                <a
                  key={item.code}
                  className="dropdown-item"
                  href={`/other_list?code=${item.code}`}
                >
                  {item.title}
                </a>
              );
            })}
          </div>
        </li>
      </ul>
    );
  }
}

const mapStateToProps = ({ i18n, menuNav, init }, ownProps) => {
  return {
    i18n,
    ownProps,
    menuNav,
    init
  };
};
const mapDispatchToProps = dispatch => {
  return Redux.bindActionCreators(
    {
      ...ReactRouterRedux.routerActions
    },
    dispatch
  );
};
export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuNavView);
