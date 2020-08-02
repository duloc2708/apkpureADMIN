import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import * as cd_turn_inout_Actions from 'modules/cd_turn_inout/actions/form'
const { Translate, I18n } = ReactReduxI18n;
import LoaderData from 'react-loader-advanced';

class TabProductSearch extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() { }

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
        this.props.updateCellBag(value)
    }
    _onRemove(item) {
        var r = confirm(I18n.t(`alert.delete`));
        if (r == true) {
            this.props.removeItemBag(item)
        }
    }
    ChangeValueCombobox(obj) {
        // if (obj.value == '' && obj.key == 'color') {
        //     obj.value = '005'
        // }
        // this.props.updateCellProducts(obj)
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
                console.log('src>>>>>>>', img);

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
    _funcAddExistProduct(id, value) {
        let { list_products } = this.props.order
        let list_products_temp = _.clone(list_products, true)
        let check = list_products_temp.filter(x => x.value.toUpperCase() === value.toUpperCase())
        let filename = Config.API_URL_IMAGE + check[0].url_image
        let that = this
        this.checkImageExists(filename, function (existsImage) {
            if (existsImage == true) {
                that.props.addExistProduct(value)
                setTimeout(() => {
                    setTimeout(() => {
                        $(`#tr_${id + 1}`).find('input, textarea')[1].focus()
                    }, 200)
                    that.props.updateExistBag(check[0])
                }, 200)
            } else {
                alert("Hình ảnh không tồn tại.")
            }
        })
    }
    _onChangeSize(e) {
        let { id, value } = e.target
        let obj = {
            id: id,
            value: value,
            key: "size"
        }
        this.props.updateCellProducts(obj)
    }
    _onChangeProduct(e) {
        let { id, value } = e.target
        let obj = {
            id: id,
            value: value,
            key: "IdBag"
        }
        this.props.updateCellBag(obj)
    }
    onKeyPressInput(obj) {
        let { typeInput, index } = obj
        if (typeInput == 'sl') {
            $(`#tr_${index}`).find('input, textarea')[2].focus()
        }
    }
    checkSameProducts(e) {
        let isCheck = true,
            type = 0
        let { listProductsSelected } = this.props.order
        let listProductsSelected_temp = listProductsSelected
        let productdup = '',
            colordup = ''
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
    _onAddAllProduct() {
        let { list_products_search } = this.props.cd_turn_inout
        this.props.addProductsAll(list_products_search)
    }
    _onAddProductonRow(item) {
        let checktype = 0
        let { listProductSelected, list_products_search } = this.props.cd_turn_inout
        listProductSelected.map(itemProduct => {
            let { CodeLV, CodeLH, CodeMX, IdProduct, Color } = itemProduct
            // kiểm tra cùng loại vàng, màu xi , loại hội
            if (item.CodeLV + item.CodeLH + item.CodeMX != CodeLV + CodeLH + CodeMX) {
                checktype = 1
                return false
            }
            // kiểm tra sản phẩm đã tồn tại
            if (item.IdProduct + item.CodeLV + item.CodeLH + item.CodeMX + item.Color == IdProduct + CodeLV + CodeLH + CodeMX + Color) {
                checktype = 2
                return false
            }

        })
        if (checktype == 0) {
            let ListProductParent = []
            if (item.IdProductParent) {
                ListProductParent = _.clone(list_products_search.filter(x => {
                    if (x.IdGroup == item.IdGroup) {
                        return x
                    }
                }), true)
            }
            this.props.addProductsNew(ListProductParent.length > 0 ? ListProductParent : [item])
        } else if (checktype == 1) {
            this.child._addNotification('Vui lòng chọn sản phẩm cùng loại vàng, màu xi, loại hội ', 'warning')
        }
        else if (checktype == 2) {
            this.child._addNotification('Sản phẩm này đã tồn tại', 'warning')
        }
    }
    _onNext(obj) {
        this.props.findProducts()
    }
    _onPrevious(obj) {
        this.props.findProducts()
    }
    _onChangePage(obj) {
        this.props.findProducts()
    }
    render() {
        let { status } = this.props.toolbar
        let { isLoadingTableProducts, list_products_search, listHeaderProductsSearch, listHeaderProductsSearchOut, listProductSelected, isEditProducts, isShowStone, objConfig } = this.props.cd_turn_inout
        let totalmoney = 0
        let totalgoldweight = 0
        let totalmoneydiscount = 0
        let type = Helper.getParam(window.location.href, 'type')
        let listHeaderProductsTemp = type == 0 ? listHeaderProductsSearch : listHeaderProductsSearchOut
        return (
            <div>
                <AlertCustom onRef={ref => (this.child = ref)} />
                <LoaderData show={isLoadingTableProducts} message={'Đang tải dữ liệu ...'}>
                    <table className="table table-striped"
                        style={{
                            "height": "100%",
                            "display": "inline-block",
                            "overflowY": "scroll",

                        }}
                    >
                        <thead>
                            <tr>
                                <th style={{ "textAlign": "left" }} key={`thead_all`} scope="col">
                                    <label>
                                        <td><button onClick={() => this._onAddAllProduct()}><i className="fa fa-plus" aria-hidden="true"></i></button>Tất cả</td>
                                    </label>
                                </th>
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
                        {
                            list_products_search.length > 0 ?
                                <tbody id="table_product">
                                    {list_products_search && list_products_search.map((item, i) => {
                                        let { index,
                                            checked,
                                            Id
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
                                            , CodeLAI
                                            , TotalREMAIN
                                            , url_image
                                            , IdOutput
                                        } = item
                                        let filename = url_image ? Config.API_URL_IMAGE + url_image : "images/image-not-found.jpg"
                                        return (                                           
                                            <tr style={{ "backgroundColor": bgcolor}} key={`data_${i}`} id={`tr_${index}`}>
                                                {/* <th scope="row">
                                                    <label>
                                                        <input type="checkbox" checked={checked} />
                                                    </label>
                                                </th> */}
                                                <td></td>
                                                <td><button onClick={() => this._onAddProductonRow(item)}><i className="fa fa-plus" aria-hidden="true"></i></button></td>
                                                <td>
                                                    <div style={{ "border": "1px solid black", "display": "inline-block", "padding": "2px 2px" }}>
                                                        <img src={filename} width="60px" height="60px" />
                                                    </div>
                                                </td>
                                                {
                                                    type == 0 ?
                                                        <td>{IdOutput}</td>
                                                        : ''
                                                }
                                                <td>{IdProductParent && IdProductParent === IdProduct ? '' : IdProductParent}</td>
                                                <td>{IdProduct}</td>
                                                <td width="120px">
                                                    <Combobox disable={true} type_code='DSM' keyInput="color" id={IdProduct} value={Color} parentObject={this} />
                                                </td>
                                                <td width="70px">
                                                    <Combobox disable={true} type_code='LV' keyInput="color" id={IdProduct} value={CodeLV} parentObject={this} />
                                                </td>
                                                <td width="180px">
                                                    <Combobox disable={true} type_code='MX' keyInput="color" id={IdProduct} value={CodeMX} parentObject={this} />
                                                </td>
                                                <td width="130px">
                                                    <Combobox disable={true} type_code='LH' keyInput="color" id={IdProduct} value={CodeLH} parentObject={this} />
                                                </td>
                                                <td width="80px">
                                                    {CodeLAI ?
                                                        <Combobox disable={true} type_code='L' keyInput="color" id={IdProduct} value={CodeLAI} parentObject={this} />
                                                        : ''}
                                                </td>
                                                {
                                                    type == 0 ?
                                                        [
                                                            <td>{Qty}</td>,
                                                            <td>{SportConfig.function._formatMoney(org_price || price)}</td>,                                                                                                                        
                                                            <td>{Helper.round(WeightCustom || 0, 1)}</td>,
                                                            <td>{Helper.round(Weight / (0.0375 * Qty) || 0, 1)}</td>,
                                                            <td>{Helper.round(((WeightProduct/0.0375 - WeightCustom*Qty) ) / Qty || 0, 1)}</td>,
                                                            <td>{Helper.round((WeightProduct/ 0.0375 - WeightCustom*Qty)  || 0, 1)}</td>,
                                                            <td>{Helper.round(WeightProduct / 0.0375 || 0, 1)}</td>,
                                                            <td>{IdOdd==1?WeightTotal:''}</td>,
                                                            <td>{IdOdd==1?WeightGoldTotal:''}</td>
                                                        ]
                                                        :
                                                        [
                                                            <td>{SportConfig.function._formatMoney(price)}</td>,
                                                            <td>{Inv_Type == 0 ? 'Hàng trả' : 'Hàng hồi'}</td>,
                                                            <td>{TotalREMAIN}</td>
                                                        ]
                                                }

                                            </tr>)
                                        // }
                                    })}
                                </tbody>
                                :
                                <tbody id="table_product">
                                    <tr key={`data_not_found`} id={`tr_${-1}`}>
                                        <td style={{ "textAlign": "center" }} colSpan="25">Không tìm thấy dữ liệu ...</td>
                                    </tr>
                                </tbody>
                        }
                    </table>
                    <PagingTable type="product" parentObject={this} />
                </LoaderData>
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
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TabProductSearch)