import MenuTopView from "modules/menu.top/MenuTopView";
import MenuNavView from "modules/menu.nav/MenuNavView";
import * as initActions from "modules/init/actions/form";
import * as homeActions from "modules/home/actions/form";

class HomeView extends React.Component {
  componentDidMount() {
    this.props.getListAllTableConfig().then(() => {
      this.props.getListAllParameter().then(() => {
        this.props.IsRenderContent(true);
      });
    });
  }
  render() {
    const { is_render } = this.props.home;
    console.log("is_render>>>>>>>", is_render);
    return (
      <div id="page-top">
        <MenuTopView />
        {is_render ? (
          <div id="wrapper">
            <MenuNavView />
            <div id="content-wrapper">{this.props.children}</div>
          </div>
        ) : (
          ""
        )}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>
        {/* <Logout /> */}
      </div>
    );
  }
}

const mapStateToProps = ({ i18n, home }, ownProps) => {
  return {
    i18n,
    home,
    ownProps
  };
};
const mapDispatchToProps = dispatch => {
  return Redux.bindActionCreators(
    {
      ...ReactRouterRedux.routerActions,
      ...initActions,
      ...homeActions
    },
    dispatch
  );
};
export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeView);
