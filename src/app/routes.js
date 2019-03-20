const { Route, IndexRoute } = ReactRouter
import App from 'app/App'
import Backend from 'app/Backend'
import AuthHoc from 'common/hoc/Auth'
import HomeView from 'modules/home/HomeView'
import NotFoundView from 'modules/404/NotFoundView'
import LoginView from 'modules/login/LoginView'
import ListTypeFormView from 'modules/listtype/ListTypeFormView'
import VideoFormView from 'modules/video/VideoFormView'
import UploadsFormView from 'modules/uploads/UploadsFormView'
import BlogFormView from 'modules/blog/BlogFormView'
import LeecherFormView from 'modules/leecher/LeecherFormView'


const routes = (
    <Route component={App}>
        <Route component={LoginView} path={Routes.login.view}>
            <IndexRoute component={LoginView} />
        </Route>
        <Route component={AuthHoc(Backend)}>
            <Route component={HomeView} path={Routes.home.view}>
                <Route component={ListTypeFormView} path={Routes.listtype.view}></Route>
                <Route component={LeecherFormView} path={Routes.leecher.view}></Route>
                <Route component={VideoFormView} path={Routes.video.view}></Route>
                <Route component={UploadsFormView} path={Routes.uploads.view}></Route>
                <Route component={BlogFormView} path={Routes.blog.view}></Route>
            </Route>
        </Route>
        <Route path="*" component={NotFoundView} />
    </Route>
)

module.exports = routes