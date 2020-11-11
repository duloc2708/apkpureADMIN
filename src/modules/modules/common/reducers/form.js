import {
    COMMON_CHECK_CODE_EXISTS,
    PREVIOUS_PAGE_PRODUCTS,
    NEXT_PAGE_PRODUCTS,
    CHANGE_PAGE_TABLE,
    UPDATE_INFO_PAGE,
    RESET_INFO_PAGE
} from '../types'

const INITIAL_STATE = {
    status: '',
    page: 1,
    total: 50,
    totalRows: 0,
    totalPage: 0,
    startPage: 1,
    endPage: 10,
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESET_INFO_PAGE:
            return {
                ...INITIAL_STATE
            }
        case UPDATE_INFO_PAGE:
            return {
                ...state,
                ...action.payload
            }
        case CHANGE_PAGE_TABLE:
            return {
                ...state,
                ...action.payload
            }
        case PREVIOUS_PAGE_PRODUCTS:
            return {
                ...state,
                ...action.payload
            }
        case NEXT_PAGE_PRODUCTS:
            return {
                ...state,
                ...action.payload
            }
        case COMMON_CHECK_CODE_EXISTS:
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