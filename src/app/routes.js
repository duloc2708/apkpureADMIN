const { Route, IndexRoute } = ReactRouter;
import App from "app/App";
import Backend from "app/Backend";
import AuthHoc from "common/hoc/Auth";
import HomeView from "modules/home/HomeView";
import NotFoundView from "modules/404/NotFoundView";
import LoginView from "modules/login/LoginView";
import ListTypeFormView from "modules/listtype/ListTypeFormView";
import VideoFormView from "modules/video/VideoFormView";
import UploadsFormView from "modules/uploads/UploadsFormView";
import ArticleFormView from "modules/post/ArticleFormView";
import BlogFormView from "modules/post.blog/BlogFormView";
import LeecherFormView from "modules/leecher/LeecherFormView";
import LeecherApkFormView from "modules/leecher.apk/LeecherApkFormView";
import UsersFormView from "modules/users/UsersFormView";
import PageServiceFormView from "modules/pageservice/PageServiceFormView";
import SlideFormView from "modules/slide/SlideFormView";
import OtherListFormView from "modules/other_list/OtherListFormView";
import TableConfigFormView from "modules/table_config/TableConfigFormView";

const routes = (
  <Route component={App}>
    <Route component={LoginView} path={Routes.login.view}>
      <IndexRoute component={LoginView} />
    </Route>
    <Route component={AuthHoc(Backend)}>
      <Route component={HomeView} path={Routes.home.view}>
        <Route
          component={OtherListFormView}
          path={Routes.other_list.view}
        ></Route>
        <Route
          component={LeecherApkFormView}
          path={Routes.leecherapk.view}
        ></Route>
        <Route component={TableConfigFormView} path={Routes.tableConfig.view}></Route>
        <Route component={SlideFormView} path={Routes.slide.view}></Route>
        <Route
          component={PageServiceFormView}
          path={Routes.pageservice.view}
        ></Route>
        <Route component={UsersFormView} path={Routes.users.view}></Route>
        <Route component={ListTypeFormView} path={Routes.listtype.view}></Route>
        <Route component={LeecherFormView} path={Routes.leecher.view}></Route>
        <Route component={VideoFormView} path={Routes.video.view}></Route>
        <Route component={UploadsFormView} path={Routes.uploads.view}></Route>
        <Route component={ArticleFormView} path={Routes.post.view}></Route>
        <Route component={BlogFormView} path={Routes.blog.view}></Route>
      </Route>
    </Route>
    <Route path="*" component={NotFoundView} />
  </Route>
);

module.exports = routes;
