import * as userActions from 'modules/login/actions/form'
import * as toolbarActions from 'modules/toolbar/actions/form'
import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import * as orderActions from 'modules/order/actions/form'
import * as bagActions from 'modules/bag/actions/form'
import CreateBagFromView from './CreateBagFromView'
import ListOrder from './ListOrder'

const { Translate, I18n } = ReactReduxI18n;
import * as headerActions from 'modules/header/actions/form'

class TabCreateBag extends React.Component {
    _onClickRow(item, checked) {
        this.props.clickCheckRowProduct(item, checked)
    }
    componentWillMount() {
        var currentURL = document.URL;
        var url = new URL(currentURL);
        var codeURL = url.searchParams.get("idBag");
        if (codeURL)
            this.props.getListProductsByOrder(codeURL)
    }
    componentDidMount() {
        let { page, total } = this.props.order
        let params = {
            page: page,
            total: total
        }
        //this.props.getListOrderCombobox()
        // this.props.getListDataOrder(params)
        // KeyboardJS.bind('enter', (event) => {
        //     if ($('#code').is(':focus')) {
        //         this._onSearch()
        //     }
        // })
    }
    _onSearch() {
        this.props.getListDataBySearch(this.refs.code.value)
    }
    _handleInput(e) {
        this.setState({ code: e.target.value })
    }
    _renderPage(page) {
        let data = [];
        for (var i = 1; i <= 10; i++) {
            data.push(<li key={`page_${i}`} className={`page-item ${i == page ? 'active' : ''}`}>
                <a className={`page-link`} onClick={(e) => this._onChangePage(e)}>{i}</a>
            </li>);
        }
        return data;
    }
    _onChangePage(value) {
        this.props.ChangePage(parseInt(value.target.text))
        let { page, total } = this.props.order
        let params = {
            page: parseInt(value.target.text),
            total: total
        }
    }

    _onCreateBag() {
        let { listItemCreateBag, selectedOrder, itemDetail } = this.props.bag
        let type = ''
        if (listItemCreateBag.length == 0) {
            type = 1
        } else {
            let IdProduct_temp = ''
            listItemCreateBag.map((item, i) => {
                // Kiem tra trung san pham
                if (IdProduct_temp && IdProduct_temp != item.IdProduct) {
                    type = 2
                    return
                }
                IdProduct_temp = item.IdProduct
            })
        }
        // Kiem tra san pham da tach
        if (type == '') {
            let SplitBag_temp = ''
            listItemCreateBag.map((item, i) => {
                if (SplitBag_temp && SplitBag_temp != item.SplitBag) {
                    type = 4
                    return
                }
                SplitBag_temp = item.SplitBag
            })
        }
        // Kiem tra san pham da tach
        if (type == '') {
            let findItemSplit = listItemCreateBag.filter(x => x.SplitBag == 1)
            if (findItemSplit.length > 1)
                type = 5
        }

        switch (type) {
            case 1:
                this.child._addNotification(I18n.t(`bag.please_select_rows`), 'warning')
                break;
            case 2:
                this.child._addNotification('Vui lòng chọn cùng sản phẩm.', 'warning')
                break;
            case 4:
                this.child._addNotification('Một Sản phẩm đã bị tách.', 'warning')
                break;
            case 5:
                this.child._addNotification('Nhiều màu sản phẩm đã bị tách.', 'warning')
                break;
            default:
                if ([1, 2].indexOf(listItemCreateBag[0].SplitBag) != -1) {
                    if (listItemCreateBag[0].SplitBag == 1) {
                        this.props.getListProductsByOrderSplitBag(listItemCreateBag[0]).then(res => {
                            this.props.getNumberAutoBagSplit()
                            this.props.showModal(true)
                        })
                    } else {
                        this.props.getNumberAutoBag()
                        this.props.showModal(true)
                    }
                } else if (listItemCreateBag[0].IdOdd == "1") {
                    if (listItemCreateBag.length == 1) {
                        // var r = confirm(I18n.t(`alert.split_bag`) + ` bộ sản phẩm ${listItemCreateBag[0].IdProduct} màu ${listItemCreateBag[0].ColorName}`);
                        // if (r == true) {
                        //     this.props.updateStatusSplitBag(listItemCreateBag[0], 1).then(res => {
                        //         this.props.getNumberAutoBagSplit()
                        //         this.props.showModal(true)
                        //     })
                        // } else {
                        //     this.props.updateStatusSplitBag(listItemCreateBag[0], 2).then(res => {
                        //         this.props.getNumberAutoBag()
                        //         this.props.showModal(true)
                        //     })
                        // }
                        this.props.getNumberAutoBag()
                        this.props.showModal(true)
                    } else {
                        // update k tach san pham
                        listItemCreateBag.map((itemData, i) => {
                            this.props.updateStatusSplitBag(itemData, 2).then(res => {
                                if (i == listItemCreateBag.length - 1) {
                                    this.props.getNumberAutoBag()
                                    this.props.showModal(true)
                                }
                            })

                        })

                    }

                } else {
                    this.props.getNumberAutoBag()
                    this.props.showModal(true)
                }
                break
        }
    }
    render() {
        let { allChecked, listHeaderTable, page, list_data } = this.props.order
        let { list_order_combobox, listHeaderProducts, ListProductByOrderInBag } = this.props.bag
        return (
            <div>
                <AlertCustom onRef={ref => (this.child = ref)} />
                <CreateBagFromView />
                <div className="form__personnal">
                    <div className="row">

                        <ListOrder />



                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group" style={{ "textAlign": "right" }}>
                                        <div className="left" onClick={() => this._onCreateBag()}>
                                            <button className="btn btn-primary">Tạo bag</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <table className="table table-striped">
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
                                    {ListProductByOrderInBag && ListProductByOrderInBag.map((item, i) => {
                                        let { ProductsEachBag, Color, IdOrder, IdProduct, Image, IdCustomer, checked, Number, Price, SplitBag } = item
                                        return (
                                            <tr key={`data_${i}`} onClick={() => this._onClickRow(item, !checked)}>
                                                <th scope="row">
                                                    <label>
                                                        <input type="checkbox" checked={checked} onChange={() => this._onClickRow(item, !checked)} />
                                                    </label>
                                                </th>
                                                <td><LinkProduct id={IdProduct} /></td>
                                                <td>
                                                    <Combobox disable={true} type_code='DSM' keyInput="Color" value={Color} />
                                                </td>
                                                {/* <td>{Price}</td> */}
                                                <td>{Number}</td>
                                                <td>{ProductsEachBag}</td>
                                                <td>  <input type="checkbox" checked={SplitBag == 1 ? true : false} /></td>
                                            </tr>)
                                    })}
                                </tbody>
                            </table>
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
    order,
    header,
    bag
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        order,
        header,
        bag
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...userActions,
        ...orderActions,
        ...toolbarActions,
        ...bagActions,
        ...headerActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TabCreateBag)
