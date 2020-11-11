import {
    GET_OT_LIST_TYPE,
    CHANGE_CODE_TYPE,
    GET_OT_LIST_ALL,
    GET_LIST_CONFIG,
    GET_LIST_DATA_REPORT,
    GET_LIST_ORDER,
    CHANGE_ORDER_FILTER
} from '../types'
const INITIAL_STATE = {
    list_data: [],
    listHeaderTable: [
        {
            code: "001",
            listcol:
                [
                    { key: 'IdStone', title: 'Mã đá', type: 'text', class: '' },
                    { key: 'SLD', title: 'Số lượng', type: 'text', class: '' }
                ]
        },
        {
            code: "002",
            listcol: [
                { key: 'IdStone', title: 'Mã đá', type: 'text', class: '' },
                { key: 'SLD', title: 'Số lượng', type: 'text', class: '' },
                { key: 'AvgStone', title: 'Trọng lượng TB', type: 'text', class: '' },
                { key: 'TypeStone', title: 'Loại đá', type: 'text', class: '' },
                { key: 'StoneColor', title: 'Màu đá', type: 'text', class: '' }
            ]
        }
    ],
    listOrder: [],
    IdOrder: '',
    listColByReport: []
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_ORDER_FILTER:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_ORDER:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_DATA_REPORT:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_CONFIG:
            return {
                ...state,
                ...action.payload
            }
        case GET_OT_LIST_ALL:
            return {
                ...state,
                ...action.payload
            }
        case CHANGE_CODE_TYPE:
            return {
                ...state,
                ...action.payload
            }
        case GET_OT_LIST_TYPE:
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
