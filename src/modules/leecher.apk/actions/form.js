import {
    GET_LINK_GAME,
    CHANGE_LINK_GAME,
    RESET_LEECH,
    IS_SEARCH
} from '../types'

export const searchGame = (value) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: IS_SEARCH,
                payload: {
                    isSearch: value
                }
            })
        })
    }
}

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
export const getListGame = (idgame = '') => {
    return (dispatch, getState) => {
        let { url } = getState().leecher
        let id = idgame ? idgame : url
        dispatch(searchGame(true))
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL}getapk`, { id: id })
                .then(function (response) {
                    let { Data } = response.data
                    axios({
                        method: 'post',
                        url: `https://api-apk.evozi.com/download`,
                        data: Data,
                        config: { headers: { 'Content-Type': 'multipart/form-data' } }
                    })
                        .then(function (response2) {
                            let { data } = response2
                            dispatch({
                                type: GET_LINK_GAME,
                                payload: {
                                    data: data
                                }
                            })
                            dispatch(searchGame(false))
                            //handle success
                            resolve(response2)
                        })
                        .catch(function (response2) {
                            //handle error
                            dispatch(searchGame(false))
                            reject(response2)
                            console.log(response2);
                        });
                })
                .catch(function (response) {
                    //handle error
                    console.log(response);
                });
        })
    }
}
