import {
    GET_LIST_DATA_CHUYENMUC,
    DELETE_CHUYENMUC,
    ADD_NEW_CHUYENMUC,
    GET_DETAIL_CHUYENMUC,
    OPEN_MODAL_DETAIL_CHUYENMUC,
    UPDATE_INPUT_DATA,
    EDIT_ITEM_LISTTYPE,
    CLEAR_DATA_LISTTYPE
} from '../types'

export const clearDataListType = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_DATA_LISTTYPE,
            payload: null
        })
    }
}
export const editInputItemListType = (data) => {
    return (dispatch) => {
        dispatch({
            type: EDIT_ITEM_LISTTYPE,
            payload: {
                isEdit: true,
                isOpen: true,
                objData: data
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
export const openModalDetailChuyenMuc = (value) => {
    return (dispatch, getState) => {
        dispatch({
            type: OPEN_MODAL_DETAIL_CHUYENMUC,
            payload: {
                isOpen: value
            }
        })
    }
}
export const editChuyenMuc = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let { objData } = getState().listtype
            let objDataNew = _.clone(objData, true)
            axios.post(`${Config.API_URL}listtype/update`, objDataNew)
                .then((response) => {
                    let { StatusCode, Message } = response.data
                    if (StatusCode == 0) {
                        dispatch({
                            type: ADD_NEW_CHUYENMUC,
                            payload: {
                                isOpen: false
                            }
                        })
                    } else {
                        alert(Message)
                    }

                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const addChuyenMuc = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let { objData } = getState().listtype
            let objDataNew = _.clone(objData, true)
            delete objDataNew['id'];
            axios.post(`${Config.API_URL}listtype/add`, objDataNew)
                .then((response) => {
                    let { StatusCode, Message } = response.data
                    if (StatusCode == 0) {
                        dispatch({
                            type: ADD_NEW_CHUYENMUC,
                            payload: {
                                isOpen: false
                            }
                        })
                    } else {
                        alert(Message)
                    }

                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const deleteChuyenMuc = (id) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL}listtype/delete`, { params: { id: id } })
                .then((response) => {
                    let { StatusCode, Message } = response.data
                    if (StatusCode == 0) {
                        dispatch({
                            type: DELETE_CHUYENMUC,
                            payload: null
                        })
                    } else {
                        alert(Message)
                    }
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListChuyenMuc = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL}listtype`)
                .then((response) => {
                    let { Data } = response.data
                    dispatch({
                        type: GET_LIST_DATA_CHUYENMUC,
                        payload: {
                            list_data: Data || []
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
