import { createHistory } from 'history';
import reduxThunk from 'redux-thunk';
import reducers from 'app/reducers';
import loggerMiddleware from 'common/middlewares/logger';
const { Translate, I18n } = ReactReduxI18n
let lang = Helper._getCookie('__lang')
// import { logout } from 'modules/header.login/actions'
// import { reset as resetInfo } from 'modules/header.info/actions'
axios.defaults.baseURL = Config.API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8'
const customHistory = ReactRouter.useRouterHistory(createHistory)({
    basename: Config.DEFAULT_FOLDER
});
// moment.tz.setDefault('Asia/Taipei') //set default client timezone
const routingMiddleware = ReactRouterRedux.routerMiddleware(customHistory)
const createStoreWithMiddleware = Redux.applyMiddleware(reduxThunk, routingMiddleware)(Redux.createStore)
const store = createStoreWithMiddleware(reducers)
const history = ReactRouterRedux.syncHistoryWithStore(customHistory, store)
//set interceptors response
axios.interceptors.response.use(function (response) {
    let { StatusCode, Message } = response.data
    let token = response.data.Token
    const { pathname } = window.location;
    if (token) {
        Helper._setCookie('token', token)
    }
    if ((StatusCode == 2 || StatusCode == 3 )) {
        let pr = ''
        // if (Helper.detectMobile()) {
        //     pr = pr + '?fromMode=1'
        // }
        if (Helper._getCookie('token')) {
            Helper._removeCookie('token')
            if (Message == 'Log in time out!')
                Message = I18n.t(`alert.the_session_expired`)
            alert(Message)
            // store.dispatch(logout())
            history.push({
                pathname: Routes.login.view,
                search: pr
            })
        }
        Helper._removeCookie('token')
    }
    return response
}, function (error) {
    return Promise.reject(error)
})
//end
//set interceptors request
axios.interceptors.request.use(function (config) {
    //parse timezone to -03:00
    const { method, data, params, url } = config || {}
    let paramsUp = _.clone(params, true)
    let dataUp = _.clone(data, true)
    // const keyParseTimezone = ['startdate', 'enddate', 'fromDate', 'toDate', 'date']
    // const zoneRequest = '-03:00'
    // switch (method) {
    //     case 'get':
    //         try {
    //             Object.keys(params).map((key, index) => {
    //                 if (keyParseTimezone.indexOf(key) != -1 && url.indexOf('get_ticket_reject') == -1) {
    //                     const valTemp = moment(`${params[key]}`, 'YYYY-MM-DD HH:mm:ss Z').format(`YYYY-MM-DD HH:mm:ss ${zoneRequest}`)
    //                     paramsUp[key] = valTemp
    //                 }
    //             })
    //             config.params = _.clone(paramsUp, true)
    //         } catch (e) {
    //             // return
    //         }
    //         break
    //     case 'post':
    //         try {
    //             Object.keys(dataUp).map((key, index) => {
    //                 if (keyParseTimezone.indexOf(key) != -1) {
    //                     const valTemp = moment(`${dataUp[key]}`, 'YYYY-MM-DD HH:mm:ss Z').format(`YYYY-MM-DD HH:mm:ss ${zoneRequest}`)
    //                     dataUp[key] = valTemp
    //                 }
    //             })
    //             config.data = _.clone(dataUp, true)
    //         } catch (e) {
    //             // return
    //         }
    //         break
    //     default:
    //         break
    // }
    //end parse
    let token = null
    token = Helper._getCookie('token')
    
    if (token) {
        // config.headers.Token = token
        config.headers.Authorization = 'Bearer ' + token;

    }
    //check ssl
    // lang = Helper._getCookie('__lang')
    // config.headers.Lang = Helper._mapLangCToS(lang ? lang : 'zhCN')
    // const { url } = config || {}

    if (origin && origin.indexOf('https://') != -1) {
        //ssl
        switch (true) {
            case (url.indexOf(Config.API_URL) != -1):
                config.url = url.replace(Config.API_URL, Config.API_URL_SSL)
                break
            case (url.indexOf(Config.API_URL_USER) != -1):
                config.url = url.replace(Config.API_URL_USER, Config.API_URL_USER_SSL)
                break
            default:
                break
        }
    } else {
        //no ssl
        switch (true) {
            case (url.indexOf(Config.API_URL) != -1):
                config.url = url.replace(Config.API_URL_SSL, Config.API_URL)
                break
            case (url.indexOf(Config.API_URL_USER) != -1):
                config.url = url.replace(Config.API_URL_USER_SSL, Config.API_URL_USER)
                break
            default:
                break
        }
    }

    return config
}, function (error) {
    return Promise.reject(error)
})
//end
import translationObject from 'lang'
ReactReduxI18n.syncTranslationWithStore(store)
store.dispatch(ReactReduxI18n.loadTranslations(translationObject))
store.dispatch(ReactReduxI18n.setLocale(lang ? lang : 'zhCN'))
import routes from 'app/routes'
//apply bugsnag
import bugsnag from 'bugsnag-js'
const bugsnagClient = bugsnag('7b3f6a2cd15777ceeb3b762671359968')
import createPlugin from 'bugsnag-react'
const ErrorBoundary = bugsnagClient.use(createPlugin(React))
const Provider = ReactRedux.Provider
const Router = ReactRouter.Router
ReactDOM.render(<ErrorBoundary>
    <Provider store={store}>
        <Router history={history}>
            {routes}
        </Router>
    </Provider>
</ErrorBoundary>, document.getElementById('app'))