import {
    GET_LIST_ORDER_COMBOBOX,
    GET_LIST_PRODUCTS_BY_ORDER,
    SELECTED_ORDER,
    CLICK_ROW_DATA,
    SHOW_MODAL_TEST,
    SAVE_BAG,
    GENERATE_NUMBER_ID_BAG,
    GET_LIST_BAG,
    SAVE_BAG_LIST,
    UPDATE_CELL_INPUT_BAG,
    CLICK_ROW_DATA_BAG,
    GET_DETAIL_BY_BAG,
    RESET_DATA_BAG,
    GET_LIST_ORDER_IN_BAG,
    GET_LIST_ORDER_IN_BAG_SEARCH,
    CHANGE_PAGE_TABLE_IN_BAG,
    CLICK_ROW_DATA_ORDER_IN_BAG,
    CLICK_ROW_CREATE_BAG,
    GET_LIST_STONE_BY_PRODUCTS_IN_BAG,
    RESET_LIST_STONE,
    GET_DEFAULT_LIST_STONE,
    UPDATE_SPLIT_BAG,
    GET_LIST_PRODUCT_BY_ORDER_SPLIT_BAG,
    REMOVE_PRODUCT_IN_BAG,
    GET_LIST_STONE_BY_PRODUCTS_DETAIL,
    CLEAN_STONE,
    UPDATE_ITEM_STONE_SPLIT,
    UPDATE_LIST_STONE_SPLIT,
    REMOVE_STONE_SPLIT,
    UPDATE_PRIMARY_STONE
} from '../types'
import { updateInfoPage } from 'modules/common/actions/form'

export const getListStoneByProductsDetail = () => {
    return (dispatch, getState) => {
        let { list_stone_save, listItemCreateBag, itemDetailCreateBag } = getState().bag
        return new Promise((resolve, reject) => {
            Promise.all([
                axios.get(`${Config.API_URL_USER}bag/get_list_stone_detail_view`, { params: { IdBag: itemDetailCreateBag.Id } }),
                axios.get(`${Config.API_URL_USER}bag/get_list_stone_split_detail_view`, { params: { IdBag: itemDetailCreateBag.Id } }),
                axios.get(`${Config.API_URL_USER}bag/get_list_stone_split_detail_view_custom`, { params: { IdBag: itemDetailCreateBag.Id } })
            ])
                .then((response) => {
                    let list_stone_save_temp = response[0].data.data
                    let list_stone_save_split_temp = response[1].data.data
                    let list_stone_save_split_custom_temp = response[2].data.data

                    dispatch({
                        type: GET_LIST_STONE_BY_PRODUCTS_DETAIL,
                        payload: {
                            list_stone_save: list_stone_save_temp || [],
                            list_stone_save_split: list_stone_save_split_temp || [],
                            list_stone_save_split_custom: list_stone_save_split_custom_temp
                        }
                    })
                    resolve(response)
                })
        }, (err) => {
            reject(err)
        })
    }
}


export const clickRowDataCreateBag = (obj) => {
    return (dispatch, getState) => {
        let { list_stone_save } = getState().bag
        var let_data_temp = _.clone(list_stone_save, true)
        dispatch({
            type: CLICK_ROW_CREATE_BAG,
            payload: {
                itemDetailCreateBag: obj
            }
        })
        // console.log('item........', obj);
        // console.log('list_stone_save........', let_data_temp);
        let check = let_data_temp.filter(x => x.IdProduct == obj.IdChildrenProduct && obj.Color == x.ColorParent)
        console.log('clickRowDataCreateBag', obj);
        if (check.length == 0) {
            dispatch(getListStoneByProductsInBag(obj, let_data_temp))
        }
    }
}

export const updateIdChildrenProduct = (obj) => {
    return (dispatch, getState) => {
        let { listItemCreateBag, list_stone_save } = getState().bag
        let list_stone_save_temp = _.clone(list_stone_save, true);
        let temp = _.clone(listItemCreateBag, true);
        //IdProductParent: IdProductParent, IdProductChildren:
        temp.map((item, i) => {
            if (item.IdProduct == obj.IdParent && item.Color == obj.Color) {
                item["IdChildrenProduct"] = obj.IdProductChildren
                let check = list_stone_save_temp.filter(x => x.IdProduct == item.IdChildrenProduct)
                if (check.length == 0) {
                    dispatch(getListStoneByProductsInBag(item, list_stone_save_temp))
                }

            }
            return item
        })
        dispatch({
            type: UPDATE_CELL_INPUT_BAG,
            payload: {
                listItemCreateBag: temp,
            }
        })

    }
}

export const updateIdChildrenProductDetail = (obj) => {
    return (dispatch, getState) => {
        let { listItemCreateBag, list_stone_save, itemDetailCreateBag } = getState().bag
        let itemDetailCreateBag_temp = _.clone(itemDetailCreateBag, true)
        let listItemCreateBag_temp = _.clone(listItemCreateBag, true)
        listItemCreateBag_temp.map((item) => {
            if (item.Color == obj.Color) {
                item.IdChildrenProduct = obj.IdProductChildren
            }
            return item
        })
        itemDetailCreateBag_temp.IdChildrenProduct = obj.IdProductChildren

        dispatch({
            type: UPDATE_CELL_INPUT_BAG,
            payload: {
                itemDetailCreateBag: itemDetailCreateBag_temp,
                listItemCreateBag: listItemCreateBag_temp
            }
        })
    }
}

export const updatePrimaryStone = (itemCheck,checkval) => {
  //  console.log('updatePrimaryStone>>>', checkval,itemCheck);
    return (dispatch, getState) => {
        let { list_stone_save, listItemCreateBag, itemDetailCreateBag } = getState().bag
        let list_stone_save_temp = _.clone(list_stone_save, true);
        
        
        // nếu là sản phẩm  lẻ
        if (itemDetailCreateBag.IdOdd != "1") {
            list_stone_save_temp.map((item, i) => {
                let { IdStone, IdProduct, IdProductParent, ColorParent } = item
                console.log(">>truongnn",itemDetailCreateBag.IdOdd,":>>",item.IdBagIdProductIdStone ,itemCheck.IdBagIdProductIdStone)
                if (checkval==false && (item.IdBagIdProductIdStone == itemCheck.IdBagIdProductIdSton || 
                    item.IdProductParentIdProductStone == itemCheck.IdProductParentIdProductStone)) {
                    item.PrimaryStone = 0
                    item.Color = '001'
                }
                else if (item.IdBagIdProductIdStone == itemCheck.IdBagIdProductIdStone || 
                    item.IdProductParentIdProductStone == itemCheck.IdProductParentIdProductStone)
                {
                    console.log(">>truongnn",itemDetailCreateBag.IdOdd,"<:>>",item.IdBagIdProductIdStone ,itemCheck.IdBagIdProductIdStone)
                    if (item.IdBagIdProductIdStone == itemCheck.IdBagIdProductIdStone) {
                        item.PrimaryStone = 1
                        let itemParent = listItemCreateBag.filter(x => x.IdProductColor == item.IdProductParent + item.ColorParent)
                        item.Color = itemParent[0].Color
                    }
                }
                item.IdProductColorStone = IdProduct + item.Color + IdStone
                item.IdProductParentIdProductStoneColor = IdProductParent + IdProduct + IdStone + item.Color
                item.IdProductParentIdProductStone = IdProductParent + IdProduct + IdStone
                item.IdProductColor = IdProduct + item.Color
                item.IdProductColorParentColorStone = IdProduct + ColorParent + item.Color + IdStone
                return item
            })
        }
        // nếu là sản phẩm bộ
        else {
            let itemSelect = itemCheck
            list_stone_save_temp.map((item, i) => {
                if (item.IdProduct == itemSelect.IdProduct) {
                    console.log(">>truongnn",itemDetailCreateBag.IdOdd,":>",item.IdBagIdProductIdStone,itemCheck.IdProductParentIdProductStone )
                    if (checkval==false && (item.IdProductParentIdProductStone == itemCheck.IdProductParentIdProductStone
                        || item.IdBagIdProductIdStone==itemCheck.IdBagIdProductIdStone)) {
                        item.PrimaryStone = 0
                        item.Color = '001'
                    }
                    else if (item.IdProductParentIdProductStone == itemCheck.IdProductParentIdProductStone || item.IdBagIdProductIdStone==itemCheck.IdBagIdProductIdStone) {
                            const { IdStone, IdProduct, IdProductParent, ColorParent } = item                            
                            item.PrimaryStone = 1
                            let itemParent = listItemCreateBag.filter(x => x.IdProduct + x.Color == item.IdProductParent + item.ColorParent)
                            item.Color = itemParent[0].Color
                            item.IdProductColorStone = IdProduct + item.Color + IdStone
                            item.IdProductColor = IdProduct + item.Color
                            item.IdProductParentIdProductStoneColor = IdProductParent + IdProduct + IdStone + item.Color
                            item.IdProductParentIdProductStone = IdProductParent + IdProduct + IdStone
                            item.IdProductColorParentColorStone = IdProduct + ColorParent + item.Color + IdStone                        
                    }
                }
                return item
            })
        }

        dispatch({
            type: UPDATE_PRIMARY_STONE,
            payload: {
                list_stone_save: list_stone_save_temp
            }
        })

    }
}

export const updateTypeSplitStone = (obj) => {
    let { other } = obj
    return (dispatch, getState) => {
        let { listItemCreateBag } = getState().bag
        let temp = _.clone(listItemCreateBag, true);
        temp.map((item, i) => {
            item[obj.key] = (obj.value)
        })
        dispatch({
            type: UPDATE_CELL_INPUT_BAG,
            payload: {
                listItemCreateBag: temp
            }
        })

    }
}
export const updateTypeBag = (obj) => {
    let { other } = obj
    return (dispatch, getState) => {
        let { listItemCreateBag } = getState().bag
        let temp = _.clone(listItemCreateBag, true);
        temp.map((item, i) => {
            if (item.IdOrder == obj.id) {
                item[obj.key] = (obj.value)
            }
        })
        dispatch({
            type: UPDATE_CELL_INPUT_BAG,
            payload: {
                listItemCreateBag: temp
            }
        })

    }
}
export const updateCellBag = (obj) => {
    let { other } = obj
    return (dispatch, getState) => {
        let { listItemCreateBag, list_stone_save } = getState().bag
        let temp = _.clone(listItemCreateBag, true);
        let sumtotal = 0
        temp.map((item, i) => {
            if (item.IdOrderProduct == obj.id) {
                item[obj.key] = (obj.value)
            }
            sumtotal = sumtotal + parseFloat(item[obj.key])
            return item
        })
        let list_stone_save_temp = _.clone(list_stone_save, true)
        list_stone_save_temp = list_stone_save_temp.map((item) => {
            let { PrimaryStone, ColorParent } = item
            // cap nhat trong luong da chủ
            if (PrimaryStone == 1 && other && other.Color == ColorParent) {
                item.sl2 = parseFloat(item.sl) * obj.value
                item.remain = parseFloat(item.sl) * obj.value
            }
            if (PrimaryStone !== 1) {
                item.sl2 = parseFloat(item.sl) * sumtotal
                item.remain = parseFloat(item.sl) * sumtotal
            }
            return item
        })
        dispatch({
            type: UPDATE_CELL_INPUT_BAG,
            payload: {
                listItemCreateBag: temp,
                list_stone_save: list_stone_save_temp
            }
        })

    }
}
export const updateIdProductColor = (obj) => {
    return (dispatch, getState) => {
        let item_temp = obj.id, IdStone, IdProductParentColorParentStone;
        IdStone = item_temp.split('/')[1];
        IdProductParentColorParentStone = item_temp.split('/')[0];

        let { list_stone_save } = getState().bag
        let temp = _.clone(list_stone_save, true);
        temp.map((item, i) => {
            if (item.IdProductParent + item.ColorParent + item.IdStone
                == IdProductParentColorParentStone) {
                item.Color = obj.value
                item.IdProductColor = item.IdProduct + obj.value
                item.IdProductColorStone = item.IdProduct + obj.value + IdStone
            }
            return item
        })
        dispatch({
            type: UPDATE_CELL_INPUT_BAG,
            payload: {
                list_stone_save: temp
            }
        })

    }
}

export const updateTypeStoneByStone = (obj) => {
    return (dispatch, getState) => {
        let { list_stone_save } = getState().bag
        let temp = _.clone(list_stone_save, true);
        temp.map((item, i) => {

            if (item.IdProductColorParentColorStone == obj.id) {
                item.TypeStone = obj.value
            }
            return item
        })
        dispatch({
            type: UPDATE_CELL_INPUT_BAG,
            payload: {
                list_stone_save: temp
            }
        })

    }
}
export const updateTypeStoneByStoneSplit = (obj) => {
    return (dispatch, getState) => {
        let { list_stone_save_split } = getState().bag
        let temp = _.clone(list_stone_save_split, true);
        temp.map((item, i) => {
            if (item.SplitIdProductColorParentColorStone == obj.id) {
                item.TypeStone = obj.value
            }
            return item
        })
        dispatch({
            type: UPDATE_CELL_INPUT_BAG,
            payload: {
                list_stone_save_split: temp
            }
        })

    }
}
export const updateCellStone = (obj) => {
    return (dispatch, getState) => {
        let { list_stone_save, itemDetailCreateBag } = getState().bag
        let { list_config } = getState().header
        let temp = _.clone(list_stone_save, true);
        let exchange = list_config.filter(x => x.code == "exchange"), value = 1
        if (exchange && exchange[0]) {
            value = parseFloat(exchange[0].value)
        }
        if (itemDetailCreateBag.IdOdd == "1") {
            temp.map((item, i) => {
                if (item.IdProductParentIdProductStoneColor == obj.id) {
                    item["Weight"] = (obj.value)
                    item["Exchange"] = Helper.round((obj.value) / value, 4)
                    item["exchange"] = Helper.round((obj.value) / value, 4)
                    item["AvgStone"] = (obj.value / item.sl2)
                }
                return item
            })
        } else {
            temp.map((item, i) => {
                if (item.IdProductColorStone == obj.id) {
                    item["Weight"] = (obj.value)
                    item["Exchange"] = Helper.round((obj.value) / value, 4)
                    item["exchange"] = Helper.round((obj.value) / value, 4)
                    item["AvgStone"] = (obj.value / item.sl2)
                }
                return item
            })
        }

        // sum trọng lương theo mã bag,  mã đá, mã sản phẩm
        let sumsWeightStone = [
            ...temp.reduce(
                (map, item) => {
                    const { IdBagIdProductIdStone: key, AvgStone } = item;
                    const prev = map.get(key);

                    if (prev) {
                        prev.AvgStone += parseFloat(AvgStone || 0)
                    } else {
                        map.set(key, Object.assign({}, item))
                    }

                    return map
                },
                new Map()
            ).values()
        ]

        // cập nhật sum trọng lượng đá theo mã bag, đá ,sản phẩm
        temp = temp.map(itemStone => {
            sumsWeightStone.map(itemSum => {
                if (itemSum.IdBagIdProductIdStone == itemStone.IdBagIdProductIdStone) {
                    itemStone.AvgStoneSum = itemSum.AvgStone
                }
            })
            return itemStone
        })
        dispatch({
            type: UPDATE_CELL_INPUT_BAG,
            payload: {
                list_stone_save: temp
            }
        })

    }
}
export const updateCellStoneSplit = (obj) => {
    return (dispatch, getState) => {
        let { list_stone_save_split, list_stone_save_split_custom, itemDetailCreateBag } = getState().bag
        let { list_config } = getState().header
        let temp = _.clone(list_stone_save_split, true);
        let tempCustom = _.clone(list_stone_save_split_custom, true);
        let exchange = list_config.filter(x => x.code == "exchange"), value = 1
        if (exchange && exchange[0]) {
            value = parseFloat(exchange[0].value)
        }
        if (itemDetailCreateBag.IdOdd == "1") {
            temp.map((item, i) => {
                if (item.SplitIdProductColorParentColorStone == obj.id) {
                    item["Weight"] = (obj.value)
                    item["Exchange"] = Helper.round((obj.value) / value, 4)
                    item["exchange"] = Helper.round((obj.value) / value, 4)
                    item["AvgStone"] = (obj.value / item.sl2)
                    item["AvgStoneSum"] = (obj.value / item.sl2)
                }
                return item
            })
            tempCustom.map((item, i) => {
                if (item.SplitIdProductColorParentColorStone == obj.id) {
                    item["Weight"] = (obj.value)
                    item["Exchange"] = Helper.round((obj.value) / value, 4)
                    item["exchange"] = Helper.round((obj.value) / value, 4)
                    item["AvgStone"] = (obj.value / item.sl2)
                    item["AvgStoneSum"] = (obj.value / item.sl2)
                }
                return item
            })
        } else {
            temp.map((item, i) => {
                if (item.SplitIdProductColorParentColorStone == obj.id) {
                    item["Weight"] = (obj.value)
                    item["Exchange"] = Helper.round((obj.value) / value, 4)
                    item["exchange"] = Helper.round((obj.value) / value, 4)
                    item["AvgStone"] = (obj.value / item.sl2)
                    item["AvgStoneSum"] = (obj.value / item.sl2)
                }
                return item
            })
            tempCustom.map((item, i) => {
                if (item.SplitIdProductColorParentColorStone == obj.id) {
                    item["Weight"] = (obj.value)
                    item["Exchange"] = Helper.round((obj.value) / value, 4)
                    item["exchange"] = Helper.round((obj.value) / value, 4)
                    item["AvgStone"] = (obj.value / item.sl2)
                    item["AvgStoneSum"] = (obj.value / item.sl2)
                }
                return item
            })
        }


        dispatch({
            type: UPDATE_CELL_INPUT_BAG,
            payload: {
                list_stone_save_split: temp,
                list_stone_save_split_custom: tempCustom
            }
        })

    }
}
export const getListOrderCombobox = () => {
    return (dispatch, state) => {
        return new Promise((resolve, rejects) => {
            axios.get(`${Config.API_URL_USER}bag/get_list_order_combobox`)
                .then((response) => {
                    let { data } = response.data
                    let data_temp = data.map((item, i) => {
                        item.Id = item.IdOrder
                        item.Name = item.IdOrder
                        item.value = item.IdOrder
                        item.label = item.IdOrder
                        return item
                    })
                    dispatch({
                        type: GET_LIST_ORDER_COMBOBOX,
                        payload: {
                            list_order_combobox: data_temp || []
                        }
                    })
                    resolve(response)
                }, (err) => {
                    rejects(err)
                })
        })
    }
}
export const ChangePageInBag = (value) => {
    return (dispatch, getState) => {
        dispatch({
            type: CHANGE_PAGE_TABLE_IN_BAG,
            payload: {
                page: value
            }
        })
    }
}
export const removeProductsInListBag = (obj) => {
    return (dispatch, getState) => {
        let { listItemCreateBag, list_stone_save } = getState().bag
        let data_temp = listItemCreateBag.filter(x => x.IdProduct != obj.IdProduct)
        let list_stone_save_temp = list_stone_save.filter(x => x.IdProduct != obj.IdProduct)
        dispatch({
            type: REMOVE_PRODUCT_IN_BAG,
            payload: {
                listItemCreateBag: data_temp,
                list_stone_save: list_stone_save_temp
            }
        })
    }
}

export const getListDataOrderInBagBySearch = (key = '') => {
    return (dispatch, getState) => {
        let { page, total } = getState().bag
        let pageParams = {
            page: page,
            total: total
        }
        return new Promise((resolve, reject) => {
            Promise.all([
                axios.get(`${Config.API_URL_USER}bag/get_list_order`, { params: { page: pageParams.page, total: pageParams.total, key: key } }),
                axios.get(`${Config.API_URL_USER}order/get_list_statusorder`)
            ])
                .then((response) => {
                    let { data } = response[0].data
                    let other_list = response[1].data.data
                    let data_temp = _.clone(data, true)
                    data_temp.map(item => item.checked = false)
                    dispatch({
                        type: GET_LIST_ORDER_IN_BAG_SEARCH,
                        payload: {
                            list_order_in_bag: data_temp || [],
                            list_status_order: other_list || []
                        }
                    })
                    resolve(response)
                })
        }, (err) => {
            reject(err)
        })

    }
}
export const getListDataOrderInBag = (params = { page: 1, total: 10 }) => {
    return (dispatch, getState) => {
        let { page, total } = getState().bag
        let pageParams = {
            page: page,
            total: total
        }
        return new Promise((resolve, reject) => {
            Promise.all([
                axios.get(`${Config.API_URL_USER}bag/get_list_order`, { params: { page: params.page, total: params.total } }),
                axios.get(`${Config.API_URL_USER}order/get_list_statusorder`)
            ])
                .then((response) => {
                    let { data } = response[0].data
                    let other_list = response[1].data.data
                    let data_temp = _.clone(data, true)
                    data_temp.map(item => item.checked = false)
                    let totalRows = data_temp && data_temp[0] && data_temp[0].totalRows

                    dispatch({
                        type: GET_LIST_ORDER_IN_BAG,
                        payload: {
                            list_order_in_bag: data_temp || [],
                            list_status_order: other_list || [],
                            ListProductByOrderInBag: []
                        }
                    })
                    dispatch(updateInfoPage(totalRows))
                    resolve(response)
                })
        }, (err) => {
            reject(err)
        })

    }
}
export const getListProductsByOrder = (obj) => {
    return (dispatch, state) => {
        dispatch({
            type: GET_LIST_PRODUCTS_BY_ORDER,
            payload: {
                ListProductByOrderInBag: [],
                listItemCreateBag: []
            }
        })
        return new Promise((resolve, rejects) => {
            axios.get(`${Config.API_URL_USER}bag/get_list_products_by_order`, { params: { IdOrder: obj.IdOrder } })
                .then((response) => {
                    let { data } = response.data
                    //data.map(item => item.SplitBag = obj.SplitBag)
                    dispatch({
                        type: GET_LIST_PRODUCTS_BY_ORDER,
                        payload: {
                            ListProductByOrderInBag: data,
                        }
                    })
                    resolve(response)
                }, (err) => {
                    rejects(err)
                })
        })
    }
}
export const updateStatusSplitBag = (obj, status) => {
    return (dispatch, getState) => {
        let { listItemCreateBag, ListProductByOrderInBag } = getState().bag
        return new Promise((resolve, rejects) => {
            axios.post(`${Config.API_URL_USER}bag/update_status_split_bag`,
                {
                    IdOrder: obj.IdOrder
                    , IdProduct: obj.IdProduct
                    , IdOrderProduct: obj.IdOrderProduct
                    , Color: obj.Color,
                    status: status,

                })
                .then((response) => {
                    let { data } = response.data
                    if (data.length > 0) {
                        listItemCreateBag = data
                    }
                    let ListProductByOrderInBag_temp = _.clone(ListProductByOrderInBag, true)
                    ListProductByOrderInBag_temp.map((item) => {
                        if (item.IdOrder == obj.IdOrder && item.Color == obj.Color) {
                            item.SplitBag = status
                        }
                    })
                    dispatch({
                        type: UPDATE_SPLIT_BAG,
                        payload: {
                            listItemCreateBag: listItemCreateBag,
                            ListProductByOrderInBag: ListProductByOrderInBag_temp
                        }
                    })
                    resolve(response)
                }, (err) => {
                    rejects(err)
                })
        })
    }
}

export const selectOrder = (obj) => {
    return (dispatch, state) => {
        dispatch({
            type: SELECTED_ORDER,
            payload: {
                selectedOrder: obj
            }
        })
        dispatch(getListProductsByOrder(obj.value))
    }
}
export const clickCheckRowOrderInBag = (obj, checked) => {
    return (dispatch, getState) => {
        let { list_order_in_bag } = getState().bag
        var list_temp = _.clone(list_order_in_bag, true);
        list_temp.map((item, i) => {
            item.checked = false
            if (item.IdOrder == obj.IdOrder) {
                item.checked = checked
            }
            return item
        })
        dispatch({
            type: CLICK_ROW_DATA_ORDER_IN_BAG,
            payload: {
                list_order_in_bag: list_temp
            }
        })
        dispatch(getListProductsByOrder(obj))
    }
}
export const clickCheckRowProduct = (value, checked) => {
    return (dispatch, getState) => {
        let { ListProductByOrderInBag, listItemCreateBag, itemDetail } = getState().bag
        var list_temp = _.clone(ListProductByOrderInBag, true);
        let data_temp = _.clone(listItemCreateBag, true);
        list_temp.map((item, i) => {
            if (item.IdProduct == value.IdProduct && item.Color == value.Color) {
                item.checked = checked
                if (data_temp.filter(x => x.IdProduct == value.IdProduct
                    && x.Color == value.Color).length == 0) {
                    data_temp.push(item)
                }
            }
            return item
        })
        if (!checked) {
            data_temp = data_temp.filter(x => x.IdProduct + x.Color != value.IdProduct + value.Color)
        }
        dispatch({
            type: CLICK_ROW_DATA,
            payload: {
                ListProductByOrderInBag: list_temp,
                itemDetail: checked ? value : '',
                listItemCreateBag: data_temp,
                isSplitProduct: value.SplitBag
            }
        })
    }
}
export const showModal = (value) => {
    return (dispatch, getState) => {
        dispatch({
            type: SHOW_MODAL_TEST,
            payload: {
                isShow: value,
                itemDetail: ''
            }
        })
    }
}
export const saveBag = (Qty = 0) => {
    return (dispatch, getState) => {
        let { itemDetail } = getState().bag
        return new Promise((resolve, rejects) => {
            axios.post(`${Config.API_URL_USER}bag/insert_bag`, { Id: itemDetail.Id, IdOrderProduct: itemDetail.IdOrderProduct, Qty: Qty })
                .then((response) => {
                    dispatch({
                        type: SAVE_BAG,
                        payload: {
                            isShow: false
                        }
                    })
                    resolve(response)
                }, (err) => {
                    rejects(err)
                })
        })

    }
}
export const UpdateBagList = (StatusWeight) => {
    return (dispatch, getState) => {
        let { listItemCreateBag, itemDetail, list_stone_save, itemDetailCreateBag, list_stone_save_split, list_stone_save_split_custom } = getState().bag
        let listItemCreateBag_temp = _.clone(listItemCreateBag, true)
        let list_stone_save_temp = [], list_stone_split_save_temp = [], list_stone_split_save_custom_temp = []
        let totalqty = 0;
        listItemCreateBag_temp.map((item, i) => {
            item.StatusWeight = StatusWeight
            totalqty = totalqty + parseFloat(item.ProductsEachBag)
        })

        listItemCreateBag_temp.map((item, i) => {
            let { TypeSplitStone } = item
            if (item.IdOdd == "1") {
                if (i == 0) {
                    list_stone_save.map((item2) => {
                        let itemInfo = listItemCreateBag_temp.filter(x => x.IdProduct + x.ColorParent == item2.IdProductParent + item2.ColorParent)
                        let item_data = _.clone(item2, true)
                        item_data.qty = parseFloat(itemInfo[0].ProductsEachBag)
                        item_data.totalqty = totalqty
                        if (item_data.PrimaryStone == 1) {
                            item_data.numofstone = parseFloat(item_data.sl2)
                        } else {
                            item_data.numofstone = parseFloat(item_data.sl2)
                        }
                        if (item_data.PrimaryStone == 1) {

                            item_data.totalstoneprimary = parseFloat(item_data.sl) * totalqty
                            item_data.weightperqty = parseFloat(item_data.Weight)
                        } else {
                            item_data.weightperqty = parseFloat(item_data.Weight) * parseFloat(itemInfo[0].ProductsEachBag) / totalqty
                        }
                        list_stone_save_temp.push(item_data)

                    })
                    list_stone_save_split.map((item2) => {
                        let itemInfo = listItemCreateBag_temp.filter(x => x.IdProduct + x.ColorParent == item2.IdProductParent + item2.ColorParent)
                        let item_data = _.clone(item2, true)
                        item_data.qty = parseFloat(itemInfo[0].ProductsEachBag)
                        item_data.totalqty = totalqty
                        item_data.numofstone = parseFloat(item_data.sl2)
                        item_data.weightperqty = TypeSplitStone == 'TYPE_SPLIT_STONE_1' ? parseFloat(item_data.Weight) * parseFloat(itemInfo[0].ProductsEachBag) / totalqty : parseFloat(item_data.Weight)
                        list_stone_split_save_temp.push(item_data)
                    })
                    list_stone_save_split_custom.map((item2) => {
                        let itemInfo = listItemCreateBag_temp.filter(x => x.IdProduct + x.ColorParent == item2.IdProductParent + item2.ColorParent)
                        let item_data = _.clone(item2, true)
                        item_data.qty = parseFloat(itemInfo[0].ProductsEachBag)
                        item_data.totalqty = totalqty
                        item_data.numofstone = parseFloat(item_data.sl2)
                        item_data.weightperqty = TypeSplitStone == 'TYPE_SPLIT_STONE_1' ? parseFloat(item_data.Weight) * parseFloat(itemInfo[0].ProductsEachBag) / totalqty : parseFloat(item_data.Weight)
                        list_stone_split_save_custom_temp.push(item_data)
                    })

                }
            }
            else {

                list_stone_save.map((item2) => {
                    let itemInfo = listItemCreateBag_temp.filter(x => x.IdProduct + x.ColorParent == item2.IdProductParent + item2.ColorParent)

                    let item_data = _.clone(item2, true)
                    item_data.qty = parseFloat(itemInfo[0].ProductsEachBag)
                    item_data.totalqty = totalqty
                    if (item_data.PrimaryStone == 1) {
                        item_data.numofstone = parseFloat(item_data.sl2)
                    } else {
                        item_data.numofstone = parseFloat(item_data.sl2)
                    }
                    if (item_data.PrimaryStone == 1) {
                        item_data.weightperqty = parseFloat(item_data.Weight)
                    } else {
                        item_data.weightperqty = parseFloat(item_data.Weight) * parseFloat(itemInfo[0].ProductsEachBag) / totalqty
                    }
                    if (item2.IdProduct + item2.ColorParent == item.IdProduct + item.Color) {
                        list_stone_save_temp.push(item_data)
                    }
                })
                /////////////////////////////// tính tỷ lệ cho màu đá sau khi tách
                list_stone_save_split.map((item2) => {
                    let itemInfo = listItemCreateBag_temp.filter(x => x.IdProduct + x.ColorParent == item2.IdProductParent + item2.ColorParent)
                    let item_data = _.clone(item2, true)
                    item_data.qty = parseFloat(itemInfo[0].ProductsEachBag)
                    item_data.totalqty = totalqty
                    item_data.numofstone = parseFloat(item_data.sl2)
                    item_data.weightperqty = TypeSplitStone == 'TYPE_SPLIT_STONE_1' ? parseFloat(item_data.Weight) * parseFloat(itemInfo[0].ProductsEachBag) / totalqty : parseFloat(item_data.Weight)
                    if (item2.IdProduct + item2.ColorParent == item.IdProduct + item.Color) {
                        list_stone_split_save_temp.push(item_data)
                    }
                })
                /////////////////////////////// tính tỷ lệ cho màu đá còn lại
                list_stone_save_split_custom.map((item2) => {
                    let itemInfo = listItemCreateBag_temp.filter(x => x.IdProduct + x.ColorParent == item2.IdProductParent + item2.ColorParent)
                    let item_data = _.clone(item2, true)
                    item_data.qty = parseFloat(itemInfo[0].ProductsEachBag)
                    item_data.totalqty = totalqty
                    item_data.numofstone = parseFloat(item_data.sl2)
                    item_data.weightperqty = TypeSplitStone == 'TYPE_SPLIT_STONE_1' ? parseFloat(item_data.Weight) * parseFloat(itemInfo[0].ProductsEachBag) / totalqty : parseFloat(item_data.Weight)
                    if (item2.IdProduct + item2.ColorParent == item.IdProduct + item.Color) {
                        list_stone_split_save_custom_temp.push(item_data)
                    }
                })
            }
        })

        //update is split
        list_stone_save_temp = list_stone_save_temp.map((item) => {
            let check = list_stone_split_save_temp.filter(x => x.IdProductColorParentColorStone == item.IdProductColorParentColorStone)
            if (check.length > 0) {
                item.issplit = 1
            } else {
                item.issplit = 0
            }
            return item
        })

        var IdBag_temp = itemDetailCreateBag.Id
        return new Promise((resolve, reject) => {
            Promise.all([
                axios.post(`${Config.API_URL_USER}bag/insert_bag_list`, { data: listItemCreateBag_temp, IdBag: IdBag_temp, IdOrder: listItemCreateBag_temp[0].IdOrder }),
                axios.post(`${Config.API_URL_USER}bag/insert_stone_list`, { data: list_stone_save_temp, IdBag: IdBag_temp }),
                axios.post(`${Config.API_URL_USER}bag/insert_stone_split_list`, { data: list_stone_split_save_temp, IdBag: IdBag_temp, dataCustom: list_stone_split_save_custom_temp })                    // axios.post(`${Config.API_URL_USER}products/add_list_casting`, { data: data_temp2 })
            ])
                .then((response) => {
                    dispatch({
                        type: SAVE_BAG_LIST,
                        payload: {
                            isSaveBag: true
                        }
                    })
                    // dispatch(resetDataBag())
                    resolve(response)
                })
        }, (err) => {
            reject(err)
        })

    }
}
export const InsertBagList = (IdOrder, StatusWeight) => {
    return (dispatch, getState) => {
        let { listItemCreateBag, itemDetail, list_stone_save, list_stone_save_split, itemDetailCreateBag, list_stone_save_split_custom } = getState().bag
        let listItemCreateBag_temp = listItemCreateBag.filter(x => x.Value != 0)
        let list_stone_save_temp = []
        let list_stone_split_save_temp = []
        let list_stone_split_save_custom_temp = []
        let totalqty = 0;
        listItemCreateBag_temp.map((item, i) => {
            item.StatusWeight = StatusWeight
            totalqty = totalqty + parseFloat(item.Value)
        })
        listItemCreateBag_temp.map((item, i) => {
            let { TypeSplitStone } = item
            if (item.IdOdd == "1") {
                if (i == 0) {
                    list_stone_save.map((item2) => {
                        let itemInfo = listItemCreateBag_temp.filter(x => x.IdProduct + x.ColorParent == item2.IdProductParent + item2.ColorParent)
                        let item_data = _.clone(item2, true)
                        item_data.qty = parseFloat(itemInfo[0].Value)
                        item_data.totalqty = totalqty
                        if (item_data.PrimaryStone == 1) {
                            item_data.numofstone = item_data.sl2//parseFloat(item_data.sl) * parseFloat(item.Value)
                            item_data.totalstoneprimary = parseFloat(item_data.sl) * totalqty
                        } else {
                            item_data.numofstone = item_data.sl2
                            // item_data.numofstone = totalqty * parseFloat(item_data.sl)
                        }
                        if (item_data.PrimaryStone == 1) {
                            item_data.weightperqty = parseFloat(item_data.Weight)
                        } else {
                            item_data.weightperqty = parseFloat(item_data.Weight) * parseFloat(itemInfo[0].Value) / totalqty
                        }

                        list_stone_save_temp.push(item_data)
                    })

                    /////////////////////////////// tính tỷ lệ cho màu đá sau khi tách
                    list_stone_save_split.map((item2) => {
                        let itemInfo = listItemCreateBag_temp.filter(x => x.IdProduct + x.ColorParent == item2.IdProductParent + item2.ColorParent)
                        let item_data = _.clone(item2, true)
                        item_data.qty = parseFloat(itemInfo[0].Value)
                        item_data.totalqty = totalqty
                        item_data.numofstone = parseFloat(item_data.sl2)
                        item_data.weightperqty = TypeSplitStone == 'TYPE_SPLIT_STONE_1' ? parseFloat((item_data.Weight) * parseFloat(itemInfo[0].Value)) / totalqty : parseFloat(item_data.Weight)
                        list_stone_split_save_temp.push(item_data)
                    })
                    /////////////////////////////// tính tỷ lệ cho màu đá còn lại
                    list_stone_save_split_custom.map((item2) => {
                        let itemInfo = listItemCreateBag_temp.filter(x => x.IdProduct + x.ColorParent == item2.IdProductParent + item2.ColorParent)
                        let item_data = _.clone(item2, true)
                        item_data.qty = parseFloat(itemInfo[0].Value)
                        item_data.totalqty = totalqty
                        item_data.numofstone = parseFloat(item_data.sl2)
                        item_data.weightperqty = TypeSplitStone == 'TYPE_SPLIT_STONE_1' ? parseFloat((item_data.Weight) * parseFloat(itemInfo[0].Value)) / totalqty : 0
                        list_stone_split_save_custom_temp.push(item_data)
                    })
                }
            }
            else {
                list_stone_save.map((item2) => {
                    let itemInfo = listItemCreateBag_temp.filter(x => x.IdProduct + x.ColorParent == item2.IdProductParent + item2.ColorParent)
                    let item_data = _.clone(item2, true)
                    item_data.qty = parseFloat(itemInfo[0].Value)
                    item_data.totalqty = totalqty
                    if (item_data.PrimaryStone == 1) {
                        item_data.numofstone = item_data.sl2 //parseFloat(item_data.sl) * parseFloat(item.Value)
                    } else {
                        item_data.numofstone = item_data.sl2
                        // item_data.numofstone = totalqty * parseFloat(item_data.sl)
                    }
                    if (item_data.PrimaryStone == 1) {
                        item_data.weightperqty = parseFloat(item_data.Weight)
                    } else {
                        item_data.weightperqty = parseFloat(item_data.Weight) * parseFloat(itemInfo[0].Value) / totalqty
                    }
                    if (item2.IdProduct + item2.ColorParent == item.IdProduct + item.Color) {
                        list_stone_save_temp.push(item_data)
                    }
                })
                /////////////////////////////// tính tỷ lệ cho màu đá sau khi tách
                list_stone_save_split.map((item2) => {
                    let itemInfo = listItemCreateBag_temp.filter(x => x.IdProduct + x.ColorParent == item2.IdProductParent + item2.ColorParent)
                    let item_data = _.clone(item2, true)
                    item_data.qty = parseFloat(itemInfo[0].Value)
                    item_data.totalqty = totalqty
                    item_data.numofstone = parseFloat(item_data.sl2)
                    item_data.weightperqty = TypeSplitStone == 'TYPE_SPLIT_STONE_1' ? parseFloat((item_data.Weight) * parseFloat(itemInfo[0].Value)) / totalqty : parseFloat(item_data.Weight)
                    if (item2.IdProduct + item2.ColorParent == item.IdProduct + item.Color) {
                        list_stone_split_save_temp.push(item_data)
                    }
                })
                /////////////////////////////// tính tỷ lệ cho màu đá còn lại
                list_stone_save_split_custom.map((item2) => {
                    let itemInfo = listItemCreateBag_temp.filter(x => x.IdProduct + x.ColorParent == item2.IdProductParent + item2.ColorParent)
                    let item_data = _.clone(item2, true)
                    item_data.qty = parseFloat(itemInfo[0].Value)
                    item_data.totalqty = totalqty
                    item_data.numofstone = parseFloat(item_data.sl2)
                    item_data.weightperqty = TypeSplitStone == 'TYPE_SPLIT_STONE_1' ? parseFloat((item_data.Weight) * parseFloat(itemInfo[0].Value)) / totalqty : 0
                    if (item2.IdProduct + item2.ColorParent == item.IdProduct + item.Color) {
                        list_stone_split_save_custom_temp.push(item_data)
                    }
                })
            }
        })


        //update is split
        list_stone_save_temp = list_stone_save_temp.map((item) => {
            let check = list_stone_save_split.filter(x => x.IdProductColorParentColorStone == item.IdProductColorParentColorStone)
            if (check.length > 0) {
                item.issplit = 1
            } else {
                item.issplit = 0
            }
            return item
        })
        var IdBag_temp = itemDetailCreateBag.Id

        return new Promise((resolve, reject) => {
            Promise.all([
                axios.post(`${Config.API_URL_USER}bag/insert_bag_list`, { data: listItemCreateBag_temp, IdBag: IdBag_temp, IdOrder: listItemCreateBag_temp[0].IdOrder }),
                axios.post(`${Config.API_URL_USER}bag/insert_stone_list`, { data: list_stone_save_temp, IdBag: IdBag_temp }),
                axios.post(`${Config.API_URL_USER}bag/insert_stone_split_list`, { data: list_stone_split_save_temp, IdBag: IdBag_temp, dataCustom: list_stone_split_save_custom_temp })                    // axios.post(`${Config.API_URL_USER}products/add_list_casting`, { data: data_temp2 })
            ])
                .then((response) => {
                    dispatch({
                        type: SAVE_BAG_LIST,
                        payload: {
                            isSaveBag: true
                        }
                    })
                    // dispatch(resetDataBag())
                    resolve(response)
                })
        }, (err) => {
            reject(err)
        })
    }
}
export const getNumberAutoBag = () => {
    return (dispatch, getState) => {
        let { itemDetail, listItemCreateBag } = getState().bag
        let itemDetailBag = listItemCreateBag && listItemCreateBag[0]
        return new Promise((resolve, reject) => {
            Promise.all([
                axios.get(`${Config.API_URL_USER}bag/get_auto_number`),
                axios.get(`${Config.API_URL_USER}bag/get_list_product_by_idodd`, { params: { IdProduct: itemDetailBag.IdProduct } })
            ])
                .then((response) => {
                    let { data } = response[0].data
                    let listProductByIdOdd = response[1].data.data
                    let listProductByIdOdd_temp = [], IdChildrenProduct
                    let list_temp = _.clone(listItemCreateBag, true)
                    if (listProductByIdOdd.length > 0) {
                        listProductByIdOdd.map((item) => {
                            listProductByIdOdd_temp.push({ IdParent: itemDetailBag.IdProduct, IdProductChildren: item.IdProduct })
                        })
                        IdChildrenProduct = listProductByIdOdd[0].IdProduct
                    }
                    list_temp.map((item, i) => {
                        item.Id = (data && data[0].value || '0000000')
                        item.Value = 0
                        item.Remark = ''
                        item.DateCreated = moment(new Date(), 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
                        item.DateProcess = moment(new Date(), 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
                        item.IdChildrenProduct = item.IdOdd == "1" ? IdChildrenProduct : item.IdProduct
                        item.IdProductColor = item.IdOdd == "1" ? itemDetailBag.IdProduct + itemDetailBag.Color : item.IdProduct + item.Color
                        item.ColorParent = item.Color
                        item.type_bag = item.IdOdd == "1" ? 'STATUS_BAG_PRODUCT_02' : 'STATUS_BAG_PRODUCT_01'
                        item.TypeSplitStone = 'TYPE_SPLIT_STONE_2'
                        let temp = _.clone(listProductByIdOdd_temp, true)
                        let array_temp = []
                        temp.map((it, ii) => {
                            array_temp.push({ ColorParent: item.Color, IdParent: it.IdParent, IdProductChildren: it.IdProductChildren })
                        })
                        item.listChildrenProduct = array_temp

                        return item
                    })
                    dispatch({
                        type: GENERATE_NUMBER_ID_BAG,
                        payload: {
                            listItemCreateBag: list_temp,
                            list_products_by_idodd: listProductByIdOdd,
                            itemDetailCreateBag: list_temp[0],
                            list_stone_save: [],
                            list_stone_save_split: [],
                            list_stone_save_split_custom: []
                        }
                    })
                    let list_temp_all = []
                    list_temp.map((item) => {
                        if (item.IdOdd == "1") {
                            item.listChildrenProduct.map((itemChildren) => {
                                let item_temp = _.clone(item)
                                item_temp.IdChildrenProduct = itemChildren.IdProductChildren
                                list_temp_all.push(item_temp)
                            })
                        } else {
                            if (list_temp_all.filter(x => x.IdChildrenProduct == item.IdChildrenProduct).length == 0) {
                                list_temp_all.push(item)
                            }
                        }
                    })
                    list_temp_all.map((item, i) => {
                        dispatch(getListStoneByProductsInBag(item, [], i))
                    })
                    resolve(response)
                })
        }, (err) => {
            reject(err)
        })
    }
}
export const getNumberAutoBagSplit = () => {
    return (dispatch, getState) => {
        let { itemDetail, listItemCreateBag } = getState().bag
        let itemDetailBag = listItemCreateBag && listItemCreateBag[0]
        return new Promise((resolve, reject) => {
            Promise.all([
                axios.get(`${Config.API_URL_USER}bag/get_auto_number`),
                axios.get(`${Config.API_URL_USER}bag/get_list_product_by_idodd`, { params: { IdProduct: itemDetailBag.IdProduct } })
            ])
                .then((response) => {
                    let { data } = response[0].data
                    let listProductByIdOdd = response[1].data.data
                    let listProductByIdOdd_temp = [], IdChildrenProduct
                    let list_temp = _.clone(listItemCreateBag, true)
                    if (listProductByIdOdd.length > 0) {
                        listProductByIdOdd.map((item) => {
                            listProductByIdOdd_temp.push({ IdParent: itemDetailBag.IdProduct, IdProductChildren: item.IdProduct })
                        })
                        IdChildrenProduct = listProductByIdOdd[0].IdProduct
                    }
                    list_temp.map((item, i) => {
                        item.Id = (data && data[0].value || '0000000')
                        item.Value = 0
                        item.Remark = ''
                        item.DateCreated = moment(new Date(), 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
                        item.DateProcess = moment(new Date(), 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
                        item.IdChildrenProduct = item.IdOdd == "1" ? IdChildrenProduct : item.IdProduct
                        item.IdProductColor = item.IdOdd == "1" ? itemDetailBag.IdProduct + itemDetailBag.Color : item.IdProduct + item.Color
                        item.ColorParent = item.Color
                        item.type_bag = 'STATUS_BAG_PRODUCT_01'
                        let temp = _.clone(listProductByIdOdd_temp, true)
                        let array_temp = []
                        temp.map((it, ii) => {
                            array_temp.push({ ColorParent: item.Color, IdParent: it.IdParent, IdProductChildren: it.IdProductChildren })
                        })
                        item.listChildrenProduct = array_temp

                        return item
                    })
                    let itemCreate = list_temp[0]
                    itemCreate.type_bag = "STATUS_BAG_PRODUCT_01"
                    dispatch({
                        type: GENERATE_NUMBER_ID_BAG,
                        payload: {
                            listItemCreateBag: list_temp,
                            list_products_by_idodd: listProductByIdOdd,
                            itemDetailCreateBag: itemCreate
                        }
                    })
                    let list_temp_all = []
                    list_temp.map((item) => {
                        if (item.IdOdd == "1") {
                            item.listChildrenProduct.map((itemChildren) => {
                                let item_temp = _.clone(item)
                                item_temp.IdChildrenProduct = itemChildren.IdProductChildren
                                list_temp_all.push(item_temp)
                            })
                        } else {
                            if (list_temp_all.filter(x => x.IdChildrenProduct == item.IdChildrenProduct).length == 0) {
                                list_temp_all.push(item)
                            }
                        }
                    })
                    dispatch(getListStoneByProductsInBagSplit(list_temp_all))
                    resolve(response)
                })
        }, (err) => {
            reject(err)
        })
    }
}

export const getListStoneByProductsInBagSplit = (list_data) => {
    console.log('getListStoneByProductsInBag update', list_data);

    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let { listItemCreateBag, list_stone_save, isSplitProduct } = getState().bag
            let list_stone_save_temp = list_stone_save
            list_data.map((itemProduct, ii) => {
                axios.get(`${Config.API_URL_USER}products/get_list_stone`, { params: { IdProduct: itemProduct.IdProduct } })
                    .then((response) => {
                        let { data } = response.data
                        data.map((item, i) => {
                            let item_temp = _.clone(item, true)
                            item_temp.sort = (ii + 1) + '.' + (i + 1)
                            // item.IdParentProduct = obj.IdProduct
                            item_temp.IdStone = item.value
                            item_temp.IdProductParent = itemProduct.IdProduct
                            item_temp.ColorParent = itemProduct.Color
                            item_temp.Color = item.PrimaryStone ? itemProduct.Color : '001'
                            item_temp.IdBag = itemProduct.Id
                            item_temp.IdOrder = itemProduct.IdOrder
                            item_temp.Weight = 0
                            item_temp.Exchange = 0
                            item_temp.AvgStone = 0
                            item_temp.IdProduct = itemProduct.IdProduct
                            item_temp.IdProductColorStone = itemProduct.IdProduct + item_temp.Color + item.value
                            item_temp.IdProductColor = itemProduct.IdProduct + item_temp.Color
                            item_temp.IdProductColorParentColorStone = itemProduct.IdProduct + itemProduct.Color + item_temp.Color + item.value
                            item_temp.TypeStone = 'TYPE_STONE_1'
                            let check = []
                            check = list_stone_save_temp.filter(x => x.IdProductColorStone == item_temp.IdProductColorStone)
                            if (check.length == 0) {
                                list_stone_save_temp.push(item_temp)
                            }
                        })
                        resolve(response)
                    }, (err) => {
                        reject(err)
                    })
            })
            setTimeout(() => {
                dispatch({
                    type: GET_LIST_STONE_BY_PRODUCTS_IN_BAG,
                    payload: {
                        list_stone_save: list_stone_save_temp
                    }
                })
            }, 500)
        })
    }
}

export const getListStoneByProductsInBag = (obj, list_data, sttOdd = 0) => {
    var IdProduct_temp = obj.IdOdd == "1" ? obj.IdChildrenProduct : obj.IdProduct
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let { listItemCreateBag, list_stone_save, isSplitProduct } = getState().bag
            let list_stone_save_temp = list_stone_save
            axios.get(`${Config.API_URL_USER}products/get_list_stone`, { params: { IdProduct: IdProduct_temp } })
                .then((response) => {
                    let { data } = response.data
                    if (obj.IdOdd != "1") {
                        listItemCreateBag.map((obj2, ii) => {
                            let sort = ""
                            data.map((item, i) => {
                                let item_temp = _.clone(item, true)
                                item_temp.sort = (ii + 1) + '.' + (i + 1)
                                // item.IdParentProduct = obj.IdProduct
                                item_temp.QtyDefault = item.sl
                                item_temp.IdStone = item.value
                                item_temp.IdProductParent = obj2.IdProduct
                                item_temp.ColorParent = obj2.Color
                                item_temp.Color = item.PrimaryStone ? obj2.Color : '001'
                                item_temp.IdBag = obj2.Id
                                item_temp.IdOrder = obj2.IdOrder
                                item_temp.Weight = 0
                                item_temp.Exchange = 0
                                item_temp.AvgStone = 0
                                item_temp.AvgStoneSum = 0
                                item_temp.IdProduct = IdProduct_temp
                                item_temp.IdProductColorStone = IdProduct_temp + item_temp.Color + item.value
                                item_temp.IdProductParentIdProductStoneColor = obj.IdProduct + IdProduct_temp + item.value + item_temp.Color
                                item_temp.IdProductColor = IdProduct_temp + item_temp.Color
                                item_temp.IdProductColorParentColorStone = IdProduct_temp + obj2.Color + item_temp.Color + item.value
                                item_temp.IdProductParentIdProductStone = obj.IdProduct + IdProduct_temp + item.value
                                item_temp.IdBagIdProductIdStone = obj2.Id + IdProduct_temp + item.value
                                item_temp.TypeStone = 'TYPE_STONE_1'
                                let check = []
                                if (isSplitProduct == 1) {
                                    check = list_stone_save_temp.filter(x => x.IdProductColorStone == item_temp.IdProductColorStone)
                                } else {
                                    check = list_stone_save_temp.filter(x => x.IdProductColorStone == item.IdProductColorStone)

                                }
                                if (check.length == 0) {
                                    list_stone_save_temp.push(item_temp)
                                }
                            })
                        })

                    } else {

                        data.map((item, i) => {
                            let item_temp = _.clone(item, true)
                            // item.IdParentProduct = obj.IdProduct
                            item_temp.QtyDefault = item.sl
                            item_temp.sort = (sttOdd + 1) + '.' + (i + 1)
                            item_temp.IdStone = item.value
                            item_temp.IdProductParent = obj.IdProduct
                            item_temp.ColorParent = obj.Color
                            item_temp.Color = item.PrimaryStone ? obj.Color : '001'
                            item_temp.IdBag = obj.Id
                            item_temp.IdOrder = obj.IdOrder
                            item_temp.Weight = 0
                            item_temp.Exchange = 0
                            item_temp.AvgStone = 0
                            item_temp.AvgStoneSum = 0
                            item_temp.IdProduct = IdProduct_temp
                            item_temp.IdProductColorStone = IdProduct_temp + item_temp.Color + item.value
                            item_temp.IdProductParentIdProductStoneColor = obj.IdProduct + IdProduct_temp + item.value + item_temp.Color
                            item_temp.IdProductParentIdProductStone = obj.IdProduct + IdProduct_temp + item.value
                            item_temp.IdProductColor = IdProduct_temp + item_temp.Color
                            item_temp.IdProductColorParentColorStone = IdProduct_temp + obj.Color + item_temp.Color + item.value
                            item_temp.IdBagIdProductIdStone = obj.Id + IdProduct_temp + item.value
                            item_temp.TypeStone = 'TYPE_STONE_1'
                            let check = list_stone_save_temp.filter(x => x.IdProductColorStone == item.IdProductColorStone)
                            if (check.length == 0) {
                                list_stone_save_temp.push(item_temp)
                            }
                        })
                    }
                    // update 
                    let temp = _.clone(listItemCreateBag, true);
                    let sumtotal = 0
                    temp.map((item, i) => {
                        sumtotal = sumtotal + parseFloat(item.Value)
                    })
                    list_stone_save_temp = list_stone_save_temp.map((item) => {
                        item.sl2 = parseFloat(item.sl) * sumtotal
                        return item
                    })
                    dispatch({
                        type: GET_LIST_STONE_BY_PRODUCTS_IN_BAG,
                        payload: {
                            list_stone_by_product: data || [],
                            list_stone_save: list_stone_save_temp
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListProductsByOrderSplitBag = (obj) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}bag/get_list_products_by_order_splitbag`, { params: { IdOrder: obj.IdOrder, IdProduct: obj.IdProduct, Color: obj.Color } })
                .then((response) => {
                    let { data } = response.data
                    dispatch({
                        type: GET_LIST_PRODUCT_BY_ORDER_SPLIT_BAG,
                        payload: {
                            listItemCreateBag: data || []
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListDataBag = (params = { page: 1, total: 10 }) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}bag`, { params: { page: params.page, total: params.total } })
                .then((response) => {
                    let { data } = response.data
                    let data_temp = data
                    data_temp.map(item => item.checked = false)
                    let totalRows = data_temp && data_temp[0] && data_temp[0].totalRows

                    dispatch({
                        type: GET_LIST_BAG,
                        payload: {
                            ListBag: data_temp || [],
                            listItemCheckBag: []
                        }
                    })
                    dispatch(updateInfoPage(totalRows))

                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}

export const clickCheckRowBag = (value, checked) => {
    return (dispatch, getState) => {
        let { ListBag, listItemCheckBag } = getState().bag
        let listItemCheckBag_temp = _.clone(listItemCheckBag, true)
        var list_temp = _.clone(ListBag, true);
        list_temp.map((item, i) => {
            // item.checked = false
            if (item.Id == value.Id) {
                item.checked = checked
            }
            return item
        })
        if (checked) {
            listItemCheckBag_temp.push(value)
        } else {
            listItemCheckBag_temp = listItemCheckBag_temp.filter(x => x.Id != value.Id)
        }
        console.log('clickCheckRowBag', listItemCheckBag_temp);

        dispatch({
            type: CLICK_ROW_DATA_BAG,
            payload: {
                ListBag: list_temp,
                itemDetail: value,
                listItemCheckBag: listItemCheckBag_temp
            }
        })
    }
}

export const printBagDetail = () => {
    return (dispatch, getState) => {
        let { itemDetail } = getState().bag
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}bag/print_detail_bag`,
                {},
                {
                    responseType: 'arraybuffer',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/xlsx'
                    }
                })
                .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), "excel.xlsx");
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'fileaaa.xlsx'); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListDetailByBag = (idBag) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}bag/get_list_detail`, { params: { IdBag: idBag } })
                .then((response) => {
                    let { data } = response.data
                    let objBag = data && data[0]
                    if (objBag && objBag.IdProduct) {
                        axios.get(`${Config.API_URL_USER}bag/get_list_product_by_idodd`, { params: { IdProduct: objBag.IdProduct } })
                            .then((responseOdd) => {
                                let listProductByIdOdd = responseOdd.data.data
                                let listProductByIdOdd_temp = [], IdChildrenProduct
                                let list_temp = response.data.data
                                if (listProductByIdOdd.length > 0) {
                                    listProductByIdOdd.map((item) => {
                                        listProductByIdOdd_temp.push({ IdParent: item.IdProduct, IdProductChildren: item.IdProduct })
                                    })
                                    IdChildrenProduct = listProductByIdOdd[0].IdProduct
                                }
                                list_temp.map((item, i) => {
                                    item.IdChildrenProduct = item.IdOdd == "1" ? IdChildrenProduct : item.IdProduct
                                    item.IdProductColor = item.IdProduct + item.Color
                                    item.ColorParent = item.Color
                                    let temp = _.clone(listProductByIdOdd_temp, true)
                                    let array_temp = []
                                    temp.map((it, ii) => {
                                        array_temp.push({ ColorParent: item.Color, IdParent: it.IdParent, IdProductChildren: it.IdProductChildren })
                                    })
                                    item.listChildrenProduct = array_temp

                                    return item
                                })
                                dispatch({
                                    type: GET_DETAIL_BY_BAG,
                                    payload: {
                                        listItemCreateBag: list_temp,
                                        list_products_by_idodd: listProductByIdOdd,
                                        itemDetailCreateBag: list_temp[0]
                                    }
                                })
                                let list_temp_all = []
                                list_temp.map((item) => {
                                    if (item.IdOdd == "1") {
                                        item.listChildrenProduct.map((itemChildren) => {
                                            let item_temp = _.clone(item)
                                            item_temp.IdChildrenProduct = itemChildren.IdProductChildren
                                            list_temp_all.push(item_temp)
                                        })
                                    } else {
                                        if (list_temp_all.filter(x => x.IdChildrenProduct == item.IdChildrenProduct).length == 0) {
                                            list_temp_all.push(item)
                                        }
                                    }
                                })
                                dispatch(getListStoneByProductsDetail())
                                resolve(response)

                            })

                    } else {
                        alert('Bag Không tồn tại.')
                    }

                })
        })

    }
}
export const getListDetailByBag2 = () => {
    return (dispatch, getState) => {
        let { itemDetail } = getState().bag
        return new Promise((resolve, reject) => {
            Promise.all([
                axios.get(`${Config.API_URL_USER}bag/get_list_detail`, { params: { IdBag: itemDetail.Id } }),
                axios.get(`${Config.API_URL_USER}bag/get_list_product_by_idodd`, { params: { IdProduct: itemDetail.IdProduct } })
            ])
                .then((response) => {
                    let { data } = response[0].data
                    let listProductByIdOdd = response[1].data.data
                    let listProductByIdOdd_temp = [], IdChildrenProduct
                    let list_temp = response[0].data.data
                    if (listProductByIdOdd.length > 0) {
                        listProductByIdOdd.map((item) => {
                            listProductByIdOdd_temp.push({ IdParent: item.IdProduct, IdProductChildren: item.IdProduct })
                        })
                        IdChildrenProduct = listProductByIdOdd[0].IdProduct
                    }
                    list_temp.map((item, i) => {
                        item.IdChildrenProduct = item.IdOdd == "1" ? IdChildrenProduct : item.IdProduct
                        item.IdProductColor = item.IdProduct + item.Color
                        item.ColorParent = item.Color
                        let temp = _.clone(listProductByIdOdd_temp, true)
                        let array_temp = []
                        temp.map((it, ii) => {
                            array_temp.push({ ColorParent: item.Color, IdParent: it.IdParent, IdProductChildren: it.IdProductChildren })
                        })
                        item.listChildrenProduct = array_temp

                        return item
                    })
                    dispatch({
                        type: GET_DETAIL_BY_BAG,
                        payload: {
                            listItemCreateBag: list_temp,
                            list_products_by_idodd: listProductByIdOdd,
                            itemDetailCreateBag: list_temp[0]
                        }
                    })
                    let list_temp_all = []
                    list_temp.map((item) => {
                        if (item.IdOdd == "1") {
                            item.listChildrenProduct.map((itemChildren) => {
                                let item_temp = _.clone(item)
                                item_temp.IdChildrenProduct = itemChildren.IdProductChildren
                                list_temp_all.push(item_temp)
                            })
                        } else {
                            if (list_temp_all.filter(x => x.IdChildrenProduct == item.IdChildrenProduct).length == 0) {
                                list_temp_all.push(item)
                            }
                        }
                    })
                    dispatch(getListStoneByProductsDetail())

                    resolve(response)
                })
        }, (err) => {
            reject(err)
        })

    }
}
export const getListDataBagBySearch = (value = '') => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}bag/search`, { params: { page: 1, total: 10, key: value } })
                .then((response) => {
                    let { data } = response.data
                    let data_temp = data
                    dispatch({
                        type: GET_LIST_BAG,
                        payload: {
                            ListBag: data || []
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const resetDataBag = () => {
    return (dispatch) => {
        dispatch({
            type: RESET_DATA_BAG,
            payload: null
        })
        dispatch(cleanStone())
    }
}
export const cleanStone = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAN_STONE,
            payload: {
                list_stone_save: [],
                list_stone_save_split: []
            }
        })
    }
}
export const updateItemStoneSplit = (item) => {
    return (dispatch) => {
        let item_temp = _.clone(item, true)
        dispatch({
            type: UPDATE_ITEM_STONE_SPLIT,
            payload: {
                itemStoneSplit: item_temp,
                isShowSplitStone: true
            }
        })
    }
}
export const showStoneSplit = (item) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_ITEM_STONE_SPLIT,
            payload: {
                isShowSplitStone: false,
                itemStoneSplit: {}
            }
        })
    }
}
export const updateColorItemSplit = (obj) => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_ITEM_STONE_SPLIT,
            payload: {
                itemStoneSplit: obj
            }
        })
    }
}
export const SplitStone = (value) => {
    let value_temp = value
    return (dispatch, getState) => {
        let { itemStoneSplit, list_stone_save_split, list_stone_save, itemDetailCreateBag, listItemCreateBag, list_stone_save_split_custom } = getState().bag
        value_temp = value_temp //* parseInt(sumsTotalQty[0].Value)
        let itemStoneSplit_temp = _.clone(itemStoneSplit, true)
        itemStoneSplit_temp.sl2 = value_temp
        let { IdProduct, ColorParent, Color, IdStone } = itemStoneSplit_temp
        itemStoneSplit_temp.SplitIdProductColorParentColorStone = IdProduct + ColorParent + Color + IdStone
        itemStoneSplit_temp.Weight = 0
        itemStoneSplit_temp.Exchange = 0
        itemStoneSplit_temp.exchange = 0
        let count_stone_split = parseInt(list_stone_save_split.filter(x => x.IdProductColorParentColorStone == itemStoneSplit_temp.IdProductColorParentColorStone).length + 1)
        itemStoneSplit_temp.sort = itemStoneSplit_temp.sort + '.' + count_stone_split
        list_stone_save_split.push(itemStoneSplit_temp)
        itemStoneSplit.sl2 = parseFloat(itemStoneSplit.sl2) - parseFloat(value_temp)
        list_stone_save.map((item) => {
            if (item.PrimaryStone == 1 && item.IdProductColorParentColorStone == itemStoneSplit.IdProductColorParentColorStone) {
                item.sl2 = parseFloat(item.sl2) - parseFloat(value_temp)
            }
            if (item.PrimaryStone == 0 && item.IdProductColorStone == itemStoneSplit.IdProductColorStone) {
                item.sl2 = parseFloat(item.sl2) - parseFloat(value_temp)
            }
        })

        if (itemDetailCreateBag.TypeSplitStone == 'TYPE_SPLIT_STONE_1') {
            let list_stone_save_split_temp = _.clone(list_stone_save_split_custom, true)
            // tính lại tỷ lệ cho đá tách
            listItemCreateBag.map((itemProduct) => {
                console.log('itemProduct.ColorParent', itemProduct.ColorParent);
                console.log('itemStoneSplit_temp.ColorParent', itemStoneSplit_temp.ColorParent);

                if (itemProduct.ColorParent != itemStoneSplit_temp.ColorParent) {
                    let itemStoneSplit_temp2 = _.clone(itemStoneSplit_temp, true)
                    itemStoneSplit_temp2.ColorParent = itemProduct.ColorParent
                    list_stone_save_split_temp.push(itemStoneSplit_temp2)
                }
            })
            dispatch({
                type: UPDATE_LIST_STONE_SPLIT,
                payload: {
                    itemStoneSplit: itemStoneSplit,
                    list_stone_save: list_stone_save,
                    list_stone_save_split: list_stone_save_split,
                    list_stone_save_split_custom: list_stone_save_split_temp
                }
            })
        }
        else {
            dispatch({
                type: UPDATE_LIST_STONE_SPLIT,
                payload: {
                    itemStoneSplit: itemStoneSplit,
                    list_stone_save: list_stone_save,
                    list_stone_save_split: list_stone_save_split
                }
            })
        }

    }
}
export const SplitStoneDetail = (value) => {
    let value_temp = value
    return (dispatch, getState) => {
        let { itemStoneSplit, list_stone_save_split, list_stone_save, itemDetailCreateBag, listItemCreateBag, list_stone_save_split_custom } = getState().bag
        value_temp = value_temp
        let itemStoneSplit_temp = _.clone(itemStoneSplit, true)
        itemStoneSplit_temp.sl2 = value_temp
        let { IdProduct, ColorParent, Color, IdStone } = itemStoneSplit_temp
        itemStoneSplit_temp.SplitIdProductColorParentColorStone = IdProduct + ColorParent + Color + IdStone
        itemStoneSplit_temp.Weight = 0
        itemStoneSplit_temp.Exchange = 0
        itemStoneSplit_temp.exchange = 0
        let count_stone_split = parseInt(list_stone_save_split.filter(x => x.IdProductColorParentColorStone == itemStoneSplit_temp.IdProductColorParentColorStone).length + 1)
        itemStoneSplit_temp.sort = itemStoneSplit_temp.sort + '.' + count_stone_split
        list_stone_save_split.push(itemStoneSplit_temp)
        itemStoneSplit.sl2 = parseFloat(itemStoneSplit.sl2) - parseFloat(value_temp)
        list_stone_save.map((item) => {
            if (item.PrimaryStone == 1 && item.IdProductColorParentColorStone == itemStoneSplit.IdProductColorParentColorStone) {
                item.sl2 = parseFloat(item.sl2) - parseFloat(value_temp)
            }
            if (item.PrimaryStone == 0 && item.IdProductColorStone == itemStoneSplit.IdProductColorStone) {
                item.sl2 = parseFloat(item.sl2) - parseFloat(value_temp)
            }
        })

        if (itemDetailCreateBag.TypeSplitStone == 'TYPE_SPLIT_STONE_1') {
            let list_stone_save_split_temp = _.clone(list_stone_save_split_custom, true)
            // tính lại tỷ lệ cho đá tách
            listItemCreateBag.map((itemProduct) => {
                if (itemProduct.ColorParent != itemStoneSplit_temp.ColorParent) {
                    let itemStoneSplit_temp2 = _.clone(itemStoneSplit_temp, true)
                    itemStoneSplit_temp2.ColorParent = itemProduct.ColorParent
                    list_stone_save_split_temp.push(itemStoneSplit_temp2)
                }
            })
            dispatch({
                type: UPDATE_LIST_STONE_SPLIT,
                payload: {
                    itemStoneSplit: itemStoneSplit,
                    list_stone_save: list_stone_save,
                    list_stone_save_split: list_stone_save_split,
                    list_stone_save_split_custom: list_stone_save_split_temp
                }
            })

        } else {
            dispatch({
                type: UPDATE_LIST_STONE_SPLIT,
                payload: {
                    itemStoneSplit: itemStoneSplit,
                    list_stone_save: list_stone_save,
                    list_stone_save_split: list_stone_save_split
                }
            })
        }

    }
}


export const removeStoneSplit = (obj) => {
    return (dispatch, getState) => {
        let { list_stone_save_split, itemStoneSplit, list_stone_save, list_stone_save_split_custom } = getState().bag
        let list_temp = _.clone(list_stone_save_split, true)
        let itemStoneSplit_temp = _.clone(itemStoneSplit, true)
        let total = 0
        list_temp = list_temp.filter(x => x.SplitIdProductColorParentColorStone != obj.SplitIdProductColorParentColorStone)
        list_temp.filter(x => x.IdProductParentIdProductStoneColor == obj.IdProductParentIdProductStoneColor).map((item) => {
            total = total + parseFloat(item.sl2)
        })
        if (list_temp.length == 0) {
            itemStoneSplit_temp.sl2 = itemStoneSplit_temp.remain
        } else {
            itemStoneSplit_temp.sl2 = itemStoneSplit_temp.remain - total
        }
        list_stone_save.map((item) => {
            if (item.IdProductParentIdProductStoneColor == itemStoneSplit_temp.IdProductParentIdProductStoneColor) {
                item.numofstone = itemStoneSplit_temp.sl2
                item.sl2 = itemStoneSplit_temp.sl2
            }
        })

        // xoá list đá custom
        let list_temp_custom = _.clone(list_stone_save_split_custom, true)
        list_temp_custom = list_temp_custom.filter(x => x.SplitIdProductColorParentColorStone != obj.SplitIdProductColorParentColorStone)
        dispatch({
            type: REMOVE_STONE_SPLIT,
            payload: {
                list_stone_save_split: list_temp,
                itemStoneSplit: itemStoneSplit_temp,
                list_stone_save: list_stone_save,
                list_stone_save_split_custom: list_temp_custom
            }
        })

    }
}

export const checkCodeExistsBag = (IdBag) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}bag/check_code_exists_bag`,
                { params: { IdBag: IdBag } })
                .then((response) => {
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
