import { changeStatusButton } from "modules/toolbar/actions/form";
import * as postActions from "modules/post/actions/form";

class ListFormView extends React.Component {
    componentDidMount() {
        this.props.getListData();
    }
    _onRowEdit(item) {
        this.props.editItemArticle(item.id).then(() => {
            this.props.changeStatus(true);
            this.props.changeStatusButton({ key: "EDIT" });
        });
    }
    _onRowRemove(item) {
        this.props.removeArticle(item).then(res => {
            this.child._addNotification(`Cập nhật thành công!`, "success");
            this.props.getListData();
        });
    }
    render() {
        const { list_data, listHeader } = this.props.post;
        return (
            <div className="table-responsive" style={{ marginTop: "10px" }}>
                <AlertCustom onRef={ref => (this.child = ref)} />
                <table className="table">
                    <thead>
                        <tr>
                            {listHeader.map((item, i) => {
                                return <th key={item.key}>{item.title}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {list_data.map(item => {
                            const {
                                checked,
                                id,
                                orderBy,
                                name,
                                notes,
                                typeId,
                                teacherId,
                                price
                            } = item;
                            return (
                                <tr key={`item_${id}`}>
                                    <td>{name}</td>
                                    <td>{price}</td>
                                    <td>{typeId}</td>
                                    <td>{teacherId}</td>
                                    <td>{`Active`}</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                this._onRowEdit(item)
                                            }
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td onClick={() => this._onRowRemove(item)}>
                                        <button>Xoá</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
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
            ...postActions,
            changeStatusButton
        },
        dispatch
    );
};
export default ReactRedux.connect(
    mapStateToProps,
    mapDispatchToProps
)(ListFormView);
