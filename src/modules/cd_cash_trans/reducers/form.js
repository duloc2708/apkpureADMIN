import {
  SELECT_SALE_MAN_TRANS,
  GET_LIST_CASH_TRANS,
  CLICK_ROW_CASH_TRANS,
  IS_EDIT_CASTING,
  GET_ALL_BAG_IN_CASTING_PROC,
  UPDATE_CELL_INPUT_CASH,
  INIT_ADD_CASTING_PROC,
  GET_LIST_USER,
  GENERATE_NUMBER_ID_CASH_TRANS,
  CLEAR_DATA_CASTING_PROC,
  UPDATE_EXISTS_BAG,
  SHOW_FORM_STONE,
  GET_LIST_WAXSET_BY_BAG,
  GET_CONFIG_PROCESS_TICKET,
  GET_LIST_HEADER_TABLE,
  ADD_ITEM_BAG,
  GET_LIST_TICKET_DETAIL,
  UPDATE_BROKEN_QTY_STONE,
  UPDATE_TYPE_IN_OUT,
  UPDATE_BAG_DETAIL,
  GET_LIST_CUSTOMER,
  SELECT_CUSTOMER_CASH,
  GET_LIST_OUTPUT_BY_CUSTOMER,
  GET_LIST_OUTPUT,
  SORT_DATA_LIST_CASH,
  ADD_NEW_ITEM
} from "../types";
let oldUserInfo = SportConfig._getCookie("userInfo");
try {
  oldUserInfo = JSON.parse(SportConfig.function._base64.decode(oldUserInfo));
} catch (e) {
  oldUserInfo = null;
}
let username = (oldUserInfo && oldUserInfo.user_name) || "";

const INITIAL_STATE = {
  objConfig: {
    Code: "",
    Name: "",
    Type: "",
    IsApply: "",
    PriorProcess: "",
    IsIncludeInOut: "",
    IsGoldTypeRequest: "",
    Priorities: "",
    IsUsePriorData: ""
  },
  list_data: [],
  isDetail: false,
  itemDetail: "",
  objData: {
    IdTicket: "",
    TicketType: "1",
    TransType: "TRANTYPE_02",
    IdCustomer: "",
    Beneficiary: "",
    CodeTicket: "",
    IdRef: "",
    IdOutput: "",
    Output_Amount: "",
    Output_Weight: "",
    Output_Weight_10: "",
    Status: "STATUS_TRANS_01",
    DayMake: moment(),
    DayConfirm: "",
    DayFinish: "",
    Payment_Type: "PAYMENT_TYPE_01",
    PaymentAmount: "",
    Receiver: "",
    Remaining_Debt: "",
    Due_Date: "",
    Notes: "",
    confirm_date: "",
    confirm_by: username,
    created_by: username,
    SaleMan: "",
    SaleManName: "",
    keyMap: ""
  },
  listHeaderTable: [
    {
      key: "checked",
      title: "",
      type: "checked",
      format: "",
      class: "",
      icon: "",
      sort: false,
      sortBy: ""
    },
    {
      key: "CodeTicket",
      title: "Mã P/T",
      type: "text",
      format: "",
      class: "",
      icon: "",
      sort: true,
      sortBy: "",
      filter: true
    },
    {
      key: "IdRef",
      title: "IdRef",
      type: "text",
      format: "",
      class: "",
      icon: "",
      sort: true,
      sortBy: "",
      filter: true
    },
    {
      key: "IdCustomer",
      title: "Mã KH",
      type: "text",
      format: "",
      class: "",
      icon: "",
      sort: true,
      sortBy: "",
      filter: true
    },
    {
      key: "DayMake",
      title: "Ngày phiếu",
      type: "date",
      format: "DD/MM/YYYY",
      class: "",
      icon: "",
      sort: true,
      sortBy: "",
      filter: true
    },
    {
      key: "DayConfirm",
      title: "Ngày X/N",
      type: "date",
      format: "DD/MM/YYYY",
      class: "",
      icon: "",
      sort: true,
      sortBy: "",
      filter: true
    },
    // { key: 'CODEPX', title: 'Số PX/ Trả', type: 'text', format: '', class: '', icon: '', sort: true, sortBy: '', filter: true },
    // { key: 'IdOutput', title: 'Ngày H/T', type: 'date', format: 'DD/MM/YYYY', class: '', icon: '', sort: true, sortBy: '', filter: true },
    {
      key: "Output_Amount",
      title: "Tiền công",
      type: "text",
      format: "money",
      class: "",
      icon: "",
      sort: true,
      sortBy: "",
      filter: true
    },
    {
      key: "Output_Weight_10",
      title: "TL vàng",
      type: "text",
      format: "gold",
      class: "",
      icon: "",
      sort: true,
      sortBy: "",
      filter: true
    },
    {
      key: "PaymentAmount_0",
      title: "Khách nợ",
      type: "text",
      format: "money",
      class: "",
      icon: "",
      sort: true,
      sortBy: "",
      filter: true
    },
    {
      key: "PaymentAmount_1",
      title: "Khách trả",
      type: "text",
      format: "money",
      class: "",
      icon: "",
      sort: true,
      sortBy: "",
      filter: true
    },
    {
      key: "transTypeName",
      title: "Loại GD",
      type: "text",
      format: "",
      class: "",
      icon: "",
      sort: true,
      sortBy: "",
      filter: true
    },
    {
      key: "statusTransName",
      title: "T.Thái",
      type: "text",
      format: "",
      class: "",
      icon: "",
      sort: true,
      sortBy: "",
      filter: true
    },
    {
      key: "ACCEPT_CASH_TRANS",
      title: "X/N",
      type: "button",
      format: "",
      class: "",
      icon: "fa fa-check"
    },
    {
      key: "COMPlETED_CASH_TRANS",
      title: "H.Thành",
      type: "button",
      format: "",
      class: "",
      icon: "fa fa-check"
    },
    {
      key: "EDIT",
      title: "Sửa/Xem",
      type: "button",
      class: "",
      format: "",
      icon: "fa fa-pencil-square-o"
    },
    {
      key: "PRINT",
      title: "In",
      type: "button",
      class: "",
      format: "",
      icon: "fa fa-print"
    }
  ],
  listHeaderOutputOfCus: [
    { key: "IDOUTPUT", title: "Mã phiếu xuất", type: "text", class: "" },
    { key: "DATEOUTPUT", title: "Ngày xuất", type: "text", class: "" },
    { key: "DATETRAN", title: "Ngày giao", type: "text", class: "" },
    { key: "TIENCONG", title: "Tiền công", type: "text", class: "" },
    { key: "DISCOUONT", title: "Discount", type: "text", class: "" },
    {
      key: "AFTERDISCOUNT",
      title: "Tiền sau Discount",
      type: "text",
      class: ""
    },
    { key: "WEIGHTGOLDCHI", title: "TL vàng(chỉ)", type: "text", class: "" },
    { key: "WEIGHTGOLD", title: "TL Vàng", type: "text", class: "" },
    { key: "WEIGHT10", title: "TL vàng 10(chỉ)", type: "text", class: "" },
    { key: "LAI", title: "Lai", type: "text", class: "" },
    { key: "WEIGHTLAI", title: "TL Lai", type: "text", class: "" }
  ],
  listHeaderBag: [],
  listHeaderBagNotInOut: [
    { key: "STT", title: "STT", type: "text", class: "" },
    { key: "IDBAG", title: "Số bag", type: "text", class: "" },
    {
      key: "TLPRODUCT",
      title: "TL (vàng + đá) Trừ đá rớt ",
      type: "text",
      class: ""
    },
    { key: "TLBROKEN", title: "TL đá rớt ", type: "text", class: "" },
    { key: "TLGOLD", title: "TL vàng ", type: "text", class: "" },
    { key: "TLWASET", title: "TL đá waxset", type: "text", class: "" },
    { key: "WORKER", title: "Worker", type: "text", class: "" },
    { key: "IDORDER", title: "Đơn hàng", type: "text", class: "" },
    { key: "DATEORDER", title: "Ngày đơn hàng", type: "text", class: "" },
    { key: "BTNREMOVE", title: "Xoá", type: "text", class: "" }
  ],
  listHeaderBagInOut: [
    { key: "STT", title: "STT", type: "text", class: "" },
    { key: "IDBAG", title: "Số bag", type: "text", class: "" },
    {
      key: "TLPRODUCTIN",
      title: "TL (vàng + đá) Trừ đá rớt(I)",
      type: "text",
      class: ""
    },
    { key: "TLBROKENIN", title: "TL đá rớt(I) ", type: "text", class: "" },
    { key: "TLGOLDIN", title: "TL vàng(I) ", type: "text", class: "" },
    {
      key: "TLPRODUCTOUT",
      title: "TL (vàng + đá) Trừ đá rớt(0)",
      type: "text",
      class: ""
    },
    { key: "TLBROKENOUT", title: "TL đá rớt(O) ", type: "text", class: "" },
    { key: "TLGOLDOUT", title: "TL vàng(O) ", type: "text", class: "" },
    { key: "TLWASET", title: "TL đá waxset", type: "text", class: "" },
    { key: "WORKER", title: "Worker", type: "text", class: "" },
    { key: "IDORDER", title: "Đơn hàng", type: "text", class: "" },
    { key: "DATEORDER", title: "Ngày đơn hàng", type: "text", class: "" },
    { key: "BTNREMOVE", title: "Xoá", type: "text", class: "" }
  ],
  listHeaderModalStoneBroken: [
    { key: "STT", title: "STT", type: "text", class: "" },
    { key: "IDBAG", title: "Số Bag", type: "text", class: "" },
    { key: "IDORDER", title: "Đơn hàng", type: "text", class: "" },
    { key: "IDPRODUCT", title: "Mã SP", type: "text", class: "" },
    { key: "SLCPBAG", title: "SLSP theo BAG", type: "text", class: "" },
    { key: "IDSTONE", title: "Mã đá", type: "text", class: "" },
    { key: "COLORSTONE", title: "Màu đá", type: "text", class: "" },
    { key: "TOTALQTYSTONE", title: "Tổng SL Đá Rớt", type: "text", class: "" },
    { key: "WEIGHTSTONE", title: "Tổng TL Đá rớt", type: "text", class: "" },
    { key: "TLBQ", title: "TLBQ 1pc ", type: "text", class: "" },
    { key: "QTYSTONEPC", title: "SL đá/PCs", type: "text", class: "" },
    { key: "PERCENT", title: "Tỉ lệ rớt đá", type: "text", class: "" }
  ],
  listStoneWaxset: [],
  listBagSelected: [],
  isEditProducts: "",
  list_bag_default: [],
  default_bag: {
    index: 0,
    isNew: true,
    CodeProcess: "",
    CodeTicket: "",
    IdBag: "",
    IdOrder: "",
    ValueLV: "",
    Notes: "",
    Waxset_Weight: "",
    Product_Weight_IN: "",
    Broken_Weight_IN: "",
    Gold_Weight_IN: "",
    Product_Weight_OUT: "",
    Broken_Weight_OUT: "",
    Gold_Weight_OUT: "",
    Gold_Lost: "",
    Worker: "",
    orderby: 0,
    created_by: username
  },
  isSave: false,
  list_user: [],
  isShowStone: false,
  totalWeightBroken: 0,
  typeInOut: "",
  objBagDetail: "",
  listCustomer: [],
  listOutputByCustomer: [],
  listOutput: [],
  listOutputDefault: []
};
const Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_NEW_ITEM:
      return {
        ...state,
        ...action.payload
      };
    case SORT_DATA_LIST_CASH:
      return {
        ...state,
        ...action.payload
      };
    case SELECT_SALE_MAN_TRANS:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_OUTPUT:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_OUTPUT_BY_CUSTOMER:
      return {
        ...state,
        ...action.payload
      };
    case SELECT_CUSTOMER_CASH:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_CUSTOMER:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_BAG_DETAIL:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_TYPE_IN_OUT:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_BROKEN_QTY_STONE:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_TICKET_DETAIL:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_HEADER_TABLE:
      return {
        ...state,
        ...action.payload
      };
    case GET_CONFIG_PROCESS_TICKET:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_WAXSET_BY_BAG:
      return {
        ...state,
        ...action.payload
      };
    case SHOW_FORM_STONE:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_EXISTS_BAG:
      return {
        ...state,
        ...action.payload
      };
    case CLEAR_DATA_CASTING_PROC:
      return {
        ...INITIAL_STATE
      };
    case GENERATE_NUMBER_ID_CASH_TRANS:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_USER:
      return {
        ...state,
        ...action.payload
      };
    case INIT_ADD_CASTING_PROC:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_CELL_INPUT_CASH:
      return {
        ...state,
        ...action.payload
      };
    case GET_ALL_BAG_IN_CASTING_PROC:
      return {
        ...state,
        ...action.payload
      };
    case IS_EDIT_CASTING:
      return {
        ...state,
        ...action.payload
      };
    case CLICK_ROW_CASH_TRANS:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_CASH_TRANS:
      return {
        ...state,
        ...action.payload
      };
    case ADD_ITEM_BAG:
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
