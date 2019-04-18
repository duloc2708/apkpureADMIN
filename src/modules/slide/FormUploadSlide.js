import { addImageToSlide, removeImageToSlide } from 'modules/post/actions/form'
class FormUploadSlide extends React.Component {
    componentDidMount() {
        let that = this
        $("#imgInpSlide").change(function () {
            let { objData } = that.props.blog
            if (objData.title) {
                that.readURL(this);
            } else {
                alert('Vui lòng nhập tiêu đề!')

            }
        });
    }
    readURL(input) {
        let that = this
        let files = input.files
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            //Only pics
            if (!file.type.match('image')) continue;
            var picReader = new FileReader();
            picReader.addEventListener("load", function (event) {
                var picFile = event.target;
                that.props.addImageToSlide(picFile.result)
            });
            // //Read the image
            picReader.readAsDataURL(file);
        }
    }
    _removeImage(item) {
        this.props.removeImageToSlide(item)
    }
    render() {
        let { listSlide } = this.props.post
        listSlide = _.orderBy(listSlide, 'index', 'desc')
        return (
            <div className="row">
                <div className="col-md-12">
                    <label>List slide</label>
                    <input multiple="multiple" type='file' id="imgInpSlide" name="Tải file" />
                    {listSlide.length > 0 ?
                        <ul className="slide-image" >
                            {
                                listSlide.map((item, i) => {
                                    let { index, url, type } = item
                                    return (
                                        <li key={`slide_${i}`} className="slide-li">
                                            <a>
                                                <div id='popimages'>
                                                    <div className="image-slide-item">
                                                        <img onClick={() => this._removeImage(item)} className="btn-delete" src="http://cdn1.iconfinder.com/data/icons/diagona/icon/16/101.png"
                                                        />
                                                        {type == 'default' ?
                                                            <img src={Helper._getImageIndex(url, 70, 30)} />
                                                            :
                                                            <img src={url} width="70" height="30" />
                                                        }
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        : ''}

                </div>
            </div>
        )
    }
}
const mapStateToProps = ({
    userAuth,
    i18n,
    post
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        post
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        addImageToSlide,
        removeImageToSlide
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(FormUploadSlide)

