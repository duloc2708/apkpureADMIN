
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TabProduct from './TabProduct'
import TabListGold from './TabListGold'
import ComboboxByTable from '../common/ComboboxByTable'
import * as goldTransActions from 'modules/cd_gold_trans/actions/form'
import ComboboxCustomer from './ComboboxCustomer'
import ComboboxOutput from './ComboboxOutput'
import ComboboxSale from './ComboboxSale'
import { default as NumberFormat } from "react-number-format";

class DetailGoldTransFormView extends React.Component {
    constructor() {
        super()
    }
    ChangeValueCombobox(obj) {
        let { id, value } = obj
        let { objData } = this.props.cd_gold_trans
        let objDataTemp = _.clone(objData, true)
        objDataTemp[id] = value
        this.props.updateInputItemCasting(objDataTemp)
    }
    _onChange(e) {
        let { id, value } = e.target
        let { objData } = this.props.cd_gold_trans
        let objDataTemp = _.clone(objData, true)
        objDataTemp[id] = value
        this.props.updateInputItemCasting(objDataTemp)
    }
    handleChangeDate(date) {
        let { objData } = this.props.cd_gold_trans
        let objDataTemp = _.clone(objData, true)
        objDataTemp["ValueDate"] = date
        this.props.updateInputItemCasting(objDataTemp)
    }
    ChangeValueComboboxByTable(obj) {
    }
    componentWillUnmount() {
        this.props.resetDataCastingProc()
    }
    componentDidMount() {
        $('input[type=text]').addClass('form-control');
        let { Status } = this.props.cd_gold_trans.objData
        if (Status == 'STATUS_TRANS_02') {
            $('#Remaining_Debt input').attr('readonly', true);
        }
    }
    _changeMoneyPayment(value, key) {
        let { objData } = this.props.cd_gold_trans
        let objDataTemp = _.clone(objData, true)

        objDataTemp[key] = value.replace(/\,/g, '');
        this.props.updateInputItemCasting(objDataTemp)
    }
    _splitDecimal(value) {
        let string = value;
        let stringFirts = string.split(".")[0];
        let stringLast = string.split(".")[1];
        let result = string;
        if (stringLast) {
            stringLast = stringLast.substring(0, 1);
            result = stringFirts + "." + stringLast;
        }
        return result;
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
            , PaymentWeight_T
            , PaymentWeight_Real_T
            , PaymentWeight10_T
            , PaymentWeight10_Real_T
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
            , delete_by
            , IsDeleted
            , transTypeName
            , statusTransName,
            SaleMan,
            SaleManName,
            nameCustomer } = this.props.cd_gold_trans.objData
        let { list_worker, objConfig, listCustomer, listOutput, list_user } = this.props.cd_gold_trans
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
                                                <input readOnly={true} className="name form-control" value={CodeTicket} onChange={(e) => this._onChange(e)} type="text"
                                                    id="CodeTicket" name="CodeTicket" required="" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <div className="left">
                                                <label htmlFor="name">Còn nợ vàng (li)</label>
                                            </div>
                                            <div className="right" id="Remaining_Debt" >
                                                <NumberFormat
                                                    value={Remaining_Debt || ''}
                                                    thousandSeparator={true}
                                                    prefix={""}
                                                    onValueChange={values => {
                                                        const { formattedValue, value } = values;
                                                        this._changeMoneyPayment(this._splitDecimal(formattedValue), 'Remaining_Debt')
                                                    }}
                                                />
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
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <div className="left">
                                                <label htmlFor="name">Sale thu vàng</label>
                                            </div>
                                            <div className="right" >
                                                <ComboboxSale value={{ value: SaleMan, label: SaleManName, name: SaleManName }} list_data={list_user} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
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
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <div style={{ width: "20%" }}>
                                                <label htmlFor="name">Ghi chú</label>
                                            </div>
                                            <div style={{ width: "80%" }}>
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
                                                <TabListGold key={'gold'} />
                                            </div>
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
    cd_gold_trans,
    header
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        toolbar,
        cd_gold_trans,
        header
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...goldTransActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(DetailGoldTransFormView)

