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

import { LOADING, LOADED } from 'modules/dimmer/types'
import { resetToolbar } from 'modules/toolbar/actions/form'

export const userLogout = () => {
    
    return (dispatch) => {
        SportConfig._removeCookie('token')
        SportConfig._removeCookie('userInfo')
        dispatch(resetToolbar())
        dispatch({
            type: USER_LOGOUT,
            payload: null
        })
    }
}

export const requestLogin = (params) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: LOADING
            })
            axios.post(`${Config.API_URL_USER}user/login`, params) //param !=0(user bet !admin)
                .then((response) => {
                    dispatch({
                        type: LOGIN_RESET,
                        payload: { username: params.Username, password: '' }
                    })
                    dispatch({
                        type: LOADED,
                        payload: null
                    })
                    if (response &&
                        response.data &&
                        response.data.StatusCode == 0) {
                        let data = response.data.Data
                        let userInfo = _.clone(data, true)
                        localStorage.setItem('userInfo', SportConfig.function._base64.encode(JSON.stringify(userInfo)))
                        localStorage.setItem('token', response.data.Token)
                        SportConfig._setCookie('userInfo', SportConfig.function._base64.encode(JSON.stringify(userInfo)))
                        SportConfig._setCookie('token', response.data.Token)
                        dispatch({
                            type: LOGIN_SUCCESS,
                            payload: {
                                token: response.data.Token,
                                username: data.user_name
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
                        type: LOADED,
                        payload: null
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
export const formChange = (field, value) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_FORM_CHANGE,
            payload: {
                field,
                value
            }
        })
    }
}
export const setToken = (token) => (dispatch) => {
    return {
        type: SET_TOKEN,
        payload: {
            token: token
        }
    }
}