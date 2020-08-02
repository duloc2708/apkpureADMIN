import {
    GET_LIST_STONE,
    ADD_NEW_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM,
    CLICK_ROW_DATA,
    CHECK_ALL_ROW,
    DELETE_ITEM_ALL,
    ARRAY_ITEM_TAB_STONE,
    UPDATE_NUMBER_STONE_BY_ID,
    UPDATE_INPUT_DATA,
    CHANGE_PAGE_TABLE,
    RESET_DATA_STONE,
    CLEAR_INPUT_STONE,
    UPDATE_FILTER_VALUE_HEADER,
    LOAD_FORM_STONE
} from '../types'
import { updateInfoPage } from 'modules/common/actions/form'
export const loadFormStone = () => {
    return (dispatch, getState) => {
        dispatch({
            type: LOAD_FORM_STONE,
            payload: null
        })
    }
}
export const getListDataStoneBySearch = (params = { page: 1, total: 50, key: '', value: '' }) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}stone/get_stone_search`,
                { params }
            ).then((response) => {
                let { data } = response.data
                let data_temp = data
                data_temp.map(item => item.checked = false)
                let { itemDetail, total } = getState().stone
                if (itemDetail && itemDetail.checked) {
                    data_temp.map((item, i) => {
                        if (item.Id == itemDetail.Id) {
                            item.checked = true
                        }
                        return item
                    })
                }
                let totalPage = data_temp && data_temp[0] && data_temp[0].TotalRows
                dispatch({
                    type: GET_LIST_STONE,
                    payload: {
                        list_data: data_temp || [],
                        page: params.page,
                        total: params.total,
                        totalRows: totalPage,
                        totalPage: Math.ceil(totalPage / total)
                    }
                })
                resolve(response)
            }, (err) => {
                reject(err)
            })
        })
    }
}
export const updateValueFilterHeader = (obj) => {
    return (dispatch, getState) => {
        let { listHeaderTable } = getState().stone
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
export const getListDataStone = (params = { page: 1, total: 50 }) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}stone`, { params: { page: params.page, total: params.total } })
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
                    let totalRows = data_temp && data_temp[0] && data_temp[0].TotalRows
                    dispatch({
                        type: GET_LIST_STONE,
                        payload: {
                            list_data: data_temp || []
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
export const clickCheckRowStone = (value) => {
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
                objData: value
            }
        })
    }
}


export const updateNumberStoneById = (obj) => {
    return (dispatch, getState) => {
        let { listStoneSelected } = getState().stone
        let temp = _.clone(listStoneSelected, true);
        temp.map((item, i) => {
            if (item.value == obj.id) {
                item.sl = obj.value
            }
            return item
        })
        dispatch({
            type: UPDATE_NUMBER_STONE_BY_ID,
            payload: {
                listStoneSelected: temp
            }
        })
        //     temp.map((item, i) => {

        // })     if (item.value == obj.id){
        //         item.sl = obj.value
        //     }
        //     return item

    }
}

export const addNewItemStone = () => {
    return (dispatch, getState) => {
        let { objData } = getState().stone
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}stone/add`, objData)
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
export const updateItemStone = (params) => {
    return (dispatch, getState) => {
        let { objData } = getState().stone
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}stone/update`, objData)
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
export const deleteItemStone = (params) => {
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
export const deleteAllItemStone = () => {
    return (dispatch, getState) => {
        let { list_data } = getState().stone
        let data_temp = _.clone(list_data, true), listid = []
        data_temp.map((item, i) => {
            listid.push('.' + item.Id + '.')
        })
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}stone/deleteAll`, { listid: listid })
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
export const resetDataStone = () => {
    return (dispatch, getState) => {
        dispatch({
            type: RESET_DATA_STONE,
            payload: null
        })
    }
}
export const clearInputStone = (value) => {
    return (dispatch, getState) => {
        let { list_data } = getState().stone
        let list_data_temp = _.clone(list_data, true)
        list_data_temp.map((x) => x.checked = false)
        dispatch({
            type: CLEAR_INPUT_STONE,
            payload: {
                objData: value,
            }
        })
    }
}
