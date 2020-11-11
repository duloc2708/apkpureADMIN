import * as baogiaActions from 'modules/baogia/actions/form'
import * as bagActions from 'modules/bag/actions/form'

import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import ReactTooltip from 'react-tooltip'
import * as commonActions from 'modules/common/actions/form'

const { Translate, I18n } = ReactReduxI18n;

class ListOrder extends React.Component {
    constructor() {
        super()
        this.state = {
            code: '',
            name: '',
            status: false,
            id: 0
        }
    }
    componentDidMount() {
        // this._loadData()
        KeyboardJS.bind('enter', (event) => {
            if ($('#code_in_baogia').is(':focus')) {
                this._onSearch()
            }
        })
    }
    _onSearch() {
        if (this.refs.code_in_baogia) {
            this.props.getListDataProductInBaoGiaBySearch(this.refs.code_in_baogia.value || '')
        }
    }
    _handleInput(e) {
        this.setState({ code: e.target.value })
    }
    _loadData() {
        let { page, total } = this.props.common
        let params = {
            page: page,
            total: total
        }
        this.props.getListDataProductInBaoGia(params)
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

    _onRemove(item) {
        var r = confirm(I18n.t(`alert.delete`));
        if (r == true) {
            this.props.removeItemProductsInOutput(item)
            } 
        
    }
    ChangeValueCombobox(obj) {
        this.props.updateCellProductsByOutput(obj)
    }
    _onView() {

        // $(".dropdown2").show(500)

    }
    closeModal() {
        this.props.closeModalProduct(false)
    }
    _onRowDetail() {
        this.props.closeModalProduct(true)
    }
    _onNext(obj) {
        this.props.getListDataProductInBaoGia(obj.params)
    }
    _onPrevious(obj) {
        this.props.getListDataProductInBaoGia(obj.params)
    }
    _onChangePage(obj) {
        this.props.getListDataProductInBaoGia(obj.params)
    }
    ChangeValueCell(value) {        
        this.props.updateCellProductsByOutput(value)
    }
    _onUpdatePrice(item) {
        this.props.updatePriceCustom(item).then(() => {
            alert('Cập nhật gía thành công!')
        })
    }
    _onBlurData(item) {
        this.props.updatePriceCustom(item).then(() => {
        })
    }
    handleClick(obj){

    }
    render() {
        let {
            listProductsInProduct, isShowProduct,
            listHeaderTableProduct } = this.props.baogia
        let { PriceType } = this.props.baogia.objDataBaoGia
        return (
            <div className="col-md-12">
                <div className="left">
                    <hr />
                    {/* <label htmlFor="name">Danh sách sản phẩm</label> */}
                </div>
                <div className="form-group">
                    <div style={{ width: "100%" }}>
                        <div className="form-group ">
                            <div className="left">
                                <input style={{ width: "100%" }} className="name form-control"
                                    type="text"
                                    ref="code_in_baogia"
                                    id="code_in_baogia"
                                    name="code_in_baogia"
                                    onKeyPress={() => this._onSearch()}
                                /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                            <div style={{ "paddingLeft": "10px" }} className="right">
                                <button onClick={() => this._onSearch()} className="btn btn-primary">Tìm kiếm</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            {
                                                listHeaderTableProduct.map((item, i) => {
                                                    let { key, title } = item
                                                    return (
                                                        <th style={{ "textAlign": "left" }} key={`thead_${key}`} scope="col">{title}</th>
                                                    )
                                                })

                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listProductsInProduct && listProductsInProduct.map((item, i) => {
                                            let { ProductID, Basicprice, Saleprice } = item
                                            return (
                                                <tr key={`data_${ProductID}`} >
                                                    <td>{ProductID}</td>
                                                    <td>{SportConfig.function._formatMoney(Basicprice)}</td>
                                                    <td onBlur={() => this._onBlurData(item)}>
                                                        <Cell readOnly={PriceType == 1 ? true : false} type="number" width="150px" id={ProductID} value={Saleprice || ''} keyInput="Saleprice" parentObject={this} />
                                                    </td>
                                                    {/* <td>
                                                        <button onClick={() => this._onUpdatePrice(item)}>Cập nhật giá</button>
                                                    </td> */}
                                                </tr>)
                                        })}
                                    </tbody>
                                </table>
                                <PagingTable type="product" parentObject={this} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    header,
    baogia,
    common
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        header,
        baogia,
        common
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...baogiaActions,
        ...commonActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListOrder)
