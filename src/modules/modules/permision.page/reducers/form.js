import {
    GET_LIST_USER,
    GET_LIST_FUNCTION,
    UPDATE_LIST_FUNCTION,
    GET_LIST_FUNCTION_BY_USER
} from '../types'
const INITIAL_STATE = {
    listHeaderUser: [
        { key: 'STATUS', title: '', type: 'text', class: '' },
        { key: 'CODE', title: 'Mã user', type: 'text', class: '' },
        { key: 'NAME', title: 'Tên user', type: 'text', class: '' }
    ],
    listHeaderFunction: [
        { key: 'STATUS', title: 'STT', type: 'text', class: '' },
        { key: 'NAME', title: 'Tên chức năng', type: 'text', class: '' }
    ],
    list_user: [],
    list_function: [],
    itemUser: {}
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_LIST_FUNCTION_BY_USER:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_LIST_FUNCTION:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_USER:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_FUNCTION:
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
