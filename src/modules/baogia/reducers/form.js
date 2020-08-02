import {
    GET_LIST_BAO_GIA,
    ADD_NEW_ITEM_BAOGIA,
    UPDATE_INPUT_DATA_PRICE,
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
    IS_EDIT_BAOGIA,
    RESET_DATA_BAOGIA,
    GET_LIST_PRODUCTS_BY_ORDER_OUTPUT,
    SELECTED_ORDER_OUTPUT,
    GET_LIST_PRODUCT_IN_BAOGIA,
    CLICK_ROW_DATA_BAOGIA,
    GET_LIST_BAG_BY_ORDER_PRODUCT,
    SHOW_LIST_PRODUCTS,
    UPDATE_PRICE_BY_TYPE,
    LOAD_FORM
} from '../types'

const INITIAL_STATE = {
    list_pricetype: [
        { value: 0, text: '--empty--' },
        { value: 1, text: 'Ratio' },
        { value: 2, text: 'Flexible' },
        { value: 3, text: 'Formula' }
    ],
    type_code: '',
    list_data: [],
    itemDetail: {},
    objDataBaoGia: {
        Pricecode: ''
        , Pricename: ''
        , PriceType: 0
        , Ratio: ''
        , Updatedate: moment(new Date(), 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss')
        , IsDisable: ''
        , Remark: ''
        , valueLAI: ''
        , VAT: ''
        , GoldRate: ''
        , PriceCatType:''
    },
    listHeaderTable: [
        { key: 'PRICECODE', title: 'Mã bảng giá', type: 'text', class: '' },
        { key: 'PRICENAME', title: 'Tên bảng giá', type: 'text', class: '' },
        { key: 'PRICETYPE', title: 'Loại giá', type: 'text', class: '' },
        { key: 'PRICECATTYPE', title: 'Kiểu tính giá', type: 'text', class: '' },
        { key: 'RATIO', title: 'Tỷ lệ', type: 'text', class: '' },
        { key: 'DATEUPDATE', title: 'Ngày cập nhật', type: 'text', class: '' },
        { key: 'EDIT', title: 'Sửa', type: 'text', class: '' },
        { key: 'PRINT', title: 'In', type: 'text', class: '' }
        // { key: 'DETAIL', title: 'Chi tiết', type: 'text', class: '' },
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
    is_load: false,
    listHeaderProducts: [
        { key: 'IDODD', title: 'Mã Bộ', type: 'text', class: '' },
        { key: 'ID', title: 'Mã SP', type: 'text', class: '' },
        { key: 'COLOR', title: 'Màu', type: 'text', class: '' },
        { key: 'SLOUTPUT', title: 'SL xuất', type: 'text', class: '' },
        { key: 'TONGTLDA', title: 'Tổng TL đá', type: 'text', class: '' },
        { key: 'TONGTLSP', title: 'Tổng TL SP', type: 'text', class: '' },
        { key: 'TLĐAHIEUCHINH', title: 'TL đá đ/c (Chỉ)', type: 'text', class: '' },
        { key: 'TRONGLUONGTBDA', title: 'TBTL đá', type: 'text', class: '' },
        { key: 'TRONGLUONGTBSP', title: 'TBTL SP', type: 'text', class: '' },
        { key: 'SLREMAIN', title: 'Còn lại', type: 'text', class: '' },
        { key: 'SL', title: 'Đặt', type: 'text', class: '' },
        { key: 'BAG', title: 'Bag', type: 'text', class: '' },
    ],

    default_product: {
        stt: 0,
        IdOrder: '',
        IdOdd: 0,
        value: '',
        label: '',
        color: '',
        sl: 1,
        url_image: '',
        size: '12 den 20',
        price: '',
        sum: 100000,
        list_set: []
    },
    ListProductByOrderOutput: [],
    selectedOrder: '',
    listProductsInProduct: [],
    ListProductByOrderInOutPut: [],
    listHeaderTableProduct: [
        { key: 'CODEPRODUCT', title: 'Mã sản phẩm', type: 'text', class: '' },
        { key: 'WEIGHTGOLD', title: 'TL ước tính', type: 'text', class: '' },
        { key: 'PRICEBASIC', title: 'Giá cơ sở', type: 'text', class: '' },
        { key: 'BUFFER', title: 'Điều chỉnh', type: 'text', class: '' },
        { key: 'LAI', title: 'Lai hao', type: 'text', class: '' },
        { key: 'LAIWEIGHT', title: 'TL Lai hao', type: 'text', class: '' },
        { key: 'LAIPRICE', title: 'Gía Lai hao', type: 'text', class: '' },
        { key: 'PRICEwLAI', title: 'Gía + Gía lai', type: 'text', class: '' },
        { key: 'VAT', title: 'VAT', type: 'text', class: '' },
        { key: 'PRICEWVAT', title: 'Giá gồm VAT', type: 'text', class: '' },
        { key: 'PRICE', title: 'Giá bán', type: 'text', class: '' },
        // { key: 'UPDATE', title: '', type: 'text', class: '' }


    ],
    list_bag: [],
    isShowProduct: false
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_FORM:
            return {
                ...state,
                is_load: true
            }
        case UPDATE_PRICE_BY_TYPE:
            return {
                ...state,
                ...action.payload
            }
        case SHOW_LIST_PRODUCTS:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_BAG_BY_ORDER_PRODUCT:
            return {
                ...state,
                ...action.payload
            }
        case CLICK_ROW_DATA_BAOGIA:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_PRODUCT_IN_BAOGIA:
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
        case IS_EDIT_BAOGIA:
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
        case RESET_DATA_BAOGIA:
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
        case UPDATE_INPUT_DATA_PRICE:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_BAO_GIA:
            return {
                ...state,
                ...action.payload
            }
        case ADD_NEW_ITEM_BAOGIA:
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