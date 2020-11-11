import * as userActions from 'modules/login/actions/form'
import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import * as castingActions from 'modules/casting/actions/form'
import * as toolbarActions from 'modules/toolbar/actions/form'
import * as commonActions from 'modules/common/actions/form'
const { Translate, I18n } = ReactReduxI18n;
class CastingFormView extends React.Component {
    constructor() {
        super()
        this.state = {
            Id: '',
            Name: '',
            Decription: '',
            IdType: '',
            IdUnit: '',
            Numb: '',
            Weight: ''
        }
    }
    _clearInput() {
        let { objData } = this.props.casting
        let objData_temp = _.clone(objData, true)
        Object.keys(objData_temp).forEach(function (key) {
            objData_temp[key] = '';
        });
        this.props.clearInputStone(objData_temp)

    }
    componentWillUnmount() {
        this.props.resetInfoPage()
        this.props.resetDataCasting()
        this.props.updateButtonToolbar('')

    }
    componentDidMount() {
        this._loadData()
    }
    _loadData() {
        let { page, total } = this.props.common
        let params = {
            page: page,
            total: total
        }
        this.props.getListDataCasting(params)
    }
    _onFilterData(e, code) {
        this.props.updateValueFilterHeaderCasting({ code: code, value: e.target.value })
    }
    _onKeyDown(e, key) {
        if (e.charCode == 13) {
            let params = {
                page: 1,
                total: 10,
                key: key,
                value: e.target.value
            }
            this.props.getListDataCastingSearch(params)
        }

    }
    ChangeButton(value) {
        let value_temp = value
        let isStatus = true
        let { objData } = this.props.casting
        switch (value_temp) {
            case "ADD":
                this._clearInput()
                break;
            case "SAVE":
                let { status } = this.props.toolbar
                if (status == '') {
                    isStatus = false
                    break
                }
                if (this._checkValidate()) {
                    if (status == 'EDIT') {
                        this.props.updateItemStone().then(res => {
                            value_temp = ''
                            this.child._addNotification(`Update thành công`, 'success')
                            this._loadData()
                        })
                    } else {
                        this.props.checkCodeExistsByTable({ field: "IdMould", value: objData.IdMould, table: "CASTING" }).then(res => {
                            let { value } = res.data.data
                            if (value == 1) {
                                this.child._addNotification(I18n.t(`list.exist_params`), 'warning')
                                isStatus = false;
                            } else {
                                this.props.addNewItemStone().then(res => {
                                    value_temp = ''
                                    this.child._addNotification(`Insert thành công`, 'success')
                                    this._clearInput()
                                    this._loadData()
                                })
                            }
                        })

                    }
                } else {
                    isStatus = false
                }

                break;
            case "EDIT":
                if (!objData.IdMould) {
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
                value_temp = ''
                break;
            default:
                value_temp = ''
                break;
        }
        setTimeout(() => {
            if (isStatus)
                this.props.updateButtonToolbar(value_temp)
        }, 200);

    }
    _deleteItem() {
        let { allChecked, objData } = this.props.casting
        if (!allChecked) {
            this.props.deleteItemCasting({ id: objData.IdMould }).then(res => {
                this.child._addNotification(`Xoá thành công`, 'success')
                this._loadData()
            })
        } else {
            this.props.deleteAllItemCasting().then(res => {
                this.child._addNotification(`Xoá thành công`, 'success')
                this._loadData()
            })
        }
        this._clearInput()
    }
    _checkValidate() {
        let result = true
        let temp = ''
        let { fieldValidateStone, objData } = this.props.casting
        let key_validate = ''
        fieldValidateStone.map((item) => {
            if (!objData[item.key]) {
                if (!key_validate) {
                    key_validate = item.key
                }
                temp = temp + item.Des + ','
            }
        })
        if (temp) {
            result = false
            this.child._addNotification(`vui lòng nhập ${temp.substring(0, temp.length - 1)}`, 'warning')
            $(`#${key_validate}`).focus()
        }
        return result
    }
    _addNewItem() {
        if (this._checkValidate()) {
            this.props.addNewItemStone().then(res => {
                this.child._addNotification(`Insert thành công`, 'success')
                this._clearInput()
                this._loadData()
            })
        }
    }

    _onClickRow(item) {
        let { status } = this.props.toolbar
        if (status == '' || status == "CANCEL") {
            this.props.clickCheckRowStone(item)
        }
    }
    _handleInput(e) {
        let { id, value } = e.target
        let { objData } = this.props.casting
        objData[id] = value
        this.props.updateInputItem(objData)
    }
    _changeStatus(status) {
        this.setState({ status: !status });
    }
    _checkClickRow(item) {
        this.props.clickCheckRow(item)
    }
    _checkAllRow(value) {
        this.props.checkAllRow(!value)
    }
 
    _onNext(obj) {
        this.props.getListDataCasting(obj.params)
    }
    _onPrevious(obj) {
        this.props.getListDataCasting(obj.params)
    }
    _onChangePage(obj) {
        this.props.getListDataCasting(obj.params)
    }

    render() {
        let { list_data, allChecked, listHeaderTable, page } = this.props.casting
        let { IdMould, Name, Numb } = this.props.casting.objData
        return (
            <div className="container">
                <AlertCustom onRef={ref => (this.child = ref)} />

                <section >
                    <BrackcrumFromView title="Quản lý casting" />
                    <div className="main__content">
                        <ToolbarFormView parentObject={this} />
                        <div className="form__personnal">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group ">
                                        <div className="left">
                                            <label htmlFor="name">Mã casting</label>
                                        </div>
                                        <div className="right">
                                            <input className="name form-control"
                                                value={IdMould}
                                                onChange={(e) => this._handleInput(e)}
                                                type="text"
                                                ref="IdMould"
                                                id="IdMould"
                                                name="IdMould"
                                                required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <div className="left">
                                            <label htmlFor="name">Tên casting</label>
                                        </div>
                                        <div className="right">
                                            <input className="name form-control"
                                                type="text"
                                                value={Name}
                                                onChange={(e) => this._handleInput(e)}
                                                ref="Name"
                                                id="Name"
                                                name="Name"
                                                required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="form-group">
                                        <div className="left">
                                            <label htmlFor="name">Numb</label>
                                        </div>
                                        <div className="right">
                                            <input className="name form-control"
                                                type="number"
                                                value={Numb}
                                                onChange={(e) => this._handleInput(e)}
                                                ref="Numb"
                                                id="Numb"
                                                name="Numb"
                                                required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
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
                                    {
                                        listHeaderTable.map((item, i) => {
                                            let { key, title } = item
                                            return (
                                                <th style={{ "textAlign": "left" }} key={key} scope="col">{title}</th>
                                            )
                                        })

                                    }
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th></th>
                                    {
                                        listHeaderTable.map((item, i) => {
                                            let { key, type, valueFilter } = item
                                            return (
                                                <td key={'input' + i + key}>
                                                    <input className="name form-control" type="text"
                                                        onKeyPress={(e) => this._onKeyDown(e, key)}
                                                        value={valueFilter}
                                                        onChange={(e) => this._onFilterData(e, key)}
                                                        id={key}
                                                        name="name" required="" />
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                                {list_data && list_data.map((item, i) => {
                                    let { IdMould, Name, Numb, checked } = item
                                    return (
                                        <tr key={`data_${i}`} onClick={() => this._onClickRow(item)}>
                                            <th scope="row">
                                                <label>
                                                    <input type="checkbox" checked={checked} onChange={() => this._checkClickRow(item)} />
                                                </label>
                                            </th>
                                            <td>{IdMould}</td>
                                            <td>{Name}</td>
                                            <td>{Numb}</td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                        <PagingTable type="stone" parentObject={this} />

                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    casting,
    header,
    toolbar,
    common
}, ownProps) => {
    return {
        toolbar,
        userAuth,
        i18n,
        ownProps,
        casting,
        header,
        common
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...userActions,
        ...castingActions,
        ...toolbarActions,
        ...commonActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CastingFormView)
