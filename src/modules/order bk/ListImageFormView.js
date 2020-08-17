import Dropzone from 'react-dropzone';
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
        filesArray.push(acceptedFiles);
        this.setState({
            fileName: acceptedFiles[0].name,
            files: filesArray
        });

    }
    render() {
        const dropzoneStyle = {
            width: "100%",
            height: "30px",
            border: "1px dashed black"
        };
        return (
            <div className="main__content__left">
                <div className="slideshow" data-transition="fade">
                    {
                        this.state.files.length> 0 && this.state.files[0].map((item, i) => {
                            return (
                                [
                                    <input type="radio" name="ss2" id={`ss2-item-${i + 1}`} className="slideshow--bullet" defaultChecked={i == 0 ? true : false} />,
                                    <div className="slideshow--item">
                                        <img src={item.preview} width="255px" height="170px" />
                                        <label htmlFor={`ss2-item-${i}`} className="slideshow--nav slideshow--nav-previous">Go to slide 3</label>
                                        <label htmlFor={`ss2-item-${i + 2}`} className="slideshow--nav slideshow--nav-next">Go to slide 2</label>
                                    </div>
                                ]
                            )
                        })
                    }
                    {/* <input type="radio" name="ss2" id="ss2-item-1" className="slideshow--bullet" defaultChecked={true} />
                    <div className="slideshow--item">
                        <img src="https://znews-photo-td.zadn.vn/w660/Uploaded/ofh_nuottuqz/2018_06_24/4D93C9B9000005780imagea8_1529834852023.jpg" width="255px" />
                        <label htmlFor="ss2-item-3" className="slideshow--nav slideshow--nav-previous">Go to slide 3</label>
                        <label htmlFor="ss2-item-2" className="slideshow--nav slideshow--nav-next">Go to slide 2</label>
                    </div>

                    <input type="radio" name="ss2" id="ss2-item-2" className="slideshow--bullet" />
                    <div className="slideshow--item">
                        <img src="https://znews-photo-td.zadn.vn/w1024/Uploaded/natmzz/2018_06_25/20180620T131620Z_1_MTZEE6KMFF8VB_RTRFIPP_800_SOCCERWORLDCUPPORMAR.JPG" width="255px" />
                        <label htmlFor="ss2-item-1" className="slideshow--nav slideshow--nav-previous">Go to slide 1</label>
                        <label htmlFor="ss2-item-3" className="slideshow--nav slideshow--nav-next">Go to slide 3</label>
                    </div> */}
                </div>
                <div className="file-upload" style={{ "paddingTop": "12px" }}>
                    <Dropzone
                        multiple={true}
                        onDrop={(files) => this.onDrop(files)}
                        style={dropzoneStyle}
                        required
                    >
                        <div>Chọn hình sản phẩm</div>
                    </Dropzone>
                </div>
            </div>
        )

    }
}
export default ListImageFormView