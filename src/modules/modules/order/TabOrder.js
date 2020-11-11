import * as orderActions from 'modules/order/actions/form'
import ComboboxCustomer from './ComboboxCustomer'
import TabProduct from './TabProduct';
import TabBag from './TabBag';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { I18n } from 'react-redux-i18n';
import ComboboxMultipleByCustomer from './ComboboxMultipleByCustomer';


class ComboboxMultipleByCustomerByOrder extends React.Component {
    constructor() {
        super()
        this.state = {
            startDate: moment()
        };
    }
    ChangeValueCombobox(obj) {
        let { id, value } = obj
        let { objDataOrder } = this.props.order
        objDataOrder[id] = value
        this.props.updateInputItem(objDataOrder)
    }
    _onChange(e) {
        let { id, value } = e.target
        let { objDataOrder } = this.props.order
        objDataOrder[id] = value
        this.props.updateInputItem(objDataOrder)
    }
    componentDidMount() {
        this.props.getListCustomer().then(() => {
            this.props.getListBagByOrder()
        })
        let { DayMake } = this.props.order.objDataOrder
        this.setState({
            startDate: moment(DayMake)
        });

        $(".allownumericwithdecimal").on("keypress keyup blur", function (event) {
            //this.value = this.value.replace(/[^0-9\.]/g,'');
            $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
            if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });
    }
    handleChange(date) {
        this.setState({
            startDate: date
        });
        let { objDataOrder } = this.props.order
        objDataOrder["DayMake"] = date.format('YYYY-MM-DD HH:mm:ss')
        this.props.updateInputItem(objDataOrder)
    }

    _acceptOrder(status) {
        let { objDataOrder, listProductsSelected } = this.props.order
        if (objDataOrder.IdOrder && listProductsSelected.length == 0) {
            this.child._addNotification(I18n.t(`order.not_exists_products`), 'warning')
        }
        else if (objDataOrder.StatusOrder == 'STATUS_ORDER_02' && status == 'STATUS_ORDER_02') {
            this.child._addNotification(I18n.t(`order.order_accept`), 'warning')
        }
        else if (objDataOrder.StatusOrder == 'STATUS_ORDER_03') {
            this.child._addNotification(I18n.t(`order.order_cancel`), 'warning')
        }
        else if (!objDataOrder.IdOrder) {
            this.child._addNotification(I18n.t(`order.order_not_exists`), 'warning')
        } else {
            this.props.acceptOrder(objDataOrder.IdOrder, status).then(res => {
                let { data } = res.data
                if (data.value == 2) {
                    this.child._addNotification(I18n.t(`order.order_not_exists`), 'warning')
                }
                else if (data.value == 3) {
                    this.child._addNotification(I18n.t(`order.created_bag`), 'warning')
                }
                else {
                    this.child._addNotification(I18n.t(`order.order_udpate_status`), 'success')
                }
            })
        }
    }
    ChangeValueComboboxMulti(obj) {
        let { key, data, keyValue } = obj
        let { objDataOrder } = this.props.order
        let { valueParams, value } = data || {}

        objDataOrder[key] = value
        objDataOrder[keyValue] = valueParams

        if (keyValue == 'CodeBaoGia') {
            objDataOrder['CodeBaoGia'] = value
            this.props.getListProductsByPrice(value)
        }
        this.props.updateInputItem(objDataOrder)

    }
    updateComboDynamic(obj) {
        this.props.updateDynamicCombobox(obj.type, obj.value, obj.valueParams)
        let { list_products_by_baogia } = this.props.order
    }
    _onPrintbag() {
        let { listBagSelected } = this.props.order
        let listId = ''
        listBagSelected.map((item) => {
            if (item.checked) {
                listId = listId + item.IdBag + ','
            }
        })

        if (!listId) {
            alert('Vui lòng chọn dòng cần in!')
            return
        }
        let pr = '?idbag=' + listId
        window.open(Routes.bagDetail.view + pr, 'header', "width=1248,height=700", true)

    }
    _parseDataComboBaoGia(data) {
        let arr_data = []
        data.map((item) => {
            let { Pricename, Pricecode } = item
            arr_data.push({ value: Pricecode, label: Pricename, name: Pricename })

        })
        return arr_data;
    }
    render() {
        let { listCustomer, namecustomer, list_data_baogia } = this.props.order
        let { IdOrder
            , IdCustomer
            , Deadline
            , StartWeek
            , FinishWeek
            , TotalFinish
            , TotalBags
            , IdCreater
            , DayMake
            , Status
            , Remark
            , CodeLd
            , StatusOrder
            , StatusBag
            , StatusTransfer
            , CodeKH
            , NameKH
            , CodeLH
            , CodeLV
            , CodeMX
            , CodeLAI
            , CodeBaoGia,
            discount
        } = this.props.order.objDataOrder
        let { status } = this.props.toolbar
        let list_data_baogia_parse = this._parseDataComboBaoGia(list_data_baogia)
        return (
            <div className="form__personnal">
                <AlertCustom onRef={ref => (this.child = ref)} />
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Mã đơn hàng</label>
                            </div>
                            <div className="right" >
                                <input readOnly={true} className="name form-control" value={IdOrder} onChange={(e) => this._onChange(e)} type="text" id="IdOrder" name="name" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="dateofbirth">Ngày nhập đơn hàng</label>
                            </div>
                            <div className="right">
                                {/* <input type="date" name="dateofbirth" id="DayMake" /> */}
                                <DatePicker
                                    dateFormat="DD/MM/YYYY"
                                    selected={this.state.startDate} onChange={(e) => this.handleChange(e)} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="dateofbirth">Loại đơn</label>
                            </div>
                            <div className="right">
                                <Combobox type_code='LD' id='CodeLd' value={CodeLd} parentObject={this} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Trạng thái đơn hàng</label>
                            </div>
                            <div className="right">
                                <Combobox disable={true} type_code='STATUS_ORDER' id='StatusOrder' value={StatusOrder} parentObject={this} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Mã khách hàng</label>
                            </div>
                            <div className="right">
                                <ComboboxCustomer disable={status == 'ADD' ? false : true} value={{ value: CodeKH, label: CodeKH, name: NameKH }} list_data={listCustomer} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Tên khách hàng</label>
                            </div>
                            <div className="right">
                                <input className="name form-control" value={NameKH} type="text" id="NameKH" name="NameKH" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Discount</label>
                            </div>
                            <div className="right">
                                <label htmlFor="name">{discount}%</label>                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Bảng giá</label>
                            </div>
                            <div className="right">
                                <ComboboxMultipleByCustomer disable={status == 'ADD' ? false : true} comboOther={"CodeBaoGia"} list_data_other={list_data_baogia_parse} id='CodeBaoGia' value={CodeBaoGia} keyValue='CodeBaoGia' Customer={CodeKH} value={CodeBaoGia} parentObject={this} />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Loại vàng</label>
                            </div>
                            <div className="right">
                                <ComboboxMultipleByCustomer keyValue='ValueLV' Customer={CodeKH} type_code='LV' id='CodeLV' value={CodeLV} parentObject={this} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Loại hội</label>
                            </div>
                            <div className="right">
                                <ComboboxMultipleByCustomer keyValue='ValueLH' Customer={CodeKH} type_code='LH' id='CodeLH' value={CodeLH} parentObject={this} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Màu xi</label>
                            </div>
                            <div className="right">
                                <ComboboxMultipleByCustomer keyValue='ValueMX' Customer={CodeKH} type_code='MX' id='CodeMX' value={CodeMX} parentObject={this} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Lai</label>
                            </div>
                            <div className="right">
                                <ComboboxMultipleByCustomer keyValue='ValueLAI' Customer={CodeKH} type_code='L' id='CodeLAI' value={CodeLAI} parentObject={this} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Trạng thái bag</label>
                            </div>
                            <div className="right">
                                <Combobox disable={true} type_code='ORDER_BAG_STATUS' id='StatusBag' value={StatusBag} parentObject={this} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Trạng thái giao hàng</label>
                            </div>
                            <div className="right">
                                <Combobox disable={true} type_code='STATUS_TRANSFER' id='StatusTransfer' value={StatusTransfer} parentObject={this} />
                            </div>
                        </div>
                    </div>

                </div>
              */}
                {/* <hr /> */}
                <div className="row">
                    <div className="col-md-12">
                        {/* <div className="left">
                            <label htmlFor="name">Danh sách sản phẩm</label>
                        </div> */}
                        <div className="form-group">
                            <div style={{ width: "100%" }}>
                                <TabProduct key={'order'} />
                            </div>
                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <div className="left">
                                <button onClick={() => this._onPrintbag()}>In Bag</button>
                            </div>
                            <div style={{ width: "100%" }}>
                                <TabBag key={'order'} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = ({
    userAuth,
    i18n,
    header,
    order,
    toolbar,
    baogia
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        header,
        order,
        toolbar,
        baogia
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...orderActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ComboboxMultipleByCustomerByOrder)