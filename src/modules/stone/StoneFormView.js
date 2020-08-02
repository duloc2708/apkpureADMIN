import * as userActions from 'modules/login/actions/form'
import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import * as stoneActions from 'modules/stone/actions/form'
import * as toolbarActions from 'modules/toolbar/actions/form'
import * as commonActions from 'modules/common/actions/form'
import { getListTypeByListCode } from 'modules/list/actions/form'

const { Translate, I18n } = ReactReduxI18n;
class StoneFormView extends React.Component {
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
        let { objData } = this.props.stone
        let objData_temp = _.clone(objData, true)
        Object.keys(objData_temp).forEach(function (key) {
            objData_temp[key] = '';
        });
        this.props.clearInputStone(objData_temp)

    }
    componentWillUnmount() {
        this.props.resetDataStone()
        this.props.resetInfoPage()
        this.props.updateButtonToolbar('')
    }
    componentWillMount() {
        // get list type
        let list = ['DSM', 'UNIT', 'TYPE_STONE', 'HD', 'KC']
        this.props.getListTypeByListCode(list).then(() => {
            this.props.loadFormStone()
        })
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
        this.props.getListDataStone(params)
    }
    ChangeValueCombobox(obj) {
        let { id, value } = obj
        let { objData } = this.props.stone
        objData[id] = value
        this.props.updateInputItem(objData)
    }
    ChangeButton(value) {
        let value_temp = value
        let isStatus = true
        let { objData } = this.props.stone
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
                            alert('Update thành công')
                            this._loadData()
                        })
                    } else {
                        this.props.checkCodeExistsByTable({ field: "Id", value: objData.Id, table: "STONE" }).then(res => {
                            let { value } = res.data.data
                            if (value == 1) {
                                this.child._addNotification(I18n.t(`list.exist_params`), 'warning')
                                isStatus = false;
                            } else {
                                this.props.addNewItemStone().then(res => {
                                    value_temp = ''
                                    alert('Insert thành công')
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
                if (!objData.Id) {
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
        let { id } = this.state
        let { allChecked, objData } = this.props.stone
        if (!allChecked) {
            this.props.deleteItemStone({ id: objData.Id }).then(res => {
                this.child._addNotification(`Xoá thành công`, 'success')
                this._loadData()
            })
        } else {
            this.props.deleteAllItemStone().then(res => {
                this.child._addNotification(`Xoá thành công`, 'success')
                this._loadData()
            })
        }
        this._clearInput()
    }
    _checkValidate() {
        let result = true
        let temp = ''
        let { fieldValidateStone, objData } = this.props.stone
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
    _editItem() {
        let { id, code, name, status } = this.state
        if (id == 0) {
            this.child._addNotification(`Vui lòng chọn dòng cần sửa`, 'warning')
            return
        }
        if (this._checkValidate()) {
            this.props.updateItemStone().then(res => {
                this.child._addNotification(`Update thành công`, 'success')
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
        let { objData } = this.props.stone
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
    _renderPage(page) {
        let { totalPage } = this.props.stone
        let data = [];
        for (var i = 1; i <= totalPage; i++) {
            data.push(<li key={`page_${i}`} className={`page-item ${i == page ? 'active' : ''}`}>
                <a className={`page-link`} onClick={(e) => this._onChangePage(e)}>{i}</a>
            </li>);
        }
        return data;
    }
    _onFilterData(e, code) {
        this.props.updateValueFilterHeader({ code: code, value: e.target.value })
    }
    _onKeyDown(e, key) {
        if (e.charCode == 13) {
            let params = {
                page: 1,
                total: 50,
                key: key,
                value: e.target.value
            }
            this.props.getListDataStoneBySearch(params)
        }

    }
    _onNext(obj) {
        this.props.getListDataStone(obj.params)
    }
    _onPrevious(obj) {
        this.props.getListDataStone(obj.params)
    }
    _onChangePage(obj) {
        this.props.getListDataStone(obj.params)
    }
    render() {
        let { list_data, allChecked, listHeaderTable, page, is_load } = this.props.stone
        let { Id,
            Name,
            Decription,
            IdType,
            IdUnit,
            Numb,
            Weight,
            TypeStone,
            Hd,
            Kc,
            Color } = this.props.stone.objData
        return (
            <div className="container">
                <AlertCustom onRef={ref => (this.child = ref)} />
                {is_load ?
                    <section >
                        <BrackcrumFromView title="Quản lý đá" />
                        <div className="main__content">
                            <ToolbarFormView parentObject={this} />
                            <div className="form__personnal">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group ">
                                            <div className="left">
                                                <label htmlFor="name">Mã đá</label>
                                            </div>
                                            <div className="right">
                                                <input className="name form-control"
                                                    value={Id}
                                                    onChange={(e) => this._handleInput(e)}
                                                    type="text"
                                                    ref="Id"
                                                    id="Id"
                                                    name="Id"
                                                    required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <div className="left">
                                                <label htmlFor="name">Tên đá</label>
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
                                                <label htmlFor="name">Màu đá</label>
                                            </div>
                                            <div className="right">
                                                <Combobox type_code='DSM' id='Color' value={Color} parentObject={this} />
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group ">
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
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <div className="left">
                                                <label htmlFor="name">Weight</label>
                                            </div>
                                            <div className="right">
                                                <input className="name form-control"
                                                    type="number"
                                                    value={Weight}
                                                    onChange={(e) => this._handleInput(e)}
                                                    ref="Weight"
                                                    id="Weight"
                                                    name="Weight"
                                                    required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <div className="left">
                                                <label htmlFor="name">Unit</label>
                                            </div>
                                            <div className="right">
                                                <Combobox type_code='UNIT' id='IdUnit' value={IdUnit} parentObject={this} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group ">
                                            <div className="left">
                                                <label htmlFor="name">Loại đá</label>
                                            </div>
                                            <div className="right">
                                                <Combobox type_code='TYPE_STONE' id='TypeStone' value={TypeStone} parentObject={this} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <div className="left">
                                                <label htmlFor="name">Hình dạng</label>
                                            </div>
                                            <div className="right">
                                                <Combobox type_code='HD' id='Hd' value={Hd} parentObject={this} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <div className="left">
                                                <label htmlFor="name">Kích cỡ</label>
                                            </div>
                                            <div className="right">
                                                <Combobox type_code='KC' id='Kc' value={Kc} parentObject={this} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">

                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <div style={{ width: "13%" }}>
                                                <label htmlFor="name">Description</label>
                                            </div>
                                            <div style={{ width: "87%" }}>
                                                <textarea className="name form-control"
                                                    type="text"
                                                    value={Decription}
                                                    onChange={(e) => this._handleInput(e)}
                                                    ref="Decription"
                                                    id="Decription"
                                                    name="Decription"
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
                                                    <th key={key} scope="col">{title}</th>
                                                )
                                            })

                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th></th>
                                        {listHeaderTable.map((item, i) => {
                                            let { title, key, valueFilter } = item
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
                                        })}
                                    </tr>
                                    {list_data && list_data.map((item, i) => {
                                        let { Id, Name, IdUnit, Numb, Weight, Decription, checked
                                            , UnitName, HdName, KcName, ColorName
                                        } = item
                                        return (
                                            <tr key={`data_${i}`} onClick={() => this._onClickRow(item)}>
                                                <th scope="row">
                                                    <label>
                                                        <input type="checkbox" checked={checked} onChange={() => this._checkClickRow(item)} />
                                                    </label>
                                                </th>
                                                <td>{Id}</td>
                                                <td>{Name}</td>
                                                <td>{HdName}</td>
                                                <td>{KcName}</td>
                                                <td>{ColorName}</td>
                                                <td>{UnitName}</td>
                                                <td>{Numb}</td>
                                                <td>{Weight}</td>
                                                <td>{Decription}</td>
                                            </tr>)
                                    })}
                                </tbody>
                            </table>
                            <PagingTable type="stone" parentObject={this} />

                        </div>
                    </section>

                    : ''}
            </div>
        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    stone,
    header,
    toolbar,
    common
}, ownProps) => {
    return {
        toolbar,
        userAuth,
        i18n,
        ownProps,
        stone,
        header,
        common
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...userActions,
        ...stoneActions,
        ...toolbarActions,
        ...commonActions,
        getListTypeByListCode
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(StoneFormView)
