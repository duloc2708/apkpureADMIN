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
        // this.props.getListBagByOrder()
    }

    _onView(item) {
        //bagdetail?idbag=000004
        this.props.push(Routes.bagDetail.view + "?idbag=" + item.IdBag)
        // $(".dropdown2").show(500)

    }
    _onClickRow(item, checked) {
        this.props.clickCheckRowBag(item, checked)
    }
    _checkAllRow(value) {
        this.props.clickCheckAllRowBag(!value)
    }
    render() {
        let { list_data, listHeaderTabProduct } = this.props.stone
        let { list_products, listHeaderBag, listBagSelected, allChecked } = this.props.order
        let { listHeaderTableProductsByCombobox } = this.props.products
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>

                            <th scope="col">
                                <label>
                                    <input type="checkbox" checked={allChecked} onChange={() => this._checkAllRow(allChecked)} />
                                </label>
                            </th>
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
                    <tbody>
                        {listBagSelected && listBagSelected.map((item, i) => {
                            let { IdBag, IdProduct, Qty, CurrentWeight, FinishWeek, StatusName, checked } = item
                            return (
                                <tr key={`data_${i}`} style={{ backgroundColor: `${StatusName == 'Đã nhập trọng lượng 1 phần' ? '' : 'rgb(147, 149, 150)'}` }} >
                                    <th scope="row">
                                        <label>
                                            <input type="checkbox" checked={checked} onChange={() => this._onClickRow(item, !checked)} />
                                        </label>
                                    </th>
                                    <td>{IdBag}</td>
                                    <td>{IdProduct}</td>
                                    <td>{Qty}</td>
                                    <td>{CurrentWeight}</td>
                                    <td>{FinishWeek}</td>
                                    <td>{StatusName}</td>
                                    <td onClick={() => this._onView(item)}><button><i className="fa fa-info-circle" aria-hidden="true"></i></button></td>
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
