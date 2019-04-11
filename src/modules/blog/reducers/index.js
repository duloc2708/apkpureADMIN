import {
    CHANGE_INPUT_CONTENT,
    EDIT_POST,
    OPEN_CALENDAR,
    UPDATE_INPUT_DATA,
    CONVERT_LIST_CHECK_TYPE,
    OPEN_MODAL_DETAIL_POST,
    ADD_NEW_POST,
    GET_LIST_DATA_POST,
    CLEAR_DATA_POST,
    INIT_DATA_LISTTYPE,
    CHECKED_LIST_TYPE,
    INSERT_TAGS,
    UPDATE_DATEIME_UP
} from '../types'
const timeDefault = new Date()
const INITIAL_STATE = {
    loadlisttype: [],
    list_data: [],
    list_data_default: [],
    itemDetail: {},
    isOpen: false,
    objData: {
        id: '',
        title: '',
        title_slug: '',
        content_long: '',
        content_short: '',
        status: 'active',
        thumbnail: '',
        source: 'test',
        type: '',
        tags: '',
        numWord: 0,
        numChar: 0,
        atr2: '',
        created_by: '',
        time_up: '',
        createdAt: timeDefault.getTime(),
        updatedAt: timeDefault.getTime(),
        atr8: '', //SEO title
        atr9: '', // SEO description,
        atr10: '', // link down apk pure,
        atr11: '', // slide image firts

    },
    is_edit: false,
    isdisplayCalendar: false,
    listTypeDefault: [],
    listTagsDefault: [],
    dateTimeUp: new Date(),
    objImageUpload: '',
    objImageSlideUpload: '',
    listHeader: [
        { key: 'THUMB', title: 'Hình đại diện', type: 'text', class: '' },
        { key: 'TITLE', title: 'Tiêu đề', type: 'text', class: '' },
        { key: 'TAGS', title: 'Tags', type: 'text', class: '' },
        { key: 'TYPE', title: 'Chuyên mục', type: 'text', class: '' },
        { key: 'CREATE_ID', title: 'Người tạo', type: 'text', class: '' },
        { key: 'STATUS', title: 'Trạng thái', type: 'text', class: '' },
        { key: 'DOWWFILE', title: 'Tải file', type: 'text', class: '' },
        { key: 'EDIT', title: 'Cập nhật', type: 'text', class: '' },
        { key: 'DELETE', title: 'Xoá', type: 'text', class: '' },
    ],
    lengthSlide: 0,
    listSlide: [],
    fieldSearch: '',
    typeUpload: ''
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_DATEIME_UP:
            return {
                ...state,
                ...action.payload
            }
        case INSERT_TAGS:
            return {
                ...state,
                ...action.payload
            }
        case CHECKED_LIST_TYPE:
            return {
                ...state,
                ...action.payload
            }
        case INIT_DATA_LISTTYPE:
            return {
                ...state,
                ...action.payload
            }
        case CLEAR_DATA_POST:
            return {
                ...INITIAL_STATE
            }
        case GET_LIST_DATA_POST:
            return {
                ...state,
                ...action.payload
            }
        case ADD_NEW_POST:
            return {
                ...state,
                ...action.payload
            }
        case OPEN_MODAL_DETAIL_POST:
            return {
                ...state,
                ...action.payload
            }
        case CONVERT_LIST_CHECK_TYPE:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_INPUT_DATA:
            return {
                ...state,
                ...action.payload
            }
        case OPEN_CALENDAR:
            return {
                ...state,
                ...action.payload
            }
        case EDIT_POST:
            return {
                ...state,
                ...action.payload
            }
        case CHANGE_INPUT_CONTENT:
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