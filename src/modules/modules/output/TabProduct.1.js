import * as outputActions from 'modules/output/actions/form'
import * as bagActions from 'modules/bag/actions/form'

import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import ComboboxProducts from './ComboboxProducts'

import ReactTooltip from 'react-tooltip'
const { Translate, I18n } = ReactReduxI18n;
class TabProduct extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        this._loadData()
    }
    _loadData() {
        var currentURL = document.URL;
        var url = new URL(currentURL);
        var codeURL = url.searchParams.get("code");
        var that = this
        //this.props.getListOrderCombobox()
    }

    _handleInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }
    _changeStatus(status) {
        this.setState({ status: !status });
    }
    _myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    ChangeValueCell(value) {
        this.props.updateCellProductsByOutput(value)
    }
    _onRemove(item) {
        this.props.removeItemProductsInOutput(item)
    }
    ChangeValueCombobox(obj) {
        this.props.updateCellProductsByOutput(obj)
    }
    _onView(item) {
        let { objDataOutput } = this.props.output
        let { IdProduct, Color } = item
        this.props.getListBag(objDataOutput.IdOrder, IdProduct, Color)

    }
    render() {
        let { list_data, allChecked, listHeaderTabProduct } = this.props.stone
        let { list_products, listProductsSelected } = this.props.output
        let { listHeaderTableProductsByCombobox } = this.props.products
        let { list_order_combobox } = this.props.bag
        let { ListProductByOrderOutput, listHeaderProducts, list_bag } = this.props.output
        let { status } = this.props.toolbar
        if (status != 'ADD') {
            listHeaderProducts = listHeaderProducts.filter(x => x.key != 'SLREMAIN')
        }
        // table{
        //     height: 86px; 
        //     display: inline-block;
        //     overflow-y: scroll;
        //   }
        return (
            <table style={{
                "height": "420px",
                "display": "inline-block",
                "overflowY": "scroll",

            }}
                className="table table-striped">
                <thead>
                    <tr>
                        {
                            listHeaderProducts.map((item, i) => {
                                let { key, title } = item
                                return (
                                    <th style={{ "textAlign": "left" }} key={`thead_${key}`} scope="col">{title}</th>
                                )
                            })

                        }
                    </tr>
                </thead>
                <tbody>
                    {ListProductByOrderOutput && ListProductByOrderOutput.map((item, i) => {
                        let { IdOrder, IdProduct, IdProductParent, Color, Number, NumberTemp, stt, ProductsEachOutput,
                            Weight, WeightAvgProduct, WeightAvg, WeightProduct, WeightCustom, IdOdd, sttOther } = item
                        return (
                            <tr key={`data_${IdOrder}_${i}`} >
                                <td>
                                    {
                                        IdOdd == 0 ? '' : <LinkProduct id={IdProductParent} />
                                    }
                                </td>
                                <td>
                                    <LinkProduct id={IdProduct} />
                                </td>
                                {/* <td><img data-tip="hello world" src={url_image ? Config.API_URL_IMAGE + url_image : "images/image-not-found.jpg"} width="170px" height="100px" /></td> */}
                                <td>
                                    <Combobox width="50px" disable={true} type_code='DSM' keyInput="color" id={IdProduct} value={Color} parentObject={this} />
                                </td>
                                <Cell type="number" width="50px" id={stt} value={NumberTemp || ''} keyInput="NumberTemp" parentObject={this} />
                                <Cell type="number" width="100px" id={sttOther} value={Weight || ''} keyInput="Weight" parentObject={this} />
                                <Cell type="number" width="100px" id={sttOther} value={WeightProduct || ''} keyInput="WeightProduct" parentObject={this} />
                                <Cell type="number" width="100px" id={sttOther} value={WeightCustom || ''} keyInput="WeightCustom" parentObject={this} />
                                <td>{Helper.round(WeightAvg || 0, 4)}</td>
                                <td>{Helper.round(WeightAvgProduct || 0, 4)}</td>
                                {status == 'ADD' ? <td>{Number - (ProductsEachOutput || 0)}</td> : ''}
                                <td>{Number || ''}</td>
                                <td data-tip="hello world" className="button" >
                                    <div onMouseEnter={() => this._onView(item)} >
                                        <i className="fa fa-list-ol" aria-hidden="true" data-tip data-for='global'></i>
                                        <ReactTooltip id='global' aria-haspopup='true' role='example'>
                                            <p>Danh sách bag</p>
                                            <table >
                                                <thead>
                                                    <tr>
                                                        <th style={{ "color": "#fff" }} key={`thead_${0}`} scope="col">{'Mã bag'}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {list_bag.length > 0 && list_bag.map((item, i) => {
                                                        let { IdBag } = item
                                                        return (
                                                            <tr style={{ "color": "#fff" }} key={`dataDetail_${i}`}>
                                                                <td style={{ "textAlign": "center" }}>{IdBag || ''}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </ReactTooltip>
                                    </div>
                                </td>
                                <td onClick={() => this._onRemove(item)}><button><i className="fa fa-trash-o" aria-hidden="true"></i></button></td>

                            </tr>)
                    })}
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    stone,
    header,
    products,
    order,
    bag,
    output,
    toolbar
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        stone,
        header,
        products,
        order,
        bag,
        output, toolbar
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...outputActions,
        ...bagActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TabProduct)
