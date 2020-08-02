import {
    CHANGE_PASS_INPUT_DATA
} from '../types'
import { userLogout } from 'modules/login/actions/form'

export const changePassInputData = (obj) => {
    return (dispatch) => {
        dispatch({
            type: CHANGE_PASS_INPUT_DATA,
            payload: {
                objData: obj
            }
        })
    }
}
export const checkPassOld = () => {
    return (dispatch, getState) => new Promise((resolve, reject) => {
        let oldUserInfo = SportConfig._getCookie('userInfo')
        try {
            oldUserInfo = JSON.parse(SportConfig.function._base64.decode(oldUserInfo))
        } catch (e) {
            oldUserInfo = null
        }
        let { objData } = getState().changepassword
        axios.get(`${Config.API_URL_USER}user/check_pass_old`, { params: { Username: oldUserInfo.user_name, Password: Helper.encryptString(objData.passold).toString() } })
            .then((response) => {
                resolve(response)
            }, (err) => {
                reject(err)
            })
    })
}
export const changePassWord = () => {
    return (dispatch, getState) => new Promise((resolve, reject) => {
        let oldUserInfo = SportConfig._getCookie('userInfo')
        try {
            oldUserInfo = JSON.parse(SportConfig.function._base64.decode(oldUserInfo))
        } catch (e) {
            oldUserInfo = null
        }
        let { objData } = getState().changepassword
        axios.get(`${Config.API_URL_USER}user/change_password`, { params: { Username: oldUserInfo.user_name, Password: Helper.encryptString(objData.passnew).toString() } })
            .then((response) => {
                // window.location.reload()
                resolve(response)
            }, (err) => {
                reject(err)
            })
    })
}