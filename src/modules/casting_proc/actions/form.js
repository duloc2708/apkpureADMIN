import {
    GET_LIST_CASTING_PROC
} from '../types'


export const getListDataCastingProc = (params = { page: 1, total: 50 }) => {
    return (dispatch, getState) => {
        let { page, total, endPage } = getState().common
        let pageParams = {
            page: page,
            total: total
        }
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}casting_proc`, { page: params.page, total: params.total })
                .then((response) => {
                    let { data } = response.data
                    let data_temp = data
                    data_temp.map(item => item.checked = false)
                    let totalRows = data_temp && data_temp[0] && data_temp[0].totalRows
                    dispatch({
                        type: GET_LIST_CASTING_PROC,
                        payload: {
                            list_data: data_temp || [],
                            isDetail: false
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