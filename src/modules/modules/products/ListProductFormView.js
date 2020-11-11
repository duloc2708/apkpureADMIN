import * as userActions from 'modules/login/actions/form'
import * as toolbarActions from 'modules/toolbar/actions/form'
import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import * as productsActions from 'modules/products/actions/form'
import DetailProductFormView from './DetailProductFormView'
const { Translate, I18n } = ReactReduxI18n;
class ListProductFormView extends React.Component {
    constructor() {
        super()
        this.state = {
            codeProduct: '',
            name: '',
            status: false,
            id: 0
        }
    }
    _onClickRow(item, checked) {
        this.props.clickCheckRowProducts(item, checked)
        // this.props.updateButtonToolbar('EDIT')
    }
    _onClickRowDouble(item, checked) {
        this.props.clickCheckRowProducts(item, checked)
        this.props.isEditProduct(true)
        // this.props.updateButtonToolbar('EDIT')
    }
    _onRowEdit(item, checked) {
        this.props.isEditProduct(true)
        this.props.updateButtonToolbar('EDIT')
        this.props.clickCheckRowProducts(item, checked)
    }
    _onRowDetail(item, checked) {
        this.props.clickCheckRowProducts(item, checked)
        this.props.isEditProduct(true)
    }
    componentDidMount() {
        let { page, total } = this.props.common
        let params = {
            page: page,
            total: total
        }
        this.props.getListDataProducts(params)
        KeyboardJS.bind('enter', (event) => {
            if ($('#codeProduct').is(':focus')) {
                this._onSearch()
            }
        })
    }
    _onSearch() {
        this.props.getListDataProductsBySearch(this.refs.codeProduct && this.refs.codeProduct.value || '')
    }
    _handleInput(e) {
        this.setState({ codeProduct: e.target.value })
    }
    _onNext(obj) {
        this.props.getListDataProducts(obj.params)
    }
    _onPrevious(obj) {
        this.props.getListDataProducts(obj.params)
    }
    _onChangePage(obj) {
        this.props.getListDataProducts(obj.params)
    }
    render() {
        let { page } = this.props.common
        let { list_data, allChecked, listHeaderTable, loadingProducts } = this.props.products
        return (
            <div>
                <Loader loading={loadingProducts} />
                <div className="form__personnal">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="form-group ">
                                <div className="left">
                                    <label htmlFor="name">Mã / tên sản phẩm</label>
                                </div>
                                <div className="right">
                                    <input className="name form-control"
                                        value={this.state.codeProduct}
                                        onChange={(e) => this._handleInput(e)}
                                        type="text"
                                        ref="codeProduct"
                                        id="codeProduct"
                                        name="codeProduct" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <div className="left" onClick={() => this._onSearch()}>
                                    <button className="btn btn-primary">Tìm kiếm</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">
                                <label>
                                    <input type="checkbox" defaultChecked={allChecked}
                                    //onChange={() => this._checkAllRow(allChecked)}
                                    />
                                </label>
                            </th>
                            {
                                listHeaderTable.map((item, i) => {
                                    let { key, title } = item
                                    return (
                                        <th style={{ "textAlign": "left" }} key={`thead_${key}`} scope="col">{title}</th>
                                    )
                                })

                            }
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <th></th>
                            {
                                listHeaderTable.map((item, i) => {
                                    let { key, type } = item
                                    return (
                                        <td key={`thead_${key}`}>
                                            <input className="name form-control" type={type} id={key} name="name" required="" />
                                        </td>
                                    )
                                })
                            }
                        </tr> */}
                        {list_data && list_data.map((item, i) => {
                            let { Id, IdOdd, Price, status, checked, Name, Image, NameCLSP } = item
                            return (
                                <tr key={`data_${i}`} onDoubleClick={() => this._onClickRowDouble(item, !checked)}>
                                    <th scope="row">
                                        <label>
                                            <input type="checkbox" checked={checked} onChange={() => this._onClickRow(item, !checked)} />
                                        </label>
                                    </th>
                                    {/* <td><img src={Image ? Config.API_URL_IMAGE + Image : "images/image-not-found.jpg"} width="170px" height="100px" /></td> */}
                                    <td>{Id}</td>
                                    <td>{Name}</td>
                                    <td>{NameCLSP}</td>
                                    <td>{SportConfig.function._formatMoney(Price)}</td>
                                    <td>
                                        <input type="checkbox" ref="IdOdd" id="IdOdd" className="checkbox_IdOdd"
                                            checked={IdOdd == "1" ? true : false}
                                        /></td>
                                    <td><button onClick={() => this._onRowEdit(item, !checked)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button></td>
                                    <td><button onClick={() => this._onRowDetail(item, !checked)}><i className="fa fa-info-circle" aria-hidden="true"></i></button></td>
                                </tr>)
                        })}
                    </tbody>
                </table>
                <PagingTable type="product" parentObject={this} />
            </div>

        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    products,
    header,
    common
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        products,
        header,
        common
        }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...userActions,
        ...productsActions,
        ...toolbarActions   
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListProductFormView)
