import {
    GET_LIST_STONE,
    ADD_NEW_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM,
    CLICK_ROW_DATA,
    CHECK_ALL_ROW,
    DELETE_ITEM_ALL,
    UPDATE_BUTTON_TOOLBAR
} from '../types'
export const getListData = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}stone`, { page: 1, total: 50 })
                .then((response) => {
                    let { data } = response.data
                    let data_temp = data
                    data_temp.map(item => item.checked = false)
                    let { itemDetail } = getState().stone
                    if (itemDetail && itemDetail.checked) {
                        data_temp.map((item, i) => {
                            if (item.Id == itemDetail.Id) {
                                item.checked = true
                            }
                            return item
                        })
                    }
                    dispatch({
                        type: GET_LIST_STONE,
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
export const clickCheckRow = (value) => {
    return (dispatch, getState) => {
        let { list_data } = getState().stone
        var list_temp = _.clone(list_data, true);
        list_temp.map((item, i) => {
            item.checked = false
            if (item.Id == value.Id) {
                item.checked = !value.checked
            }
            return item
        })
        dispatch({
            type: CLICK_ROW_DATA,
            payload: {
                list_data: list_temp,
                itemDetail: value
            }
        })
    }
}
export const addNewItem = (params) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}common/list/add`, params)
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
export const deleteItem = (params) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}stone/delete`, params)
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
export const updateButtonToolbar = (code_value) => {
    return (dispatch, getState) => {
        let { listButton, is_save } = getState().toolbar
        let data_temp = _.clone(listButton, true), is_save_temp = is_save
        data_temp.map((item, i) => {
            item.status = ''
            if (code_value == 'ADD' || code_value == 'EDIT') {
                is_save_temp = true
                if (item.code == 'ADD' || item.code == 'EDIT' || item.code == 'DELETE' || item.code == 'EXPORT') {
                    item.status = 'disable'
                }
            }
            if (code_value == 'SAVE' || code_value == 'CANCEL' || code_value == 'EXPORT' || code_value== '') {
            is_save_temp = false
            if (item.code == 'SAVE' || item.code == 'CANCEL') {
                item.status = 'disable'
            }
        }
        return item
    })
    dispatch({
        type: UPDATE_BUTTON_TOOLBAR,
        payload: {
            listButton: data_temp,
            is_save: is_save_temp,
            status: code_value

        }
    })
}
}