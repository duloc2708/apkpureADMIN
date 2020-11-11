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
    GET_OTHER_GROUP_LIST
} from '../types'
import { updateButtonToolbar } from 'modules/toolbar/actions/form'
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
export const getGroupList = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}common/grouplist`).then((response) => {
                let { data } = response.data
                dispatch({
                    type: GET_OTHER_GROUP_LIST,
                    payload: {
                        list_data: data
                    }
                })
                resolve(response)
            }, (err) => {
                reject(err)
            })
        })
    }
}
export const getDataByCode = (type) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}common/list_combobox_by_code`, { params: { type: type } })
                .then((response) => {
                    let { data } = response.data                    
                    resolve(response)
                }, (err) => {
                    reject(err)
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
export const checkCodeExists = (params = { code: ''}) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}common/check_code_exists_group`,
                { params })
                .then((response) => {
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}

export const clickCheckRowGroupList = (value) => {
    return (dispatch, getState) => {
        let { list_data } = getState().grouplist
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
export const addNewItemGroupList = () => {
    return (dispatch, getState) => {
        let { type_code, objData } = getState().grouplist
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}common/list/add_group_list`, objData)
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
export const updateItemGroupList = (params) => {
    return (dispatch, getState) => {
        let { type_code, objData } = getState().list
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}common/list/group_update`, objData)
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
            axios.post(`${Config.API_URL_USER}common/list/group_delete`, params)
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