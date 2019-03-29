import {
    GET_LIST_DATA_USERS,
    DELETE_USERS,
    ADD_NEW_USERS,
    GET_DETAIL_USERS,
    OPEN_MODAL_DETAIL_USERS,
    UPDATE_INPUT_DATA,
    EDIT_ITEM_USERS,
    CLEAR_DATA_USERS
} from '../types'

export const clearDataUsers = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_DATA_USERS,
            payload: null
        })
    }
}
export const editInputItemUsers = (data) => {
    return (dispatch) => {
        dispatch({
            type: EDIT_ITEM_USERS,
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
export const openModalDetailUsers = (value) => {
    return (dispatch, getState) => {
        dispatch({
            type: OPEN_MODAL_DETAIL_USERS,
            payload: {
                isOpen: value
            }
        })
    }
}
export const editUsers = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let { objData } = getState().users
            let objDataNew = _.clone(objData, true)
            axios.post(`${Config.API_URL}users/update`, objDataNew)
                .then((response) => {
                    let { StatusCode, Message } = response.data
                    if (StatusCode == 0) {
                        dispatch({
                            type: ADD_NEW_USERS,
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
export const addUsers = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let { objData } = getState().users
            let objDataNew = _.clone(objData, true)
            delete objDataNew['id'];
            axios.post(`${Config.API_URL}users/add`, objDataNew)
                .then((response) => {
                    let { StatusCode, Message } = response.data
                    if (StatusCode == 0) {
                        dispatch({
                            type: ADD_NEW_USERS,
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
export const deleteUsers = (id) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL}users/delete`, { params: { id: id } })
                .then((response) => {
                    let { StatusCode, Message } = response.data
                    if (StatusCode == 0) {
                        dispatch({
                            type: DELETE_USERS,
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
export const getListUsers = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL}users`)
                .then((response) => {
                    let { Data } = response.data
                    dispatch({
                        type: GET_LIST_DATA_USERS,
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
