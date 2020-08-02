import {
    GET_OTHER_LIST,
    ADD_NEW_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM,
    CLICK_ROW_DATA,
    CHECK_ALL_ROW,
    DELETE_ITEM_ALL,
    UPDATE_INPUT_DATA,
    RESET_DATA_LIST,
    CHANGE_PAGE_TABLE,
    GET_COMBOBOX_BY_TYPE,
    UPDATE_FILTER_VALUE_HEADER,
    PUSH_LIST_DATA_ALL_DEFAULT
} from '../types'
import { updateButtonToolbar } from 'modules/toolbar/actions/form'
import { updateInfoPage } from 'modules/common/actions/form'

export const updateValueFilterHeader = (obj) => {
    return (dispatch, getState) => {
        let { listHeaderTable } = getState().list
        let listHeaderTable_temp = _.clone(listHeaderTable, true)
        listHeaderTable_temp.map((item) => {
            if (item.key == obj.code) {
                item.valueFilter = obj.value
            } else {
                item.valueFilter = ''
            }
        })
        dispatch({
            type: UPDATE_FILTER_VALUE_HEADER,
            payload: {
                listHeaderTable: listHeaderTable_temp
            }
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
export const ChangePageList = (value) => {
    return (dispatch, getState) => {
        dispatch({
            type: CHANGE_PAGE_TABLE,
            payload: {
                page: value,
            }
        })
    }
}
export const getListDataList = (params = { type: '', page: 1, total: 50 }) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}common/list`,
                { params }
            ).then((response) => {
                let { data } = response.data
                let data_temp = data
                data_temp.map(item => item.checked = false)
                let { itemDetail } = getState().list
                if (itemDetail && itemDetail.checked) {
                    data_temp.map((item, i) => {
                        if (item.id == itemDetail.id) {
                            item.checked = true
                        }
                        return item
                    })
                }
                dispatch({
                    type: GET_OTHER_LIST,
                    payload: {
                        list_data: data_temp || [],
                        type_code: params.type
                    }
                })
                let totalRows = data_temp && data_temp[0] && data_temp[0].totalRows
                dispatch(updateInfoPage(totalRows))
                dispatch(updateButtonToolbar(''))
                resolve(response)
            }, (err) => {
                reject(err)
            })
        })
    }
}
export const getListDataListSearch = (params = { type: '', page: 1, total: 50, key: '', value: '' }) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}common/list_search`,
                { params }
            ).then((response) => {
                let { data } = response.data
                let data_temp = data
                data_temp.map(item => item.checked = false)
                let { itemDetail } = getState().list
                if (itemDetail && itemDetail.checked) {
                    data_temp.map((item, i) => {
                        if (item.id == itemDetail.id) {
                            item.checked = true
                        }
                        return item
                    })
                }
                dispatch({
                    type: GET_OTHER_LIST,
                    payload: {
                        list_data: data_temp || [],
                        type_code: params.type,
                        page: params.page,
                        total: params.total
                    }
                })
                dispatch(updateButtonToolbar(''))
                resolve(response)
            }, (err) => {
                reject(err)
            })
        })
    }
}
export const getDataByCode = (type) => {
    return (dispatch, getState) => {
        let { list_data_all } = getState().list
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}common/list_combobox_by_code`, { params: { type: type } })
                .then((response) => {
                    let { data } = response
                    data.map((item) => {
                        let itemFind = list_data_all.filter(x => x.code == item.code)
                        if (itemFind.length == 0) {
                            list_data_all.push(item)
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListTypeByListCode = (listtype) => {
    return (dispatch, getState) => {
        let { list_data_all } = getState().list
        return new Promise((resolve, reject) => {
            let listAPI = [], list_data = []
            listtype.map(item => {
                listAPI.push(axios.get(`${Config.API_URL_USER}common/list_combobox_by_code`, { params: { type: item } }))
            })
            Promise.all(listAPI).then(response => {
                listtype.map((obj, i) => {
                    let { data } = response[i]
                    data.map(item => {
                        list_data.push(item)
                    })
                })
                dispatch({
                    type: PUSH_LIST_DATA_ALL_DEFAULT,
                    payload: {
                        list_data_all: list_data
                    }
                })
                resolve(response)
            })
        })
    }
}
export const getDataByTable = (tableName) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}common/list_combobox_by_table`, { params: { tableName: tableName } })
                .then((response) => {
                    let { data } = response.data
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const checkCodeExists = (params = { code: '', type: '' }) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}common/check_code_exists`,
                { params })
                .then((response) => {
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}

export const clickCheckRowList = (value) => {
    return (dispatch, getState) => {
        let { list_data } = getState().list
        var list_temp = _.clone(list_data, true);
        list_temp.map((item, i) => {
            item.checked = false
            if (item.id == value.id) {
                item.checked = !value.checked
            }
            return item
        })
        dispatch({
            type: CLICK_ROW_DATA,
            payload: {
                list_data: list_temp,
                objData: value
            }
        })
    }
}

export const resetDataList = () => {
    return (dispatch, getState) => {
        dispatch({
            type: RESET_DATA_LIST,
            payload: null
        })
    }

}
export const addNewItemList = () => {
    return (dispatch, getState) => {
        let { type_code, objData } = getState().list
        objData["type_code"] = type_code
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}common/list/add`, objData)
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
export const updateItemList = (params) => {
    return (dispatch, getState) => {
        let { type_code, objData } = getState().list
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}common/list/update`, objData)
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
export const deleteItemList = (params) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}common/list/delete`, params)
                .then((response) => {
                    let { data } = response.data
                    dispatch({
                        type: DELETE_ITEM,
                        payload: null
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const checkAllRowList = (value) => {
    return (dispatch, getState) => {
        let { list_data } = getState().list
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
export const deleteAllItemList = () => {
    return (dispatch, getState) => {
        let { list_data } = getState().list
        let data_temp = _.clone(list_data, true), listid = []
        data_temp.map((item, i) => {
            listid.push(item.id)
        })
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}common/list/deleteAll`, { listid: listid })
                .then((response) => {
                    let { data } = response.data
                    dispatch({
                        type: DELETE_ITEM_ALL,
                        payload: null
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}