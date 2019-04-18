import { updateDataImageUploads } from 'modules/post/actions/form'
class UploadAvatar extends React.Component {
    componentDidMount() {
        let that = this
        $("#imgInp").change(function () {
            that.readURL(this);
        });
    }
    readURL(input) {
        let that = this
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#blah').attr('src', e.target.result);
                that.props.updateDataImageUploads(e.target.result)
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    render() {
        return (
            <div className="form-group">
                <div className="row">
                    <div className="col-md-6">
                        <input type='file' id="imgInp"
                            name="Tải file"
                        />
                        <img
                            style={{ "cursor": "pointer" }}
                            id="blah"
                            alt="your image"
                            src="images/avatar_default.png" width="40px" height="40px"
                        />
                    </div>
                </div>

            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        updateDataImageUploads
    }, dispatch)
}
export default ReactRedux.connect(null, mapDispatchToProps)(UploadAvatar)

