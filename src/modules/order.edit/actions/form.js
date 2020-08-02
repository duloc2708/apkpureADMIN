import {
    ADD_NEW_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM_PRODUCTS,
    CLICK_ROW_DATA_ORDER,
    CHECK_ALL_ROW,
    DELETE_ITEM_PRODUCTS_ALL,
    ARRAY_ITEM_TAB_STONE,
    UPDATE_NUMBER_STONE_BY_ID,
    GET_OTHER_PRODUCTS,
    UPDATE_INPUT_DATA,
    IS_EDIT,
    ADD_LIST_CASTING,
    ADD_LIST_STONE,
    GET_LIST_CASTING_BY_PRODUCTS,
    GET_LIST_STONE_BY_PRODUCTS,
    ARRAY_ITEM_TAB_CASTING,
    UPDATE_ITEM_PRODUCT,
    REMOVE_ITEM_STONE,
    REMOVE_ITEM_CASTING,
    UPDATE_NUMBER_CASTING_BY_ID,
    RESET_DATA_ORDER,
    CHANGE_PAGE_TABLE,
    GET_LIST_CUSTOMER,
    SELECT_CUSTOMER,
    GET_LIST_PRODUCTS_BY_PRICE,
    ARRAY_ITEM_PRODUCTS,
    UPDATE_CELL_INPUT_BY_ID,
    GET_LIST_PRODUCT_BY_ORDER,
    GENERATE_NUMBER_ID_ORDER,
    ADD_LIST_PRODUCTS_BY_ORDER,
    ACCEPT_ORDER,
    GET_LIST_BAG_BY_ORDRER,
    GET_SET_PRODUCTS,
    SHOW_STONE,
    GET_LIST_STONE_BY_ORDER,
    CLICK_ROW_DATA_BAG,
    GET_LIS_SALE_PRICE,
    UPDATE_EXISTS_PRODUCT,
    CHECK_EXISTS_BAG_OUTPUT,
    UPDATE_DYNAMIC_COMBOBOX_ORDER,
    GET_LIST_BAO_GIA_IN_ORDER
} from '../types'
import { GET_LIST_BAG } from '../../bag/types';
import { updateButtonToolbar } from 'modules/toolbar/actions/form'
import { updateInfoPage, resetInfoPage } from 'modules/common/actions/form'
export const acceptStatusMold = (id) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}order/accept_status_mold`, { IdOrder: id })
                .then((response) => {
                    let { data } = response.data
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListDataBaoGiaInOrder = (params = { page: 1, total: 50 }) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}baogia`, { params: { page: params.page, total: params.total } })
                .then((response) => {
                    let { data } = response.data
                    let data_temp = _.clone(data, true)
                    data_temp.map(item => item.checked = false)
                    dispatch({
                        type: GET_LIST_BAO_GIA_IN_ORDER,
                        payload: {
                            list_data_baogia: data_temp || []
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const updateDynamicCombobox = (code, value, params) => {
    return (dispatch, getState) => new Promise((resolve, reject) => {
        const { objDataOrder } = getState().order
        let objDataOrderTemp = _.clone(objDataOrder, true)
        objDataOrderTemp[code] = value
        switch (code) {
            case "CodeLH":
                objDataOrderTemp["ValueLH"] = params
                break;
            case "CodeLAI":
                objDataOrderTemp["ValueLAI"] = params
                break;
            case "CodeLV":
                objDataOrderTemp["ValueLV"] = params
                break;
            case "CodeMX":
                objDataOrderTemp["ValueMX"] = params
                break;
            default:
                break;
        }
        dispatch({
            type: UPDATE_DYNAMIC_COMBOBOX_ORDER,
            payload: {
                objDataOrder: objDataOrderTemp
            }
        })
        // setTimeout(() => {
        //     const { list_products_by_baogia } = getState().order
        //     if (code == 'CodeBaoGia' && list_products_by_baogia.length == 0) {
        //         dispatch(getListProductsByPrice(value))
        //     }
        // }, 1000);
    })
}

export const updatePriceOrder = (IdOrder) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}order/update_price_order`, { params: { IdOrder: IdOrder } })
                .then((response) => {
                    let { data } = response.data
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}

export const checkExistOutPutAndBag = (IdOrder) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}order/check_exists_output_bag`, { params: { IdOrder: IdOrder } })
                .then((response) => {
                    let { data } = response.data
                    dispatch({
                        type: CHECK_EXISTS_BAG_OUTPUT,
                        payload: {
                            isEditProducts: data.value == 1 ? 'block' : ''
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}

export const addProduct = () => {
    return (dispatch, getState) => {
        let { listProductsSelected, default_product } = getState().order
        let default_product_temp = _.clone(default_product)
        let listProductsSelected_temp = _.clone(listProductsSelected)
        default_product_temp.index = listProductsSelected_temp.length + 1
        // default_product_temp.stt = index
        listProductsSelected_temp.push(default_product_temp)
        let sort_data = _.orderBy(listProductsSelected_temp, 'index', 'asc')
        dispatch({
            type: ADD_NEW_ITEM,
            payload: {
                listProductsSelected: sort_data
            }
        })
    }
}
export const addExistProduct = (IdProductParent = '') => {
    return (dispatch, getState) => {
        let { listProductsSelected, default_product } = getState().order
        let default_product_temp = _.clone(default_product)
        let listProductsSelected_temp = _.clone(listProductsSelected)
        default_product_temp.index = listProductsSelected_temp.length + 1
        default_product_temp.value = IdProductParent
        // default_product_temp.stt = index
        listProductsSelected_temp.push(default_product_temp)
        let sort_data = _.orderBy(listProductsSelected_temp, 'index', 'asc')
        dispatch({
            type: ADD_NEW_ITEM,
            payload: {
                listProductsSelected: sort_data
            }
        })
    }
}
export const updateExistProduct = (itemProduct) => {
    return (dispatch, getState) => {
        let { listProductsSelected, list_products } = getState().order
        let listProductsSelected_temp = _.clone(listProductsSelected, true)
        let listProductsConvert = []
        listProductsSelected_temp.map((item, i) => {
            let item_temp = _.clone(item, true)
            let itemProducts = _.clone(itemProduct, true)
            itemProducts.isExists = true
            if (item_temp.value.toUpperCase() == itemProduct.value.toUpperCase() && item_temp.stt == 0) {
                itemProducts.index = item_temp.index
                itemProducts.stt = itemProducts.value + '_' + itemProducts.index
                listProductsConvert.push(itemProducts)
            } else {
                listProductsConvert.push(item_temp)
            }
        })
        dispatch({
            type: UPDATE_EXISTS_PRODUCT,
            payload: {
                listProductsSelected: listProductsConvert
            }
        })
    }
}

export const getListPriceByPriceCode = (PriceCode) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}baogia/get_list_products`, { params: { page: 1, total: 500000, PriceCode: PriceCode } })
                .then((response) => {
                    let { data } = response.data
                    let { list_products } = getState().order
                    dispatch({
                        type: GET_LIS_SALE_PRICE,
                        payload: {
                            listSalePrice: data,
                            list_products: data.length > 0 ? data : list_products
                        }
                    })

                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}

export const clickCheckAllRowBag = (checked) => {
    return (dispatch, getState) => {
        let { listBagSelected } = getState().order
        var list_temp = _.clone(listBagSelected, true);
        list_temp.map((item, i) => {
            item.checked = checked
            return item
        })
        dispatch({
            type: CLICK_ROW_DATA_BAG,
            payload: {
                allChecked: checked,
                listBagSelected: list_temp
            }
        })
    }
}

export const clickCheckRowBag = (value, checked) => {
    return (dispatch, getState) => {
        let { listBagSelected } = getState().order
        let listBagSelected_temp = _.clone(listBagSelected, true)
        var list_temp = _.clone(listBagSelected, true);
        list_temp.map((item, i) => {
            // item.checked = false
            if (item.IdBag == value.IdBag) {
                item.checked = checked
            }
            return item
        })
        if (checked) {
            listBagSelected_temp.push(value)
        } else {
            listBagSelected_temp = listBagSelected_temp.filter(x => x.Id != value.Id)
        }

        dispatch({
            type: CLICK_ROW_DATA_BAG,
            payload: {
                listBagSelected: list_temp
            }
        })
    }
}

export const getListProductByOrder = () => {
    return (dispatch, getState) => {
        let { objDataOrder, listProductsSelected } = getState().order
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}order/get_list_product_by_order2`, { params: { IdOrder: objDataOrder.IdOrder } })
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
                    data_temp.map((item, i) => {
                        item.index = i + 1
                        item.stt = item.value + '_' + i
                        item.list_set = []
                        item.isExists = true
                    })
                    dispatch({
                        type: GET_LIST_PRODUCT_BY_ORDER,
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
export const getListProductByOrderReport = (objDataOrder) => {
    return (dispatch, getState) => {
        let { listProductsSelected } = getState().order
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}order/get_list_product_by_order`, { params: { IdOrder: objDataOrder.IdOrder } })
                .then((response) => {
                    let { data } = response.data
                    // let listProductsSelected_temp = _.clone(listProductsSelected, true);
                    // let data_temp = data
                    // // map data
                    // if (listProductsSelected_temp.length > 0) {
                    //     listProductsSelected_temp.map((item, i) => {
                    //         let check = data_temp.filter(x => x.value == item.value)
                    //         if (check.length == 0) {
                    //             data_temp.push(item)
                    //         }
                    //     })
                    // }
                    // data_temp.map((item, i) => {
                    //     item.stt = item.value + '_' + i
                    //     item.list_set = []
                    // })
                    // dispatch({
                    //     type: GET_LIST_PRODUCT_BY_ORDER,
                    //     payload: {
                    //         listProductsSelected: data_temp
                    //     }
                    // })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getSetProduct = (IdProduct) => {
    return (dispatch, getState) => {
        let { listProductsSelected } = getState().order
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}order/get_products_set`, { params: { IdProduct: IdProduct } })
                .then((response) => {
                    let { data } = response.data
                    let data_temp = listProductsSelected
                    data_temp.map((item, i) => {
                        item.list_set = data
                    })
                    dispatch({
                        type: GET_SET_PRODUCTS,
                        payload: {
                            listProductsSelected: data_temp
                        }
                    })
                }, (err) => {

                })
        })
    }
}
export const getListProductsByPrice = (value) => {
    return (dispatch, getState) => {
        let { default_product, objDataOrder, toolbar } = getState().order
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}order/products`, { params: { page: 0, total: 0, PriceCode: value } })
                .then((response) => {
                    let { data } = response.data
                    let list_data = [], data_temp_convert = []
                    data.map((item, i) => {
                        list_data.push({
                            Id: item.Id, Name: item.Id, Price: item.Price
                            , Image: item.Image, IdOdd: item.IdOdd
                            , Weight: item.Weight
                            , WeightReal: item.WeightReal
                            , CodeCLSP: item.CodeCLSP
                            , NameCLSP: item.NameCLSP
                        })
                    })

                    setTimeout(() => {
                        list_data.map((item) => {
                            let data_temp = _.clone(default_product, true);
                            data_temp["NameCLSP"] = item.NameCLSP
                            data_temp["CodeCLSP"] = item.CodeCLSP
                            data_temp["value"] = item.Id
                            data_temp["label"] = item.Name
                            data_temp["price"] = Helper.roundNumberPerThousand(parseFloat(item.Price)) * ((100 - parseFloat(objDataOrder.discount || 0)) / 100)
                            data_temp["price_basic"] = Helper.roundNumberPerThousand(parseFloat(item.Price))
                            data_temp["sum"] = 0
                            data_temp["sum_basic"] = 0
                            data_temp["url_image"] = item.Image
                            data_temp["IdOdd"] = item.IdOdd
                            data_temp["Weight"] = item.Weight
                            data_temp["WeightReal"] = item.WeightReal
                            data_temp["discount"] = objDataOrder.discount || 0
                            data_temp_convert.push(data_temp)
                        })
                    }, 100)

                    // Khơi tạo dòng đầu tiên cho báo giá
                    let { objDataOrder, default_product, listProductsSelected } = getState().order
                    let default_product_temp = _.clone(default_product, true)
                    let listProductsSelected_clone = []
                    default_product_temp.index = 1
                    if (value) {
                        listProductsSelected_clone.push(default_product_temp)
                    }
                    let { status } = getState().toolbar
                    if (status == 'EDIT') {
                        dispatch({
                            type: GET_LIST_PRODUCTS_BY_PRICE,
                            payload: {
                                list_products: data_temp_convert || [],
                                list_products_by_baogia: data_temp_convert || []
                            }
                        })
                    } else {
                        dispatch({
                            type: GET_LIST_PRODUCTS_BY_PRICE,
                            payload: {
                                list_products: data_temp_convert || [],
                                list_products_by_baogia: data_temp_convert || [],
                                listProductsSelected: listProductsSelected_clone
                            }
                        })
                    }

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
            axios.get(`${Config.API_URL_USER}customer`, { params: { page: 1, total: 50000 } })
                .then((response) => {
                    let { data } = response
                    dispatch({
                        type: GET_LIST_CUSTOMER,
                        payload: {
                            listCustomer: data || []
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


export const removeItemStone = (obj) => {
    return (dispatch, getState) => {
        let { listProductsSelected } = getState().order
        let temp = _.clone(listProductsSelected, true);
        temp = temp.filter(x => x.index !== obj.index)
        dispatch({
            type: REMOVE_ITEM_STONE,
            payload: {
                listProductsSelected: temp
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

export const selectCustomer = (value) => {
    return (dispatch, getState) => {
        let { objDataOrder } = getState().order
        let { status } = getState().toolbar
        let objDataOrder_temp = _.clone(objDataOrder, true)
        let { value: valueCode, name, Discount } = value || {}
        objDataOrder_temp["IdCustomer"] = valueCode
        objDataOrder_temp["CodeKH"] = valueCode
        objDataOrder_temp["NameKH"] = name
        objDataOrder_temp["CodeLH"] = ""
        objDataOrder_temp["CodeMX"] = ""
        objDataOrder_temp["CodeLV"] = ""
        objDataOrder_temp["CodeLAI"] = ""
        objDataOrder_temp["discount"] = Discount || 0
        // if(value!=objDataOrder_temp.IdCustomer){

        // }

        dispatch({
            type: SELECT_CUSTOMER,
            payload: {
                namecustomer: name,
                objDataOrder: objDataOrder_temp,
                discount: Discount || 0
            }
        })
        if (status == 'ADD') {
            dispatch(getNumberAutoOrder(valueCode))
        }
    }
}
export const selectProducts = (objDataOrder) => {
    return (dispatch, getState) => {
        let { listProductsSelected } = getState().order
        let objOrder = getState().order.objDataOrder
        let temp = _.clone(listProductsSelected, true);
        if (objDataOrder.IdOdd == "1") {
            axios.get(`${Config.API_URL_USER}order/get_products_set`, { params: { IdProduct: objDataOrder.label } })
                .then((response) => {
                    let { data } = response.data
                    objDataOrder["list_set"] = data || []
                    objDataOrder["color"] = '005' // default khởi tao màu trắng
                    temp.push(objDataOrder)
                    temp.map((item, i) => {
                        let item_temp = _.clone(item, true)
                        item.price_basic = parseInt(item_temp.price)
                        item.price = Helper.roundNumberPerThousand(parseInt(item_temp.price) * ((100 - parseFloat(objOrder.discount || 0)) / 100))
                        item.stt = item_temp.value + '_' + i
                        item.sum = item.price * item_temp.sl
                        item.sum_basic = item.price_basic * item.sl
                        item.Weight = objDataOrder.Weight
                        item.WeightReal = objDataOrder.WeightReal
                        item.discount = objOrder.discount
                    })

                    dispatch({
                        type: ARRAY_ITEM_PRODUCTS,
                        payload: {
                            listProductsSelected: temp
                        }
                    })
                }, (err) => {
                })
        } else {
            objDataOrder["color"] = '005' // default khởi tao màu trắng
            temp.push(objDataOrder)
            temp.map((item, i) => {
                let item_temp = _.clone(item, true)
                item.price_basic = parseInt(item_temp.price)
                item.price = Helper.roundNumberPerThousand(parseInt(item_temp.price) * ((100 - parseFloat(objOrder.discount || 0)) / 100))
                item.stt = item_temp.value + '_' + i
                item.sum = item.price * item_temp.sl
                item.sum_basic = item.price_basic * item.sl
                item.Weight = objDataOrder.Weight
                item.WeightReal = objDataOrder.WeightReal
                item.discount = objOrder.discount
            })
            dispatch({
                type: ARRAY_ITEM_PRODUCTS,
                payload: {
                    listProductsSelected: temp
                }
            })
        }

    }
}

export const clickCheckRowTabCasting = (objDataOrder) => {
    return (dispatch, getState) => {
        let { listCastingSelected } = getState().products
        let temp = _.clone(listCastingSelected, true);
        let check = temp.filter(x => x.value == objDataOrder.value);
        if (!check || check.length == 0) {
            temp.push(objDataOrder)
            dispatch({
                type: ARRAY_ITEM_TAB_CASTING,
                payload: {
                    listCastingSelected: temp
                }
            })
        }
    }
}
export const getListCastingByProducts = () => {
    return (dispatch, getState) => {
        let { objDataOrder, listCastingSelected } = getState().products
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}products/get_list_casting`, { IdProduct: objDataOrder.Id })
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
                            listCastingSelected: data_temp
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListStoneByOrder = (item) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}order/get_list_stone_by_order`, { params: { IdOrder: item.IdOrder } })
                .then((response) => {
                    let { data } = response.data
                    dispatch({
                        type: GET_LIST_STONE_BY_ORDER,
                        payload: {
                            list_stone_by_order: data || [],
                            infoStone: item
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListDataOrderBySearch = (value) => {
    return (dispatch, getState) => {
        let { page, total, endPage } = getState().common
        let pageParams = {
            page: page,
            total: total
        }
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}order/search`, { params: { page: pageParams.page, total: pageParams.total, key: value } })
                .then((response) => {
                    let { data } = response.data
                    let data_temp = data
                    data_temp.map(item => item.checked = false)

                    let totalRows = data_temp && data_temp[0] && data_temp[0].totalRows
                    dispatch(updateInfoPage(totalRows))

                    dispatch({
                        type: GET_OTHER_PRODUCTS,
                        payload: {
                            list_data: data_temp || [],
                            objDataOrder: {}
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const printOrderDetail = (item, type) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch(getListProductByOrderReport(item)).then(res => {
                let listProduct = res.data.data
                axios.post(`${Config.API_URL_USER}bag/print_detail_bag`,
                    { listProduct: listProduct, Info: item, type: type },
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
                        link.setAttribute('download', `Đơn hàng_${item.IdOrder}`); //or any other extension
                        document.body.appendChild(link);
                        link.click();
                        resolve(response)
                    }, (err) => {
                        reject(err)
                    })
            })

        })
    }
}

export const getListDataOrder = (params = { page: 1, total: 50 }) => {
    return (dispatch, getState) => {
        let { page, total } = getState().order
        let pageParams = {
            page: page,
            total: total
        }
        return new Promise((resolve, reject) => {
            Promise.all([
                axios.get(`${Config.API_URL_USER}order`, { params: { page: params.page, total: params.total } }),
                axios.get(`${Config.API_URL_USER}order/get_list_statusorder`)
            ])
                .then((response) => {
                    let { data } = response[0].data
                    let other_list = response[1].data.data
                    let data_temp = _.clone(data, true)
                    data_temp.map(item => item.checked = false)
                    let totalRows = data_temp && data_temp[0] && data_temp[0].totalRows
                    dispatch(resetDataOrder())
                    dispatch({
                        type: GET_OTHER_PRODUCTS,
                        payload: {
                            list_data: data_temp || [],
                            isDetail: false,
                            itemDetail: '',
                            list_status_order: other_list || []
                        }
                    })
                    dispatch(updateInfoPage(totalRows))
                    dispatch(updateButtonToolbar(''))
                    resolve(response)
                })
        }, (err) => {
            reject(err)
        })
        // return new Promise((resolve, reject) => {
        //     axios.get(`${Config.API_URL_USER}order`, { params: { page: params.page, total: params.total } })
        //         .then((response) => {
        //             let { data } = response.data
        //             let data_temp = _.clone(data, true)
        //             data_temp.map(item => item.checked = false)
        //             dispatch(resetDataOrder())
        //             dispatch({
        //                 type: GET_OTHER_PRODUCTS,
        //                 payload: {
        //                     list_data: data_temp || [],
        //                     isDetail: false,
        //                     itemDetail: '',
        //                 }
        //             })
        //             dispatch(updateButtonToolbar(''))
        //             dispatch(ChangePage(pageParams.page))
        //             resolve(response)
        //         }, (err) => {
        //             reject(err)
        //         })
        // })
    }
}
export const clickCheckRowOrder = (value, checked) => {
    return (dispatch, getState) => {
        let { list_data } = getState().order
        var list_temp = _.clone(list_data, true);
        list_temp.map((item, i) => {
            item.checked = false
            if (item.IdOrder == value.IdOrder) {
                item.checked = checked
            }
            return item
        })
        let itemDetailTemp = {
            IdOrder: ''
            , IdCustomer: ''
            , Deadline: ''
            , StartWeek: ''
            , FinishWeek: ''
            , TotalFinish: 0
            , TotalBags: 0
            , IdCreater: ''
            , DayMake: moment(new Date(), 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
            , Status: ''
            , Remark: ''
            , StatusOrder: 'STATUS_ORDER_01'
            , StatusBag: ''
            , StatusTransfer: ''
            , CodeKH: ''
            , NameKH: ''
            , CodeLH: ''
            , CodeLV: ''
            , CodeMX: ''
            , CodeLAI: ''
            , remark: ''
        }
        if (checked) {
            itemDetailTemp = value
        }
        dispatch({
            type: CLICK_ROW_DATA_ORDER,
            payload: {
                list_data: list_temp,
                itemDetail: value,
                objDataOrder: itemDetailTemp
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

export const updateCellProducts = (obj) => {
    return (dispatch, getState) => {
        let { listProductsSelected } = getState().order
        let temp = _.clone(listProductsSelected, true);
        temp.map((item, i) => {
            if (item.index == obj.id) {
                item[obj.key] = obj.value
                item["Image"] = obj.Image
                if (obj.key == 'sl') {
                    item["sum"] = (parseFloat(item.price)) * parseFloat(obj.value)
                    item["sum_basic"] = (parseFloat(item.price_basic)) * parseFloat(obj.value)
                }
                if (obj.key == 'price') {
                    item["sum"] = (parseFloat(obj.value)) * parseFloat(item.sl)
                }
                if (obj.key == 'price_basic') {
                    item["sum_basic"] = (parseFloat(obj.value)) * parseFloat(item.sl)
                }
            }
            return item
        })
        dispatch({
            type: UPDATE_CELL_INPUT_BY_ID,
            payload: {
                listProductsSelected: temp
            }
        })
    }
}

export const addNewItemOrder = () => {
    return (dispatch, getState) => {
        let { objDataOrder } = getState().order
        if (objDataOrder.IdCustomer && objDataOrder.IdCustomer.indexOf(",") > -1) {
            alert('Mã đã hơn đã tồn tại !')
        } else {
            return new Promise((resolve, reject) => {
                axios.post(`${Config.API_URL_USER}order/add`, objDataOrder)
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
}
export const updateItemOrder = () => {
    return (dispatch, getState) => {
        let { objDataOrder } = getState().order
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}order/update`, objDataOrder)
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
export const deleteItemOrder = (params) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}order/delete`, params)
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
export const onViewStone = (value) => {
    return (dispatch, getState) => {
        dispatch({
            type: SHOW_STONE,
            payload: {
                isShowStone: value,
                infoStone: {}
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
                objDataOrder: obj
            }
        })
    }
}
export const isEditOrder = (value) => {
    return (dispatch) => {
        dispatch({
            type: IS_EDIT,
            payload: {
                isDetail: value
            }
        })
        dispatch(getListDataBaoGiaInOrder({
            page: 1,
            total: 5000
        }))
    }
}
export const addListProductByOrder = () => {
    return (dispatch, getState) => {
        let { listProductsSelected } = getState().order
        let { objDataOrder } = getState().order
        let data_temp = []
        if (objDataOrder.IdOrder) {
            data_temp = listProductsSelected.map((item, i) => {
                item.IdOrder = objDataOrder.IdOrder
                return item
            })
            return new Promise((resolve, reject) => {
                Promise.all([
                    // axios.post(`${Config.API_URL_USER}order/delete_products_by_order`, { IdOrder: objDataOrder.IdOrder }),
                    axios.post(`${Config.API_URL_USER}order/add_list_products`, { data: data_temp, IdOrder: objDataOrder.IdOrder })                    // axios.post(`${Config.API_URL_USER}products/add_list_casting`, { data: data_temp2 })
                ])
                    .then((response) => {
                        dispatch({
                            type: ADD_LIST_PRODUCTS_BY_ORDER,
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
                type: ADD_LIST_PRODUCTS_BY_ORDER,
                payload: null
            })
        }

    }
}
export const addListCasting = () => {
    return (dispatch, getState) => {
        let { listCastingSelected } = getState().products
        let { objDataOrder } = getState().products
        let data_temp = []
        if (objDataOrder.Id && listCastingSelected.length > 0) {
            listCastingSelected.map((item, i) => {
                data_temp.push({
                    IdProduct: objDataOrder.Id,
                    IdCasting: item.value,
                    Qty: item.sl
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
export const resetDataOrder = () => {
    return (dispatch, getState) => new Promise((resolve, reject) => {
        dispatch({
            type: RESET_DATA_ORDER,
            payload: null
        })
        resolve(RESET_DATA_ORDER)
    })
}
export const getNumberAutoOrder = (IdCustomer) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}order/get_auto_number`)
                .then((response) => {
                    let { data } = response.data
                    let { objDataOrder, default_product, listProductsSelected } = getState().order
                    let default_product_temp = _.clone(default_product, true)
                    let objDataOrder_temp = _.clone(objDataOrder, true)
                    let numberGen = (data && data[0].value || '0000000') + '-' + (IdCustomer || objDataOrder_temp.IdCustomer)
                    objDataOrder_temp["IdOrder"] = numberGen
                    dispatch({
                        type: GENERATE_NUMBER_ID_ORDER,
                        payload: {
                            objDataOrder: objDataOrder_temp,
                            IdOrderTemp: numberGen
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}

export const acceptOrder = (id, value) => {
    return (dispatch, getState) => {
        let { objDataOrder, list_data, list_status_order } = getState().order
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}order/accept_order`, { IdOrder: id, Value: value })
                .then((response) => {
                    let { data } = response.data
                    if (data.value != 2 && data.value != 3) {
                        let objDataOrder_temp = _.clone(objDataOrder, true)
                        objDataOrder_temp["StatusOrder"] = value
                        let data_temp = _.clone(list_data, true)
                        data_temp.map((item, i) => {
                            if (item.IdOrder == id) {
                                list_status_order.map((itemStatus) => {
                                    if (itemStatus.code == value) {
                                        item.StatusOrder = value
                                        item.StatusOrderName = itemStatus.name
                                    }
                                })
                            }
                            return item
                        })
                        dispatch({
                            type: ACCEPT_ORDER,
                            payload: {
                                objDataOrder: objDataOrder_temp,
                                list_data: data_temp
                            }
                        })
                    }
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListBagByOrder = () => {
    return (dispatch, getState) => {
        let { objDataOrder } = getState().order
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}order/get_list_bag_order`, { params: { IdOrder: objDataOrder.IdOrder } })
                .then((response) => {
                    let { data } = response.data
                    let data_temp = data
                    data_temp.map(item => item.checked = false)
                    dispatch({
                        type: GET_LIST_BAG_BY_ORDRER,
                        payload: {
                            listBagSelected: data_temp
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getDataByCodeByCustomer = (type, codeKH) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const { objDataOrder, IdOrderTemp } = getState().order
                axios.get(`${Config.API_URL_USER}order/list_combobox_by_code_customer`, { params: { type: type, codeKH: codeKH } })
                    .then((response) => {
                        let { data } = response.data
                        resolve(response)
                    }, (err) => {
                        reject(err)
                    })
            }, 0)

        })
    }
}