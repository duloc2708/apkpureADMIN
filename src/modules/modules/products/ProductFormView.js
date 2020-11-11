import * as userActions from 'modules/login/actions/form'
import * as toolbarActions from 'modules/toolbar/actions/form'
import * as productsActions from 'modules/products/actions/form'
import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import * as listActions from 'modules/list/actions/form'
import DetailProductFormView from './DetailProductFormView'
import ListProductFormView from './ListProductFormView'
import { EILSEQ } from 'constants';
import { resetInfoPage } from 'modules/common/actions/form'


const { Translate, I18n } = ReactReduxI18n;
class ProductFormView extends React.Component {
    constructor() {
        super()
    }
    _validateSave() {
        let check = true
        let { objData } = this.props.products
        if (objData.Id == "") {
            check = false
        }
        return check
    }
    componentWillUnmount() {
        this.props.updateButtonToolbar('')
        this.props.resetInfoPage()
    }
    ChangeButton(value) {
        let isStatus = true
        let { objData } = this.props.products
        switch (value) {
            case "SAVE":
                let { status } = this.props.toolbar
                if (status == '') {
                    isStatus = false
                    break
                }
                if (this._validateSave()) {
                    if (status == 'EDIT') {
                        this.props.updateItemProducts().then(res => {
                            this.props.addListStoneAndCasting().then(res => {
                                this.props.getListDataProducts()
                                this.props.resetInfoPage()
                                this.child._addNotification(I18n.t(`alert.updatesuccess`), 'success')

                            })
                        })
                    } else {
                        this.props.checkExistsCodeProduct(objData.Id).then(res => {
                            let { data } = res.data
                            if (data.value == 1) {
                                isStatus = false
                                this.child._addNotification((`Đã tồn tại mã sản phẩm này`), 'warning')
                            } else {
                                this.props.addNewItemProducts()
                                this.props.addListStoneAndCasting().then(res => {
                                    this.props.getListDataProducts()
                                    this.props.resetInfoPage()
                                    this.child._addNotification(I18n.t(`alert.updatesuccess`), 'success')
                                })
                            }

                        })


                    }
                } else {
                    isStatus = false
                }
                break;
            case "ADD":
                // this.props.resetDataProducts()
                this.props.isEditProduct(true)
                break;
            case "EDIT":
                if (objData.Id) {
                    this.props.isEditProduct(true)
                } else {
                    isStatus = false
                    this.child._addNotification(I18n.t(`alert.please_select_rows`), 'warning')
                }
                break;
            case "DELETE":
                isStatus = false
                if (objData && objData.Id) {
                    var r = confirm(I18n.t(`alert.delete`));
                    if (r == true) {
                        this.props.deleteItemProducts({ id: objData.Id }).then(res => {
                            this.props.getListDataProducts()
                        })
                    }
                } else {
                    this.child._addNotification(I18n.t(`alert.please_select_delete`), 'warning')
                }
                break;
            default:
                this.props.isEditProduct(false)
                break;
        }
        if (isStatus) {
            this.props.updateButtonToolbar(value)
        }
    }

    render() {
        let { isDetail } = this.props.products
        return (
            <div className="container">
                <AlertCustom onRef={ref => (this.child = ref)} />
                <section >
                    {/* <BrackcrumFromView /> */}
                    <div className="main__content">
                        <ToolbarFormView parentObject={this} />
                        {isDetail ?
                            <DetailProductFormView /> :
                            <ListProductFormView />
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
    products,
    toolbar
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        list,
        header,
        products,
        toolbar
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...userActions,
        ...listActions,
        ...productsActions,
        ...toolbarActions,
        resetInfoPage
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ProductFormView)
