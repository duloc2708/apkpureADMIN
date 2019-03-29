import {
    GET_LIST_DATA_PAGE_SERVICE,
    DELETE_PAGE_SERVICE,
    ADD_NEW_PAGE_SERVICE,
    GET_DETAIL_PAGE_SERVICE,
    OPEN_MODAL_DETAIL_PAGE_SERVICE,
    UPDATE_INPUT_DATA,
    EDIT_ITEM_PAGE_SERVICE,
    CLEAR_DATA_PAGE_SERVICE
} from '../types'

export const changeInputContentService = (content) => {
    return (dispatch, getState) => {
        let { objData } = getState().pageservice
        let objData_temp = _.clone(objData, true)
        objData_temp["content"] = content
        dispatch({
            type: UPDATE_INPUT_DATA,
            payload: {
                objData: objData_temp
            }
        })
        // relaceAllImageContent(content, objData_temp.title)
    }
}
export const clearDataPageService = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_DATA_PAGE_SERVICE,
            payload: null
        })
    }
}
export const editInputItemPageService = (data) => {
    return (dispatch) => {
        dispatch({
            type: EDIT_ITEM_PAGE_SERVICE,
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
export const openModalDetailPageService = (value) => {
    return (dispatch, getState) => {
        dispatch({
            type: OPEN_MODAL_DETAIL_PAGE_SERVICE,
            payload: {
                isOpen: value
            }
        })
    }
}
export const editPageService = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let { objData } = getState().pageservice
            let objDataNew = _.clone(objData, true)
            axios.post(`${Config.API_URL}pageservice/update`, objDataNew)
                .then((response) => {
                    let { StatusCode, Message } = response.data
                    if (StatusCode == 0) {
                        dispatch({
                            type: ADD_NEW_PAGE_SERVICE,
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
export const addPageService = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let { objData } = getState().pageservice
            let objDataNew = _.clone(objData, true)
            delete objDataNew['id'];
            axios.post(`${Config.API_URL}pageservice/add`, objDataNew)
                .then((response) => {
                    let { StatusCode, Message } = response.data
                    if (StatusCode == 0) {
                        dispatch({
                            type: ADD_NEW_PAGE_SERVICE,
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
export const deletePageService = (id) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL}pageservice/delete`, { params: { id: id } })
                .then((response) => {
                    let { StatusCode, Message } = response.data
                    if (StatusCode == 0) {
                        dispatch({
                            type: DELETE_PAGE_SERVICE,
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
export const getListPageService = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL}pageservice`)
                .then((response) => {
                    let { Data } = response.data
                    dispatch({
                        type: GET_LIST_DATA_PAGE_SERVICE,
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
