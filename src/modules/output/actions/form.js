import {
    ADD_NEW_ITEM_OUTPUT,
    UPDATE_ITEM,
    DELETE_ITEM_OUTPUT,
    CLICK_ROW_DATA_OUTPUT,
    CHECK_ALL_ROW,
    DELETE_ITEM_OUTPUT_ALL,
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
    UPDATE_ITEM_OUTPUT,
    REMOVE_ITEM_OUTPUT,
    REMOVE_ITEM_CASTING,
    UPDATE_NUMBER_CASTING_BY_ID,
    RESET_DATA_OUTPUT,
    CHANGE_PAGE_TABLE,
    GET_LIST_CUSTOMER,
    SELECT_CUSTOMER_IN_OUTPUT,
    GET_LIST_PRODUCTS,
    ARRAY_ITEM_PRODUCTS,
    UPDATE_CELL_INPUT_BY_ID,
    GET_LIST_PRODUCT_BY_ORDER_IN_OUTPUT,
    GENERATE_NUMBER_ID_OUTPUT,
    ADD_LIST_PRODUCTS_BY_OUTPUT,
    ACCEPT_ORDER,
    GET_LIST_BAG_BY_ORDRER,
    IS_EDIT_OUTPUT,
    GET_LIST_PRODUCTS_BY_ORDER_OUTPUT,
    SELECTED_ORDER_OUTPUT,
    GET_LIST_OUTPUT,
    GET_LIST_ORDER_IN_OUTPUT,
    CLICK_ROW_DATA_ORDER_IN_OUT_OUT,
    GET_LIST_BAG_BY_ORDER_PRODUCT,
    CLOSE_MODAL_PRODUCT,
    UPDATE_EXISTS_PRODUCT_OUTPUT,
    UPDATE_STATUS_COMPLETED_ORDER,
    UPDATE_ITEM_LOADPAGE,
    LOADING_SAVE_OUTPUT,
    GET_LIST_WORKER_OUTPUT
} from '../types'
import { GET_LIST_BAG } from '../../bag/types';
import { updateInfoPage, resetInfoPage } from 'modules/common/actions/form'
let oldUserInfo = SportConfig._getCookie('userInfo')
try {
    oldUserInfo = JSON.parse(SportConfig.function._base64.decode(oldUserInfo))
} catch (e) {
    oldUserInfo = null
}
let username = oldUserInfo && oldUserInfo.user_name || ''
export const getDataWoker = (tableName) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}common/list_combobox_by_table`, { params: { tableName: tableName } })
                .then((response) => {
                    let { data } = response.data
                    let data_temp = []
                    data.map((item, i) => {
                        data_temp.push(item)
                    })
                    dispatch({
                        type: GET_LIST_WORKER_OUTPUT,
                        payload: {
                            list_worker: data_temp
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const loadingSaveOutput = (value) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: LOADING_SAVE_OUTPUT,
                payload: {
                    isLoadingOutput: value
                }
            })
            resolve(LOADING_SAVE_OUTPUT)
        })

    }
}


export const UpdateProductWeightReal = (IdOutput) => {

    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}output/update_product_weight_real`, { params: { IdOutput: IdOutput } })
                .then((response) => {
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}

export const updateItemPageLoad = (value) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: UPDATE_ITEM_LOADPAGE,
                payload: {
                    pageLoad: value
                }
            })
            resolve(UPDATE_ITEM_LOADPAGE)
        })

    }
}



export const validateOutput = (IdOrder) => {
    return (dispatch, getState) => {
        dispatch(loadingSaveOutput(true))
        const { objDataOutput } = getState().output
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}output/get_list_output_by_order`, { params: { IdOrder: IdOrder, IdOutput: objDataOutput.IdOutput } })
                .then((response) => {
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const acceptOutput = (id, value) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}output/accept_output`, { IdOutput: id, Value: value })
                .then((response) => {
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const updatePriceOutput = (IdOrder, IdOutput) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}output/update_price_output`, { params: { IdOrder: IdOrder, IdOutput: IdOutput } })
                .then((response) => {
                    let { data } = response.data
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}

export const acceptOrderCompleted = (id, value) => {
    return (dispatch, getState) => {
        const { list_order_in_output } = getState().output
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}order/accept_order`, { IdOrder: id, Value: value })
                .then((response) => {
                    let { data } = response.data
                    let dataTemp = []
                    list_order_in_output.map(item => {
                        if (item.IdOrder == id) {
                            item.StatusOrder = value
                        } else {
                            dataTemp.push(item)
                        }
                    })
                    dispatch({
                        type: UPDATE_STATUS_COMPLETED_ORDER,
                        payload: {
                            list_order_in_output: dataTemp
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const closeModalProduct = (value) => {
    return (dispatch, getState) => {
        dispatch({
            type: CLOSE_MODAL_PRODUCT,
            payload: {
                isShowProduct: value
            }
        })
    }
}
export const getListProductByOrderInOutput = () => {
    return (dispatch, getState) => {
        let { objDataOutput } = getState().output
        if (objDataOutput.IdOutput) {
            return new Promise((resolve, reject) => {
                axios.get(`${Config.API_URL_USER}output/get_list_product_by_order`, { params: { IdOutput: objDataOutput.IdOutput } })
                    .then((response) => {
                        let { data } = response.data
                        let data_temp = data
                        data_temp.map((item, i) => {
                            item.index = i + 1
                            item.stt = item.IdProductParent + '_' + item.Color
                            item.sttOther = item.IdProduct + '_' + i
                        })
                        dispatch({
                            type: GET_LIST_PRODUCT_BY_ORDER_IN_OUTPUT,
                            payload: {
                                ListProductByOrderOutput: data_temp
                            }
                        })
                        resolve(response)
                    }, (err) => {
                        reject(err)
                    })
            })
        } else {
            dispatch({
                type: GET_LIST_PRODUCT_BY_ORDER_IN_OUTPUT,
                payload: null
            })
        }

    }
}
export const getListProductByOrderInOutputFull = () => {
    return (dispatch, getState) => {
        let { objDataOutput, ListProductByOrderOutput } = getState().output
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}output/get_list_product_by_order_full`, { params: { IdOutput: objDataOutput.IdOutput } })
                .then((response) => {
                    let { data } = response.data
                    let data_temp = data
                    data_temp.map((item, i) => {
                        item.index = i + 1
                        item.stt = item.IdProductParent + '_' + item.Color
                        item.sttOther = item.IdProduct + '_' + i
                    })
                    dispatch({
                        type: GET_LIST_PRODUCT_BY_ORDER_IN_OUTPUT,
                        payload: {
                            ListProductByOrderOutput: data_temp,
                            isLoadingOutput: false
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
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
                    let { data } = response
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


export const removeItemProductsInOutput = (obj) => {
    return (dispatch, getState) => {
        let { ListProductByOrderOutput } = getState().output
        let temp = _.clone(ListProductByOrderOutput, true);
        temp = temp.filter(x => x.IdGroup !== obj.IdGroup)
        dispatch({
            type: REMOVE_ITEM_OUTPUT,
            payload: {
                ListProductByOrderOutput: temp
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

export const selectCustomerInOutOut = (value) => {
    return (dispatch, getState) => {
        let { objDataOutput } = getState().output
        let objDataOutputTemp = _.clone(objDataOutput, true)
        objDataOutputTemp["IdCustomer"] = value.value
        objDataOutputTemp["CodeKH"] = value.value
        objDataOutputTemp["NameKH"] = value.label
        dispatch({
            type: SELECT_CUSTOMER_IN_OUTPUT,
            payload: {
                namecustomer: value.name,
                objDataOutput: objDataOutputTemp
            }
        })
    }
}
export const selectProducts = (objDataOutput) => {
    return (dispatch, getState) => {
        let { listProductsSelected } = getState().order
        let temp = _.clone(listProductsSelected, true);
        if (objDataOutput.IdOdd == "1") {
            axios.post(`${Config.API_URL_USER}order/get_products_set`, { IdProduct: objDataOutput.label })
                .then((response) => {
                    let { data } = response.data
                    objDataOutput["list_set"] = data || []
                    temp.push(objDataOutput)
                    temp.map((item, i) => {
                        item.stt = item.value + '_' + i
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
            temp.push(objDataOutput)
            temp.map((item, i) => {
                item.stt = item.value + '_' + i
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

export const getListDataOutPutBySearch = (value) => {
    return (dispatch, getState) => {
        let { page, total, endPage } = getState().common
        let pageParams = {
            page: page,
            total: total
        }
        let saleman = ''
        if (username && username.toUpperCase().indexOf('SALE') != -1) {
            saleman = username
        }
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}output/search`, { params: { page: pageParams.page, total: pageParams.total, key: value, saleman: saleman } })
                .then((response) => {
                    let { data } = response.data
                    let data_temp = data
                    data_temp.map(item => item.checked = false)
                    let totalRows = data_temp && data_temp[0] && data_temp[0].totalRows
                    dispatch(updateInfoPage(totalRows))
                    dispatch({
                        type: GET_LIST_OUTPUT,
                        payload: {
                            list_data: data_temp || []
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const printOuputDetail = (itemDetail, type) => {
    return (dispatch, getState) => {
        let { ListProductByOrderOutput, list_data } = getState().output
        let listId = ''
        let data = []
        let idreport = Helper.generateUUIDV4()
        let stringFile = ''
        let strPrefix = 'Xuất hàng_'
        if (type == 'type4') {
            strPrefix = 'In tem_'
        }

        list_data.map((item) => {
            if (item.checked) {
                data.push({ idreport: idreport, idoutput: item.IdOutput })
                listId = listId + item.IdOutput + ','
                stringFile = stringFile + item.IdOutput + '_'
            }
        })
        if (listId) {
            listId = listId.substr(0, listId.length - 1)
            stringFile = stringFile.substr(0, stringFile.length - 1) + '_' + itemDetail.IdOrder.substr(7, itemDetail.IdOrder.length - 6)
        } else {
            listId = itemDetail.IdOutput
            stringFile = strPrefix + itemDetail.IdOrder
        }

        if (data.length == 0) {
            data.push({ idreport: idreport, idoutput: itemDetail.IdOutput })
        }
        if (data.length <= 1) {
            stringFile = strPrefix + itemDetail.IdOrder
        }
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}ouput/print_detail_output`,
                { idreport: idreport, data: data, Info: itemDetail, type: type },
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
                    if (type == 'type3') {
                        link.setAttribute('download', `PackingList_${itemDetail.IdOrder}.xlsx`); //or any other extension
                    }
                    else {
                        link.setAttribute('download', stringFile + '.xlsx'); //or any other extension
                    }

                    document.body.appendChild(link);
                    link.click();
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListDataOutPut = (params = { page: 1, total: 50 }) => {
    return (dispatch, getState) => {
        let { page, total } = getState().output
        let pageParams = {
            page: page,
            total: total
        }
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}output`, { params: { page: params.page, total: params.total } })
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
                    dispatch(resetDataOutPut())
                    dispatch({
                        type: GET_LIST_OUTPUT,
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
export const clickCheckRowOrder = (value, checked) => {
    return (dispatch, getState) => {
        let { list_data } = getState().output
        let { status } = getState().toolbar
        var list_temp = _.clone(list_data, true);
        list_temp.map((item, i) => {
            // item.checked = false
            if (item.IdOutput == value.IdOutput) {
                item.checked = checked

            }
            // isEditProducts: item.StatusOutput == 'STATUS_OUTPUT_04' ? 'block' : ''  
            // isEditProducts='block'
            return item
        })

        let itemDetailTemp = value
        dispatch({
            type: CLICK_ROW_DATA_OUTPUT,
            payload: {
                list_data: list_temp,
                itemDetail: value,
                objDataOutput: itemDetailTemp,
                isLoadingOutput: true
            }
        })

        setTimeout(() => {
            if (status) {
                if (status == 'EDIT') {
                    dispatch(getListProductByOrderInOutputFull())
                } else {
                    dispatch(getListProductsByOrderOutput(value.IdOrder)).then(res => {
                        dispatch(getListProductsByOrderOutputFull())
                    })
                }
            }
        }, 200)
    }
}
export const addProduct = () => {
    return (dispatch, getState) => {
        let { ListProductByOrderOutput, default_product } = getState().output
        let default_product_temp = _.clone(default_product)
        let ListProductByOrderOutput_temp = _.clone(ListProductByOrderOutput)
        default_product_temp.index = ListProductByOrderOutput_temp.length + 1
        ListProductByOrderOutput_temp.push(default_product_temp)
        let sort_data = _.orderBy(ListProductByOrderOutput_temp, 'index', 'asc')
        dispatch({
            type: ADD_NEW_ITEM_OUTPUT,
            payload: null
        })
    }
}
export const updateExistProduct = (listProduct) => {
    return (dispatch, getState) => {
        let { ListProductByOrderOutput } = getState().output
        let ListProductByOrderOutputTemp = _.clone(ListProductByOrderOutput, true)
        ListProductByOrderOutputTemp = ListProductByOrderOutputTemp.filter((x) => x.stt != 0)
        let data_temp = _.clone(listProduct, true)
        data_temp.map((item, i) => {
            let item_clone = _.clone(item, true)
            item_clone.isExists = true
            item_clone.index = (ListProductByOrderOutput.length) //+ '_' + i
            item_clone.sttOther = item_clone.IdProduct + '_' + (ListProductByOrderOutput.length) + '_' + i
            ListProductByOrderOutputTemp.push(item_clone)
        })
        let sorData = _.orderBy(ListProductByOrderOutputTemp, 'IdGroupStt', 'asc')
        sorData.map((item, i) => {
            item.index = i + 1
            return item
        })
        dispatch({
            type: UPDATE_EXISTS_PRODUCT_OUTPUT,
            payload: {
                ListProductByOrderOutput: sorData
            }
        })
    }
}
export const updateCellProducts = (obj) => {
    return (dispatch, getState) => {
        let { ListProductByOrderOutput } = getState().output
        let temp = _.clone(ListProductByOrderOutput, true);
        temp.map((item, i) => {
            if (item.sttOther == obj.id) {
                item[obj.key] = (obj.value)
            }
            return item
        })
        dispatch({
            type: UPDATE_CELL_INPUT_BY_ID,
            payload: {
                ListProductByOrderOutput: temp
            }
        })
    }
}
export const updateCellProductsByOutput = (obj) => {
    return (dispatch, getState) => {
        let { ListProductByOrderOutput } = getState().output
        let { status } = getState().toolbar
        let temp = _.clone(ListProductByOrderOutput, true);
        temp.map((item, i) => {
            let { NumberTemp, WeightProduct, Weight, WeightPro, WeightRealPro, PerCompare, PerCompareReal } = item
            if (obj.key == "NumberTemp") {
                if (item.IdGroup == obj.IdGroup) {
                    item[obj.key] = parseFloat(obj.value)
                    if (obj.key == 'Weight') {
                        item["WeightAvg"] = parseFloat(obj.value) / parseInt(NumberTemp)
                    }
                    if (obj.key == 'WeightProduct') {
                        item["WeightAvgProduct"] = parseFloat(obj.value) / parseInt(NumberTemp)
                    }
                }

                if (WeightProduct && Weight) {
                    // cập nhật tỷ lệ lệch vàng
                    let perCurrent = (WeightProduct - Weight) / (0.0375 * NumberTemp)
                    let perWeight = WeightPro * 100
                    let perWeightReal = WeightRealPro * 100

                    // chênh lệch phần trăm ước tính
                    item["PerCompare"] = parseInt(Math.abs(perCurrent )*100/perWeight)
                    // chênh lệch phần trăm thực tế
                    item["PerCompareReal"] = parseInt(Math.abs(perCurrent )*100/perWeightReal)
                }

            } else {
                if (item.sttOther == obj.id) {
                    item[obj.key] = (obj.value)
                    if (obj.key == 'Weight') {
                        if (status == "ADD") {
                            //   item["WeightCustom"] = Helper.roundNumber(parseFloat(obj.value) / parseInt(NumberTemp) / 0.0375, 1)
                        }
                        item["WeightAvg"] = parseFloat(obj.value) / parseInt(NumberTemp)

                        // cập nhật tỷ lệ lệch vàng
                        let perCurrent = (WeightProduct - obj.value) / (0.0375 * NumberTemp)
                        let perWeight = WeightPro * 100
                        let perWeightReal = WeightRealPro * 100

                        // chênh lệch phần trăm ước tính
                        item["PerCompare"] = parseInt(Math.abs(perCurrent )*100/perWeight)
                        // chênh lệch phần trăm thực tế
                        item["PerCompareReal"] = parseInt(Math.abs(perCurrent )*100/perWeightReal)

                    }
                    if (obj.key == 'WeightProduct') {
                        item["WeightAvgProduct"] = parseFloat(obj.value) / parseInt(NumberTemp)

                        // cập nhật tỷ lệ lệch vàng
                        let perCurrent = (obj.value - Weight) / (0.0375 * NumberTemp)
                        let perWeight = WeightPro * 100
                        let perWeightReal = WeightRealPro * 100

                        // chênh lệch phần trăm ước tính
                        item["PerCompare"] = parseInt(Math.abs(perCurrent )*100/perWeight)
                        // chênh lệch phần trăm thực tế
                        item["PerCompareReal"] = parseInt(Math.abs(perCurrent)*100/perWeightReal)
                    }

                }

            }
            return item
        })
        dispatch({
            type: UPDATE_CELL_INPUT_BY_ID,
            payload: {
                ListProductByOrderOutput: temp
            }
        })
    }
}

export const addNewItemOutput = (data) => {
    let ListProduct_temp = _.clone(data)
    return (dispatch, getState) => {
        let { objDataOutput } = getState().output
        let { status } = getState().toolbar
        let data_temp = []
        data_temp = ListProduct_temp.map((item, i) => {
            let { IdProduct, NumberTemp, IdProductParentColor, Weight, price, WeightProduct, WeightCustom, ProductsEachOutput } = item
            item.IdOutput = objDataOutput.IdOutput
            // cộng dồn số lượng
            if (status == 'EDIT') {
                if ((ProductsEachOutput || 0) == 0 && NumberTemp > 0) {
                    item.ProductsEachOutput = NumberTemp
                } else {
                    item.ProductsEachOutput = (ProductsEachOutput || 0)
                }
            } else {
                item.ProductsEachOutput = (ProductsEachOutput || 0) + NumberTemp
            }
            return item
        })
        data_temp.map(x => x.IdProductParentColor = (x.IdProductParent || x.IdProduct) + x.Color)
        data_temp.map(x => x.IdProductIdProductParentColor = x.IdProduct + x.IdProductParentColor)
        objDataOutput["created_by"] = username
        return new Promise((resolve, reject) => {
            Promise.all([
                axios.post(`${Config.API_URL_USER}output/add`, objDataOutput),
                axios.post(`${Config.API_URL_USER}output/add_list_products`, { data: data_temp, IdOutput: objDataOutput.IdOutput, IdOrder: objDataOutput.IdOrder })
            ])
                .then((response) => {
                    dispatch({
                        type: ADD_LIST_PRODUCTS_BY_OUTPUT,
                        payload: {
                            isLoadingOutput: false
                        }
                    })
                    resolve(response)
                })
        }, (err) => {
            reject(err)
        })
    }
}
export const addListProducts = (data) => {
    let ListProduct_temp = _.clone(data)
    return (dispatch, getState) => {
        dispatch({
            type: ADD_NEW_ITEM_OUTPUT,
            payload: {
                isLoadingOutput: true
            }
        })
        let { objDataOutput } = getState().output
        let { status } = getState().toolbar

        let data_temp = []

        data_temp = ListProduct_temp.map((item, i) => {
            let { IdProduct, NumberTemp, IdProductParentColor, Weight, price, WeightProduct, WeightCustom, ProductsEachOutput } = item
            item.IdOutput = objDataOutput.IdOutput
            // cộng dồn số lượng
            if (status == 'EDIT') {
                if ((ProductsEachOutput || 0) == 0 && NumberTemp > 0) {
                    item.ProductsEachOutput = NumberTemp
                } else {
                    item.ProductsEachOutput = (ProductsEachOutput || 0)
                }
            } else {
                item.ProductsEachOutput = (ProductsEachOutput || 0) + NumberTemp
            }
            return item
        })


        data_temp.map(x => x.IdProductParentColor = (x.IdProductParent || x.IdProduct) + x.Color)
        data_temp.map(x => x.IdProductIdProductParentColor = x.IdProduct + x.IdProductParentColor)
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}output/add_list_products`, { data: data_temp, IdOutput: objDataOutput.IdOutput, IdOrder: objDataOutput.IdOrder })
                .then((response) => {
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })

    }
}
export const updateItemOutput = (ListProduct_temp) => {
    return (dispatch, getState) => {
        dispatch({
            type: ADD_NEW_ITEM_OUTPUT,
            payload: {
                isLoadingOutput: true
            }
        })
        let { objDataOutput } = getState().output
        let { status } = getState().toolbar
        let data_temp = []
        data_temp = ListProduct_temp.map((item, i) => {
            let { ProductsEachOutput, IdProduct, NumberTemp, IdProductParentColor, Weight, price, WeightProduct, WeightCustom } = item
            item.IdOutput = objDataOutput.IdOutput
            // cộng dồn số lượng
            if (status == 'EDIT') {
                if ((ProductsEachOutput || 0) == 0 && NumberTemp > 0) {
                    item.ProductsEachOutput = NumberTemp
                } else {
                    item.ProductsEachOutput = (ProductsEachOutput || 0)
                }
            } else {
                item.ProductsEachOutput = (ProductsEachOutput || 0) + NumberTemp
            }
            return item
        })
        data_temp.map(x => x.IdProductParentColor = (x.IdProductParent || x.IdProduct) + x.Color)
        data_temp.map(x => x.IdProductIdProductParentColor = x.IdProduct + x.IdProductParentColor)
        objDataOutput["created_by"] = username
        return new Promise((resolve, reject) => {
            Promise.all([
                axios.post(`${Config.API_URL_USER}output/update`, objDataOutput),
                axios.post(`${Config.API_URL_USER}output/add_list_products`, { data: data_temp, IdOutput: objDataOutput.IdOutput, IdOrder: objDataOutput.IdOrder })
            ])
                .then((response) => {
                    dispatch({
                        type: ADD_LIST_PRODUCTS_BY_OUTPUT,
                        payload: {
                            isLoadingOutput: false
                        }
                    })
                    resolve(response)
                })
        })
    }
}

export const updateAddListProducts = (ListProduct_temp) => {
    return (dispatch, getState) => {
        dispatch({
            type: ADD_NEW_ITEM_OUTPUT,
            payload: {
                isLoadingOutput: true
            }
        })
        let { objDataOutput } = getState().output
        let { status } = getState().toolbar
        let data_temp = []
        data_temp = ListProduct_temp.map((item, i) => {
            let { ProductsEachOutput, IdProduct, NumberTemp, IdProductParentColor, Weight, price, WeightProduct, WeightCustom } = item
            item.IdOutput = objDataOutput.IdOutput
            item.countItem = 1
            // cộng dồn số lượng
            if (status == 'EDIT') {
                if ((ProductsEachOutput || 0) == 0 && NumberTemp > 0) {
                    item.ProductsEachOutput = NumberTemp
                } else {
                    item.ProductsEachOutput = (ProductsEachOutput || 0)
                }
            } else {
                item.ProductsEachOutput = (ProductsEachOutput || 0) + NumberTemp
            }
            return item
        })
        // group stone
        let groupData = [
            ...data_temp.reduce(
                (map, item) => {
                    const { IdGroupBy: key, countItem } = item;
                    const prev = map.get(key);
                    if (prev) {
                        prev.countItem += 1
                    } else {
                        map.set(key, Object.assign({}, item))
                    }

                    return map
                },
                new Map()
            ).values()
        ]
        groupData.map(x => x.IdProductParentColor = (x.IdProductParent || x.IdProduct) + x.Color)
        groupData.map(x => x.IdProductIdProductParentColor = x.IdProduct + x.IdProductParentColor)
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}output/add_list_products`, { data: groupData, IdOutput: objDataOutput.IdOutput, IdOrder: objDataOutput.IdOrder })
                .then((response) => {
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
export const deleteItemOutput = (params) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}output/delete`, params)
                .then((response) => {
                    let { data } = response.data
                    dispatch({
                        type: DELETE_ITEM_OUTPUT,
                        payload: {
                            itemDetail: {}
                        }
                    })
                    dispatch(getListDataOutPut())
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
                        type: DELETE_ITEM_OUTPUT_ALL,
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
                objDataOutput: obj
            }
        })
    }
}
export const isEditOutPut = (value) => {
    return (dispatch) => {
        dispatch({
            type: IS_EDIT_OUTPUT,
            payload: {
                isDetail: value
            }
        })
    }
}
export const addListProductByOutput = (ListProduct_temp) => {
    return (dispatch, getState) => {
        let { objDataOutput } = getState().output
        let { status } = getState().toolbar

        let data_temp = []


        data_temp = ListProduct_temp.map((item, i) => {
            let { IdProduct, NumberTemp, IdProductParentColor, Weight, price, WeightProduct, WeightCustom, ProductsEachOutput } = item
            item.IdOutput = objDataOutput.IdOutput
            item.countItem = 1
            // cộng dồn số lượng
            if (status == 'EDIT') {
                item.ProductsEachOutput = ProductsEachOutput
            } else {
                item.ProductsEachOutput = ProductsEachOutput + NumberTemp
            }
            return item
        })

        // group stone
        let groupData = [
            ...data_temp.reduce(
                (map, item) => {
                    const { IdGroupBy: key, countItem } = item;
                    const prev = map.get(key);
                    if (prev) {
                        prev.countItem += 1
                    } else {
                        map.set(key, Object.assign({}, item))
                    }

                    return map
                },
                new Map()
            ).values()
        ]

        return new Promise((resolve, reject) => {
            Promise.all([
                // axios.post(`${Config.API_URL_USER}order/delete_products_by_order`, { IdOrder: objDataOutput.IdOrder }),
                axios.post(`${Config.API_URL_USER}output/add_list_products`, { data: groupData, IdOutput: objDataOutput.IdOutput, IdOrder: objDataOutput.IdOrder })                    // axios.post(`${Config.API_URL_USER}products/add_list_casting`, { data: data_temp2 })
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
export const addListCasting = () => {
    return (dispatch, getState) => {
        let { listCastingSelected } = getState().products
        let { objDataOutput } = getState().products
        let data_temp = []
        if (objDataOutput.Id && listCastingSelected.length > 0) {
            listCastingSelected.map((item, i) => {
                data_temp.push({
                    IdProduct: objDataOutput.Id,
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
export const clickCheckRowOrderInOutPut = (IdOrder, checked) => {
    return (dispatch, getState) => {
        let { list_order_in_output, objDataOutput } = getState().output
        var list_temp = _.clone(list_order_in_output, true);
        let item_check = []
        list_temp.map((item, i) => {
            item.checked = false
            if (item.IdOrder == IdOrder) {
                if (checked) {
                    item_check.push(item)
                }
                item.checked = checked
            }
            return item
        })
        let objDataOutputTemp = _.clone(objDataOutput, true)
        objDataOutputTemp["IdOrder"] = IdOrder
        dispatch({
            type: CLICK_ROW_DATA_ORDER_IN_OUT_OUT,
            payload: {
                list_order_in_output: item_check,
                objDataOutput: objDataOutputTemp,
                isShowProduct: checked,
                isLoadingOutput: true
            }
        })
        dispatch(getListProductsByOrderOutput(IdOrder)).then(() => {
            dispatch(getListProductsByOrderOutputFull())
        })
    }
}
export const getListDataOrderInOutPutBySearch = (key = '') => {
    return (dispatch, getState) => {
        let { page, total } = getState().output
        let { status } = getState().toolbar
        let type = status == 'ADD' ? 1 : 0
        let pageParams = {
            page: page,
            total: total
        }
        return new Promise((resolve, reject) => {
            Promise.all([
                axios.get(`${Config.API_URL_USER}output/get_list_order`, { params: { page: pageParams.page, total: pageParams.total, key: key, type: type } }),
                axios.get(`${Config.API_URL_USER}order/get_list_statusorder`)
            ])
                .then((response) => {
                    let { data } = response[0].data
                    let other_list = response[1].data.data
                    let data_temp = _.clone(data, true)
                    data_temp.map(item => item.checked = false)
                    dispatch({
                        type: GET_LIST_ORDER_IN_OUTPUT,
                        payload: {
                            list_order_in_output: data_temp || [],
                            ListProductByOrderInOutPut: [],
                            ListProductByOrderOutput: []
                        }
                    })
                    resolve(response)
                })
        }, (err) => {
            reject(err)
        })

    }
}
export const getListDataOrderInOutPut = (params = { page: 1, total: 50 }) => {
    return (dispatch, getState) => {
        let { page, total, itemDetail } = getState().output
        let { status } = getState().toolbar
        let type = status == 'ADD' ? 1 : 0
        let pageParams = {
            page: page,
            total: total
        }
        return new Promise((resolve, reject) => {
            Promise.all([
                axios.get(`${Config.API_URL_USER}output/get_list_order`, { params: { page: params.page, total: params.total, type: type } })
            ])
                .then((response) => {
                    let { data } = response[0].data
                    let data_temp = _.clone(data, true)
                    data_temp.map(item => item.checked = false)
                    if (itemDetail.IdOrder) {
                        data_temp = data_temp.filter(x => x.IdOrder == itemDetail.IdOrder)
                        data_temp.map(item => item.checked = true)
                    }
                    dispatch({
                        type: GET_LIST_ORDER_IN_OUTPUT,
                        payload: {
                            list_order_in_output: data_temp || [],
                            ListProductByOrderInOutPut: []
                        }
                    })
                    resolve(response)
                })
        }, (err) => {
            reject(err)
        })

    }
}
export const getListDataOrderInOutPutEdit = (IdOrder) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            Promise.all([
                axios.get(`${Config.API_URL_USER}output/get_list_order_edit`, { params: { IdOrder: IdOrder } })
            ])
                .then((response) => {
                    let { data } = response[0].data
                    let data_temp = _.clone(data, true)
                    data_temp.map(item => item.checked = true)
                    dispatch({
                        type: GET_LIST_ORDER_IN_OUTPUT,
                        payload: {
                            list_order_in_output: data_temp || []
                        }
                    })
                    resolve(response)
                })
        }, (err) => {
            reject(err)
        })

    }
}
export const getListProductsByOrderOutput = (IdOrder) => {
    return (dispatch, getState) => {
        const { default_product, ListProductByOrderOutput } = getState().output
        return new Promise((resolve, rejects) => {
            axios.get(`${Config.API_URL_USER}ouput/output_get_product_by_order`, { params: { IdOrder: IdOrder, Page: 1 } })
                .then((response) => {
                    let { data } = response.data
                    let data_temp = data
                    data_temp.map((item, i) => {
                        item.stt = item.IdProductParent + '_' + item.Color
                        item.sttOther = item.IdProduct + '_' + i
                        item.isExists = true
                    })
                    let ListProductByOrderOutputTemp = _.clone(data_temp, true), default_product_temp;
                    let IdGroupNew = Helper.generateUUIDV4()
                    let IdProductParentColor_temp = ''
                    let indexNew = 0
                    let indexGroup = 0
                    let data_temp_default = []
                    ListProductByOrderOutputTemp.map((item, i) => {
                        item.index = i + 1
                        if (IdProductParentColor_temp == '') {
                            indexNew = indexNew + 1
                            item.IdGroup = IdGroupNew
                            item.IdGroupStt = indexNew + '_0_' + indexGroup
                            IdProductParentColor_temp = item.IdProductParentColor
                        } else {
                            if (item.IdProductParentColor != IdProductParentColor_temp) {
                                let IdGroupNewTemp = Helper.generateUUIDV4()
                                indexGroup = 0
                                IdGroupNew = IdGroupNewTemp
                                item.IdGroup = IdGroupNewTemp
                                indexNew = indexNew + 1
                                item.IdGroupStt = indexNew + '_0_' + indexGroup
                            } else {
                                indexGroup = indexGroup + 1
                                item.IdGroup = IdGroupNew
                                item.IdGroupStt = indexNew + '_0_' + indexGroup
                            }
                            IdProductParentColor_temp = item.IdProductParentColor
                        }
                        data_temp_default.push(_.clone(item, true))
                    })

                    default_product_temp = _.clone(default_product, true)
                    default_product_temp.index = ListProductByOrderOutputTemp.length + 1
                    ListProductByOrderOutputTemp.push(default_product_temp)

                    dispatch({
                        type: GET_LIST_PRODUCTS_BY_ORDER_OUTPUT,
                        payload: {
                            ListProductByOrderOutput: ListProductByOrderOutputTemp,
                            ListProductByOrderOutputDefault: data_temp_default,
                            indexLastRows: indexNew
                        }
                    })

                    resolve(response)
                }, (err) => {
                    rejects(err)
                })
        })
    }
}

export const getListProductsByOrderOutputFull = () => {
    return (dispatch, getState) => {
        const { default_product, ListProductByOrderOutput, objDataOutput, indexLastRows } = getState().output
        return new Promise((resolve, rejects) => {
            axios.get(`${Config.API_URL_USER}ouput/output_get_product_by_order_full`, { params: { IdOrder: objDataOutput.IdOrder } })
                .then((response) => {
                    let { data } = response.data
                    let ListDataDefault = _.clone(ListProductByOrderOutput, true)
                    ListDataDefault.pop()
                    if (data.length > ListDataDefault.length) {
                        $(window).scrollTop(0)

                        let ListProductByOrderOutputemp = _.clone(ListDataDefault, true)
                        data.map((item) => {
                            let checkDataOld = ListProductByOrderOutputemp.filter(x => x.IdProductParentColor == item.IdProductParentColor
                                && x.TempIdProductParent == item.TempIdProductParent
                                && x.IdProduct == item.IdProduct
                            )
                            if (checkDataOld.length == 0) {
                                ListProductByOrderOutputemp.push(item)
                            }
                        })

                        // set các số thứ tự
                        ListProductByOrderOutputemp.map((item, i) => {
                            if (!item.stt) {
                                item.stt = item.IdProductParent + '_' + item.Color
                                item.sttOther = item.IdProduct + '_' + i
                                item.isExists = true
                            }
                        })

                        let default_product_temp;
                        let IdGroupNew = Helper.generateUUIDV4()
                        let IdProductParentColor_temp = ''
                        let indexNew = 0
                        let indexGroup = 0
                        let data_temp_default = []
                        let indexGroupTemp = 0
                        ListProductByOrderOutputemp.map((item, i) => {
                            if (!item.index) {
                                item.index = i + 1
                                let checkExsist = ListDataDefault.filter(x => x.IdProductParentColor == item.IdProductParentColor)
                                if (checkExsist.length > 0) {
                                    indexGroupTemp = (checkExsist.length - 1) + 1
                                    item.NumberTemp = checkExsist[0].NumberTemp
                                    item.IdGroup = checkExsist[0].IdGroup
                                    item.IdGroupStt = indexLastRows + '_0_' + indexGroupTemp
                                } else {
                                    if (IdProductParentColor_temp == '') {
                                        indexNew = indexLastRows + 1
                                        item.IdGroup = IdGroupNew
                                        item.IdGroupStt = indexNew + '_0_' + indexGroup
                                        IdProductParentColor_temp = item.IdProductParentColor
                                    } else {
                                        if (item.IdProductParentColor != IdProductParentColor_temp) {
                                            let IdGroupNewTemp = Helper.generateUUIDV4()
                                            indexGroup = 0
                                            IdGroupNew = IdGroupNewTemp
                                            item.IdGroup = IdGroupNewTemp
                                            indexNew = indexNew + 1
                                            item.IdGroupStt = indexNew + '_0_' + indexGroup
                                        } else {
                                            indexGroup = indexGroup + 1
                                            item.IdGroup = IdGroupNew
                                            item.IdGroupStt = indexNew + '_0_' + indexGroup
                                        }
                                        IdProductParentColor_temp = item.IdProductParentColor
                                    }
                                }
                            }

                            data_temp_default.push(_.clone(item, true))
                        })
                        dispatch({
                            type: GET_LIST_PRODUCTS_BY_ORDER_OUTPUT,
                            payload: {
                                ListProductByOrderOutput: ListProductByOrderOutputemp,
                                indexLastRows: 0,
                                isLoadingOutput: false
                            }
                        })

                    } else {
                        dispatch({
                            type: GET_LIST_PRODUCTS_BY_ORDER_OUTPUT,
                            payload: {
                                indexLastRows: 0,
                                isLoadingOutput: false
                            }
                        })
                    }

                    resolve(response)
                }, (err) => {
                    rejects(err)
                })
        })
    }
}
export const selectOrderOutPut = (obj) => {
    return (dispatch, getState) => {
        let { objDataOutput } = getState().output
        let objDataOutputTemp = _.clone(objDataOutput, true)
        objDataOutputTemp["IdOrder"] = obj.value
        dispatch({
            type: SELECTED_ORDER_OUTPUT,
            payload: {
                selectedOrder: obj,
                objDataOutput: objDataOutputTemp
            }
        })
        dispatch(getListProductsByOrderOutput(obj.value))
    }
}
export const resetDataOutPut = () => {
    return (dispatch) => {
        dispatch({
            type: RESET_DATA_OUTPUT,
            payload: null
        })
    }
}
export const getNumberAutoOutput = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}output/get_auto_number`)
                .then((response) => {
                    let { data } = response.data
                    const { objDataOutput } = getState().output
                    let objDataOutputTemp = _.clone(objDataOutput, true)
                    objDataOutputTemp["IdOutput"] = (data && data[0].value || '0000000')
                    dispatch({
                        type: GENERATE_NUMBER_ID_OUTPUT,
                        payload: {
                            objDataOutput: objDataOutputTemp
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
        let { objDataOutput } = getState().order
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}order/accept_order`, { IdOrder: id, Value: value })
                .then((response) => {
                    let { data } = response.data
                    if (data != 2) {
                        let objDataOutput_temp = _.clone(objDataOutput, true)
                        objDataOutput_temp["StatusOrder"] = value
                        dispatch({
                            type: ACCEPT_ORDER,
                            payload: {
                                objDataOutput: objDataOutput_temp
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
        let { objDataOutput } = getState().order
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}order/get_list_bag_order`, { params: { IdOrder: objDataOutput.IdOrder } })
                .then((response) => {
                    let { data } = response.data

                    dispatch({
                        type: GET_LIST_BAG_BY_ORDRER,
                        payload: {
                            listBagSelected: data
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}

export const getListBag = (IdOrder, IdProduct, Color) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}output/get_list_bag`, { params: { IdOrder: IdOrder, IdProduct: IdProduct, Color: Color } })
                .then((response) => {
                    let { data } = response.data
                    dispatch({
                        type: GET_LIST_BAG_BY_ORDER_PRODUCT,
                        payload: {
                            list_bag: data || []
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
