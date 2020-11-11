import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import * as castingProcActions from 'modules/cd_cash_trans/actions/form'
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
            let { listBagSelected, list_bag_default, objDataOrder, list_products_by_baogia, objConfig, objData } = this.props.cd_cash_trans
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
            let checkList = listBagSelected.filter(x => x.IdBag.toUpperCase() == IdBag.toUpperCase())
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
        console.log('>>>>>', obj);

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
        let { status } = this.props.toolbar
        let { listHeaderBag, listOutputByCustomer, isEditProducts, isShowStone, objConfig, listHeaderOutputOfCus } = this.props.cd_cash_trans
        let v_total_gold_adjust = 0,
             v_total_gold_10_adjust = 0,        
             v_total_gold = 0,   
             v_total_amount=0,
             v_total_org_amount=0
        return (
            <div>
                <AlertCustom onRef={ref => (this.child = ref)} />
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
                <hr />
                <label htmlFor="name">Danh sách phiếu xuất của khách hàng</label>
                {/* <ComboboxProducts disable={checkbag} type={"stone"} list_data={list_products} /> */}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {
                                listHeaderOutputOfCus.map((item, i) => {
                                    let { key, title } = item
                                    return (
                                        <th style={{ "textAlign": "left" }} key={`thead_${key}`} scope="col">{title}</th>
                                    )
                                })

                            }
                        </tr>
                    </thead>
                    <tbody id="table_product">
                        {listOutputByCustomer && listOutputByCustomer.map((item, i) => {
                            let { index,
                                IdOutput
                                , IdCustomer
                                , IdOrder
                                , DayMake
                                , StatusOutput
                                , Remark
                                , discount
                                , IsDeleted
                                , total_org_amount
                                , total_amount
                                , total_gold
                                , total_gold_adjust
                                , total_gold_10
                                , total_gold_10_adjust
                                , total_product_w
                                , total_qty
                                , total_amount_adjust
                                , saleman
                                , DayConfirm
                                , DayFinish
                                , DayDeliver
                                ,nameLAI
                                ,ValueLAI
                            } = item
                             v_total_gold_adjust = v_total_gold_adjust+(total_gold_adjust)
                            v_total_gold_10_adjust = v_total_gold_10_adjust+total_gold_10_adjust
                            v_total_gold = v_total_gold+total_gold
                            v_total_amount=v_total_amount+parseInt(total_amount)
                            v_total_org_amount=v_total_org_amount+parseInt(total_org_amount)
                            return (
                                <tr key={`data_${i}`} id={`tr_${index}`}>
                                    <td>{IdOutput}</td>
                                    <td>{moment.utc(DayMake || new Date()).format('DD/MM/YYYY HH:mm:ss')}</td>
                                    <td>{moment.utc(DayDeliver || new Date()).format('DD/MM/YYYY HH:mm:ss')}</td>
                                    <td>{SportConfig.function._formatMoney(total_org_amount)}</td>
                                    <td>{discount}</td>
                                    <td>{SportConfig.function._formatMoney(total_amount)}</td>
                                    <td>{total_gold_adjust}</td>
                                    <td>{total_gold}</td>
                                    <td>{total_gold_10_adjust}</td>
                                    <td>{nameLAI}</td>
                                    <td>{ValueLAI}</td>
                                </tr>)
                            // }
                        })}
                        <tr>
                            <td></td>
                            <td></td>
                            <td>Tổng</td>
                            <td>{SportConfig.function._formatMoney(v_total_org_amount)}</td>
                            <td></td>
                            <td>{SportConfig.function._formatMoney(v_total_amount)}</td>
                            <td>{SportConfig.function._formatGold(v_total_gold_adjust)}</td>
                            <td>{SportConfig.function._formatGold(v_total_gold)}</td>
                            <td>{SportConfig.function._formatGold(v_total_gold_10_adjust)}</td>
                            <td></td>
                            <td></td>
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
    cd_cash_trans,
    toolbar
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        header,
        cd_cash_trans,
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
