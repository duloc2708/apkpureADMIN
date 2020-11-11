import * as userActions from 'modules/login/actions/form'
import * as toolbarActions from 'modules/toolbar/actions/form'
import * as orderActions from 'modules/order/actions/form'
import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import * as bagActions from 'modules/bag/actions/form'
import * as commonActions from 'modules/common/actions/form'
import DetailFormView from './DetailFormView'
import ListStone from '../order/ListStone'
import Modal from 'react-modal';
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
class ListOrder extends React.Component {
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
    _onClickRow(IdOrder, checked) {
        this.props.clickCheckRowOrderInBag(IdOrder, checked)
    }
    _onRowEdit(item, checked) {
        this.props.isEditOrder(true)
        this.props.updateButtonToolbar('EDIT')
        this.props.clickCheckRowOrder(item, checked)
    }
    _onRowDetail(item, checked) {
        this.props.clickCheckRowOrder(item, checked)
        this.props.isEditOrder(true)
    }
    componentDidMount() {
        this.props.getListDataOrderInBagBySearch('')
        KeyboardJS.bind('enter', (event) => {
            if ($('#code_in_bag').is(':focus')) {
                this._onSearch()
            }
        })
    }
    _onSearch() {
        this.props.resetInfoPage().then(() => {
            this.props.getListDataOrderInBagBySearch(this.refs.code_in_bag && this.refs.code_in_bag.value || '')
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

    _onPrint() {
        let { itemDetail } = this.props.order
        if (itemDetail.IdOrder) {
            this.props.printOrderDetail()
        } else {
            this.child._addNotification(I18n.t('Vui lòng chọn đơn hàng.'), 'warning')
        }
    }
    _acceptOrder(item, status) {
        if (item.StatusOrder == 'STATUS_ORDER_02' && status == 'STATUS_ORDER_02') {
            this.child._addNotification(I18n.t('order.order_accept'), 'warning')
        }
        else if (item.StatusOrder == 'STATUS_ORDER_03') {
            this.child._addNotification(I18n.t('order.order_cancel'), 'warning')
        } else {
            this.props.acceptOrder(item.IdOrder, status).then(res => {
                let { data } = res.data
                if (data.value == 3) {
                    this.child._addNotification(I18n.t('order.created_bag'), 'warning')
                }
                else {
                    this.child._addNotification(I18n.t('order.order_udpate_status'), 'success')
                }
            })
        }
    }
    _onCreatebag(item) {
        this.props.push(Routes.bag.view + "?idBag=" + item.IdOrder)
    }
    _onViewStone(item) {

        this.props.onViewStone(true)
        this.props.getListStoneByOrder(item)

    }
    closeModal() {
        this.props.onViewStone(false)
    }
    _onDown() {
        let doc = new jsPDF('p', 'pt', 'a4');
        doc.addHTML(document.querySelector('#list_stone'), function () {
            doc.save('html.pdf');
        });
    }
    _onNext(obj) {
        this.props.getListDataOrderInBag(obj.params)
    }
    _onPrevious(obj) {
        this.props.getListDataOrderInBag(obj.params)
    }
    _onChangePage(obj) {
        this.props.getListDataOrderInBagBySearch(this.refs.code_in_bag && this.refs.code_in_bag.value || '')
    }
    render() {
        let { listHeaderTableOrder, page, list_order_in_bag, allChecked } = this.props.bag
        let { isShowStone } = this.props.order

        return (
            <div className="col-md-6">
                <AlertCustom onRef={ref => (this.child = ref)} />
                <Modal
                    isOpen={isShowStone}
                    // onRequestClose={() => this.closeModal()}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <ListStone />
                    {/* <hr /> */}
                    <div style={{ "textAlign": "right" }}>
                        <button onClick={() => this._onDown()} >In đá</button>
                        <button onClick={() => this.closeModal()}>Đóng</button>
                    </div>
                </Modal>
                <div className="row">
                    <div className="col-md-8">
                        <div className="form-group ">
                            <div className="left">
                                <label htmlFor="name">Mã đơn hàng/ Loại đơn/ Ngày</label>
                            </div>
                            <div className="right">
                                <input className="name form-control"
                                    value={this.state.code}
                                    onChange={(e) => this._handleInput(e)}
                                    type="text"
                                    ref="code_in_bag"
                                    id="code_in_bag"
                                    name="code_in_bag" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="left" onClick={() => this._onSearch()}>
                                <button className="btn btn-primary">Tìm kiếm</button>
                            </div>
                        </div>
                    </div>

                </div>
                <table className="table table-striped" style={{ height: "500px" }}>
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
                        {list_order_in_bag && list_order_in_bag.map((item, i) => {
                            let { IdOrder, IdCustomer, DayMake, checked, TypeOrder,
                                StatusOrderName, StatusOrderBagName, StatusOrderTransferName, ProductsEachBag } = item
                            return (
                                <tr key={`data_${IdOrder}`} onClick={() => this._onClickRow(item, !checked)}>
                                    <th scope="row">
                                        <label>
                                            <input type="checkbox" checked={checked} />
                                        </label>
                                    </th>
                                    <td>{IdOrder}</td>
                                    <td>{IdCustomer}</td>
                                    <td>{moment(DayMake).format('DD/MM/YYYY')}</td>
                                    <td>{TypeOrder}</td>
                                    <td>{ProductsEachBag}</td>
                                    <td><button onClick={() => this._onViewStone(item)}><i className="fa fa-cogs" aria-hidden="true"></i></button></td>
                                </tr>)


                        })}
                    </tbody>
                </table>
                <PagingTable type="bag" parentObject={this} />

            </div>

        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    order,
    header,
    bag,
    common
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        order,
        header,
        bag,
        common
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...userActions,
        ...orderActions,
        ...bagActions,
        ...toolbarActions,
        ...commonActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListOrder)
