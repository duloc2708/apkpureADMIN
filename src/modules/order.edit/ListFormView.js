import * as userActions from 'modules/login/actions/form'
import * as toolbarActions from 'modules/toolbar/actions/form'
import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import * as orderActions from 'modules/order/actions/form'
import DetailFormView from './DetailFormView'
import ListStone from './ListStone'
import Modal from 'react-modal';
import * as commonActions from 'modules/common/actions/form'
import { getListDataBaoGia } from 'modules/baogia/actions/form'
import { getListTypeByListCode } from 'modules/list/actions/form'

const { Translate, I18n } = ReactReduxI18n;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#yourAppElement')
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

    componentWillUnmount() {
        this.props.resetInfoPage()
    }
    _onClickRow(item, checked) {
        this.props.clickCheckRowOrder(item, checked)
    }
    _onClickRowDouble(item, checked) {
        this.props.clickCheckRowOrder(item, checked)
        this._EditOrder(item)
    }

    _EditOrder(item) {
        this.props.isEditOrder(true)
        this.props.checkExistOutPutAndBag(item.IdOrder)

    }
    componentDidMount() {
        this.props.getListDataOrderBySearch('')
        KeyboardJS.bind('enter', (event) => {
            if ($('#code_order').is(':focus')) {
                this._onSearch()
            }
        })
        // get list type
        let list = ['DSM', 'LD', 'STATUS_ORDER', 'MX', 'LH', 'L', 'LV']
        this.props.getListTypeByListCode(list)
        this.props.getListDataBaoGiaInOrder()
    }
    _onSearch() {
        this.props.resetInfoPage().then(() => {
            this.props.getListDataOrderBySearch(this.refs.code_order && this.refs.code_order.value)
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
        this.props.printOrderDetail(item, type)
    }
    _acceptOrder(item, status) {
        if (item.StatusOrder == 'STATUS_ORDER_02' && status == 'STATUS_ORDER_02') {
            this.child._addNotification(I18n.t(`order.order_accept`), 'warning')
        } else if (item.StatusOrder == 'STATUS_ORDER_03') {
            this.child._addNotification(I18n.t(`order.order_cancel`), 'warning')
        } else {
            if (status == 'STATUS_ORDER_02') {
                var r = confirm(`Bạn cón muốn xác nhận đơn hàng ?`);
                if (r == true) {
                    this.props.acceptOrder(item.IdOrder, status).then(res => {
                        let { data } = res.data
                        if (data.value == 3) {
                            this.child._addNotification(`Đơn hàng đã tạo bag.`, 'warning')
                        } else {
                            this.child._addNotification(I18n.t(`order.order_udpate_status`), 'success')
                        }
                    })
                }
            }
            if (status == 'STATUS_ORDER_03') {
                var r = confirm(`Bạn cón muốn huỷ đơn hàng ?`);
                if (r == true) {
                    this.props.acceptOrder(item.IdOrder, status).then(res => {
                        let { data } = res.data
                        if (data.value == 3) {
                            this.child._addNotification(`Đơn hàng đã tạo bag.`, 'warning')
                        } else {
                            this.child._addNotification(I18n.t(`order.order_udpate_status`), 'success')
                        }
                    })
                }
            }

        }
    }
    _acceptOrderMold(item) {
        var r = confirm(`Bạn cón muốn xác nhận đúc đơn hàng ?`);
        if (r == true) {
            this.props.acceptStatusMold(item.IdOrder).then(res => {
                this.child._addNotification(I18n.t(`order.order_udpate_status`), 'success')
                this.props.getListDataOrderBySearch(this.refs.code_order && this.refs.code_order.value)
            })
        }
    }
    _onCreatebag(item) {
        this.props.push(Routes.bag.view + "?IdOrder=" + item.IdOrder)
    }
    closeModal() {
        this.props.onViewStone(false)
    }
    _onViewStone(item) {
        this.props.onViewStone(true)
        this.props.getListStoneByOrder(item)

    }
    _onDown() {
        let doc = new jsPDF('p', 'pt', 'a4');
        doc.addHTML(document.querySelector('#list_stone'), function() {
            doc.save('html.pdf');
        });
    }
    _onNext(obj) {
        this.props.getListDataOrder(obj.params)
    }
    _onPrevious(obj) {
        this.props.getListDataOrder(obj.params)
    }
    _onChangePage(obj) {
        this.props.getListDataOrderBySearch(this.refs.code_order && this.refs.code_order.value)
    }
    onClickButtonPermission(obj) {
        let { data, nameBtn } = obj
        let { item, checked, typePrint, status } = data
        switch (nameBtn) {
            case 'EDIT':
                this._EditOrder(item)
                this.props.updateButtonToolbar('EDIT')
                this.props.clickCheckRowOrder(item, checked)
                break;
            case 'DETAIL':
                this.props.clickCheckRowOrder(item, checked)
                break;
            case 'PRINT':
                this.props.printOrderDetail(item, typePrint)
                break;
            case 'CANCEL_ORDER':
                this._acceptOrder(item, status)
            case 'ACCEPT_ORDER':
                this._acceptOrder(item, status)
                break;
            case 'PRICE_ORDER':
                this._updatePriceOrder(item)
                break;

            default:
                break
        }
    }
    render() {
        let { list_data, allChecked, listHeaderTableOrder, listHeaderTableOrderMold, page, isShowStone } = this.props.order
        return (
            <div>
                <AlertCustom onRef={ref => (this.child = ref)} />
                <Modal
                    isOpen={isShowStone}
                    // onRequestClose={() => this.closeModal()}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <ListStone />
                    <hr />
                    <div style={{ "textAlign": "right" }}>
                        <button onClick={() => this._onDown()} >In đá</button>
                        <button onClick={() => this.closeModal()}>Đóng</button>
                    </div>
                </Modal>
                <div className="form__personnal">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="form-group ">
                                <div className="left">
                                    <label htmlFor="name">Mã đơn hàng</label>
                                </div>
                                <div className="right">
                                    <input className="name form-control"
                                        value={this.state.code}
                                        onChange={(e) => this._handleInput(e)}
                                        type="text"
                                        ref="code_order"
                                        id="code_order"
                                        name="code_order" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="form-group">
                                <div className="left" onClick={() => this._onSearch()}>
                                    <button className="btn btn-primary">Tìm kiếm</button>
                                    {/* <button style={{ "marginLeft": "10px" }} className="btn btn-primary" onClick={() => this._onPrint()}>In đơn hàng</button> */}
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
                                listHeaderTableOrder.map((item, i) => {
                                    let { key, title } = item
                                    return (
                                        <th style={{ "textAlign": "left" }} key={`thead_${key}`} scope="col">{title}</th>
                                    )
                                })

                            }
                        </tr>
                    </thead>
                    <tbody>
                        {list_data && list_data.map((item, i) => {
                            let { IdOrder, IdCustomer, DayMake, checked,
                                StatusOrderName, StatusOrderBagName, StatusOrderTransferName, ProductsEachBag, StatusMoldName,TotalBags,DPCode,GCode } = item
                            return (
                                <tr key={`data_${IdOrder}`} onDoubleClick={() => this._onClickRowDouble(item, !checked)}>
                                    <th scope="row">
                                        <label>
                                            <input type="checkbox" checked={checked} onChange={() => this._onClickRow(item, !checked)} />
                                        </label>
                                    </th>
                                    <td>{IdOrder}</td>
                                    <td>{GCode}</td>
                                    
                                    <td>{moment.utc(DayMake).format('DD/MM/YYYY HH:mm:ss')}</td>
                                    <td>{StatusOrderName || 'Chờ xác nhận'}</td>
                                    <td>{StatusOrderBagName || 'Chưa khởi tạo'}</td>
                                    <td>{StatusMoldName || 'Chưa khởi tạo'}</td>
                                    <td>{StatusOrderTransferName || 'Chưa khởi tạo'}</td>
                                    <ButtonPermission type="ACCEPT_ORDER" key="ACCEPT_ORDER" nameBtn="ACCEPT_ORDER" icon={`fa fa-check`} data={{ item: item, status: 'STATUS_ORDER_02' }} parentObject={this} />
                                    <ButtonPermission type="CANCEL_ORDER" key="CANCEL_ORDER" nameBtn="CANCEL_ORDER" icon={`fa fa-ban`} data={{ item: item, status: 'STATUS_ORDER_03' }} parentObject={this} />
                                    <ButtonPermission type="EDIT" key="EDIT" nameBtn="EDIT" icon={`fa fa-pencil-square-o`} data={{ item: item, checked: checked ? checked : !checked }} parentObject={this} />
                                     
                                    <ButtonPermission type="PRICE_ORDER" key="PRICE_ORDER" nameBtn="PRICE_ORDER" icon={`fa fa-usd`} data={{ item: item }} parentObject={this} />
                                    <td>{TotalBags}</td>
                                    <ButtonPermission key="PRINT1" type="PRINT1" nameBtn="PRINT" icon={`fa fa-print`} data={{ item: item, typePrint: "type1" }} parentObject={this} />
                                    <ButtonPermission key="PRINT2" type="PRINT2" nameBtn="PRINT" icon={`fa fa-print`} data={{ item: item, typePrint: "type2" }} parentObject={this} />

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
    common,
    routing
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        order,
        header,
        common,
        routing
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...userActions,
        ...orderActions,
        ...toolbarActions,
        ...commonActions,
        getListDataBaoGia,
        getListTypeByListCode
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListProductFormView)