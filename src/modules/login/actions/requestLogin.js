import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_RESET,
    LOGIN_FORM_CHANGE,
    USER_LOGOUT,
    SET_TOKEN,
    GET_BET_SETTING
} from '../types'
const requestLogin = (params) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL}users/login`, params) //param !=0(user bet !admin)
                .then((response) => {
                    dispatch({
                        type: LOGIN_RESET,
                        payload: { username: params.username, password: '' }
                    })
                    let { Data, Message, StatusCode } = response.data
                    if (StatusCode == 0 && Data) {
                        Helper._setCookie('token', Data)
                        dispatch({
                            type: LOGIN_SUCCESS,
                            payload: {
                                token: Data
                            }
                        })
                    } else {
                        dispatch({
                            type: LOGIN_FAILURE,
                            payload: {
                                validate: 'validate'
                            }
                        })
                    }
                    resolve(response)
                }, (err) => {
                    dispatch({
                        type: LOGIN_RESET,
                        payload: { username: params.Username, password: '' }
                    })
                    dispatch({
                        type: LOGIN_FAILURE,
                        payload: {
                            validate: 'validate'
                        }
                    })
                    reject(err)
                })
        })
    }
}
module.exports = requestLogin