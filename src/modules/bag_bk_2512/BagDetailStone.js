import * as bagActions from 'modules/bag/actions/form'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import ComboboxByTable from '../common/ComboboxByTable'
import { log } from 'util';
const { Translate, I18n } = ReactReduxI18n;
import ListStoneDetail from './ListStoneDetail'
import ComboboxChildrenProduct from './ComboboxChildrenProduct'

class BagDetailStone extends React.Component {
    constructor() {
        super()
    }
    _viewStone(item) {
        this.props.getListStoneByProductsDetail(item)
    }
    _updateStone(item) {
        this.props.clickRowDataCreateBag(item)
        this.forceUpdate()
    }
    ChangeValueComboboxIdProductChildren(obj) {
        this.props.updateIdChildrenProductDetail(obj)
    }
    ChangeValueCombobox(obj) {
        let { listItemCreateBag } = this.props.bag
        let { id, value } = obj
        let objData = {}
        objData.id = listItemCreateBag[0].IdOrder
        objData.key = "type_bag"
        objData.value = value
        this.props.updateTypeBag(objData)
    }

    render() {
        let { listItemCreateBag, itemDetailCreateBag } = this.props.bag
        let Id_temp, IdOrder_temp, DateCreated_temp, DateProcess_temp, EmployeeId_temp, Remark, type_bag_temp;
        if (listItemCreateBag.length > 0) {
            let { Id, IdOrder, DateCreated, DateProcess, EmployeeId, Remark, type_bag } = listItemCreateBag[0];
            Id_temp = Id;
            IdOrder_temp = IdOrder;
            DateCreated_temp = DateCreated;
            DateProcess_temp = DateProcess;
            EmployeeId_temp = EmployeeId;
            type_bag_temp = type_bag || 'STATUS_BAG_PRODUCT_01'
        }
        return (
            <div className="form__personnal">
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Mã bag</label>
                            </div>
                            <div className="right" >
                                <input readOnly={true} className="name form-control" value={Id_temp || ''} type="text" id="IdOrder" name="name" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Mã đơn hàng</label>
                            </div>
                            <div className="right">
                                <input readOnly={true} className="name form-control" value={IdOrder_temp || ''} type="text" id="namecustomer" name="namecustomer" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
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
                                    readOnly={false}
                                    selected={moment(DateCreated_temp)}
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
                                    readOnly={false}
                                    selected={moment(DateProcess_temp)}
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
                                <Combobox type_code='STATUS_BAG_PRODUCT' id='type_bag' value={type_bag_temp} parentObject={this} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Worker</label>
                            </div>
                            <div className="right">
                                <ComboboxByTable width={'150px'} tableName='EMPLOYEE' keyInput="EmployeeId" value={EmployeeId_temp} />
                            </div>

                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Remark</label>
                            </div>
                            <div className="right">
                                <input className="name form-control" value={itemDetailCreateBag.Remark || ''} type="text" id="Remark" name="Remark" required="" />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <div style={{ width: "100%" }}>

                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th style={{ "textAlign": "left" }} key={`thead_${1}`} scope="col">{'Mã sản phẩm'}</th>
                                            {
                                                listItemCreateBag[0] && listItemCreateBag[0].IdOdd == "1"
                                                    ? <th style={{ "textAlign": "left" }} key={`thead_${6}`} scope="col">{'Sản phẩm con'}</th>
                                                    : ''
                                            }
                                            <th style={{ "textAlign": "left" }} key={`thead_${0}`} scope="col">{'Màu'}</th>
                                            <th style={{ "textAlign": "left" }} key={`thead_${4}`} scope="col">{'Số lượng đã tạo'}</th>
                                            {/* <th style={{ "textAlign": "left" }} key={`thead_${5}`} scope="col">{'Cập nhật đá'}</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listItemCreateBag.map((item, i) => {
                                            let { Color, IdOrderProduct, Value, IdProduct, ProductsEachBag, Number, IdOdd, listChildrenProduct, IdChildrenProduct, IdProductColor, isDelete } = item
                                            let item2 = itemDetailCreateBag
                                            let styles = {}, status_disable = true
                                            item.IdChildrenProduct = IdChildrenProduct
                                            if (item2 && item2.Color == Color && item2.IdProduct == IdProduct) {
                                                status_disable = false
                                                styles = {
                                                    "background": "rgb(189, 189, 189)",
                                                    "textDecoration": "none"
                                                }
                                            }

                                            return (
                                                <tr key={`dataDetail_${i}`} style={styles} >
                                                    <td style={{ "textAlign": "left" }}>
                                                        <LinkProduct id={IdProduct} />
                                                    </td>
                                                    {

                                                        listItemCreateBag[0] && listItemCreateBag[0].IdOdd == "1"
                                                            ? <td style={{ "textAlign": "left" }}><ComboboxChildrenProduct disable={status_disable} Color={Color} data={listChildrenProduct || []} value={IdChildrenProduct ? IdChildrenProduct : listChildrenProduct && listChildrenProduct[0].IdProductChildren} parentObject={this} /></td>
                                                            : ''
                                                    }
                                                    <td style={{ "textAlign": "left" }}>
                                                        <Combobox disable={true} type_code='DSM' keyInput="Color" value={Color} id={IdOrderProduct} parentObject={this} />
                                                    </td>
                                                    <td style={{ "textAlign": "left" }}>
                                                        {ProductsEachBag}
                                                    </td>
                                                    <td><button onClick={() => this._updateStone(item)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button></td>
                                                    {isDelete ? <td><button onClick={() => this._removeProducts(item)}><i className="fa fa-trash-o" aria-hidden="true"></i></button></td> : ''}
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                <ListStoneDetail />
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
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(BagDetailStone)