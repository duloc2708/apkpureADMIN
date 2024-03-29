import * as userActions from 'modules/login/actions/form'
import * as toolbarActions from 'modules/toolbar/actions/form'
import * as orderActions from 'modules/order/actions/form'
import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import * as listActions from 'modules/list/actions/form'
import DetailFormView from './DetailFormView'
import ListFormView from './ListFormView'
import * as headerActions from 'modules/header/actions/form'

const { Translate, I18n } = ReactReduxI18n;
class ProductFormView extends React.Component {
    constructor() {
        super()
        this.state = {
            code: '',
            name: '',
            status: false,
            id: 0,
            isSave: ''
        }
    }
    _validateSave() {
        let check = true
        let { objDataOrder, listProductsSelected } = this.props.order
        if (objDataOrder.IdOrder == "") {
            this.child._addNotification('Vui lòng chọn khách hàng', 'warning')
            return false
        }
        if (objDataOrder.CodeLV == "") {
            this.child._addNotification('Vui lòng chọn loại vàng', 'warning')
            return false
        }
        if (objDataOrder.CodeLH == "") {
            this.child._addNotification('Vui lòng chọn loại hội', 'warning')
            return false
        }
        if (objDataOrder.CodeMX == "") {
            this.child._addNotification('Vui lòng chọn màu xi', 'warning')
            return false
        }
        if (objDataOrder.CodeLAI == "") {
            this.child._addNotification('Vui lòng chọn lai', 'warning')
            return false
        }


        let check_size_temp = []
        listProductsSelected.map((item, i) => {
            if (i < listProductsSelected.length - 1) {
                check_size_temp.push(item)
            }
        })

        let check_product = check_size_temp.filter(x => x.value == '')
        if (check_product.length > 0) {
            this.child._addNotification('Vui lòng chọn sản phẩm', 'warning')
            return false
        }

        let check_size = check_size_temp.filter(x => x.size == '')
        if (check_size.length > 0) {
            this.child._addNotification('Vui lòng nhập size cho sản phẩm', 'warning')
            return false
        }
        return check
    }
    componentWillUnmount() {
        this.props.updateButtonToolbar('')
        this.props.resetDataOrder()
    }
    componentWillMount() {
        $("#admin_css").attr("href", "");
    }
    ChangeButton(value) {
        let isStatus = true
        let { objDataOrder, listProductsSelected } = this.props.order
        let { status } = this.props.toolbar
        switch (value) {
            case "PRINT":
                break;
            case "SAVE":
                let { status } = this.props.toolbar
                if (status == '') {
                    isStatus = false
                    break
                }
                if (this._validateSave() && this.checkSameProducts()) {
                    if (status == 'EDIT') {
                        this.props.updateItemOrder().then(res => {
                            this.props.addListProductByOrder().then(res => {
                                this.child._addNotification('Cập nhật thành công!!!', 'success')
                                this.props.getListDataOrder()
                            })
                        })
                    } else {
                        this.props.addNewItemOrder()
                            .then(res => {
                                this.props.addListProductByOrder().then(res => {
                                    this.child._addNotification('Cập nhật thành công!!!', 'success')
                                    this.props.getListDataOrder()
                                })
                            })
                    }
                } else {
                    isStatus = false
                }
                break;
            case "ADD":
                this.props.resetDataOrder().then(() => {
                    this.props.getListDataBaoGiaInOrder({
                        page: 1,
                        total: 1000
                    })
                })
                this.props.isEditOrder(true)

                break;
            case "EDIT":
                if (objDataOrder.IdOrder) {
                    this.props.isEditOrder(true)
                } else {
                    isStatus = false
                    this.child._addNotification('Vui lòng chọn dòng cần sửa !!!', 'warning')
                }
                break;
            case "DELETE":
                isStatus = false
                if (objDataOrder && objDataOrder.IdOrder) {
                    var r = confirm(I18n.t(`alert.delete`));
                    if (r == true) {
                        this.props.deleteItemOrder({ id: objDataOrder.IdOrder }).then(res => {
                            this.child._addNotification('Xoá thành công', 'success')
                            this.props.getListDataOrder()
                        })
                    }
                } else {
                    this.child._addNotification(I18n.t(`alert.please_select_delete`), 'warning')
                }
                break;
            // isStatus = false
            // if (objDataOrder && objDataOrder.IdOrder) {
            //     this.props.deleteItemOrder({ id: objDataOrder.IdOrder }).then(res => {
            //         alert('Xoá thành công')
            //         this.props.getListDataOrder()
            //     })
            // } else {
            //     alert('Vui lòng chọn dòng cần xoá !!!')
            // }
            // break;
            default:
                this.props.isEditOrder(false)
                break;
        }
        if (isStatus) {
            this.props.updateButtonToolbar(value)
        }
    }
    checkSameProducts() {
        let isCheck = true, type = 0, mes = ''
        let { listProductsSelected } = this.props.order
        let listProductsSelected_temp = _.clone(listProductsSelected)
        listProductsSelected_temp = listProductsSelected_temp.map(item => {
            item.productsColor = item.value + '' + item.color
            item.countProducts = 1
            return item
        })
        // sum Weight stone
        const sumsProducts = [
            ...listProductsSelected_temp.reduce(
                (map, item) => {
                    const { productsColor: key, countProducts } = item;
                    const prev = map.get(key);

                    if (prev) {
                        prev.countProducts += 1
                    } else {
                        map.set(key, Object.assign({}, item))
                    }

                    return map
                },
                new Map()
            ).values()
        ]
        sumsProducts.map(item => {
            if (item.countProducts > 1) {
                let { list_data_all } = this.props.list
                let data_temp = list_data_all && list_data_all.filter(x => x.type_code == 'DSM')
                data_temp = data_temp.filter(x => x.code == item.color)
                mes = `Sản phẩm ${item.value} có màu ${data_temp[0].name} bị trùng!`
                type = 2
                return
            }
        })

        switch (type) {
            // case 1:
            //     this.child._addNotification(I18n.t(`order.please_input_color`), 'warning')
            //     isCheck = false
            //     break;
            case 2:
                this.child._addNotification(mes, 'warning')
                isCheck = false
                break;
            default:
                break
        }
        return isCheck
    }

    render() {
        let { isDetail } = this.props.order
        return (
            <div className="container">
                <AlertCustom onRef={ref => (this.child = ref)} />

                <section >
                    {/* <BrackcrumFromView /> */}
                    <div className="main__content">
                        <ToolbarFormView parentObject={this} />
                        {isDetail ?
                            <DetailFormView /> :
                            <ListFormView />
                        }
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    list,
    header,
    order,
    toolbar
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        list,
        header,
        order,
        toolbar
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...userActions,
        ...listActions,
        ...orderActions,
        ...toolbarActions,
        ...headerActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ProductFormView)
