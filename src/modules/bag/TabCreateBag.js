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
        //set focus vào input nhập trọng lương đầu tiên
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
        let { listItemCreateBag, selectedOrder, itemDetail, isLoadingBag } = this.props.bag
        let type = ''
        if (isLoadingBag) {
            alert('Dữ liệu đang lưu, vui lòng đợi ...')
        } else {
            let listItemCreateBagClone = _.clone(listItemCreateBag, true)
            if (listItemCreateBagClone.length == 0) {
                type = 1
            } else {
                let IdProduct_temp = ''
                listItemCreateBagClone.map((item, i) => {
                    // Kiem tra trung san pham
                    if (IdProduct_temp && IdProduct_temp != item.IdProduct) {
                        type = 2
                        return
                    }
                    IdProduct_temp = item.IdProduct
                })
            }

            // Kiem tra check cùng sản phẩm tách
            if (type == '') {
                let checkedSplitTemp = ''
                listItemCreateBagClone.map((item, i) => {
                    if (checkedSplitTemp && checkedSplitTemp != item.checkedSplit) {
                        type = 6
                        return
                    }
                    checkedSplitTemp = item.checkedSplit
                })
            }



            // Kiem tra so luong san pham
            if (type == '') {
                listItemCreateBagClone.map((item, i) => {
                    let { Qty } = item
                    if (parseInt(Qty) == 0 || Qty == "NaN" || Qty == '') {
                        type = 7
                        return
                    }

                })
            }

            // Kiem tra so luong sản phẩm vượt mức
            if (type == '') {
                listItemCreateBagClone.map((item, i) => {
                    let { Number, ProductsEachBag, Qty } = item
                    let totalNum = ProductsEachBag + Qty
                    if (totalNum > Number) {
                        type = 8
                        return
                    }

                })
            }

            // Kiem tra san pham da tach
            if (type == '') {
                let SplitBag_temp = ''
                listItemCreateBagClone.map((item, i) => {
                    if (SplitBag_temp && item.SplitBag == 1 && SplitBag_temp != item.SplitBag) {
                        type = 4
                        return
                    }
                    SplitBag_temp = item.SplitBag
                })
            }

            switch (type) {
                case 8:
                    this.child._addNotification('Số lượng vượt giới hạn.', 'warning')
                    break;
                case 7:
                    this.child._addNotification('Vui lòng nhập số lượng sản phẩm.', 'warning')
                    break;
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
                    this.child._addNotification('Vui lòng chọn tách bộ các sản phẩm.', 'warning')
                    break;
                default:
                    let checkConfirm = true
                    // Kiểm tra trường hơp tạo bag nhanh thì hỏi
                    if (isQuick) {
                        if (!confirm('Bạn có muốn tạo bag nhanh?')) {
                            checkConfirm = false
                        }
                    }
                    if (checkConfirm) {
                        if (isQuick) {
                            this.props.updateLoadingBag()
                        }
                        let StatusSplitBag = listItemCreateBagClone[0].SplitBag
                        let checkedSplit = listItemCreateBagClone[0].checkedSplit

                        // ------------- trường hơp tạo bag thêm cho sản phẩm hiện tại ----------
                        if ([1, 2].indexOf(StatusSplitBag) != -1) {

                            // trường hợp đã tách vào table order_product_b
                            if (StatusSplitBag == 1) {
                                // cập nhật 
                                let listColor = [], listColorName = ''
                                listItemCreateBagClone.map((item, i) => {
                                    listColorName = listColorName + item.ColorName + ','
                                    listColor.push({ Color: item.Color, Qty: item.Qty })
                                })
                                var r = confirm(I18n.t(`alert.split_bag`) + ` bộ sản phẩm ${listItemCreateBagClone[0].IdProduct} màu ${listColorName || ''}`);
                                if (r == true) {
                                    listItemCreateBagClone.map(x => x.listColor = listColor)
                                    let obj = listItemCreateBagClone[0]
                                    this.props.getListProductsByOrderSplitBag(obj, obj.Qty).then(() => {
                                        this._getNumberAutoBagSplit(isQuick)
                                    })
                                }

                            } else {
                                // trường hợp tạo bag thêm cho sản phẩm
                                this._getNumberAutoBag(isQuick)
                            }

                        } else {
                            // ----------- trường hợp tạo bag mặc định ban đầu -----------------
                            // nếu click tách bộ 
                            if (checkedSplit) {
                                let IdProduct_temp = '', type = true, listColor = [], listColorName = ''
                                listItemCreateBagClone.map((item, i) => {
                                    listColorName = listColorName + item.ColorName + ','
                                    listColor.push({ Color: item.Color, Qty: item.Qty, IdProduct: item.IdChildrenProduct })
                                    if (IdProduct_temp && IdProduct_temp != item.IdProduct) {
                                        type = false
                                        return
                                    }
                                    IdProduct_temp = item.IdProduct
                                })

                                var r = confirm(I18n.t(`alert.split_bag`) + ` bộ sản phẩm ${listItemCreateBagClone[0].IdProduct} màu ${listColorName || ''}`);
                                if (r == true) {
                                    listItemCreateBagClone.map(x => x.listColor = listColor)

                                    this.props.updateStatusSplitOdd(listItemCreateBagClone, 1).then(() => {
                                        let obj = listItemCreateBagClone[0]
                                        this.props.getListProductsByOrderSplitBag(obj, obj.Qty).then(() => {
                                            this._getNumberAutoBagSplit(isQuick)
                                        })
                                    })
                                }

                            }

                            // trường hợp tạo bag bộ, lẻ 
                            else {
                                listItemCreateBagClone.map((itemData, i) => {
                                    this.props.updateStatusBagNotSplit(itemData, 2).then(res => {
                                        if (i == listItemCreateBagClone.length - 1) {
                                            this._getNumberAutoBag(isQuick)
                                        }
                                    })

                                })
                            }
                        }
                    }
                    break
            }
        }

    }
    _getNumberAutoBagSplit(isQuick) {
        this.props.getNumberAutoBagSplit().then((data) => {
            this.props.getListStoneByProductsInBagSplit(data).then(() => {
                if (isQuick) {
                    this.saveBag(isQuick)
                } else {
                    this.props.showModal(true)
                }
            })
        })
    }
    _getNumberAutoBag(isQuick) {
        this.props.getNumberAutoBag().then((data) => {
            let { listItemCreateBag } = this.props.bag
            let listItemCreateBagClone = _.clone(listItemCreateBag, true)
            this.props.getListStoneByProductsInBagNew(data, listItemCreateBagClone).then(() => {
                if (isQuick) {
                    this.saveBag(isQuick)
                } else {
                    this.props.showModal(true)
                }
            })
        })

    }

    ChangeValueCell(value) {
        this.props.updateQtyBagByIdProductColor(value)
    }
    handleClick() {

    }
    zeroPad(num, places) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    }
      saveBag(isQuick) {
        let isCheck = true, type = 0, message = ''
        var { listItemCreateBag, selectedOrder, itemDetail, list_stone_save, listItemCreateBagDefault,
            list_stone_save_split, list_stone_save_split_custom, itemDetailCreateBag } = this.props.bag
        var { split_odd, IdBagCreate, isLoadingBag } = this.props.bag

        let listItemCreateBagClone = _.clone(listItemCreateBag, true)
        let listItemCreateBagDefaultClone = _.clone(listItemCreateBagDefault, true)
        let list_stone_saveClone = _.clone(list_stone_save, true)
        // trường hợp tách bag
        if (split_odd) {
            let listInsertBag = []
            // trường hợp đã tạo số bag
            if (IdBagCreate) {
                let IdGroupBagNew = Helper.generateUUIDV4()
                let TypeSplitStone = listItemCreateBagClone[0].TypeSplitStone || 'TYPE_SPLIT_STONE_2'
                let IdTemp = IdBagCreate
                // lấy id bag tự auto
                let IdBag = parseInt(IdTemp)
                listItemCreateBagClone.map((itemCreateBag, i) => {
                    let listItemCreateBagNew = [], list_stone_save_new = []
                    let IdBagTemp = ''
                    itemCreateBag.listColor.map(itemColor => {
                        let itemNew = _.clone(itemCreateBag, true)
                        IdBagTemp = this.zeroPad(IdBag, 9)
                        itemNew.Id = IdBagTemp
                        itemNew.IdProductParent = listItemCreateBagDefaultClone[0].IdProduct
                        itemNew.Color = itemColor.Color
                        itemNew.Value = itemColor.Qty
                        if ([' ', 'null', '', 'null ', '  '].indexOf(itemNew.Remark) == -1) {
                            itemNew.Remark = 'Tách từ bộ ' + itemNew.IdProductParent + '(' + itemNew.Remark + ')'
                        } else {
                            itemNew.Remark = 'Tách từ bộ ' + itemNew.IdProductParent
                        }
                        listItemCreateBagNew.push(itemNew)
                    })
                    list_stone_saveClone.map(itemStone => {
                        if (itemCreateBag.IdProduct == itemStone.IdProduct) {
                            itemStone.IdBag = IdBagTemp
                            list_stone_save_new.push(itemStone)
                        }
                    })

                    let statusWeight = ''
                    let lenthNum = 0
                    list_stone_save_new.map(item => {
                        if (item.Weight > 0) {
                            lenthNum = lenthNum + 1
                        }
                    })
                    // trường hợp chưa nhập tất cả trọng lượng đá
                    if (lenthNum == 0) {
                        statusWeight = 'BAG_WEIGHT_STATUS_03'
                    } else if (lenthNum == list_stone_save.length) {
                        // trương hợp nhập đầy đủ trọng lượng
                        statusWeight = 'BAG_WEIGHT_STATUS_01'
                    } else {
                        // chỉ nhập 1 phần
                        statusWeight = 'BAG_WEIGHT_STATUS_02'
                    }
                    if (list_stone_save_new.length == 0) {
                        // không có đá
                        statusWeight = 'BAG_WEIGHT_STATUS_04'
                    }
                    listItemCreateBagNew.map(x => x.StatusWeight = statusWeight)
                    listItemCreateBagNew.map(x => x.IdGroupBag = IdGroupBagNew)
                    listItemCreateBagNew.map(x => x.TypeSplitStone = TypeSplitStone)
                    listInsertBag.push({ listItemCreateBag: listItemCreateBagNew, IdBag: IdBagTemp, IdOrder: listItemCreateBagNew[0].IdOrder, list_stone_save: list_stone_save_new })
                    IdBag = IdBag + 1
                })
                this.props.InsertBagListSplitOdd(listInsertBag).then((res) => {
                    let { StatusCode } = res.data
                    if (StatusCode != 0) {
                        this.child._addNotification(`Mã Bag này đã tồn tại, vui lòng tạo lại bag!`, 'warning')
                    } else {
                        this.child._addNotification(I18n.t(`alert.updatesuccess`), 'success')
                    }
                    if (isQuick) {
                        this.props.cleanStone()
                    }
                    this.loadData()
                })
            } else {
                let IdGroupBagNew = Helper.generateUUIDV4()
                let TypeSplitStone = listItemCreateBagClone[0].TypeSplitStone || 'TYPE_SPLIT_STONE_2'
                this.props.generateIdBagSplitOdd().then((response) => {
                    let { data } = response.data
                    let IdTemp = (data && data[0].value)
                    if (IdTemp) {
                        // lấy id bag tự auto
                        let IdBag = parseInt(IdTemp)
                        let IdGroupBagNew = Helper.generateUUIDV4()
                        listItemCreateBagClone = listItemCreateBagClone.map(item => {
                            item.IdGroupBag = IdGroupBagNew
                            return item
                        })
                        listItemCreateBagClone.map((itemCreateBag, i) => {
                            let listItemCreateBagNew = [], list_stone_save_new = []
                            let IdBagTemp = ''
                            itemCreateBag.listColor.map(itemColor => {
                                let itemNew = _.clone(itemCreateBag, true)
                                IdBagTemp = this.zeroPad(IdBag, 9)
                                itemNew.Id = IdBagTemp
                                itemNew.IdProductParent = listItemCreateBagDefaultClone[0].IdProduct
                                itemNew.Color = itemColor.Color
                                itemNew.Value = itemColor.Qty
                                if ([' ', 'null', '', 'null ', '  '].indexOf(itemNew.Remark) == -1) {
                                    itemNew.Remark = 'Tách từ bộ ' + itemNew.IdProductParent + '(' + itemNew.Remark + ')'
                                } else {
                                    itemNew.Remark = 'Tách từ bộ ' + itemNew.IdProductParent
                                }
                                listItemCreateBagNew.push(itemNew)
                            })
                            list_stone_saveClone.map(itemStone => {
                                if (itemCreateBag.IdProduct == itemStone.IdProduct) {
                                    itemStone.IdBag = IdBagTemp
                                    list_stone_save_new.push(itemStone)
                                }
                            })
                            let statusWeight = ''
                            let lenthNum = 0
                            list_stone_save_new.map(item => {
                                if (item.Weight > 0 || (item.numofstone==0 && (item.Weight || item.Weight == 0))) {
                                    lenthNum = lenthNum + 1
                                }
                            })
                            // trường hợp chưa nhập tất cả trọng lượng đá
                            if (lenthNum == 0) {
                                statusWeight = 'BAG_WEIGHT_STATUS_03'
                            } else if (lenthNum == list_stone_saveClone.length) {
                                // trương hợp nhập đầy đủ trọng lượng
                                statusWeight = 'BAG_WEIGHT_STATUS_01'
                            } else {
                                // chỉ nhập 1 phần
                                statusWeight = 'BAG_WEIGHT_STATUS_02'
                            }
                            if (list_stone_save_new.length == 0) {
                                // không có đá
                                statusWeight = 'BAG_WEIGHT_STATUS_04'
                            }
                            listItemCreateBagNew.map(x => x.TypeSplitStone = TypeSplitStone)
                            listItemCreateBagNew.map(x => x.IdGroupBag = IdGroupBagNew)
                            listItemCreateBagNew.map(x => x.StatusWeight = statusWeight)
                            listInsertBag.push({ listItemCreateBag: listItemCreateBagNew, IdBag: IdBagTemp, IdOrder: listItemCreateBagNew[0].IdOrder, list_stone_save: list_stone_save_new })
                            IdBag = IdBag + 1
                        })
                        this.props.InsertBagListSplitOdd(listInsertBag).then((res) => {
                            let { StatusCode } = res.data
                            if (StatusCode != 0) {
                                this.child._addNotification(`Mã Bag này đã tồn tại, vui lòng tạo lại bag!`, 'warning')
                            } else {
                                this.child._addNotification(I18n.t(`alert.updatesuccess`), 'success')
                            }
                            if (isQuick) {
                                this.props.cleanStone()
                            }
                            this.loadData()
                        })
                    }
                })
            }
        } else {
            let statusWeight = ''
            let lenthNum = 0
            list_stone_saveClone.map(item => {
                if (item.Weight > 0) {
                    lenthNum = lenthNum + 1
                }
            })
            // trường hợp chưa nhập tất cả trọng lượng đá
            if (lenthNum == 0) {
                statusWeight = 'BAG_WEIGHT_STATUS_03'
            } else if (lenthNum == list_stone_saveClone.length) {
                // trương hợp nhập đầy đủ trọng lượng
                statusWeight = 'BAG_WEIGHT_STATUS_01'
            } else {
                // chỉ nhập 1 phần
                statusWeight = 'BAG_WEIGHT_STATUS_02'
            }
            if (list_stone_saveClone.length == 0) {
                // không có đá
                statusWeight = 'BAG_WEIGHT_STATUS_04'
            }
            listItemCreateBagClone.map(x => x.StatusWeight = statusWeight)
            listItemCreateBagClone.map(x => x.SplitBag = 2)
            this.props.InsertBagList(listItemCreateBagClone).then(res => {
                let { StatusCode } = res.data
                if (StatusCode != 0) {
                    this.child._addNotification(`Mã Bag này đã tồn tại, vui lòng tạo lại bag!`, 'warning')
                } else {
                    this.child._addNotification(I18n.t(`alert.updatesuccess`), 'success')
                }
                if (isQuick) {
                    this.props.cleanStone()
                }
                this.loadData()
            })
        }
    }
    loadData() {
        let { itemDetailCreateBag } = this.props.bag
        let itemDetailCreateBagClone = _.clone(itemDetailCreateBag, true)
        this.props.getListProductsByOrder(itemDetailCreateBagClone)
    }
    _onChangeSplit(item, value) {
        if (item.SplitBag == 2) {
            this.child._addNotification(`Sản phẩm này đã tồn tại bag!`, 'warning')
        } else {
            this.props.updateCheckSplitBag(item, value)
        }
    }
    onKeyPressInput(obj) {
        let { typeInput, index, id, tabIndex, idTable } = obj
        $(`#${'idTableProductInBag'} > tbody  > tr`).each(function (i, item) {
            if (i == index + 1) {
                $(item).find('input:text')[0].focus()
            }
        });
    }
    _onCheckAllBag(value) {
        this.props.checkAllBag(value)
    }
    render() {
        let { allChecked, listHeaderTable, page, list_data } = this.props.order
        let { list_order_combobox, listHeaderProducts, ListProductByOrderInBag, checkAllBag } = this.props.bag
        let idTable = 'idTableProductInBag'
        return (
            <div>
                {/* <Loader loading={true} /> */}
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
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label><input onChange={() => this._onCheckAllBag(!checkAllBag)} checked={checkAllBag} type="checkbox" /> Bag đã tạo</label>
                                    </div>
                                </div>
                            </div>
                            <table className="table table-striped" id={idTable}>
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
                                        let { ProductsEachBag, Qty, Color, IdOrder, IdProduct, Image, IdCustomer, checked, Number, Price, SplitBag, IdOdd, checkedSplit, Size } = item
                                        return (
                                            <tr key={`data_${i}`} >
                                                <th scope="row">
                                                    <label>
                                                        <input onChange={() => this._onClickRow(item, !checked)} type="checkbox" checked={checked} />
                                                    </label>
                                                </th>
                                                <td><LinkProduct id={IdProduct} /></td>
                                                <td>
                                                    <Combobox disable={true} type_code='DSM' keyInput="Color" value={Color} />
                                                </td>
                                                <td>{Size}</td>
                                                <td>{Number}</td>
                                                <td>
                                                    <Cell idTable={idTable} index={i} type="text" width="40px" value={Qty} keyInput="Qty" id={IdProduct + Color} parentObject={this} />
                                                </td>
                                                <td>{ProductsEachBag}</td>
                                                <td>
                                                    {
                                                        IdOdd == "1" && SplitBag != 2 ?
                                                            <input type="checkbox"
                                                                disabled={SplitBag == 0 ? false : true}
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
                                                <td>
                                                    <button
                                                        onClick={evt => {
                                                            evt.stopPropagation();
                                                            this._onCreateBag(true)
                                                        }}>Tạo bag nhanh</button>
                                                </td>
                                                <td>
                                                    <button
                                                        // disabled = {true}
                                                        onClick={evt => {
                                                            evt.stopPropagation();
                                                            this._onCreateBag(false)
                                                        }}>Tạo bag</button>
                                                </td>
                                            </tr>)
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div >

            </div >

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
