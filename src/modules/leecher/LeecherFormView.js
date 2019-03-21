const TinyMCEInput = require('react-tinymce-input');
import * as leecherActions from 'modules/leecher/actions/form'
class LeecherFormView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: []
        }
    }
    componentWillUnmount() {
        this.props.resetLeech()
    }
    _onGetLink() {
        let { url } = this.props.leecher
        if (url) {
            this.props.getListGame()
        } else {
            alert('Vui lòng nhập url ...')
        }
    }
    _onChangeUrl(e) {
        this.props.changeUrl(e.target.value)
    }
    render() {
        let { url, isDisplay, data } = this.props.leecher
        let { title, content_long, atr4, type, title_slug } = data
        console.log('data>>>>>>', data);

        return (
            <div style={{ "margin": "10px", "marginBottom": "50px", "height": "500px" }} >
                <div className="row">
                    <div className="col-md-12">
                        <div className="input-group mb-3">
                            <input type="text" onChange={(e) => this._onChangeUrl(e)} className="form-control" placeholder="Store url" value={url} />
                            <div className="input-group-append">
                                <span onClick={() => this._onGetLink()} className="input-group-text">Submit</span>
                            </div>
                        </div>

                    </div>
                </div>
                {
                    isDisplay ?
                        <div className="row">
                            <div className="col-md-12">
                                <a target="_blank" href={`${Config.API_URL_USER + type + '/' + title_slug}`}>Xem chi tiết</a>
                            </div>
                        </div>
                        : ''
                }

                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12">
                                <label>Tiêu đề</label>
                                <input type="text"
                                    className="form-control"
                                    defaultValue={title || ''}
                                    name="title"
                                    id="title"
                                />
                            </div>
                        </div>


                        <div className="row">
                            {/* <div className="col-md-2" >
                                <label>Avatar</label>
                                <img
                                    src={'https://lh3.googleusercontent.com/bSk3U_han6aG02yVhCdXotEDXsdoWuL4ZG8Osk7mPLJtjIhY1Ebtfy2FY_7YCYadWdw=s360-rw'} width="100px" height="100px"
                                />
                            </div> */}
                            <div className="col-md-12">
                                <label>Nội dung</label>
                                <input id="my-file" type="file" style={{ display: "none" }} name="my-file" />
                                <TinyMCEInput
                                    value={content_long || ''}
                                    // onChange={(e) => this.handleEditorChange(e)}
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

                        </div>

                    </div>
                </div>
            </div>
        );

    }
}



const mapStateToProps = ({
    i18n
    , leecher
}, ownProps) => {
    return {
        i18n,
        leecher,
        ownProps
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...leecherActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(LeecherFormView)


