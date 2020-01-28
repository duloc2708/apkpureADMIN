import DetailFormView from "./DetailFormView.js";
import Toolbar from "../toolbar/Toolbar";
import ListFormView from "./ListFormView";
import * as toolbarActions from "modules/toolbar/actions/form";
import * as postActions from "modules/post/actions/form";

class ArticleFormView extends React.Component {
    ChangeButtonToolbar(item) {
        let isChange = true;
        switch (item.key) {
            case "ADD":
                this.props.changeStatus(true);
                break;
            case "SAVE":
                if (this.validate()) {
                    this.props.submitArticle().then(() => {
                        this.props.getListData();
                        this.child._addNotification(
                            `Cập nhật thành công!`,
                            "success"
                        );
                    });
                    this.props.changeStatus(false);
                } else {
                    isChange = false;
                }
                break;
            case "CANCEL":
                this.props.changeStatus(false);
            default:
                break;
        }
        if (isChange) {
            this.props.changeStatusButton(item);
        }
    }
    validate() {
        const { objArticle } = this.props.post;
        if (!objArticle.name) {
            this.child._addNotification(
                `Vui lòng nhập tên khoá học!`,
                "warning"
            );

            return false;
        }
        if (!objArticle.typeId) {
            this.child._addNotification(`Vui lòng nhập thể loại!`, "warning");

            return false;
        }
        if (!objArticle.notes) {
            this.child._addNotification(`Vui lòng nhập nội dung!`, "warning");

            return false;
        }
        if (!objArticle.price) {
            this.child._addNotification(`Vui lòng nhập giá tiền!`, "warning");

            return false;
        }
        return true;
    }
    render() {
        const { is_edit } = this.props.post;
        return (
            <div
                style={{
                    margin: "10px",
                    marginBottom: "50px",
                    height: "500px"
                }}
            >
                <AlertCustom onRef={ref => (this.child = ref)} />
                <Toolbar parentObject={this} />
                <br />
                {is_edit ? (
                    <DetailFormView parentObject={this} />
                ) : (
                    <ListFormView />
                )}
            </div>
        );
    }
}

const mapStateToProps = ({ userAuth, i18n, post }, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        post
    };
};
const mapDispatchToProps = dispatch => {
    return Redux.bindActionCreators(
        {
            ...ReactRouterRedux.routerActions,
            ...toolbarActions,
            ...postActions
        },
        dispatch
    );
};
export default ReactRedux.connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleFormView);
