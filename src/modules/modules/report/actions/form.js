import {
    GET_OT_LIST_TYPE,
    CHANGE_CODE_TYPE,
    GET_OT_LIST_ALL,
    GET_LIST_CONFIG,
    GET_LIST_DATA_REPORT,
    GET_LIST_ORDER,
    CHANGE_ORDER_FILTER
} from '../types'
export const getLisOrderInReport = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}report/get_list_order`)
                .then((response) => {
                    let { data } = response.data
                    dispatch({
                        type: GET_LIST_ORDER,
                        payload: {
                            listOrder: data
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getStoneBagSummaryByOrder = (IdOrder) => {
    return (dispatch, getState) => {
        let { listHeaderTable } = getState().report
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}report/getStoneBagSummaryByOrder`, { params: { IdOrder: IdOrder } })
                .then((response) => {
                    let { data } = response.data
                    let listCol = listHeaderTable.filter(x => x.code == '002')
                    dispatch({
                        type: GET_LIST_DATA_REPORT,
                        payload: {
                            list_data: data,
                            listColByReport: listCol[0].listcol
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getStoneSummaryByOrder = (IdOrder) => {
    return (dispatch, getState) => {
        let { listHeaderTable } = getState().report
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}report/getStoneSummaryByOrder`, { params: { IdOrder: IdOrder } })
                .then((response) => {
                    let { data } = response.data
                    let listCol = listHeaderTable.filter(x => x.code == '001')
                    dispatch({
                        type: GET_LIST_DATA_REPORT,
                        payload: {
                            list_data: data,
                            listColByReport: listCol[0].listcol
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListConfig = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}common/list_config`)
                .then((response) => {
                    let { data } = response.data
                    dispatch({
                        type: GET_LIST_CONFIG,
                        payload: {
                            list_config: data
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const selectOrderInReport = (obj) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_ORDER_FILTER,
            payload: { IdOrder: obj.value }
        })
    }
}
export const exportDataDynamic = () => {
    return (dispatch, getState) => {
        let { list_data, listColByReport } = getState().report
        let { listReport } = SportConfig || {}
        const type = Helper.getParam(window.location.href, 'type')
        // listReport = listReport.filter(x => x.type == type)

        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}report/exportDataDynamic`,
                { Data: list_data, listCol: listColByReport },
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
                    link.setAttribute('download', `Data_${Math.floor((Math.random() * 100000) + 1)}.xlsx`); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}