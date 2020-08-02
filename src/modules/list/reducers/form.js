import {
    GET_OTHER_LIST,
    ADD_NEW_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM,
    CLICK_ROW_DATA,
    CHECK_ALL_ROW,
    DELETE_ITEM_ALL,
    UPDATE_INPUT_DATA,
    RESET_DATA_LIST,
    CHANGE_PAGE_TABLE,
    GET_COMBOBOX_BY_TYPE,
    UPDATE_FILTER_VALUE_HEADER,
    PUSH_LIST_DATA_ALL_DEFAULT,
    ADD_LIST_DATA_ALL_DEFAULT
} from '../types'

const INITIAL_STATE = {
    list_data: [],
    itemDetail: {},
    type_code: '',
    allChecked: false,
    listHeaderTable: [
        { key: 'code', title: 'Mã tham số', type: 'text', class: '', valueFilter: '' },
        { key: 'name', title: 'Tên tham số', type: 'text', class: '', valueFilter: '' },
        { key: 'valueParams', title: 'Giá trị', type: 'text', class: '', valueFilter: '' },
        { key: 'status', title: 'Trạng thái', type: 'text', class: '', valueFilter: '' }
    ],
    objData: {
        id: 0,
        code: '',
        name: '',
        status: 1,
        type_code: '',
        valueParams: ''
    },
    page: 1,
    total: 50,
    totalRows: 0,
    totalPage: 0,
    listCombobox: [],
    list_data_all: [],
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_LIST_DATA_ALL_DEFAULT:
            return {
                ...state,
                ...action.payload
            }
        case PUSH_LIST_DATA_ALL_DEFAULT:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_FILTER_VALUE_HEADER:
            return {
                ...state,
                ...action.payload
            }
        case GET_COMBOBOX_BY_TYPE:
            return {
                ...state,
                ...action.payload
            }
        case CHANGE_PAGE_TABLE:
            return {
                ...state,
                ...action.payload
            }
        case RESET_DATA_LIST:
            return {
                ...INITIAL_STATE
            }
        case UPDATE_INPUT_DATA:
            return {
                ...state,
                ...action.payload
            }
        case DELETE_ITEM_ALL:
            return {
                ...state,
                allChecked: false
            }
        case CHECK_ALL_ROW:
            return {
                ...state,
                ...action.payload
            }
        case CLICK_ROW_DATA:
            return {
                ...state,
                ...action.payload
            }
        case DELETE_ITEM:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_ITEM:
            return {
                ...state,
                ...action.payload
            }
        case ADD_NEW_ITEM:
            return {
                ...state,
                ...action.payload
            }
        case GET_OTHER_LIST:
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