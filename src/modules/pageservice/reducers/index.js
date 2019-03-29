import {
    GET_LIST_DATA_PAGE_SERVICE,
    DELETE_PAGE_SERVICE,
    ADD_NEW_PAGE_SERVICE,
    GET_DETAIL_PAGE_SERVICE,
    OPEN_MODAL_DETAIL_PAGE_SERVICE,
    UPDATE_INPUT_DATA,
    EDIT_ITEM_PAGE_SERVICE,
    CLEAR_DATA_PAGE_SERVICE
} from '../types'

const INITIAL_STATE = {
    list_data: [],
    itemDetail: {},
    isOpen: false,
    objData: {
        routes: '',
        content: '',
        title: '',
        id: ''
    },
    listHeader: [
        { key: 'TITLE', title: 'Title', type: 'text', class: '' },
        { key: 'ROUTES', title: 'Routes name', type: 'text', class: '' },
        { key: 'EDIT', title: 'Cập nhật', type: 'text', class: '' },
        { key: 'DELETE', title: 'Xoá', type: 'text', class: '' }
    ],
    isEdit: false
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CLEAR_DATA_PAGE_SERVICE:
            return {
                ...INITIAL_STATE
            }
        case EDIT_ITEM_PAGE_SERVICE:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_INPUT_DATA:
            return {
                ...state,
                ...action.payload
            }
        case OPEN_MODAL_DETAIL_PAGE_SERVICE:
            return {
                ...state,
                ...action.payload
            }
        case DELETE_PAGE_SERVICE:
            return {
                ...state,
                ...action.payload
            }
        case ADD_NEW_PAGE_SERVICE:
            return {
                ...state,
                objData: {
                    routes: '',
                    content: '',
                    title: '',
                    id: ''
                },
                isOpen: false,
            }
        case GET_LIST_DATA_PAGE_SERVICE:
            return {
                ...state,
                ...action.payload
            }
        case GET_DETAIL_PAGE_SERVICE:
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