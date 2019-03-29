import menuNav from 'modules/menu.nav/reducers'
import listtype from 'modules/listtype/reducers'
import video from 'modules/video/reducers'
import blog from 'modules/blog/reducers'
import leecher from 'modules/leecher/reducers'
import users from 'modules/users/reducers'
const rootReducer = Redux.combineReducers({
    leecher: leecher,
    routing: ReactRouterRedux.routerReducer,
    i18n: ReactReduxI18n.i18nReducer,
    menuNav: menuNav,
    listtype: listtype,
    video: video,
    blog: blog,
    users: users
})

module.exports = rootReducer