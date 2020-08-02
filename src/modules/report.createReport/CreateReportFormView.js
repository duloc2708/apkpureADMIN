
import * as createReportActions from 'modules/report.createReport/actions/form'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import ParamReportFormView from './ParamReportFormView'
import * as toolbarActions from 'modules/toolbar/actions/form'
import { getListTypeByListCode } from 'modules/list/actions/form'

const { Translate, I18n } = ReactReduxI18n;
class CreateReportFormView extends React.Component {
    constructor() {
        super()
    }
    componentWillMount() {
        let list = ['GROUP_REPORT', 'ORIEN_REPORT', 'SIZE_REPORT', 'DATATYPE', 'DATEVALUE', 'TYPE_CHART']
        this.props.getListTypeByListCode(list).then(() => {
            this.props.loadFormReport()
        })
    }
    componentDidMount() {
        this._loadData()

    }
    _showParams() {
        this.props.showParams()
    }
    _updateParams(item) {
        this.props.getListParams(item)
    }
    _validateSave() {
        return true
    }
    ChangeButton(value) {
        let isStatus = true
        let { objData } = this.props.createReport
        let { status } = this.props.toolbar

        switch (value) {
            case "SAVEANDCLOSE":
                if (status == '') {
                    isStatus = false
                    break
                }
                if (this._validateSave()) {
                    if (status == 'EDIT') {
                        this.props.updateReport()
                            .then(res => {
                                this.child._addNotification(I18n.t(`alert.updatesuccess`), 'success')
                                this._loadData()
                            })

                    } else {
                        this.props.addReport().then(res => {
                            this.child._addNotification(I18n.t(`alert.updatesuccess`), 'success')
                            this._loadData()
                        })
                    }
                } else {
                    isStatus = false
                }
                break;
            case "SAVE":
                if (status == '') {
                    isStatus = false
                    break
                }
                if (this._validateSave()) {
                    if (status == 'EDIT') {
                        this.props.updateReport()
                            .then(res => {
                                this.child._addNotification(I18n.t(`alert.updatesuccess`), 'success')
                                this._loadData()
                            })

                    } else {
                        this.props.addReport().then(res => {
                            this.child._addNotification(I18n.t(`alert.updatesuccess`), 'success')
                            this._loadData()
                        })
                    }
                } else {
                    isStatus = false
                }
                break;

            case "ADD":
                this.props.resetInfoParams().then(() => {
                    this._loadData()
                })
                break;
            case "EDIT":
                if (!objData.ADREPORTLISTID) {
                    isStatus = false
                    this.child._addNotification(I18n.t(`alert.please_select_rows`), 'warning')
                }
                break;
            case "DELETE":
                var txt;
                var r = confirm(I18n.t(`alert.delete`));
                if (r == true) {
                    // this._deleteItem()
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
    _loadData() {
        this.props.getListDataReport()
    }
    _handleInput(e) {
        let { id, value } = e.target
        let { objData } = this.props.createReport
        objData[id] = value
        this.props.updateInputItem(objData)
    }
    _changeStatus(status) {
        let { objData } = this.props.createReport
        objData["STATUS"] = status
        this.props.updateInputItem(objData)
    }
    ChangeValueCombobox(obj) {
        let { id, value } = obj
        let { objData } = this.props.createReport
        let objDataNew = _.clone(objData, true)
        objDataNew[id] = value
        this.props.updateInputItem(objDataNew)
    }
    _checkClickRow(item) {
        let { status } = this.props.toolbar
        if (['ADD', 'EDIT'].indexOf(status) == -1) {
            this.props.checkClickRowReport(item)
        }
    }
    _onCopyReport(item) {
        this.props.copyReport(item).then(() => {
            this._loadData()
        })
    }
    render() {
        const { list_data, objData, listHeaderTable, is_load } = this.props.createReport
        const { TYPE_CHART, ADFUNCTIONID, CODE, GROUP_REPORT, TITLE, STORENAME, ORDERBY, SIZE, ORIENTATION, STATUS } = objData
        return (
            <div className="container">
                <AlertCustom onRef={ref => (this.child = ref)} />
                <ParamReportFormView />
                {is_load ?
                    <section >
                        <BrackcrumFromView title="Định nghĩa báo cáo" />
                        <div className="main__content">
                            <ToolbarFormView parentObject={this} />
                            <div className="form__personnal">
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="form-group ">
                                            <div className="left">
                                                <label htmlFor="name">Mã báo cáo</label>

                                            </div>
                                            <div className="right">
                                                <input className="name form-control"
                                                    value={CODE}
                                                    onChange={(e) => this._handleInput(e)}
                                                    type="CODE"
                                                    ref="CODE"
                                                    id="CODE"
                                                    name="CODE"
                                                    required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <div className="left">
                                                <label htmlFor="name">Tên báo cáo</label>

                                            </div>
                                            <div className="right">
                                                <input className="name form-control"
                                                    type="text"
                                                    value={TITLE}
                                                    onChange={(e) => this._handleInput(e)}
                                                    ref="TITLE"
                                                    id="TITLE"
                                                    name="TITLE"
                                                    required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <div className="left">
                                                <label htmlFor="name">Nhóm báo cáo</label>

                                            </div>
                                            <div className="right">
                                                <Combobox type_code='GROUP_REPORT' value={GROUP_REPORT} id='GROUP_REPORT' parentObject={this} />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="form-group ">
                                            <div className="left">
                                                <label htmlFor="name">Tên store</label>

                                            </div>
                                            <div className="right">
                                                <input className="name form-control"
                                                    value={STORENAME}
                                                    onChange={(e) => this._handleInput(e)}
                                                    type="text"
                                                    ref="STORENAME"
                                                    id="STORENAME"
                                                    name="STORENAME"
                                                    required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <div className="left">
                                                <label htmlFor="name">Số thứ tự</label>

                                            </div>
                                            <div className="right">
                                                <input className="name form-control"
                                                    type="text"
                                                    value={ORDERBY}
                                                    onChange={(e) => this._handleInput(e)}
                                                    ref="ORDERBY"
                                                    id="ORDERBY"
                                                    name="ORDERBY"
                                                    required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <div className="left">
                                                <label htmlFor="name">Khổ giấy</label>

                                            </div>
                                            <div className="right">
                                                <Combobox type_code='SIZE_REPORT' value={SIZE} id='SIZE' parentObject={this} />

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <div className="left">
                                                <label htmlFor="name">Loại biểu đồ</label>
                                            </div>
                                            <div className="right">
                                                <Combobox type_code='TYPE_CHART' value={TYPE_CHART} id='TYPE_CHART' parentObject={this} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <div className="left">
                                                <label htmlFor="name">Sử dụng</label>
                                            </div>
                                            <div className="right">
                                                <div className="checkbox">
                                                    <label>
                                                        <input type="checkbox" ref="status"
                                                            checked={STATUS == 1 ? true : false}
                                                            onChange={() => this._changeStatus(STATUS == 1 ? 0 : 1)}
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <div className="left">
                                                <label htmlFor="name">Orientation</label>
                                            </div>
                                            <div className="right">
                                                <Combobox type_code='ORIEN_REPORT' value={ORIENTATION} id='ORIENTATION' parentObject={this} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <div className="left">
                                                <button onClick={() => this._showParams()} className="btn btn-primary">Cập nhật tham số</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th style={{ "textAlign": "left" }} scope="col">
                                            <label>
                                                <input type="checkbox" />
                                            </label>
                                        </th>
                                        {listHeaderTable.map((item, i) => {
                                            let { title, key } = item
                                            return (
                                                <th style={{ "textAlign": "left" }} scope="col" key={'col' + i + key}>{title}</th>
                                            )
                                        })
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {list_data && list_data.map((item, i) => {
                                        let { ADFUNCTIONID, CODE, GROUP_REPORT, TITLE, STORENAME, ORDERBY, SIZE, ORIENTATION, STATUS, checked } = item
                                        return (
                                            <tr key={`data_${i}`} onClick={() => this._checkClickRow(item)}>
                                                <th scope="row">
                                                    <label>
                                                        <input type="checkbox" checked={checked}
                                                            onChange={() => this._checkClickRow(item)}
                                                        />
                                                    </label>
                                                </th>
                                                <td>{CODE}</td>
                                                <td>{TITLE}</td>
                                                <td>{GROUP_REPORT}</td>
                                                <td>{STORENAME}</td>
                                                <td>{SIZE}</td>
                                                <td>{ORIENTATION}</td>
                                                <td><input type="checkbox" checked={STATUS == 1 ? true : false} /></td>
                                                <td><button onClick={() => this._updateParams(item)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button></td>
                                                <td><button onClick={() => this._onCopyReport(item)}><i className="fa fa-copy" aria-hidden="true"></i></button></td>
                                            </tr>)
                                    })}
                                </tbody>
                            </table>
                            <PagingTable type="list" parentObject={this} />
                        </div>
                    </section>
                    : ''}
            </div >
        )
    }
}

const mapStateToProps = ({
    createReport,
    i18n,
    toolbar
}, ownProps) => {
    return {
        createReport,
        i18n,
        toolbar
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...createReportActions,
        ...toolbarActions,
        getListTypeByListCode
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CreateReportFormView)
