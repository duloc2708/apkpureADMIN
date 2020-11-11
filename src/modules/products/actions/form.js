import {
    ADD_NEW_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM_PRODUCTS,
    CLICK_ROW_DATA,
    CHECK_ALL_ROW,
    DELETE_ITEM_PRODUCTS_ALL,
    ARRAY_ITEM_TAB_STONE,
    UPDATE_NUMBER_STONE_BY_ID,
    GET_OTHER_PRODUCTS,
    UPDATE_INPUT_DATA,
    IS_EDIT_PRODUCT,
    ADD_LIST_CASTING,
    ADD_LIST_STONE,
    GET_LIST_CASTING_BY_PRODUCTS,
    GET_LIST_STONE_BY_PRODUCTS,
    ARRAY_ITEM_TAB_CASTING,
    UPDATE_ITEM_PRODUCT,
    REMOVE_ITEM_STONE,
    REMOVE_ITEM_CASTING,
    UPDATE_NUMBER_CASTING_BY_ID,
    RESET_DATA_PRODUCTS,
    CHANGE_PAGE_TABLE,
    GET_LIST_IMAGE_BY_PRODUCTS,
    GET_LIST_MOULD,
    ARRAY_ITEM_TAB_MOULD,
    REMOVE_ITEM_MOULD,
    SELECTED_OPTION,
    UPDATE_NUMBER_MOULD_BY_ID,
    GET_LIST_CASTING_IN_PRODUCTS,
    GET_LIST_STONE_IN_PRODUCTS,
    GET_LIST_ALL_PRODUCTS_COMBOBOX,
    ARRAY_ITEM_LIST_PRODUCTS,
    REMOVE_ITEM_PRODUCTS_SELECTED,
    GENERATE_NUMBER_ID_PRODUCTS,
    GET_LIST_MOULD_BY_PRODUCTS,
    GET_LIST_TAB,
    GET_DETAIL_BY_PRODUCT,
    NEXT_PAGE_PRODUCTS,
    PREVIOUS_PAGE_PRODUCTS,
    LOADING_PRODUCTS,
    GET_PRODUCTS_BY_ID
} from '../types'
import { updateInfoPage, resetInfoPage } from 'modules/common/actions/form'

export const exportListProducts = (value = '') => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}products/export_data`,
                { page: 1, total: 10000, key: value && value.trim() },
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
                    link.setAttribute('download', 'Danh sách sản phẩm.xlsx'); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}

export const getProductById = (IdProduct) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}products/id`, { params: { IdProduct: IdProduct } })
                .then((response) => {
                    let { data } = response.data
                    dispatch({
                        type: GET_PRODUCTS_BY_ID,
                        payload: {
                            itemDetail: {}
                        }
                    })
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const checkExistsCodeProduct = (IdProduct) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}products/check_exist_product_code`, { params: { IdProduct: IdProduct } })
                .then((response) => {
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getDetailProduct = (IdProduct) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}products/get_detail_product`, { params: { IdProduct: IdProduct } })
                .then((response) => {
                    let { data } = response.data
                    if (data.length > 0) {
                        dispatch({
                            type: GET_DETAIL_BY_PRODUCT,
                            payload: {
                                objData: data && data[0],
                                isDetail: true,
                                idProduct: IdProduct
                            }
                        })
                        dispatch(getListImageByProducts())
                        dispatch(getListTab())
                        dispatch(getListProductsCombobox())
                    } else {
                        alert('Sản phẩm không tồn tại.')
                    }
                    resolve(response)

                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const ChangePage = (value) => {
    return (dispatch, getState) => {
        dispatch({
            type: CHANGE_PAGE_TABLE,
            payload: {
                page: value
            }
        })
    }
}

export const removeItemStone = (obj) => {
    return (dispatch, getState) => {
        let { listStoneSelected } = getState().products
        let temp = _.clone(listStoneSelected, true);
        temp = temp.filter(x => x.value !== obj.value)
        dispatch({
            type: REMOVE_ITEM_STONE,
            payload: {
                listStoneSelected: temp
            }
        })
    }
}

export const removeItemMould = (obj) => {
    return (dispatch, getState) => {
        let { listMouldSelected } = getState().products
        let temp = _.clone(listMouldSelected, true);
        temp = temp.filter(x => x.value !== obj.value)
        dispatch({
            type: REMOVE_ITEM_MOULD,
            payload: {
                listMouldSelected: temp
            }
        })
    }
}

export const removeItemCasting = (obj) => {
    return (dispatch, getState) => {
        let { listCastingSelected } = getState().products
        let temp = _.clone(listCastingSelected, true);
        temp = temp.filter(x => x.value !== obj.value)
        dispatch({
            type: REMOVE_ITEM_CASTING,
            payload: {
                listCastingSelected: temp
            }
        })
    }
}
export const clickCheckRowTabStone = (objData) => {
    return (dispatch, getState) => {
        let { listStoneSelected } = getState().products
        let temp = _.clone(listStoneSelected, true);
        let check = temp.filter(x => x.value == objData.value);
        objData.PrimaryStone = false
        if (!check || check.length == 0) {
            temp.push(objData)
            dispatch({
                type: ARRAY_ITEM_TAB_STONE,
                payload: {
                    listStoneSelected: temp
                }
            })
        }
    }
}
export const clickCheckRowTabCasting = (objData) => {
    console.log(objData)
    return (dispatch, getState) => {
        let { listCastingSelected } = getState().products
        let temp = _.clone(listCastingSelected, true);
        let check = temp.filter(x => x.value == objData.value);
        if (!check || check.length == 0) {
            temp.push(objData)
            dispatch({
                type: ARRAY_ITEM_TAB_CASTING,
                payload: {
                    listCastingSelected: temp
                }
            })
        }
    }
}
export const clickCheckRowTabMould = (objData) => {
    return (dispatch, getState) => {
        let { listMouldSelected } = getState().products
        let temp = _.clone(listMouldSelected, true);
        let check = temp.filter(x => x.value == objData.value);
        if (!check || check.length == 0) {
            temp.push(objData)
            dispatch({
                type: ARRAY_ITEM_TAB_MOULD,
                payload: {
                    listMouldSelected: temp
                }
            })
        }
    }
}
export const getListCastingByProducts = () => {
    return (dispatch, getState) => {
        let { objData, listCastingSelected } = getState().products
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}products/get_list_casting`, { IdProduct: objData.Id })
                .then((response) => {
                    let { data } = response.data
                    let listCastingSelected_temp = _.clone(listCastingSelected, true);
                    let data_temp = data
                    // map data
                    if (listCastingSelected_temp.length > 0) {
                        listCastingSelected_temp.map((item, i) => {
                            let check = data_temp.filter(x => x.value == item.value)
                            if (check.length == 0) {
                                data_temp.push(item)
                            }
                        })
                    }
                    dispatch({
                        type: GET_LIST_CASTING_BY_PRODUCTS,
                        payload: {
                            listCastingByProducts: data || [],
                            listCastingSelected: data_temp,
                            page: 1
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListStoneByProducts = () => {
    return (dispatch, getState) => {
        let { objData, listStoneSelected } = getState().products
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}products/get_list_stone`, { IdProduct: objData.Id })
                .then((response) => {
                    let { data } = response.data
                    let listStoneSelected_temp = _.clone(listStoneSelected, true);
                    let data_temp = data
                    // map data
                    if (listStoneSelected_temp.length > 0) {
                        listStoneSelected_temp.map((item, i) => {
                            let check = data_temp.filter(x => x.value == item.value)
                            if (check.length == 0) {
                                data_temp.push(item)
                            }
                        })
                    }
                    dispatch({
                        type: GET_LIST_STONE_BY_PRODUCTS,
                        payload: {
                            listStoneByProducts: data || [],
                            listStoneSelected: data_temp
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListMouldByProducts = () => {
    return (dispatch, getState) => {
        let { objData, listMouldSelected } = getState().products
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}products/get_list_mould`, { IdProduct: objData.Id })
                .then((response) => {
                    let { data } = response.data
                    let listMouldSelected_temp = _.clone(listMouldSelected, true);
                    let data_temp = data
                    // map data
                    if (listMouldSelected_temp.length > 0) {
                        listMouldSelected_temp.map((item, i) => {
                            let check = data_temp.filter(x => x.value == item.value)
                            if (check.length == 0) {
                                data_temp.push(item)
                            }
                        })
                    }
                    dispatch({
                        type: GET_LIST_MOULD_BY_PRODUCTS,
                        payload: {
                            listMouldSelected: data_temp
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListTab = () => {
    return (dispatch, getState) => {
        let { objData, listMouldSelected } = getState().products
        return new Promise((resolve, reject) => {
            Promise.all([
                axios.post(`${Config.API_URL_USER}products/get_list_products_by_products`, { IdProduct: objData.Id }),
                axios.post(`${Config.API_URL_USER}products/get_list_mould`, { IdProduct: objData.Id }),
                axios.get(`${Config.API_URL_USER}products/get_list_stone`, { params: { IdProduct: objData.Id } }),
                axios.post(`${Config.API_URL_USER}products/get_list_casting`, { IdProduct: objData.Id }),
                axios.post(`${Config.API_URL_USER}products/get_list_price`, { IdProduct: objData.Id, page: 1, total: 100000 })
            ])
                .then((response) => {
                    let data_product = response[0].data.data
                    let data_mould = response[1].data.data
                    let data_stone = response[2].data.data
                    let data_casting = response[3].data.data
                    let data_price = response[4].data.data
                    dispatch({
                        type: GET_LIST_TAB,
                        payload: {
                            listProductsSelected: data_product,
                            listMouldSelected: data_mould,
                            listStoneSelected: data_stone,
                            listCastingSelected: data_casting,
                            listPrice: data_price
                        }
                    })
                    resolve(response)
                })
        })
    }
}
export const getListProductsByProducts = () => {
    return (dispatch, getState) => {
        let { objData, listProductsSelected } = getState().products
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}products/get_list_products_by_products`, { IdProduct: objData.Id })
                .then((response) => {
                    let { data } = response.data
                    let listProductsSelected_temp = _.clone(listProductsSelected, true);
                    let data_temp = data
                    // map data
                    if (listProductsSelected_temp.length > 0) {
                        listProductsSelected_temp.map((item, i) => {
                            let check = data_temp.filter(x => x.value == item.value)
                            if (check.length == 0) {
                                data_temp.push(item)
                            }
                        })
                    }
                    dispatch({
                        type: GET_LIST_MOULD_BY_PRODUCTS,
                        payload: {
                            listProductsSelected: data_temp
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListDataProductsBySearch = (value = '') => {
    return (dispatch, getState) => {
        dispatch({
            type: LOADING_PRODUCTS,
            payload: {
                loadingProducts: true
            }
        })
        let { page, total, endPage } = getState().common
        let pageParams = {
            page: page,
            total: total
        }
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}products/search`, { page: pageParams.page, total: pageParams.total, key: value && value.trim() })
                .then((response) => {
                    let { data } = response.data
                    let data_temp = data
                    data_temp.map(item => item.checked = false)
                    dispatch(resetDataProducts())
                    let totalPage = data_temp && data_temp[0] && data_temp[0].totalRows
                    dispatch({
                        type: GET_OTHER_PRODUCTS,
                        payload: {
                            list_data: data_temp || []
                        }
                    })
                    let totalRows = data_temp && data_temp[0] && data_temp[0].totalRows
                    dispatch(updateInfoPage(totalRows))
                    dispatch({
                        type: LOADING_PRODUCTS,
                        payload: {
                            loadingProducts: false
                        }
                    })
                    resolve(response)
                }, (err) => {
                    dispatch({
                        type: LOADING_PRODUCTS,
                        payload: {
                            loadingProducts: false
                        }
                    })
                    reject(err)
                })
        })
    }
}
export const getListDataProducts = (params = { page: 1, total: 50 }) => {
    return (dispatch, getState) => {
        let { page, total, endPage } = getState().common
        let pageParams = {
            page: page,
            total: total
        }
        dispatch({
            type: LOADING_PRODUCTS,
            payload: {
                loadingProducts: true
            }
        })
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}products`, { page: params.page, total: params.total })
                .then((response) => {
                    let { data } = response.data
                    let data_temp = data
                    data_temp.map(item => item.checked = false)
                    let { itemDetail } = getState().stone
                    let { status } = getState().products
                    if (itemDetail && itemDetail.checked) {
                        data_temp.map((item, i) => {
                            if (item.Id == itemDetail.Id && status == '') {
                                item.checked = true
                            }
                            return item
                        })
                    }
                    let totalRows = data_temp && data_temp[0] && data_temp[0].totalRows
                    dispatch({
                        type: GET_OTHER_PRODUCTS,
                        payload: {
                            list_data: data_temp || [],
                            isDetail: false
                        }
                    })
                    dispatch(updateInfoPage(totalRows))
                    dispatch({
                        type: LOADING_PRODUCTS,
                        payload: {
                            loadingProducts: false
                        }
                    })

                    resolve(response)
                }, (err) => {
                    dispatch({
                        type: LOADING_PRODUCTS,
                        payload: {
                            loadingProducts: false
                        }
                    })

                    reject(err)
                })
        })
    }
}
export const clickCheckRowProducts = (value, checked) => {
    return (dispatch, getState) => {
        let { list_data } = getState().products
        var list_temp = _.clone(list_data, true);
        list_temp.map((item, i) => {
            item.checked = false
            if (item.Id == value.Id) {
                item.checked = checked
            }
            return item
        })
        dispatch({
            type: CLICK_ROW_DATA,
            payload: {
                list_data: list_temp,
                itemDetail: value,
                objData: value
            }
        })
    }
}
export const updateNumberCastingById = (obj) => {
    return (dispatch, getState) => {
        let { listCastingSelected } = getState().products
        let temp = _.clone(listCastingSelected, true);
        temp.map((item, i) => {
            if (item.value == obj.id) {
                item.sl = obj.value
                item.WeightWax=obj.WeightWax
            }
            return item
        })
        dispatch({
            type: UPDATE_NUMBER_CASTING_BY_ID,
            payload: {
                listSelected: temp
            }
        })
    }
}

export const updateNumberStoneById = (obj) => {
    return (dispatch, getState) => {
        let { listStoneSelected } = getState().products
        let temp = _.clone(listStoneSelected, true);  
       
        temp.map((item, i) => {
             if (item.value == obj.id) {
                item.sl = obj.value
            }
            // if (obj.id=='sl')
            // {
            //      item.sl = obj.value
            // }
            return item
        })
        dispatch({
            type: UPDATE_NUMBER_STONE_BY_ID,
            payload: {
                listStoneSelected: temp
            }
        })
    }
}
export const updateQtyHandsetStoneById = (obj) => {
    return (dispatch, getState) => {
        let { listStoneSelected } = getState().products
        let temp = _.clone(listStoneSelected, true);
       
        temp.map((item, i) => {
            
             if (item.value == obj.other) {
                item.QtyHandset = obj.value

            }
            // if (obj.id=='QtyHandset')
            // {
            //    item.QtyHandset = obj.value 
            // }
            return item
        })
        dispatch({
            type: UPDATE_NUMBER_STONE_BY_ID,
            payload: {
                listStoneSelected: temp
            }
        })
    }
}
export const updatePrimaryStoneById = (obj, checked) => {
    return (dispatch, getState) => {
        let { listStoneSelected } = getState().products
        let temp = _.clone(listStoneSelected, true);
        temp.map((item, i) => {
            if (item.value == obj.value) {
                item.PrimaryStone = checked
            }
            return item
        })
        dispatch({
            type: UPDATE_NUMBER_STONE_BY_ID,
            payload: {
                listStoneSelected: temp
            }
        })
    }
}

export const updateNumberMouldById = (obj) => {
    return (dispatch, getState) => {
        let { listMouldSelected } = getState().products
        let temp = _.clone(listMouldSelected, true);
        temp.map((item, i) => {
            if (item.value == obj.id) {
                item.sl = obj.value
            }
            return item
        })
        dispatch({
            type: UPDATE_NUMBER_MOULD_BY_ID,
            payload: {
                listMouldSelected: temp
            }
        })
    }
}
export const addNewItemProducts = () => {
    return (dispatch, getState) => {
        let { objData, listProductsSelected } = getState().products
        objData["numperset"] = listProductsSelected.length
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}products/add`, objData)
                .then((response) => {
                    let { data } = response.data
                    dispatch({
                        type: ADD_NEW_ITEM,
                        payload: null
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const updateItemProducts = () => {
    return (dispatch, getState) => {
        let { objData, listProductsSelected } = getState().products
        objData["numperset"] = listProductsSelected.length
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}products/update`, objData)
                .then((response) => {
                    let { data } = response.data
                    dispatch({
                        type: UPDATE_ITEM_PRODUCT,
                        payload: null
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const updateItem = (params) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}common/list/update`, params)
                .then((response) => {
                    let { data } = response.data
                    dispatch({
                        type: UPDATE_ITEM,
                        payload: null
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const deleteItemProducts = (params) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}products/delete`, params)
                .then((response) => {
                    let { data } = response.data
                    dispatch({
                        type: DELETE_ITEM_PRODUCTS,
                        payload: {
                            itemDetail: {}
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const checkAllRow = (value) => {
    return (dispatch, getState) => {
        let { list_data } = getState().stone
        var list_temp = _.clone(list_data, true);
        list_temp.map((item, i) => {
            item.checked = value
            return item
        })
        dispatch({
            type: CHECK_ALL_ROW,
            payload: {
                list_data: list_temp,
                allChecked: value
            }
        })
    }
}
export const deleteAllItem = () => {
    return (dispatch, getState) => {
        let { list_data } = getState().stone
        let data_temp = _.clone(list_data, true), listid = []
        data_temp.map((item, i) => {
            listid.push(item.id)
        })
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}stone/deleteAll`, { listid: listid })
                .then((response) => {
                    let { data } = response.data
                    dispatch({
                        type: DELETE_ITEM_PRODUCTS_ALL,
                        payload: null
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const updateInputItem = (obj) => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_INPUT_DATA,
            payload: {
                objData: obj
            }
        })
    }
}
export const isEditProduct = (value) => {
    return (dispatch) => {
        dispatch({
            type: IS_EDIT_PRODUCT,
            payload: {
                isDetail: value
            }
        })
    }
}
export const addListStoneAndCasting = () => {
    return (dispatch, getState) => {
        let { listStoneSelected, listCastingSelected, listProductsSelected, listMouldSelected } = getState().products
        let { objData } = getState().products
        let data_temp = []
        let data_temp2 = []
        let data_temp3 = []
        let data_temp4 = []
        if (objData.Id) {
            console.log('data_stone',data_temp)
            console.log('listStoneSelected',listStoneSelected)
            listStoneSelected.map((item, i) => {
                data_temp.push({
                    IdProduct: objData.Id,
                    IdStone: item.value,
                    Qty: item.sl,
                    QtyHandset: item.QtyHandset || 0,
                    PrimaryStone: item.PrimaryStone ? 1 : 0,
                })
            })

            listCastingSelected.map((item, i) => {
                data_temp2.push({
                    IdProduct: objData.Id,
                    IdCasting: item.value,
                    Qty: item.sl,
                    WeightWax: item.WeightWax,
                })
            })
            listProductsSelected.map((item, i) => {
                data_temp3.push({
                    IdProductParent: objData.Id,
                    IdProduct: item.value
                })
            })
            listMouldSelected.map((item, i) => {
                data_temp4.push({
                    IdProduct: objData.Id,
                    IdMould: item.value,
                    Qty: item.sl,
                    WeightWax: item.WeightWax,
                })
            })
            return new Promise((resolve, reject) => {
                Promise.all([
                    axios.post(`${Config.API_URL_USER}products/add_list_stone_casting`, { dataStone: data_temp, dataCasting: data_temp2, dataProduct: data_temp3, dataMould: data_temp4, IdProduct: objData.Id }),
                    // axios.post(`${Config.API_URL_USER}products/excute_procedure_update_store`, { IdProduct: objData.Id }),
                    // axios.post(`${Config.API_URL_USER}products/add_list_casting`, { data: data_temp2 })
                ])
                    .then((response) => {
                        dispatch({
                            type: ADD_LIST_STONE,
                            payload: null
                        })
                        resolve(response)
                    })
            }, (err) => {
                reject(err)
            })
        }
        else {
            dispatch({
                type: ADD_LIST_STONE,
                payload: null
            })
        }

    }
}
export const addListCasting = () => {
    return (dispatch, getState) => {
        let { listCastingSelected } = getState().products
        let { objData } = getState().products
        let data_temp = []
        if (objData.Id && listCastingSelected.length > 0) {
            listCastingSelected.map((item, i) => {
                data_temp.push({
                    IdProduct: objData.Id,
                    IdCasting: item.value,
                    Qty: item.sl,
                    QtyHandset: item.QtyHandset,
                    WeightWax: item.WeightWax,
                })
            })
            return new Promise((resolve, reject) => {
                axios.post(`${Config.API_URL_USER}products/add_list_casting`, { data: data_temp })
                    .then((response) => {
                        let { data } = response.data
                        dispatch({
                            type: ADD_LIST_CASTING,
                            payload: null
                        })
                        resolve(response)
                    }, (err) => {
                        reject(err)
                    })
            })
        } else {
            dispatch({
                type: ADD_LIST_CASTING,
                payload: null
            })
        }
    }
}
export const resetDataProducts = () => {
    return (dispatch, getState) => new Promise((resolve, reject) => {
        dispatch({
            type: RESET_DATA_PRODUCTS,
            payload: null
        })
        resolve(RESET_DATA_PRODUCTS)
    })
}
export const getListImageByProducts = () => {
    return (dispatch, getState) => {
        let { objData } = getState().products
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}products/get_image_by_products`, { IdProduct: objData.Id })
                .then((response) => {
                    let { data } = response.data
                    dispatch({
                        type: GET_LIST_IMAGE_BY_PRODUCTS,
                        payload: {
                            listImageByProducts: data
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListDataMould = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}products/mould`)
                .then((response) => {
                    let { data } = response.data
                    dispatch({
                        type: GET_LIST_MOULD,
                        payload: {
                            listMould: data,
                            selectedOption: ''
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const selectOptionData = (value) => {
    return (dispatch) => {
        dispatch({
            type: SELECTED_OPTION,
            payload: {
                selectedOption: value
            }
        })
    }
}
export const getListDataCastingInProducts = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}products/casting`)
                .then((response) => {
                    let { data } = response.data
                    dispatch({
                        type: GET_LIST_CASTING_IN_PRODUCTS,
                        payload: {
                            listCasting: data || [],
                            selectedOption: ''
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListDataStoneInProducts = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}products/stone`)
                .then((response) => {
                    let { data } = response.data
                    dispatch({
                        type: GET_LIST_STONE_IN_PRODUCTS,
                        payload: {
                            listStone: data || [],
                            selectedOption: ''
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListProductsCombobox = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}products/list_products_combobox`)
                .then((response) => {
                    let { data } = response.data
                    dispatch({
                        type: GET_LIST_ALL_PRODUCTS_COMBOBOX,
                        payload: {
                            listProductsCombobox: data || [],
                            selectedOption: ''
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const clickCheckRowProductsCombobox = (objData) => {
    return (dispatch, getState) => {
        let { listProductsSelected } = getState().products
        let temp = _.clone(listProductsSelected, true);
        let check = temp.filter(x => x.value == objData.value);
        if (!check || check.length == 0) {
            temp.push(objData)
            dispatch({
                type: ARRAY_ITEM_LIST_PRODUCTS,
                payload: {
                    listProductsSelected: temp
                }
            })
        }
    }
}
export const removeItemProductsSelected = (obj) => {
    return (dispatch, getState) => {
        let { listProductsSelected } = getState().products
        let temp = _.clone(listProductsSelected, true);
        temp = temp.filter(x => x.value !== obj.value)
        dispatch({
            type: REMOVE_ITEM_PRODUCTS_SELECTED,
            payload: {
                listProductsSelected: temp
            }
        })
    }
}
export const getNumberAutoProducts = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}products/get_auto_number`)
                .then((response) => {
                    let { data } = response.data
                    let { objData } = getState().products
                    // objData["Id"] = data && data[0].value || '0000000'
                    // objData["IdNew"] = data && data[0].value || '0000000'
                    // objData["Name"] = data && data[0].value || '0000000'
                    objData["Unit"] = 'GR'
                    dispatch({
                        type: GENERATE_NUMBER_ID_PRODUCTS,
                        payload: {
                            objData: objData
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const validateProduct = () => {
    return (dispatch, getState) => {
        let { objData } = getState().products
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}products/validate_product`, { IdProduct: objData.Id })
                .then((response) => {
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
