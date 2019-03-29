import {
    GET_LIST_DATA_USERS,
    DELETE_USERS,
    ADD_NEW_USERS,
    GET_DETAIL_USERS,
    OPEN_MODAL_DETAIL_USERS,
    UPDATE_INPUT_DATA,
    EDIT_ITEM_USERS,
    CLEAR_DATA_USERS
} from '../types'

const INITIAL_STATE = {
    list_data: [],
    itemDetail: {},
    isOpen: false,
    objData: {
        username: '',
        fullname: '',
        email: '',
        status: 'active',
        id: ''
    },
    listHeader: [
        { key: 'USERNAME', title: 'Username', type: 'text', class: '' },
        { key: 'NAME', title: 'Tên user', type: 'text', class: '' },
        { key: 'EMAIL', title: 'Email', type: 'text', class: '' },
        { key: 'STATUS', title: 'Trạng thái', type: 'text', class: '' },
        { key: 'EDIT', title: 'Cập nhật', type: 'text', class: '' },
        { key: 'DELETE', title: 'Xoá', type: 'text', class: '' }
    ],
    isEdit: false
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CLEAR_DATA_USERS:
            return {
                ...INITIAL_STATE
            }
        case EDIT_ITEM_USERS:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_INPUT_DATA:
            return {
                ...state,
                ...action.payload
            }
        case OPEN_MODAL_DETAIL_USERS:
            return {
                ...state,
                ...action.payload
            }
        case DELETE_USERS:
            return {
                ...state,
                ...action.payload
            }
        case ADD_NEW_USERS:
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
        case GET_LIST_DATA_USERS:
            return {
                ...state,
                ...action.payload
            }
        case GET_DETAIL_USERS:
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