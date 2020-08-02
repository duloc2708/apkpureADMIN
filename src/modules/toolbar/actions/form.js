import {
    GET_LIST_STONE,
    ADD_NEW_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM,
    CLICK_ROW_DATA,
    CHECK_ALL_ROW,
    DELETE_ITEM_ALL,
    UPDATE_BUTTON_TOOLBAR,
    UPDATE_LIST_BUTTON_TOOLBAR,
    RESET_TOOLBAR,
    PERMISSION_TOOLBAR
} from '../types'
export const perMissionToolbar = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let { list_function_user } = getState().header
            let { listButton } = getState().toolbar
            let { locationBeforeTransitions } = getState().routing
            let listButton_temp = _.clone(listButton, true)
            let page = ''
            if (locationBeforeTransitions && locationBeforeTransitions.pathname) {
                page = locationBeforeTransitions.pathname
            }

            let filData = []
            let listButtonPer = []
            list_function_user.map((item) => {
                if (item.code == page) {
                    let arrBtn = item && item.strListBtn.split(',') || []
                    listButtonPer = arrBtn
                    arrBtn.map(itemBtn => {
                        let checkExists = listButton_temp.filter(x => x.code == itemBtn)
                        if (checkExists.length > 0) {
                            filData.push(checkExists[0])
                        }
                    })
                }
            })
            console.log('filData>>>', filData);

            dispatch({
                type: PERMISSION_TOOLBAR,
                payload: {
                    listButton: filData,
                    listButtonPer: listButtonPer
                }
            })
            resolve(UPDATE_LIST_BUTTON_TOOLBAR)
        })
    }
}
export const resetToolbar = () => {
    return (dispatch, getState) => {
        dispatch({
            type: RESET_TOOLBAR,
            payload: null
        })
    }
}
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
export const updateListButton = () => {
    return (dispatch, getState) => {
        let { list_function_user } = getState().header
        let { locationBeforeTransitions } = getState().routing
        let listButton_temp = [
            { code: 'ADD', name: 'thêm', classBtn: 'fa fa-plus', status: '', display: true },
            { code: 'EDIT', name: 'sửa', classBtn: 'fa fa-pencil-square-o', status: '', display: true },
            { code: 'SAVEANDCLOSE', name: 'lưu và đóng', classBtn: 'fa fa-floppy-o', status: 'disable', display: true },
            { code: 'SAVE', name: 'lưu', classBtn: 'fa fa-floppy-o', status: 'disable', display: true },
            { code: 'PRINT', name: 'In', classBtn: 'fa fa-print', status: '', display: true },
            { code: 'EXPORT', name: 'xuất dữ liệu', classBtn: 'fa fa-print', status: '', display: true },
            { code: 'CANCEL', name: 'huỷ', class: 'fa fa-window-close-o', status: 'disable', display: true },
            { code: 'DETAIL', name: 'chi tiết', classBtn: 'fa fa-info-circle', status: '', display: true },
            { code: 'DELETE', name: 'xoá', classBtn: 'fa fa-times', status: '', display: true }
            // { code: 'ACCEPT_ORDER', name: 'Xác nhận ĐH', classBtn: 'fa fa-check', status: 'disable', display: false },
            // { code: 'CANCEL_ORDER', name: 'Huỷ đơn hàng', classBtn: 'fa fa-ban', status: 'disable', display: false },
            // { code: 'PRICE_ORDER', name: 'Cập nhật giá ĐH', classBtn: 'fa fa-usd', status: 'disable', display: false },
            // { code: 'ACCEPT_OUTPUT', name: 'Xác nhận XH', classBtn: 'fa fa-check', status: 'disable', display: false },
            // { code: 'COMPlETED_OUTPUT', name: 'Hoàn thành XH', classBtn: 'fa fa-check', status: 'disable', display: false },
            // { code: 'PRICE_OUTPUT', name: 'Cập nhật giá XH', classBtn: 'fa fa-usd', status: 'disable', display: false },
            // { code: 'DELETE_BAG', name: 'Xoá bag', classBtn: 'fa fa-times', status: 'disable', display: false },
            // { code: 'ACCEPT_CASH_TRANS', name: 'Xác nhận phiếu thu', classBtn: 'fa fa-check', status: 'disable', display: false },
            // { code: 'COMPlETED_CASH_TRANS', name: 'Hoàn thành phiếu thu', classBtn: 'fa fa-check', status: 'disable', display: false },
        ]
        let page = ''
        if (locationBeforeTransitions && locationBeforeTransitions.pathname) {
            page = locationBeforeTransitions.pathname
        }

        let filData = []
        list_function_user.map((item) => {
            if (item.code == page) {
                let arrBtn = item && item.strListBtn.split(',') || []
                arrBtn.map(itemBtn => {
                    let checkExists = listButton_temp.filter(x => x.code == itemBtn)
                    if (checkExists.length > 0) {
                        filData.push(checkExists[0])
                    }
                })
            }
        })

        let oldUserInfo = SportConfig._getCookie('userInfo')
        try {
            oldUserInfo = JSON.parse(SportConfig.function._base64.decode(oldUserInfo))
        } catch (e) {
            oldUserInfo = null
        }
        if (oldUserInfo.user_name.toUpperCase() !== 'ADMIN') {
            dispatch({
                type: UPDATE_LIST_BUTTON_TOOLBAR,
                payload: {
                    listButton: filData
                }
            })
        } else {
            dispatch({
                type: UPDATE_LIST_BUTTON_TOOLBAR,
                payload: {
                    listButton: listButton_temp
                }
            })
        }

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
        return new Promise((resolve, reject) => {
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
                if (['SAVE', 'SAVEANDCLOSE', 'EXPORT', 'CANCEL', ''].indexOf(code_value) != -1) {
                    is_save_temp = false
                    if (item.code == 'SAVEANDCLOSE' || item.code == 'CANCEL' || item.code == 'SAVE') {
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
            resolve(UPDATE_BUTTON_TOOLBAR)
        })

    }
}