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
class TabBag extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        this._loadData()
    }
    _loadData() {
        this.props.getListBagByOrder()
    }

    _onView() {

        // $(".dropdown2").show(500)

    }
    render() {
        let { list_data, allChecked, listHeaderTabProduct } = this.props.stone
        let { list_products, listHeaderBag, listBagSelected } = this.props.order
        let { listHeaderTableProductsByCombobox } = this.props.products
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {
                                listHeaderBag.map((item, i) => {
                                    let { key, title } = item
                                    return (
                                        <th style={{"textAlign":"left"}} key={`thead_${key}`} scope="col">{title}</th>
                                    )
                                })

                            }
                        </tr>
                    </thead>
                    <tbody>
                        {listBagSelected && listBagSelected.map((item, i) => {
                            let { IdBag, IdProduct, Qty, CurrentWeight, FinishWeek } = item
                            return (
                                <tr key={`data_${i}`}>
                                    <td>{IdBag}</td>
                                    <td>{IdProduct}</td>
                                    <td>{Qty}</td>
                                    <td>{CurrentWeight}</td>
                                    <td>{FinishWeek}</td>
                                    <td onClick={() => this._onView(item)}><button>Detail</button></td>
                                </tr>)
                        })}
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
    order
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        stone,
        header,
        products,
        order
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
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TabBag)
