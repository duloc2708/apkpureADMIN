import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import * as cd_turn_inout_Actions from 'modules/cd_turn_inout/actions/form'
const { Translate, I18n } = ReactReduxI18n;
class TabProduct extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
    }

    _changeStatus(status) {
        this.setState({ status: !status });
    }
    _checkClickRow(item) {
        // this.props.clickCheckRowTabStone(item)
    }
    _checkAllRow(value) {
        this.props.checkAllRow(!value)
    }
    _myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    ChangeValueCell(value) {
        this.props.updateCellTurnInout(value)
    }
    _onRemove(item) {
        let { Status } = this.props.cd_turn_inout.objData
        if (Status != 'STATUS_TURN_INOUT_02') {
            var r = confirm(I18n.t(`alert.delete`));
            if (r == true) {
                this.props.removeItemProduct(item)
            }
        } else {
            alert('Phiếu này đã xác nhận, không thể xoá')
        }
    }
    ChangeValueCombobox(obj) {
        this.props.updateCellTurnInout(obj)
    }
    _onView(item) {
        this.props.getSetProduct(item.value)
        // $(".dropdown2").show(500)
    }
    checkImageExists(imageUrl, callBack) {
        var imageData = new Image();
        imageData.onload = function () {
            callBack(true);
        };
        imageData.onerror = function () {
            callBack(false);
        };
        imageData.src = imageUrl;
    }
    checkImage(imageSrc) {
        var img = new Image();
        try {
            let url = 'http://stag.zzb8.co/images/logo.png?v=2.0'
            img.src = url
            if (img.width == 0) {
                return false;
            } else {
                return true;
            }
        } catch (err) {
            return false;
        }
    }
    _onKeyPressCheckBag(e, IdBag, index) {
        let that = this
        if (e.key == 'Enter') {
            let { listProductSelected, list_bag_default, objDataOrder, list_products_by_baogia, objConfig, objData } = this.props.cd_turn_inout
            let { IsGoldTypeRequest, IsAllowProduct_NotSameGold } = objConfig
            let list_bag_default_temp = _.clone(list_bag_default, true)
            let check = list_bag_default_temp.filter(x => x.Id.toUpperCase() === IdBag.toUpperCase())
            if (check.length == 0) {
                alert('Bag này không tồn tại!.')
                return false
            }
            let objBag = check[0]
            // Kiểm tra config có thuộc loại vàng trong quy trình 
            if (IsGoldTypeRequest == 1) {
                if (objBag.codeLV != objData.CodeLV) {
                    alert('Bag này không thuộc loại vàng trên!.')
                    return false
                }
            }
            // Kiểm tra config các sản phầm trong bag phải thuộc loại vàng
            if (IsAllowProduct_NotSameGold == 1) {
                if (objBag.codeLV != objData.CodeLV) {
                    alert('Sản phẩm của Bag này không thuộc loại vàng trên')
                    return false
                }
            }

            // Kiểm tra bag nhập trùng
            let checkList = listProductSelected.filter(x => x.IdBag.toUpperCase() == IdBag.toUpperCase())
            if (checkList.length > 1) {
                alert('Bag này đã tồn tại!')
                return false
            }
            setTimeout(() => {
                $(`#tr_${index}`).find('input, textarea')[1].focus()
            }, 200)
            that.props.updateExistBag(objBag)
        }
    }
    _addProduct(e) {
        let { objDataOrder, listProductsSelected } = this.props.order
        if (e.key == 'Enter') {
            let { objDataOrder } = this.props.order
            this._funcAddProduct(listProductsSelected)
        }
    }
    _onButtonAddProduct(index) {
        this.props.addItemBagNew()
    }
    _funcAddProduct(listProductsSelected) {
        this.props.addProduct()
        setTimeout(() => {
            $(`#tr_${listProductsSelected.length + 1}`).find('input, textarea')[0].focus()
        }, 200)
    }

    _onChangeSize(e) {
        let { id, value } = e.target
        let obj = {
            id: id, value: value, key: "size"
        }
        this.props.updateCellProducts(obj)
    }
    _onChangeProduct(e) {
        let { id, value } = e.target
        let obj = {
            id: id, value: value, key: "IdProductParent"
        }
        this.props.updateCellTurnInout(obj)
    }
    _onKeyPressCheckProduct(e, IdProductParent, index) {
        if (e.key == 'Enter') {
            let { list_products_by_baogia, list_products_set } = this.props.cd_turn_inout
            let list_products_temp = _.clone(list_products_by_baogia, true)
            let check = list_products_temp.filter(x => x.IdProduct.toUpperCase() === IdProductParent.toUpperCase())
            // if (check.length == 0) {
            //     alert('Sản phẩm không tồn tại hoặc đã ngừng kinh doanh \nHoặc đang tải danh sách sản phẩm từ hệ thống! Vui lòng đợi')
            // } else {
            //     let url = check[0].url_image
            //     let filename = Config.API_URL_IMAGE + url
            //     this.props.updateExistProduct(check[0])
            //     console.log(check)
            // }
            if (check[0] && check[0].IdOdd == '1') {
                let data = list_products_set.filter(x => x.IdProductParent == check[0].IdProductParent)
                this.props.addProductSet(data)

            } else {
                this.props.updateExistProduct(check[0])
            }
            // this.checkImageExists(filename, function(existsImage) {
            //     if (existsImage == true) {
            //         if (list_products_by_baogia.length == 0) {
            //             if (objDataOrder.CodeBaoGia) {
            //                 that.props.getListProductsByPrice(objDataOrder.CodeBaoGia).then(() => {
            //                     setTimeout(() => {
            //                         $(`#tr_${index}`).find('input, textarea')[1].focus()
            //                     }, 200)
            //                     that.props.updateExistProduct(check[0])
            //                 })
            //             }
            //         } else {
            //             setTimeout(() => {
            //                 $(`#tr_${index}`).find('input, textarea')[1].focus()
            //             }, 200)
            //             that.props.updateExistProduct(check[0])
            //         }
            //     } else {
            //         alert("Hình ảnh không tồn tại.")
            //     }
            // });


        }
    }
    onKeyPressInput(obj) {
        let { typeInput, index } = obj
        if (typeInput == 'sl') {
            $(`#tr_${index}`).find('input, textarea')[2].focus()
        }
    }
    checkSameProducts(e) {
        let isCheck = true, type = 0
        let { listProductsSelected } = this.props.order
        let listProductsSelected_temp = listProductsSelected
        let productdup = '', colordup = ''
        if (listProductsSelected.length > 0) {
            listProductsSelected.map((item, i) => {
                let { value, color } = item
                if (color == '000' || !color) {
                    type = 1
                    return false
                }
                let check = listProductsSelected_temp.filter(x => x.value == value && x.color == color)
                if (check.length > 1) {
                    colordup = x.color
                    type = 2
                    return false
                }
            })
        }
        switch (type) {
            // case 1:
            //     this.child._addNotification(I18n.t(`order.please_input_color`), 'warning')
            //     isCheck = false
            //     break;
            case 2:
                this.child._addNotification(I18n.t(`order.same_id_products`), 'warning')
                isCheck = false
                break;
            default:
                break
        }
        return isCheck
    }
    handleClick() {

    }
    _ShowFormStone(type, item) {
        this.props.showFormStone(true)
        this.props.updateTypeInOut(type)
        this.props.updateBagDetail(item)
        this.props.getListStoneWaxsetByIdBag(item)
    }
    _saveWeightStone() {
        this.child._addNotification('Cập nhật đá thành công!!!', 'success')
        // this.props.saveWeightStone()
    }
    closeModal() {
        this.props.showFormStone(false)
    }
    render() {
        let { Status } = this.props.cd_turn_inout.objData
        let { listHeaderProducts, listHeaderProductsOut, listProductSelected, isEditProducts, isShowStone, objConfig, typeTurn } = this.props.cd_turn_inout
        let totalmoney = 0
        let totalgoldweight = 0
        let totalmoneydiscount = 0
        let { IsIncludeInOut } = objConfig
        let total_Waxset_Weight = 0
            , total_Product_Weight_IN = 0
            , total_Broken_Weight_IN = 0
            , total_Gold_Weight_IN = 0
            , total_Product_Weight_OUT = 0
            , total_Broken_Weight_OUT = 0
            , total_Gold_Weight_OUT = 0
        let type = Helper.getParam(window.location.href, 'type')
        let listHeaderProductsTemp = type == 0 ? listHeaderProducts : listHeaderProductsOut
        return (
            <div>
                <AlertCustom onRef={ref => (this.child = ref)} />
                <table className="table table-striped"
                    style={{
                        "height": "100%",
                        "display": "inline-block",
                        "overflowY": "scroll",

                    }}
                >
                    <thead>
                        <tr>
                            {
                                listHeaderProductsTemp.map((item, i) => {
                                    let { key, title } = item
                                    return (
                                        <th style={{ "textAlign": "left" }} key={`thead_${key}`} scope="col">{title}</th>
                                    )
                                })

                            }
                        </tr>
                    </thead>
                    <tbody id="table_product">
                        {listProductSelected && listProductSelected.map((item, i) => {
                            let { Id
                                , IdTurn
                                , TicketCode
                                , IdOrder
                                , IdProduct
                                , IdProductParent
                                , Qty
                                , QtyOrder
                                , Color
                                , Weight
                                , WeightAvg
                                , WeightProduct
                                , WeightAvgProduct
                                , WeightCustom
                                , price
                                , amountgroup
                                , amount
                                , valueLV
                                , ValueLH
                                , ValueLAI
                                , ValueMX
                                , WeightTotal
                                , WeightProductTotal
                                , WeightGoldTotal
                                , IdOdd
                                , numperset
                                , IdProductParentColor
                                , org_price
                                , org_amount
                                , discount
                                , IdGroup
                                , OrderByData
                                , REMARK
                                , IdGroupStt
                                , IsDeleted
                                , bgcolor
                                , totalQty
                                , TempIdProductParent
                                , keyNum
                                , orderby_org
                                , BagList
                                , Inv_Type
                                , CodeLV
                                , CodeLH
                                , CodeMX
                                , CodeLAI,
                                OrderIndex
                                , TotalREMAIN
                                , url_image
                                , OrderIndexCell
                                , isManual
                            } = item
                            let filename = url_image ? Config.API_URL_IMAGE + url_image : "images/image-not-found.jpg"
                            let index = OrderIndex
                            let blockInput = Status == 'STATUS_TURN_INOUT_02' ? true : false
                            let blockCombo = (blockInput || type == 1) ? true : false
                            return (
                                <tr key={`data_${i}`} id={`tr_${index}`}>
                                    <td>{i + 1}</td>
                                    <td>
                                        <div style={{ "border": "1px solid black", "display": "inline-block", "padding": "2px 2px" }}>
                                            <img src={filename} width="60px" height="60px" />
                                        </div>
                                    </td>
                                    {
                                        isManual ?
                                            <td>
                                                <input
                                                    onKeyDown={(e) => this._onKeyPressCheckProduct(e, IdProductParent, index)}
                                                    id={index}
                                                    style={{ "width": `100px` }}
                                                    className={`name form-control`}
                                                    type='text'
                                                    value={IdProductParent}
                                                    onChange={e => this._onChangeProduct(e)}
                                                    name="value" />
                                            </td>
                                            :
                                            <td>{IdProductParent && IdProductParent === IdProduct ? '' : IdProductParent}</td>
                                    }
                                    <td>{IdProduct}</td>
                                    <td width="120px">
                                        <Combobox disable={isManual ? false : true} type_code='DSM' keyInput="Color" id={index} value={Color} parentObject={this} />
                                    </td>
                                    <Cell readOnly={blockInput} id={index} value={Qty} width="50px" keyInput="Qty" parentObject={this} />
                                    {
                                        type == 0 ?
                                            [
                                                <Cell readOnly={blockInput} id={OrderIndexCell} value={Weight} keyInput="Weight" parentObject={this} />,
                                                <Cell readOnly={blockInput} id={OrderIndexCell} value={WeightProduct} keyInput="WeightProduct" parentObject={this} />,
                                                <Cell readOnly={blockInput} id={OrderIndexCell} value={WeightCustom || ''} keyInput="WeightCustom" parentObject={this} />,
                                                <Cell readOnly={blockInput} id={OrderIndexCell} value={REMARK} keyInput="REMARK" parentObject={this} />,
                                                <td >{SportConfig.function._formatMoney(price)}</td>,
                                                <td >{Weight && Qty && Helper.round(Weight / (0.0375 * Qty) || 0, 1) || ''}</td>,
                                                <td >{WeightProduct && Weight && Qty && Helper.round(((WeightProduct - Weight) / 0.0375) / Qty || 0, 1) || ''}</td>,
                                                <td >{WeightProduct && Weight && Helper.round((WeightProduct - Weight) / 0.0375 || 0, 1) || ''}</td>,
                                                <td >{WeightProduct && Helper.round(WeightProduct / 0.0375 || 0, 1) || ''}</td>
                                            ]
                                            :
                                            [
                                                <Cell readOnly={blockInput} id={OrderIndexCell} value={Weight || ''} keyInput="Weight" parentObject={this} />,
                                                <Cell readOnly={blockInput} id={OrderIndexCell} value={WeightProduct || ''} keyInput="WeightProduct" parentObject={this} />,
                                                <Cell readOnly={blockInput} id={OrderIndexCell} value={WeightCustom || ''} keyInput="WeightCustom" parentObject={this} />,
                                                <Cell
                                                    width="90px"
                                                    id={OrderIndexCell} value={REMARK || ''} className={`name form-control`}
                                                    keyInput="REMARK" parentObject={this} name="REMARK" />,
                                                <td >{SportConfig.function._formatMoney(price)}</td>,
                                                <td >{Weight && Qty && Helper.round(Weight / (0.0375 * Qty) || 0, 1) || ''}</td>,
                                                <td >{WeightProduct && Weight && Qty && Helper.round(((WeightProduct - Weight) / 0.0375) / Qty || 0, 1) || ''}</td>,
                                                <td >{WeightProduct && Weight && Helper.round((WeightProduct - Weight) / 0.0375 || 0, 1) || ''}</td>,
                                                <td >{WeightProduct && Helper.round(WeightProduct / 0.0375 || 0, 1) || ''}</td>,
                                                <td>{Inv_Type == 0 ? 'Hàng trả' : 'Hàng hồi'}</td>
                                            ]
                                    }
                                    <td onClick={() => this._onRemove(item)}><button><i className="fa fa-trash-o" aria-hidden="true"></i></button></td>
                                </tr>)
                            // }
                        })}
                    </tbody>
                </table>

            </div>
        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    header,
    cd_turn_inout,
    toolbar
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        header,
        cd_turn_inout,
        toolbar
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...cd_turn_inout_Actions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TabProduct)
