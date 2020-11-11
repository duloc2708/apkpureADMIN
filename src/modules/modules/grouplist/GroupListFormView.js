import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import * as toolbarActions from 'modules/toolbar/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import * as grouplistActions from 'modules/grouplist/actions/form'
const { Translate, I18n } = ReactReduxI18n;
class GroupListFormView extends React.Component {
    constructor() {
        super()
        this.state = {
            _notificationSystem: null
        }
    }
    componentDidMount() {
        this._loadData()

    }


    componentWillUnmount() {
        this._resetData()
        this.props.updateButtonToolbar('')
    }
    _loadData() {
        this.props.getGroupList()
    }
    _resetData() {
        this.props.resetDataList()
    }

    _onClickRow(item) {
        this.props.clickCheckRowGroupList(item)
    }
    _handleInput(e) {
        let { id, value } = e.target
        let { objData } = this.props.grouplist
        objData[id] = value
        this.props.updateInputItem(objData)
    }
    _changeStatus(status) {
        let { objData } = this.props.grouplist
        objData["status"] = status
        this.props.updateInputItem(objData)
    }
    _checkClickRow(item) {
        this.props.clickCheckRowGroupList(item)
    }
    _checkAllRow(value) {
        this.props.checkAllRowList(!value)
    }
    _renderPage(page) {
        let data = [];
        for (var i = 1; i <= 10; i++) {
            data.push(<li key={`page_${i}`} className={`page-item ${i == page ? 'active' : ''}`}>
                <a className={`page-link`} onClick={(e) => this._onChangePage(e)}>{i}</a>
            </li>);
        }
        return data;
    }
    _onChangePage(value) {
        this.props.ChangePageList(parseInt(value.target.text))
        let { total, page } = this.props.grouplist
        var currentURL = document.URL;
        var url = new URL(currentURL);
        var codeURL = url.searchParams.get("code");
        let params = {
            type: codeURL.toUpperCase(),
            page: parseInt(value.target.text),
            total: total
        }
        this.props.getListDataList(params)

    }
    _validateSave() {
        let result = false
        let { code, name, status, type_code } = this.props.grouplist.objData
        if (!code) {
            $('#code').addClass('has-error')
            this.child._addNotification(I18n.t(`list.please_input_code`), 'warning')
            return false
        } else {
            $('#code').removeClass('has-error')
        }
        if (!name) {
            $('#name').addClass('has-error')
            this.child._addNotification(I18n.t(`list.please_input_name`), 'warning')
            return false
        } else {
            $('#name').removeClass('has-error')
        }
        return true

    }
    ChangeButton(value) {
        let isStatus = true
        let { objData } = this.props.grouplist
        let { } = this.child

        switch (value) {
            case "SAVE":
                let { status } = this.props.toolbar
                if (status == '') {
                    isStatus = false
                    break
                }
                if (this._validateSave()) {
                    if (status == 'EDIT') {
                        this.props.updateItemGroupList()
                            .then(res => {
                                this.child._addNotification(I18n.t(`alert.updatesuccess`), 'success')
                                this._loadData()
                                this._resetData()
                            })

                    } else {
                        var currentURL = document.URL;
                        var url = new URL(currentURL);
                        let { code } = this.props.grouplist.objData
                        this.props.checkCodeExists({ code }).then(res => {
                            let { data } = res.data
                            if (data.value == 1) {
                                this.child._addNotification(`Mã nhóm đã tồn tại.`, 'warning')
                                this.props.updateButtonToolbar('ADD')
                            } else {
                                this.props.addNewItemGroupList().then(res => {
                                    this.child._addNotification(I18n.t(`alert.updatesuccess`), 'success')
                                    this._loadData()
                                    this._resetData()
                                })
                            }
                        })
                    }
                } else {
                    isStatus = false
                }
                break;
            case "ADD":
                this._addNewItem()
                break;
            case "EDIT":
                if (!objData.id) {
                    isStatus = false
                    this.child._addNotification(I18n.t(`alert.please_select_rows`), 'warning')
                }
                break;
            case "DELETE":
                var txt;
                var r = confirm(I18n.t(`alert.delete`));
                if (r == true) {
                    this._deleteItem()
                } else {
                    isStatus = false
                }
                break;
            default:
                break;
        }
        if (isStatus)
            this.props.updateButtonToolbar(value)
    }
    _deleteItem() {
        let { allChecked, objData } = this.props.grouplist
        if (!allChecked) {
            this.props.deleteItemList({ id: objData.id }).then(res => {
                this._loadData()
                this._resetData()
            })
        } else {
            this.props.deleteAllItemList().then(res => {
                this._loadData()
                this._resetData()
            })
        }

    }
    _addNewItem() {
        $('#code').val('')
        $('#name').val('')
        //   this._resetData()
    }
    render() {
        let { list_data, allChecked, page } = this.props.grouplist
        let { code, name, status } = this.props.grouplist.objData
        return (
            <div className="container">
                <AlertCustom onRef={ref => (this.child = ref)} />
                <section >
                    <BrackcrumFromView title='Nhóm danh mục' />
                    <div className="main__content">
                        <ToolbarFormView parentObject={this} />
                        <div className="form__personnal">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group ">
                                        <div className="left">
                                            <label htmlFor="name">Mã nhóm</label>
                                            <span className="required">*</span>
                                        </div>
                                        <div className="right">
                                            <input className="name form-control"
                                                value={code}
                                                onChange={(e) => this._handleInput(e)}
                                                type="text"
                                                ref="code"
                                                id="code"
                                                name="code"
                                                required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <div className="left">
                                            <label htmlFor="name">Tên nhóm</label>
                                            <span className="required">*</span>
                                        </div>
                                        <div className="right">
                                            <input className="name form-control"
                                                type="text"
                                                value={name}
                                                onChange={(e) => this._handleInput(e)}
                                                ref="name"
                                                id="name"
                                                name="name"
                                                required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <div className="left">
                                            <label htmlFor="name">Sử dụng</label>
                                        </div>
                                        <div className="right">
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" ref="status"
                                                        checked={status == 1 ? true : false}
                                                        onChange={() => this._changeStatus(status == 1 ? 0 : 1)}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        <label>
                                            <input type="checkbox" checked={allChecked} onChange={() => this._checkAllRow(allChecked)} />
                                        </label>
                                    </th>
                                    <th scope="col">Mã nhóm</th>
                                    <th scope="col">Tên nhóm</th>
                                    <th scope="col">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th></th>
                                    <td>
                                        <input className="name form-control" type="text" id="name" name="name" required="" />
                                    </td>
                                    <td>
                                        <input className="name form-control" type="text" id="name" name="name" required="" />
                                    </td>
                                    <td>
                                        <input className="name form-control" type="text" id="name" name="name" required="" />
                                    </td>
                                </tr>
                                {list_data && list_data.map((item, i) => {
                                    let { name, code, status, checked } = item
                                    return (
                                        <tr key={`data_${i}`} onClick={() => this._onClickRow(item)}>
                                            <th scope="row">
                                                <label>
                                                    <input type="checkbox" checked={checked} onChange={() => this._checkClickRow(item)} />
                                                </label>
                                            </th>
                                            <td>{code}</td>
                                            <td>{name}</td>
                                            <td><input type="checkbox" checked={status == 1 ? true : false} /></td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                        <div className="list__pagination">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                    </li>
                                    {
                                        this._renderPage(page)
                                    }
                                    <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    grouplist,
    header,
    toolbar
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        grouplist,
        header,
        toolbar
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...grouplistActions,
        ...toolbarActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(GroupListFormView)
