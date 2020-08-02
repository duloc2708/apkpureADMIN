import * as userActions from 'modules/login/actions/form'
import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import * as toolbarActions from 'modules/toolbar/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import * as listActions from 'modules/list/actions/form'
const { Translate, I18n } = ReactReduxI18n;
import {resetInfoPage} from 'modules/common/actions/form'
class ListFormView extends React.Component {
    constructor() {
        super()
        this.state = {
            _notificationSystem: null
        }
    }
    componentWillMount() {

    }

    componentDidMount() {
        this._loadData()

    }


    componentWillUnmount() {
        this._resetData()
        this.props.updateButtonToolbar('')
        this.props.resetInfoPage()
    }
    _loadData() {
        var currentURL = document.URL;
        var url = new URL(currentURL);
        let { total, page } = this.props.common
        var codeURL = url.searchParams.get("code");
        let params = {
            type: codeURL.toUpperCase(),
            page: page,
            total: total
        }
        this.props.getListDataList(params)
    }
    _resetData() {
        this.props.resetDataList()
    }
    ChangeButton(value) {
        let isStatus = true
        let { objData } = this.props.list
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
                        this.props.updateItemList()
                            .then(res => {
                                this.child._addNotification(I18n.t(`alert.updatesuccess`), 'success')
                                this._loadData()
                                this._resetData()
                            })

                    } else {
                        var currentURL = document.URL;
                        var url = new URL(currentURL);
                        var type = url.searchParams.get("code");
                        let { code } = this.props.list.objData
                        this.props.checkCodeExists({ code, type }).then(res => {
                            let { value } = res.data.data
                            if (value == 1) {
                                this.child._addNotification(I18n.t(`list.exist_params`), 'warning')
                                this.props.updateButtonToolbar('ADD')
                            } else {
                                this.props.addNewItemList().then(res => {

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
        let { allChecked, objData } = this.props.list
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
    _validateSave() {
        let result = false
        let { code, name, status, type_code } = this.props.list.objData
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
    _addNewItem() {
        //   this._resetData()
    }
    _onClickRow(item) {
        this.props.clickCheckRowList(item)
    }
    _handleInput(e) {
        let { id, value } = e.target
        let { objData } = this.props.list
        objData[id] = value
        this.props.updateInputItem(objData)
    }
    _changeStatus(status) {
        let { objData } = this.props.list
        objData["status"] = status
        this.props.updateInputItem(objData)
    }
    _checkClickRow(item) {
        this.props.clickCheckRowList(item)
    }
    _checkAllRow(value) {
        this.props.checkAllRowList(!value)
    }
    _onFilterData(e, code) {
        this.props.updateValueFilterHeader({ code: code, value: e.target.value })
    }
    _onKeyDown(e, key) {
        if (e.charCode == 13) {
            var currentURL = document.URL;
            var url = new URL(currentURL);
            let { total, page } = this.props.list
            var codeURL = url.searchParams.get("code");
            let params = {
                type: codeURL.toUpperCase(),
                page: 1,
                total: 50,
                key: key,
                value: e.target.value
            }
            this.props.getListDataListSearch(params)
        }

    }

    _onNext(obj) {
        var currentURL = document.URL;
        var url = new URL(currentURL);
        var codeURL = url.searchParams.get("code");
        obj.params.type = codeURL.toUpperCase()
        this.props.getListDataList(obj.params)
    }
    _onPrevious(obj) {
        var currentURL = document.URL;
        var url = new URL(currentURL);
        var codeURL = url.searchParams.get("code");
        obj.params.type = codeURL.toUpperCase()
        this.props.getListDataList(obj.params)
    }
    _onChangePage(obj) {
        let { listHeaderTable } = this.props.list

        var currentURL = document.URL;
        var url = new URL(currentURL);
        var codeURL = url.searchParams.get("code");
        let checkValueFilter = listHeaderTable.find(x => x.valueFilter != '')
        if (!checkValueFilter || checkValueFilter && checkValueFilter.length == 0) {
            obj.params.type = codeURL.toUpperCase()
            this.props.getListDataList(obj.params)
        } else {
            obj.params.type = codeURL.toUpperCase()
            obj.params.key = checkValueFilter.key
            obj.params.value = checkValueFilter.valueFilter
            this.props.getListDataListSearch(obj.params)
        }
    }
    render() {
        let { list_data, allChecked, page, listHeaderTable } = this.props.list
        let { code, name, status, valueParams } = this.props.list.objData
        return (
            <div className="container">
                <AlertCustom onRef={ref => (this.child = ref)} />
                <section >
                    <BrackcrumFromView />
                    <div className="main__content">
                        <ToolbarFormView parentObject={this} />
                        <div className="form__personnal">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="form-group ">
                                        <div className="left">
                                            <label htmlFor="name">Mã tham số</label>
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
                                            <label htmlFor="name">Diễn giải</label>
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
                                            <label htmlFor="name">Giá trị</label>
                                            <span className="required">*</span>
                                        </div>
                                        <div className="right">
                                            <input className="name form-control"
                                                type="text"
                                                value={valueParams}
                                                onChange={(e) => this._handleInput(e)}
                                                id="valueParams"
                                                required="" />
                                            <span className="wpcf-not-valid-tip wpcf-display-none" ></span>
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
                                    {listHeaderTable.map((item, i) => {
                                        let { title, key } = item
                                        return (
                                            <th scope="col" key={'col' + i + key}>{title}</th>
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
                                    let { name, code, status, checked, valueParams } = item
                                    return (
                                        <tr key={`data_${i}`} onClick={() => this._onClickRow(item)}>
                                            <th scope="row">
                                                <label>
                                                    <input type="checkbox" checked={checked} onChange={() => this._checkClickRow(item)} />
                                                </label>
                                            </th>
                                            <td>{code}</td>
                                            <td>{name}</td>
                                            <td>{valueParams}</td>
                                            <td><input type="checkbox" checked={status == 1 ? true : false} /></td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                        <PagingTable type="list" parentObject={this} />

                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    list,
    header,
    toolbar,
    casting,
    common
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        list,
        header,
        toolbar,
        casting,
        common
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...userActions,
        ...listActions,
        ...toolbarActions,
        ...listActions,
        resetInfoPage
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListFormView)
