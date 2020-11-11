import * as userActions from 'modules/login/actions/form'
import * as toolbarActions from 'modules/toolbar/actions/form'
import * as outputActions from 'modules/output/actions/form'
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
class OutputFormView extends React.Component {
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
        let checkExistsQty = false
        let { objDataOutput, ListProductByOrderOutput } = this.props.output
        if (objDataOutput.IdOutput == "") {
            this.child._addNotification(I18n.t(`Vui lòng nhập mã đơn hàng!!!`), 'warning')
            check = false
        }

        // sum qty by IdGroup
        let ListProductByOrderOutputGroup = [
            ...ListProductByOrderOutput.reduce(
                (map, item) => {
                    const { IdGroup: key, NumberTemp } = item;
                    const prev = map.get(key);

                    if (prev) {
                        prev.NumberTemp = parseFloat(NumberTemp || 0)
                    } else {
                        map.set(key, Object.assign({}, item))
                    }

                    return map
                },
                new Map()
            ).values()
        ]

        // sum qty by Product Parent
        ListProductByOrderOutputGroup = [
            ...ListProductByOrderOutputGroup.reduce(
                (map, item) => {
                    const { IdProductParentColor: key, NumberTemp } = item;
                    const prev = map.get(key);

                    if (prev) {
                        prev.NumberTemp += parseFloat(NumberTemp || 0)
                    } else {
                        map.set(key, Object.assign({}, item))
                    }

                    return map
                },
                new Map()
            ).values()
        ]

        ListProductByOrderOutputGroup.map((item) => {
            let { Number, IdProduct, NumberTemp, ProductsEachOutput } = item
            ProductsEachOutput = ProductsEachOutput || 0
            let slremain = 0

            if (Number > 0 && ProductsEachOutput == 0) {
                slremain = Number
            } else {
                slremain = parseInt(Number) - parseInt(ProductsEachOutput || 0)
            }

            if (slremain == 0) {
                this.child._addNotification(`Số lượng còn lại đã hết`, 'warning')
                check = false
                return
            }
            if (parseInt(NumberTemp) > slremain) {
                this.child._addNotification(`Số lượng xuất của sản phẩm ${IdProduct} xuất vượt quá số lượng đặt `, 'warning')
                check = false
                return
            }
        })
        ListProductByOrderOutput.map((item) => {
            if (parseInt(item.NumberTemp) > 0)
                checkExistsQty = true
        })
        if (!checkExistsQty) {
            this.child._addNotification(`Vui lòng nhập số lượng xuất.`, 'warning')
            check = false
            return
        }

        return check
    }
    componentWillUnmount() {
        this.props.updateButtonToolbar('')
        this.props.resetDataOutPut()
    }
    componentWillMount() {
        $("#admin_css").attr("href", "");
    }
    ChangeButton(value) {
        let isStatus = true
        let { objDataOutput, listProductsSelected, ListProductByOrderOutput } = this.props.output
        let { status } = this.props.toolbar
        switch (value) {
            case "SAVE":
                let { status } = this.props.toolbar
                if (status == '') {
                    isStatus = false
                    break
                }
                let ListProduct_temp = _.clone(ListProductByOrderOutput, true)
                let ListProductOdd = _.clone(ListProductByOrderOutput, true)
                ListProductOdd = ListProductOdd.filter(x => x.IdOdd == "1")
                // sum Weight stone
                const sumsWeightStone = [
                    ...ListProductOdd.reduce(
                        (map, item) => {
                            const { IdProductParentColor: key, WeightCustom } = item;
                            const prev = map.get(key);

                            if (prev) {
                                prev.WeightCustom += parseFloat(WeightCustom || 0)
                            } else {
                                map.set(key, Object.assign({}, item))
                            }

                            return map
                        },
                        new Map()
                    ).values()
                ]
                // sum sumsWeightProduct
                const sumsWeightProduct = [
                    ...ListProductOdd.reduce(
                        (map, item) => {
                            const { IdProductParentColor: key, WeightProduct } = item;
                            const prev = map.get(key);

                            if (prev) {
                                prev.WeightProduct += parseFloat(WeightProduct || 0)
                            } else {
                                map.set(key, Object.assign({}, item))
                            }

                            return map
                        },
                        new Map()
                    ).values()
                ]
                let ListProduct_temp_new = []
                ListProduct_temp.map((item, i) => {
                    if (item.IdOrder) {
                        item.WeightTotal = 0
                        item.WeightProductTotal = 0
                        item.WeightGoldTotal = 0
                        if (item.IdOdd == "1") {
                            sumsWeightStone.map((itemWeight) => {
                                if (itemWeight.IdProductParentColor == item.IdProductParentColor)
                                    item.WeightTotal = itemWeight.WeightCustom
                            })
                            sumsWeightProduct.map((itemWeightProduct) => {
                                if (itemWeightProduct.IdProductParentColor == item.IdProductParentColor)
                                    item.WeightProductTotal = itemWeightProduct.WeightProduct
                            })
                        }
                        item.WeightGoldTotal = item.WeightProductTotal - item.WeightTotal
                        item.OrderByData = i + 1
                        ListProduct_temp_new.push(item)
                    }

                })

                // isStatus = false
                if (status == 'EDIT') {
                    this.props.updateItemOutput().then(res => {
                        this.props.addListProductByOutput(ListProduct_temp_new).then(res => {
                            this.child._addNotification(I18n.t(`Cập nhật thành công!!!`), 'success')
                            this.props.getListDataOutPut()
                        })
                    })
                } else {
                    if (this._validateSave()) {
                        this.props.addNewItemOutput()
                            .then(res => {
                                this.props.addListProductByOutput(ListProduct_temp_new).then(res => {
                                    this.child._addNotification(I18n.t(`Cập nhật thành công!!!`), 'success')
                                    this.props.getListDataOutPut()
                                })
                            })
                    }
                    else {
                        isStatus = false
                    }
                }
                break;
            case "ADD":
                this.props.resetDataOutPut()
                this.props.isEditOutPut(true)
                break;
            case "EDIT":
                if (objDataOutput.IdOutput) {
                    this.props.isEditOutPut(true)
                } else {
                    isStatus = false
                    this.child._addNotification(I18n.t('Vui lòng chọn dòng cần sửa !!!'), 'warning')
                }
                break;
            case "DELETE":
                isStatus = false
                if (objDataOutput && objDataOutput.IdOutput) {
                    var r = confirm(I18n.t(`alert.delete`));
                    if (r == true) {
                        this.props.deleteItemOutput({ id: objDataOutput.IdOutput }).then(res => {
                            this.child._addNotification(I18n.t('Xoá thành công'), 'success')
                        })
                    }
                } else {
                    this.child._addNotification(I18n.t('alert.please_select_delete'), 'warning')
                }
                break;
            default:
                this.props.isEditOutPut(false)
                break;
        }
        if (isStatus) {
            this.props.updateButtonToolbar(value)
        }
    }
    checkSameProducts() {
        let isCheck = true
        let { listProductsSelected } = this.props.order
        let listProductsSelected_temp = listProductsSelected
        if (listProductsSelected.length > 0) {
            listProductsSelected.map((item, i) => {
                let { value, color } = item
                let check = listProductsSelected_temp.filter(x => x.value == value && x.color == color)
                if (check.length > 1) {
                    isCheck = false
                }
            })
        }
        if (!isCheck) {
            this.child._addNotification(I18n.t(`order.same_id_products`), 'warning')
        }
        return isCheck
    }
    render() {
        let { isDetail } = this.props.output
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
    output,
    toolbar
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        list,
        header,
        output,
        toolbar
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...userActions,
        ...listActions,
        ...outputActions,
        ...toolbarActions,
        ...headerActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(OutputFormView)
