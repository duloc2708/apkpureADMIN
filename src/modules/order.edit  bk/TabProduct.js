import * as userActions from 'modules/login/actions/form'
import * as productsActions from 'modules/products/actions/form'
import * as orderActions from 'modules/order/actions/form'
import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import * as stoneActions from 'modules/stone/actions/form'
import ComboboxProducts from './ComboboxProducts'

import ReactTooltip from 'react-tooltip'

const { Translate, I18n } = ReactReduxI18n;
class TabProduct extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        this._loadData()
    }
    _loadData() {
        var currentURL = document.URL;
        var url = new URL(currentURL);
        var codeURL = url.searchParams.get("code");
        var that = this
        let { objDataOrder } = this.props.order
        if (objDataOrder.IdOrder) {
            this.props.getListProductByOrder().then(() => {
                this.props.getListBagByOrder()
            })
        }
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
        this.props.updateCellProducts(value)
    }
    _onRemove(item) {
        if (item.isExistsBag) {
            alert('Bag của sản phẩm này đã được tạo, vui lòng xoá/huỷ bag trước khi xoá sản phẩm này!')

        } else {
            var r = confirm(I18n.t(`alert.delete`));
            if (r == true) {
                this.props.removeItemStone(item)
            }
        }
    }
    ChangeValueCombobox(obj) {
        if (obj.value == '' && obj.key == 'color') {
            obj.value = '005'
        }
        if (obj.value == '001') {
            obj.value = '005'
            alert('Vui lòng chọn màu khác!')
        }
        this.props.updateCellProducts(obj)
    }
    _onView(item) {
        this.props.getSetProduct(item.value)
        // $(".dropdown2").show(500)

    }
    checkImageExists(imageUrl, callBack) {
        var imageData = new Image();
        imageData.onload = function() {
            callBack(true);
        };
        imageData.onerror = function() {
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
    _onKeyPressCheckProduct(e, IdProduct, index) {
        if (e.key == 'Enter') {
            let { list_products, objDataOrder, list_products_by_baogia } = this.props.order
            let list_products_temp = _.clone(list_products, true)
            let check = list_products_temp.filter(x => x.value.toUpperCase() === IdProduct.toUpperCase())

            if (!objDataOrder.IdCustomer) {
                alert('Vui lòng chọn khách hàng')
                return
            }
            if (!objDataOrder.CodeBaoGia) {
                alert('Vui lòng chọn bảng giá')
                return
            }

            if (check.length == 0) {
                alert('Sản phẩm không tồn tại!.')
            } else {
                let url = check[0].url_image
                let filename = Config.API_URL_IMAGE + url
                let that = this
                this.checkImageExists(filename, function(existsImage) {
                    if (existsImage == true) {
                        if (list_products_by_baogia.length == 0) {
                            if (objDataOrder.CodeBaoGia) {
                                that.props.getListProductsByPrice(objDataOrder.CodeBaoGia).then(() => {
                                    setTimeout(() => {
                                        $(`#tr_${index}`).find('input, textarea')[1].focus()
                                    }, 200)
                                    that.props.updateExistProduct(check[0])
                                })
                            }
                        } else {
                            setTimeout(() => {
                                $(`#tr_${index}`).find('input, textarea')[1].focus()
                            }, 200)
                            that.props.updateExistProduct(check[0])
                        }
                    } else {
                        alert("Hình ảnh không tồn tại.")
                    }
                });

            }
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
        let { objDataOrder, listProductsSelected, isEditProducts, list_products_by_baogia, CodeBaoGiaTemp } = this.props.order
        let { status } = this.props.toolbar
        if (!objDataOrder.IdCustomer) {
            alert('Vui lòng chọn khách hàng')
            return
        }
        if (!objDataOrder.CodeBaoGia) {
            alert('Vui lòng chọn bảng giá')
            return
        }
        if (!objDataOrder.CodeBaoGia || (CodeBaoGiaTemp && CodeBaoGiaTemp.indexOf(',') != -1 && status == 'ADD')) {
            alert('Vui lòng chọn bảng giá')
            return
        }
        this._funcAddProduct(listProductsSelected)
        if (list_products_by_baogia.length == 0) {
            this.props.getListProductsByPrice(objDataOrder.CodeBaoGia)
        }
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
        this.checkImageExists(filename, function(existsImage) {
            if (existsImage == true) {
                that.props.addExistProduct(value)
                setTimeout(() => {
                    setTimeout(() => {
                        $(`#tr_${id + 1}`).find('input, textarea')[1].focus()
                    }, 200)
                    that.props.updateExistProduct(check[0])
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
            key: "value"
        }
        this.props.updateCellProducts(obj)
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
    render() {
        let { list_data, allChecked, listHeaderTabProduct } = this.props.stone
        let { list_products, listHeaderProducts, listProductsSelected, objDataOrder, discount, isEditProducts } = this.props.order
        let { listHeaderTableProductsByCombobox } = this.props.products
        let { status } = this.props.toolbar

        let checkbag = false
        if (objDataOrder.Check_bag) {
            checkbag = true
        }
        let totalmoney = 0
        let totalgoldweight = 0
        let totalmoneydiscount = 0
        return (
            <div>
                <button onClick={() => this._onButtonAddProduct()}>Thêm sản phẩm</button>
                {/* <ComboboxProducts disable={checkbag} type={"stone"} list_data={list_products} /> */}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {
                                listHeaderProducts.map((item, i) => {
                                    let { key, title } = item
                                    return (
                                        <th style={{ "textAlign": "left" }} key={`thead_${key}`} scope="col">{title}</th>
                                    )
                                })

                            }
                        </tr>
                    </thead>
                    <tbody id="table_product">
                        {listProductsSelected && listProductsSelected.map((item, i) => {
                            let { stt, value, url_image, color, size, Weight, WeightReal,
                                label, sl, tl, tlut, price, sum, IdOdd, list_set, price_basic,
                                sum_basic, isExists, index, remark, Image, isExistsBag } = item
                            let IdProductParent = value
                            // if (value && value.length > 0) {
                            totalmoney = totalmoney + (sum_basic || 0)
                            price = Helper.roundNumberPerThousand(price)
                            sum = Helper.roundNumberPerThousand(sum)
                            totalgoldweight = totalgoldweight + (WeightReal ? WeightReal * sl || 0 : Weight * sl || 0)
                            totalmoneydiscount = totalmoneydiscount + sum

                            // set url image
                            let filename = url_image ? Config.API_URL_IMAGE + url_image : "images/image-not-found.jpg"
                            return (
                                <tr key={`data_${i}`} id={`tr_${index}`}>
                                    <td>
                                        <div style={{ "border": "1px solid black", "display": "inline-block", "padding": "2px 2px" }}>
                                            <img src={filename} width="60px" height="60px" />
                                        </div>
                                    </td>
                                    <td>
                                        <input
                                            onKeyDown={(e) => this._onKeyPressCheckProduct(e, value, index)}
                                            readOnly={price > 0 ? true : false}
                                            id={index}
                                            style={{ "width": `100px` }}
                                            className={`name form-control`}
                                            type='text'
                                            value={value}
                                            onChange={e => this._onChangeProduct(e)}
                                            name="value" />
                                    </td>

                                    {/* <td onBlur={() => this._onBlurCheckProduct(value)}>
                                        <Cell typeInput="text" width="100px" readOnly={checkbag} value={value} keyInput="value" id={stt} parentObject={this} />
                                    </td> */}
                                    {/* <td><LinkProduct id={value} /></td> */}
                                    <Cell readOnly={isExistsBag} index={index} width="60px" value={sl} keyInput="sl" id={index} parentObject={this} />
                                    <td>
                                        <Combobox
                                            disable={isExistsBag}
                                            type_code='DSM' keyInput="color" id={index}
                                            value={color || '005'} parentObject={this}
                                            onChange={e => this.checkSameProducts(e)}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            onKeyPress={(e) => this._addProduct(e)}
                                            id={index}
                                            style={{ "width": `180px` }}
                                            className={`name form-control`}
                                            type='text'
                                            value={size}
                                            onChange={e => this._onChangeSize(e)}
                                            name="size" />
                                    </td>
                                    <td><button onClick={() => this._funcAddExistProduct(index, value, url_image)}><i className="fa fa-plus" aria-hidden="true"></i></button></td>
                                    <td>
                                        <Cell
                                            width="120px"
                                            id={index} value={remark || ''} className={`name form-control`}
                                            keyInput="remark" parentObject={this} name="remark" />
                                    </td>
                                    <td width="120px">{Helper.round(WeightReal ? WeightReal : Weight || 0, 4)}</td>
                                    <td width="100px">{Helper.round(WeightReal ? WeightReal * sl : Weight * sl || 0, 4)}</td>
                                    <Cell type="price_basic" readOnly={true} width="100px" value={SportConfig.function._formatMoney(price_basic)} keyInput="price_basic" id={index} parentObject={this} />
                                    <td width="100px">{SportConfig.function._formatMoney(sum_basic)}</td>
                                    <Cell type="price" readOnly={true} width="100px" value={SportConfig.function._formatMoney(Helper.roundNumberPerThousand(price))} keyInput="price" id={index} parentObject={this} />
                                    <td>{SportConfig.function._formatMoney(Helper.roundNumberPerThousand(sum))}</td>
                                    <td onClick={() => this._onRemove(item)}><button><i className="fa fa-trash-o" aria-hidden="true"></i></button></td>
                                    <td data-tip="hello world" className="button" >
                                        {IdOdd == "1" ? <div onMouseEnter={() => this._onView(item)} >
                                            <i className="fa fa-list-ol" aria-hidden="true" data-tip data-for='global'></i>
                                            <ReactTooltip id='global' aria-haspopup='true' role='example'>
                                                <p>Các sản phẩm bộ {value}</p>
                                                <table >
                                                    <thead>
                                                        <tr>
                                                            <th style={{ "color": "#fff" }} key={`thead_${0}`} scope="col">{'Mã sản phẩm'}</th>
                                                            <th style={{ "color": "#fff" }} scope="col">{'Giá'}</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {list_set && list_set.length > 0 &&
                                                      list_set.map((item, i) => {
                                                        let { Id, Price } = item;
                                                        return (
                                                          <tr
                                                            style={{ color: "#fff" }}
                                                            key={`dataDetail_${i}`}
                                                          >
                                                            <td
                                                              style={{
                                                                textAlign: "center",
                                                                color: "#fff"
                                                              }}
                                                            >
                                                              {Id || ""}
                                                            </td>
                                                            <td
                                                              style={{
                                                                textAlign: "center",
                                                                color: "#fff"
                                                              }}
                                                            >
                                                              {Price || ""}
                                                            </td>
                                                          </tr>
                                                        );
                                                      })}
                                                    </tbody>
                                                </table>
                                            </ReactTooltip>
                                        </div> : ''
                                        }</td>
                                </tr>)

                            // }
                        })}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td width="100px"><b>Tổng TL Vàng (Chỉ)</b>:</td>
                            <td></td>
                            <td><b>  {Helper.round(totalgoldweight, 4)}</b></td>
                            <td><b> Tổng thành tiền</b>:</td>
                            <td>{SportConfig.function._formatMoney(totalmoney)}</td>
                            <td><b>Discount</b>: {objDataOrder.discount}</td>
                            <td><b>Tổng TT sau discount</b>: </td>
                            <td>{SportConfig.function._formatMoney(totalmoneydiscount)}</td>

                        </tr>
                    </tbody>
                </table>

            </div>
        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    stone,
    header,
    products,
    order,
    toolbar
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        stone,
        header,
        products,
        order,
        toolbar
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...userActions,
        ...stoneActions,
        ...productsActions,
        ...orderActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TabProduct)
