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
import PostFormView from 'modules/post/PostFormView'
import BlogFormView from 'modules/post.blog/BlogFormView'
import LeecherFormView from 'modules/leecher/LeecherFormView'
import UsersFormView from 'modules/users/UsersFormView'
import PageServiceFormView from 'modules/pageservice/PageServiceFormView'

const routes = (
    <Route component={App}>
        <Route component={LoginView} path={Routes.login.view}>
            <IndexRoute component={LoginView} />
        </Route>
        <Route component={AuthHoc(Backend)}>
            <Route component={HomeView} path={Routes.home.view}>
                <Route component={PageServiceFormView} path={Routes.pageservice.view}></Route>
                <Route component={UsersFormView} path={Routes.users.view}></Route>
                <Route component={ListTypeFormView} path={Routes.listtype.view}></Route>
                <Route component={LeecherFormView} path={Routes.leecher.view}></Route>
                <Route component={VideoFormView} path={Routes.video.view}></Route>
                <Route component={UploadsFormView} path={Routes.uploads.view}></Route>
                <Route component={PostFormView} path={Routes.post.view}></Route>
                <Route component={BlogFormView} path={Routes.blog.view}></Route>
            </Route>
        </Route>
        <Route path="*" component={NotFoundView} />
    </Route>
)

module.exports = routes