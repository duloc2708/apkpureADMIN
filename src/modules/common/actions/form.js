import {
    COMMON_CHECK_CODE_EXISTS,
    PREVIOUS_PAGE_PRODUCTS,
    NEXT_PAGE_PRODUCTS,
    CHANGE_PAGE_TABLE,
    UPDATE_INFO_PAGE,
    RESET_INFO_PAGE
} from '../types'
export const updateTotalInPage = (total) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: UPDATE_INFO_PAGE,
                payload: {
                    total: total
                }
            })
            resolve(UPDATE_INFO_PAGE)
        })
    }
}
export const resetInfoPage = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: RESET_INFO_PAGE,
                payload: null
            })
            resolve(RESET_INFO_PAGE)
        })
    }
}
export const updateInfoPage = (totalRows) => {
    return (dispatch, getState) => {
        let { total, endPage } = getState().common
        let totalPage = Math.ceil(totalRows / total)
        let endPage_temp = totalPage > 10 ? endPage : totalPage
        dispatch({
            type: UPDATE_INFO_PAGE,
            payload: {
                totalRows: totalRows,
                endPage: endPage_temp,
                totalPage: totalPage
            }
        })
    }
}
export const ChangePage = (value) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: CHANGE_PAGE_TABLE,
                payload: {
                    page: value
                }
            })
            resolve(CHANGE_PAGE_TABLE)
        })
    }
}
export const onNextPageProduct = (type) => {
    return (dispatch, getState) => new Promise((resolve, reject) => {
        let startPage_new, endPage_new, totalPage_new;

        let { startPage, endPage, totalPage } = getState().common
        startPage_new = startPage
        endPage_new = endPage
        totalPage_new = totalPage

        let endPage_temp = endPage_new + 10
        if (totalPage > 1) {
            if (endPage_temp < totalPage_new) {
                dispatch({
                    type: NEXT_PAGE_PRODUCTS,
                    payload: {
                        startPage: endPage_new + 1,
                        endPage: endPage_temp < totalPage_new ? endPage_temp : totalPage_new,
                        page: endPage_new + 1
                    }
                })
            } else {
                dispatch({
                    type: NEXT_PAGE_PRODUCTS,
                    payload: {
                        startPage: endPage_new + 1,
                        page: endPage_new + 1,
                        endPage: totalPage_new
                    }
                })
            }
        }

        resolve(NEXT_PAGE_PRODUCTS)

    })
}
export const onPreviousPageProduct = (type) => {
    return (dispatch, getState) => new Promise((resolve, reject) => {
        let startPage_new, endPage_new, totalPage_new;
        let { startPage, endPage, totalPage } = getState().common
        startPage_new = startPage
        endPage_new = endPage
        totalPage_new = totalPage
        if (endPage_new - 10 >= 10) {
            dispatch({
                type: PREVIOUS_PAGE_PRODUCTS,
                payload: {
                    startPage: startPage_new - 10,
                    page: startPage_new - 10,
                    endPage: endPage_new - 10
                }
            })
        } else {
            dispatch({
                type: PREVIOUS_PAGE_PRODUCTS,
                payload: {
                    startPage: 1,
                    page: 1,
                    endPage: 10
                }
            })
        }
        resolve(PREVIOUS_PAGE_PRODUCTS)

    })
}
export const checkCodeExistsByTable = (params = { field: '', value: '', table: '' }) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}common/check_code_exists_by_table`,
                { params })
                .then((response) => {
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}