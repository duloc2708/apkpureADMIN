import Modal from 'react-modal';
import * as bagActions from 'modules/bag/actions/form'
const { Translate, I18n } = ReactReduxI18n;
import ModalFormCreatebag from './ModalFormCreatebag'

const customStyles = {
    content: {
        width: "1200px",
        top: '52%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};
Modal.setAppElement('#yourAppElement')
class CreateBagFromView extends React.Component {
    constructor() {
        super();
    }
    afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
    }

    closeModal() {
        let { itemDetailCreateBag } = this.props.bag
        let itemDetailCreateBagClone = _.clone(itemDetailCreateBag, true)
        this.props.showModal(false)
        this.props.cleanStone()
        this.props.getListProductsByOrder(itemDetailCreateBagClone)
    }
    loadData() {
        let { page, total } = this.props.bag
        let params = {
            page: page,
            total: total
        }
        // this.props.getListDataOrderInBag(params).then(res => {
        //     let currentURL = document.URL;
        //     let url = new URL(currentURL);
        //     let IdOrder = url.searchParams.get("IdOrder");
        //     if (IdOrder)
        //         this.props.clickCheckRowOrderInBag(IdOrder, true)
        // })
    }
    _checkBagNoDelete(editBagNo) {
        if (editBagNo) {
            return new Promise((resolve, reject) => {
                resolve({ isCheck: true })
            })
        } else {
            return new Promise((resolve, reject) => {
                this.props.getBagNoExist().then(res => {
                    let { value } = res.data.data
                    if (value == 1) {
                        resolve({ isCheck: true })
                    } else {
                        resolve({ isCheck: false })
                    }
                })
            })
        }

    }
  saveBag() {
        let isCheck = true, type = 0, message = ''
        let { editBagNo, isLoadingBag } = this.props.bag
        if (isLoadingBag) {
            alert('Dữ liệu đang lưu, vui lòng đợi ...')
        }
        var r = confirm('Bạn muốn lưu bag này!');
        if (r == true) {
            this._checkBagNoDelete(editBagNo).then(resBag => {
                if (!resBag.isCheck) {
                    alert('Bag no này đang sử dụng, chọn BAG khác!')
                } else {
                    let { listItemCreateBag, selectedOrder, itemDetail, list_stone_save, listItemCreateBagDefault,
                        list_stone_save_split, list_stone_save_split_custom, itemDetailCreateBag, isNew, split_odd, IdBagCreate } = this.props.bag
                    if (!isLoadingBag) {
                        this.props.updateLoadingBag()
                    }
                    // trường hợp edit thì lấy mã bag hiện tại làm id bag mới nhất
                    let listItemCreateBagClone = _.clone(listItemCreateBag, true)
                    let listItemCreateBagDefaultClone = _.clone(listItemCreateBagDefault, true)
                    let list_stone_saveClone = _.clone(list_stone_save, true)
                    // trường hợp tách bag
                    if (split_odd) {
                        let listInsertBag = []
                        // trường hợp đã tạo số bag
                        if (IdBagCreate) {
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
                                listItemCreateBagNew.map(x => x.TypeSplitStone = TypeSplitStone)
                                listInsertBag.push({ listItemCreateBag: listItemCreateBagNew, IdBag: IdBagTemp, IdOrder: listItemCreateBagNew[0].IdOrder, list_stone_save: list_stone_save_new })
                                IdBag = IdBag + 1
                            })
                            this.props.InsertBagListSplitOdd(listInsertBag).then((res) => {
                                let { StatusCode } = res.data
                                if (StatusCode != 0) {
                                    this.child._addNotification(`Mã Bag này đã tồn tại, vui lòng tạo lại bag!`, 'warning')
                                    this.closeModal()
                                } else {
                                    this.child._addNotification(I18n.t(`alert.updatesuccess`), 'success')
                                }
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
                                    listItemCreateBagClone.map((itemCreateBag, i) => {
                                        let listItemCreateBagNew = [], list_stone_save_new = []
                                        let IdBagTemp = ''
                                        itemCreateBag.listColor.map(itemColor => {
                                            let itemNew = _.clone(itemCreateBag, true)
                                            IdBagTemp = this.zeroPad(IdBag, 9)
                                            itemNew.Id = IdBagTemp
                                            itemNew.IdProductParent = listItemCreateBagDefault[0].IdProduct
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
                                        listItemCreateBagNew.map(x => x.IdGroupBag = IdGroupBagNew)
                                        listItemCreateBagNew.map(x => x.StatusWeight = statusWeight)
                                        listItemCreateBagNew.map(x => x.TypeSplitStone = TypeSplitStone)


                                        listInsertBag.push({ listItemCreateBag: listItemCreateBagNew, IdBag: IdBagTemp, IdOrder: listItemCreateBagNew[0].IdOrder, list_stone_save: list_stone_save_new })
                                        IdBag = IdBag + 1
                                    })
                                    this.props.InsertBagListSplitOdd(listInsertBag).then((res) => {
                                        let { StatusCode } = res.data
                                        if (StatusCode != 0) {
                                            this.child._addNotification(`Mã Bag này đã tồn tại, vui lòng tạo lại bag!`, 'warning')
                                            this.closeModal()
                                        } else {
                                            this.child._addNotification(I18n.t(`alert.updatesuccess`), 'success')
                                        }
                                    })
                                }
                            })
                        }
                    } else {
                        let statusWeight = 'BAG_WEIGHT_STATUS_01'
                        listItemCreateBagClone.map((item, i) => {
                            if (parseFloat(item.Number) < parseFloat(item.Value) + parseFloat(item.ProductsEachBag)) {
                                isCheck = false
                                type = 2
                                message = 'Số lượng tạo bag vượt số lượng đặt hàng!'
                                return false
                            }
                        })
                        let listItemCreateBag_temp = listItemCreateBagClone
                        let list_stone_save_temp = _.clone(list_stone_save, true)
                        if ([1, 2].indexOf(type) == -1) {
                            listItemCreateBag_temp.map((item, i) => {
                                let { IdOdd, listChildrenProduct } = item
                                if (IdOdd == "1") {
                                    listChildrenProduct.map((itemProduct) => {
                                        let check = list_stone_save_temp.filter(x =>
                                            x.IdProductParent == itemProduct.IdParent
                                            && x.IdProduct == itemProduct.IdProductChildren
                                            && x.ColorParent == itemProduct.ColorParent
                                        )
                                        if (check.length == 0) {
                                            type = 3
                                            isCheck = false
                                            statusWeight = 'BAG_WEIGHT_STATUS_02'
                                            message = `Vui lòng cập nhật trọng lượng đá => sản phẩm ${itemProduct.IdProductChildren} thuộc bộ ${itemProduct.IdParent} có màu ${item.ColorName}`
                                            return
                                        } else {
                                            list_stone_save_temp.map((item2) => {
                                                if (parseFloat(item2.Weight) <= 0) {
                                                    type = 4
                                                    isCheck = false
                                                    statusWeight = 'BAG_WEIGHT_STATUS_02'
                                                    message = `Vui lòng cập nhật trọng lượng đá => sản phẩm ${itemProduct.IdProductChildren} thuộc bộ ${itemProduct.IdParent} có màu ${item.ColorName}`
                                                    return
                                                }
                                            })
                                        }
                                    })
                                } else {
                                    let check = list_stone_save_temp.filter(x => x.IdProductColor == item.IdProduct + item.Color)
                                    if (check.length == 0) {
                                        type = 3
                                        isCheck = false
                                        statusWeight = 'BAG_WEIGHT_STATUS_02'
                                        message = `Vui lòng cập nhật trọng lượng đá => sản phẩm ${item.IdProduct} có màu ${item.ColorName}.`
                                        return
                                    } else {
                                        list_stone_save_temp.map((item2) => {
                                            if (parseFloat(item2.Weight) <= 0) {
                                                type = 4
                                                isCheck = false
                                                statusWeight = 'BAG_WEIGHT_STATUS_02'
                                                message = `Vui lòng cập nhật trọng lượng đá => sản phẩm ${item.IdProduct} có màu ${item.ColorName}.`
                                                return
                                            }
                                        })
                                    }
                                }

                            })
                        }
                        let lenthNum = 0
                        list_stone_save_temp.map(item => {
                            if (item.Weight > 0) {
                                lenthNum = lenthNum + 1
                            }
                        })
                        // trường hợp chưa nhập tất cả trọng lượng đá
                        if (lenthNum == 0) {
                            statusWeight = 'BAG_WEIGHT_STATUS_03'
                        } else if (lenthNum == list_stone_save_temp.length) {
                            // trương hợp nhập đầy đủ trọng lượng
                            statusWeight = 'BAG_WEIGHT_STATUS_01'
                        } else {
                            // chỉ nhập 1 phần
                            statusWeight = 'BAG_WEIGHT_STATUS_02'
                        }
                        if (list_stone_save_temp.length == 0) {
                            // không có đá
                            statusWeight = 'BAG_WEIGHT_STATUS_04'
                        }
                        if (!isCheck) {
                            if (type == 2) {
                                this.child._addNotification(message, 'warning')
                                return false
                            } else {
                                var r = confirm(`${message}`);
                                if (r == true) {
                                    listItemCreateBag_temp = listItemCreateBag_temp.filter(x => x.Value != 0)
                                    if (listItemCreateBag_temp.length > 0) {
                                        listItemCreateBag_temp.map(x => x.StatusWeight = statusWeight)
                                        if (!isNew) {
                                            if (IdBagCreate) {
                                                listItemCreateBag_temp.map(x => x.Id = IdBagCreate)
                                                this.props.InsertBagList(listItemCreateBag_temp).then(res => {
                                                    let { StatusCode } = res.data
                                                    if (StatusCode != 0) {
                                                        this.child._addNotification(`Mã Bag này đã tồn tại, vui lòng tạo lại bag!`, 'warning')
                                                        this.closeModal()
                                                    } else {
                                                        this.child._addNotification(I18n.t(`alert.updatesuccess`), 'success')
                                                    }
                                                })
                                            } else {
                                                this.props.generateIdBagSave().then((response) => {
                                                    let { data } = response.data
                                                    let IdTemp = (data && data[0].value)
                                                    listItemCreateBag_temp.map(x => x.Id = IdTemp)
                                                    this.props.InsertBagList(listItemCreateBag_temp).then(res => {
                                                        let { StatusCode } = res.data
                                                        if (StatusCode != 0) {
                                                            this.child._addNotification(`Mã Bag này đã tồn tại, vui lòng tạo lại bag!`, 'warning')
                                                            this.closeModal()
                                                        } else {
                                                            this.child._addNotification(I18n.t(`alert.updatesuccess`), 'success')
                                                        }                                                    })
                                                })
                                            }

                                        } else {
                                            this.props.InsertBagList(listItemCreateBag_temp).then(res => {
                                                let { StatusCode } = res.data
                                                if (StatusCode != 0) {
                                                    this.child._addNotification(`Mã Bag này đã tồn tại, vui lòng tạo lại bag!`, 'warning')
                                                    this.closeModal()
                                                } else {
                                                    this.child._addNotification(I18n.t(`alert.updatesuccess`), 'success')
                                                }
                                            })
                                        }


                                    }
                                }
                            }

                        } else {
                            listItemCreateBag_temp = listItemCreateBag_temp.filter(x => x.Value != 0)
                            if (listItemCreateBag_temp.length > 0) {
                                listItemCreateBag_temp.map(x => x.StatusWeight = statusWeight)
                                if (!isNew) {
                                    if (IdBagCreate) {
                                        listItemCreateBag_temp.map(x => x.Id = IdBagCreate)
                                        this.props.InsertBagList(listItemCreateBag_temp).then(res => {
                                            let { StatusCode } = res.data
                                            if (StatusCode != 0) {
                                                this.child._addNotification(`Mã Bag này đã tồn tại, vui lòng tạo lại bag!`, 'warning')
                                                this.closeModal()
                                            } else {
                                                this.child._addNotification(I18n.t(`alert.updatesuccess`), 'success')
                                            }
                                        })
                                    } else {
                                        this.props.generateIdBagSave().then((response) => {
                                            let { data } = response.data
                                            let IdTemp = (data && data[0].value)
                                            listItemCreateBag_temp.map(x => x.Id = IdTemp)
                                            this.props.InsertBagList(listItemCreateBag_temp).then(res => {
                                                let { StatusCode } = res.data
                                                if (StatusCode != 0) {
                                                    this.child._addNotification(`Mã Bag này đã tồn tại, vui lòng tạo lại bag!`, 'warning')
                                                    this.closeModal()
                                                } else {
                                                    this.child._addNotification(I18n.t(`alert.updatesuccess`), 'success')
                                                }
                                            })
                                        })
                                    }
                                } else {
                                    this.props.InsertBagList(listItemCreateBag_temp).then(res => {
                                        let { StatusCode } = res.data
                                        if (StatusCode != 0) {
                                            this.child._addNotification(`Mã Bag này đã tồn tại, vui lòng tạo lại bag!`, 'warning')
                                            this.closeModal()
                                        } else {
                                            this.child._addNotification(I18n.t(`alert.updatesuccess`), 'success')
                                        }
                                    })

                                }
                            }
                        }
                    }
                }
            })
        }




    }
    componentDidMount() {

    }
    ChangeValueCell(value) {
        this.props.updateCellBag(value)
    }
    _renderTable() {
        let { listItemCreateBag } = this.props.bag
        return (
            <table >
                <thead>
                    <tr>
                        <th key={`thead_${0}`} scope="col">{'Màu đá'}</th>
                        <th key={`thead_${1}`} scope="col">{'Số lượng'}</th>
                    </tr>
                </thead>
                <tbody>
                    {listItemCreateBag.map((item, i) => {
                        let { Color, IdOrderProduct, Value } = item
                        return (
                            <tr key={`dataDetail_${i}`}>
                                <td style={{ "textAlign": "center" }}>
                                    <Combobox disable={true} type_code='DSM' keyInput="Color" value={Color} id={IdOrderProduct} parentObject={this} />
                                </td>
                                <Cell type="number" width="100px" value={Value} keyInput="Value" id={IdOrderProduct} parentObject={this} />

                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )

    }
    _renderInput() {
        return (
            <input type='text' className="name form-control allownumericwithdecimal" placeholder="0" id="Qty" ref="Qty" />
        )
    }
    _onViewPrint() {
        let { itemDetailCreateBag, isSaveBag } = this.props.bag
        if (itemDetailCreateBag.Id && isSaveBag) {
            let pr = '?idbag=' + itemDetailCreateBag.Id
            window.open(Routes.bagDetail.view + pr, 'header', 'fullscreen="yes"', true)
        } else {
            this.child._addNotification(`Vui lòng lưu bag!`, 'success')
        }

    }
    _onArrowLeft() {
        let { itemDetailCreateBag } = this.props.bag
        this.props.checkCodeExistsBag(itemDetailCreateBag.Id).then(res => {
            let { value } = res.data.data
            if (value == 0) {
                alert('Vui lòng lưu bag hiện tại.')
            } else {
                let id = parseInt(itemDetailCreateBag.Id) - 1
                id = this.zeroPad(id, 9)
                this.props.getListDetailByBag(id)
            }
        })

    }
    _onArrowRight() {
        let { itemDetailCreateBag } = this.props.bag
        this.props.checkCodeExistsBag(itemDetailCreateBag.Id).then(res => {
            let { value } = res.data.data
            if (value == 0) {
                alert('Vui lòng lưu bag hiện tại.')
            } else {
                let id = parseInt(itemDetailCreateBag.Id) + 1
                id = this.zeroPad(id, 9)
                this.props.getListDetailByBag(id)
            }
        })


    }
    _checkSaveBag() {
        let { itemDetailCreateBag } = this.props.bag
        this.props.checkCodeExistsBag().then(res => {
            let { value } = res.data.data
            if (value == 1) {
                alert()
            }
        })
    }
    zeroPad(num, places) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    }
    saveStoneConfig() {
        let { list_stone_save } = this.props.bag
        let list_stone_config = []
        list_stone_save.map((item) => {

            let check = list_stone_config.filter(x => x.IdProduct == item.IdProduct
                && x.IdStone == item.IdStone)
            if (check.length == 0) {
                let obj = {
                    IdProduct: item.IdProduct,
                    IdStone: item.IdStone,
                    PrimaryStone: item.PrimaryStone
                }
                list_stone_config.push(obj)
            }
        })
        this.props.setPrimaryStoneDefault(list_stone_config).then((res) => {
            alert('Cập nhật thành công.')
        })
    }

    render() {
        let { isShow, itemDetail, listItemCreateBag, isSaveBag } = this.props.bag
        return (
            <div>
                <AlertCustom onRef={ref => (this.child = ref)} />
                <Modal
                    isOpen={isShow}
                    onAfterOpen={() => this.afterOpenModal()}
                    // onRequestClose={() => this.closeModal()}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <ModalFormCreatebag />
                    <hr />
                    <div>
                        <div style={{ "textAlign": "right" }}>
                            <button onClick={() => this._onArrowLeft()} ><i className="fa fa-arrow-left" aria-hidden="true"></i></button>
                            <button onClick={() => this._onArrowRight()}><i className="fa fa-arrow-right" aria-hidden="true"></i></button>
                            <button onClick={() => this.saveStoneConfig()}>C.Hình đá</button>
                            <button onClick={() => this._onViewPrint()} >In bag</button>
                            <button onClick={() => this.saveBag()}>Lưu</button>
                            <button onClick={() => this.closeModal()}>Đóng</button>
                        </div>
                    </div>

                </Modal>
            </div>
        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    bag
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        bag
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...bagActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CreateBagFromView)
