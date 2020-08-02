import {
    GET_LIST_STONE,
    ADD_NEW_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM,
    CLICK_ROW_DATA,
    CHECK_ALL_ROW,
    DELETE_ITEM_ALL,
    ARRAY_ITEM_TAB_STONE,
    UPDATE_NUMBER_STONE_BY_ID,
    UPDATE_INPUT_DATA,
    CHANGE_PAGE_TABLE,
    RESET_DATA_STONE,
    CLEAR_INPUT_STONE,
    UPDATE_FILTER_VALUE_HEADER,
    LOAD_FORM_STONE
} from '../types'

const INITIAL_STATE = {
    list_data: [],
    itemDetail: {},
    type_code: '',
    allChecked: false,
    listHeaderTable: [
        { key: 'Id', title: 'Mã đá', type: 'text', class: '', valueFilter: '' },
        { key: 'Name', title: 'Tên đá', type: 'text', class: '', valueFilter: '' },
        { key: 'HdName', title: 'Hình dạng', type: 'text', class: '', valueFilter: '' },
        { key: 'KcName', title: 'Kích cỡ', type: 'text', class: '', valueFilter: '' },
        { key: 'ColorName', title: 'Màu sắc', type: 'text', class: '', valueFilter: '' },
        { key: 'UnitName', title: 'Unit', type: 'text', class: '', valueFilter: '' },
        { key: 'Numb', title: 'Numb', type: 'text', class: '', valueFilter: '' },
        { key: 'Weight', title: 'Height', type: 'text', class: '', valueFilter: '' },
        { key: 'Decription', title: 'Decription', type: 'text', class: '', valueFilter: '' }
    ],
    listHeaderTabProduct: [
        { key: 'ID', title: 'Mã đá', type: 'text', class: '', valueFilter: '' },
        // { key: 'NAME', title: 'Tên đá', type: 'text',class: '',valueFilter: '' },
        { key: 'SL', title: 'Số lượng', type: 'text', class: '', valueFilter: '' },
        { key: 'DELETE', title: 'Xoá', type: 'text', class: '', valueFilter: '' },

    ],
    listHeaderTabCasting: [
        { key: 'NAME', title: 'Tên casting', type: 'text', class: '', valueFilter: '' },
        { key: 'SL', title: 'Số lượng', type: 'text', class: '', valueFilter: '' },
        { key: 'DELETE', title: 'Xoá', type: 'text', class: '', valueFilter: '' },

    ],
    listStoneSelected: [],
    objData: {
        Id: '',
        Name: '',
        Decription: '',
        IdType: '',
        IdUnit: '',
        Numb: '',
        Weight: '',
        TypeStone: '',
        Hd: '',
        Kc: '',
        Color: ''
    },
    fieldValidateStone: [
        { key: "Id", Des: "Mã đá" },
        { key: "Name", Des: "Tên đá" }
    ],
    page: 1,
    total: 50,
    totalRows: 0,
    totalPage: 0,
    is_load: false
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_FORM_STONE:
            return {
                ...state,
                is_load: true
            }
        case UPDATE_FILTER_VALUE_HEADER:
            return {
                ...state,
                ...action.payload
            }
        case CLEAR_INPUT_STONE:
            return {
                ...state,
                ...action.payload
            }
        case RESET_DATA_STONE:
            return {
                ...INITIAL_STATE
            }
        case CHANGE_PAGE_TABLE:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_INPUT_DATA:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_NUMBER_STONE_BY_ID:
            return {
                ...state,
                ...action.payload
            }
        case ARRAY_ITEM_TAB_STONE:
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
        case GET_LIST_STONE:
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