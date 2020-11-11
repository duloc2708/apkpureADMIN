import {
    GET_LIST_ORDER_COMBOBOX,
    GET_LIST_PRODUCTS_BY_ORDER,
    SELECTED_ORDER,
    CLICK_ROW_DATA,
    SHOW_MODAL_TEST,
    SAVE_BAG,
    GENERATE_NUMBER_ID_BAG,
    GET_LIST_BAG,
    SAVE_BAG_LIST,
    UPDATE_CELL_INPUT_BAG,
    CLICK_ROW_DATA_BAG,
    GET_DETAIL_BY_BAG,
    RESET_DATA_BAG,
    GET_LIST_ORDER_IN_BAG,
    CHANGE_PAGE_TABLE_IN_BAG,
    CLICK_ROW_DATA_ORDER_IN_BAG,
    CLICK_ROW_CREATE_BAG,
    GET_LIST_STONE_BY_PRODUCTS_IN_BAG,
    GET_LIST_STONE_BY_PRODUCTS_IN_BAG_SPLIT,
    RESET_LIST_STONE,
    GET_DEFAULT_LIST_STONE,
    UPDATE_SPLIT_BAG,
    GET_LIST_PRODUCT_BY_ORDER_SPLIT_BAG,
    REMOVE_PRODUCT_IN_BAG,
    GET_LIST_STONE_BY_PRODUCTS_DETAIL,
    CLEAN_STONE,
    UPDATE_ITEM_STONE_SPLIT,
    UPDATE_LIST_STONE_SPLIT,
    REMOVE_STONE_SPLIT,
    GET_LIST_ORDER_IN_BAG_SEARCH,
    UPDATE_PRIMARY_STONE,
    UPDATE_QTY_PRODUCTS_BAG,
    UPDATE_ITEM_DETAIL_BAG_BY_COLOR,
    UPDATE_CELL_INPUT_BAG_QTY,
    UPDATE_CREATE_ID_BAG,
    UPDATE_CHECK_SPLIT_BAG
} from '../types'
const INITIAL_STATE = {
    list_order_combobox: [],
    listHeaderProducts: [
        { key: 'STT', title: '', type: 'text', class: '' },
        { key: 'IDPRODUCTS', title: 'Mã sản phẩm', type: 'text', class: '' },
        { key: 'COLOR', title: 'Màu', type: 'text', class: '' },
        // { key: 'PRICE', title: 'Giá', type: 'text', class: '' },
        { key: 'SL', title: 'Số lượng đặt', type: 'text', class: '' },
        { key: 'NUM', title: 'Số lượng bag', type: 'text', class: '' },
        { key: 'SLBAG', title: 'Đã tạo', type: 'text', class: '' },
        { key: 'SPLIT', title: 'Tách bộ', type: 'text', class: '' },
        // { key: 'BTNSPLIT', title: '', type: 'text', class: '' },

    ],
    ListProductByOrderInBag: [],
    selectedOrder: '',
    itemDetail: '',
    isShow: false,
    isSplit: 0,
    listHeaderBag: [
        { key: 'CHECKED', title: 'STT', type: 'text', class: '' },
        { key: 'IDBAG', title: 'Mã bag', type: 'text', class: '' },
        { key: 'IDORDER', title: 'Mã đơn hàng', type: 'text', class: '' },
        { key: 'IDPRODUCT', title: 'Mã sản phẩm', type: 'text', class: '' },
        { key: 'SLBAG', title: 'Số lương', type: 'text', class: '' },
        // { key: 'DETAIL', title: 'Chi tiết', type: 'text', class: '' },
        { key: 'PRINT', title: 'In', type: 'text', class: '' },
        { key: 'STATUS', title: 'Trạng thái', type: 'text', class: '' },
        { key: 'STATUSBAG', title: 'Trạng thái In bag', type: 'text', class: '' },


    ],
    listHeaderBagStone: [
        { key: 'CHECKED', title: 'STT', type: 'text', class: '' },
        { key: 'IDBAG', title: 'Mã bag', type: 'text', class: '' },
        { key: 'IDORDER', title: 'Mã đơn hàng', type: 'text', class: '' },
        { key: 'IDPRODUCT', title: 'Mã sản phẩm', type: 'text', class: '' },
        { key: 'SLBAG', title: 'Số lương', type: 'text', class: '' },
        { key: 'DETAIL', title: 'Nhập đá', type: 'text', class: '' },
        { key: 'PRINT', title: 'In', type: 'text', class: '' },
        { key: 'STATUS', title: 'Trạng thái', type: 'text', class: '' },
        { key: 'STATUSBAG', title: 'Trạng thái In bag', type: 'text', class: '' },


    ],
    ListBag: [],
    page: 1,
    total: 10,
    listItemCreateBag: [],
    listHeaderTableOrder: [
        { key: 'IdOrder', title: 'Mã ĐH', type: 'text', class: '' },
        { key: 'IdCustomer', title: 'Mã KH', type: 'text', class: '' },
        { key: 'DayMake', title: 'Ngày nhập', type: 'text', class: '' },
        { key: 'TypeOrder', title: 'Loại đơn', type: 'text', class: '' },
        { key: 'ProductEachBag', title: 'Số Bag', type: 'text', class: '' },
        { key: 'STONE', title: 'Đá', type: 'text', class: '' },

    ],
    list_status_order: [],
    list_order_in_bag: [],
    list_stone_by_product: [],
    itemDetailCreateBag: '',
    list_stone_save: [],
    list_products_by_idodd: [],
    isSaveBag: false,
    itemStoneSplit: {},
    isShowSplitStone: false,
    list_stone_save_split: [],
    listItemCheckBag: [],
    type_bag: 'STATUS_BAG_PRODUCT_01',
    list_stone_save_split_custom: [],
    type_split_stone: '',
    listItemCreateBagDefault: [],
    split_odd: false,
    IdBagCreate: '',
}
export const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_LIST_STONE_BY_PRODUCTS_IN_BAG_SPLIT:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_CHECK_SPLIT_BAG:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_CREATE_ID_BAG:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_CELL_INPUT_BAG_QTY:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_ITEM_DETAIL_BAG_BY_COLOR:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_QTY_PRODUCTS_BAG:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_PRIMARY_STONE:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_ORDER_IN_BAG_SEARCH:
            return {
                ...state,
                ...action.payload
            }
        case REMOVE_STONE_SPLIT:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_LIST_STONE_SPLIT:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_ITEM_STONE_SPLIT:
            return {
                ...state,
                ...action.payload
            }
        case CLEAN_STONE:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_STONE_BY_PRODUCTS_DETAIL:
            return {
                ...state,
                ...action.payload
            }
        case REMOVE_PRODUCT_IN_BAG:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_PRODUCT_BY_ORDER_SPLIT_BAG:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_SPLIT_BAG:
            return {
                ...state,
                ...action.payload
            }
        case RESET_LIST_STONE:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_STONE_BY_PRODUCTS_IN_BAG:
            return {
                ...state,
                ...action.payload
            }
        case CLICK_ROW_CREATE_BAG:
            return {
                ...state,
                ...action.payload
            }
        case CLICK_ROW_DATA_ORDER_IN_BAG:
            return {
                ...state,
                ...action.payload
            }
        case CHANGE_PAGE_TABLE_IN_BAG:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_ORDER_IN_BAG:
            return {
                ...state,
                ...action.payload
            }
        case RESET_DATA_BAG:
            return {
                ...INITIAL_STATE
            }
        case GET_DETAIL_BY_BAG:
            return {
                ...state,
                ...action.payload
            }
        case CLICK_ROW_DATA_BAG:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_CELL_INPUT_BAG:
            return {
                ...state,
                ...action.payload
            }
        case SAVE_BAG_LIST:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_BAG:
            return {
                ...state,
                ...action.payload
            }
        case GENERATE_NUMBER_ID_BAG:
            return {
                ...state,
                ...action.payload
            }
        case SAVE_BAG:
            return {
                ...state,
                ...action.payload
            }
        case SHOW_MODAL_TEST:
            return {
                ...state,
                ...action.payload
            }
        case CLICK_ROW_DATA:
            return {
                ...state,
                ...action.payload
            }
        case SELECTED_ORDER:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_PRODUCTS_BY_ORDER:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_ORDER_COMBOBOX:
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