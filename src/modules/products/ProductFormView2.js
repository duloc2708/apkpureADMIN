import * as userActions from 'modules/login/actions/form'
import * as productsActions from 'modules/products/actions/form'
import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import * as castingActions from 'modules/casting/actions/form'
import ComboboxListProducts from './ComboboxListProducts'

const { Translate, I18n } = ReactReduxI18n;
class ProductFormView2 extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        this._loadData()
    }
    _loadData() {
        this.props.getListProductsCombobox()
        // this.props.getListProductsByProducts()
    }

    _onClickRow(item) {
        let { Id, Name, IdType, IdUnit, Decription, Numb, Weight } = item
        this.setState({
            Id, Name, IdType, IdUnit, Decription, Numb, Weight
        });
        this.props.clickCheckRow(item)
    }
    _handleInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }
    _changeStatus(status) {
        this.setState({ status: !status });
    }
    _checkClickRow(item) {
        // this.props.clickCheckRowTabcasting(item)
    }
    _checkAllRow(value) {
        this.props.checkAllRow(!value)
    }

    _onRemove(item) {
        this.props.removeItemProductsSelected(item)
    }
    render() {
        let { list_data, allChecked, listSelected } = this.props.casting
        let { listProductsSelected, listHeaderTableProductsByCombobox, listProductsCombobox, objData } = this.props.products
        return (
            <div style={{
                "width": "100%",
                "borderBottom": "1px solid #cdcdcd",
                "borderLeft": "1px solid #cdcdcd",
                "borderRight": "1px solid #cdcdcd"
            }}>
                <ComboboxListProducts type={"products"} list_data={listProductsCombobox} />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {
                                listHeaderTableProductsByCombobox.map((item, i) => {
                                    let { key, title } = item
                                    return (
                                        <th key={`thead_${key}`} scope="col">{title}</th>
                                    )
                                })

                            }
                        </tr>
                    </thead>
                    <tbody>
                        {listProductsSelected && listProductsSelected.map((item, i) => {
                            let { value, label, sl, Image, price } = item
                            if (value && value.length > 0) {
                                return (
                                    <tr key={`data_${i}`}>
                                        <td style={{ "textAlign": "center" }}> <LinkProduct id={value} /></td>

                                        <td style={{ "textAlign": "center" }}>{value || ''}</td>
                                        <td style={{ "textAlign": "center" }}>{price || ''}</td>
                                        {objData.CheckOrder && objData.CheckOrder != null ? '' :
                                            <td style={{ "textAlign": "center" }} onClick={() => this._onRemove(item)}><button><i className="fa fa-trash-o" aria-hidden="true"></i></button></td>
                                        }
                                    </tr>)
                            }
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
    casting,
    header,
    products
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        casting,
        header,
        products
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...userActions,
        ...castingActions,
        ...productsActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ProductFormView2)
