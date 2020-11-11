// import {
//     LOGIN_REQUEST,
//     LOGIN_SUCCESS,
//     LOGIN_FAILURE,
//     LOGIN_PENDING,
//     LOGIN_COMPLETE,
//     LOGIN_RESET,
//     LOGIN_FORM_CHANGE,
//     USER_LOGOUT
// }
// from '../types'
// const fields = { username: '', password: '' }
// const INITIAL_STATE = {
//     values: fields,
//     errors: fields,
//     focus: 'username',
//     token: null,
//     isLoaded: true
// }
// const Reducer = (state = INITIAL_STATE, action) => {
//     switch (action.type) {
//         case LOGIN_REQUEST:
//             return {
//                 ...state,
//                 values: action.payload.values
//             }
//         case LOGIN_SUCCESS:
//             return {
//                 ...state,
//                 token: action.payload.token
//             }
//         case LOGIN_FAILURE:
//             return {
//                 ...state,
//                 focus: action.payload.focus,
//                 errors: action.payload.errors
//             }
//         case LOGIN_PENDING:
//             return {
//                 ...state,
//                 isLoaded: false
//             }
//         case LOGIN_COMPLETE:
//             return {
//                 ...state,
//                 isLoaded: true
//             }
//         case LOGIN_RESET:
//             return {
//                 ...state,
//                 ...INITIAL_STATE
//             }
//         case LOGIN_FORM_CHANGE:
//             return {
//                 ...state,
//                 values: {
//                     ...state.values,
//                     [action.payload.field]: action.payload.value
//                 }
//             }
//         case USER_LOGOUT:
//             return {
//                 ...state,
//                 token: null
//             }
//         default:
//             return state
//     }
//     return state
// }
// export default Reducer
