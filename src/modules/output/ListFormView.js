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
import { getListTypeByListCode } from 'modules/list/actions/form'

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
        // this.props.getDataWoker(list)
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
                        const { data } = res.data
                        if (data.length > 0 && data[0].ERROR_CODE == 'ERROR_NOT_PRICE') {
                            alert('Một số sản phẩm chưa có giá, vui lòng kiểm tra lại!')
                        } else {
                            this.child._addNotification(`Cập nhật thành công.`, 'success')
                            this.props.getListDataOutPutBySearch(this.refs.code_output && this.refs.code_output.value || '')
                        }
                    })
                }
            }
            if (status == 'STATUS_OUTPUT_03') {
                var r = confirm(`Bạn cón muốn huỷ phiếu xuất này ?`);
                if (r == true) {
                    this.props.acceptOutput(item.IdOutput, status).then(res => {
                        this.child._addNotification(`Cập nhật thành công.`, 'success')
                        this.props.getListDataOutPutBySearch(this.refs.code_output && this.refs.code_output.value || '')
                    })
                }
            }
            if (item.StatusOutput == 'STATUS_OUTPUT_02' && status == 'STATUS_OUTPUT_04') {
                var r = confirm(`Bạn cón muốn hoàn thành phiếu xuất hàng này ? \n Phiếu này sẽ bị khóa và không thể cập nhật dữ liệu ?`);
                if (r == true) {
                    this.props.acceptOutput(item.IdOutput, status).then(res => {
                        this.child._addNotification(`Cập nhật thành công.`, 'success')
                        this.props.getListDataOutPutBySearch(this.refs.code_output && this.refs.code_output.value || '')
                    })
                }
            }

        }
    }
    _onChangePage(obj) {
        this.props.getListDataOutPutBySearch(this.refs.code_output && this.refs.code_output.value || '')
    }
    onClickButtonPermission(obj) {
        let { data, nameBtn } = obj
        let { item, checked, typePrint, status } = data
        switch (nameBtn) {
            case 'EDIT':
                this.props.isEditOutPut(true)
                this.props.updateButtonToolbar('EDIT')
                this.props.clickCheckRowOrder(item, checked)
                this.props.getListDataOrderInOutPutEdit(item.IdOrder)
                break;
            case 'DETAIL':
                this.props.clickCheckRowOrder(item, checked)
                this.props.getListDataOrderInOutPutEdit(item.IdOrder)
                this.props.isEditOutPut(true)
                break;
            case 'PRINT':
                if ((item.StatusOutput == 'STATUS_OUTPUT_01' || item.StatusOutput==null ) && (typePrint=='type1' || typePrint=='type2')) {
                    this.child._addNotification(`Chỉ được phép in sau khi đã xác nhận phiếu xuất.`, 'warning')
                }
                else
                {
                    this.props.printOuputDetail(item, typePrint)                
                }
                break;
            case 'ACCEPT_OUTPUT':
                this._acceptOutput(item, status)
                break;
            case 'COMPlETED_OUTPUT':
                this._acceptOutput(item, status)
                break;
            case 'PRICE_OUTPUT':
                this._updatePriceOutput(item)
                break;

            default:
                break
        }
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
                                StatusOrderName, StatusOrderBagName,codeLV,Pricename,bgColor_G, StatusOrderTransferName, StatusOutputName, ValueLAI, DayConfirm, DayDeliver,DPCode,DAmount,DValue } = item
                            return (
                                <tr style={{ "backgroundColor": bgColor_G != null? bgColor_G : null }} key={`data_${IdOrder}_${i}`}
                                // onDoubleClick={() => this._onClickRowDouble(item, !checked)}
                                >
                                    <th scope="row">
                                        <label>
                                            <input type="checkbox" checked={checked} onChange={() => this._onClickRow(item, !checked)} />
                                        </label>
                                    </th>
                                    <td>{IdOutput}</td>
                                    <td>{codeLV}</td>
                                    <td>{ValueLAI}</td>
                                    <td>{Pricename}</td>
                                    <td>{DPCode}</td>
                                    <td>{IdOrder + '-' + CodeCustomer}</td>
                                    
                                    <td>{DayMake}</td>
                                    <td>{DayConfirm != null ? DayConfirm : ''}</td>
                                    <td>{DayDeliver != null ? DayDeliver : ''}</td>                                    
                                    <ButtonPermission type="ACCEPT_OUTPUT1" key="ACCEPT_OUTPUT1" nameBtn="ACCEPT_OUTPUT" icon={`fa fa-check`} data={{ item: item, status: 'STATUS_OUTPUT_02' }} parentObject={this} />
                                    <td>{StatusOutputName}</td>
                                    <ButtonPermission type="EDIT" key="EDIT" nameBtn="EDIT" icon={`fa fa-pencil-square-o`} data={{ item: item, checked: !checked }} parentObject={this} />
                                    <ButtonPermission type="COMPlETED_OUTPUT" key="COMPlETED_OUTPUT" nameBtn="COMPlETED_OUTPUT" icon={`fa fa-key`} data={{ item: item, status: 'STATUS_OUTPUT_04' }} parentObject={this} />                                    
                                    {/*  <ButtonPermission type="DETAIL" key="DETAIL" nameBtn="DETAIL" icon={`fa fa-info-circle`} data={{ item: item, checked: !checked }} parentObject={this} /> */}
                                    <ButtonPermission type="PRICE_OUTPUT" key="PRICE_OUTPUT" nameBtn="PRICE_OUTPUT" icon={`fa fa-usd`} data={{ item: item }} parentObject={this} />
                                    <ButtonPermission data={{ item: item, typePrint: "type1" }} parentObject={this} key="PRINT1" type="PRINT1" nameBtn="PRINT" icon={`fa fa-print`} />
                                    <ButtonPermission key="PRINT2" type="PRINT2" nameBtn="PRINT" icon={`fa fa-print`} data={{ item: item, typePrint: "type2" }} parentObject={this} />
                                    <ButtonPermission key="PRINT3" type="PRINT3" nameBtn="PRINT" icon={`fa fa-print`} data={{ item: item, typePrint: "type3" }} parentObject={this} />
                                    <ButtonPermission key="PRINT4" type="PRINT4" nameBtn="PRINT" icon={`fa fa-print`} data={{ item: item, typePrint: "type4" }} parentObject={this} />
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
