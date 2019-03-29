import { BootstrapTable, TableHeaderColumn, ButtonGroup } from 'react-bootstrap-table';
import * as pageserviceActions from 'modules/pageservice/actions/form'
var TinyMCEInput = require('react-tinymce-input');
class DetailFormView extends React.Component {
  handleCancel() {
    this.props.openModalDetailPageService(false)
  }
  handleSubmit() {
    let { isEdit } = this.props.pageservice
    if (isEdit) {
      this.props.editPageService().then(res => {
        alert('cập nhật Page thành công!')
        this.props.getListPageService()
      });
    } else {
      this.props.addPageService().then(res => {
        alert('Thêm Page thành công!')
        this.props.getListPageService()
      });
    }

  }
  handleInput(e) {
    let { id, value } = e.target
    let { objData } = this.props.pageservice
    objData[id] = value
    this.props.updateInputItem(objData)
  }
  handleChangeStatus(e) {
    let { id, value } = e.target
    let { objData } = this.props.pageservice
    let objDataTemp = _.clone(objData, true)
    objDataTemp["status"] = value
    this.props.updateInputItem(objDataTemp)
  }
  handleEditorChange(e) {
    this.props.changeInputContentService(e)
  }
  render() {
    let { isOpen, objData } = this.props.pageservice
    let { routes, content, title } = objData
    return (
      <div className="PostFeed">
        <form id='form_articles'>
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <div className="row">
                  <div className="col-md-12">
                    <label>Title</label>
                    <input type="text"
                      className="form-control"
                      value={title}
                      onChange={(event) => this.handleInput(event)}
                      name="title"
                      id="title"
                      ref="title"
                    />
                    <label>Routes</label>
                    <input type="text"
                      className="form-control"
                      value={routes}
                      onChange={(event) => this.handleInput(event)}
                      name="routes"
                      id="routes"
                      ref="routes"
                    />
                    <label>Nội dung</label>
                    <input id="my-file" type="file" style={{ display: "none" }} name="my-file" />
                    <TinyMCEInput
                      value={content}
                      onChange={(e) => this.handleEditorChange(e)}
                      tinymceConfig={{
                        height: 200,
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
          <div className="modal-footer">
            <button type="button" onClick={() => this.handleSubmit()} className="btn btn-success btn-icon"><i className="fa fa-check"></i> Lưu</button>
            <button type="button" onClick={() => this.props.openModalDetailPageService(false)} className="btn btn-default btn-icon" data-dismiss="modal"><i className="fa fa-times-circle"></i> Hủy</button>
          </div>
        </form>
      </div>
    )

  }
}



const mapStateToProps = ({
  userAuth,
  i18n,
  pageservice
}, ownProps) => {
  return {
    userAuth,
    i18n,
    ownProps,
    pageservice
  }
}
const mapDispatchToProps = (dispatch) => {
  return Redux.bindActionCreators({
    ...ReactRouterRedux.routerActions,
    ...pageserviceActions
  }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(DetailFormView)
