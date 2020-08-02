import {
    GET_OTHER_PRODUCTS,
    ADD_NEW_ITEM,
    UPDATE_INPUT_DATA,
    IS_EDIT_PRODUCT,
    ADD_LIST_CASTING,
    ADD_LIST_STONE,
    GET_LIST_CASTING_BY_PRODUCTS,
    GET_LIST_STONE_BY_PRODUCTS,
    CLICK_ROW_DATA,
    ARRAY_ITEM_TAB_STONE,
    ARRAY_ITEM_TAB_CASTING,
    DELETE_ITEM_PRODUCTS,
    REMOVE_ITEM_CASTING,
    REMOVE_ITEM_STONE,
    UPDATE_NUMBER_CASTING_BY_ID,
    RESET_DATA_PRODUCTS,
    CHANGE_PAGE_TABLE,
    GET_LIST_IMAGE_BY_PRODUCTS,
    GET_LIST_MOULD,
    ARRAY_ITEM_TAB_MOULD,
    REMOVE_ITEM_MOULD,
    SELECTED_OPTION,
    UPDATE_NUMBER_MOULD_BY_ID,
    GET_LIST_CASTING_IN_PRODUCTS,
    GET_LIST_STONE_IN_PRODUCTS,
    GET_LIST_ALL_PRODUCTS_COMBOBOX,
    ARRAY_ITEM_LIST_PRODUCTS,
    REMOVE_ITEM_PRODUCTS_SELECTED,
    GENERATE_NUMBER_ID_PRODUCTS,
    GET_LIST_MOULD_BY_PRODUCTS,
    GET_LIST_TAB,
    GET_DETAIL_BY_PRODUCT,
    CHECK_PRODUCT_CODE_EXISTS,
    NEXT_PAGE_PRODUCTS,
    PREVIOUS_PAGE_PRODUCTS,
    LOADING_PRODUCTS,
    GET_PRODUCTS_BY_ID
} from '../types'

const INITIAL_STATE = {
    loadingProducts: false,
    list_data: [],
    itemDetail: {},
    objData: {
        Id: ''
        , IdNew: ''
        , Name: ''
        , IdOdd: 0
        , CodeMpm: ''
        , CodeLv: ''
        , CodeLh: ''
        , Weight: ''
        , WeightReal: 0
        , WeightProduct: 0
        , Price: 0
        , Details: ''
        , Tags: ''
        , Public: ''
        , Remark: ''
        , CodeKc: ''
        , Resin: ''
        , Unit: ''
        , Status: 0
        , CheckOrder: ''
        , numperset: 0
        , IdProductSeach: ''
        , Casting_Notes: ''
    },
    listHeaderTable: [
        // { key: 'IMAGE', title: 'Hình đại diện', type: 'text', class: '' },
        { key: 'ID', title: 'Mã sản phẩm', type: 'text', class: '' },
        { key: 'NAME', title: 'Tên sản phẩm', type: 'text', class: '' },
        { key: 'LH', title: 'Chủng loại', type: 'text', class: '' },
        { key: 'PRICE', title: 'Giá sản phẩm', type: 'text', class: '' },
        { key: 'WEIGHT', title: 'TL Vàng ước tính', type: 'text', class: '' },
        { key: 'WEIGHTREAL', title: 'TL Vàng thực', type: 'text', class: '' },
        { key: 'IDODD', title: 'Bộ', type: 'text', class: '' },
        { key: 'STATUS', title: 'Trạng thái', type: 'text', class: '' },
        { key: 'EDIT', title: 'Sửa', type: 'text', class: '' },
        { key: 'DETAIL', title: 'Chi tiết', type: 'text', class: '' },
    ],
    listHeaderTableMould: [
        { key: 'NAME', title: 'Tên khuôn', type: 'text', class: '' },
        { key: 'SL', title: 'Số lượng', type: 'text', class: '' },
        { key: 'DELETE', title: 'Xoá', type: 'text', class: { "textAlign": "center" } },
    ],
    listHeaderTableProductsByCombobox: [
        { key: 'ID', title: 'Mã sản phẩm', type: 'text', class: { "textAlign": "center" } },
        { key: 'NAME', title: 'Tên sản phẩm', type: 'text', class: { "textAlign": "center" } },
        { key: 'PRICE', title: 'Giá sản phẩm', type: 'text', class: { "textAlign": "center" } },
        { key: 'WEIGHT', title: 'TL ước tính', type: 'text', class: { "textAlign": "center" } },
        { key: 'WEIGHTREAL', title: 'Trọng lượng thực', type: 'text', class: { "textAlign": "center" } },
        { key: 'STATUS', title: 'Trạng thái', type: 'text', class: { "textAlign": "center" } },
        { key: 'DELETE', title: 'Xoá', type: 'text', class: { "textAlign": "center" } },
    ],
    listHeaderTabCasting: [
        { key: 'NAME', title: 'Tên casting', type: 'text', class: '', valueFilter: '' },
        { key: 'SL', title: 'Số lượng', type: 'text', class: '', valueFilter: '' },
        { key: 'WeightWax', title: 'Tổng TL sáp', type: 'text', class: '', valueFilter: '' },
        { key: 'WeightGold', title: 'Tổng TL vàng', type: 'text', class: '', valueFilter: '' },
        { key: 'DELETE', title: 'Xoá', type: 'text', class: '', valueFilter: '' },

    ],
    listHeaderTabStone: [
        { key: 'ID', title: 'Mã đá', type: 'text', class: '' },
        { key: 'PRIMARY', title: 'Đá handset', type: 'text', class: '' },
        { key: 'SL', title: 'Số lượng', type: 'text', class: '' },
        { key: 'DELETE', title: 'Xoá', type: 'text', class: '' },

    ],
    listHeaderTabPrice: [
        { key: 'CODE', title: 'Mã bảng giá', type: 'text', class: '' },
        { key: 'PRICE_BASIC', title: 'Giá cơ sở', type: 'text', class: '' },
        { key: 'PRICE', title: 'Giá bán', type: 'text', class: '' }

    ],
    isDetail: false,
    listStoneByProducts: [],
    listCastingByProducts: [],
    listStoneSelected: [],
    listCastingSelected: [],
    page: 1,
    total: 50,
    totalRows: 0,
    totalPage: 0,
    startPage: 1,
    endPage: 50,
    listImageByProducts: [],
    listMould: [],
    listMouldSelected: [],
    listStone: [],
    listCasting: [],
    selectedOption: '',
    listProductsCombobox: [],
    listProductsSelected: [],
    listPrice: [],
    idProduct: ''
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_PRODUCTS_BY_ID:
            return {
                ...state,
                ...action.payload
            }
        case LOADING_PRODUCTS:
            return {
                ...state,
                ...action.payload
            }
        case PREVIOUS_PAGE_PRODUCTS:
            return {
                ...state,
                ...action.payload
            }
        case NEXT_PAGE_PRODUCTS:
            return {
                ...state,
                ...action.payload
            }
        case GET_DETAIL_BY_PRODUCT:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_TAB:
            return {
                ...state,
                ...action.payload
            }
        case ADD_LIST_STONE:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_MOULD_BY_PRODUCTS:
            return {
                ...state,
                ...action.payload
            }
        case GENERATE_NUMBER_ID_PRODUCTS:
            return {
                ...state,
                ...action.payload
            }
        case REMOVE_ITEM_PRODUCTS_SELECTED:
            return {
                ...state,
                ...action.payload
            }
        case ARRAY_ITEM_LIST_PRODUCTS:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_ALL_PRODUCTS_COMBOBOX:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_STONE_IN_PRODUCTS:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_CASTING_IN_PRODUCTS:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_NUMBER_MOULD_BY_ID:
            return {
                ...state,
                ...action.payload
            }
        case SELECTED_OPTION:
            return {
                ...state,
                ...action.payload
            }
        case REMOVE_ITEM_MOULD:
            return {
                ...state,
                ...action.payload
            }
        case ARRAY_ITEM_TAB_MOULD:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_MOULD:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_IMAGE_BY_PRODUCTS:
            return {
                ...state,
                ...action.payload
            }
        case CHANGE_PAGE_TABLE:
            return {
                ...state,
                ...action.payload
            }
        case RESET_DATA_PRODUCTS:
            return {
                ...INITIAL_STATE
            }
        case UPDATE_NUMBER_CASTING_BY_ID:
            return {
                ...state,
                ...action.payload
            }
        case REMOVE_ITEM_STONE:
            return {
                ...state,
                ...action.payload
            }
        case REMOVE_ITEM_CASTING:
            return {
                ...state,
                ...action.payload
            }
        case DELETE_ITEM_PRODUCTS:
            return {
                ...state,
                ...action.payload
            }
        case ARRAY_ITEM_TAB_CASTING:
            return {
                ...state,
                ...action.payload
            }
        case ARRAY_ITEM_TAB_STONE:
            return {
                ...state,
                ...action.payload
            }
        case CLICK_ROW_DATA:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_CASTING_BY_PRODUCTS:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_STONE_BY_PRODUCTS:
            return {
                ...state,
                ...action.payload
            }
        case IS_EDIT_PRODUCT:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_INPUT_DATA:
            return {
                ...state,
                ...action.payload
            }
        case GET_OTHER_PRODUCTS:
            return {
                ...state,
                ...action.payload
            }
        case ADD_NEW_ITEM:
            return state
        default:
            return state
    }
    return state
}
export default Reducer