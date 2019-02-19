import { BootstrapTable, TableHeaderColumn, ButtonGroup } from 'react-bootstrap-table';
import * as listtypeActions from 'modules/listtype/actions/form'
class DetailFormView extends React.Component {
  handleCancel() {
    this.props.openModalDetailChuyenMuc(false)
  }
  handleSubmit() {
    let { isEdit } = this.props.listtype
    if (isEdit) {
      this.props.editChuyenMuc().then(res => {
        alert('cập nhật chuyên mục thành công!')
        this.props.getListChuyenMuc()
      });
    } else {
      this.props.addChuyenMuc().then(res => {
        alert('Thêm chuyên mục thành công!')
        this.props.getListChuyenMuc()
      });
    }

  }
  handleInput(e) {
    let { id, value } = e.target
    let { objData } = this.props.listtype
    objData[id] = value
    this.props.updateInputItem(objData)
  }
  render() {
    let { isOpen, objData } = this.props.listtype
    return (
      <div className="PostFeed">
        <form id='form_articles'>
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <div className="row">
                  <div className="col-md-12">
                    <label>Mã chuyên mục</label>
                    <input type="text"
                      className="form-control"
                      value={objData.code}
                      onChange={(event) => this.handleInput(event)}
                      name="code"
                      id="code"
                      ref="code"
                    />
                    <label>Tên chuyên mục</label>
                    <input type="text"
                      className="form-control"
                      value={objData.name}
                      onChange={(event) => this.handleInput(event)}
                      name="name"
                      id="name"
                      ref="name"
                    />
                    <label>Slug</label>
                    <input type="text"
                      className="form-control"
                      value={objData.slug}
                      onChange={(event) => this.handleInput(event)}
                      id="slug"
                      name="slug"
                      ref="slug"
                    />
                    <label>Số thứ tự</label>
                    <input type="text"
                      className="form-control"
                      value={objData.numOrder}
                      onChange={(event) => this.handleInput(event)}
                      name="numOrder"
                      id="numOrder"
                      ref="numOrder"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={() => this.handleSubmit()} className="btn btn-success btn-icon"><i className="fa fa-check"></i> Lưu</button>
            <button type="button" onClick={() => this.props.openModalDetailChuyenMuc(false)} className="btn btn-default btn-icon" data-dismiss="modal"><i className="fa fa-times-circle"></i> Hủy</button>
          </div>
        </form>
      </div>
    )

  }
}



const mapStateToProps = ({
  userAuth,
  i18n,
  listtype
}, ownProps) => {
  return {
    userAuth,
    i18n,
    ownProps,
    listtype
  }
}
const mapDispatchToProps = (dispatch) => {
  return Redux.bindActionCreators({
    ...ReactRouterRedux.routerActions,
    ...listtypeActions
  }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(DetailFormView)
