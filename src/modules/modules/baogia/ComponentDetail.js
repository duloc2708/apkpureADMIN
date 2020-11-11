import * as baogiaActions from 'modules/baogia/actions/form'
import ListOrder from './ListOrder';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { I18n } from 'react-redux-i18n';

class TabOrder extends React.Component {
    constructor() {
        super()
        this.state = {
            Updatedate: moment()
        };
    }
    ChangeValueCombobox(obj) {
        let { id, value } = obj
        let { objDataBaoGia } = this.props.baogia
        objDataBaoGia[id] = value
        this.props.updateInputItem(objDataBaoGia)
    }
    _onChange(e) {
        let { id, value } = e.target
        let { objDataBaoGia } = this.props.baogia
        objDataBaoGia[id] = value
        this.props.updateInputItem(objDataBaoGia)
    }
    componentDidMount() {
        // this.props.getListCustomer()
        let { Updatedate } = this.props.baogia.objDataBaoGia
        this.setState({
            Updatedate: moment(Updatedate)
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
            this.props.getNumberAutoBaoGia()
    }
    handleChange(date) {
        this.setState({
            Updatedate: date
        });
        let { objDataBaoGia } = this.props.baogia
        objDataBaoGia["Updatedate"] = date.format('YYYY-MM-DD HH:mm:ss')
        this.props.updateInputItem(objDataBaoGia)
    }
    _onChangeValue(e) {
        let { objDataBaoGia } = this.props.baogia
        objDataBaoGia["PriceType"] = e.target.value
        this.props.updateInputItem(objDataBaoGia)
        this.props.showListProducts(true)
        let type = e.target.value
        setTimeout(() => {
            // is flexibale
            if (type == '2') {
                let { page, total } = this.props.common
                let params = {
                    page: page,
                    total: total
                }
                this.props.updatePriceByType().then(() => {
                    this.props.getListDataProductInBaoGia(params)
                })
            }
        }, 100)
    }
    _onApprove() {
        let { PriceType
        } = this.props.baogia.objDataBaoGia    
        let { page, total } = this.props.common
        let params = {
            page: page,
            total: total
        }
        this.props.showListProducts(true)
        this.props.updatePriceByType().then(() => {
            this.props.getListDataProductInBaoGia(params)
        })    
        // if (PriceType !== 1) {
        //     alert('Vui lòng chọn loại giá Ratio.')
        // } else {
        //     let { page, total } = this.props.common
        //     let params = {
        //         page: page,
        //         total: total
        //     }
        //     this.props.showListProducts(true)
        //     this.props.updatePriceByType().then(() => {
        //         this.props.getListDataProductInBaoGia(params)
        //     })
        // }
    }

    render() {
        let {
            Pricecode
            , Pricename
            , PriceType
            , Ratio
            , Updatedate
            , IsDisable
            , Remark
        } = this.props.baogia.objDataBaoGia
        let { list_pricetype, isShowProduct } = this.props.baogia
        let { status } = this.props.toolbar

        return (
            <div className="form__personnal">
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Mã bảng giá</label>
                            </div>
                            <div className="right" >
                                <input readOnly={true} className="name form-control" value={Pricecode} onChange={(e) => this._onChange(e)} type="text" id="Pricecode" name="name" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Tên bảng giá</label>
                            </div>
                            <div className="right">
                                <input className="name form-control" value={Pricename} onChange={(e) => this._onChange(e)} type="text" id="Pricename" name="name" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="dateofbirth">Ngày cập nhật</label>
                            </div>
                            <div className="right">
                                {/* <input type="date" name="dateofbirth" id="DayMake" /> */}
                                <DatePicker
                                    dateFormat="DD/MM/YYYY"
                                    selected={this.state.Updatedate} onChange={(e) => this.handleChange(e)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Loại giá</label>
                            </div>
                            <div className="right" >
                                <select disabled={status == 'EDIT' ? true : false} onChange={(e) => this._onChangeValue(e)} value={PriceType}>
                                    {list_pricetype.map((item, i) => {
                                        let { value, text } = item
                                        return (
                                            <option key={`PriceType_${i}`} value={value}>{text}</option>
                                        )
                                    })}

                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Tỷ lệ</label>
                            </div>
                            <div className="right">
                                <input readOnly={status == 'EDIT' ? true : false} readOnly={PriceType == '1' ? false : true} className="name form-control" value={Ratio} onChange={(e) => this._onChange(e)} type="text" id="Ratio" name="name" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="left">
                                <button style={{ "marginLeft": "10px" }}
                                    onClick={() => this._onApprove()}
                                    className="btn btn-primary" >Áp dụng</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <div style={{ width: "12%" }}>
                                <label htmlFor="name">Ghi chú </label>
                            </div>
                            <div style={{ width: "88%" }}>
                                <textarea rows="2" style={{ width: "100%" }} className="name form-control" value={Remark || ''} onChange={(e) => this._onChange(e)} type="text" id="Remark" name="name" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <div className="left" >
                                <button style={{ "marginLeft": "10px" }} className="btn btn-primary" >Xuất file</button>
                                <button style={{ "marginLeft": "10px" }} className="btn btn-primary" >Nhập file</button>
                            </div>
                        </div>
                    </div>
                </div> */}
                {isShowProduct ?
                    <div className="row">
                        <ListOrder key={'order'} />
                    </div>
                    :
                    ''
                }

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
    baogia,
    common
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        header,
        order,
        toolbar,
        baogia,
        common
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...baogiaActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TabOrder)