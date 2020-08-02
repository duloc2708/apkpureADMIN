
import * as listReportActions from 'modules/report.listreport/actions/form'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import * as toolbarActions from 'modules/toolbar/actions/form'
import ChartFormView from './ChartFormView'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const { Translate, I18n } = ReactReduxI18n;
class listReportFormView extends React.Component {
    constructor() {
        super()
    }
    componentDidMount() {
        this._loadData()
    }

    _updateParams(item) {
        // this.props.getListParams(item)
    }
    _validateSave() {
        return true
    }

    ChangeButton(value) {
        let isStatus = true
        let { objData } = this.props.listReport
        switch (value) {
            case "SAVE":
                let { status } = this.props.toolbar
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
        let { listParams } = this.props.listReport
        let listParamsTemp = _.clone(listParams, true)
        listParamsTemp.map(item => {
            if (item.FIELD == id) {
                item.VALUE = value
            }
            return item
        })
        this.props.updateInputValueParams(listParamsTemp)
    }
    _changeStatus(status) {
        let { objData } = this.props.listReport
        objData["status"] = status
        this.props.updateInputItem(objData)
    }
    ChangeValueCombobox(obj) {
        let { id, value } = obj
        let { listParams } = this.props.listReport
        let listParamsTemp = _.clone(listParams, true)
        listParamsTemp.map(item => {
            if (item.FIELD == id) {
                item.VALUE = value
            }
            return item
        })
        this.props.updateInputValueParams(listParamsTemp)
    }
    ChangeValueComboboxMulti(obj) {
        let { id, data, key } = obj
        let { listParams } = this.props.listReport
        let listParamsTemp = _.clone(listParams, true)
        listParamsTemp.map(item => {
            if (item.FIELD == key) {
                item.VALUE = data
            }
            return item
        })
        this.props.updateInputValueParams(listParamsTemp)
        // console.log('>>>', obj)
    }
    _checkClickRow(item) {
        this.props.checkClickRowReportList(item)
    }
    _onChange() {

    }
    handleChangeDate(field, date) {
        let { listParams } = this.props.listReport
        let listParamsTemp = _.clone(listParams, true)
        listParamsTemp.map(item => {
            if (item.FIELD == field) {
                item.VALUE = moment(date)
            }
            return item
        })
        this.props.updateInputValueParams(listParamsTemp)
    }
    _renderParams() {
        let { listParams } = this.props.listReport
        let arr_params = []
        listParams.map(item => {
            let { TYPE, VALUE, TEXT, FIELD, LIST_DATA } = item
            switch (TYPE) {
                case "STRING":
                    arr_params.push(
                        <div key={FIELD} className="form-group">
                            <div className="left">
                                <label htmlFor="name">{TEXT}</label>
                            </div>
                            <div className="right">
                                <input
                                    onChange={(e) => this._handleInput(e)}
                                    value={VALUE}
                                    type="text"
                                    id={FIELD}
                                    name={FIELD}
                                />
                            </div>
                        </div>
                    )
                    break;
                case "DATETIME":
                    arr_params.push(
                        <div key={FIELD} className="form-group">
                            <div className="left">
                                <label htmlFor="name">{TEXT}</label>
                            </div>
                            <div className="right">
                                <DatePicker
                                    dateFormat="DD/MM/YYYY"
                                    selected={VALUE} onChange={(e) => this.handleChangeDate(FIELD, e)} />
                            </div>
                        </div>
                    )
                    break;
                case "LIST":
                    if (LIST_DATA.length > 0) {
                        arr_params.push(
                            <div key={FIELD} className="form-group">
                                <div className="left">
                                    <label htmlFor="name">{TEXT}</label>
                                </div>
                                <div className="right">
                                    <ComboboxMultiple comboOther={FIELD} list_data_other={LIST_DATA} id={FIELD} value={VALUE} parentObject={this} />

                                    {/* <Combobox type_code={FIELD} data_order={LIST_DATA} value={VALUE} id={FIELD} parentObject={this} /> */}
                                </div>
                            </div>
                        )
                    }
                    break;
                default:
                    break;
            }
        })
        return <div className="col-md-12">
            {arr_params}
        </div>

    }
    _onExporEXCEL() {
        const { objData } = this.props.listReport
        if (objData.ADREPORTLISTID) {
            this.props.exportReportExcel()
        } else {
            alert('Vui lòng chọn báo cáo để xuất!')
        }
    }
    _onExporChart() {
        const { objData } = this.props.listReport
        if (objData.ADREPORTLISTID) {
            this.props.exportReportExcel()
        } else {
            alert('Vui lòng chọn báo cáo để xuất!')
        }
    }
    _onExportPDF() {
        alert('Coming soon!')
    }
    render() {
        const { list_data, objData, listHeaderTable, listParams, listDataChart } = this.props.listReport
        const { code, TITLE, group, store, orderby, orien, size, status, RType, TYPE_CHART } = objData
        return (
            <div className="container">
                <AlertCustom onRef={ref => (this.child = ref)} />
                <section >
                    <hr />
                    <div className="main__content">
                        <div className="row">
                            <div className={`col-md-${listDataChart && listDataChart.length > 0 ? '2' : '6'}`}>
                                <BrackcrumFromView title="Danh sách báo cáo" />
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            {listHeaderTable.map((item, i) => {
                                                let { title, key } = item
                                                if (key == 'TITLE' && listDataChart && listDataChart.length > 0) {

                                                } else {
                                                    return (
                                                        <th style={{ "textAlign": "left" }} scope="col" key={'col' + i + key}>{title}</th>
                                                    )
                                                }

                                            })
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list_data && list_data.map((item, i) => {
                                            let { ORDERBY, CODE, TITLE, checked } = item
                                            return (
                                                <tr key={`data_${i}`} onClick={() => this._checkClickRow(item)}>
                                                    <th scope="row">
                                                        <label>
                                                            <input type="checkbox" checked={checked}
                                                                onChange={() => this._checkClickRow(item)}
                                                            />
                                                        </label>
                                                    </th>
                                                    <td>{i + 1}</td>
                                                    <td>{CODE}</td>
                                                    {listDataChart && listDataChart.length > 0 ? '' : <td>{TITLE}</td>}

                                                </tr>)
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className={`col-md-${listDataChart && listDataChart.length > 0 ? '10' : '6'}`}>
                                <BrackcrumFromView title="Danh sách tham số" />
                                <br />
                                <div className="row">
                                    {this._renderParams()}
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            {
                                                TYPE_CHART != null ?
                                                    <button onClick={() => this._onExporChart()} >Khởi tạo biểu đồ</button>
                                                    :
                                                    <button onClick={() => this._onExporEXCEL()} >Xuất excel</button>
                                            }

                                        </div>
                                    </div>
                                </div>
                                {listDataChart && listDataChart.length > 0 ?
                                    <ChartFormView title={TITLE} data={listDataChart} type={TYPE_CHART} />
                                    :
                                    ''}
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        )
    }
}

const mapStateToProps = ({
    listReport,
    i18n,
    toolbar
}, ownProps) => {
    return {
        listReport,
        i18n,
        toolbar
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...listReportActions,
        ...toolbarActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(listReportFormView)
