import {
    GET_LIST_USER,
    GET_LIST_FUNCTION,
    UPDATE_LIST_FUNCTION,
    GET_LIST_FUNCTION_BY_USER,
    GET_LIST_BUTTON,
    GET_LIST_BUTTON_BY_USER,
    UPDATE_LIST_BUTTON,
    RESET_LIST_FUNCTION,
    GET_LIST_REPORT_PER
} from '../types'
export const saveListButtonAll = (itemFunc, status) => {
    return (dispatch, getState) => {
        const { list_function, itemUser, list_btncustom_by_page } = getState().permision
        const { listButton } = getState().toolbar
        return new Promise((resolve, reject) => {
            let list_function_temp = _.clone(list_function, true), list_function_insert = []
                , itemListBtn = [], list_function_default = []
            list_function_temp.map(item => {
                let itemBtnCustom = list_btncustom_by_page.filter(x => x.page == item.code)[0].listbtn

                let itemTemp = _.clone(item, true)
                if (itemTemp.code == itemFunc.code) {
                    itemTemp.checkedAll = status
                    listButton.map((item) => {
                        itemListBtn.push({ name: item.code, status: status })
                    })
                    itemTemp.list_button = itemListBtn
                }
                let strListBtn = ''
                itemTemp.list_button.map(itemBtn => {
                    if (itemBtn.status)
                        strListBtn = strListBtn + itemBtn.name + ','
                })
                if (status && itemTemp.code == itemFunc.code) {
                    itemBtnCustom.map((itemitemBtnCustom, i) => {
                        strListBtn = strListBtn + itemitemBtnCustom.code + ','
                    })
                }
                if (strListBtn) {
                    strListBtn = strListBtn.substr(0, strListBtn.length - 1)
                }
                if (itemTemp.code == itemFunc.code) {
                    itemTemp.strListBtn = strListBtn || ''
                    itemTemp.strListAction = strListBtn || ''
                }
                itemTemp.username = itemUser.username
                if (itemTemp.checked) {
                    list_function_insert.push(itemTemp)
                }
                list_function_default.push(itemTemp)
            })
            axios.post(`${Config.API_URL_USER}per/update_list_function`, { username: itemUser.username, data: list_function_insert })
                .then((response) => {
                    const { data } = response.data
                    dispatch({
                        type: UPDATE_LIST_FUNCTION,
                        payload: {
                            list_function: list_function_default
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const saveListButton = (itemFunc, codeBtn, status) => {
    return (dispatch, getState) => {
        const { list_function, itemUser } = getState().permision
        const { listButton } = getState().toolbar
        return new Promise((resolve, reject) => {
            let list_function_temp = _.clone(list_function, true), list_function_insert = []
                , itemListBtn = [], list_function_default = []
            list_function_temp.map(item => {
                let itemTemp = _.clone(item, true)
                if (itemTemp.code == itemFunc.code) {
                    listButton.map((item) => {
                        let checkCode = itemTemp.list_button.filter(x => x.name == item.code)
                        itemListBtn.push({ name: item.code, status: checkCode[0].status })
                    })
                    itemListBtn.map(itemBtn => {
                        if (itemBtn.name == codeBtn) {
                            itemBtn.status = status
                        }
                        return itemBtn
                    })
                    itemTemp.list_button = itemListBtn

                }
                let strListBtn = ''
                itemTemp.list_button.map(itemBtn => {
                    if (itemBtn.status)
                        strListBtn = strListBtn + itemBtn.name + ','
                })
                if (strListBtn) {
                    strListBtn = strListBtn.substr(0, strListBtn.length - 1)
                }
                itemTemp.strListBtn = strListBtn || ''
                itemTemp.username = itemUser.username

                // Cập nhật list action 
                if (itemTemp.code == itemFunc.code) {
                    let strListAction = itemTemp.strListAction || ''
                    let strCode = `,${codeBtn}`
                    if (status) {
                        itemTemp.strListAction = strListAction + ',' + codeBtn
                    } else {
                        if (itemTemp.strListAction.indexOf(strCode) != -1) {
                            itemTemp.strListAction = strListAction && strListAction.replace(strCode, '') || ''
                        } else {
                            itemTemp.strListAction = strListAction && strListAction.replace(codeBtn + ',', '') || ''
                        }
                    }
                }
                if (itemTemp.checked) {
                    list_function_insert.push(itemTemp)
                }
                list_function_default.push(itemTemp)
            })

            axios.post(`${Config.API_URL_USER}per/update_list_function`, { username: itemUser.username, data: list_function_insert })
                .then((response) => {
                    const { data } = response.data
                    dispatch({
                        type: UPDATE_LIST_FUNCTION,
                        payload: {
                            list_function: list_function_default
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const saveListButtonByPage = (itemFunc, codeBtn, status) => {
    return (dispatch, getState) => {
        const { list_function, itemUser } = getState().permision
        const { listButton } = getState().toolbar
        return new Promise((resolve, reject) => {
            let list_function_temp = _.clone(list_function, true), list_function_insert = []
                , list_function_default = []
            list_function_temp.map(item => {
                let itemTemp = _.clone(item, true)
                if (itemTemp.code == itemFunc.code) {
                    if (status) {
                        itemTemp.strListAction = itemTemp.strListAction + ',' + codeBtn
                    } else {
                        let strListAction = itemTemp.strListAction || ''
                        let strCode = `,${codeBtn}`
                        if (itemTemp.strListAction.indexOf(strCode) != -1) {
                            itemTemp.strListAction = strListAction && strListAction.replace(strCode, '') || ''
                        } else {
                            itemTemp.strListAction = strListAction && strListAction.replace(codeBtn + ',', '') || ''
                        }
                    }
                }
                itemTemp.strListBtn = itemTemp.strListAction
                itemTemp.username = itemUser.username
                if (itemTemp.checked) {
                    list_function_insert.push(itemTemp)
                }
                list_function_default.push(itemTemp)
            })

            axios.post(`${Config.API_URL_USER}per/update_list_function`, { username: itemUser.username, data: list_function_insert })
                .then((response) => {
                    const { data } = response.data
                    dispatch({
                        type: UPDATE_LIST_FUNCTION,
                        payload: {
                            list_function: list_function_default
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const saveListFunction = (data, checked) => {
    return (dispatch, getState) => {
        const { list_function, itemUser } = getState().permision
        return new Promise((resolve, reject) => {
            let list_function_temp = _.clone(list_function, true), list_function_insert = []
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
export const resetListFunctionReport = () => {
    return (dispatch, getState) => {
        let { list_report } = getState().permision
        list_report.map(x => x.checked = false)
        return new Promise((resolve, reject) => {
            dispatch({
                type: RESET_LIST_FUNCTION,
                payload: {
                    list_function: [],
                    list_report: list_report
                }
            })
            resolve(RESET_LIST_FUNCTION)
        })
    }
}
export const updateListReportByUser = (objItem, status) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            const { list_report, itemUser } = getState().permision
            let list_reportTemp = _.clone(list_report, true)
            let list_reportInsert = []
            list_reportTemp.map(item => {
                if (objItem.CODE == item.CODE) {
                    item.checked = status
                }
                if (item.checked) {
                    list_reportInsert.push({
                        username: itemUser.username,
                        codereport: item.CODE
                    })
                }
                return item
            })

            axios.post(`${Config.API_URL_USER}per/update_list_report_by_user`, { data: list_reportInsert, username: itemUser.username })
                .then((response) => {
                    dispatch({
                        type: GET_LIST_REPORT_PER,
                        payload: {
                            list_report: list_reportTemp
                        }
                    })
                    resolve(GET_LIST_REPORT_PER)
                }, (err) => {
                    reject(err)
                })

        })
    }
}

export const getListFunctionByUser = (itemData) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}per/getListFunction_by_username`, { params: { Username: itemData.username } })
                .then((response) => {
                    const { list_function_default, list_user } = getState().permision
                    const { listButton } = getState().toolbar
                    const { data } = response.data
                    let data_temp = data, list_function_new = _.clone(list_function_default, true), list_user_temp = list_user
                    if (data_temp.length > 0) {
                        list_function_new.map((itemFunction, i) => {
                            itemFunction.checkedAll = false
                            itemFunction.checked = false
                            itemFunction.strListBtn = ''
                            let listButtonTemp = _.clone(listButton, true)
                            let checkExists = data_temp.filter(x => x.code == itemFunction.code)
                            if (checkExists.length > 0) {
                                itemFunction.strListAction = checkExists[0].list_action
                                itemFunction.strListBtn = checkExists[0].strListBtn
                                itemFunction.checked = true
                                // update permisson button
                                if (checkExists[0].strListBtn) {
                                    let itemListBtn = []
                                    let itemListBtnTemp = checkExists[0].strListBtn.split(',')
                                    listButtonTemp.map((itemBtn) => {
                                        let statusTemp = false
                                        let checkExistsBtn = itemListBtnTemp.filter(x => x == itemBtn.code)
                                        if (checkExistsBtn.length > 0) {
                                            statusTemp = true
                                        }
                                        itemListBtn.push({ name: itemBtn.code, status: statusTemp })
                                    })
                                    itemFunction.list_button = itemListBtn
                                } else {
                                    let itemListBtn = []
                                    listButtonTemp.map((itemBtn) => {
                                        itemListBtn.push({ name: itemBtn.code, status: false })
                                    })
                                    itemFunction.list_button = itemListBtn
                                }
                            } else {
                                let itemListBtn = []
                                listButtonTemp.map((itemBtn) => {
                                    itemListBtn.push({ name: itemBtn.code, status: false })
                                })

                                itemFunction.list_button = itemListBtn
                            }
                            return itemFunction
                        })

                    } else {

                        list_function_new.map(x => x.checked = false)
                        list_function_new.map(x => x.checkedAll = false)
                        list_function_new.map(x => x.strListBtn = '')
                        list_function_new.map(x => {
                            x.list_button = []
                            let listButtonTemp = _.clone(listButton, true)
                            let itemListBtn = []
                            listButtonTemp.map((itemBtn) => {
                                itemListBtn.push({ name: itemBtn.code, status: false })
                            })
                            x.list_button = itemListBtn
                            return x
                        })
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
                    resolve(list_function_new)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListButtonByUser = (itemData) => {
    return (dispatch, getState) => {
        const { list_button, list_user } = getState().permision
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}per/getListButton_by_username`, { params: { Username: itemData.username } })
                .then((response) => {
                    const { data } = response.data
                    let data_temp = data, list_button_new = _.clone(list_button, true), list_user_temp = list_user
                    if (data_temp.length > 0) {
                        list_button_new.map((item, i) => {
                            item.checked = false
                            let checkExists = data_temp.filter(x => x.code == item.code)
                            if (checkExists.length > 0) {
                                item.checked = true
                            }
                            return item
                        })

                    } else {
                        list_button_new.map(x => x.checked = false)
                    }
                    list_user_temp.map((item) => {
                        item.checked = false
                        if (item.username == itemData.username) {
                            item.checked = true
                        }
                        return item
                    })
                    dispatch({
                        type: GET_LIST_BUTTON_BY_USER,
                        payload: {
                            list_button: list_button_new,
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

export const getListButton = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            const { listButton } = getState().toolbar
            let data_temp = _.clone(listButton, true)
            data_temp.map(x => x.checked = false)
            dispatch({
                type: GET_LIST_BUTTON,
                payload: {
                    list_button: data_temp
                }
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
                    const { listButton } = getState().toolbar
                    let data_temp = data
                    data_temp.map(x => x.checked = false)

                    let itemListBtn = [], listButtonTemp = _.clone(listButton, true)
                    listButtonTemp.map((item) => {
                        itemListBtn.push({ name: item.code, status: false })
                    })
                    data_temp.map((item) => {
                        item.list_button = _.clone(itemListBtn, true)
                        return item
                    })
                    dispatch({
                        type: GET_LIST_FUNCTION,
                        payload: {
                            list_function: data_temp,
                            list_function_default: data_temp
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}

export const getListReportByUser = (item) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}per/get_list_report_by_user`, { params: { Username: item.username } })
                .then((response) => {
                    const { list_report } = getState().permision
                    let list_reportTemp = _.clone(list_report, true)
                    let { data } = response.data
                    list_reportTemp.map(item => {
                        data.map(itemData => {
                            if (itemData.codereport == item.CODE) {
                                item.checked = true
                            }
                        })
                        return item
                    })
                    dispatch({
                        type: GET_LIST_REPORT_PER,
                        payload: {
                            list_report: list_reportTemp || []
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListDataReport = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}report/get_list_report`)
                .then((response) => {
                    let { data } = response.data
                    let list_data = data
                    list_data.map(x => x.checked = false)
                    dispatch({
                        type: GET_LIST_REPORT_PER,
                        payload: {
                            list_report: data || []
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}