import DetailFormView from './DetailFormView'
import ListFormView from './ListFormView'
const { Translate, I18n } = ReactReduxI18n;
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import * as toolbarActions from 'modules/toolbar/actions/form'
import * as cd_turn_inout_Actions from 'modules/cd_turn_inout/actions/form'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'

class CdTurnInOutFormView extends React.Component {
    constructor() {
        super()
        this.state = {
            inputSearch: ''
        }
    }
    componentDidMount() {
        this.props.getListProductsSet()
    }
    componentWillMount() {
        const type = Helper.getParam(window.location.href, 'type')
        this.props.updateTurnType(type)

    }
    componentWillUnmount() {
        this.props.resetData()
    }
    _validateSave() {
        let { listProductsNotAccept, objData, list_products_inv, listProductSelected, isSave } = this.props.cd_turn_inout
        let type = Helper.getParam(window.location.href, 'type')
        let checktype = 0
        let IdProduct = ''
        // Vui lòng chọn loại vàng
        if (checktype == 0 && !objData.codeLV && objData.Trans_Type!=="TURN_TRANS_TYPE_04") checktype = 6
        // Vui lòng chọn loại trả/ xuất hàng
        if (checktype == 0 && !objData.Trans_Type) checktype = 7
        // Nếu là tái xuất hàng cho khách hàng thì bắt buộc nhập khách hàng
        if (checktype == 0 && type == 1 && objData.Trans_Type == 'TURN_TRANS_TYPE_03' && !objData.IdCustomer) checktype = 8

        if (listProductSelected.length == 0) checktype = 1
        // Vui lòng chọn loại trả/ xuất hàng
        if (checktype == 0) {
            let codeLVTemp = ''
            let codeSameComboLVLHMX = ''
            listProductSelected.map(item => {
                let { CodeLV, CodeLH, CodeMX } = item
                // // kiểm tra cùng loại vàng
                // if (codeLVTemp && CodeLV != codeLVTemp) {
                //     checktype = 2
                //     return false
                // }
                if (!item.url_image) {
                    checktype = 11
                    IdProduct = item.IdProduct
                    return false
                }
                // kiểm tra cùng loại vàng, màu xi , loại hội
                if (codeSameComboLVLHMX && codeSameComboLVLHMX != CodeLV + CodeLH + CodeMX) {
                    checktype = 3
                    return false
                }
                codeSameComboLVLHMX = CodeLV + CodeLH + CodeMX
                codeLVTemp = CodeLV
            })
        }
        // // kiểm tra tồn kho trước khi lưu
        if (checktype == 0) {
            listProductSelected.map(item => {
                if (!item.Qty) {
                    checktype = 5
                    return false
                }
            })
        }
        // // kiểm tra tồn kho trước khi lưu
        if (checktype == 0 && objData.Status != 'STATUS_TURN_INOUT_02') {
            if (type == 1) {
                let list_products_invTemp = _.clone(list_products_inv, true)
                listProductSelected.map(item => {
                    let findItem = list_products_invTemp.filter(
                        x => x.IdProduct == item.IdProduct &&
                            x.CodeLH == item.CodeLH &&
                            x.CodeLV == item.CodeLV &&
                            x.CodeMX == item.CodeMX &&
                            x.Color == item.Color)
                    if (findItem[0] && parseInt(item.Qty || 0) > findItem[0].TotalREMAIN) {
                        checktype = 4
                        IdProduct = item.IdProduct
                        return false
                    }

                })
            }
        }
        // // kiểm tra các sản phẩm phải cùng loại vàng
        if (checktype == 0) {
            listProductSelected.map(item => {
                let { CodeLV, CodeLH, CodeMX } = item
                if (CodeLV != objData.codeLV) {
                    checktype = 2
                    return false
                }
            })
        }
        // // kiểm tra nhập vượt số lượng hiện tại so với số lượng tìm kiếm
        if (checktype == 0) {
            listProductSelected.map(item => {
                let { QtySearch, Qty } = item
                if (QtySearch && Qty && parseInt(Qty) > parseInt(QtySearch)) {
                    checktype = 9
                    IdProduct = item.IdProduct
                    return false
                }
            })
        }

        if (!objData.Status && objData.Status != 'STATUS_TURN_INOUT_02') {
            // kiểm tra tồn kho
            listProductSelected.map(item => {
                let itemINV = list_products_inv.filter(x => x.Genkey == item.Genkey)
                let itemNotAccept = listProductsNotAccept.filter(x => x.Genkey == item.Genkey && item.TicketCode != objData.TicketCode)
                let qtyNotAccept = 0
                let totalInv = 0
                if (itemINV.length > 0) {
                    totalInv = itemINV[0].TotalREMAIN
                    if (itemNotAccept && itemNotAccept.length > 0) {
                        totalInv = totalInv - itemNotAccept[0].Qty
                    }
                    if (item.Qty > totalInv) {
                        checktype = 10
                        IdProduct = item.IdProduct
                        return false
                    }
                }
            })
        }

        switch (checktype) {
            case 1:
                alert('Vui lòng chọn sản phẩm!')
                break;
            // case 2:
            //     alert('Các sản phẩm phải trùng loại vàng')
            //     break;
            case 3:
                alert('Vui lòng chọn sản phẩm cùng loại vàng, màu xi, loại hội ')
                break;
            // case 4:
            //     alert(`Số lượng sản phẩm ${IdProduct} lớn hơn tồn kho`)
            //     break;
            case 5:
                alert(`Vui lòng nhập đầy đủ số lượng`)
                break;
            case 6:
                alert(`Vui lòng chọn loại vàng`)
                break;
            case 7:
                alert(`Vui lòng chọn loại trả/ xuất hàng`)
                break;
            case 8:
                alert(`Vui lòng chọn khách hàng`)
                break;
            case 9:
                alert(`Số lượng sản phẩm ${IdProduct} nhập vượt số lượng sản phẩm tìm kiếm`)
                break;
            case 10:
                alert(`Số lượng sản phẩm ${IdProduct} nhập vượt số lượng tồn kho`)
                break;
            case 11:
                alert(`Sản phẩm ${IdProduct} không tồn tại trong hệ thống`)
                break;
            default:
                break
        }
        if ([1, 3, 5, 6, 7, 8, 9, 10, 11].indexOf(checktype) != -1) {
            return false
        }
        return true
    }
    ChangeButton(value) {
        let valueTemp = value
        let isStatus = true
        let { objData, listProductSelected, isSave } = this.props.cd_turn_inout
        let { status } = this.props.toolbar
        if (isSave) {
            alert('Dữ liệu hệ thống đang lưu, vui lòng đợi!')
        } else {
            switch (valueTemp) {
                case "PRINT":
                    break;
                case "SAVE":
                    if (status == '') {
                        isStatus = false
                        break
                    }
                    if (this._validateSave()) {
                        if (status == 'EDIT') {
                            this.props.updateItem()
                                .then(res => {
                                    this.props.updateButtonToolbar('EDIT').then(() => {
                                        this.child._addNotification('Cập nhật thành công!!!', 'success')
                                        // this.props.addListProductByOrder()
                                    })
                                })
                        } else {
                            this.props.getNumberAuto().then(() => {
                                this.props.addNewItem()
                                    .then(res => {
                                        this.props.updateButtonToolbar('EDIT').then(() => {
                                            this.child._addNotification('Cập nhật thành công!!!', 'success')
                                            // this.props.addListProductByOrder()
                                        })
                                    })
                            })

                        }
                    } else {
                        isStatus = false
                        break
                    }
                    break;

                case "SAVEANDCLOSE":
                    if (status == '') {
                        isStatus = false
                        break
                    }
                    if (this._validateSave()) {
                        if (status == 'EDIT') {
                            this.props.updateItem()
                                .then(res => {
                                    this.props.updateButtonToolbar('').then(() => {
                                        this.props.resetData().then(() => {
                                            this.child._addNotification('Cập nhật thành công!!!', 'success')
                                            this.props.getListDataCdTurn('')
                                        })
                                    })
                                })
                        } else {
                            this.props.getNumberAuto().then(() => {
                                this.props.addNewItem()
                                    .then(res => {
                                        this.props.updateButtonToolbar('').then(() => {
                                            this.props.resetData().then(() => {
                                                this.child._addNotification('Cập nhật thành công!!!', 'success')
                                                this.props.getListDataCdTurn('')
                                            })
                                        })
                                    })
                            })

                        }
                    } else {
                        isStatus = false
                        break
                    }
                    break;

                    break;
                case "ADD":
                    this.props.updateButtonToolbar(valueTemp)
                    this.props.isEditCasting(true)
                    this.props.initAdd()
                    break;
                case "EDIT":
                    if (objData.IDCasting) {
                        this.props.isEditCasting(true)
                        this.props.getDataDetailByCode()
                        this.props.getDataDetailStoneByCode()
                        this.props.updateButtonToolbar(valueTemp)
                    } else {
                        isStatus = false
                        this.child._addNotification('Vui lòng chọn dòng cần sửa !!!', 'warning')
                    }
                    break;
                case "CANCEL":
                    var r = confirm(`Bạn có muốn huỷ/thoát form này? `)
                    if (r == true) {
                        this.props.isEditCasting(false)
                        this.props.updateButtonToolbar(valueTemp)
                    } else {
                        isStatus = false
                    }
                    break;
                case "DELETE":
                    // isStatus = false
                    // if (objDataOrder && objDataOrder.IdOrder) {
                    //     var r = confirm(I18n.t(`alert.delete`));
                    //     if (r == true) {
                    //         this.props.deleteItemOrder({ id: objDataOrder.IdOrder }).then(res => {
                    //             this.child._addNotification('Xoá thành công', 'success')
                    //             this.props.getListDataCdTurnOrder()
                    //         })
                    //     }
                    // } else {
                    //     this.child._addNotification(I18n.t(`alert.please_select_delete`), 'warning')
                    // }
                    break;
                default:

                    break;
            }
        }


    }
    render() {
        let { isDetail } = this.props.cd_turn_inout
        let { list_config_process } = this.props.header
        const type = Helper.getParam(window.location.href, 'type')

        return (
            <div className="container">
                <AlertCustom onRef={ref => (this.child = ref)} />
                <section >
                    <BrackcrumFromView title={`Phiếu ${type == 0 ? 'trả hàng' : 'tái xuất'}`} />
                    <div className="main__content">
                        <ToolbarFormView isPopup={true} parentObject={this} />
                        {isDetail ?
                            <DetailFormView /> :
                            <ListFormView parentObject={this} />
                        }
                    </div>
                </section>
            </div>
        )
    }
}

// lấy ALL dữ liệu từ các reducer
const mapStateToProps = ({
    userAuth,
    i18n,
    cd_turn_inout,
    toolbar,
    header
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        cd_turn_inout,
        toolbar,
        header
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        // ...userActions,
        // ...listActions,
        // ...productsActions,
        ...toolbarActions,
        ...cd_turn_inout_Actions,
        // resetInfoPage
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CdTurnInOutFormView)
