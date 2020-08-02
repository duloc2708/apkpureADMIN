import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import * as castingProcActions from 'modules/ticket_proc/actions/form'
import ModalStoneBrokenFormView from './ModalStoneBrokenFormView'
import Modal from 'react-modal';
const { Translate, I18n } = ReactReduxI18n;

const customStyles = {
    content: {
        top: '52%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};
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
        this.props.updateCellProducts(value)
    }
    _onRemove(item) {
        var r = confirm(I18n.t(`alert.delete`));
        if (r == true) {
            this.props.removeItemStone(item)
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
            console.log('IdBag>>>>', IdBag);

            let { list_bag_default, objDataOrder, list_products_by_baogia } = this.props.ticket_proc
            let list_bag_default_temp = _.clone(list_bag_default, true)
            let check = list_bag_default_temp.filter(x => x.Id.toUpperCase() === IdBag.toUpperCase())
            if (check.length == 0) {
                alert('Bag này không tồn tại!.')
            } else {
                setTimeout(() => {
                    $(`#tr_${index}`).find('input, textarea')[1].focus()
                }, 200)
                that.props.updateExistBag(check[0])
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
        let { objDataOrder, listProductsSelected, isEditProducts, list_products_by_baogia } = this.props.order
        let { status } = this.props.toolbar
        if (!objDataOrder.IdCustomer) {
            alert('Vui lòng chọn khách hàng')
            return
        }
        if (!objDataOrder.CodeBaoGia) {
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
        this.checkImageExists(filename, function (existsImage) {
            if (existsImage == true) {
                that.props.addExistProduct(value)
                setTimeout(() => {
                    setTimeout(() => {
                        $(`#tr_${id + 1}`).find('input, textarea')[1].focus()
                    }, 200)
                    that.props.updateExistBag(check[0])
                }, 200)
            }
            else {
                alert("Hình ảnh không tồn tại.")
            }
        })
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
            id: id, value: value, key: "IdBag"
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
        this.props.getListStoneWaxsetByIdBag(item)
    }
    _saveWeightStone() {
        this.props.saveWeightStone()
    }
    closeModal() {
        this.props.showFormStone(false)
    }
    render() {
        let { status } = this.props.toolbar
        let { listHeaderBag, listBagSelected, isEditProducts, isShowStone, objConfig } = this.props.ticket_proc
        let totalmoney = 0
        let totalgoldweight = 0
        let totalmoneydiscount = 0
        let { IsIncludeInOut } = objConfig
        return (
            <div>
                <Modal
                    isOpen={isShowStone}
                    // onAfterOpen={() => this.afterOpenModal()}
                    // onRequestClose={() => this.closeModal()}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <ModalStoneBrokenFormView />
                    <hr />
                    <div>
                        <div style={{ "textAlign": "right" }}>
                            <button onClick={() => this._saveWeightStone()}>Lưu</button>
                            <button onClick={() => this.closeModal()}>Đóng</button>
                        </div>
                    </div>

                </Modal>
                <button onClick={() => this._onButtonAddProduct()}>Thêm sản phẩm</button>
                {/* <ComboboxProducts disable={checkbag} type={"stone"} list_data={list_products} /> */}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {
                                listHeaderBag.map((item, i) => {
                                    let { key, title } = item
                                    return (
                                        <th style={{ "textAlign": "left" }} key={`thead_${key}`} scope="col">{title}</th>
                                    )
                                })

                            }
                        </tr>
                    </thead>
                    <tbody id="table_product">
                        {listBagSelected && listBagSelected.map((item, i) => {
                            let { index
                                , CodeProcess
                                , CodeTicket
                                , IdBag
                                , IdOrder
                                , ValueLV
                                , Notes
                                , Waxset_Weight
                                , Product_Weight_IN
                                , Broken_Weight_IN
                                , Gold_Weight_IN
                                , Product_Weight_OUT
                                , Broken_Weight_OUT
                                , Gold_Weight_OUT
                                , Gold_Lost
                                , Worker
                                , orderby
                            } = item
                            return (
                                <tr key={`data_${i}`} id={`tr_${index}`}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <input
                                            onKeyDown={(e) => this._onKeyPressCheckBag(e, IdBag, index)}
                                            // readOnly={isEditProducts == 'block' ? true : IdBag}
                                            id={index}
                                            style={{ "width": `70px` }}
                                            className={`name form-control`}
                                            type='text'
                                            value={IdBag}
                                            onChange={e => this._onChangeProduct(e)}
                                            name="IdBag" />
                                    </td>
                                    {IsIncludeInOut != 0 ?
                                        [
                                            <td>
                                                <Cell
                                                    width="90px"
                                                    id={index} value={Product_Weight_IN || ''} className={`name form-control`}
                                                    keyInput="Product_Weight_IN" parentObject={this} name="Product_Weight_IN" />
                                            </td>,
                                            <td>
                                                <div>
                                                    <div style={{ float: "left", width: "10px" }} >
                                                        <Cell readOnly={true}
                                                            width="70px"
                                                            id={index} value={Broken_Weight_IN || ''} className={`name form-control`}
                                                            keyInput="Broken_Weight_IN" parentObject={this} name="Broken_Weight_IN" />
                                                    </div>
                                                    <div style={{ float: "left", width: "40px" }} >
                                                        <button onClick={() => this._ShowFormStone('IN', item)}><i className="fa fa-calculator" aria-hidden="true"></i></button>
                                                    </div>
                                                </div>
                                            </td>,
                                            <td>
                                                <Cell
                                                    width="90px"
                                                    id={index} value={Gold_Weight_IN || ''} className={`name form-control`}
                                                    keyInput="Gold_Weight_IN" parentObject={this} name="Gold_Weight_IN" />
                                            </td>
                                        ] : ''
                                    }
                                    <td>
                                        <Cell
                                            width="120px"
                                            id={index} value={Product_Weight_OUT || ''} className={`name form-control`}
                                            keyInput="Product_Weight_OUT" parentObject={this} name="Product_Weight_OUT" />
                                    </td>
                                    <td>
                                        <div>
                                            <div style={{ float: "left", width: "70px" }} >
                                                <Cell readOnly={true}
                                                    width="70px"
                                                    id={index} value={Broken_Weight_OUT || ''} className={`name form-control`}
                                                    keyInput="Broken_Weight_OUT" parentObject={this} name="Broken_Weight_OUT" />
                                            </div>
                                            <div style={{ float: "left", width: "40px" }} >
                                                <button onClick={() => this._ShowFormStone('IN', item)}><i className="fa fa-calculator" aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <Cell
                                            width="90px"
                                            id={index} value={Gold_Weight_OUT || ''} className={`name form-control`}
                                            keyInput="Gold_Weight_OUT" parentObject={this} name="Gold_Weight_OUT" />
                                    </td>
                                    <td>
                                        <Cell
                                            readOnly={true}
                                            width="90px"
                                            id={index} value={Waxset_Weight || ''} className={`name form-control`}
                                            keyInput="Waxset_Weight" parentObject={this} name="Waxset_Weight" />
                                    </td>
                                    <td>
                                        {Worker}
                                    </td>
                                    <td>
                                        {IdOrder}
                                    </td>
                                    
                                    <td onClick={() => this._onRemove(item)}><button><i className="fa fa-trash-o" aria-hidden="true"></i></button></td>
                                </tr>)
                            // }
                        })}
                        <tr>
                            {IsIncludeInOut != 0 ?
                                [<td></td>,
                                <td></td>,
                                <td></td>
                                ] : ''
                            }
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><b>Tổng TL đá waxset </b>:</td>
                            <td><b> Tổng TL đá handset </b>:</td>
                            <td><b>Tổng TL (vàng + đá) Trừ đá rớt </b>: </td>
                            <td><b>Tổng TL đá rớt </b>: </td>
                            <td><b>Tổng TL vàng  </b>: </td>
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
    header,
    ticket_proc,
    toolbar
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        header,
        ticket_proc,
        toolbar
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...castingProcActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TabProduct)
