import {
    GET_LIST_REPORT,
    SHOW_PARAMS_REPORT,
    RESET_INFO_PARAMS,
    ADD_REPORT,
    UPDATE_INPUT_DATA,
    LOAD_FORM_REPORT,
    CLICK_CHECK_ROW_REPORT,
    ADD_PARAMS_REPORT,
    CLEAR_PARAMS_REPORT
} from '../types'

export const removeParams = (item) => {
    return (dispatch, getState) => {
        let { listParams } = getState().createReport
        let listParamsTemp = _.clone(listParams, true)
        listParamsTemp = listParamsTemp.filter(x => x.FIELD != item.FIELD)
        dispatch({
            type: SHOW_PARAMS_REPORT,
            payload: {
                listParams: listParamsTemp
            }
        })
    }
}
export const showParams = () => {
    return (dispatch, getState) => {
        let { objParams } = getState().createReport
        dispatch({
            type: SHOW_PARAMS_REPORT,
            isShow: true
        })
    }
}
export const loadFormReport = () => {
    return (dispatch, getState) => {
        dispatch({
            type: LOAD_FORM_REPORT,
            payload: null
        })
    }
}

export const clearParamsReport = () => {
    return (dispatch, getState) => {
        dispatch({
            type: CLEAR_PARAMS_REPORT,
            payload: {
                listParams: [],
                isShow: false,
                objParams: {
                    FIELD: '',
                    TEXT: '',
                    FORMAT: '',
                    SQL: '',
                    ORDERBY: '',
                    TYPE: '',
                    ISREQUIRE: ''
                }
            }
        })
    }
}
export const addItemParams = () => {
    return (dispatch, getState) => {
        let { objParams, listParams } = getState().createReport
        let listParamsTemp = _.clone(listParams, true)
        let objParamsTemp = _.clone(objParams, true)
        listParamsTemp.push(objParamsTemp)
        dispatch({
            type: ADD_PARAMS_REPORT,
            payload: {
                listParams: listParamsTemp
            }
        })
    }
}
export const updateInputItem = (obj) => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_INPUT_DATA,
            payload: {
                objData: obj
            }
        })
    }
}

export const editRowsParams = (data) => {
    return (dispatch, getState) => {
        let { listParams } = getState().createReport
        let listParamsTemp = _.clone(listParams, true)
        listParamsTemp.map(item => {
            item.checked = false
            if (item.FIELD == data.FIELD) {
                item.checked = true
            }
            return item
        })
        dispatch({
            type: GET_LIST_REPORT,
            payload: {
                listParams: listParamsTemp,
                objParams: data
            }
        })
    }
}
export const updateInputItemParams = (obj) => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_INPUT_DATA,
            payload: {
                objParams: obj
            }
        })
    }
}
export const resetInfoParams = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: RESET_INFO_PARAMS,
                payload: null
            })
            dispatch({
                type: LOAD_FORM_REPORT,
                payload: null
            })
            resolve(LOAD_FORM_REPORT)
        })

    }
}
export const checkClickRowReport = (obj) => {
    return (dispatch, getState) => {
        let { list_data } = getState().createReport
        let list_data_temp = _.clone(list_data, true)
        list_data_temp.map(x => x.checked = false)
        list_data_temp.map(item => {
            if (item.ADREPORTLISTID == obj.ADREPORTLISTID) {
                item.checked = true
            }
            return item
        })
        dispatch({
            type: CLICK_CHECK_ROW_REPORT,
            payload: {
                objData: obj,
                list_data: list_data_temp
            }
        })
    }
}
export const copyReport = (item) => {
    return (dispatch, getState) => {
        let itemClone = _.clone(item, true)
        itemClone["CODE"] = itemClone["CODE"] + '_COPY'
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}report/add_report`, itemClone)
                .then((responseAdd) => {
                    resolve(responseAdd)
                }, (err) => {
                    reject(err)
                })
        })

    }
}
export const updateReport = (item) => {
    return (dispatch, getState) => {
        let { objData } = getState().createReport

        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}report/update_report`, objData)
                .then((response) => {
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })

    }
}
export const addListParams = (item) => {
    return (dispatch, getState) => {
        let { listParams, objData } = getState().createReport
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}report/add_list_params`, { ADREPORTLISTID: objData.ADREPORTLISTID, data: listParams })
                .then((response) => {
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })

    }
}

export const addReport = (item) => {
    return (dispatch, getState) => {
        let { objData } = getState().createReport
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}report/add_report`, objData)
                .then((response) => {
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })

    }
}
export const getListParams = (item) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}report/get_list_params_by_report`, { params: { ADREPORTLISTID: item.ADREPORTLISTID } })
                .then((response) => {
                    let { data } = response.data
                    let dataTemp = data
                    dataTemp.map(x => x.checked = false)
                    dispatch({
                        type: SHOW_PARAMS_REPORT,
                        payload: {
                            objData: item,
                            listParams: data,
                            isShow: true
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
            axios.get(`${Config.API_URL_USER}report/get_list_report_config`)
                .then((response) => {
                    let { data } = response.data
                    let list_data = data
                    list_data.map(x => x.checked = false)
                    dispatch({
                        type: GET_LIST_REPORT,
                        payload: {
                            list_data: data || []
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}