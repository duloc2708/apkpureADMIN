import {
    GET_LIST_STONE,
    ADD_NEW_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM,
    CLICK_ROW_DATA,
    CHECK_ALL_ROW,
    DELETE_ITEM_ALL,
    UPDATE_BUTTON_TOOLBAR,
    UPDATE_LIST_BUTTON_TOOLBAR,
    RESET_TOOLBAR,
    PERMISSION_TOOLBAR
} from '../types'

const INITIAL_STATE = {
    listButton: [
        { code: 'ADD', name: 'thêm', classBtn: 'fa fa-plus', status: '', display: true },
        { code: 'EDIT', name: 'sửa', classBtn: 'fa fa-pencil-square-o', status: '', display: true },
        { code: 'SAVE', name: 'lưu', classBtn: 'fa fa-floppy-o', status: 'disable', display: true },
        { code: 'SAVEANDCLOSE', name: 'lưu và đóng', classBtn: 'fa fa-floppy-o', status: 'disable', display: true },
        // { code: 'APPROVE', name: 'áp dụng', classBtn: 'fa fa-unlock' },
        // { code: 'DEAPPROVE', name: 'ngưng áp dụng', classBtn: 'fa fa-lock' },
        { code: 'EXPORT', name: 'xuất dữ liệu', classBtn: 'fa fa-print', status: '', display: true },
        { code: 'PRINT', name: 'In', classBtn: 'fa fa-print', status: '', display: true },
        { code: 'CANCEL', name: 'huỷ', class: 'fa fa-window-close-o', status: 'disable', display: true },
        { code: 'DETAIL', name: 'chi tiết', classBtn: 'fa fa-info-circle', status: '', display: true },
        { code: 'DELETE', name: 'xoá', classBtn: 'fa fa-times', status: '', display: true },
        { code: 'ACCEPT_CASH_TRANS', name: 'ACCEPT_CASH_TRANS', classBtn: 'fa fa-times', status: '', display: false }
    ],
    listBtnReport: [
        { code: 'EXPORT', name: 'xuất dữ liệu', classBtn: 'fa fa-print', status: '' },
        { code: 'DELETE', name: '', classBtn: '', status: '' },
    ],
    is_save: false,
    status: '',
    listButtonPer: []
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PERMISSION_TOOLBAR:
            return {
                ...state,
                ...action.payload
            }
        case RESET_TOOLBAR:
            return {
                ...INITIAL_STATE
            }
        case UPDATE_LIST_BUTTON_TOOLBAR:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_BUTTON_TOOLBAR:
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
