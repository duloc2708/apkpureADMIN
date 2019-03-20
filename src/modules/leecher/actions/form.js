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
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL}getLink`, { url: url })
                .then((response) => {
                    let { Data } = response.data
                    dispatch({
                        type: GET_LINK_GAME,
                        payload: {
                            data: Data[0],
                            isDisplay: true
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
