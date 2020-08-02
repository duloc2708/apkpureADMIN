import {
    SHOW_LOADING,
    HIDE_LOADING
} from '../types'

export const showLoading = (name) => {
    return {
        type: SHOW_LOADING,
        payload: {
            name: name
        }
    }
}
export const hideLoading = (name) => {
    return {
        type: HIDE_LOADING,
        payload: {
            name: name
        }
    }
}
