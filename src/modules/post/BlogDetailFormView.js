import React from 'react';
import { BootstrapTable, TableHeaderColumn, ButtonGroup } from 'react-bootstrap-table';
var TinyMCEInput = require('react-tinymce-input');
import * as postActions from 'modules/post/actions/form'
import UploadAvatar from './UploadAvatar'
import SlideUpload from './SlideUpload'
import FormUploadSlide from './FormUploadSlide'

class BlogDetailFormView extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.initDefaultPost();
        // this.loadlisttag()
        let that = this
        let datePicker = $(this.refs.datepicker)

        $(datePicker).datepicker({
            dateFormat: 'dd/mm/yy HH:mm:ss',
            defaultDate: new Date(),
            onSelect: function () {
                let date = $(datePicker).datepicker('getDate')
                that.props.updateDateTimeUp(date)

            }.bind(this),
            beforeShow: function () {
                setTimeout(() => {
                    $('.ui-datepicker-calendar tr td').on("mousemove", function () {
                        $(this).find('a').addClass('ui-state-hover-cus')
                    })
                    $('.ui-datepicker-calendar tr td').on("mouseleave", function () {
                        $(this).find('a').removeClass('ui-state-hover-cus')
                    })
                }, 100)
            },
            onChangeMonthYear: function () {
                setTimeout(() => {
                    $('.ui-datepicker-calendar tr td').on("mousemove", function () {
                        $(this).find('a').addClass('ui-state-hover-cus')
                    })
                    $('.ui-datepicker-calendar tr td').on("mouseleave", function () {
                        $(this).find('a').removeClass('ui-state-hover-cus')
                    })
                }, 100)
            }
        })
    };

    handleChangeStatus(e) {
        let { id, value } = e.target
        let { objData } = this.props.post
        let objDataTemp = _.clone(objData, true)
        objDataTemp["status"] = value
        this.props.updateInputItem(objDataTemp)
    }
    handleChangeLeves(e) {
        let { id, value } = e.target
        let { objData } = this.props.post
        let objDataTemp = _.clone(objData, true)
        objDataTemp["levels"] = value
        this.props.updateInputItem(objDataTemp)
    }
    handleSubmit() {
        this.props.updatePost().then(response => {
            const { StatusCode, Message } = response.data
            if (StatusCode == 0) alert("Thêm bài viết thành công!")
            setTimeout(() => {
                this.props.getListDataPost()
            }, 500)
        })
    }
    handleInput(e) {
        let { id, value } = e.target
        let { objData } = this.props.post
        let objDataTemp = _.clone(objData, true)
        objDataTemp[id] = value
        if (id == 'title') {
            objDataTemp['title_slug'] = Helper.ChangeToSlug(value)
        }
        this.props.updateInputItem(objDataTemp)
        // this.setState({ [name]: value });
    }
    onDateTimeChange(e) {
        var newDate = new Date();
        newDate.setTime(e);
        let { objData } = this.props.post
        let objDataTemp = _.clone(objData, true)
        objDataTemp["time_up"] = newDate
        this.props.updateInputItem(objDataTemp)
    }
    _countWold(e) {
        var cont = e;
        cont = cont.replace(/<[^>]*>/g, " ");
        cont = cont.replace(/\s+/g, ' ');
        cont = cont.trim();
        var n = cont.split(" ").length
        return n
    }
    _countChar(e) {
        var html = e;
        return html.replace(/<(?:.|\n)*?>/gm, '').length
    }
    handleEditorChange(e) {
        let countNumWord = this._countWold(e)
        let countNumChar = this._countChar(e)
        this.props.changeInputContent(countNumWord, countNumChar, e)
    }

    AddCategory() {
        const { typecode, typename } = this.refs;
        if (typecode.value.length === 0) {
            alert('Vui lòng nhập mã chuyên mục')
            return;
        }
        if (typename.value.length === 0) {
            alert('Vui lòng nhập tên chuyên mục')
            return;
        }
        let obj = {
            id: this.props.post.loadlisttype.length + 1,
            code: typecode.value.trim(),
            name: typename.value.trim(),
            slug: Helper.ChangeToSlug(typename.value)
        };
    }
    AddTag() {
        if (this.refs.tag.value.length > 0) {
            const { listTagsDefault } = this.props.post
            let listTagsDefaultTemp = _.clone(listTagsDefault, true)
            listTagsDefaultTemp.push(this.refs.tag.value)
            this.props.insertTags(listTagsDefaultTemp)
        }
    }
    AddTagFromList(e) {
        let idTag = e.target.getAttribute('id');
        let arr = this.state.tags;
        let rs = arr.find(x => x.name === idTag);
        if (!rs) arr.push({ "name": idTag });
        this.setState({ tags: arr })
    }
    RemoveTag(value) {
        const { listTagsDefault } = this.props.post
        let listTagsDefaultTemp = _.clone(listTagsDefault, true)
        listTagsDefaultTemp = listTagsDefaultTemp.filter(x => x != value)
        this.props.insertTags(listTagsDefaultTemp)
    }
    ChooseTag() {
        if (!this.state.isdisplay) {
            this.setState({
                displayListTag: '',
                isdisplay: true
            })
        }
        else {
            this.setState({
                displayListTag: 'none',
                isdisplay: false
            })
        }
    }
    onClickType(index) {
        var data = [...this.props.post.listTypeDefault];
        data[index].value = !data[index].value;
        this.props.checkedListType(data)
    }
    OpenCalendar() {
        this.props.openCalendar();
    }
    OpenCategory() {
        const { typecode, typename } = this.refs;
        typecode.value = '';
        typename.value = '';
        if (!this.state.isdisplayAddNew) {
            this.setState({
                displayTypeCode: '',
                displayAddNew: 'none',
                isdisplayAddNew: true
            })
        }
        else {
            this.setState({
                displayTypeCode: 'none',
                displayAddNew: '',
                isdisplayAddNew: false
            })
        }
    }
    removeCategory(e) {
        let typecode = e.target.getAttribute('id');
        let obj = {
            code: typecode
        }
        // fetch(URL_AUTH_API + '/typearticles_delete', {
        //     method: 'post',
        //     headers: {
        //         'Accept': 'application/json, text/plain, */*',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(obj)
        // });
        // let ary = this.props.post.loadlisttype;
        // var filteredAry = ary.filter(e => e.type !== typecode);
        // this.props.convertListCheckType(filteredAry)
    }
    render() {
        let { objData, is_edit, isdisplayCalendar, loadlisttype, isOpen, listTypeDefault, listTagsDefault, dateTimeUp, listSlide } = this.props.post
        let { numWord, numChar, _id, title, content_long, content_short, status, image_large,
            image, time_up, type, type_code, tags, listTagOld,
            displayAddNew, url, levels, atr7, atr5, atr6, atr8, atr9, atr10 } = objData
        let jobTypes = [{
            value: 'active',
            text: 'Publish'
        }, {
            value: 'deactive',
            text: 'Draft'
        }];
        let time = moment(dateTimeUp || new Date()).format('DD/MM/YYYY')
        return (
            <div className="PostFeed">
                <form id='form_articles'>
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Tiêu đề</label>
                                        <input type="text"
                                            className="form-control"
                                            value={title}
                                            onChange={(event) => this.handleInput(event)}
                                            name="title"
                                            id="title"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Url</label>
                                        <input type="text"
                                            className="form-control"
                                            readOnly={is_edit}
                                            value={url}
                                            onChange={(event) => this.handleInput(event)}
                                            name="url"
                                            id="url"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>SEO tite</label>
                                        <input type="text"
                                            className="form-control"
                                            value={atr8}
                                            onChange={(event) => this.handleInput(event)}
                                            name="atr8"
                                            id="atr8"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Meta description </label>
                                        <input type="text"
                                            className="form-control"
                                            value={atr9}
                                            onChange={(event) => this.handleInput(event)}
                                            name="atr9"
                                            id="atr9"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-12">
                                        <label>Link tải file apk</label>
                                        <input type="text"
                                            className="form-control"
                                            value={atr10}
                                            onChange={(event) => this.handleInput(event)}
                                            name="atr10"
                                            id="atr10"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Version</label>
                                        <input type="text"
                                            className="form-control"
                                            value={atr6}
                                            onChange={(event) => this.handleInput(event)}
                                            name="atr6"
                                            id="atr6"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Size apk</label>
                                        <input type="text"
                                            className="form-control"
                                            value={atr5}
                                            onChange={(event) => this.handleInput(event)}
                                            name="atr5"
                                            id="atr5"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <FormUploadSlide />
                            </div>
                            <div className="form-group">
                                <label>Nội dung</label>
                                <input id="my-file" type="file" style={{ display: "none" }} name="my-file" />
                                <TinyMCEInput
                                    value={content_long}
                                    onChange={(e) => this.handleEditorChange(e)}
                                    tinymceConfig={{
                                        height: 300,
                                        theme: 'modern',
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                                            'searchreplace wordcount visualblocks visualchars code fullscreen',
                                            'insertdatetime media nonbreaking save table contextmenu directionality',
                                            'emoticons template paste textcolor colorpicker textpattern imagetools'
                                        ],
                                        toolbar1: 'insertfile | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |  image | print preview media | forecolor backcolor emoticons',
                                        image_advtab: true,
                                        paste_data_images: true,
                                        automatic_uploads: true,
                                        file_picker_callback: function (callback, value, meta) {
                                            if (meta.filetype == 'image') {
                                                var input = document.getElementById('my-file');
                                                input.click();
                                                input.onchange = function () {
                                                    var file = input.files[0];
                                                    var reader = new FileReader();
                                                    reader.onload = function (e) {
                                                        callback(e.target.result, {
                                                            alt: file.name
                                                        });
                                                    };
                                                    reader.readAsDataURL(file);
                                                };
                                            }
                                        }

                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-12" style={{ textAlign: "right" }}>
                                        <label>Số chữ: <b>{numWord}</b> </label>
                                        &nbsp;
                                        <label>Số từ: <b>{numChar}</b> </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <label> Hình đại diện </label>
                            <UploadAvatar />
                            <label> Slide đại diện </label>
                            <SlideUpload />
                            <label>Trạng thái</label>
                            <select className="form-control" value={status} onChange={(e) => this.handleChangeStatus(e)} >
                                <option value="active">Publish</option>
                                <option value="deactive">Draft</option>
                            </select>

                            <label>Lên lịch đăng bài</label>
                            <div className="input-icon"
                                onClick={event => {
                                    $(this.refs.datepicker).focus()
                                }}
                            >
                                <input
                                    type="text"
                                    className="form-control datepicker"
                                    readOnly
                                    ref="datepicker"
                                    value={time}
                                />
                            </div>
                            <label>Chuyên mục</label>
                            <div className="card">
                                <div className="card-block" style={{ "height": "150px", "overflow": "auto", "margin": "5px" }}>
                                    {listTypeDefault && listTypeDefault.map((item, i) => (
                                        <div key={i} className="form-group">
                                            <label className="checkbox">
                                                <input type="checkbox"
                                                    id={item.type}
                                                    name={item.type} key={item.type}
                                                    defaultChecked={item.value}
                                                    onChange={() => this.onClickType(i)} />
                                                <span></span>
                                                <span style={{ "marginLeft": "5px" }}>{item.text}</span>
                                            </label>
                                            <i id={item.type} onClick={(e) => this.removeCategory(e)} className="fa fa-remove"></i>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <label>Tags</label>
                            <div className="input-group">
                                <input ref="tag" type="text" className="form-control" />
                                <span className="input-group-btn">
                                    <button onClick={() => this.AddTag()} className="btn btn-secondary" type="button">Add</button>
                                </span>
                            </div>
                            <br />
                            {listTagsDefault && listTagsDefault.map((item, i) => {
                                return (
                                    [
                                        <i
                                            style={{ "cursor": "pointer" }}
                                            onClick={(e) => this.RemoveTag(item)}
                                            id={item}
                                            className="fa fa-times" ></i>,
                                        <span style={{ "margin": "5px" }}>{item}</span>
                                    ]

                                )
                            })}

                            <div className="modal-footer">
                                <button type="button" onClick={() => this.handleSubmit()} className="btn btn-success btn-icon"><i className="fa fa-check"></i> Lưu</button>
                                <button type="button" onClick={() => this.props.openModalDetailPost(false)} className="btn btn-default btn-icon" data-dismiss="modal"><i className="fa fa-times-circle"></i> Hủy</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )

    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    listtype,
    post
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        listtype,
        post
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...postActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(BlogDetailFormView)

