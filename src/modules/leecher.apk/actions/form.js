import {
    GET_LINK_GAME,
    CHANGE_LINK_GAME,
    RESET_LEECH
} from '../types'



export const resetLeech = (value) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: RESET_LEECH,
                payload: null
            })
        })
    }
}
export const changeUrl = (value) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: CHANGE_LINK_GAME,
                payload: {
                    url: value
                }
            })
        })
    }
}
export const getListGame = () => {
    return (dispatch, getState) => {
        let { url } = getState().leecher
        let id = url
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL}getapk`, { id: id })
                .then((response) => {
                    // let { Data } = response.data
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
