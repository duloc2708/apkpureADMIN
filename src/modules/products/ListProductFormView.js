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
import * as commonrActions from 'modules/common/actions/form'
import { getListTypeByListCode } from 'modules/list/actions/form'

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

        // get list type
        let list = ['CLSP', 'KC', 'DSM', 'LV', 'UNIT']
        this.props.getListTypeByListCode(list)
    }
    _onSearch() {
        this.props.resetInfoPage().then(() => {
            this.props.getListDataProductsBySearch(this.refs.codeProduct && this.refs.codeProduct.value || '')
        })
    }
    _handleInput(e) {
        this.setState({ codeProduct: e.target.value })
        this.props.parentObject.ChangeInput(e.target.value);
    }
    _onNext(obj) {
        this.props.getListDataProducts(obj.params)
    }
    _onPrevious(obj) {
        this.props.getListDataProducts(obj.params)
    }
    _onChangePage(obj) {
        this.props.getListDataProductsBySearch(this.refs.codeProduct && this.refs.codeProduct.value || '')
    }
    onClickButtonPermission(obj) {
        let { nameBtn, data } = obj
        let { item, checked } = data
        switch (nameBtn) {
            case 'EDIT':
                this.props.isEditProduct(true)
                this.props.updateButtonToolbar('EDIT')
                this.props.clickCheckRowProducts(item, checked)
                break;
            case 'DETAIL':
                this.props.clickCheckRowProducts(item, checked)
                this.props.isEditProduct(true)
                break;
            default:
                break
        }
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
                            let { Id, IdOdd, Price, Status, checked, Name, Image, NameCLSP, Weight, WeightReal } = item
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
                                    <td>{SportConfig.function._formatMoney(Price || '')}</td>
                                    <td>{Helper.round(Weight || '', 4)}</td>
                                    <td>{Helper.round(WeightReal || '', 4)}</td>
                                    <td>
                                        <input type="checkbox" ref="IdOdd" id="IdOdd" className="checkbox_IdOdd"
                                            checked={IdOdd == "1" ? true : false}
                                        /></td>
                                    <td style={{ textAlign: "center" }}>
                                    {Status == 0 ? "Hoạt động" : "Ngưng hoạt động"}
                                  </td>
                                    <ButtonPermission data={{ item: item, checked: checked }} parentObject={this} type="EDIT" key="EDIT" nameBtn="EDIT" icon={`fa fa-pencil-square-o`} />
                                    <ButtonPermission data={{ item: item, checked: checked }} parentObject={this} type="DETAIL" key="DETAIL" nameBtn="DETAIL" icon={`fa fa-info-circle`} />
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
        ...toolbarActions,
        ...commonrActions,
        getListTypeByListCode
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListProductFormView)
