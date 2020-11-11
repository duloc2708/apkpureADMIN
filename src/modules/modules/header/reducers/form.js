import {
    GET_OT_LIST_TYPE,
    CHANGE_CODE_TYPE,
    GET_OT_LIST_ALL,
    GET_LIST_CONFIG,
    GET_LIST_FUNCTION_BY_USER,
    GET_LIST_FUNCTION
} from '../types'
const INITIAL_STATE = {
    list: [],
    codeList: '',
    list_other_all: [],
    list_config: [],
    list_function: [],
    list_function_user:[]
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_LIST_FUNCTION:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_FUNCTION_BY_USER:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_CONFIG:
            return {
                ...state,
                ...action.payload
            }
        case GET_OT_LIST_ALL:
            return {
                ...state,
                ...action.payload
            }
        case CHANGE_CODE_TYPE:
            return {
                ...state,
                ...action.payload
            }
        case GET_OT_LIST_TYPE:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
    return state
}
export default Reducer
