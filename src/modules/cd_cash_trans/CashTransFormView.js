import DetailCashTransFormView from './DetailCashTransFormView'
import ListCashTransFormView from './ListCashTransFormView'
const { Translate, I18n } = ReactReduxI18n;
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import * as toolbarActions from 'modules/toolbar/actions/form'
import * as cashCashTransActions from 'modules/cd_cash_trans/actions/form'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'

class CashTransFormView extends React.Component {
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
        let { objData, listBagSelected, isSave } = this.props.cd_cash_trans
        let { status } = this.props.toolbar
        let checktype = 0
        let checkData = listBagSelected.filter(x => x.IdTicket == '')
        if (checkData.length > 0) {
            checktype = 1
        }
        if (status == 'EDIT' && objData.TransType != 'TRANTYPE_02') {
            checktype = 2
        }
        if (!objData.PaymentAmount || objData.PaymentAmount == '0') {
            checktype = 3
        }
        switch (checktype) {
            case 1:
                alert('Đơn hàng không tồn tại trong Bag!')
                break;
            case 2:
                alert('Phiếu này không thể sửa!')
                break;
            case 3:
                alert('Vui lòng nhập đầy đủ số tiền!')
                break;
            default:
                break
        }
        if ([1, 2, 3].indexOf(checktype) != -1) {
            return false
        }
        return true
    }
    ChangeButton(value) {
        let valueTemp = value
        let isStatus = true
        let { objData, listBagSelected, isSave } = this.props.cd_cash_trans
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
                            this.props.getNumberAutoCashTrans().then(() => {
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
                                        this.props.resetDataCastingProc().then(() => {
                                            this.child._addNotification('Cập nhật thành công!!!', 'success')
                                            this.props.getListDataTicketProc('')
                                        })
                                    })
                                })
                        } else {
                            this.props.getNumberAutoCashTrans().then(() => {
                                this.props.addNewItem()
                                    .then(res => {
                                        this.props.updateButtonToolbar('').then(() => {
                                            this.props.resetDataCastingProc().then(() => {
                                                this.child._addNotification('Cập nhật thành công!!!', 'success')
                                                this.props.getListDataTicketProc('')
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
                    if (objData.IdTicket) {
                        this.props.isEditCasting(true)
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
                    isStatus = false
                    if (objData && objData.IdTicket) {
                        var r = confirm(I18n.t(`alert.delete`));
                        if (r == true) {
                            this.props.deleteItem({ IdTicket: objData.IdTicket }).then(res => {
                                this.child._addNotification('Xoá thành công', 'success')
                                this.props.getListDataCashTrans()
                            })
                        }
                    } else {
                        this.child._addNotification(I18n.t(`alert.please_select_delete`), 'warning')
                    }
                    break;
                default:

                    break;
            }
        }


    }
    render() {
        let { isDetail } = this.props.cd_cash_trans

        return (
            <div className="container">
                <AlertCustom onRef={ref => (this.child = ref)} />
                <section >
                    <BrackcrumFromView title={`Nhập phiếu thu tiền`} />
                    <div className="main__content">
                        <ToolbarFormView isPopup={true} parentObject={this} />
                        {isDetail ?
                            <DetailCashTransFormView /> :
                            <ListCashTransFormView parentObject={this} />
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
    cd_cash_trans,
    toolbar,
    header
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        cd_cash_trans,
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
        ...cashCashTransActions,
        // resetInfoPage
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CashTransFormView)
