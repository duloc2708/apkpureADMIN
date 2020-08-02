import DetailGoldTransFormView from './DetailGoldTransFormView'
import ListGoldTransFormView from './ListGoldTransFormView'
const { Translate, I18n } = ReactReduxI18n;
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import * as toolbarActions from 'modules/toolbar/actions/form'
import * as goldTransActions from 'modules/cd_gold_trans/actions/form'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'

class GoldTransFormView extends React.Component {
    constructor() {
        super()
        this.state = {
            inputSearch: ''
        }
    }
    componentWillUnmount() {
        this.props.resetDataCastingProc()
    }
    _validateSave() {
        let { objData, listGoldSelected, isSave } = this.props.cd_gold_trans
        let checkData = listGoldSelected.filter(x => x.IdOrder == '')
        let { status } = this.props.toolbar
        let checktype = 0
        if (checkData.length > 0) {
            checktype = 1
        }
        if (!objData.IdCustomer) {
            checktype = 2
        }
        let textValidate = ''
        listGoldSelected.map(item => {
            let { PaymentWeight, PaymentWeight_Real, ValueLV_Draft, ValueLV_Confirm, ValueLV_Real } = item
            if (PaymentWeight == '' || PaymentWeight_Real == '' || ValueLV_Draft == '' || ValueLV_Confirm == '' || ValueLV_Real == '') {
                checktype = 4
                textValidate = (PaymentWeight == '' || PaymentWeight_Real == '') ? 'TL vàng' : 'Tuổi vàng'
                return false
            } else if (PaymentWeight == 0 || PaymentWeight_Real == 0 || ValueLV_Draft == 0 || ValueLV_Confirm == 0 || ValueLV_Real == 0) {
                checktype = 4
                textValidate = (PaymentWeight == 0 || PaymentWeight_Real == 0) ? 'TL vàng' : 'Tuổi vàng'
                return false
            }
            else if (parseFloat(ValueLV_Draft) > 100 || parseFloat(ValueLV_Confirm) > 100
                || parseFloat(ValueLV_Real) > 100) {
                checktype = 7
                return false
            }
            else {
                // vàng thoả thuẩn chêch lệch vàng nhận
                if (Math.abs((ValueLV_Confirm - ValueLV_Draft)) > 0.2) {
                    checktype = 5
                    return false
                }
                // vàng thực chêch lệch vàng thoả thuận
                if (Math.abs((ValueLV_Real - ValueLV_Confirm)) > 0.2) {
                    checktype = 6
                    return false
                }
            }

        })
        if (status == 'EDIT' && objData.TransType != 'TRANTYPE_02') {
            checktype = 3
        }
        switch (checktype) {
            case 1:
                alert('Đơn hàng không tồn tại trong Bag!')
                break;
            case 2:
                alert('Vui lòng chọn khách hàng!')
                break;
            case 3:
                alert('Phiếu này không thể sửa!')
                break;
            case 4:
                alert(`Vui lòng nhập đầy đủ thông tin ${textValidate}!`)
                break;
            case 5:
                alert('Tuổi vàng Thoả Thuận đang lệch quá 0,2 so với vàng Nhận, Vui lòng nhập lại!')
                break;
            case 6:
                alert('Tuổi vàng thực đang lệch quá 0,2 so với vàng thoả thuận, Vui lòng nhập lại!')
                break;
            case 7:
                alert('Tuổi vàng hiện tại lớn hơn 100%, Vui lòng nhập lại!')
                break;
            default:
                break
        }
        if ([1, 2, 3, 4, 5, 6, 7].indexOf(checktype) != -1) {
            return false
        }
        return true
    }
    ChangeButton(value) {
        let valueTemp = value
        let isStatus = true
        let { objData, listGoldSelected, isSave } = this.props.cd_gold_trans
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
                                    })
                                })
                        } else {
                            this.props.getNumberAuto().then(() => {
                                this.props.addNewItem()
                                    .then(res => {
                                        this.props.updateButtonToolbar('EDIT').then(() => {
                                            this.child._addNotification('Cập nhật thành công!!!', 'success')
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
                                        this.props.resetDataCastingProc().then(() => {
                                            this.child._addNotification('Cập nhật thành công!!!', 'success')
                                            this.props.getListDataGoldTrans('')
                                        })
                                    })
                                })
                        } else {
                            this.props.getNumberAuto().then(() => {
                                this.props.addNewItem()
                                    .then(res => {
                                        this.props.updateButtonToolbar('').then(() => {
                                            this.props.resetDataCastingProc().then(() => {
                                                this.child._addNotification('Cập nhật thành công!!!', 'success')
                                                this.props.getListDataGoldTrans('')
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
                    this.props.initAddCastingProc()
                    break;
                case "EDIT":
                    if (objData.IDCasting) {
                        this.props.isEditCasting(true)
                        this.props.getDataDetailByCode()
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
                    //             this.props.getListDataOrder()
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
        let { isDetail } = this.props.cd_gold_trans
        return (
            <div className="container">
                <AlertCustom onRef={ref => (this.child = ref)} />
                <section >
                    <BrackcrumFromView title={`Nhập phiếu thu vàng`} />
                    <div className="main__content">
                        <ToolbarFormView isPopup={true} parentObject={this} />
                        {isDetail ?
                            <DetailGoldTransFormView /> :
                            <ListGoldTransFormView parentObject={this} />
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
    cd_gold_trans,
    toolbar,
    header
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        cd_gold_trans,
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
        ...goldTransActions,
        // resetInfoPage
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(GoldTransFormView)
