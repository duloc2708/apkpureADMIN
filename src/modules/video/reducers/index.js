import {
    CHANGE_INPUT_CONTENT,
    EDIT_POST,
    OPEN_CALENDAR,
    UPDATE_INPUT_DATA,
    CONVERT_LIST_CHECK_TYPE,
    OPEN_MODAL_DETAIL_VIDEO,
    ADD_NEW_VIDEO,
    GET_LIST_DATA_VIDEO,
    CLEAR_DATA_VIDEO,
    GET_LIST_DATA_PLAYLIST,
    CONVERT_LIST_PLAY_LIST,
    SHOW_PLAY_LIST,
    EDIT_VIDEO,
    UPDATE_THUMBNAIL_VIDEO,
    INSERT_TAGS_VIDEO
} from '../types'

const INITIAL_STATE = {
    objImageUpload: '',
    loadlisttype: [],
    list_data: [],
    itemDetail: {},
    isOpen: false,
    objData: {
        id: '',
        title: '',
        link: '',
        desciption: '',
        tags: '',
        thumbnail: 'link',
        levels: 0,
        list_play: ''
    },
    is_edit: false,
    isdisplayCalendar: false,
    displayPlaylist: 'none',
    list_play_default: [],
    fileName: '',
    files: '',
    listHeader: [
        { key: 'THUMB', title: 'Hình đại diện', type: 'text', class: '' },
        { key: 'TITLE', title: 'Tiêu đề', type: 'text', class: '' },
        { key: 'TAGS', title: 'Tags', type: 'text', class: '' },
        { key: 'LINK', title: 'Url video', type: 'text', class: '' },
        { key: 'EDIT', title: 'Cập nhật', type: 'text', class: '' },
        { key: 'DELETE', title: 'Xoá', type: 'text', class: '' },
    ],
    listTagsDefault: [],

}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case INSERT_TAGS_VIDEO:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_THUMBNAIL_VIDEO:
            return {
                ...state,
                ...action.payload
            }
        case EDIT_VIDEO:
            return {
                ...state,
                ...action.payload
            }
        case SHOW_PLAY_LIST:
            return {
                ...state,
                ...action.payload
            }
        case CONVERT_LIST_PLAY_LIST:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_DATA_PLAYLIST:
            return {
                ...state,
                ...action.payload
            }
        case CLEAR_DATA_VIDEO:
            return {
                ...INITIAL_STATE
            }
        case GET_LIST_DATA_VIDEO:
            return {
                ...state,
                ...action.payload
            }
        case ADD_NEW_VIDEO:
            return {
                ...state,
                ...action.payload
            }
        case OPEN_MODAL_DETAIL_VIDEO:
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