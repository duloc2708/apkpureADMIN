import {
    GET_LIST_STONE,
    ADD_NEW_ITEM,
    UPDATE_ITEM,
    DELETE_ITEM,
    CLICK_ROW_DATA,
    CHECK_ALL_ROW,
    DELETE_ITEM_ALL,
    UPDATE_BUTTON_TOOLBAR
} from '../types'

const INITIAL_STATE = {
    listButton: [
        { code: 'ADD', name: 'thêm', classBtn: 'fa fa-plus', status: '' },
        { code: 'EDIT', name: 'sửa', classBtn: 'fa fa-pencil-square-o', status: '' },
        { code: 'SAVE', name: 'lưu', classBtn: 'fa fa-floppy-o', status: 'disable' },
        { code: 'CANCEL', name: 'huỷ', class: 'fa fa-window-close-o', status: 'disable' },
        // { code: 'APPROVE', name: 'áp dụng', classBtn: 'fa fa-unlock' },
        // { code: 'DEAPPROVE', name: 'ngưng áp dụng', classBtn: 'fa fa-lock' },
        { code: 'PRINT', name: 'In', classBtn: 'fa fa-print', status: '' },
        { code: 'EXPORT', name: 'xuất dữ liệu', classBtn: 'fa fa-print', status: '' },
        { code: 'DELETE', name: 'xoá', classBtn: 'fa fa-times', status: '' },
    ],
    listBtnReport: [
        { code: 'EXPORT', name: 'xuất dữ liệu', classBtn: 'fa fa-print', status: '' },
        { code: 'DELETE', name: '', classBtn: '', status: '' },
    ],
    is_save:false,
    status:''
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
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