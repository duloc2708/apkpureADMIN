import * as postActions from "modules/post/actions/form";
import VideoFormView from "./VideoFormView";

class ChapterFormView extends React.Component {
    componentDidMount() {
        // init list chapter by article id
        const { objArticle } = this.props.post;
        if (
            objArticle.id &&
            objArticle.chapters &&
            objArticle.chapters.length > 0
        ) {
            this.props.updateListChapter(objArticle.chapters);
        }
    }
    _onShowVideos(item) {
        this.props.showModalVideo(true);
        this.props.editItemChapter(item.id);
    }
    _onSaveChapter() {
        const { objChapter, objArticle, listDataChapter } = this.props.post;
        if (!objArticle.id) {
            this.child._addNotification(`Khoá học không tồn tại!`, "warning");
            return;
        }
        const itemExists = listDataChapter.find(
            x => x.name === objChapter.name
        );
        if (itemExists) {
            this.child._addNotification(`Item này đã tồn tại!`, "warning");
            return;
        }
        let objChapterTemp = _.clone(objChapter, true);
        objChapterTemp.articleId = objArticle.id;
        this.props.submitChapter(objChapterTemp).then(() => {
            this.props.editItemArticle(objArticle.id);
            this.child._addNotification(`Cập nhật thành công!`, "success");
        });
    }
    _changeChapter(e) {
        const { id, value } = e.target;
        const { objChapter } = this.props.post;
        let objChapterTemp = _.clone(objChapter, true);
        objChapterTemp[id] = value;
        this.props.updateInputChapter(objChapterTemp);
    }
    _onRemove(item) {
        const { objArticle } = this.props.post;
        this.props.removeChapter(item.id).then(() => {
            this.props.editItemArticle(objArticle.id);
            this.child._addNotification(`Cập nhật thành công!`, "success");
        });
    }
    render() {
        const { listHeaderChapter, listDataChapter } = this.props.post;
        return (
            <div>
                <AlertCustom onRef={ref => (this.child = ref)} />
                <VideoFormView />
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="input-group">
                                <input
                                    ref="tag"
                                    placeholder="Nhập tiêu đề chương học ..."
                                    type="text"
                                    id="name"
                                    onChange={e => this._changeChapter(e)}
                                    name="name"
                                    className="form-control"
                                />
                                <span className="input-group-btn">
                                    <button
                                        onClick={() => this._onSaveChapter()}
                                        className="btn btn-secondary"
                                        type="button"
                                    >
                                        Cập nhật
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        {listHeaderChapter.map(item => {
                                            return (
                                                <th
                                                    key={`header_key${item.key}`}
                                                >
                                                    {item.title}
                                                </th>
                                            );
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {listDataChapter.map(item => {
                                        const {
                                            id,
                                            name,
                                            duration,
                                            total,
                                            lessons
                                        } = item;
                                        return (
                                            <tr key={`header_data${id}`}>
                                                <td>{name}</td>
                                                <td>
                                                    {(lessons &&
                                                        lessons.length) ||
                                                        0}
                                                </td>
                                                <td>{duration}</td>
                                                <td>
                                                    <button
                                                        onClick={() =>
                                                            this._onShowVideos(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </td>
                                                <td
                                                    onClick={() =>
                                                        this._onRemove(item)
                                                    }
                                                >
                                                    <button>Xoá</button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
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
            ...postActions
        },
        dispatch
    );
};
export default ReactRedux.connect(
    mapStateToProps,
    mapDispatchToProps
)(ChapterFormView);
