import {
    GET_LIST_OUTPUT,
    ADD_NEW_ITEM_OUTPUT,
    UPDATE_INPUT_DATA,
    IS_EDIT,
    ADD_LIST_CASTING,
    ADD_LIST_STONE,
    GET_LIST_CASTING_BY_PRODUCTS,
    GET_LIST_STONE_BY_PRODUCTS,
    CLICK_ROW_DATA_OUTPUT,
    ARRAY_ITEM_TAB_STONE,
    ARRAY_ITEM_TAB_CASTING,
    DELETE_ITEM_OUTPUT,
    REMOVE_ITEM_CASTING,
    REMOVE_ITEM_OUTPUT,
    UPDATE_NUMBER_CASTING_BY_ID,
    RESET_DATA,
    CHANGE_PAGE_TABLE,
    GET_LIST_CUSTOMER,
    SELECT_CUSTOMER_IN_OUTPUT,
    GET_LIST_PRODUCTS,
    ARRAY_ITEM_PRODUCTS,
    UPDATE_CELL_INPUT_BY_ID,
    GET_LIST_PRODUCT_BY_ORDER_IN_OUTPUT,
    REMOVE_ITEM_PRODUCTS_SELECTED,
    GENERATE_NUMBER_ID_OUTPUT,
    ADD_LIST_PRODUCTS_BY_OUTPUT,
    ACCEPT_ORDER,
    GET_LIST_BAG_BY_ORDRER,
    IS_EDIT_OUTPUT,
    RESET_DATA_OUTPUT,
    GET_LIST_PRODUCTS_BY_ORDER_OUTPUT,
    SELECTED_ORDER_OUTPUT,
    GET_LIST_ORDER_IN_OUTPUT,
    CLICK_ROW_DATA_ORDER_IN_OUT_OUT,
    GET_LIST_BAG_BY_ORDER_PRODUCT,
    CLOSE_MODAL_PRODUCT,
    UPDATE_EXISTS_PRODUCT_OUTPUT,
    UPDATE_STATUS_COMPLETED_ORDER
} from '../types'

const INITIAL_STATE = {
    list_data: [],
    itemDetail: {},
    objDataOutput: {
        IdOrder: ''
        , IdCustomer: ''
        , IdOutput: ''
        , IdCreater: ''
        , DayMake: moment(new Date(), 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
        , Status: ''
        , Remark: ''
        , StatusOrder: 'STATUS_ORDER_01'
        , StatusBag: ''
        , StatusTransfer: ''
        , CodeKH: ''
        , NameKH: ''
    },
    listHeaderTable: [
        { key: 'IdOutPut', title: 'Mã xuất hàng', type: 'text', class: '' },
        { key: 'IdOrder', title: 'Mã đơn hàng', type: 'text', class: '' },
        { key: 'IdCustomer', title: 'Mã khách hàng', type: 'text', class: '' },
        { key: 'DateOut', title: 'Ngày xuất hàng', type: 'text', class: '' },
        { key: 'EDIT', title: 'Sửa', type: 'text', class: '' },
        { key: 'DETAIL', title: 'Chi tiết', type: 'text', class: '' },
        { key: 'PRINT1', title: 'In mẫu 1', type: 'text', class: '' },
        { key: 'PRINT2', title: 'In mẫu 2', type: 'text', class: '' },
        { key: 'PRINT3', title: 'In packing list', type: 'text', class: '' },


    ],
    isDetail: false,
    listStoneByProducts: [],
    listCastingByProducts: [],
    listStoneSelected: [],
    listCastingSelected: [],
    listProductsSelected: [],
    listBagSelected: [],
    page: 1,
    total: 50,
    listCustomer: [],
    namecustomer: '',
    list_products: [],
    // listHeaderProducts: [
    //     // { key: 'IDODD', title: 'Mã Bộ', type: 'text', class: '' },
    //     { key: 'ID', title: 'Mã SP', type: 'text', class: '' },
    //     { key: 'ID2', title: 'Mã Lẻ', type: 'text', class: '' },
    //     { key: 'COLOR', title: 'Màu', type: 'text', class: '' },
    //     { key: 'SLOUTPUT', title: 'SL xuất', type: 'text', class: '' },
    //     { key: 'TONGTLDA', title: 'Tổng TL đá', type: 'text', class: '' },
    //     { key: 'TONGTLSP', title: 'Tổng TL SP', type: 'text', class: '' },
    //     { key: 'TLĐAHIEUCHINH', title: 'TL đá đ/c (Chỉ)', type: 'text', class: '' },
    //     { key: 'TRONGLUONGTBDA', title: 'TBTL đá', type: 'text', class: '' },
    //     { key: 'TRONGLUONGTBSP', title: 'TBTL SP', type: 'text', class: '' },
    //     { key: 'SLREMAIN', title: 'Còn lại', type: 'text', class: '' },
    //     { key: 'SL', title: 'Đặt', type: 'text', class: '' },
    //     { key: 'BAG', title: 'Bag', type: 'text', class: '' },
    // ],
    listHeaderProducts: [
        // { key: 'IDODD', title: 'Mã Bộ', type: 'text', class: '' },
        { key: 'IDAdd', title: '', type: 'text', class: '' },
        { key: 'IDImg', title: 'Hình ảnh', type: 'text', class: '' },
        { key: 'ID', title: 'Mã SP', type: 'text', class: '' },
        { key: 'ID2', title: 'Mã Lẻ', type: 'text', class: '' },
        { key: 'COLOR', title: 'Màu', type: 'text', class: '' },
        { key: 'SLOUTPUT', title: 'SL xuất', type: 'text', class: '' },
        { key: 'TONGTLDA', title: 'Tổng TL đá (Gr)', type: 'text', class: '' },
        { key: 'TONGTLSP', title: 'Tổng TL Vàng+đá (Gr)', type: 'text', class: '' },
        { key: 'TLĐAHIEUCHINH', title: 'TL đá đ/c 1 Pc (Chỉ)', type: 'text', class: '' },
        { key: 'TLREMARK', title: 'Ghi chú', type: 'text', class: '' },
        { key: 'TLĐACHI1PSC', title: 'TL đá 1 Pc(Chỉ)', type: 'text', class: '' },
        { key: 'TRONGLUONGVANG1C', title: 'TL Vàng 1 Pc (Chỉ)', type: 'text', class: '' },
        { key: 'TRONGLUONGVANGC', title: 'Tổng TL Vàng  (Chỉ)', type: 'text', class: '' },
        { key: 'TRONGLUONGSPC', title: 'Tổng TL Vàng+đá (Chỉ)', type: 'text', class: '' },
        { key: 'SLREMAIN', title: 'Còn lại', type: 'text', class: '' },
        { key: 'SL', title: 'Đặt', type: 'text', class: '' },
        { key: 'BAG', title: 'Bag', type: 'text', class: '' },
    ],
    listHeaderBag: [
        { key: 'IDBAG', title: 'Mã bag', type: 'text', class: '' },
        { key: 'ID', title: 'Mã sản phẩm', type: 'text', class: '' },
        { key: 'QTY', title: 'Số lượng', type: 'text', class: '' },
        { key: 'WEIGHT', title: 'Current Weight', type: 'text', class: '' },
        { key: 'FINISH', title: 'Finish Week', type: 'text', class: '' },
        { key: 'DETAIL', title: 'Chi tiết', type: 'text', class: '' }
    ],
    default_product: {
        index: '',
        stt: 0,
        sttOther: '',
        Color: '',
        ColorName: '',
        EmployeeId: '',
        IdOdd: '',
        IdOrder: '',
        IdOrderProduct: '',
        IdProduct: '',
        IdProductParent: '',
        IdProductParentColor: '',
        Image: '',
        Number: '',
        NumberTemp: '',
        ProductsEachBag: 0,
        ProductsEachOutput: 0,
        SplitBag: '',
        ValueLAI: '',
        ValueLH: '',
        ValueLV: '',
        ValueMX: '',
        codeLAI: '',
        codeLV: '',
        discount: '',
        numperset: '',
        price: '',
        price_basic: '',
        sum: '',
        sum_basic: '',
        remark: ''
    },
    ListProductByOrderOutputDefault: [],
    ListProductByOrderOutput: [],
    selectedOrder: '',
    list_order_in_output: [],
    ListProductByOrderInOutPut: [],
    listHeaderTableOrderOutPut: [
        { key: 'STATUS', title: 'STT', type: 'text', class: '' },
        { key: 'IdOrder', title: 'Mã ĐH', type: 'text', class: '' },
        { key: 'IdCustomer', title: 'Mã KH', type: 'text', class: '' },
        { key: 'DayMake', title: 'Ngày nhập', type: 'text', class: '' },
        { key: 'TypeOrder', title: 'Loại đơn', type: 'text', class: '' },
        { key: 'UPDATE', title: 'Cập nhật', type: 'text', class: '' },
        { key: 'UPDATE_ORDER', title: 'Hoàn thành đơn hàng', type: 'text', class: '' },

    ],
    list_bag: [],
    isShowProduct: false,
    height: 100
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_STATUS_COMPLETED_ORDER:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_EXISTS_PRODUCT_OUTPUT:
            return {
                ...state,
                ...action.payload
            }
        case CLOSE_MODAL_PRODUCT:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_BAG_BY_ORDER_PRODUCT:
            return {
                ...state,
                ...action.payload
            }
        case CLICK_ROW_DATA_ORDER_IN_OUT_OUT:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_ORDER_IN_OUTPUT:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_PRODUCTS_BY_ORDER_OUTPUT:
            return {
                ...state,
                ...action.payload
            }
        case SELECTED_ORDER_OUTPUT:
            return {
                ...state,
                ...action.payload
            }
        case IS_EDIT_OUTPUT:
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
        case ADD_LIST_PRODUCTS_BY_OUTPUT:
            return {
                ...state,
                ...action.payload
            }
        case GENERATE_NUMBER_ID_OUTPUT:
            return {
                ...state,
                ...action.payload
            }
        case REMOVE_ITEM_PRODUCTS_SELECTED:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_PRODUCT_BY_ORDER_IN_OUTPUT:
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
        case GET_LIST_PRODUCTS:
            return {
                ...state,
                ...action.payload
            }
        case SELECT_CUSTOMER_IN_OUTPUT:
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
        case RESET_DATA_OUTPUT:
            return {
                ...INITIAL_STATE
            }
        case UPDATE_NUMBER_CASTING_BY_ID:
            return {
                ...state,
                ...action.payload
            }
        case REMOVE_ITEM_OUTPUT:
            return {
                ...state,
                ...action.payload
            }
        case REMOVE_ITEM_CASTING:
            return {
                ...state,
                ...action.payload
            }
        case DELETE_ITEM_OUTPUT:
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
        case CLICK_ROW_DATA_OUTPUT:
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
        case GET_LIST_OUTPUT:
            return {
                ...state,
                ...action.payload
            }
        case ADD_NEW_ITEM_OUTPUT:
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