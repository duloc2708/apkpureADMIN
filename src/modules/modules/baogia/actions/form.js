import {
    ADD_NEW_ITEM_BAOGIA,
    UPDATE_ITEM,
    DELETE_ITEM_OUTPUT,
    UPDATE_INPUT_DATA_PRICE,
    IS_EDIT,
    UPDATE_ITEM_OUTPUT,
    UPDATE_NUMBER_CASTING_BY_ID,
    RESET_DATA_BAOGIA,
    CHANGE_PAGE_TABLE,
    GET_LIST_CUSTOMER,
    SELECT_CUSTOMER_IN_OUTPUT,
    GET_LIST_PRODUCTS,
    ARRAY_ITEM_PRODUCTS,
    UPDATE_CELL_INPUT_BY_ID,
    GENERATE_NUMBER_ID_OUTPUT,
    ADD_LIST_PRODUCTS_BY_OUTPUT,
    IS_EDIT_BAOGIA,
    SELECTED_ORDER_OUTPUT,
    GET_LIST_BAO_GIA,
    GET_LIST_PRODUCT_IN_BAOGIA,
    SHOW_LIST_PRODUCTS,
    UPDATE_PRICE_BY_TYPE,
    CLICK_ROW_DATA_BAOGIA
} from '../types'
import { GET_LIST_BAG } from '../../bag/types';
import { updateInfoPage } from 'modules/common/actions/form'

export const updateCellProductsByOutput = (obj) => {
    return (dispatch, getState) => {
        const { listProductsInProduct } = getState().baogia
        let listProductsInProductTemp = _.clone(listProductsInProduct, true)
        listProductsInProductTemp = listProductsInProductTemp.map(item => {
            if (item.ProductID == obj.id) {
                item.Saleprice = parseFloat(obj.value)
            }
            return item
        })
        dispatch({
            type: UPDATE_INPUT_DATA_PRICE,
            payload: {
                listProductsInProduct: listProductsInProductTemp
            }
        })
    }
}


export const updatePriceCustom = (item) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}baogia/update_price_custom`, item)
                .then((response) => {
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}

export const updatePriceByType = (type, ratio) => {
    return (dispatch, getState) => {
        let { objDataBaoGia } = getState().baogia
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}baogia/update_price_by_type`, objDataBaoGia)
                .then((response) => {
                    dispatch({
                        type: UPDATE_PRICE_BY_TYPE,
                        payload: null
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const showListProducts = (value) => {
    return (dispatch, getState) => {
        dispatch({
            type: SHOW_LIST_PRODUCTS,
            payload: {
                isShowProduct: value
            }
        })
    }
}


export const getListProducts = (params) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}order/products`, { page: 0, total: 0 })
                .then((response) => {
                    let { data } = response.data
                    let data_temp = []
                    data.map((item, i) => {
                        data_temp.push({ Id: item.Id, Name: item.Id, Price: item.Price, Image: item.Image, IdOdd: item.IdOdd })
                    })
                    dispatch({
                        type: GET_LIST_PRODUCTS,
                        payload: {
                            list_products: data_temp || []
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListCustomer = (params) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}customer`, { page: 0, total: 0 })
                .then((response) => {
                    let { data } = response.data
                    let data_temp = []
                    data.map((item, i) => {
                        data_temp.push({ Id: item.Code, Name: item.Name })
                    })
                    dispatch({
                        type: GET_LIST_CUSTOMER,
                        payload: {
                            listCustomer: data_temp || []
                        }
                    })
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

export const getListDataBaoGia = (params = { page: 1, total: 10 }) => {
    return (dispatch, getState) => {
        let { page, total } = getState().baogia
        let pageParams = {
            page: page,
            total: total
        }
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}baogia`, { params: { page: params.page, total: params.total } })
                .then((response) => {
                    let { data } = response.data
                    let data_temp = _.clone(data, true)
                    data_temp.map(item => item.checked = false)
                    // let { itemDetail } = getState().stone
                    // let { status } = getState().products
                    // if (itemDetail && itemDetail.checked) {
                    //     data_temp.map((item, i) => {
                    //         if (item.Id == itemDetail.Id && status == '') {
                    //             item.checked = true
                    //         }
                    //         return item
                    //     })
                    // }
                    dispatch({
                        type: GET_LIST_BAO_GIA,
                        payload: {
                            list_data: data_temp || [],
                            isDetail: false,
                            itemDetail: '',
                        }
                    })
                    dispatch(ChangePage(pageParams.page))
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const clickCheckRowBaoGia = (item, checked) => {
    return (dispatch, getState) => {
        let { list_data } = getState().baogia
        var list_temp = _.clone(list_data, true);
        list_temp.map((itemDetail, i) => {
            itemDetail.checked = false
            if (itemDetail.Pricecode == item.Pricecode) {
                itemDetail.checked = checked
            }
            return itemDetail
        })
        dispatch({
            type: CLICK_ROW_DATA_BAOGIA,
            payload: {
                objDataBaoGia: item,
                list_data: list_temp
            }
        })
        setTimeout(() => {
            dispatch(getListDataProductInBaoGia())
        }, 200)
    }
}
export const addNewItemBaoGia = () => {
    return (dispatch, getState) => {
        let { objDataBaoGia } = getState().baogia
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}baogia/add`, objDataBaoGia)
                .then((response) => {
                    let { data } = response.data
                    dispatch({
                        type: ADD_NEW_ITEM_BAOGIA,
                        payload: {
                            isDetail: false
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const updateItemBaoGia = () => {
    return (dispatch, getState) => {
        let { objDataBaoGia } = getState().baogia
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}baogia/update`, objDataBaoGia)
                .then((response) => {
                    let { data } = response.data
                    dispatch({
                        type: UPDATE_ITEM_OUTPUT,
                        payload: null
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}

export const deleteItemBaoGia = (params) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}baogia/delete`, params)
                .then((response) => {
                    let { data } = response.data
                    dispatch({
                        type: DELETE_ITEM_OUTPUT,
                        payload: {
                            itemDetail: {}
                        }
                    })
                    dispatch(getListDataBaoGia())
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
            type: UPDATE_INPUT_DATA_PRICE,
            payload: {
                objDataBaoGia: obj
            }
        })
    }
}
export const isEditBaoGia = (value) => {
    return (dispatch) => {
        dispatch({
            type: IS_EDIT_BAOGIA,
            payload: {
                isDetail: value
            }
        })
    }
}
export const addListProductByBaoGia = (ListProduct_temp) => {
    return (dispatch, getState) => {
        let { objDataBaoGia } = getState().baogia
        let data_temp = []
        data_temp = ListProduct_temp.map((item, i) => {
            item.Pricecode = objDataBaoGia.Pricecode
            return item
        })

        return new Promise((resolve, reject) => {
            Promise.all([
                // axios.post(`${Config.API_URL_USER}order/delete_products_by_order`, { IdOrder: objDataBaoGia.IdOrder }),
                axios.post(`${Config.API_URL_USER}output/add_list_products`, { data: data_temp, Pricecode: objDataBaoGia.Pricecode, IdOrder: objDataBaoGia.IdOrder })                    // axios.post(`${Config.API_URL_USER}products/add_list_casting`, { data: data_temp2 })
            ])
                .then((response) => {
                    dispatch({
                        type: ADD_LIST_PRODUCTS_BY_OUTPUT,
                        payload: null
                    })
                    resolve(response)
                })
        }, (err) => {
            reject(err)
        })

    }
}

export const getListDataBySearch = (value) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}baogia/search`, { params: { page: 1, total: 10, key: value } })
                .then((response) => {
                    let { data } = response.data
                    let data_temp = data
                    data_temp.map(item => item.checked = false)
                    dispatch({
                        type: GET_LIST_BAO_GIA,
                        payload: {
                            list_data: data_temp || [],
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
export const getListDataProductInBaoGiaBySearch = (key = '') => {
    return (dispatch, getState) => {
        let { objDataBaoGia } = getState().baogia

        return new Promise((resolve, reject) => {
            Promise.all([
                axios.get(`${Config.API_URL_USER}baogia/get_list_products_search`, { params: { page: 1, total: 50, key: key, Pricecode: objDataBaoGia.Pricecode } }),
            ])
                .then((response) => {
                    let { data } = response[0].data
                    let data_temp = _.clone(data, true)
                    data_temp.map(item => item.checked = false)
                    let totalRows = data_temp && data_temp[0] && data_temp[0].totalRows
                    dispatch({
                        type: GET_LIST_PRODUCT_IN_BAOGIA,
                        payload: {
                            listProductsInProduct: data_temp || [],
                            ListProductByOrderInOutPut: []
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
export const getListDataProductInBaoGia = (params = { page: 1, total: 10 }) => {
    return (dispatch, getState) => {
        let { page, total, itemDetail, objDataBaoGia, isShowProduct } = getState().baogia
        let { Pricecode } = objDataBaoGia
        let { status } = getState().toolbar
        let type = status == 'ADD' ? 1 : 0
        let pageParams = {
            page: page,
            total: total
        }
        return new Promise((resolve, reject) => {
            Promise.all([
                axios.get(`${Config.API_URL_USER}baogia/get_list_products`, { params: { page: params.page, total: params.total, Pricecode: Pricecode } })
            ])
                .then((response) => {
                    let { data } = response[0].data
                    let data_temp = _.clone(data, true)
                    data_temp.map(item => item.checked = false)
                    if (itemDetail.IdOrder) {
                        data_temp = data_temp.filter(x => x.IdOrder == itemDetail.IdOrder)
                        data_temp.map(item => item.checked = true)
                    }
                    let totalRows = data_temp && data_temp[0] && data_temp[0].totalRows
                    dispatch({
                        type: GET_LIST_PRODUCT_IN_BAOGIA,
                        payload: {
                            listProductsInProduct: data_temp || [],
                            ListProductByOrderInOutPut: [],
                            isShowProduct: status == 'EDIT' ? true : isShowProduct
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

export const resetDataBaoGia = () => {
    return (dispatch) => {
        dispatch({
            type: RESET_DATA_BAOGIA,
            payload: null
        })
    }
}
export const getNumberAutoBaoGia = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}baogia/get_auto_number`)
                .then((response) => {
                    let { data } = response.data
                    let { objDataBaoGia } = getState().baogia
                    objDataBaoGia["Pricecode"] = (data && data[0].value || '0000000')
                    dispatch({
                        type: GENERATE_NUMBER_ID_OUTPUT,
                        payload: {
                            objDataBaoGia: objDataBaoGia
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
