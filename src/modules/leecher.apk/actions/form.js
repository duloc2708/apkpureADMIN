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
            axios.post(`http://61.28.230.226:3001/api/test/getlink`, { id: id })
                .then(function (response) {
                    let { data } = response.data
                    axios({
                        method: 'post',
                        url: `https://api-apk.evozi.com/download`,
                        data: data,
                        config: { headers: { 'Content-Type': 'multipart/form-data' } }
                    })
                        .then(function (response2) {
                            //handle success
                            resolve(response2)
                            console.log(response2);
                        })
                        .catch(function (response2) {
                            //handle error
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
