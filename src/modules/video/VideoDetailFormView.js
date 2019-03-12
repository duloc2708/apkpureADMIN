import React from 'react';
import { BootstrapTable, TableHeaderColumn, ButtonGroup } from 'react-bootstrap-table';
let temp_time_up = '';
import * as videoActions from 'modules/video/actions/form'
import Dropzone from 'react-dropzone';
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
        })
    }
    handleInput(e) {
        let { id, value } = e.target
        let { objData } = this.props.video
        objData[id] = value
        this.props.updateInputItem(objData)
    }

    AddTag() {
        if (this.refs.tag.value.length > 0) {
            let converListTag = this.refs.tag.value.split(',').map(function (n) {
                return n;
            });
            let arr = this.props.video.objData.tags;
            converListTag.map((item, i) => {
                if (item.length > 0) {
                    let rs = arr.find(x => x.name === item);
                    if (!rs) arr.push({ "name": item });
                }
            })

            let { objData } = this.props.video
            objData["tags"] = arr
            this.props.updateInputItem(objData)
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
    render() {
        let { isOpen, objData, displayPlaylist,
            list_play_default,
            fileName,
            files
        } = this.props.video
        let { title,
            id,
            link,
            desciption,
            tags,
            thumbnail,
            levels
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
                                        <div className="col-md-4">
                                            <label>Thumbnail</label>
                                            {/* <Dropzone
                                                onDrop={(files) => this.onDrop(files)}
                                                style={dropzoneStyle}
                                                required
                                            >
                                                <div >
                                                    {url_image ?
                                                        <img src={url_image} className="img-uploads" width="100%" height="350px" alt="avatar" />
                                                        : 'Upload'
                                                    }

                                                </div>
                                            </Dropzone> */}
                                        </div>
                                        <div className="col-md-8">
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
                                </div>

                            </div>
                            <div className="col-sm-4">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <label>Cấp độ</label>
                                        <select className="form-control" value={levels} onChange={(e) => this.handleChangeLeves(e)} >
                                            <option value="hard">Khó</option>
                                            <option value="normal">Bình thường</option>
                                        </select>

                                        <label>Play list</label>
                                        <div >
                                            <a href="#" onClick={() => this.OpenPlaylist()}>
                                                + Create new playlist </a></div>
                                             <div style={{ "display": displayPlaylist }}>
                                            <div className="input-group" >
                                                <table>
                                                    <tr >
                                                        <td ><input ref="playlistname" placeholder="Tên Playlist" style={{ "width": "100%" }} type="text" className="form-control" /></td>
                                                        <td>
                                                            <span className="input-group-btn">
                                                                <button
                                                                    onClick={() => this.AddPlayList()}
                                                                    className="btn btn-secondary" type="button">Add</button>
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>

                                        </div>

                                        <div className="card">
                                            <div className="card-block" style={{ "height": "100px", "overflow": "auto", "margin": "5px" }}>
                                                {list_play_default && list_play_default.map((item, i) => (
                                                    <div key={i} className="form-group">
                                                        <label className="checkbox">
                                                            <input type="checkbox"
                                                                id={item.type}
                                                                name={item.type} key={item.type}
                                                                checked={item.value}
                                                                onClick={() => this.onClickType(i)}
                                                            />
                                                            <span></span>
                                                            <span style={{ "paddingLeft": "5px" }}>{item.text}</span>
                                                        </label>
                                                        <i id={item.type}
                                                            // onClick={(e) => this.removeCategory(e)}
                                                            className="fa fa-remove"></i>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>


                                        <label>Tags</label>
                                        <div className="input-group">
                                            <input ref="tag" type="text" className="form-control" />
                                            <span className="input-group-btn">
                                                <button
                                                    onClick={() => this.AddTag()}
                                                    className="btn btn-secondary" type="button">Add</button>
                                            </span>

                                        </div>
                                        {/* <span>
                      Separate tags with commas

                    </span> */}
                                        <br />
                                        {tags && tags.map((item, i) => {
                                            return (
                                                <a href="#" key={i} > <i
                                                    onClick={(e) => this.RemoveTag(e)}
                                                    id={item.name} className="fa fa-plus-circle" ><span style={{ "margin": "5px" }}>{item.name}</span></i></a>
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
    video },
    ownProps) => {
    return {
        i18n,
        ownProps,
        video
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...videoActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(VideoDetailFormView)

