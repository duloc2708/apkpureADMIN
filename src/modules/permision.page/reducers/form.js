import {
    GET_LIST_USER,
    GET_LIST_FUNCTION,
    UPDATE_LIST_FUNCTION,
    GET_LIST_FUNCTION_BY_USER,
    GET_LIST_BUTTON,
    GET_LIST_BUTTON_BY_USER,
    UPDATE_LIST_BUTTON,
    RESET_LIST_FUNCTION,
    GET_LIST_REPORT_PER
} from '../types'
const INITIAL_STATE = {
    listHeaderUser: [
        { key: 'STATUS', title: '', type: 'text', class: '' },
        { key: 'CODE', title: 'Mã user', type: 'text', class: '' },
        { key: 'NAME', title: 'Tên user', type: 'text', class: '' }
    ],
    listHeaderReport: [
        { key: 'STATUS', title: '', type: 'text', class: '' },
        { key: 'STT', title: 'STT', type: 'text', class: '' },
        { key: 'CODE', title: 'Mã báo cáo', type: 'text', class: '' },
        { key: 'NAME', title: 'Tên báo cáo', type: 'text', class: '' }
    ],
    listHeaderFunction: [
        { key: 'STATUS', title: '', type: 'text', class: '' },
        { key: 'NAME', title: 'Tên chức năng', type: 'text', class: '' },
        { key: 'ALL', title: 'All', type: 'text', class: '' }
    ],
    list_user: [],
    list_function: [],
    list_button: [],
    itemUser: {},
    list_function_default: [],
    list_report: [],
    list_btncustom_by_page: [
        { page: 'products', listbtn: [] },
        { page: 'stone', listbtn: [] },
        { page: 'casting', listbtn: [] },
        { page: 'customer', listbtn: [] },
        { page: 'baogia', listbtn: [] },
        {
            page: 'order', listbtn: [
                { code: 'ACCEPT_ORDER', name: 'Xác nhận' },
                { code: 'CANCEL_ORDER', name: 'Huỷ' },
                { code: 'COPY', name: 'Copy' },
                { code: 'PRICE_ORDER', name: 'Giá' }]
        },
        { page: 'bag', listbtn: [{ code: 'DELETE_BAG', name: 'Xoá bag' },
        { code: 'CANCEL_BAG', name: 'Huỷ bag' }] },
        {
            page: 'output', listbtn: [
                { code: 'ACCEPT_OUTPUT', name: 'X/N xuất' },
                { code: 'COMPlETED_OUTPUT', name: 'X/N Giao' },
                { code: 'PRICE_OUTPUT', name: 'Giá' }]
        },
        { page: 'listreport', listbtn: [] },
        { page: 'list', listbtn: [] },
        { page: 'bagdetail', listbtn: [] },
        { page: 'productDetail', listbtn: [] },
        { page: 'changepassword', listbtn: [] },
        { page: 'status-mold', listbtn: [] },
        {
            page: 'order-edit', listbtn: [
                { code: 'ACCEPT_ORDER', name: 'Xác nhận' },
                { code: 'CANCEL_ORDER', name: 'Huỷ' },
                { code: 'PRICE_ORDER', name: 'Giá' }]
        },
        { page: 'ticket_proc', listbtn: [] },
        {
            page: 'cd_trans_gold', listbtn: [
                { code: 'ACCEPT_CASH_TRANS', name: 'Xác nhận' },
                { code: 'COMPlETED_CASH_TRANS', name: 'Hoàn thành' }]
        },
        {
            page: 'cd_trans_cash', listbtn: [
                { code: 'ACCEPT_CASH_TRANS', name: 'Xác nhận' },
                { code: 'COMPlETED_CASH_TRANS', name: 'Hoàn thành' }]
        },
        {
            page: 'cd_turn_in_out', listbtn: [
                { code: 'ACCEPT_ORDER', name: 'Xác nhận' },
                { code: 'COMPlETED_OUTPUT', name: 'Hoàn thành' }]
        },
        {
            page: 'cd_trans_cash_gold', listbtn: [
                { code: 'ACCEPT_CASH_TRANS', name: 'Xác nhận' },
                { code: 'COMPlETED_CASH_TRANS', name: 'Hoàn thành' }]
        },
        { page: 'listimage', listbtn: [] },
        {
            page: 'cd_turn_in_out?type=0', listbtn: [
                { code: 'ACCEPT_ORDER', name: 'Xác nhận' },
                { code: 'COMPlETED_OUTPUT', name: 'Hoàn thành' }]
        },
        {
            page: 'cd_turn_in_out?type=1', listbtn: [
                { code: 'ACCEPT_ORDER', name: 'Xác nhận' },
                { code: 'COMPlETED_OUTPUT', name: 'Hoàn thành' }]
        },
        {
            page: 'transfer?type=0', listbtn: [
                { code: 'ACCEPT_ORDER', name: 'Xác nhận' },
                { code: 'COMPlETED_OUTPUT', name: 'Hoàn thành' }]
        },
        {
            page: 'transfer?type=1', listbtn: [
                { code: 'ACCEPT_ORDER', name: 'Xác nhận' },
                { code: 'COMPlETED_OUTPUT', name: 'Hoàn thành' }]
        },
    ]
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_LIST_REPORT_PER:
            return {
                ...state,
                ...action.payload
            }
        case RESET_LIST_FUNCTION:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_LIST_BUTTON:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_BUTTON_BY_USER:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_BUTTON:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_FUNCTION_BY_USER:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_LIST_FUNCTION:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_USER:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_FUNCTION:
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
