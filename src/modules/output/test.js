import { log } from 'util';

import * as userActions from 'modules/login/actions/form'
import * as toolbarActions from 'modules/toolbar/actions/form'
import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import * as outputActions from 'modules/output/actions/form'
import * as orderActions from 'modules/order/actions/form'
import * as commonActions from 'modules/common/actions/form'
import { getListTypeByListCode} from 'modules/list/actions/form'

import DetailFormView from './DetailFormView'

const { Translate, I18n } = ReactReduxI18n;
class ListProductFormView extends React.Component {
    constructor() {
        super()
        this.state = {
            code: '',
            name: '',
            status: false,
            id: 0
        }
    }
    _onClickRow(item, checked) {
        this.props.clickCheckRowOrder(item, checked)
    }
    _onClickRowDouble(item, checked) {
        this.props.clickCheckRowOrder(item, checked)
        this.props.isEditOutPut(true)
    }
    _onRowEdit(item, checked) {       
        this.props.isEditOutPut(true)
        this.props.updateButtonToolbar('EDIT')      


        this.props.clickCheckRowOrder(item, checked)
    }
    _onRowDetail(item, checked) {
        this.props.clickCheckRowOrder(item, checked)
        this.props.isEditOutPut(true)
    }
    componentDidMount() {
        this.props.getListDataOutPutBySearch('')
        KeyboardJS.bind('enter', (event) => {
            if ($('#code_output').is(':focus')) {
                this._onSearch()
            }
        })

        // get list type
        let list = ['DSM', 'STATUS_ORDER']
        this.props.getListTypeByListCode(list)
    }
    _onSearch() {
        this.props.resetInfoPage().then(() => {
            this.props.getListDataOutPutBySearch(this.refs.code_output && this.refs.code_output.value || '')
        })
    }
    _handleInput(e) {
        this.setState({ code: e.target.value })
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

    _onPrint(item, type) {
        this.props.printOuputDetail(item, type)
    }
    _onNext(obj) {
        this.props.getListDataOrder(obj.params)
    }
    _onPrevious(obj) {
        this.props.getListDataOrder(obj.params)
    }


    _updatePriceOutput(item) {
        var r = confirm(`Bạn cón muốn cập nhật giá mới ?`);
        if (r == true) {
            this.props.updatePriceOutput(item.IdOrder, item.IdOutput).then(res => {
                this.child._addNotification(`Cập nhật thành công.`, 'success')
            })
        }

    }
    _acceptOutput(item, status) {
       // console.log(status);
        if (item.StatusOutput == 'STATUS_OUTPUT_02' && status == 'STATUS_OUTPUT_02') {
            this.child._addNotification(`Phiếu xuất đã được xác nhận.`, 'warning')
        }
        else if (item.StatusOutput == 'STATUS_OUTPUT_03') {
            this.child._addNotification(`Phiếu xuất đã bị huỷ`, 'warning')
        } else {
            if (status == 'STATUS_OUTPUT_02') {
                var r = confirm(`Bạn cón muốn xác nhận phiếu xuất hàng này ?`);
                if (r == true) {
                    this.props.acceptOutput(item.IdOutput, status).then(res => {
                        this.child._addNotification(`Cập nhật thành công.`, 'success')
                        this.props.getListDataOutPutBySearch('')
                    })
                }
            }
            if (status == 'STATUS_OUTPUT_03') {
                var r = confirm(`Bạn cón muốn huỷ phiếu xuất này ?`);
                if (r == true) {
                    this.props.acceptOutput(item.IdOutput, status).then(res => {
                        this.child._addNotification(`Cập nhật thành công.`, 'success')
                        this.props.getListDataOutPutBySearch('')
                    })
                }
            }
            if (item.StatusOutput == 'STATUS_OUTPUT_02' && status == 'STATUS_OUTPUT_04') {
                var r = confirm(`Bạn cón muốn hoàn thành phiếu xuất hàng này ? \n Phiếu này sẽ bị khóa và không thể cập nhật dữ liệu ?`);
                if (r == true) {
                    this.props.acceptOutput(item.IdOutput, status).then(res => {
                        this.child._addNotification(`Cập nhật thành công.`, 'success')
                        this.props.getListDataOutPutBySearch('')
                    })
                }
            }

        }
    }
    _onChangePage(obj) {
        this.props.getListDataOutPutBySearch(this.refs.code_output && this.refs.code_output.value || '')
    }
    render() {
        let { list_data, allChecked, listHeaderTable } = this.props.output
        let { page } = this.props.common
        return (
            <div>
                <AlertCustom onRef={ref => (this.child = ref)} />
                <div className="form__personnal">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="form-group ">
                                <div className="left">
                                    <label htmlFor="name">Mã XH/mã KH</label>
                                </div>
                                <div className="right">
                                    <input className="name form-control"
                                        value={this.state.code}
                                        onChange={(e) => this._handleInput(e)}
                                        type="text"
                                        ref="code_output"
                                        id="code_output"
                                        name="code_output" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="form-group">
                                <div className="left" onClick={() => this._onSearch()}>
                                    <button className="btn btn-primary">Tìm kiếm</button>
                                    {/* <button style={{ "marginLeft": "10px" }} className="btn btn-primary" onClick={() => this._onPrint('type1')}>In mẫu 1</button>
                                    <button style={{ "marginLeft": "10px" }} className="btn btn-primary" onClick={() => this._onPrint('type2')}>In mẫu 2</button> */}
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
                                    <input type="checkbox" checked={allChecked}
                                    //onChange={() => this._checkAllRow(allChecked)}
                                    />
                                </label>
                            </th>
                            {
                                listHeaderTable.map((item, i) => {
                                    let { key, title } = item
                                    return (
                                        <th style={{ "textAlign": "left" }} key={`thead_${key}`} scope="col">{title}</th>
                                    )
                                })

                            }
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <th></th>
                            {
                                listHeaderTable.map((item, i) => {
                                    let { key, type } = item
                                    return (
                                        <td key={`thead_${key}`}>
                                            <input className="name form-control" type={type} id={key} name="name" required="" />
                                        </td>
                                    )
                                })
                            }
                        </tr> */}
                        {list_data && list_data.map((item, i) => {
                            let { IdOrder, IdOutput, CodeCustomer, DayMake, checked,
                                StatusOrderName, StatusOrderBagName, StatusOrderTransferName, StatusOutputName,ValueLAI } = item
                            return (
                                <tr key={`data_${IdOrder}_${i}`}
                                // onDoubleClick={() => this._onClickRowDouble(item, !checked)}
                                >
                                    <th scope="row">
                                        <label>
                                            <input type="checkbox" checked={checked} onChange={() => this._onClickRow(item, !checked)} />
                                        </label>
                                    </th>
                                    <td>{IdOutput}</td>
                                    <td>{IdOrder}</td>
                                    <td>{CodeCustomer}</td>
                                    <td>{moment.utc(DayMake).format('DD/MM/YYYY HH:mm:ss')}</td>
                                    <td>{StatusOutputName}</td>
                                    <td ><button onClick={() => this._acceptOutput(item, 'STATUS_OUTPUT_02')}><i className="fa fa-check" aria-hidden="true"></i></button></td>
                                    <td ><button onClick={() => this._acceptOutput(item, 'STATUS_OUTPUT_04')}><i className="fa fa-key" aria-hidden="true"></i></button></td>
                                    <td><button onClick={() => this._onRowEdit(item, !checked)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button></td>
                                    <td><button onClick={() => this._onRowDetail(item, !checked)}><i className="fa fa-info-circle" aria-hidden="true"></i></button></td>
                                    <td ><button onClick={() => this._updatePriceOutput(item)}><i className="fa fa-usd" aria-hidden="true"></i></button></td>
                                    <td onClick={() => this._onPrint(item, 'type1')}><button><i className="fa fa-print" aria-hidden="true"></i></button></td>
                                    <td onClick={() => this._onPrint(item, 'type2')}><button><i className="fa fa-print" aria-hidden="true"></i></button></td>
                                    <td onClick={() => this._onPrint(item, 'type3')}><button><i className="fa fa-print" aria-hidden="true"></i></button></td>
                                    <td onClick={() => this._onPrint(item, 'type4')}><button><i className="fa fa-print" aria-hidden="true"></i></button></td>
                                </tr>)
                        })}
                    </tbody>
                </table>
                <PagingTable type="product" parentObject={this} />
            </div>

        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    order,
    header,
    output,
    common
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        order,
        header,
        output,
        common
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...userActions,
        ...outputActions,
        ...toolbarActions,
        ...commonActions,
        getListTypeByListCode
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListProductFormView)
