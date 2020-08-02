import React from "react";
var TinyMCEInput = require("react-tinymce-input");
import * as postActions from "modules/post/actions/form";
import UploadAvatar from "./UploadAvatar";
import ChapterFormView from "./ChapterFormView";

class BlogDetailFormView extends React.Component {
    constructor(props) {
        super(props);
    }
    _countWold(e) {
        var cont = e;
        cont = cont.replace(/<[^>]*>/g, " ");
        cont = cont.replace(/\s+/g, " ");
        cont = cont.trim();
        var n = cont.split(" ").length;
        return n;
    }
    _countChar(e) {
        var html = e;
        return html.replace(/<(?:.|\n)*?>/gm, "").length;
    }
    handleEditorChange(e) {
        let countNumWord = this._countWold(e);
        let countNumChar = this._countChar(e);
        this.props.changeInputContent(countNumWord, countNumChar, e);
    }

    handleInput(e) {
        const { id, value } = e.target;
        const { objArticle } = this.props.post;
        let objArticleTemp = _.clone(objArticle, true);
        objArticleTemp[id] = value;
        this.props.updateInputData(objArticleTemp);
    }
    _onChangeTab(item) {
        this.props.changeTab(item.key);
    }
    ChangeValueCombobox(e) {
        const { id, value } = e;
        const { objArticle } = this.props.post;
        let objArticleTemp = _.clone(objArticle, true);
        objArticleTemp[id] = value;
        this.props.updateInputData(objArticleTemp);
    }
    _renderListTab(listTab) {
        let { tabActive } = this.props.post;

        return (
            <ul id="tab-button">
                {listTab.map(item => {
                    return (
                        <li
                            key={item.key}
                            className={`${
                                tabActive === item.key ? "is-active" : ""
                            }`}
                        >
                            <a onClick={() => this._onChangeTab(item)}>
                                {item.title}
                            </a>
                        </li>
                    );
                })}
            </ul>
        );
    }
    render() {
        let { listTab, tabActive, objArticle } = this.props.post;
        let {
            numWord,
            numChar,
            id,
            orderBy,
            name,
            notes,
            typeId,
            teacherId,
            chapters,
            price
        } = objArticle;
        return (
            <div className="PostFeed">
                <AlertCustom onRef={ref => (this.child = ref)} />

                <div className="tabs">
                    <div className="tab-button-outer">
                        {this._renderListTab(listTab)}
                    </div>
                    <div id="tab01" className="tab-contents">
                        <br />
                        {tabActive !== "tab1" ? (
                            <ChapterFormView />
                        ) : (
                            <form id="form_articles">
                                <div className="row">
                                    <div className="col-sm-8">
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Tên khoá học</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={name}
                                                        onChange={event =>
                                                            this.handleInput(
                                                                event
                                                            )
                                                        }
                                                        name="name"
                                                        id="name"
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Giảng viên</label>
                                                    <input
                                                        readOnly={true}
                                                        type="text"
                                                        className="form-control"
                                                        value={teacherId}
                                                        onChange={event =>
                                                            this.handleInput(
                                                                event
                                                            )
                                                        }
                                                        name="teacherId"
                                                        id="teacherId"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>Thể loại</label>
                                                    <Combobox
                                                        type_code="type"
                                                        id="typeId"
                                                        value={typeId}
                                                        parentObject={this}
                                                    />
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Giá tiền </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={price}
                                                        onChange={event =>
                                                            this.handleInput(
                                                                event
                                                            )
                                                        }
                                                        name="price"
                                                        id="price"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <label> Hình đại diện </label>
                                        <UploadAvatar />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label>Nội dung</label>
                                            <input
                                                id="my-file"
                                                type="file"
                                                style={{ display: "none" }}
                                                name="my-file"
                                            />
                                            <TinyMCEInput
                                                value={notes}
                                                onChange={e =>
                                                    this.handleEditorChange(e)
                                                }
                                                tinymceConfig={{
                                                    height: 300,
                                                    thenotesme: "modern",
                                                    plugins: [
                                                        "advlist autolink lists link image charmap print preview hr anchor pagebreak",
                                                        "searchreplace wordcount visualblocks visualchars code fullscreen",
                                                        "insertdatetime media nonbreaking save table contextmenu directionality",
                                                        "emoticons template paste textcolor colorpicker textpattern imagetools"
                                                    ],
                                                    toolbar1:
                                                        "insertfile | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |  image | print preview media | forecolor backcolor emoticons",
                                                    image_advtab: true,
                                                    paste_data_images: true,
                                                    automatic_uploads: true,
                                                    file_picker_callback: function(
                                                        callback,
                                                        value,
                                                        meta
                                                    ) {
                                                        if (
                                                            meta.filetype ==
                                                            "image"
                                                        ) {
                                                            var input = document.getElementById(
                                                                "my-file"
                                                            );
                                                            input.click();
                                                            input.onchange = function() {
                                                                var file =
                                                                    input
                                                                        .files[0];
                                                                var reader = new FileReader();
                                                                reader.onload = function(
                                                                    e
                                                                ) {
                                                                    callback(
                                                                        e.target
                                                                            .result,
                                                                        {
                                                                            alt:
                                                                                file.name
                                                                        }
                                                                    );
                                                                };
                                                                reader.readAsDataURL(
                                                                    file
                                                                );
                                                            };
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <div className="row">
                                                <div
                                                    className="col-md-12"
                                                    style={{
                                                        textAlign: "right"
                                                    }}
                                                >
                                                    <label>
                                                        Số chữ: <b>{numWord}</b>{" "}
                                                    </label>
                                                    &nbsp;
                                                    <label>
                                                        Số từ: <b>{numChar}</b>{" "}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ userAuth, i18n, listtype, post }, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        listtype,
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
)(BlogDetailFormView);
