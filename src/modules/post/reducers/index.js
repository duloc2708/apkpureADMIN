import {
    UPDATE_INPUT_VIDEO,
    CHANGE_TAB,
    UPDATE_LIST_VIDEO,
    SHOW_MODAL_VIDEOS,
    UPDATE_LIST_CHAPTER,
    UPDATE_INPUT_DATA,
    CHANGE_STATUS_TOOLBAR,
    GET_LIST_DATA_ARTICLE,
    UPDATE_INPUT_CHAPTER
} from "../types";
const timeDefault = new Date();
const INITIAL_STATE = {
    loadlisttype: [],
    list_data: [],
    list_data_default: [],
    itemDetail: {},
    isOpen: false,
    is_edit: false,
    isdisplayCalendar: false,
    listTypeDefault: [],
    listTagsDefault: [],
    listVersionDefault: [],
    dateTimeUp: new Date(),
    objImageUpload: "",
    objImageSlideUpload: "",
    listHeader: [
        { key: "THUMB", title: "Hình đại diện", type: "text", class: "" },
        { key: "TITLE", title: "Tiêu đề", type: "text", class: "" },
        { key: "TYPE", title: "Chuyên mục", type: "text", class: "" },
        { key: "CREATE_ID", title: "Người tạo", type: "text", class: "" },
        { key: "STATUS", title: "Trạng thái", type: "text", class: "" },
        { key: "EDIT", title: "Cập nhật", type: "text", class: "" },
        { key: "DELETE", title: "Xoá", type: "text", class: "" }
    ],
    lengthSlide: 0,
    listSlide: [],
    fieldSearch: "",
    typeUpload: "",
    listTab: [
        {
            key: "tab1",
            title: "Thông tin chung"
        },
        {
            key: "tab2",
            title: "Giáo trình"
        }
    ],
    tabActive: "tab1",
    listHeaderChapter: [
        { key: "NAME", title: "Tên", type: "text", class: "" },
        { key: "TOTAL", title: "Tổng số bài", type: "text", class: "" },
        { key: "DURATION", title: "Thời lượng", type: "text", class: "" },
        {
            key: "CHAPTERS",
            title: "Danhh sách bài học ",
            type: "text",
            class: ""
        },
        { key: "DELETE", title: "Xoá", type: "text", class: "" }
    ],
    listHeaderVideo: [
        { key: "NAME", title: "Tên bài học", type: "text", class: "" },
        { key: "TOTAL", title: "Dung lượng", type: "text", class: "" },
        { key: "DURATION", title: "Url", type: "text", class: "" },
        { key: "NOTE", title: "Mô tả", type: "text", class: "" },
        { key: "DELETE", title: "Xoá", type: "text", class: "" }
    ],
    listDataChapter: [],
    listDataVideos: [],
    isModalVideo: false,
    objChapter: {
        id: "",
        name: "",
        totalDuration: "",
        articleId: "",
        orderBy: 0
    },
    objVideo: {
        id: "",
        name: "",
        duration: "",
        url: "",
        description: "",
        Id: "",
        orderBy: 0
    },
    objArticle: {
        id: "",
        orderBy: 0,
        name: "",
        notes: "",
        typeId: "",
        teacherId: "chubao",
        price: "",
        numWord: "",
        numChar: ""
    }
};

const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_INPUT_CHAPTER:
            return {
                ...state,
                ...action.payload
            };
        case GET_LIST_DATA_ARTICLE:
            return {
                ...state,
                ...action.payload
            };
        case CHANGE_STATUS_TOOLBAR:
            return {
                ...state,
                ...action.payload
            };
        case UPDATE_INPUT_DATA:
            return {
                ...state,
                ...action.payload
            };
        case UPDATE_LIST_CHAPTER:
            return {
                ...state,
                ...action.payload
            };
        case UPDATE_INPUT_VIDEO:
            return {
                ...state,
                ...action.payload
            };
        case SHOW_MODAL_VIDEOS:
            return {
                ...state,
                ...action.payload
            };
        case CHANGE_TAB:
            return {
                ...state,
                ...action.payload
            };
        case UPDATE_LIST_VIDEO:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
    return state;
};
export default Reducer;
