import {
    GET_LIST_DATA_CHUYENMUC,
    DELETE_CHUYENMUC,
    ADD_NEW_CHUYENMUC,
    GET_DETAIL_CHUYENMUC,
    OPEN_MODAL_DETAIL_CHUYENMUC,
    UPDATE_INPUT_DATA,
    EDIT_ITEM_LISTTYPE,
    CLEAR_DATA_LISTTYPE
} from '../types'

const INITIAL_STATE = {
    list_data: [],
    itemDetail: {},
    isOpen: false,
    objData: {
        code: '',
        name: '',
        slug: '',
        numOrder: 0,
        id: ''
    },
    listHeader: [
        { key: 'STT', title: 'Số thứ tự', type: 'text', class: '' },
        { key: 'CODE', title: 'Mã chuyên mục', type: 'text', class: '' },
        { key: 'NAME', title: 'Tên chuyên mục', type: 'text', class: '' },
        { key: 'SLUG', title: 'Slug', type: 'text', class: '' },
        { key: 'EDIT', title: 'Cập nhật', type: 'text', class: '' },
        { key: 'DELETE', title: 'Xoá', type: 'text', class: '' },

    ],
    isEdit: false
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CLEAR_DATA_LISTTYPE:
            return {
                ...INITIAL_STATE
            }
        case EDIT_ITEM_LISTTYPE:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_INPUT_DATA:
            return {
                ...state,
                ...action.payload
            }
        case OPEN_MODAL_DETAIL_CHUYENMUC:
            return {
                ...state,
                ...action.payload
            }
        case DELETE_CHUYENMUC:
            return {
                ...state,
                ...action.payload
            }
        case ADD_NEW_CHUYENMUC:
            return {
                ...state,
                objData: {
                    code: '',
                    name: '',
                    slug: '',
                    status: 'active',
                    stt: '',
                    _id: ''
                },
                isOpen: false,
            }
        case GET_LIST_DATA_CHUYENMUC:
            return {
                ...state,
                ...action.payload
            }
        case GET_DETAIL_CHUYENMUC:
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