import menuNav from 'modules/menu.nav/reducers'
import listtype from 'modules/listtype/reducers'
import video from 'modules/video/reducers'
import post from 'modules/post/reducers'
import leecher from 'modules/leecher/reducers'
import users from 'modules/users/reducers'
import pageservice from 'modules/pageservice/reducers'
import leecherapk from 'modules/leecher.apk/reducers'
const rootReducer = Redux.combineReducers({
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
})

module.exports = rootReducer