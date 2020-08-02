import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_PENDING,
    LOGIN_COMPLETE,
    LOGIN_RESET,
    LOGIN_FORM_CHANGE,
    USER_LOGOUT,
    SET_TOKEN,
    GET_BET_SETTING
}
    from '../types'
const fields = { username: '', password: '' }
const INITIAL_STATE = {
    values: fields,
    errors: fields,
    focus: 'username',
    token: null,
    isLoaded: true,
    betSetting: [],
    username: ''
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                values: action.payload.values
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                focus: action.payload.focus,
                errors: action.payload.errors
            }
        case LOGIN_PENDING:
            return {
                ...state,
                isLoaded: false
            }
        case LOGIN_COMPLETE:
            return {
                ...state,
                isLoaded: true
            }
        case LOGIN_RESET:
            return {
                ...state,
                ...INITIAL_STATE,
                values: {
                    ...state.values,
                    ...action.payload
                }
            }
        case LOGIN_FORM_CHANGE:
            return {
                ...state,
                values: {
                    ...state.values,
                    [action.payload.field]: action.payload.value
                }
            }
        case USER_LOGOUT:
            return {
                ...state,
                ...action.payload
            }
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload.token
            }
        case GET_BET_SETTING:
            return {
                ...state,
                betSetting: action.payload.betSetting
            }
        default:
            return state
    }
    return state
}
export default Reducer