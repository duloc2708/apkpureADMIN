import { BootstrapTable, TableHeaderColumn, ButtonGroup } from 'react-bootstrap-table';
import * as usersActions from 'modules/users/actions/form'
class DetailFormView extends React.Component {
  handleCancel() {
    this.props.openModalDetailUsers(false)
  }
  handleSubmit() {
    let { isEdit } = this.props.users
    if (isEdit) {
      this.props.editUsers().then(res => {
        alert('cập nhật Users thành công!')
        this.props.getListUsers()
      });
    } else {
      this.props.addUsers().then(res => {
        alert('Thêm Users thành công!')
        this.props.getListUsers()
      });
    }

  }
  handleInput(e) {
    let { id, value } = e.target
    let { objData } = this.props.users
    objData[id] = value
    this.props.updateInputItem(objData)
  }
  handleChangeStatus(e) {
    let { id, value } = e.target
    let { objData } = this.props.users
    let objDataTemp = _.clone(objData, true)
    objDataTemp["status"] = value
    this.props.updateInputItem(objDataTemp)
  }
  render() {
    let { isOpen, objData } = this.props.users
    let { username, fullname, password, email, status } = objData
    return (
      <div className="PostFeed">
        <form id='form_articles'>
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <div className="row">
                  <div className="col-md-12">
                    <label>Username</label>
                    <input type="text"
                      className="form-control"
                      value={username}
                      onChange={(event) => this.handleInput(event)}
                      name="username"
                      id="username"
                      ref="username"
                    />
                    <label>Password</label>
                    <input type="text"
                      className="form-control"
                      value={password}
                      onChange={(event) => this.handleInput(event)}
                      name="password"
                      id="password"
                      ref="password"
                    />
                    <label>Tên Users</label>
                    <input type="text"
                      className="form-control"
                      value={fullname}
                      onChange={(event) => this.handleInput(event)}
                      name="fullname"
                      id="fullname"
                      ref="fullname"
                    />
                    <label>Email</label>
                    <input type="text"
                      className="form-control"
                      value={email}
                      onChange={(event) => this.handleInput(event)}
                      id="email"
                      name="email"
                      ref="email"
                    />
                    <label>Trạng thái</label>
                    <select className="form-control" value={status} onChange={(e) => this.handleChangeStatus(e)} >
                      <option value="active">Active</option>
                      <option value="deactive">Disable</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={() => this.handleSubmit()} className="btn btn-success btn-icon"><i className="fa fa-check"></i> Lưu</button>
            <button type="button" onClick={() => this.props.openModalDetailUsers(false)} className="btn btn-default btn-icon" data-dismiss="modal"><i className="fa fa-times-circle"></i> Hủy</button>
          </div>
        </form>
      </div>
    )

  }
}



const mapStateToProps = ({
  userAuth,
  i18n,
  users
}, ownProps) => {
  return {
    userAuth,
    i18n,
    ownProps,
    users
  }
}
const mapDispatchToProps = (dispatch) => {
  return Redux.bindActionCreators({
    ...ReactRouterRedux.routerActions,
    ...usersActions
  }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(DetailFormView)
