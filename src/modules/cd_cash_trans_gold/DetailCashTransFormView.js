
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TabProduct from './TabProduct'
import ComboboxByTable from '../common/ComboboxByTable'
import * as cachTransActions from 'modules/cd_cash_trans_gold/actions/form'
import ComboboxCustomer from './ComboboxCustomer'
import ComboboxOutput from './ComboboxOutput'
import { default as NumberFormat } from "react-number-format";
import ComboboxSale from './ComboboxSale'

class DetailCashTransFormView extends React.Component {
    constructor() {
        super()
    }
    ChangeValueCombobox(obj) {
        let { id, value } = obj
        let { objData } = this.props.cd_cash_trans_gold
        let objDataTemp = _.clone(objData, true)
        objDataTemp[id] = value
        this.props.updateInputItemCash(objDataTemp)
        this.props.updateCustomerSakura(value)

    }
    _onChange(e) {
        let { id, value } = e.target
        let { objData } = this.props.cd_cash_trans_gold
        let objDataTemp = _.clone(objData, true)
        objDataTemp[id] = value
        this.props.updateInputItemCash(objDataTemp)
    }
    handleChangeDate(date) {
        let { objData } = this.props.cd_cash_trans_gold
        let objDataTemp = _.clone(objData, true)
        objDataTemp["DayMake"] = date
        this.props.updateInputItemCash(objDataTemp)
    }
    ChangeValueComboboxByTable(obj) {
    }
    componentWillUnmount() {
        this.props.resetDataCastingProc()
    }
    _splitDecimal(value, type) {
        let string = value;
        let stringFirts = string.split(".")[0];
        let stringLast = string.split(".")[1];
        let result = string;
        if (stringLast) {
            if (type == 'WeightGold') {
                stringLast = stringLast.substring(0, 1);
                result = stringFirts + "." + stringLast;
            } else {
                stringLast = stringLast.substring(0, 0);
                result = stringFirts
                result = result.replace('.', '')
            }
        }
        return result;
    }
    _changeMoneyPayment(value, key) {
        let { objData } = this.props.cd_cash_trans_gold
        let objDataTemp = _.clone(objData, true)
        let { WeightGold, Exchange } = objDataTemp
        let valueTemp = value.replace(/\,/g, '');
        switch (key) {
            case "WeightGold":
                if (Exchange >= 0) {
                    objDataTemp["PaymentAmount"] = (valueTemp / 100) * Exchange
                }
                break;
            case "Exchange":
                if (WeightGold >= 0) {
                    objDataTemp["PaymentAmount"] = valueTemp * (WeightGold / 100)
                }
                break;
            default:
                break;
        }
        objDataTemp[key] = valueTemp;
        this.props.updateInputItemCash(objDataTemp)

    }
    componentDidMount() {
        $('input[type=text]').addClass('form-control');
        let { Status } = this.props.cd_cash_trans_gold.objData
        $('#PaymentAmount input').attr('readonly', true);
    }
    render() {
        let { IdTicket
            , TicketType
            , TransType
            , IdCustomer
            , Beneficiary
            , CodeTicket
            , IdRef
            , IdOutput
            , Output_Amount
            , Output_Weight
            , Output_Weight_10
            , Status
            , DayMake
            , DayConfirm
            , DayFinish
            , Payment_Type
            , PaymentAmount
            , Receiver
            , Remaining_Debt
            , Due_Date
            , Notes
            , confirm_date
            , confirm_by
            , created_date
            , created_by
            , update_date
            , update_by
            , delete_date
            , delete_by,
            SaleMan,
            SaleManName
            , WeightGold
            , Exchange
            , nameCustomer } = this.props.cd_cash_trans_gold.objData
        let { list_user, objConfig, listCustomer, listOutput } = this.props.cd_cash_trans_gold
        let { list_config_process } = this.props.header
        let parseData = []
        list_config_process.map(itemn => {
            parseData.push({ id: itemn.Code, code: itemn.Code, name: itemn.Name, type_code: "CodeProcess" })
        })
        let { IsGoldTypeRequest } = objConfig
        let blockInput = false
        if (Status == 'STATUS_TRANS_02') {
            blockInput = true
        }
        let { status: StatusToolBar } = this.props.toolbar
        return (
            <div className="main__content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="main__content__right">
                            <div className="form__personnal">
                                <AlertCustom onRef={ref => (this.child = ref)} />
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <div className="left">
                                                <label htmlFor="name">Số phiếu</label>
                                            </div>
                                            <div className="right" >
                                                <input readOnly="true" className="name form-control" value={CodeTicket} onChange={(e) => this._onChange(e)} type="text"
                                                    id="CodeTicket" name="CodeTicket" required="" />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <div className="left">
                                                <label htmlFor="name">Số PX</label>
                                            </div>
                                            <div className="right" >
                                                <ComboboxOutput value={{ value: IdOutput, label: IdOutput, name: IdOutput }} list_data={listOutput} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <div className="left">
                                                <label htmlFor="dateofbirth">Ngày tạo</label>
                                            </div>
                                            <div className="right">
                                                {/* <input type="date" name="dateofbirth" id="DayMake" /> */}
                                                <DatePicker
                                                    dateFormat="DD/MM/YYYY"
                                                    selected={DayMake} onChange={(e) => this.handleChangeDate(e)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <div className="left">
                                                <label htmlFor="name">Hình thức</label>
                                            </div>
                                            <div className="right" >
                                                <Combobox disable={StatusToolBar == 'ADD' ? false : true} type_code='PAYMENT_CASH_GOLD' value={Payment_Type} id='Payment_Type' parentObject={this} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <div className="left">
                                                <label htmlFor="name">Mã KH</label>
                                            </div>
                                            <div className="right" >
                                                <ComboboxCustomer disable={blockInput} value={{ value: IdCustomer, label: IdCustomer, name: nameCustomer }} list_data={listCustomer} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <div className="left">
                                                <label htmlFor="dateofbirth">Tên KH</label>
                                            </div>
                                            <div className="right" >
                                                <input readOnly="true" className="name form-control" value={nameCustomer} onChange={(e) => this._onChange(e)} type="text"
                                                    id="nameCustomer" name="nameCustomer" required="" />
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>

                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <div className="left">
                                                <label htmlFor="name">Trọng lượng vàng (ly)</label>
                                            </div>
                                            <div className="right" id="WeightGold" >
                                                <NumberFormat
                                                    value={WeightGold || ''}
                                                    thousandSeparator={true}
                                                    prefix={""}
                                                    onValueChange={values => {
                                                        const { formattedValue, value } = values;
                                                        this._changeMoneyPayment(this._splitDecimal(formattedValue, 'WeightGold'), 'WeightGold')
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <div className="left">
                                                <label htmlFor="dateofbirth">Tỷ giá (chỉ)</label>
                                            </div>
                                            <div className="right" >
                                                <NumberFormat
                                                    value={Exchange || ''}
                                                    thousandSeparator={true}
                                                    prefix={""}
                                                    onValueChange={values => {
                                                        const { formattedValue, value } = values;
                                                        this._changeMoneyPayment(this._splitDecimal(formattedValue), 'Exchange')
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <div className="left">
                                                <label htmlFor="name">Số tiền</label>
                                            </div>
                                            <div className="right" id="PaymentAmount" >
                                                <NumberFormat
                                                    value={PaymentAmount || ''}
                                                    thousandSeparator={true}
                                                    prefix={""}
                                                    onValueChange={values => {
                                                        const { formattedValue, value } = values;
                                                        this._changeMoneyPayment(this._splitDecimal(formattedValue), 'PaymentAmount')
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <div className="left">
                                                <label htmlFor="name">Sale thu tiền</label>
                                            </div>
                                            <div className="right" >
                                                <ComboboxSale value={{ value: SaleMan, label: SaleManName, name: SaleManName }} list_data={list_user} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <div className="left">
                                                <label htmlFor="dateofbirth">Còn nợ</label>
                                            </div>
                                            <div className="right" >
                                                <NumberFormat
                                                    value={Remaining_Debt || ''}
                                                    thousandSeparator={true}
                                                    prefix={""}
                                                    onValueChange={values => {
                                                        const { formattedValue, value } = values;
                                                        this._changeMoneyPayment(this._splitDecimal(formattedValue), 'Remaining_Debt')
                                                    }}
                                                />
                                                {/* <input className="name form-control" value={Remaining_Debt} onChange={(e) => this._onChange(e)} type="number"
                                                    id="Remaining_Debt" name="Remaining_Debt" required="" /> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <div style={{ width: "13%" }}>
                                                <label htmlFor="name">Ghi chú</label>
                                            </div>
                                            <div style={{ width: "87%" }}>
                                                <input className="name form-control" value={Notes} onChange={(e) => this._onChange(e)} type="text"
                                                    id="Notes" name="Notes" required="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <div style={{ width: "100%" }}>
                                                <TabProduct key={'order'} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
    list,
    toolbar,
    cd_cash_trans_gold,
    header
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        toolbar,
        cd_cash_trans_gold,
        header
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...cachTransActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(DetailCashTransFormView)

