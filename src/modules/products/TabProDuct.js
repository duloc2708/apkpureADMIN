import ListProductSet from './ListProductSet'
import * as productsActions from 'modules/products/actions/form'
import { default as NumberFormat } from "react-number-format";

class TabProDuct extends React.Component {
    constructor() {
        super()
    }
    ChangeValueCombobox(obj) {
        let { id, value } = obj
        let { objData } = this.props.products
        let objDataNew = _.clone(objData, true)
        objDataNew[id] = value
        this.props.updateInputItem(objDataNew)
    }
    _onChange(e) {
        let { id, value } = e.target
        let { objData } = this.props.products
        let objDataNew = _.clone(objData, true)
        objDataNew[id] = value
        this.props.updateInputItem(objDataNew)
    }
    _changeOdd(value) {
        let { objData } = this.props.products
        let objDataNew = _.clone(objData, true)
        objDataNew["IdOdd"] = value
        if (value == 1) {
            objDataNew["Unit"] = 'PC'
        } else {
            objDataNew["Unit"] = 'GR'
        }
        this.props.updateInputItem(objDataNew)
    }
    _changeOddStatus(value) {
        let { objData } = this.props.products
        let objDataNew = _.clone(objData, true)
        objDataNew["Status"] = value
        this.props.updateInputItem(objDataNew)
    }
    componentDidMount() {
        $('input[type=text]').addClass('form-control');


        let { objData } = this.props.products
        if (objData && objData.CheckOrder && objData.CheckOrder != null) {
            $("input.checkbox_IdOdd").prop("disabled", true);
        } else {
            $("input.checkbox_IdOdd").prop("disabled", false);

        }
        $(".allownumericwithdecimal").on("keypress keyup blur", function (event) {
            //this.value = this.value.replace(/[^0-9\.]/g,'');
            $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
            if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });
        let { status } = this.props.toolbar
        if (status == 'ADD')
            this.props.getNumberAutoProducts()
    }
    onChangeProducts(e, value) {
        if (e.charCode == 13) {
            this.props.getDetailProduct(value)
            // this.props.getProductById(value)
        }
    }
    ChangeValueCell(obj){
        let { id, value } = obj
        let { objData } = this.props.products
        let objDataNew = _.clone(objData, true)
        objDataNew[id] = value
        this.props.updateInputItem(objDataNew)
    }
    handleClick(){

    }
     _splitDecimal(value) {
        let result = value;
        result = result.replace(/,/g, '')
        return result;
    }
    _changeMoneyPayment(value) {
        let { objData } = this.props.products
        let objDataNew = _.clone(objData, true)
        objDataNew['Price'] = value
        this.props.updateInputItem(objDataNew)
    }
    render() {
        let { IdProductSeach, Id, IdOdd, CodeMpm, CodeLv, CodeLh
            , Weight, Price, WeightReal, WeightProduct, Details, Tags, Public, Remark, Resin, CodeKc, Unit, IdNew, Name, Status,Casting_Notes } = this.props.products.objData
        let { status } = this.props.toolbar
        return (
            <div className="form__personnal">
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name"><i><u>Tìm sản phẩm</u></i></label>
                            </div>
                            <div className="right">
                                <input onKeyPress={(e) => this.onChangeProducts(e, IdProductSeach)} className="name form-control" value={IdProductSeach} onChange={(e) => this._onChange(e)} type="text" id="IdProductSeach" name="name" required="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="left" style={{ "paddingTop": "5px" }}>
                                <button onClick={() => this.props.getDetailProduct(IdProductSeach)}>Tìm kiếm</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Mã sản phẩm</label>
                            </div>
                            <div className="right">
                                <input className="name form-control" value={Id} onChange={(e) => this._onChange(e)} type="text" id="Id" name="name" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Bộ</label>
                            </div>
                            <div className="right">
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" ref="IdOdd" id="IdOdd" className="checkbox_IdOdd"
                                            defaultChecked={IdOdd == 1 ? true : false}
                                            onChange={() => this._changeOdd(IdOdd == 1 ? 0 : 1)}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Mã mới</label>
                            </div>
                            <div className="right">
                                <input className="name form-control" value={IdNew} onChange={(e) => this._onChange(e)} type="text" id="IdNew" name="name" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Tên sản phẩm</label>
                            </div>
                            <div className="right">
                                <input className="name form-control" value={Name} onChange={(e) => this._onChange(e)} type="text" id="Name" name="name" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                        </div>
                    </div>
                </div>
                {IdOdd == 1 ?
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <ListProductSet />
                            </div>
                        </div>
                    </div>
                    : ''}
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="dateofbirth">Chủng loại</label>
                            </div>
                            <div className="right">
                                <Combobox type_code='CLSP' value={CodeLh} id='CodeLh' parentObject={this} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="dateofbirth">Kích cỡ</label>
                            </div>
                            <div className="right">
                                <Combobox type_code='KC' value={CodeKc} id='CodeKc' parentObject={this} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="dateofbirth">Mã phối màu</label>
                            </div>
                            <div className="right">
                                <Combobox type_code='DSM' value={CodeMpm} id='CodeMpm' parentObject={this} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="dateofbirth">Loại vàng</label>
                            </div>
                            <div className="right">
                                <Combobox type_code='LV' value={CodeLv} id='CodeLv' parentObject={this} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Tl vàng</label>
                            </div>
                            <div className="right">
                                <Cell value={Helper.roundNumber(Weight,4)} keyInput="Weight" id={'Weight'} parentObject={this} />

                                {/* <input className="name form-control allownumericwithdecimal"
                                    value={Weight && Helper.roundNumber(Weight,4) }
                                    onChange={(e) => this._onChange(e)} type="text" id="Weight" name="name" required="" /> */}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Tl vàng thực tế</label>
                            </div>
                            <div className="right">
                                <input className="name form-control allownumericwithdecimal"
                                    readOnly={true} value={WeightReal || ''} onChange={(e) => this._onChange(e)} type="text" id="WeightReal" name="name" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Trọng lượng sản phẩm</label>
                            </div>
                            <div className="right">
                                <input className="name form-control allownumericwithdecimal"
                                    readOnly={true} value={WeightProduct || ''} onChange={(e) => this._onChange(e)} type="text" id="WeightProduct" name="name" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Giá bán cơ sở</label>
                            </div>
                            <div className="right">
                                  {/* <input className="name form-control allownumericwithdecimal"
                                    value={Price} 
                                    onChange={(e) => this._onChange(e)}
                                     type="text" id="Price" name="name" required="" /> */}
                                    <NumberFormat
                                        value={Price || ''}
                                        thousandSeparator={true}
                                        prefix={""}
                                        onValueChange={values => {
                                        const { formattedValue, value } = values;
                                        this._changeMoneyPayment(this._splitDecimal(formattedValue))
                                        }}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Resin</label>
                            </div>
                            <div className="right">
                                <input className="name form-control" value={Resin} onChange={(e) => this._onChange(e)} type="text" id="Resin" name="Resin" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Đơn vị tính</label>
                            </div>
                            <div className="right">
                                <Combobox type_code='UNIT' value={Unit} id='Unit' parentObject={this} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Tag</label>
                            </div>
                            <div className="right">
                                <input className="name form-control" value={Tags} onChange={(e) => this._onChange(e)} type="text" id="Tags" name="Tags" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Hoạt động</label>
                            </div>
                            <div className="right">
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" ref="Status"
                                            defaultChecked={Status == 0 ? true : false}
                                            onChange={() => this._changeOddStatus(Status == 0 ? 1 : 0)}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <div style={{ width: "20%" }}>
                                <label htmlFor="name">Ghi chú </label>
                            </div>
                            <div style={{ width: "80%" }}>
                                <textarea rows="3" style={{ width: "100%" }} className="name form-control" value={Remark || ''} onChange={(e) => this._onChange(e)} type="text" id="Remark" name="name" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <div style={{ width: "20%" }}>
                                <label htmlFor="name">Ghi chú Casting</label>
                            </div>
                            <div style={{ width: "80%" }}>
                                <textarea rows="3" style={{ width: "100%" }} className="name form-control" value={Casting_Notes || ''} onChange={(e) => this._onChange(e)} type="text" id="Casting_Notes" name="name" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
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
    toolbar,
    products,
    header
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        products,
        toolbar,
        header
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...productsActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TabProDuct)