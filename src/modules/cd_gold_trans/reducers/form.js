import {
    GET_LIST_GOLD_TRANS,
    CLICK_ROW_DATA_GOLD_TRANS,
    IS_EDIT_CASTING,
    GET_ALL_BAG_IN_CASTING_PROC,
    UPDATE_CELL_INPUT_BY_BAG,
    INIT_ADD_CASTING_PROC,
    GET_LIST_WORKER,
    GENERATE_NUMBER_GOLD_TRANS,
    CLEAR_DATA_CASTING_PROC,
    UPDATE_EXISTS_BAG,
    SHOW_FORM_STONE,
    GET_LIST_WAXSET_BY_BAG,
    GET_CONFIG_PROCESS_TICKET,
    GET_LIST_HEADER_TABLE,
    ADD_ITEM_GOLD_WEIGHT,
    GET_LIST_TICKET_DETAIL,
    UPDATE_BROKEN_QTY_STONE,
    UPDATE_TYPE_IN_OUT,
    UPDATE_BAG_DETAIL,
    GET_LIST_CUSTOMER_GOLD_TRANS,
    SELECT_CUSTOMER_GOLD,
    GET_LIST_OUTPUT_BY_CUSTOMER,
    GET_LIST_OUTPUT_GOLD,
    GET_LIST_USER_CD_TRANS,
    SELECT_SALE_MAN,
    SORT_DATA_LIST_GOLD,
    ADD_NEW_ITEM
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
        , TicketType: '1'
        , TransType: 'TRANTYPE_02'
        , IdCustomer: ''
        , Beneficiary: ''
        , CodeTicket: ''
        , IdRef: ''
        , IdOutput: ''
        , Output_Amount: ''
        , Output_Weight: ''
        , Output_Weight_10: ''
        , Status: 'STATUS_TRANS_01'
        , DayMake: moment()
        , DayConfirm: ''
        , DayFinish: ''
        , PaymentWeight_T: ''
        , PaymentWeight_Real_T: ''
        , PaymentWeight10_T: ''
        , PaymentWeight10_Real_T: ''
        , Receiver: ''
        , Remaining_Debt: ''
        , Due_Date: ''
        , Notes: ''
        , created_date: ''
        , created_by: username
        , SaleMan: ''
        , SaleManName: ''
        , keyMap: ''
    },
    listHeaderTableCustom: [
        { key: 'checked', title: '', type: 'checked', format: '', class: '', icon: '', sort: false, sortBy: '' },
        { key: 'CodeTicket', title: 'Mã P/T', type: 'text', format: '', class: '', icon: '', sort: true, sortBy: '', filter: true },
        { key: 'IdRef', title: 'IdRef', type: 'text', format: '', class: '', icon: '', sort: true, sortBy: '', filter: true },
        { key: 'IdCustomer', title: 'Mã KH', type: 'text', format: '', class: '', icon: '', sort: true, sortBy: '', filter: true },
        { key: 'DayMake', title: 'Ngày phiếu', type: 'date', format: 'DD/MM/YYYY', class: '', icon: '', sort: true, sortBy: '', filter: true },
        { key: 'DayConfirm', title: 'Ngày X/N', type: 'date', format: 'DD/MM/YYYY', class: '', icon: '', sort: true, sortBy: '', filter: true },
        // { key: 'DayFinish', title: 'Ngày H/T', type: 'date', format: 'DD/MM/YYYY', class: '', icon: '', sort: true, sortBy: '', filter: true },
        // { key: 'IdOutput', title: 'Số PX/Trả', type: 'text', format: '', class: '', icon: '', sort: true, sortBy: '', filter: true },
        // { key: 'Output_Amount', title: 'Tiền công', type: 'text', format: 'money', class: '', icon: '', sort: true, sortBy: '', filter: true },
        // { key: 'Output_Weight_10', title: 'TL vàng', type: 'text', format: 'gold', class: '', icon: '', sort: true, sortBy: '', filter: true },
        { key: 'PaymentWeight10_T_0', title: 'Phải thu', type: 'text', format: 'gold', class: '', valueFilter: '', sort: true, sortBy: '', filter: true },
        { key: 'PaymentWeight10_T_1', title: 'Phải trả', type: 'text', format: 'gold', class: '', icon: '', sort: true, sortBy: '', filter: true },
        { key: 'transTypeName', title: 'Loại GD', type: 'text', format: '', class: '', icon: '', sort: true, sortBy: '', filter: true },
        { key: 'statusTransName', title: 'T.Thái', type: 'text', format: '', class: '', icon: '', sort: true, sortBy: '', filter: true },
        { key: 'ACCEPT_CASH_TRANS', title: 'X/N', type: 'button', format: '', class: '', icon: 'fa fa-check' },
        { key: 'COMPlETED_CASH_TRANS', title: 'H.Thành', type: 'button', format: '', class: '', icon: 'fa fa-check' },
        { key: 'EDIT', title: 'Sửa/Xem', type: 'button', class: '', format: '', icon: 'fa fa-pencil-square-o' },
        { key: 'PRINT', title: 'In', type: 'button', class: '', format: '', icon: 'fa fa-print' }
    ],
    listHeaderGoldCustom: [
        // { key: 'Color', title: 'Màu', type: 'combobox', type_code: 'DSM', format: '', class: '', icon: '', width: '' },
        { key: 'PaymentWeightGram', title: 'TL vàng khách trả(gram)', type: 'inputNumber', format: '', class: '', icon: '', width: '', toFixedNum: 4 },
        { key: 'PaymentWeight', title: '(ly)', type: 'text', format: '', class: '', icon: '', width: '', toFixedNum: 1 , isReal:true},
        { key: 'BTN_COPY_WEIGHT', title: '', type: 'button-no-per', format: '', class: '', icon: 'fa fa-plus', width: '' },
        { key: 'PaymentWeight_RealGram', title: 'TL vàng thực cân(gram)', type: 'inputNumber', format: '', class: '', icon: '', width: '', toFixedNum: 4 },
        { key: 'PaymentWeight_Real', title: '(ly)', type: 'text', format: '', class: '', icon: '', width: '', toFixedNum: 1, isReal:true },
        { key: 'ValueLV_Draft', title: 'Tuổi vàng khách trả(%)', type: 'inputNumber', format: '', class: '', icon: '', width: '', toFixedNum: 2 },
        { key: 'BTN_COPY_GOLD', title: '', type: 'button-no-per', format: '', class: '', icon: 'fa fa-plus', width: '' },
        { key: 'ValueLV_Confirm', title: 'Tuổi vàng TT thực tế(%)', type: 'inputNumber', format: '', class: '', icon: '', width: '', toFixedNum: 2 },
        { key: 'ValueLV_Real', title: 'Tuổi vàng nhập kho cty(%)', type: 'inputNumber', format: '', class: '', icon: '', width: '', toFixedNum: 2 },
        { key: 'PaymentWeight10', title: 'Quy trả vàng 10(chỉ)', type: 'text', format: 'gold', class: '', icon: '', isSum: true, toFixedNum: 2 },
        { key: 'PaymentWeight10_Real', title: 'Quy thực tế trả vàng 10(chỉ)', type: 'text', format: 'gold', class: '', icon: '', isSum: true, toFixedNum: 2 },
        { key: 'DELETE_WEIGHT_GOLD', title: 'Xoá', type: 'button-no-per', class: '', format: '', icon: 'fa fa-times' }
    ],
    listHeaderOutputOfCus: [
        { key: 'IDOUTPUT', title: 'Mã phiếu xuất', type: 'text', class: '' },
        { key: 'DATEOUTPUT', title: 'Ngày xuất', type: 'text', class: '' },
        { key: 'DATETRAN', title: 'Ngày giao', type: 'text', class: '' },
        { key: 'TIENCONG', title: 'Tiền công', type: 'text', class: '' },
        { key: 'DISCOUONT', title: 'Discount', type: 'text', class: '' },
        { key: 'AFTERDISCOUNT', title: 'Tiền sau Discount', type: 'text', class: '' },
        { key: 'WEIGHTGOLDCHI', title: 'TL vàng(chỉ)', type: 'text', class: '' },
        { key: 'WEIGHTGOLD', title: 'TL Vàng', type: 'text', class: '' },
        { key: 'WEIGHT10', title: 'TL vàng 10(chỉ)', type: 'text', class: '' },
        { key: 'LAI', title: 'Lai', type: 'text', class: '' },
        { key: 'WEIGHTLAI', title: 'TL Lai', type: 'text', class: '' }
    ],
    listHeaderBag: [],
    listHeaderBagNotInOut: [
        { key: 'STT', title: 'STT', type: 'text', class: '' },
        { key: 'IDBAG', title: 'Số bag', type: 'text', class: '' },
        { key: 'TLPRODUCT', title: 'TL (vàng + đá) Trừ đá rớt ', type: 'text', class: '' },
        { key: 'TLBROKEN', title: 'TL đá rớt ', type: 'text', class: '' },
        { key: 'TLGOLD', title: 'TL vàng ', type: 'text', class: '' },
        { key: 'TLWASET', title: 'TL đá waxset', type: 'text', class: '' },
        { key: 'WORKER', title: 'Worker', type: 'text', class: '' },
        { key: 'IDORDER', title: 'Đơn hàng', type: 'text', class: '' },
        { key: 'DATEORDER', title: 'Ngày đơn hàng', type: 'text', class: '' },
        { key: 'BTNREMOVE', title: 'Xoá', type: 'text', class: '' }
    ],
    listHeaderBagInOut: [
        { key: 'STT', title: 'STT', type: 'text', class: '' },
        { key: 'IDBAG', title: 'Số bag', type: 'text', class: '' },
        { key: 'TLPRODUCTIN', title: 'TL (vàng + đá) Trừ đá rớt(I)', type: 'text', class: '' },
        { key: 'TLBROKENIN', title: 'TL đá rớt(I) ', type: 'text', class: '' },
        { key: 'TLGOLDIN', title: 'TL vàng(I) ', type: 'text', class: '' },
        { key: 'TLPRODUCTOUT', title: 'TL (vàng + đá) Trừ đá rớt(0)', type: 'text', class: '' },
        { key: 'TLBROKENOUT', title: 'TL đá rớt(O) ', type: 'text', class: '' },
        { key: 'TLGOLDOUT', title: 'TL vàng(O) ', type: 'text', class: '' },
        { key: 'TLWASET', title: 'TL đá waxset', type: 'text', class: '' },
        { key: 'WORKER', title: 'Worker', type: 'text', class: '' },
        { key: 'IDORDER', title: 'Đơn hàng', type: 'text', class: '' },
        { key: 'DATEORDER', title: 'Ngày đơn hàng', type: 'text', class: '' },
        { key: 'BTNREMOVE', title: 'Xoá', type: 'text', class: '' }
    ],
    listStoneWaxset: [
    ],
    listBagSelected: [
    ],
    isEditProducts: '',
    list_bag_default: [],
    default_item: {
        isNew: true
        , IdTicketDetail: ''
        , IdTicket: ''
        , IdCustomer: ''
        , CodeTicket: ''
        , IdOutput: ''
        , CodeLV: ''
        , ValueLV: ''
        , PaymentWeightGram:''
        , PaymentWeight: ''
        , PaymentWeight_RealGram: ''
        , PaymentWeight_Real: ''
        , ValueLV_Draft: ''
        , ValueLV_Confirm: ''
        , ValueLV_Real: ''
        , PaymentWeight10: ''
        , PaymentWeight10_Real: ''
        , orderby: 0
    },
    isSave: false,
    list_worker: [],
    isShowStone: false,
    totalWeightBroken: 0,
    typeInOut: '',
    objBagDetail: '',
    listCustomer: [],
    listOutputByCustomer: [],
    listGoldSelected: [],
    listOutput: [],
    listOutputDefault: [],
    list_user: []
}
const Reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_NEW_ITEM:
            return {
              ...state,
              ...action.payload
            };
        case SORT_DATA_LIST_GOLD:
            return {
                ...state,
                ...action.payload
            }
        case SELECT_SALE_MAN:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_USER_CD_TRANS:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_OUTPUT_GOLD:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_OUTPUT_BY_CUSTOMER:
            return {
                ...state,
                ...action.payload
            }
        case SELECT_CUSTOMER_GOLD:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_CUSTOMER_GOLD_TRANS:
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
        case UPDATE_BROKEN_QTY_STONE:
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
        case GENERATE_NUMBER_GOLD_TRANS:
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
        case GET_ALL_BAG_IN_CASTING_PROC:
            return {
                ...state,
                ...action.payload
            }
        case IS_EDIT_CASTING:
            return {
                ...state,
                ...action.payload
            }
        case CLICK_ROW_DATA_GOLD_TRANS:
            return {
                ...state,
                ...action.payload
            }
        case GET_LIST_GOLD_TRANS:
            return {
                ...state,
                ...action.payload
            }
        case ADD_ITEM_GOLD_WEIGHT:
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