import Dropzone from 'react-dropzone';
import * as productsActions from 'modules/products/actions/form'
class ListImageFormView extends React.Component {
    constructor() {
        super()
        this.state = {
            fileName: '',
            files: []
        }
    }
    onDrop(acceptedFiles, rejectedFiles) {
        let filesArray = [], listimg = '';
        let { objData } = this.props.products
        if(!objData.Id){
            alert('Mã sản phẩm không tồn tại')
            return
        }
        filesArray.push(acceptedFiles);
        this.setState({
            fileName: acceptedFiles[0].name,
            files: filesArray
        });
        filesArray[0].map((item, i) => {
            let formData = new FormData()
            formData.append('file', item)
            formData.append('_id', objData.Id)
            let config = { headers: { 'Content-Type': 'multipart/form-data' } };
            axios.post(`${Config.API_URL_USER}products/upload_image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
        })


    }
    componentDidMount() {
        let { objData } = this.props.products
        this.props.getListImageByProducts()
    }
    componentWillUnmount(){
        this.setState({
            fileName: '',
            files: []
        });
    }
    render() {
        const dropzoneStyle = {
            width: "100%",
            height: "30px",
            border: "1px dashed black"
        };
        let { listImageByProducts } = this.props.products
        return (
            <div className="main__content__left">
                <div className="slideshow" data-transition="fade">
                    {
                        this.state.files.length > 0 ? this.state.files[0].map((item, i) => {
                            return (
                                [
                                    <input type="radio" name="ss2" id={`ss2-item-${i + 1}`} className="slideshow--bullet" defaultChecked={i == 0 ? true : false} />,
                                    <div className="slideshow--item">
                                        <div style={{ "border": "2px solid black", "display": "inline-block", "padding": "3px 3px", "textAlign": "right" }}>
                                            <img src={item.preview} width="280px" height="280px" />
                                            <label htmlFor={`ss2-item-${i}`} className="slideshow--nav slideshow--nav-previous">Go to slide 3</label>
                                            <label htmlFor={`ss2-item-${i + 2}`} className="slideshow--nav slideshow--nav-next">Go to slide 2</label>
                                        </div>
                                    </div>
                                ]
                            )
                        })
                            :
                            listImageByProducts.map((item, i) => {
                                let { Name, Path } = item
                                return (
                                    [
                                        <input type="radio" name="ss2" id={`ss2-item-${i + 1}`} className="slideshow--bullet" defaultChecked={i == 0 ? true : false} />,
                                        <div className="slideshow--item">
                                                <div style={{ "border": "2px solid black", "display": "inline-block", "padding": "3px 3px", "textAlign": "right" }}>
                                                    <img src={Config.API_URL_IMAGE + Path} width="280px" height="280px" />                                                      
                                                </div>
                                                <label htmlFor={`ss2-item-${i}`} className="slideshow--nav slideshow--nav-previous">Go to slide 3</label>
                                                <label htmlFor={`ss2-item-${i + 2}`} className="slideshow--nav slideshow--nav-next">Go to slide 2</label> 
                                            
                                        </div>
                                    ]
                                )
                            })
                    }
                </div>
                <div className="file-upload" style={{ "paddingTop": "180px" }}>
                    <Dropzone
                        multiple={true}
                        onDrop={(files) => this.onDrop(files)}
                        style={dropzoneStyle}
                        required
                    >
                        <div><a> Chọn hình sản phẩm</a></div>
                    </Dropzone>
                </div>
            </div>
        )

    }
}

const mapStateToProps = ({
    userAuth,
    products
}, ownProps) => {
    return {
        userAuth,
        products
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...productsActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListImageFormView)
