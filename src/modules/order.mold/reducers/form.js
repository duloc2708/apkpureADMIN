import {
    GET_OTHER_PRODUCTS,
    ADD_NEW_ITEM,
    UPDATE_INPUT_DATA,
    IS_EDIT,
    ADD_LIST_CASTING,
    ADD_LIST_STONE,
    GET_LIST_CASTING_BY_PRODUCTS,
    GET_LIST_STONE_BY_PRODUCTS,
    CLICK_ROW_DATA_ORDER,
    ARRAY_ITEM_TAB_STONE,
    ARRAY_ITEM_TAB_CASTING,
    DELETE_ITEM_PRODUCTS,
    REMOVE_ITEM_CASTING,
    REMOVE_ITEM_STONE,
    UPDATE_NUMBER_CASTING_BY_ID,
    RESET_DATA,
    CHANGE_PAGE_TABLE,
    GET_LIST_CUSTOMER,
    SELECT_CUSTOMER,
    GET_LIST_PRODUCTS_BY_PRICE,
    ARRAY_ITEM_PRODUCTS,
    UPDATE_CELL_INPUT_BY_ID,
    GET_LIST_PRODUCT_BY_ORDER,
    REMOVE_ITEM_PRODUCTS_SELECTED,
    GENERATE_NUMBER_ID_ORDER,
    ADD_LIST_PRODUCTS_BY_ORDER,
    RESET_DATA_ORDER,
    ACCEPT_ORDER,
    GET_LIST_BAG_BY_ORDRER,
    GET_SET_PRODUCTS,
    SHOW_STONE,
    GET_LIST_STONE_BY_ORDER,
    CLICK_ROW_DATA_BAG,
    GET_LIS_SALE_PRICE,
    UPDATE_EXISTS_PRODUCT,
    CHECK_EXISTS_BAG_OUTPUT,
    UPDATE_DYNAMIC_COMBOBOX_ORDER,
    GET_LIST_BAO_GIA_IN_ORDER
} from '../types'

const INITIAL_STATE = {
    listSalePrice: [],
    list_data: [],
    itemDetail: {},
    IdOrderTemp: '',
    objDataOrder: {
        IdOrder: ''
        , IdCustomer: ''
        , Deadline: ''
        , StartWeek: ''
        , FinishWeek: ''
        , TotalFinish: 0
        , TotalBags: 0
        , IdCreater: ''
        , DayMake: moment(new Date(), 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
        , Status: ''
        , Remark: ''
        , StatusOrder: 'STATUS_ORDER_01'
        , StatusBag: ''
        , StatusTransfer: ''
        , CodeKH: ''
        , NameKH: ''
        , CodeLd: 'LD_01'
        , CodeLH: ''
        , CodeLV: ''
        , CodeMX: ''
        , CodeLAI: ''
        , ValueLAI: ''
        , ValueLH: ''
        , ValueLV: ''
        , ValueLd: ''
        , CodeBaoGia: ''
    },
    listHeaderTableOrder: [
        { key: 'IdOrder', title: 'Mã đơn hàng', type: 'text', class: '' },
        { key: 'IdCustomer', title: 'Mã KH/Sale', type: 'text', class: '' },
        { key: 'DayMake', title: 'Ngày nhập', type: 'text', class: '' },
        { key: 'StatusOrder', title: 'TT đơn hàng', type: 'text', class: '' },
        { key: 'StatusBag', title: 'TT bag', type: 'text', class: '' },
        { key: 'StatusMold', title: 'TT đúc', type: 'text', class: '' },
        { key: 'StatusTransfer', title: 'TT xuất', type: 'text', class: '' },        
        { key: 'ACCEPTORDER', title: 'Xác nhận', type: 'text', class: '' },
        { key: 'CANCELORDER', title: 'Huỷ', type: 'text', class: '' },
        { key: 'EDIT', title: 'Sửa', type: 'text', class: '' },
        // { key: 'DETAIL', title: 'Chi tiết', type: 'text', class: '' },
        { key: 'UPDATEPRICE', title: 'Cập nhật giá', type: 'text', class: '' },
        { key: 'ProductEachBag', title: 'Số Bag', type: 'text', class: '' },
        // { key: 'SLD', title: 'Đá', type: 'text', class: '' },
        // { key: 'BagCreated', title: 'Tạo Bag', type: 'text', class: '' },
        { key: 'PRINT1', title: 'In mẫu 1', type: 'text', class: '' },
        { key: 'PRINT2', title: 'In mẫu 2', type: 'text', class: '' },

    ],
    listHeaderTableOrderMold: [
        { key: 'IdOrder', title: 'Mã đơn hàng', type: 'text', class: '' },
        { key: 'IdCustomer', title: 'Mã KH/Sale', type: 'text', class: '' },
        { key: 'DayMake', title: 'Ngày nhập', type: 'text', class: '' },
        { key: 'StatusOrder', title: 'TT đơn hàng', type: 'text', class: '' },        
        { key: 'StatusBag', title: 'TT bag', type: 'text', class: '' },
        { key: 'StatusMold', title: 'TT đúc', type: 'text', class: '' },
        { key: 'StatusTransfer', title: 'TT xuất', type: 'text', class: '' },        
        { key: 'ACCEPTORDER', title: 'Xác nhận', type: 'text', class: '' },
        { key: 'StatusOrderMold', title: 'Xác nhận đúc', type: 'text', class: '' },
        { key: 'CANCELORDER', title: 'Huỷ', type: 'text', class: '' },
        { key: 'EDIT', title: 'Sửa', type: 'text', class: '' },
        // { key: 'DETAIL', title: 'Chi tiết', type: 'text', class: '' },
        { key: 'UPDATEPRICE', title: 'Cập nhật giá', type: 'text', class: '' },
        { key: 'ProductEachBag', title: 'Tổng số Bag', type: 'text', class: '' },
        // { key: 'SLD', title: 'Đá', type: 'text', class: '' },
        // { key: 'BagCreated', title: 'Tạo Bag', type: 'text', class: '' },
        { key: 'PRINT1', title: 'In mẫu 1', type: 'text', class: '' },
        { key: 'PRINT2', title: 'In mẫu 2', type: 'text', class: '' },

    ],
    isDetail: false,
    isShowStone: false,
    listStoneByProducts: [],
    listCastingByProducts: [],
    listStoneSelected: [],
    listCastingSelected: [],
    listProductsSelected: [],
    listBagSelected: [],
    listCustomer: [],
    namecustomer: '',
    list_products: [],
    list_products_by_baogia: [],
    listHeaderProducts: [
        { key: 'IDimg', title: 'Hình ảnh', type: 'text', class: '' },
        { key: 'ID', title: 'Mã sản phẩm', type: 'text', class: '' },
        // { key: 'IMAGE', title: 'Hình ảnh', type: 'text', class: '' },
        { key: 'SL', title: 'Số lượng', type: 'text', class: '' },
        { key: 'COLOR', title: 'Màu đá', type: 'text', class: '' },
        { key: 'SIZE', title: 'Size', type: 'text', class: '' },
        { key: 'IDAdd', title: ' + ', type: 'text', class: '' },
        { key: 'TBREMARK', title: 'Ghi chú', type: 'text', class: '' },
        { key: 'TL', title: 'TL Vàng (Chỉ)', type: 'text', class: '' },
        { key: 'TLUT', title: 'Tổng TL Vàng(Chỉ)', type: 'text', class: '' },
        { key: 'PRICE_BASIC', title: 'Giá bán', type: 'text', class: '' },
        { key: 'SUM_BASIC', title: 'Thành tiền', type: 'text', class: '' },
        { key: 'PRICE', title: 'Giá tiền discount', type: 'text', class: '' },
        { key: 'SUM', title: 'Thành tiền sau discount', type: 'text', class: '' },
        { key: 'DELETE', title: 'Xoá', type: 'text', class: '' },
    ],
    listHeaderBag: [
        { key: 'IDBAG', title: 'Mã bag', type: 'text', class: '' },
        { key: 'ID', title: 'Mã sản phẩm', type: 'text', class: '' },
        { key: 'QTY', title: 'Số lượng', type: 'text', class: '' },
        { key: 'REMARK', title: 'Ghi chú', type: 'text', class: '' },
        { key: 'STATUS', title: 'TT Nhập ', type: 'text', class: '' },
        { key: 'DETAIL', title: 'Chi tiết', type: 'text', class: '' }
    ],
    listHeaderStone: [
        { key: 'IDSTONE', title: 'Mã đá', type: 'text', class: '' },
        { key: 'SL', title: 'Số lượng', type: 'text', class: '' }
    ],
    list_stone_by_order: [],
    default_product: {
        index: 0,
        stt: 0,
        IdOrder: '',
        IdOdd: 0,
        value: '',
        label: '',
        color: '005', //mặc định màu trắng khi thêm
        sl: '',
        url_image: '',
        size: '',
        tl: 0,
        tlut: 0,
        price: '',
        sum: 0,
        list_set: [],
        isExists: false,
        remark: ''

    },
    list_status_order: [],
    infoStone: {},
    discount: 0,
    allChecked: false,
    isEditProducts: '',
    list_data_baogia: []
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_LIST_BAO_GIA_IN_ORDER:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_DYNAMIC_COMBOBOX_ORDER:
            return {
                ...state,
                ...action.payload
            }
        case CHECK_EXISTS_BAG_OUTPUT:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_EXISTS_PRODUCT:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIS_SALE_PRICE:
            return {
                ...state,
                ...action.payload
            }
        case CLICK_ROW_DATA_BAG:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_STONE_BY_ORDER:
            return {
                ...state,
                ...action.payload
            }
        case SHOW_STONE:
            return {
                ...state,
                ...action.payload
            }
        case GET_SET_PRODUCTS:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_BAG_BY_ORDRER:
            return {
                ...state,
                ...action.payload
            }
        case ACCEPT_ORDER:
            return {
                ...state,
                ...action.payload
            }
        case ADD_LIST_PRODUCTS_BY_ORDER:
            return {
                ...state,
                ...action.payload
            }
        case GENERATE_NUMBER_ID_ORDER:
            return {
                ...state,
                ...action.payload
            }
        case REMOVE_ITEM_PRODUCTS_SELECTED:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_PRODUCT_BY_ORDER:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_CELL_INPUT_BY_ID:
            return {
                ...state,
                ...action.payload
            }
        case ARRAY_ITEM_PRODUCTS:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_PRODUCTS_BY_PRICE:
            return {
                ...state,
                ...action.payload
            }
        case SELECT_CUSTOMER:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_CUSTOMER:
            return {
                ...state,
                ...action.payload
            }
        case CHANGE_PAGE_TABLE:
            return {
                ...state,
                ...action.payload
            }
        case RESET_DATA_ORDER:
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
        case CLICK_ROW_DATA_ORDER:
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
        case IS_EDIT:
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