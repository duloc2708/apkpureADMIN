import menuNav from "modules/menu.nav/reducers";
import listtype from "modules/listtype/reducers";
import video from "modules/video/reducers";
import post from "modules/post/reducers";
import leecher from "modules/leecher/reducers";
import users from "modules/users/reducers";
import pageservice from "modules/pageservice/reducers";
import leecherapk from "modules/leecher.apk/reducers";
import other_list from "modules/other_list/reducers";
import init from "modules/init/reducers";
import home from "modules/home/reducers";
import toolbar from "modules/toolbar/reducers";
import tableConfig from "modules/table_config/reducers";
import uploads from "modules/uploads/reducers";

const rootReducer = Redux.combineReducers({
  uploads,
  tableConfig,
  toolbar,
  home: home,
  init,
  other_list,
  leecherapk: leecherapk,
  pageservice: pageservice,
  leecher: leecher,
  routing: ReactRouterRedux.routerReducer,
  i18n: ReactReduxI18n.i18nReducer,
  menuNav: menuNav,
  listtype: listtype,
  video: video,
  post: post,
  users: users
});

module.exports = rootReducer;
