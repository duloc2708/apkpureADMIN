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
        this.props.clickCheckRowProductInbag(item, checked)
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

    _onCreateBag(isQuick) {
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
                if (SplitBag_temp && item.SplitBag == 1 && SplitBag_temp != item.SplitBag) {
                    type = 4
                    return
                }
                SplitBag_temp = item.SplitBag
            })
        }

        // Kiem tra check cùng sản phẩm tách
        if (type == '') {
            let checkedSplitTemp = ''
            listItemCreateBag.map((item, i) => {
                if (checkedSplitTemp && checkedSplitTemp != item.checkedSplit) {
                    type = 6
                    return
                }
                checkedSplitTemp = item.checkedSplit
            })
        }



        // // Kiem tra san pham da tach
        // if (type == '') {
        //     let findItemSplit = listItemCreateBag.filter(x => x.SplitBag == 1)
        //     if (findItemSplit.length > 1)
        //         type = 5
        // }

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
            case 6:
                this.child._addNotification('Vui lòng chọn cùng sản phẩm để tách.', 'warning')
                break;
            default:

                let StatusSplitBag = listItemCreateBag[0].SplitBag
                let checkedSplit = listItemCreateBag[0].checkedSplit
                // ------------- trường hơp tạo bag thêm cho sản phẩm hiện tại ----------
                if ([1, 2].indexOf(StatusSplitBag) != -1) {
                    // trường hợp đã tách vào table order_product_b
                    if (StatusSplitBag == 1) {
                        let obj = listItemCreateBag[0]
                        this.props.getListProductsByOrderSplitBag(obj, obj.Qty).then(() => {
                            this.props.getNumberAutoBagSplit()
                        })
                    } else {
                        // trường hợp tạo bag thêm cho sản phẩm
                        this._getNumberAutoBag(isQuick)
                    }

                } else {
                    // ----------- trường hợp tạo bag mặc định ban đầu -----------------
                    // nếu click tách bộ 
                    if (checkedSplit) {
                        let IdProduct_temp = '', type = true, listColor = [], listColorName = ''
                        listItemCreateBag.map((item, i) => {
                            listColorName = listColorName + item.ColorName + ','
                            listColor.push({ Color: item.Color, Qty: item.Qty })
                            if (IdProduct_temp && IdProduct_temp != item.IdProduct) {
                                type = false
                                return
                            }
                            IdProduct_temp = item.IdProduct
                        })

                        var r = confirm(I18n.t(`alert.split_bag`) + ` bộ sản phẩm ${listItemCreateBag[0].IdProduct} màu ${listColorName || ''}`);
                        if (r == true) {
                            this.props.updateStatusSplitOdd(listItemCreateBag, 1).then(() => {
                                let obj = listItemCreateBag[0]
                                this.props.getListProductsByOrderSplitBag(obj, obj.Qty).then(() => {
                                    this.props.getNumberAutoBagSplit()
                                    this.props.showModal(true)
                                })
                            })
                        }

                    }
                    // trường hợp tạo bag bộ, lẻ 
                    else {
                        listItemCreateBag.map((itemData, i) => {
                            this.props.updateStatusBagNotSplit(itemData, 2).then(res => {
                                if (i == listItemCreateBag.length - 1) {
                                    this._getNumberAutoBag(isQuick)
                                }
                            })

                        })
                    }
                }
                break
        }
    }

    _getNumberAutoBag(isQuick) {
        this.props.getNumberAutoBag()
        setTimeout(() => {
            if (isQuick) {
                this.saveBag()
            } else {
                this.props.showModal(true)
            }
        }, 500);
    }
    _btnSplitStone(SplitBag) {
        let { listItemCreateBag, selectedOrder, itemDetail } = this.props.bag
        if (itemDetail.IdProduct) {
            if (itemDetail.IdOdd != "1") {
                this.child._addNotification(`Vui lòng chọn sản phẩm bộ để tách!`, 'warning')
            } else {
                if (SplitBag == 2) {
                    this.child._addNotification(`Sản phẩm này đã tồn tại bag!`, 'warning')
                }
                else {

                    let IdProduct_temp = '', type = true, listColor = [], listColorName = ''
                    listItemCreateBag.map((item, i) => {
                        listColorName = listColorName + item.ColorName + ','
                        listColor.push({ Color: item.Color, Qty: item.Qty })
                        // Kiem tra trung san pham
                        if (IdProduct_temp && IdProduct_temp != item.IdProduct) {
                            type = false
                            return
                        }
                        IdProduct_temp = item.IdProduct
                    })
                    if (type) {
                        var r = confirm(I18n.t(`alert.split_bag`) + ` bộ sản phẩm ${listItemCreateBag[0].IdProduct} màu ${listColorName || ''}`);
                        if (r == true) {
                            // cập nhật trạng thái và insert sản phẩm tách vào table order_product_b
                            // listItemCreateBag = listItemCreateBag.map(x => x.listColor = listColor)
                            listItemCreateBag.map(x => x.listColor = listColor)

                            // trường hợp đã tách vào table order_product_b
                            if (SplitBag == 1) {
                                let obj = listItemCreateBag[0]
                                this.props.getListProductsByOrderSplitBag(obj, obj.Qty).then(() => {
                                    this.props.getNumberAutoBagSplit()
                                    this.props.showModal(true)
                                })
                            }
                            // insert bag lẻ vào table order_product_b
                            else {
                                this.props.updateStatusSplitOdd(listItemCreateBag, 1).then(() => {
                                    let obj = listItemCreateBag[0]
                                    this.props.getListProductsByOrderSplitBag(obj, obj.Qty).then(() => {
                                        this.props.getNumberAutoBagSplit()
                                        this.props.showModal(true)
                                    })
                                })
                            }

                        }
                    } else {
                        this.child._addNotification(`Vui lòng chọn cùng sản phẩm.`, 'warning')
                    }
                }

            }
        } else {
            this.child._addNotification(`Vui lòng chọn sản phẩm để tách!`, 'warning')
        }
    }
    ChangeValueCell(value) {
        this.props.updateQtyBagByIdProductColor(value)
    }
    handleClick() {

    }

    saveBag() {
        let isCheck = true, type = 0, message = ''
        var { listItemCreateBag, selectedOrder, itemDetail, list_stone_save, listItemCreateBagDefault,
            list_stone_save_split, list_stone_save_split_custom, itemDetailCreateBag } = this.props.bag
        var { split_odd, IdBagCreate } = this.props.bag
        // trường hợp tách bag
        if (split_odd) {
            let listInsertBag = []
            // trường hợp đã tạo số bag
            if (IdBagCreate) {
                let IdTemp = IdBagCreate
                // lấy id bag tự auto
                let IdBag = parseInt(IdTemp)
                listItemCreateBag.map((itemCreateBag, i) => {
                    let listItemCreateBagNew = [], list_stone_save_new = []
                    let StatusWeight = 'BAG_WEIGHT_STATUS_01'
                    let IdBagTemp = ''
                    itemCreateBag.listColor.map(itemColor => {
                        let itemNew = _.clone(itemCreateBag, true)
                        IdBagTemp = this.zeroPad(IdBag, 9)
                        itemNew.Id = IdBagTemp
                        itemNew.IdProductParent = listItemCreateBagDefault[0].IdProduct
                        itemNew.Color = itemColor.Color
                        itemNew.StatusWeight = StatusWeight
                        itemNew.Value = itemColor.Qty
                        itemNew.Remark = 'Tách bag bộ ' + itemColor.IdProduct
                        listItemCreateBagNew.push(itemNew)
                    })
                    list_stone_save.map(itemStone => {
                        if (itemCreateBag.IdProduct == itemStone.IdProduct) {
                            itemStone.IdBag = IdBagTemp
                            list_stone_save_new.push(itemStone)
                        }
                    })
                    listInsertBag.push({ listItemCreateBag: listItemCreateBagNew, IdBag: IdBagTemp, IdOrder: listItemCreateBagNew[0].IdOrder, list_stone_save: list_stone_save_new })
                    IdBag = IdBag + 1
                })
                this.props.InsertBagListSplitOdd(listInsertBag).then(() => {
                    this.child._addNotification(I18n.t(`alert.updatesuccess`), 'success')
                    this.loadData()
                })
            } else {
                this.props.generateIdBagSplitOdd().then((response) => {
                    let { data } = response.data
                    let IdTemp = (data && data[0].value)
                    if (IdTemp) {
                        // lấy id bag tự auto
                        let IdBag = parseInt(IdTemp)
                        listItemCreateBag.map((itemCreateBag, i) => {
                            let listItemCreateBagNew = [], list_stone_save_new = []
                            let StatusWeight = 'BAG_WEIGHT_STATUS_01'
                            let IdBagTemp = ''
                            itemCreateBag.listColor.map(itemColor => {
                                let itemNew = _.clone(itemCreateBag, true)
                                IdBagTemp = this.zeroPad(IdBag, 9)
                                itemNew.Id = IdBagTemp
                                itemNew.IdProductParent = listItemCreateBagDefault[0].IdProduct
                                itemNew.Color = itemColor.Color
                                itemNew.StatusWeight = StatusWeight
                                itemNew.Value = itemColor.Qty
                                itemNew.Remark = 'Tách bag bộ ' + itemColor.IdProduct
                                listItemCreateBagNew.push(itemNew)
                            })
                            list_stone_save.map(itemStone => {
                                if (itemCreateBag.IdProduct == itemStone.IdProduct) {
                                    itemStone.IdBag = IdBagTemp
                                    list_stone_save_new.push(itemStone)
                                }
                            })
                            listInsertBag.push({ listItemCreateBag: listItemCreateBagNew, IdBag: IdBagTemp, IdOrder: listItemCreateBagNew[0].IdOrder, list_stone_save: list_stone_save_new })
                            IdBag = IdBag + 1
                        })
                        this.props.InsertBagListSplitOdd(listInsertBag).then(() => {
                            this.child._addNotification(I18n.t(`alert.updatesuccess`), 'success')
                            this.loadData()
                        })
                    }
                })
            }
        } else {
            let statusWeight = 'BAG_WEIGHT_STATUS_02'
            let listItemCreateBag_temp = _.clone(listItemCreateBag, true)
            listItemCreateBag_temp.map(x => x.StatusWeight = statusWeight)
            listItemCreateBag_temp.map(x => x.SplitBag = 2)
            this.props.InsertBagList(listItemCreateBag_temp).then(res => {
                this.child._addNotification(I18n.t(`alert.updatesuccess`), 'success')
                this.loadData()
            })
        }


    }
    loadData() {
        let { itemDetailCreateBag } = this.props.bag
        this.props.getListProductsByOrder(itemDetailCreateBag)
    }
    _onChangeSplit(item, value) {
        if (item.SplitBag == 2) {
            this.child._addNotification(`Sản phẩm này đã tồn tại bag!`, 'warning')
        } else {
            this.props.updateCheckSplitBag(item, value)
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
                                        <div className="left">
                                            <button onClick={() => this._onCreateBag(true)} className="btn btn-primary">Tạo bag nhanh</button>
                                            <button onClick={() => this._onCreateBag(false)} className="btn btn-primary">Tạo bag</button>
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
                                        let { ProductsEachBag, Qty, Color, IdOrder, IdProduct, Image, IdCustomer, checked, Number, Price, SplitBag, IdOdd, checkedSplit } = item
                                        return (
                                            <tr key={`data_${i}`} onClick={() => this._onClickRow(item, !checked)}>
                                                <th scope="row">
                                                    <label>
                                                        <input type="checkbox" checked={checked} />
                                                    </label>
                                                </th>
                                                <td><LinkProduct id={IdProduct} /></td>
                                                <td>
                                                    <Combobox disable={true} type_code='DSM' keyInput="Color" value={Color} />
                                                </td>
                                                {/* <td>{Price}</td> */}
                                                <td>{Number}</td>
                                                <td>
                                                    <Cell index={i} type="text" width="100px" value={Qty} keyInput="Qty" id={IdProduct + Color} parentObject={this} />
                                                </td>
                                                <td>{ProductsEachBag}</td>
                                                <td>
                                                    {
                                                        IdOdd == "1" && SplitBag != 2 ?
                                                            <input type="checkbox"
                                                                onClick={evt => {
                                                                    evt.stopPropagation();
                                                                    this._onChangeSplit(item, !checkedSplit)
                                                                }}
                                                                checked={checkedSplit} />
                                                            : <span></span>
                                                    }
                                                </td>
                                                {/* {
                                                    IdOdd == "1" && SplitBag != 2 ? <td>
                                                        <button
                                                            onClick={evt => {
                                                                evt.stopPropagation();
                                                                this._btnSplitStone(SplitBag)
                                                            }}>Tách bộ</button></td>
                                                        : <td><span></span></td>
                                                } */}
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
