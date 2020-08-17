import { createHistory } from "history";
import reduxThunk from "redux-thunk";
import reducers from "app/reducers";
import loggerMiddleware from "common/middlewares/logger";
import { showModal } from "modules/modal/actions/form";

const { Translate, I18n } = ReactReduxI18n;
moment.tz.setDefault("Asia/Ho_Chi_Minh"); //set default client timezone
// moment.tz.setDefault('Asia/Taipei') //set default client timezone
axios.defaults.baseURL = Config.API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";
const customHistory = ReactRouter.useRouterHistory(createHistory)({
    basename: Config.DEFAULT_FOLDER
});
const routingMiddleware = ReactRouterRedux.routerMiddleware(customHistory);
const createStoreWithMiddleware = Redux.applyMiddleware(
    reduxThunk,
    routingMiddleware
)(Redux.createStore);
const store = createStoreWithMiddleware(reducers);
const history = ReactRouterRedux.syncHistoryWithStore(customHistory, store);
//set interceptors response
axios.interceptors.response.use(
    function (response) {
        let { StatusCode, Message, Data } = response.data;
        const messOnData = Data ? Data.Message : null;
        let token = response.data.Token;
        if (token) {
            SportConfig._setCookie("token", token);
        }
        if (StatusCode == 4 || StatusCode == 8) {
            SportConfig._removeCookie("token");
            SportConfig._removeCookie("usertype");
            SportConfig._removeCookie("userInfo");
            window.location.href = "/";
            alert(Message);
        }
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);
//end
//set interceptors request
axios.interceptors.request.use(
    function (config) {
        let token = SportConfig._getCookie("token");
        config.headers.Token = token;
        if (token) {
            let oldUserInfo = SportConfig._getCookie("userInfo");
            try {
                oldUserInfo = JSON.parse(
                    SportConfig.function._base64.decode(oldUserInfo)
                );
            } catch (e) {
                oldUserInfo = null;
            }
            config.headers.user_name = (oldUserInfo && oldUserInfo.user_name) || "";
        }
        //check ssl
        const { baseURL, url } = config || {};
        const { location } = window || {};
        const { origin } = location || {};
        if (origin && origin.indexOf("https://") != -1) {
            //ssl
            switch (true) {
                case url.indexOf(Config.API_URL) != -1:
                    config.url = url.replace(Config.API_URL, Config.API_URL_SSL);
                    break;
                case url.indexOf(Config.API_URL_USER) != -1:
                    config.url = url.replace(
                        Config.API_URL_USER,
                        Config.API_URL_USER_SSL
                    );
                    break;
                default:
                    break;
            }
        } else {
            //no ssl
            switch (true) {
                case url.indexOf(Config.API_URL) != -1:
                    config.url = url.replace(Config.API_URL_SSL, Config.API_URL);
                    break;
                case url.indexOf(Config.API_URL_USER) != -1:
                    config.url = url.replace(
                        Config.API_URL_USER_SSL,
                        Config.API_URL_USER
                    );
                    break;
                default:
                    break;
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
//end
import translationObject from "lang";
window.refreshBalance = () => {
    store.dispatch(refreshBalanceAction());
};
ReactReduxI18n.syncTranslationWithStore(store);
store.dispatch(ReactReduxI18n.loadTranslations(translationObject));
const lang = SportConfig._getCookie("lang");
store.dispatch(ReactReduxI18n.setLocale(lang ? lang : "inIn"));
import routes from "app/routes";
//apply bugsnag
// import bugsnag from 'bugsnag-js'
// const bugsnagClient = bugsnag('7b3f6a2cd15777ceeb3b762671359968')
import createPlugin from "bugsnag-react";
// const ErrorBoundary = bugsnagClient.use(createPlugin(React))
const Provider = ReactRedux.Provider;
const Router = ReactRouter.Router;
ReactDOM.render(
    // <ErrorBoundary>
    <Provider store={store}>
        <Router history={history}>{routes}</Router>
    </Provider>,
    // </ErrorBoundary>
    document.getElementById("app")
);
