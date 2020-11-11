import {
    GET_LIST_USER,
    GET_LIST_FUNCTION,
    UPDATE_LIST_FUNCTION,
    GET_LIST_FUNCTION_BY_USER
} from '../types'
export const saveListFunction = (data, checked) => {
    return (dispatch, getState) => {
        const { list_function, itemUser } = getState().permision
        return new Promise((resolve, reject) => {
            let list_function_temp = list_function, list_function_insert = []
            list_function_temp.map((item) => {
                item.username = itemUser.username
                if (item.code == data.code) {
                    item.checked = checked
                }
                if (item.checked == true) {
                    list_function_insert.push(item)
                }
                return item
            })
            axios.post(`${Config.API_URL_USER}per/update_list_function`, { username: itemUser.username, data: list_function_insert })
                .then((response) => {
                    const { data } = response.data
                    dispatch({
                        type: UPDATE_LIST_FUNCTION,
                        payload: {
                            list_function: list_function_temp
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListFunctionByUser = (itemData) => {
    return (dispatch, getState) => {
        const { list_function, list_user } = getState().permision
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}per/getListFunction_by_username`, { params: { Username: itemData.username } })
                .then((response) => {
                    const { data } = response.data
                    let data_temp = data, list_function_new = list_function, list_user_temp = list_user
                    if (data_temp.length > 0) {
                        list_function_new.map((itemFunction, i) => {
                            itemFunction.checked = false
                            let checkExists = data_temp.filter(x => x.code == itemFunction.code)
                            if (checkExists.length > 0) {
                                itemFunction.checked = true
                            }
                            return itemFunction
                        })

                    } else {
                        list_function_new.map(x => x.checked = false)
                    }
                    list_user_temp.map((item) => {
                        item.checked = false
                        if (item.username == itemData.username) {
                            item.checked = true
                        }
                        return item
                    })
                    dispatch({
                        type: GET_LIST_FUNCTION_BY_USER,
                        payload: {
                            list_function: list_function_new,
                            list_user: list_user_temp,
                            itemUser: itemData
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListUser = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}per/get_list_user`)
                .then((response) => {
                    const { data } = response.data
                    let data_temp = data
                    data_temp.map(x => x.checked = false)
                    dispatch({
                        type: GET_LIST_USER,
                        payload: {
                            list_user: data_temp
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListFunction = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}per/get_list_function_all`)
                .then((response) => {
                    const { data } = response.data
                    let data_temp = data
                    data_temp.map(x => x.checked = false)
                    dispatch({
                        type: GET_LIST_FUNCTION,
                        payload: {
                            list_function: data_temp
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}