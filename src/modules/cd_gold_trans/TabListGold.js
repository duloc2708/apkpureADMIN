import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import * as castingProcActions from 'modules/cd_gold_trans/actions/form'
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
class TabListGold extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        $(".allownumericwithdecimal").on("keypress keyup blur", function (event) {
            $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
            if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });
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
            let { listGoldSelected, list_bag_default, objDataOrder, list_products_by_baogia, objConfig, objData } = this.props.cd_gold_trans
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
            let checkList = listGoldSelected.filter(x => x.IdBag.toUpperCase() == IdBag.toUpperCase())
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

    _onChangeGoldReal(e) {
        let { id, value } = e.target
        let obj = {
            id: id, value: value, key: "ValueLV_Real"
        }
        this.props.updateCellBag(obj)
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
    _onButtonAddRow() {
        this.props.addItemBagNew()

    }
    onKeyPressInput(obj) {
        if (obj.key == 'ValueLV_Real') {
            this.props.addItemBagNew()
            setTimeout(() => {
                $('#tbodyGold > tbody  > tr').each(function (i, item) {
                    // focus row next
                    let all_rows = $('#tbodyGold >tbody >tr').length;
                    if (i == all_rows - 2) {
                        $(item).find('input, textarea')[0].focus()
                    }
                });
            }, 200)
        }
    }
    changeValueNumber(obj) {
        this.props.updateCellBag(obj)
    }
    onClickButtonNoPermission(obj) {
        let { key, data } = obj
        switch (key) {
            case "BTN_COPY_WEIGHT":
                this.props.copyDataWeight(data)
                break;
            case "BTN_COPY_GOLD":
                this.props.copyDataGold(data)
                break;
            case "DELETE_WEIGHT_GOLD":
                this.props.deleteItemWeightGold(data)
                break;
            default:
                break;

        }
    }

    render() {
        let { status } = this.props.toolbar
        let { listHeaderBag, listHeaderGoldCustom, listGoldSelected, isEditProducts, isShowStone, objConfig, listHeaderGold } = this.props.cd_gold_trans
        let totalmoney = 0
        let totalgoldweight = 0
        let totalmoneydiscount = 0
        let totalweight10 = 0
        let totalweight10real = 0
        let { IsIncludeInOut } = objConfig
        listGoldSelected = _.orderBy(listGoldSelected, 'orderby', 'asc')
        return (
            <div>
                <AlertCustom onRef={ref => (this.child = ref)} />
                <hr />
                <button onClick={() => this._onButtonAddRow()}>Thêm</button>
                <CustomTable
                    idTable='tbodyGold'
                    idBody='table_product'
                    list_col={listHeaderGoldCustom}
                    list_data={listGoldSelected}
                    parentObject={this}
                />
            </div>
        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    header,
    cd_gold_trans,
    toolbar
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        header,
        cd_gold_trans,
        toolbar
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...castingProcActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TabListGold)
