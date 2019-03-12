import menuNav from 'modules/menu.nav/reducers'
import listtype from 'modules/listtype/reducers'
import video from 'modules/video/reducers'
import blog from 'modules/blog/reducers'

const rootReducer = Redux.combineReducers({
    routing: ReactRouterRedux.routerReducer,
    i18n: ReactReduxI18n.i18nReducer,
    menuNav: menuNav,
    listtype: listtype,
    video: video,
    blog:blog
})

module.exports = rootReducer