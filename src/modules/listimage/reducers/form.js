import {
    GET_LIST_IMAGE,
    UPDATE_SCROLL_LIST,
    LOADING_IMAGE,
    GET_LIST_BAO_GIA_IN_IMAGE,
    UPDATE_CODE_BAOGIA_IMAGE
} from '../types'
const INITIAL_STATE = {
    list_data: [],
    page: 1,
    total: 20,
    isLoad: false,
    codeProduct: '',
    totalRecord: 1,
    list_data_baogia: [],
    CodeBaoGia: '',
    objSearch: {
        CodeBaoGia: '',
        IsAll: false,
        Key: '',
        Top: ''
    },
    listTop: [
        { code: 'top', name: 'Mọi thời đại' },
        { code: 'quarter', name: 'Theo quý hiện tại' },
        { code: 'year', name: 'Theo năm hiện tại' }
    ]
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_CODE_BAOGIA_IMAGE:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_BAO_GIA_IN_IMAGE:
            return {
                ...state,
                ...action.payload
            }
        case LOADING_IMAGE:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_SCROLL_LIST:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_IMAGE:
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