import DetailCastingProcFormView from "./DetailCastingProcFormView";
import ListCastingProcFormView from "./ListCastingProcFormView";
const { Translate, I18n } = ReactReduxI18n;
import ToolbarFormView from "modules/toolbar/ToolbarFormView";
import * as toolbarActions from "modules/toolbar/actions/form";
import * as castingProcActions from "modules/ticket_proc/actions/form";
import BrackcrumFromView from "modules/brackcrum/BrackcrumFromView";

class CastingProcFormView extends React.Component {
    constructor() {
        super();
        this.state = {
            inputSearch: ""
        };
    }
    componentWillUnmount() {
        this.props.resetDataCastingProc();
    }

    render() {
        let { isDetail } = this.props.ticket_proc;
        let { list_config_process } = this.props.header;
        const type = Helper.getParam(window.location.href, "type");
        let listReport = list_config_process.filter(x => x.Code == type);
        return (
            <div className="container">
                <AlertCustom onRef={ref => (this.child = ref)} />
                <section>
                    <BrackcrumFromView
                        title={`Quy trình ${(listReport[0] &&
                            listReport[0].Name) ||
                            ""}`}
                    />
                    <div className="main__content">
                        <ToolbarFormView isPopup={true} parentObject={this} />
                        {isDetail ? (
                            <DetailCastingProcFormView />
                        ) : (
                            <ListCastingProcFormView parentObject={this} />
                        )}
                    </div>
                </section>
            </div>
        );
    }
}

// lấy ALL dữ liệu từ các reducer
const mapStateToProps = (
    { userAuth, i18n, ticket_proc, toolbar, header },
    ownProps
) => {
    return {
        userAuth,
        i18n,
        ownProps,
        ticket_proc,
        toolbar,
        header
    };
};
const mapDispatchToProps = dispatch => {
    return Redux.bindActionCreators(
        {
            ...ReactRouterRedux.routerActions,
            // ...userActions,
            // ...listActions,
            // ...productsActions,
            ...toolbarActions,
            ...castingProcActions
            // resetInfoPage
        },
        dispatch
    );
};
export default ReactRedux.connect(
    mapStateToProps,
    mapDispatchToProps
)(CastingProcFormView);
