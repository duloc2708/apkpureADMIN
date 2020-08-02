import {
  GET_LIST_DATA_TURN_INOUT,
  CLICK_ROW_DATA_TURN_INOUT,
  IS_EDIT_CASTING,
  GET_ALL_BAG_IN_CASTING_PROC,
  UPDATE_CELL_INPUT,
  INIT_ADD_CASTING_PROC,
  GET_LIST_WORKER,
  GENERATE_NUMBER,
  CLEAR_DATA_TURN_INOUT,
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
  UPDATE_TYPE_TURN,
  UPDATE_CELL_INPUT_SEARCH,
  GET_LIST_PRODUCTS_SEARCH,
  GET_LIST_CUSTOMER_IN_CD_TURN,
  SELECT_CUSTOMER_IN_CD_TURN,
  ADD_PRODUCTS_NEW,
  LOADING_PRODUCTS,
  GET_LIST_TURN_TYPE,
  GET_LIST_PRODUCTS_DETAIL_TURN,
  INIT_DATA_CD_TURN,
  GET_LIST_PRODUCTS_INV,
  GET_LIST_BAO_GIA_IN_TURN_CD,
  GET_LIST_PRODUCTS_NOT_ACCEPT,
  GET_LIST_TURN_IN,
  GET_LIST_OUTPUT_BY_CUSTOMER,
  GET_LIST_PRODUCTS_BY_PRICE_CD_TURN,
  GET_LIST_PRODUCTS_SET,
  GET_LIST_CUSTOMER_CONFIG
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
    IdTurn: "",
    TicketCode: "",
    IdCustomer: "",
    nameCustomer: "",
    Turn_Type: "",
    Trans_Type: "TURN_TRANS_TYPE_02",
    codeLV: "",
    codeLH: "",
    codeMX: "",
    codeLAI: "",
    ValueLV: "",
    ValueLH: "",
    ValueMX: "",
    ValueLAI: "",
    CodeBaoGia: "",
    Staff_Id: "",
    IdOrder: "",
    DayMake: moment(),
    StatusTurnback: "",
    Remark: "",
    discount: "",
    IsDeleted: "",
    total_org_amount: "",
    total_amount: "",
    total_gold: "",
    total_gold_adjust: "",
    total_gold_10: "",
    total_gold_10_adjust: "",
    total_product_w: "",
    total_qty: "",
    total_amount_adjust: "",
    saleman: "",
    DayConfirm: "",
    DayFinish: "",
    DayDeliver: "",
    created_by: username,
    created_date: moment(),
    updated_by: "",
    updated_date: "",
    IdRef: "",
    Customer_groupKey: ""
  },
  listHeaderTableCustomIn: [
    {
      key: "checked",
      title: "",
      type: "checked",
      format: "",
      class: "",
      icon: "",
      sort: false,
      sortBy: "",
      filter: false
    },
    {
      key: "keyMap",
      title: "Mã phiếu",
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
      title: "Ngày thực hiện",
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
    {
      key: "nameCustomer",
      title: "Khách hàng",
      type: "text",
      format: "",
      class: "",
      icon: "",
      sort: true,
      sortBy: "",
      filter: true
    },
    {
      key: "nameLV",
      title: "Loại vàng",
      type: "text",
      format: "",
      class: "",
      icon: "",
      sort: true,
      sortBy: "",
      filter: true
    },
    {
      key: "Turn_TypeName",
      title: "Loại",
      type: "text",
      format: "",
      class: "",
      icon: "",
      sort: true,
      sortBy: "",
      filter: true
    },
    {
      key: "statusName",
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
      key: "ACCEPT_ORDER",
      title: "Xác nhận",
      type: "button",
      format: "",
      class: "",
      icon: "fa fa-check"
    },
    {
      key: "COMPlETED_OUTPUT",
      title: "Hoàn thành",
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
      title: "In mẫu 1",
      codeCustom: "type1",
      type: "button",
      class: "",
      format: "",
      icon: "fa fa-print"
    },
    {
      key: "PRINT",
      title: "In mẫu 2",
      codeCustom: "type2",
      type: "button",
      class: "",
      format: "",
      icon: "fa fa-print"
    }
  ],
  listHeaderTableCustomOut: [
    {
      key: "checked",
      title: "",
      type: "checked",
      format: "",
      class: "",
      icon: "",
      sort: false,
      sortBy: "",
      filter: false
    },
    {
      key: "keyMap",
      title: "Mã phiếu",
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
      title: "Ngày thực hiện",
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
    {
      key: "nameCustomer",
      title: "Khách hàng",
      type: "text",
      format: "",
      class: "",
      icon: "",
      sort: true,
      sortBy: "",
      filter: true
    },
    {
      key: "nameLV",
      title: "Loại vàng",
      type: "text",
      format: "",
      class: "",
      icon: "",
      sort: true,
      sortBy: "",
      filter: true
    },
    {
      key: "Turn_TypeName",
      title: "Loại",
      type: "text",
      format: "",
      class: "",
      icon: "",
      sort: true,
      sortBy: "",
      filter: true
    },
    {
      key: "statusName",
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
      key: "ACCEPT_ORDER",
      title: "Xác nhận",
      type: "button",
      format: "",
      class: "",
      icon: "fa fa-check"
    },
    {
      key: "COMPlETED_OUTPUT",
      title: "Hoàn thành",
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
      title: "In mẫu 1",
      codeCustom: "type1",
      type: "button",
      class: "",
      format: "",
      icon: "fa fa-print"
    },
    {
      key: "PRINT",
      title: "In mẫu 2",
      codeCustom: "type2",
      type: "button",
      class: "",
      format: "",
      icon: "fa fa-print"
    },
    {
      key: "PRINT",
      title: "In P/K list",
      codeCustom: "type3",
      type: "button",
      class: "",
      format: "",
      icon: "fa fa-print"
    },
    {
      key: "PRINT",
      title: "In Tem",
      codeCustom: "type4",
      type: "button",
      class: "",
      format: "",
      icon: "fa fa-print"
    }
  ],
  listHeaderProducts: [
    { key: "STT", title: "#", type: "text", class: "" },
    { key: "IDImg", title: "Hình ảnh", type: "text", class: "" },
    { key: "ID", title: "Mã SP", type: "text", class: "" },
    { key: "ID2", title: "Mã Lẻ", type: "text", class: "" },
    { key: "COLOR", title: "Màu", type: "text", class: "" },
    // { key: 'LV', title: 'Loại vàng', type: 'text', class: '' },
    // { key: 'MX', title: 'Màu xi', type: 'text', class: '' },
    // { key: 'LH', title: 'Loại hội', type: 'text', class: '' },
    // { key: 'LAI', title: 'LAI', type: 'text', class: '' },
    { key: "SLOUTPUT", title: "SL", type: "text", class: "" },
    { key: "TONGTLDA", title: "Tổng TL đá (Gr)", type: "text", class: "" },
    { key: "TONGTLSP", title: "Tổng TL Vàng+đá (Gr)", type: "text", class: "" },
    {
      key: "TLĐAHIEUCHINH",
      title: "TL đá đ/c 1Pc (Chỉ)",
      type: "text",
      class: ""
    },
    { key: "TLREMARK", title: "Ghi chú", type: "text", class: "" },
    { key: "TLPRICE", title: "Giá", type: "text", class: "" },
    { key: "TLĐACHI1PSC", title: "TL đá 1 Pc(ly)", type: "text", class: "" },
    {
      key: "TRONGLUONGVANG1C",
      title: "TL Vàng 1Pc (ly)",
      type: "text",
      class: ""
    },
    {
      key: "TRONGLUONGVANGC",
      title: "Tổng TL Vàng (ly)",
      type: "text",
      class: ""
    },
    {
      key: "TRONGLUONGSPC",
      title: "Tổng TL Vàng+đá (ly)",
      type: "text",
      class: ""
    },
    { key: "DELETE", title: "Xoá", type: "text", class: "" }
  ],
  listHeaderProductsOut: [
    { key: "STT", title: "#", type: "text", class: "" },
    { key: "IDImg", title: "Hình ảnh", type: "text", class: "" },
    { key: "ID", title: "Mã SP", type: "text", class: "" },
    { key: "ID2", title: "Mã Lẻ", type: "text", class: "" },
    { key: "COLOR", title: "Màu", type: "text", class: "" },
    { key: "SLOUTPUT", title: "SL xuất", type: "text", class: "" },
    { key: "TONGTLDA", title: "Tổng TL đá (Gr)", type: "text", class: "" },
    { key: "TONGTLSP", title: "Tổng TL Vàng+đá (Gr)", type: "text", class: "" },
    {
      key: "TLĐAHIEUCHINH",
      title: "TL đá đ/c 1Pc (Chỉ)",
      type: "text",
      class: ""
    },
    { key: "TLREMARK", title: "Ghi chú", type: "text", class: "" },
    { key: "TLPRICE", title: "Giá", type: "text", class: "" },
    { key: "TLĐACHI1PSC", title: "TL đá 1 Pc(Chỉ)", type: "text", class: "" },
    {
      key: "TRONGLUONGVANG1C",
      title: "TL Vàng 1Pc (Chỉ)",
      type: "text",
      class: ""
    },
    {
      key: "TRONGLUONGVANGC",
      title: "Tổng TL Vàng (Chỉ)",
      type: "text",
      class: ""
    },
    {
      key: "TRONGLUONGSPC",
      title: "Tổng TL Vàng+đá (Chỉ)",
      type: "text",
      class: ""
    },
    { key: "TYPEINV", title: "Loại tồn", type: "text", class: "" },
    { key: "DELETE", title: "Xoá", type: "text", class: "" }
  ],
  listHeaderProductsSearch: [
    { key: "IDAdd", title: "", type: "text", class: "" },
    { key: "IDImg", title: "Hình", type: "text", class: "" },
    { key: "IDOUTPUT", title: "Mã PX", type: "text", class: "" },
    { key: "ID", title: "Mã SP", type: "text", class: "" },
    { key: "ID2", title: "Mã Lẻ", type: "text", class: "" },
    { key: "COLOR", title: "Màu", type: "text", class: "" },
    { key: "LV", title: "Loại vàng", type: "text", class: "" },
    { key: "MX", title: "Màu xi", type: "text", class: "" },
    { key: "LH", title: "Hội", type: "text", class: "" },
    { key: "LAI", title: "LAI", type: "text", class: "" },
    { key: "SLOUTPUT", title: "SL", type: "text", class: "" },
    { key: "TLPRICE", title: "Giá", type: "text", class: "" },
    { key: "WEIGHTCUSTOM", title: "TL đá đ.c(ly)", type: "text", class: "" },
    { key: "TLĐACHI1PSC", title: "TL đá 1/Pc (ly)", type: "text", class: "" },
    {
      key: "TRONGLUONGVANG1C",
      title: "TL Vàng 1Pc (ly)",
      type: "text",
      class: ""
    },
    {
      key: "TRONGLUONGVANGC",
      title: "Tổng TL Vàng (ly)",
      type: "text",
      class: ""
    },
    {
      key: "TRONGLUONGSPC",
      title: "Tổng TL Vàng +đá (ly)",
      type: "text",
      class: ""
    },
    {
      key: "TONGTLDA",
      title: "Tổng TL đá theo bộ (ly)",
      type: "text",
      class: ""
    },
    {
      key: "TONGTLSP",
      title: "Tổng TL Vàng theo bộ (ly)",
      type: "text",
      class: ""
    }
  ],
  listHeaderProductsSearchOut: [
    { key: "IDAdd", title: "", type: "text", class: "" },
    { key: "IDImg", title: "Hình ảnh", type: "text", class: "" },
    { key: "ID", title: "Mã SP", type: "text", class: "" },
    { key: "ID2", title: "Mã Lẻ", type: "text", class: "" },
    { key: "COLOR", title: "Màu", type: "text", class: "" },
    { key: "LV", title: "Loại vàng", type: "text", class: "" },
    { key: "MX", title: "Màu xi", type: "text", class: "" },
    { key: "LH", title: "Loại hội", type: "text", class: "" },
    { key: "LAI", title: "LAI", type: "text", class: "" },
    { key: "PRICE", title: "Giá", type: "text", class: "" },
    { key: "TYPEINV", title: "Loại tồn", type: "text", class: "" },
    { key: "REMAIN", title: "Tồn còn lại", type: "text", class: "" }
  ],
  listProductSelected: [],
  list_data_baogia: [],
  isEditProducts: "",
  list_bag_default: [],
  default_product: {
    OrderIndex: 0,
    isNew: true,
    Id: "",
    IdTurn: "",
    TicketCode: "",
    IdOrder: "",
    IdProduct: "",
    Qty: "",
    QtyOrder: "",
    Color: "001",
    Weight: "",
    WeightAvg: "",
    WeightProduct: "",
    WeightAvgProduct: "",
    WeightCustom: "",
    IdProductParent: "",
    price: "",
    amountgroup: "",
    amount: "",
    valueLV: "",
    ValueLH: "",
    ValueLAI: "",
    ValueMX: "",
    WeightTotal: "",
    WeightProductTotal: "",
    WeightGoldTotal: "",
    IdOdd: "",
    numperset: "",
    IdProductParentColor: "",
    org_price: "",
    org_amount: "",
    discount: "",
    IdGroup: "",
    OrderByData: "",
    REMARK: "",
    IdGroupStt: "",
    IsDeleted: "",
    bgcolor: "",
    totalQty: "",
    TempIdProductParent: "",
    keyNum: "",
    orderby_org: "",
    BagList: "",
    Inv_Type: 0,
    CodeLV: "",
    CodeLH: "",
    CodeMX: "",
    CodeLAI: "",
    totalREMAIN: 0,
    Genkey: ""
  },
  isSave: false,
  list_worker: [],
  isShowStone: false,
  totalWeightBroken: 0,
  typeInOut: "",
  objBagDetail: "",
  list_products_search: [],
  list_products_inv: [],
  typeTurn: false,
  objSearch: {
    IdProduct: "", //FLSE00185
    IdOutput: "",
    Weight: "",
    SCodeLV: "",
    SCodeLH: "",
    SCodeMX: "",
    SIdCustomer: "",
    Is_Filter: false,
    Inv: 0,
    CodeBaoGia: "",
    SColor: "",
    TicketCode: ""
  },
  listCustomer: [],
  isLoadingTableProducts: false,
  list_turn_type: [],
  CodeBaoGiaTemp: "",
  listProductsNotAccept: [],
  listCdTurnInDefault: [],
  listCdTurnIn: [],
  listOutputByCustomer: [],
  list_products_by_baogia: [],
  list_products_set: [],
  isRenderSearch: false,
  listCustomerConfig: []
};
const Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LIST_CUSTOMER_CONFIG:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_PRODUCTS_SET:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_PRODUCTS_BY_PRICE_CD_TURN:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_OUTPUT_BY_CUSTOMER:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_TURN_IN:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_PRODUCTS_NOT_ACCEPT:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_BAO_GIA_IN_TURN_CD:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_PRODUCTS_INV:
      return {
        ...state,
        ...action.payload
      };
    case INIT_DATA_CD_TURN:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_PRODUCTS_DETAIL_TURN:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_TURN_TYPE:
      return {
        ...state,
        ...action.payload
      };
    case LOADING_PRODUCTS:
      return {
        ...state,
        ...action.payload
      };
    case ADD_PRODUCTS_NEW:
      return {
        ...state,
        ...action.payload
      };
    case SELECT_CUSTOMER_IN_CD_TURN:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_CUSTOMER_IN_CD_TURN:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_PRODUCTS_SEARCH:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_CELL_INPUT_SEARCH:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_TYPE_TURN:
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
    case CLEAR_DATA_TURN_INOUT:
      return {
        ...INITIAL_STATE
      };
    case GENERATE_NUMBER:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_WORKER:
      return {
        ...state,
        ...action.payload
      };
    case INIT_ADD_CASTING_PROC:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_CELL_INPUT:
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
    case CLICK_ROW_DATA_TURN_INOUT:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_DATA_TURN_INOUT:
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
