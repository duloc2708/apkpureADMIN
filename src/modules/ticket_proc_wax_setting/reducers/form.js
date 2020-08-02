import {
    GET_LIST_CASTING_PROC,
    CLICK_ROW_DATA_CASTING,
    IS_EDIT_CASTING,
    UPDATE_CELL_INPUT_BY_BAG,
    INIT_ADD_CASTING_PROC,
    GET_LIST_WORKER,
    GENERATE_NUMBER_ID_CASTING,
    CLEAR_DATA_CASTING_PROC,
    UPDATE_EXISTS_BAG,
    SHOW_FORM_STONE,
    GET_LIST_WAXSET_BY_BAG,
    GET_CONFIG_PROCESS_TICKET,
    GET_LIST_HEADER_TABLE,
    ADD_ITEM_BAG,
    GET_LIST_TICKET_DETAIL,
    UPDATE_CELL_TICKET_STONE,
    UPDATE_TYPE_IN_OUT,
    UPDATE_BAG_DETAIL,
    LOADING_TICKET_PROC,
    GET_ALL_BAG_IN_TICKET
} from '../types'
let oldUserInfo = SportConfig._getCookie('userInfo')
try {
    oldUserInfo = JSON.parse(SportConfig.function._base64.decode(oldUserInfo))
} catch (e) {
    oldUserInfo = null
}
let username = oldUserInfo && oldUserInfo.user_name || ''

const INITIAL_STATE = {
    objConfig: {
        Code: ''
        , Name: ''
        , Type: ''
        , IsApply: ''
        , PriorProcess: ''
        , IsIncludeInOut: ''
        , IsGoldTypeRequest: ''
        , Priorities: ''
        , IsUsePriorData: ''
    },
    list_data: [],
    isDetail: false,
    itemDetail: '',
    objData: {
        IdTicket: ''
        , CodeProcess: ''
        , CodeTicket: ''
        , Name: ''
        , ValueDate: moment()
        , CodeLV: ''
        , ValueLV: ''
        , Notes: ''
        , Waxset_Weight_T: ''
        , Product_Weight_IN_T: ''
        , Broken_Weight_IN_T: ''
        , Gold_Weight_IN_T: ''
        , Product_Weight_OUT_T: ''
        , Broken_Weight_OUT_T: ''
        , Gold_Weight_OUT_T: ''
        , Gold_Lost_T: ''
        , Worker: ''
        , Status: ''
        , created_by: username
    },
    listHeaderTableNotIntOut: [
        { key: 'IDCASTING', title: 'Số ticket', type: 'text', class: '', valueFilter: '' },
        { key: 'NAME', title: 'Tên', type: 'text', class: '', valueFilter: '' },
        { key: 'DATE', title: 'Ngày thực hiện', type: 'text', class: '', valueFilter: '' },
        { key: 'WORKER', title: 'Worker', type: 'text', class: '', valueFilter: '' },
        { key: 'WEIGHTWAXSET', title: 'TL waxset', type: 'text', class: '', valueFilter: '' },
        { key: 'WEIGHTPRODUCTIN', title: 'TL Sản phẩm', type: 'text', class: '', valueFilter: '' },
        { key: 'WEIGHTBROKENIN', title: 'TL đá rớt', type: 'text', class: '', valueFilter: '' },
        { key: 'WEIGHTGOLDIN', title: 'TL vàng', type: 'text', class: '', valueFilter: '' },
        { key: 'GOLDLOST', title: 'Vàng hao hụt', type: 'text', class: '', valueFilter: '' },
        { key: '    ', title: 'Trạng thái', type: 'text', class: '', valueFilter: '' },
        { key: 'ACCEPT_ORDER', title: 'Xác nhận', type: 'text', class: '' },
        { key: 'EDIT', title: 'Sửa', type: 'text', class: '' },
        { key: 'DETAIL', title: 'Chi tiết', type: 'text', class: '' }
    ],
    listHeaderTableInOut: [
        { key: 'IDCASTING', title: 'Số ticket', type: 'text', class: '', valueFilter: '' },
        { key: 'NAME', title: 'Tên', type: 'text', class: '', valueFilter: '' },
        { key: 'DATE', title: 'Ngày thực hiện', type: 'text', class: '', valueFilter: '' },
        { key: 'WORKER', title: 'Worker', type: 'text', class: '', valueFilter: '' },
        { key: 'WEIGHTWAXSET', title: 'TL waxset', type: 'text', class: '', valueFilter: '' },
        { key: 'WEIGHTPRODUCTIN', title: 'TL Sản phẩm(I)', type: 'text', class: '', valueFilter: '' },
        { key: 'WEIGHTBROKENIN', title: 'TL đá rớt(I)', type: 'text', class: '', valueFilter: '' },
        { key: 'WEIGHTGOLDIN', title: 'TL vàng(I)', type: 'text', class: '', valueFilter: '' },
        { key: 'WEIGHTPRODUCTOUT', title: 'TL Sản phẩm(O)', type: 'text', class: '', valueFilter: '' },
        { key: 'WEIGHTBROKENOUT', title: 'TL đá rớt(O)', type: 'text', class: '', valueFilter: '' },
        { key: 'WEIGHTGOLDOUT', title: 'TL vàng(O)', type: 'text', class: '', valueFilter: '' },
        { key: 'GOLDLOST', title: 'Vàng hao hụt', type: 'text', class: '', valueFilter: '' },
        { key: 'STATUS', title: 'Trạng thái', type: 'text', class: '', valueFilter: '' },
        { key: 'ACCEPT_ORDER', title: 'Xác nhận', type: 'text', class: '' },
        { key: 'EDIT', title: 'Sửa', type: 'text', class: '' },
        { key: 'DETAIL', title: 'Chi tiết', type: 'text', class: '' }
    ],
    listHeaderTable: [],
    listHeaderBagWaxSetting: [
        { key: 'STT', title: 'STT', type: 'text', class: '' },
        { key: 'IDBAG', title: 'Số bag', type: 'text', class: '' },
        { key: 'LISTPRODUCT', title: 'Mã SP', type: 'text', class: '' },
        { key: 'QTYPERPRODUCT', title: 'SL theo bag', type: 'text', class: '' },
        { key: 'TOTALSTONE', title: 'Tổng SL đá gắn ', type: 'text', class: '' },
        { key: 'WORKER', title: 'Worker', type: 'text', class: '' },
        { key: 'ORDER', title: 'Đơn hàng', type: 'text', class: '' },
        { key: 'STATUS', title: 'Trạng thái', type: 'text', class: '' }
    ],
    listHeaderModalStoneBroken: [
        { key: 'STT', title: 'STT', type: 'text', class: '' },
        { key: 'IDBAG', title: 'Số Bag', type: 'text', class: '' },
        { key: 'WORKER', title: 'Worker', type: 'text', class: '' },
        { key: 'QTYASSIGNSTONE', title: 'Số lượng SP', type: 'text', class: '' },
        { key: 'IDPRODUCT', title: 'Mã SP', type: 'text', class: '' },
        { key: 'QTYPERBAGPCS', title: 'SL SP theo BAG (Pcs)', type: 'text', class: '' },
        { key: 'TOTALSTONE', title: 'Tổng SL đá gắn', type: 'text', class: '' },
        { key: 'LISTSTONE', title: 'Chi tiết đá', type: 'text', class: '' },
        { key: 'ORDER', title: 'Đơn hàng', type: 'text', class: '' },
        { key: 'DELETE', title: 'Xoá', type: 'text', class: '' }

    ],
    listStoneWaxsetDefault: [
    ],
    listStoneWaxset: [
    ],
    listBagSelected: [
    ],
    isEditProducts: '',
    list_bag_default: [],
    list_bag_ticket: [],
    default_bag: {
        index: 0,
        isNew: true
        , CodeProcess: ''
        , CodeTicket: ''
        , IdBag: ''
        , IdOrder: ''
        , ValueLV: ''
        , Notes: ''
        , Waxset_Weight: ''
        , Product_Weight_IN: ''
        , Broken_Weight_IN: ''
        , Gold_Weight_IN: ''
        , Product_Weight_OUT: ''
        , Broken_Weight_OUT: ''
        , Gold_Weight_OUT: ''
        , Gold_Lost: ''
        , Worker: ''
        , orderby: 0
        , created_by: username
    },
    isSave: false,
    list_worker: [],
    isShowStone: false,
    totalWeightBroken: 0,
    typeInOut: '',
    objBagDetail: ''
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_BAG_IN_TICKET:
            return {
                ...state,
                ...action.payload
            }
        case LOADING_TICKET_PROC:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_BAG_DETAIL:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_TYPE_IN_OUT:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_CELL_TICKET_STONE:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_TICKET_DETAIL:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_HEADER_TABLE:
            return {
                ...state,
                ...action.payload
            }
        case GET_CONFIG_PROCESS_TICKET:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_WAXSET_BY_BAG:
            return {
                ...state,
                ...action.payload
            }
        case SHOW_FORM_STONE:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_EXISTS_BAG:
            return {
                ...state,
                ...action.payload
            }
        case CLEAR_DATA_CASTING_PROC:
            return {
                ...INITIAL_STATE
            }
        case GENERATE_NUMBER_ID_CASTING:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_WORKER:
            return {
                ...state,
                ...action.payload
            }
        case INIT_ADD_CASTING_PROC:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_CELL_INPUT_BY_BAG:
            return {
                ...state,
                ...action.payload
            }
        case IS_EDIT_CASTING:
            return {
                ...state,
                ...action.payload
            }
        case CLICK_ROW_DATA_CASTING:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_CASTING_PROC:
            return {
                ...state,
                ...action.payload
            }
        case ADD_ITEM_BAG:
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