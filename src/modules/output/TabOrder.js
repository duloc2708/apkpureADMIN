import * as outputActions from 'modules/output/actions/form'
import ComboboxCustomer from './ComboboxCustomer'
import TabProduct from './TabProduct';
import ListOrder from './ListOrder';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { I18n } from 'react-redux-i18n';

class TabOrder extends React.Component {
    constructor() {
        super()
        this.state = {
            startDate: moment()
        };
    }
    ChangeValueCombobox(obj) {
        let { id, value } = obj
        let { objDataOutput } = this.props.output
        objDataOutput[id] = value
        this.props.updateInputItem(objDataOutput)
    }
    ChangeValueComboboxMulti(obj) {
        let { key, data, keyValue } = obj
        let { objDataOutput } = this.props.output
        let objDataOutputTemp = _.clone(objDataOutput, true)
        objDataOutputTemp[key] = data
        this.props.updateInputItem(objDataOutputTemp)
    }
    _onChange(e) {
        let { id, value } = e.target
        let { objDataOutput } = this.props.output
        objDataOutput[id] = value
        this.props.updateInputItem(objDataOutput)
    }
    componentDidMount() {
        let { DayMake } = this.props.output.objDataOutput
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
        let { status } = this.props.toolbar
        if (status == 'ADD')
            this.props.getNumberAutoOutput()
    }
    handleChange(date) {
        this.setState({
            startDate: date
        });
        let { objDataOutput } = this.props.output
        objDataOutput["DayMake"] = date.format('YYYY-MM-DD HH:mm:ss')
        this.props.updateInputItem(objDataOutput)
    }
    _acceptOrder() {
        let { objDataOutput, listProductsSelected } = this.props.output
        if (objDataOutput.IdOrder && objDataOutput.StatusOrder != 'STATUS_ORDER_02' && listProductsSelected.length > 0) {
            this.props.acceptOrder(objDataOutput.IdOrder, 'STATUS_ORDER_02').then(res => {
                let { data } = res.data
                if (data == 2) {
                    alert(I18n.t(`order.order_not_exists`))
                } else {
                    alert(I18n.t(`order.order_accept_success`))
                }
            })
        }
        else if (objDataOutput.IdOrder && listProductsSelected.length == 0) {
            alert(I18n.t(`order.not_exists_products`))
        }
        else if (objDataOutput.StatusOrder == 'STATUS_ORDER_02') {
            alert(I18n.t(`order.order_accept`))
        }
        else {
            alert(I18n.t(`order.order_not_exists`))
        }
    }
    render() {
        let { listCustomer, namecustomer } = this.props.output
        let { IdOrder
            , IdOutput
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
            , CodeLv
            , StatusOrder
            , StatusBag
            , StatusTransfer
            , CodeKH
            , NameKH
        } = this.props.output.objDataOutput
        let { list_worker } = this.props.output
        return (
            <div className="form__personnal">
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Mã xuất hàng</label>
                            </div>
                            <div className="right" >
                                <input readOnly={true} className="name form-control" value={IdOutput} onChange={(e) => this._onChange(e)} type="text" id="IdOutput" name="name" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="dateofbirth">Ngày xuất hàng</label>
                            </div>
                            <div className="right">
                                {/* <input type="date" name="dateofbirth" id="DayMake" /> */}
                                <DatePicker
                                    dateFormat="DD/MM/YYYY"
                                    selected={this.state.startDate} onChange={(e) => this.handleChange(e)} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Trạng thái xuất hàng</label>
                            </div>
                            <div className="right">
                                <Combobox disable={true} type_code='STATUS_ORDER' id='StatusOrder' value={StatusOrder} parentObject={this} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {list_worker.length > 0 ?
                        ''
                        // <div className="col-md-4">
                        //     <div className="form-group">
                        //         <div className="left">
                        //             <label htmlFor="name">Worker</label>
                        //         </div>
                        //         <div className="right">
                        //             <ComboboxMultiple typeCombo={'single'} list_data_other={list_worker} type_code='saleman' id='saleman' value={saleman} parentObject={this} />
                        //             {/* <Combobox type_code='Worker' data_order={list_worker} value={Worker} id='Worker' parentObject={this} /> */}
                        //         </div>
                        //     </div>
                        // </div>
                        : ''}
                    <div className="col-md-12">
                        <div className="form-group">
                            <div style={{ width: "12%" }}>
                                <label htmlFor="name">Ghi chú </label>
                            </div>
                            <div style={{ width: "88%" }}>
                                <textarea rows="1" style={{ width: "100%" }} className="name form-control" value={Remark || ''} onChange={(e) => this._onChange(e)} type="text" id="Remark" name="name" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Mã khách hàng</label>
                            </div>
                            <div className="right">
                                <ComboboxCustomer value={{ value: CodeKH, label: CodeKH, name: NameKH }} list_data={listCustomer} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Tên khách hàng</label>
                            </div>
                            <div className="right">
                                <input className="name form-control" value={namecustomer} type="text" id="namecustomer" name="namecustomer" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Địa chỉ</label>
                            </div>
                            <div className="right">
                                <input className="name form-control" value={namecustomer} type="text" id="Lv" name="namecustomer" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="row">
                    <ListOrder key={'order'} />

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
    output
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        header,
        order,
        toolbar,
        output
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...outputActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TabOrder)