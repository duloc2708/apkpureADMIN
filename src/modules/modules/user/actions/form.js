// import {
//     LOGIN_REQUEST,
//     LOGIN_SUCCESS,
//     LOGIN_FAILURE,
//     LOGIN_RESET,
//     LOGIN_FORM_CHANGE,
//     USER_LOGOUT
// } from '../types'
// import { LOADING, LOADED } from 'modules/dimmer/types'
// export const requestLogin = (params) => {
//     return (dispatch) => {
//         return new Promise((resolve, reject) => {
//             dispatch({
//                 type: LOADING
//             })
//             axios.post(`${Config.API_URL_USER}user/login/1`, params) //param !=0(user bet !admin)
//                 .then((response) => {
//                     dispatch({
//                         type: LOGIN_RESET,
//                         payload: null
//                     })
//                     dispatch({
//                         type: LOADED,
//                         payload: null
//                     })
//                     if (response &&
//                         response.data &&
//                         response.data.StatusCode == 0) {
//                         let data = response.data.Data
//                         let userInfo = _.clone(data, true)
//                             // localStorage.setItem('userInfo', SportConfig.function._base64.encode(JSON.stringify(userInfo)))
//                             // localStorage.setItem('token', response.data.Token)
//                         SportConfig._setCookie('userInfo', SportConfig.function._base64.encode(JSON.stringify(userInfo)))
//                         SportConfig._setCookie('token', response.data.Token)
//                         dispatch({
//                             type: LOGIN_SUCCESS,
//                             payload: {
//                                 token: response.data.Token
//                             }
//                         })
//                     } else {
//                         dispatch({
//                             type: LOGIN_FAILURE,
//                             payload: {
//                                 validate: 'validate'
//                             }
//                         })
//                     }
//                     resolve(response)
//                 }, (err) => {
//                     dispatch({
//                         type: LOGIN_RESET,
//                         payload: null
//                     })
//                     dispatch({
//                         type: LOADED,
//                         payload: null
//                     })
//                     dispatch({
//                         type: LOGIN_FAILURE,
//                         payload: {
//                             validate: 'validate'
//                         }
//                     })
//                     reject(err)
//                 })
//         })
//     }
// }
// export const resetLogin = () => {
//     return (dispatch) => {
//         dispatch({
//             type: LOGIN_RESET,
//             payload: null
//         })
//     }
// }
// export const formChange = (field, value) => {
//     return (dispatch) => {
//         dispatch({
//             type: LOGIN_FORM_CHANGE,
//             payload: {
//                 field,
//                 value
//             }
//         })
//     }
// }
// export const userLogout = () => {
//     return (dispatch) => {
//         SportConfig._removeCookie('token')
//         SportConfig._removeCookie('userInfo')
//         SportConfig._removeCookie('betSetting')
//         SportConfig._removeCookie('localParlay')
//         SportConfig._removeCookie('localTicket')
//         SportConfig._removeCookie('localFavourite')
//         dispatch({
//             type: USER_LOGOUT,
//             payload: null
//         })
//     }
// }
// export const getMaxMinBetSetting = () => {
//     return (dispatch) => {
//         return new Promise((resolve, reject) => {
//             let arrPromise = []
//             arrPromise.push(axios.get(`${Config.API_URL_USER}user/get_bet_settings/0`))
//             arrPromise.push(axios.get(`${Config.API_URL_USER}league_permission/get_max_min_bet_for_league`))
//             Promise.all(arrPromise)
//                 .then((response) => {
//                     const userSetting = (response && response[0]) ? response[0].data : {}
//                     const leagueSetting = (response && response[1]) ? response[1].data : {}
//                     const dataUserSetting = userSetting.Data || []
//                     const dataLeagueSetting = leagueSetting.Data || []
//                     let finalSetting = null
//                     dataLeagueSetting.map((leagueSet, iLS) => {
//                         const sport = leagueSet.sport
//                         const sportid = sport.sportid
//                         let defaultSetting = null
//                         let maxSetting = null
//                         dataUserSetting.map((userS, uS) => {
//                             if (userS.sportid == 0 &&
//                                 !userS.sport) {
//                                 //default normal
//                                 defaultSetting = userS
//                             }
//                             if (userS && userS.sport &&
//                                 userS.sport.sportid == 100) {
//                                 //default parlay
//                                 dataLeagueSetting.push(userS)
//                             }
//                             if (userS &&
//                                 userS.sport &&
//                                 userS.sport.sportid == sportid) {
//                                 maxSetting = userS
//                             }
//                         })
//                         finalSetting = maxSetting ? maxSetting : defaultSetting
//                         if (finalSetting &&
//                             finalSetting.minbet > leagueSet.minbet) {
//                             dataLeagueSetting[iLS].minbet = finalSetting.minbet
//                         }
//                         if (finalSetting &&
//                             finalSetting.maxbet < leagueSet.maxbet) {
//                             dataLeagueSetting[iLS].maxbet = finalSetting.maxbet
//                         }
//                     })
//                     dataLeagueSetting.push(finalSetting)
//                     dataUserSetting.map((userS, uS) => {
//                             if (userS.sport) { //not default
//                                 dataLeagueSetting.push(userS)
//                             }
//                         })
//                         // localStorage.setItem('betSetting', SportConfig.function._base64.encode(JSON.stringify(dataLeagueSetting)))
//                     SportConfig._setCookie('betSetting', SportConfig.function._base64.encode(JSON.stringify(dataLeagueSetting)))
//                     resolve(response)
//                 }, (err) => {
//                     reject(err)
//                 })
//         })
//     }
// }
