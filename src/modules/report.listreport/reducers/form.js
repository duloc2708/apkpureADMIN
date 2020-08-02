import {
    GET_LIST_REPORT,
    SHOW_PARAMS_REPORT,
    UPDATE_INPUT_DATA,
    CLICK_CHECK_ROW_REPORT,
    RESET_INFO_PARAMS,
    GET_LIST_PARAMS_BY_REPORT,
    UPDATE_DATA_CHART
} from '../types'

const INITIAL_STATE = {
    list_data: [],
    listHeaderTable: [
        { key: 'CHECK', title: '', type: 'text', class: '' },
        { key: 'ORDERBY', title: 'STT', type: 'text', class: '' },
        { key: 'CODE', title: 'Mã báo cáo', type: 'text', class: '' },
        { key: 'TITLE', title: 'Tên báo cáo', type: 'text', class: '' },
    ],
    listHeaderParams: [
        { key: 'NAME', title: 'Tên', type: 'text', class: '' },
        { key: 'TYPE', title: 'Loại tham số', type: 'text', class: '' },
        { key: 'ORDERBY', title: 'Thứ tự', type: 'text', class: '' }

    ],
    objData: '',
    objParams: {
        name: '',
        orderby: '',
        type: ''
    },
    listParams: [],
    listDataChart: [],
    isShow: false
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_DATA_CHART:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_PARAMS_BY_REPORT:
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