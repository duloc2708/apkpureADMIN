import {
    GET_LIST_REPORT,
    SHOW_PARAMS_REPORT,
    UPDATE_INPUT_DATA,
    CLICK_CHECK_ROW_REPORT,
    RESET_INFO_PARAMS,
    LOAD_FORM_REPORT,
    CLEAR_PARAMS_REPORT,
    ADD_PARAMS_REPORT
} from '../types'

const INITIAL_STATE = {
    list_data: [],
    listHeaderTable: [
        { key: 'ID', title: 'Mã', type: 'text', class: '' },
        { key: 'TITLE', title: 'Tên báo cáo', type: 'text', class: '' },
        { key: 'GROUP', title: 'Nhóm', type: 'text', class: '' },
        { key: 'STORE', title: 'Store', type: 'text', class: '' },
        { key: 'SIZE', title: 'Khổ giấy', type: 'text', class: '' },
        { key: 'ORIEN', title: 'Orientation', type: 'text', class: '' },
        { key: 'STATUS', title: 'Sử dụng', type: 'text', class: '' },
        { key: 'UPDATE_PARAMS', title: 'Cập nhật tham số', type: 'text', class: '' },
        { key: 'COPY_REPORT', title: 'Copy', type: 'text', class: '' }
    ],
    listHeaderParams: [
        { key: 'FIELD', title: 'Field', type: 'text', class: '' },
        { key: 'TEXT', title: 'Tên', type: 'text', class: '' },
        { key: 'TYPE', title: 'Loại tham số', type: 'text', class: '' },
        { key: 'DATEVALUE', title: 'Date value', type: 'text', class: '' },
        { key: 'ORDERBY', title: 'Thứ tự', type: 'text', class: '' },
        { key: 'DELETE', title: '', type: 'text', class: '' }


    ],
    objData: {
        ADREPORTLISTID: '',
        ADFUNCTIONID: '',
        CODE: '',
        GROUP_REPORT: '',
        TITLE: '',
        STORENAME: '',
        ORDERBY: '',
        SIZE: '',
        ORIENTATION: '',
        STATUS: '',
        TYPE_CHART: ''
    },
    objParams: {
        FIELD: '',
        TEXT: '',
        FORMAT: '',
        SQL: '',
        ORDERBY: '',
        TYPE: '',
        ISREQUIRE: '',
        DATEVALUE: ''
    },
    listParams: [],
    isShow: false,
    is_load: false
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CLEAR_PARAMS_REPORT:
            return {
                ...state,
                ...action.payload
            }
        case LOAD_FORM_REPORT:
            return {
                ...state,
                is_load: true
            }

        case ADD_PARAMS_REPORT:
            return {
                ...state,
                ...action.payload
            }
        case CLICK_CHECK_ROW_REPORT:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_INPUT_DATA:
            return {
                ...state,
                ...action.payload
            }
        case RESET_INFO_PARAMS:
            return {
                ...INITIAL_STATE
            }
        case SHOW_PARAMS_REPORT:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_REPORT:
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