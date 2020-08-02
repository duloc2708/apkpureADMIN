import {
    GET_LIST_REPORT,
    SHOW_PARAMS_REPORT,
    RESET_INFO_PARAMS,
    ADD_REPORT,
    UPDATE_INPUT_DATA,
    CLICK_CHECK_ROW_REPORT,
    GET_LIST_PARAMS_BY_REPORT,
    UPDATE_DATA_CHART
} from '../types'

let oldUserInfo = SportConfig._getCookie('userInfo')
try {
    oldUserInfo = JSON.parse(SportConfig.function._base64.decode(oldUserInfo))
} catch (e) {
    oldUserInfo = null
}
let username = oldUserInfo && oldUserInfo.user_name || ''
export const getListDataSQL = (dataParams) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let arrAPI = []
            dataParams.map(item => {
                arrAPI.push(
                    axios.post(`${Config.API_URL_USER}report/get_sql`,
                        {
                            sql: item.SQL
                        })
                )
            })
            Promise.all(arrAPI)
                .then((response) => {
                    dataParams.map((item, i) => {
                        const { listParams } = getState().listReport
                        let { data } = response[i].data
                        let listParamsClone = _.clone(listParams, true)
                        listParamsClone.map(itemParams => {
                            if (itemParams.FIELD == item.FIELD) {
                                itemParams.LIST_DATA = data
                            }
                            return itemParams
                        })
                        dispatch({
                            type: GET_LIST_REPORT,
                            payload: {
                                listParams: listParamsClone,
                            }
                        })
                    })
                    resolve(response)
                })
        })

    }
}
export const exportReportExcel = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let { objData, listParams } = getState().listReport
            let listParamsTemp = []
            let sort_data = _.orderBy(listParams, 'ORDERBY', 'asc')
            sort_data.map(item => {
                listParamsTemp.push({ key: item.FIELD, value: item.VALUE, type: item.TYPE, textfield: item.TEXT })
            })
            if (objData.TYPE_CHART != null) {
                axios.post(`${Config.API_URL_USER}report/get_data_report_by_store`,
                    { username: username, TYPE_CHART: objData.TYPE_CHART, code: objData.CODE, TITLE: objData.TITLE, IsRunByCustomize: objData.IsRunByCustomize, store: objData.STORENAME, data: listParamsTemp })
                    .then((response) => {
                        let { data } = response.data
                        dispatch({
                            type: UPDATE_DATA_CHART,
                            payload: {
                                listDataChart: data
                            }
                        })

                        resolve(response)
                    }, (err) => {
                        reject(err)
                    })
            } else {
                axios.post(`${Config.API_URL_USER}report/get_data_report_by_store`,
                    { username, RType: objData.RType, code: objData.CODE, TITLE: objData.TITLE, IsRunByCustomize: objData.IsRunByCustomize, store: objData.STORENAME, data: listParamsTemp },
                    {
                        responseType: 'arraybuffer',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/xlsx'
                        }
                    })
                    .then((response) => {
                        const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), "excel.xlsx");
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', `${objData.TITLE}.xlsx`); //or any other extension
                        document.body.appendChild(link);
                        link.click();
                        resolve(response)
                    }, (err) => {
                        reject(err)
                    })
            }

        })

    }
}
export const updateInputValueParams = (data) => {
    return (dispatch, getState) => {
        dispatch({
            type: GET_LIST_PARAMS_BY_REPORT,
            payload: {
                listParams: data
            }
        })
    }
}

export const checkClickRowReportList = (obj) => {
    return (dispatch, getState) => {
        let { list_data } = getState().listReport
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
                listDataChart: [],
                list_data: list_data_temp
            }
        })
        dispatch(getListParams(obj))
    }
}

export const getListParams = (item) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}report/get_list_params_by_report`, { params: { ADREPORTLISTID: item.ADREPORTLISTID } })
                .then((response) => {
                    let { data } = response.data
                    let dataTemp = _.clone(data, true)
                    let dataSQL = []
                    dataTemp.map(item => {
                        item.VALUE = ''
                        item.LIST_DATA = []
                        if (item.TYPE == 'DATETIME') {
                            let date = new Date();
                            switch (item.DATEVALUE) {
                                case "ENDMONTH":
                                    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                                    item.VALUE = moment(lastDay)
                                    break;
                                case "ENDQUATER":
                                    item.VALUE = moment(moment().endOf('quarter'))
                                    break;
                                case "ENDYEAR":
                                    let lastyear = new Date(new Date().getFullYear(), 11, 31)
                                    item.VALUE = moment(lastyear)
                                    break;
                                case "FIRSTMONTH":
                                    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
                                    item.VALUE = moment(firstDay)
                                    break;
                                case "FIRSTQUATER":
                                    item.VALUE = moment(moment().startOf('quarter'))
                                    break;
                                case "FIRSTYEAR":
                                    let firtsyear = new Date(new Date().getFullYear(), 0, 1);
                                    item.VALUE = moment(firtsyear)
                                    break;
                                default:
                                    item.VALUE = moment()
                                    break;
                            }

                        }
                        if (item.TYPE == 'LIST') {
                            dataSQL.push(item)
                        }
                        return item
                    })
                    let sort_data = _.orderBy(dataTemp, 'ORDERBY', 'asc')
                    dispatch({
                        type: GET_LIST_PARAMS_BY_REPORT,
                        payload: {
                            objData: item,
                            listParams: sort_data,
                        }
                    })
                    if (dataSQL.length > 0) {
                        console.log('dataSQL>>>>>', dataSQL);

                        dispatch(getListDataSQL(dataSQL))
                    }
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
            let oldUserInfo = SportConfig._getCookie('userInfo')
            try {
                oldUserInfo = JSON.parse(SportConfig.function._base64.decode(oldUserInfo))
            } catch (e) {
                oldUserInfo = null
            }
            let username = oldUserInfo && oldUserInfo.user_name || ''
            if (username && username.toUpperCase() == 'ADMIN') {
                username = ''
            }
            axios.get(`${Config.API_URL_USER}report/get_list_report`, { params: { Username: username } })
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