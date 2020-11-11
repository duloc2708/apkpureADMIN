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
    _onRowEdit(item, checked) {
        this._EditOrder(item)
        this.props.updateButtonToolbar('EDIT')
        this.props.clickCheckRowOrder(item, checked)
    }
    _onRowDetail(item, checked) {
        this.props.clickCheckRowOrder(item, checked)
    }
    _EditOrder(item) {
        this.props.isEditOrder(true)
        this.props.checkExistOutPutAndBag(item.IdOrder)

    }
    componentDidMount() {
        let { page, total } = this.props.common
        let params = {
            page: page,
            total: total
        }
        this.props.getListDataOrder(params).then(() => {
            this.props.getListDataBaoGiaInOrder({
                page: 1,
                total: 1000
            })
        })
        KeyboardJS.bind('enter', (event) => {
            if ($('#code_order').is(':focus')) {
                this._onSearch()
            }
        })
    }
    _onSearch() {
        this.props.getListDataBySearch(this.refs.code_order.value)
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
        }
        else if (item.StatusOrder == 'STATUS_ORDER_03') {
            this.child._addNotification(I18n.t(`order.order_cancel`), 'warning')
        } else {
            if (status == 'STATUS_ORDER_02') {
                var r = confirm(`Bạn cón muốn xác nhận đơn hàng ?`);
                if (r == true) {
                    this.props.acceptOrder(item.IdOrder, status).then(res => {
                        let { data } = res.data
                        if (data.value == 3) {
                            this.child._addNotification(`Đơn hàng đã tạo bag.`, 'warning')
                        }
                        else {
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
                        }
                        else {
                            this.child._addNotification(I18n.t(`order.order_udpate_status`), 'success')
                        }
                    })
                }
            }
     
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
        doc.addHTML(document.querySelector('#list_stone'), function () {
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
        this.props.getListDataOrder(obj.params)
    }
    render() {
        let { list_data, allChecked, listHeaderTableOrder, page, isShowStone } = this.props.order
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
                                StatusOrderName, StatusOrderBagName, StatusOrderTransferName, ProductsEachBag } = item
                            return (
                                <tr key={`data_${IdOrder}`} onDoubleClick={() => this._onClickRowDouble(item, !checked)}>
                                    <th scope="row">
                                        <label>
                                            <input type="checkbox" checked={checked} onChange={() => this._onClickRow(item, !checked)} />
                                        </label>
                                    </th>
                                    <td>{IdOrder}</td>
                                    <td>{IdCustomer}</td>
                                    <td>{moment(DayMake).format('DD/MM/YYYY HH:mm:ss')}</td>
                                    <td>{StatusOrderName || 'Chờ xác nhận'}</td>
                                    <td style={{ textAlign: "left" }}><button onClick={() => this._acceptOrder(item, 'STATUS_ORDER_02')}><i className="fa fa-check" aria-hidden="true"></i></button></td>
                                    <td style={{ textAlign: "left" }}><button onClick={() => this._acceptOrder(item, 'STATUS_ORDER_03')}><i className="fa fa-ban" aria-hidden="true"></i></button></td>
                                    <td><button onClick={() => this._onRowEdit(item, checked ? checked : !checked)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button></td>
                                    <td><button onClick={() => this._onRowDetail(item, checked ? checked : !checked)}><i className="fa fa-info-circle" aria-hidden="true"></i></button></td>
                                    <td>{ProductsEachBag}</td>
                                    <td><button onClick={() => this._onViewStone(item)}><i className="fa fa-cogs" aria-hidden="true"></i></button></td>
                                    <td><button onClick={() => this._onCreatebag(item)}><i className="fa fa-plus" aria-hidden="true"></i></button></td>
                                    <td onClick={() => this._onPrint(item, "type1")}><button><i className="fa fa-print" aria-hidden="true"></i></button></td>
                                    <td onClick={() => this._onPrint(item, "type2")}><button><i className="fa fa-print" aria-hidden="true"></i></button></td>

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
    common
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        order,
        header,
        common
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...userActions,
        ...orderActions,
        ...toolbarActions,
        ...commonActions,
        getListDataBaoGia
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListProductFormView)
