import * as headerActions from "modules/header/actions/form";
import { getListDataList } from "modules/list/actions/form";
import { resetInfoPage } from "modules/common/actions/form";
import { checkAllRow } from "../output/actions/form";
import { userLogout } from "modules/login/actions/form";
class HeaderFormView extends React.Component {
  componentWillMount() {
    this.props.getListType();
    this.props.getListConfig();
    this.props.getListConfigProcess();
    this.props.getListFunction();
    this.props.authLogin();

    //his.props.getListOtherAll()
    $("#admin_css").attr("href", "");
  }
  _onLink(type, code) {
    let { list_function_user, list_function } = this.props.header;
    let check = list_function_user.filter(x => x.code == type);
    let oldUserInfo = SportConfig._getCookie("userInfo");
    try {
      oldUserInfo = JSON.parse(
        SportConfig.function._base64.decode(oldUserInfo)
      );
    } catch (e) {
      oldUserInfo = null;
    }

    if (check.length > 0 || oldUserInfo.user_name.toUpperCase() == "ADMIN") {
      let params = {
        type: code.toUpperCase(),
        page: 1,
        total: 50
      };
      this.props.resetInfoPage();
      this.props.getListDataList(params);
      this.props.push(Routes.list.view + `?code=${code}`);
      $("#name").removeClass("has-error");
      $("#code").removeClass("has-error");
    } else {
      alert("Chức năng này chưa được phần quyền!");
    }
  }
  onClickData(code) {
    let oldUserInfo = SportConfig._getCookie("userInfo");
    try {
      oldUserInfo = JSON.parse(
        SportConfig.function._base64.decode(oldUserInfo)
      );
    } catch (e) {
      oldUserInfo = null;
    }

    let { list_function_user, list_function } = this.props.header;
    let check = list_function_user.filter(x => x.code == code);
    if (check.length > 0 || oldUserInfo.user_name.toUpperCase() == "ADMIN") {
      this.props.push("/" + code);
    } else {
      alert("Chức năng này chưa được phần quyền!");
    }
  }
  componentDidMount() {
    this.props.getListFunctionByUserHeader();
    let that = this;
    // Đổi mật khẩu
    $(".popup-menu li:eq(0)").click(function () {
      that.onChangePassword();
    });
    // Đăng xuất

    $(".popup-menu li:eq(1)").click(function () {
      that.onLogout();
    });

    let oldUserInfo = SportConfig._getCookie("userInfo");
    try {
      oldUserInfo = JSON.parse(
        SportConfig.function._base64.decode(oldUserInfo)
      );
    } catch (e) {
      oldUserInfo = null;
    }
    let username = (oldUserInfo && oldUserInfo.user_name) || "";
    this.props.getUsername(username);
  }
  onChangePassword() {
    this.props.push(Routes.changepassword.view);
  }
  onLogout() {
    this.props.userLogout();
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }
  parseMenu(data) {
    let listMenu = [];
    let listChildren = []
    data.forEach(item => {
      let newItem = {};
      let groupName = item.groupMenu || item.name;
      if (!listMenu.find(x => x.groupName === groupName)) {
        newItem.code = item.code;
        newItem.groupName = groupName;
        newItem.children = [item];
        listMenu.push(newItem);
      } else {
        listMenu = listMenu.map(itemMenu => {
          if (itemMenu.groupName === groupName) {
            itemMenu.children.push(item)
          }
          return itemMenu
        })
      }
    });
    return listMenu
  }
  render() {
    let { list, list_function, list_config_process } = this.props.header;
    const { location } = this.props.ownProps || {};
    let page = "";
    if (
      this.props.routing &&
      this.props.routing.locationBeforeTransitions.pathname
    ) {
      page = this.props.routing.locationBeforeTransitions.pathname;
    }
    let userInfo = SportConfig._getCookie("userInfo");
    try {
      userInfo = JSON.parse(SportConfig.function._base64.decode(userInfo));
    } catch (e) {
      userInfo = null;
    }
    let checkRenderPT = false;
    list_function = this.parseMenu(list_function)
    return (
      <header>
        <nav className="navbar2 menu navbar navbar-inverse navbar-static-top">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar3"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">
              <img src="images/logo.jpg" alt="logo" />
            </a>
          </div>
          <div id="navbar3" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              {list_function.map(item => {
                let { code, id, groupName, name, parent, groupMenu, children } = item;
                if (code == 'ticket_proc') {
                  return (
                    <li
                      key={"997"}
                      className={`${page == "name" ? "activeMenu" : ""}`}
                    >
                      <a>{groupName}</a>
                      <ul className="sub-menu list-unstyled">
                        <li key={`process_search_bag`}>
                          <a href={`/search-bag`}>
                            {`Tìm kiếm Bag`}
                          </a>
                        </li>
                        {list_config_process.map(item => {
                          if (item.IsApply == 1) {
                            return (
                              <li key={`process_${item.Id}`}>
                                <a href={`/ticket_proc?type=${item.Code}`}>
                                  {item.Name}
                                </a>
                              </li>
                            );
                          }
                        })}
                      </ul>
                    </li>
                  );
                } else if ((code == "list")) {
                  return (
                    <li
                      key={-1}
                      className={`${page == "/" ? "activeMenu" : ""}`}
                    >
                      <a>Danh mục</a>
                      <ul className="sub-menu list-unstyled">
                        {list &&
                          list.map((item, i) => {
                            let { id, code, name, status } = item;
                            if (status == 1) {
                              return (
                                <li
                                  key={`nav_${i}`}
                                  onClick={() => this._onLink("list", code)}
                                >
                                  <a>{name}</a>
                                </li>
                              );
                            }
                          })}
                      </ul>
                    </li>
                  );
                }
                else if (
                  code != "bagdetail" &&
                  code != "productDetail" &&
                  code != "changepassword"
                ) {
                  if (children.length == 1) {
                    return (
                      <li
                        key={code}
                        className={`${page == code ? "activeMenu" : ""}`}
                      >
                        <a onClick={() => this.onClickData(code)}>{groupName}</a>
                      </li>
                    )
                  } else {
                    return (
                      <li
                        key={code}
                        className={`${page == code ? "activeMenu" : ""}`}
                      >
                        <a>{groupName}</a>
                        <ul className="sub-menu list-unstyled">
                          {children.map(item => {
                            return (
                              <li key={item.code}>
                                <a href={`/${item.code}`}>{item.name}</a>
                              </li>
                            )
                          })
                          }
                        </ul>
                      </li>
                    )
                  }
                }

              })}
              {userInfo && userInfo.user_name.toUpperCase() == "ADMIN" ? (
                <li
                  key={"999"}
                  className={`${page == "per" ? "activeMenu" : ""}`}
                >
                  <a>Phân quyền</a>
                  <ul className="sub-menu list-unstyled">
                    {/* <li >
                                           <a href='/permissonPage' >{'Danh sách user'}</a>
                                       </li> */}
                    <li>
                      <a href="/permissonPage">{"Phân quyền chức năng"}</a>
                    </li>
                    <li>
                      <a href="/createReport">{"Định nghĩa báo cáo"}</a>
                    </li>
                  </ul>
                </li>
              ) : (
                  ""
                )}
            </ul>
            <div className="admin">
              <span>
                <i className="fa fa-user-circle-o" aria-hidden="true"></i>
                <span>
                  <a className="button"> {userInfo && userInfo.user_name}</a>
                </span>
                {/* | <a onClick={() => this.onLogout()}>Đăng xuất</a> */}
                <div className="dropdown">
                  <div className="clearfix">
                    <img
                      src="images/default_user.png"
                      width="90px"
                      height="90px"
                    />
                    <span>
                      {userInfo && userInfo.user_name}
                      <br />
                      infor@gmail.com
                    </span>
                  </div>
                  <ul className="list-unstyled popup-menu">
                    <li>
                      <a>Đổi mật khẩu</a>
                    </li>
                    <li>
                      <a onClick={() => this.onLogout()}>Đăng xuất</a>
                    </li>
                  </ul>
                </div>
              </span>
            </div>
          </div>
        </nav>
        {/* <div className="submenu">
                    <div className="scrollmenu">
                        {list && list.map((item, i) => {
                            let { id, code, name, status } = item
                            if (status == 1) {
                                return (
                                    <a key={`nav_${i}`} onClick={() => this._onLink('list', code)}>
                                        {name}
                                    </a>
                                )
                            }
                        })
                        }

                    </div>
                </div> */}
      </header>
    );
  }
}
const mapStateToProps = ({ header, i18n, routing }, ownProps) => {
  return {
    header,
    i18n,
    ownProps,
    routing
  };
};
const mapDispatchToProps = dispatch => {
  return Redux.bindActionCreators(
    {
      ...ReactRouterRedux.routerActions,
      ...headerActions,
      getListDataList,
      resetInfoPage,
      userLogout
    },
    dispatch
  );
};
export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderFormView);
