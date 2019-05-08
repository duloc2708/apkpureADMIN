import React from 'react';
import { BootstrapTable, TableHeaderColumn, ButtonGroup } from 'react-bootstrap-table';
let temp_time_up = '';
import * as videoActions from 'modules/video/actions/form'
import UploadAvatar from './UploadAvatar'
import ComboboxListGame from './ComboboxListGame'

class VideoDetailFormView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [
            ],
            isOpen: false,
            title: '',
            link: ''
        }
    }
    componentWillUnmount() {
        this.props.clearDataVideo()
    }
    componentDidMount() {
        this.props.initDefaultVideo();
        // this.loadPlaylist();
    }
    loadPlaylist() {
        let data = this.props.video.list_play_default
        let listobj = [];
        data.forEach(function (item) {
            let obj = {
                id: item.id,
                type: item._id,
                text: item.name,
                value: false
            };
            listobj.push(obj);
        });
        var descending = listobj.sort((a, b) => Number(b.id) - Number(a.id));
        this.props.convertPlayList(descending);
    }
    onClickType(index) {
        var data = [...this.props.video.list_play_default];
        data[index].value = !data[index].value;
        this.props.convertPlayList(data)
    }

    hideModal() {
        this.props.openModalDetailVideo(false)
        this.props.getListDataVideo()
    };

    handleSubmit() {
        let { is_edit } = this.props.video
        this.props.addVideo().then(() => {
            alert("Cập nhật video thành công!")
            setTimeout(() => {
                this.props.getListDataVideo()
            }, 500)
        })
    }
    handleInput(e) {
        let { id, value } = e.target
        let { objData } = this.props.video
        let objDataTemp = _.clone(objData, true)
        objDataTemp[id] = value
        this.props.updateInputItem(objDataTemp)
    }

    AddTag() {
        if (this.refs.tag.value.length > 0) {
            const { listTagsDefault } = this.props.video
            let listTagsDefaultTemp = _.clone(listTagsDefault, true)
            listTagsDefaultTemp.push(this.refs.tag.value)
            this.props.insertTags(listTagsDefaultTemp)
        }
    }
    OpenPlaylist() {
        this.props.showPlaylist()
    }
    AddPlayList() {
        const { playlistname } = this.refs;
        if (playlistname.value.length === 0) {
            alert('Vui lòng tên playlist')
            return;
        }
        let obj = {
            id: this.props.video.list_play_default.length + 1,
            name: playlistname.value.trim(),
            user: 'admin'
        };

        this.props.addPlaylist(obj).then(() => {
            alert('Lưu thành công.')
            this.props.getListPlayList().then((res) => {
                // this.loadPlaylist()
            })
        })
    }
    handleChangeLeves(e) {
        let { id, value } = e.target
        let { objData } = this.props.video
        objData["levels"] = value
        this.props.updateInputItem(objData)
    }
    onDrop(acceptedFiles, rejectedFiles) {
        var filesArray = [];
        filesArray.push(acceptedFiles);
        let { objData } = this.props.video
        if (objData.id) {
            this.props.updateThumbnail(acceptedFiles[0].name, filesArray[0][0])
            filesArray[0].map((item, i) => {
                let formData = new FormData()
                formData.append('file', item)
                formData.append('_id', objData.id)
                let config = { headers: { 'Content-Type': 'multipart/form-data' } };
                axios.post(`${URL_AUTH_API}/api/update_thumbnail`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
            })
        } else {
            alert('Vui lòng lưu thông tin video, trước khi upload thumnail!')
        }


    }
    RemoveTag(value) {
        const { listTagsDefault } = this.props.video
        let listTagsDefaultTemp = _.clone(listTagsDefault, true)
        listTagsDefaultTemp = listTagsDefaultTemp.filter(x => x != value)
        this.props.insertTags(listTagsDefaultTemp)
    }
    render() {
        let { isOpen, objData, displayPlaylist,
            list_play_default,
            fileName,
            files,
            listTagsDefault
        } = this.props.video
        let { list_data: dataPost } = this.props.post
        let { title,
            id,
            link,
            desciption,
            tags,
            thumbnail,
            levels,
            gameother
        } = objData
        const dropzoneStyle = {
            width: "100%",
            height: "70px",
            border: "1px dashed black"
        };

        let url_image = ''
        if (files || thumbnail) {
            if (files) {
                url_image = files.preview
            } else {
                // url_image = LINK_IMAGE_THUMBNAIL + '/' + id + '/' + thumbnail
            }
        }
        if (isOpen === false) {
            return (
                <div></div>
            )
        } else {
            return (
                <div className="PostFeed">
                    <form id='form_articles'>
                        <div className="row">
                            <div className="col-sm-8">
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>Tiêu đề</label>
                                            <input type="text"
                                                className="form-control"
                                                value={title}
                                                onChange={(event) => this.handleInput(event)}
                                                name="title"
                                                id="title"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>Link video</label>
                                            <input type="text"
                                                className="form-control"
                                                value={link}
                                                onChange={(event) => this.handleInput(event)}
                                                name="link"
                                                id="link"
                                            />

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>Nội dung</label>
                                            <textarea type="text"
                                                className="form-control"
                                                value={desciption}
                                                onChange={(event) => this.handleInput(event)}
                                                name="desciption"
                                                id="desciption"
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>Các game liên quan</label>
                                            <ComboboxListGame list_data={dataPost} />
                                            <br/>
                                            <input type="text"
                                                className="form-control"
                                                value={gameother}
                                                onChange={(event) => this.handleInput(event)}
                                                name="gameother"
                                                id="gameother"
                                            />

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="col-sm-4">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <label>Uploads thumbnail</label>
                                        <UploadAvatar />
                                        <label>Tags</label>
                                        <div className="input-group">
                                            <input ref="tag" type="text" className="form-control" />
                                            <span className="input-group-btn">
                                                <button
                                                    onClick={() => this.AddTag()}
                                                    className="btn btn-secondary" type="button">Add</button>
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
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={() => this.handleSubmit()} className="btn btn-success btn-icon"><i className="fa fa-check"></i> Lưu</button>
                            <button type="button" onClick={() => this.hideModal()} className="btn btn-default btn-icon" data-dismiss="modal"><i className="fa fa-times-circle"></i> Hủy</button>
                        </div>
                    </form>
                </div>
            )
        }

    }
}

const mapStateToProps = ({
    i18n,
    video,
    post
},
    ownProps) => {
    return {
        i18n,
        ownProps,
        video,
        post
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...videoActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(VideoDetailFormView)

