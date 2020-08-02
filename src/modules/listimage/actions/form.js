import {
    GET_LIST_IMAGE,
    UPDATE_SCROLL_LIST,
    LOADING_IMAGE,
    GET_LIST_BAO_GIA_IN_IMAGE,
    UPDATE_CODE_BAOGIA_IMAGE
} from '../types'
export const resetListImage = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: GET_LIST_IMAGE,
                payload: {
                    list_data: []
                }
            })
            resolve(GET_LIST_IMAGE)
        })
    }
}
export const updateAllCheckData = (value) => {
    return (dispatch, getState) => {
        let { list_data } = getState().listimage
        let data_temp = _.clone(list_data, true)
        data_temp.map(item => item.checked = value)
        return new Promise((resolve, reject) => {
            dispatch({
                type: GET_LIST_IMAGE,
                payload: {
                    list_data: data_temp
                }
            })
            resolve(UPDATE_CODE_BAOGIA_IMAGE)
        })
    }
}
export const updateCodeObjSearch = (obj) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: UPDATE_CODE_BAOGIA_IMAGE,
                payload: {
                    objSearch: obj
                }
            })
            resolve(UPDATE_CODE_BAOGIA_IMAGE)
        })
    }
}
export const getListDataBaoGiaInImage = (params = { page: 1, total: 50 }) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}baogia`, { params: { page: params.page, total: params.total } })
                .then((response) => {
                    let { data } = response.data
                    let data_temp = _.clone(data, true)
                    data_temp.map(item => item.checked = false)
                    dispatch({
                        type: GET_LIST_BAO_GIA_IN_IMAGE,
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
export const checkImage = (item, status) => {
    return (dispatch, getState) => {
        let { list_data } = getState().listimage
        let list_dataTemp = _.clone(list_data, true)
        let newData = list_dataTemp.map(itemData => {
            if (itemData.Id === item.Id) {
                return Object.assign({}, itemData, { checked: status })
            }
            return itemData
        })
        return new Promise((resolve, reject) => {
            dispatch({
                type: GET_LIST_IMAGE,
                payload: {
                    list_data: newData
                }
            })
            resolve(GET_LIST_IMAGE)
        })
    }
}
export const updateScroll = () => {
    return (dispatch, getState) => {
        let { page, total } = getState().listimage
        return new Promise((resolve, reject) => {
            dispatch({
                type: UPDATE_SCROLL_LIST,
                payload: {
                    page: page + 1
                }
            })
            resolve(UPDATE_SCROLL_LIST)
        })
    }
}
export const getListImage = (value = '') => {
    return (dispatch, getState) => {
        let { page, total, list_data, codeProduct, objSearch } = getState().listimage
        dispatch({
            type: LOADING_IMAGE,
            payload: {
                isLoad: true
            }
        })
        return new Promise((resolve, reject) => {
            if (value != codeProduct) {
                page = 1
                total = 20
            }
            axios.post(`${Config.API_URL_USER}products/image_search`, { page: page, total: total, key: objSearch.Key, top: objSearch.Top })
                .then((response) => {
                    let { data } = response.data
                    if (objSearch.IsAll) {
                        data.map(item => item.checked = true)
                    }
                    if (objSearch.Top) {
                        dispatch({
                            type: GET_LIST_IMAGE,
                            payload: {
                                list_data: data,
                                isLoad: false,
                                codeProduct: '',
                                page:1
                            }
                        })
                    } else {
                        let dataTemp = [..._.clone(list_data, true), ...data]
                        dispatch({
                            type: GET_LIST_IMAGE,
                            payload: {
                                list_data: value != codeProduct ? data : dataTemp,
                                isLoad: false,
                                codeProduct: value,
                                totalRecord: data && data[0] && data[0].totalRows || 0
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

export const exportListProducts = (value = '') => {
    return (dispatch, getState) => {
        let { list_data, objSearch } = getState().listimage
        let list_dataClone = []
        list_data.map(item => {
            let { Id, IdProduct, Price, Image, Weight, WeightReal, checked } = item
            if (checked) {
                list_dataClone.push({ IdProduct: Id })
            }
        })
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}products/export_data_list_image`, { data: list_dataClone, isAll: objSearch.IsAll, CodeBaoGia: objSearch.CodeBaoGia, Key: objSearch.Key, Top: objSearch.Top }, {
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