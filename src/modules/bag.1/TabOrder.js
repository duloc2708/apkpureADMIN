import * as bagActions from 'modules/bag/actions/form'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import ComboboxByTable from '../common/ComboboxByTable'

import ListStone from './ListStone'
import ComboboxChildrenProduct from './ComboboxChildrenProduct'
const { Translate, I18n } = ReactReduxI18n;

class TabOrder extends React.Component {
    constructor() {
        super()
    }
    componentDidMount() {
        $(".allownumericwithdecimal").on("keypress keyup blur", function (event) {
            //this.value = this.value.replace(/[^0-9\.]/g,'');
            $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
            if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });

        //set focus vào input nhập số lượng
        setTimeout(() => {
            $('#IdTableTabOrderBag > tbody  > tr').each(function (i, item) {
                if (i == 0) {
                    $(item).find('input, textarea')[0].focus()
                }
            });
        }, 500)
    }
    onKeyPressInput(obj) {
        let { typeInput, index, id, tabIndex, idTable } = obj
        let { ListProductByOrderInBag } = this.props.bag
        $(`#${idTable} > tbody  > tr`).each(function (i, item) {
            if (i == index + 1) {
                $(item).find('input, textarea')[0].focus()
            }
        });

        if (index + 1 == ListProductByOrderInBag.length) {
            $(`#IdTableListStone > tbody  > tr`).each(function (i, item) {
                if (i == 0) {
                    $(item).find('input, textarea')[0].focus()
                }
            });
        }
    }
    handleChange(date, IdOrderProduct, type) {
        let objData = {}
        objData.key = type
        objData.id = IdOrderProduct
        objData.value = date.format('YYYY-MM-DD HH:mm:ss')
        this.props.updateCellBag(objData)
    }
    ChangeValueCell(value) {
        this.props.updateCellBag(value)
    }
    _updateStone(item) {
        this.props.clickRowDataCreateBag(item)
        this.forceUpdate()
        $(`#IdTableListStone > tbody  > tr`).each(function (i, item) {
            if (i == 0) {
                $(item).find('input, textarea')[0].focus()
            }
        });
    }
    _removeProducts(item) {
        this.props.removeProductsInListBag(item)
    }

    ChangeValueComboboxIdProductChildren(obj) {
        this.props.updateIdChildrenProduct(obj)
    }
    ChangeValueComboboxByTable(value) {
        // this.props.updateCellBag(value)
    }
    changeRemark(e, IdOrderProduct) {
        let objData = {}
        objData.id = IdOrderProduct
        objData.key = "Remark"
        objData.value = e.target.value
        this.props.updateCellBag(objData)
    }
    ChangeValueCombobox(obj) {
        let { listItemCreateBag } = this.props.bag
        let { id, value } = obj

        let objData = {}
        objData.id = listItemCreateBag[0].IdOrder
        if (obj.id == 'type_bag') {
            objData.key = "type_bag"
            objData.value = value
            this.props.updateTypeBag(objData)
        } else if (obj.id == 'TypeSplitStone') {
            objData.key = "TypeSplitStone"
            objData.value = value
            this.props.updateTypeSplitStone(objData)
        }

    }
    handleClick() {
        let { list_stone_save_split } = this.props.bag
        if (list_stone_save_split.length > 0) {
            alert('Vui lòng xoá đá tách trước khi sửa!')
        }
    }
    render() {
        let { listItemCreateBag, itemDetailCreateBag } = this.props.bag
        let idTable = "IdTableTabOrderBag"
        return (
            <div className="form__personnal">
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Mã bag</label>
                            </div>
                            <div className="right" >
                                <input readOnly={true} className="name form-control" value={listItemCreateBag[0] && listItemCreateBag[0].Id || ''} type="text" id="IdOrder" name="name" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Mã đơn hàng</label>
                            </div>
                            <div className="right">
                                <input readOnly={true} className="name form-control" value={listItemCreateBag[0] && listItemCreateBag[0].IdOrder || ''} type="text" id="namecustomer" name="namecustomer" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Ngày tạo bag</label>
                            </div>
                            <div className="right">
                                <DatePicker
                                    selected={moment(listItemCreateBag[0] && listItemCreateBag[0].DateCreated)}
                                    onChange={(e) => this.handleChange(e, listItemCreateBag[0] && listItemCreateBag[0].IdOrderProduct, 'DateCreated')}
                                    dateFormat="DD/MM/YYYY" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Ngày Process</label>
                            </div>
                            <div className="right">
                                <DatePicker
                                    selected={moment(listItemCreateBag[0] && listItemCreateBag[0].DateProcess)}
                                    onChange={(e) => this.handleChange(e, listItemCreateBag[0] && listItemCreateBag[0].IdOrderProduct, 'DateProcess')}
                                    dateFormat="DD/MM/YYYY" />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Loại bag</label>
                            </div>
                            <div className="right">
                                <Combobox type_code='STATUS_BAG_PRODUCT' id='type_bag' value={listItemCreateBag[0] && listItemCreateBag[0].type_bag || 'STATUS_BAG_PRODUCT_01'} parentObject={this} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Worker</label>
                            </div>
                            <div className="right">
                                <ComboboxByTable width={'200px'} tableName='EMPLOYEE' keyInput="EmployeeId" value={''} id={listItemCreateBag[0] && listItemCreateBag[0].IdOrderProduct} parentObject={this} />
                            </div>

                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Kiểu tách</label>
                            </div>
                            <div className="right">
                                <Combobox type_code='TYPE_SPLIT_STONE' id='TypeSplitStone' value={listItemCreateBag[0] && listItemCreateBag[0].TypeSplitStone || 'TYPE_SPLIT_STONE_2'} parentObject={this} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Remark</label>
                            </div>
                            <div className="right">
                                <input onChange={(e) => this.changeRemark(e, listItemCreateBag[0] && listItemCreateBag[0].IdOrderProduct)} className="name form-control" value={listItemCreateBag[0] && listItemCreateBag[0].Remark || ''} type="text" id="Remark" name="Remark" required="" />
                            </div>
                        </div>
                    </div>
                </div>



                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <div style={{ width: "100%" }}>
                                <table id={idTable} className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th style={{ "textAlign": "left" }} key={`thead_${1}`} scope="col">{'Mã sản phẩm'}</th>
                                            {
                                                listItemCreateBag[0] && listItemCreateBag[0].IdOdd == "1"
                                                    ? <th style={{ "textAlign": "left" }} key={`thead_${6}`} scope="col">{'Sản phẩm con'}</th>
                                                    : ''
                                            }
                                            <th style={{ "textAlign": "left" }} key={`thead_${0}`} scope="col">{'Màu'}</th>
                                            <th style={{ "textAlign": "left" }} key={`thead_${2}`} scope="col">{'Số lượng'}</th>
                                            <th style={{ "textAlign": "left" }} key={`thead_${3}`} scope="col">{'Số lượng đặt hàng'}</th>
                                            <th style={{ "textAlign": "left" }} key={`thead_${4}`} scope="col">{'Số lượng đã tạo'}</th>
                                            {/* <th style={{ "textAlign": "left" }} key={`thead_${5}`} scope="col">{'Cập nhật đá'}</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listItemCreateBag.map((item, i) => {
                                            let { Color, IdOrderProduct, Value, IdProduct, ProductsEachBag, Number, IdOdd, listChildrenProduct, IdChildrenProduct, IdProductColor, isDelete } = item
                                            let { list_stone_save_split } = this.props.bag
                                            let item2 = itemDetailCreateBag
                                            let styles = {}, status_disable = true
                                            if (item2 && item2.Color == Color && item2.IdProduct == IdProduct) {
                                                status_disable = false
                                                styles = {
                                                    "background": "rgb(189, 189, 189)",
                                                    "textDecoration": "none"
                                                }
                                            }

                                            return (
                                                <tr key={`dataDetail_${i}`} style={styles} >
                                                    <td style={{ "textAlign": "center" }}>
                                                        <LinkProduct id={IdProduct} />
                                                    </td>
                                                    {

                                                        listItemCreateBag[0] && listItemCreateBag[0].IdOdd == "1"
                                                            ? <td style={{ "textAlign": "center" }}><ComboboxChildrenProduct disable={status_disable} Color={Color} data={listChildrenProduct || []} value={IdChildrenProduct ? IdChildrenProduct : listChildrenProduct && listChildrenProduct[0].IdProductChildren} parentObject={this} /></td>
                                                            : ''
                                                    }
                                                    <td style={{ "textAlign": "center" }}>
                                                        <Combobox disable={true} type_code='DSM' keyInput="Color" value={Color} id={IdOrderProduct || '1'} parentObject={this} />
                                                    </td>
                                                    <Cell idTable={idTable} index={i} readOnly={list_stone_save_split.length > 0 ? true : false} type="number" width="100px" other={{ IdProduct: IdProduct, Color: Color }} value={parseInt(Value) || ''} keyInput="Value" id={IdOrderProduct} parentObject={this} />
                                                    <td style={{ "textAlign": "center" }}>
                                                        {Number}
                                                    </td>
                                                    <td style={{ "textAlign": "center" }}>
                                                        {ProductsEachBag}
                                                    </td>
                                                    <td><button onClick={() => this._updateStone(item)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button></td>
                                                    {isDelete ? <td><button onClick={() => this._removeProducts(item)}><i className="fa fa-trash-o" aria-hidden="true"></i></button></td> : ''}
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                <ListStone idTable = {"IdTableListStone"} />

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
    bag
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        bag
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...bagActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TabOrder)