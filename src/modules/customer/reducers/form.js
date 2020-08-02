import {
  GET_LIST_CUSTOMER,
  ADD_NEW_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  CLICK_ROW_DATA,
  CHECK_ALL_ROW,
  DELETE_ITEM_ALL,
  ARRAY_ITEM_TAB_STONE,
  UPDATE_NUMBER_STONE_BY_ID,
  UPDATE_INPUT_DATA,
  CHANGE_PAGE_TABLE,
  RESET_DATA_STONE,
  CLEAR_INPUT_STONE,
  UPDATE_FILTER_VALUE_HEADER,
  GET_LIST_USER,
  GET_LIST_BAO_GIA_IN_CUSTOME,
  GET_LIST_CUSTOMER_CONFIG,
  CLICK_ROW_DATA_CUSTOMER_CONFIG,
  ADD_CUSTOMER_CONFIG,
  GET_LIST_DPOLICY,
  UPDATE_INPUT_DATA_CONFIG
} from "../types";

const INITIAL_STATE = {
  list_data: [],
  list_dpolicy: [],
  itemDetail: {},
  type_code: "",
  allChecked: false,
  listHeaderTable: [
    { key: "Code", title: "Mã", type: "text", class: "", valueFilter: "" },
    {
      key: "Name",
      title: "Tên khách hàng",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "Phone",
      title: "Tem hiệu khách",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "SaleMan",
      title: "SaleMan",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "LastOrder",
      title: "Lần đặt gần nhất",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "LastTradeDate",
      title: "Lần xuất gần nhất",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "StatusText",
      title: "Trạng thái",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "CodeLVText",
      title: "Cấu hình",
      type: "text",
      class: "",
      valueFilter: ""
    }
  ],
  listHeaderTableTab2: [
    {
      key: "CodeLV",
      title: "Loại vàng",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "CodeLH",
      title: "Loại hội",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "CodeMX",
      title: "Màu xi",
      type: "text",
      class: "",
      valueFilter: ""
    },
    { key: "CodeLAI", title: "Lai", type: "text", class: "", valueFilter: "" },
    {
      key: "CodeBaoGia",
      title: "Bảng giá",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "Discount",
      title: "Discount",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "Status",
      title: "Trạng thái",
      type: "text",
      class: "",
      valueFilter: ""
    },
    { key: "DELETE", title: "Xoá", type: "text", class: "", valueFilter: "" }
  ],
  listHeaderTabProduct: [
    { key: "ID", title: "Mã đá", type: "text", class: "", valueFilter: "" },
    // { key: 'NAME', title: 'Tên đá', type: 'text',  class: '' ,valueFilter: ''},
    { key: "SL", title: "Số lượng", type: "text", class: "", valueFilter: "" },
    { key: "DELETE", title: "Xoá", type: "text", class: "", valueFilter: "" }
  ],
  listHeaderTabCasting: [
    { key: "NAME", title: "Mã", type: "text", class: "", valueFilter: "" },
    {
      key: "SL",
      title: "Tên khách hàng",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "DELETE",
      title: "Số điện thoại",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "DELETE1",
      title: "Card number",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "DISCO",
      title: "Discount",
      type: "text",
      class: "",
      valueFilter: ""
    }
  ],
  listStoneSelected: [],
  objData: {
    Id: "",
    Code: "",
    Name: "",
    Address: "",
    Phone: "",
    IdentifyCardNumber: "",
    CodeLH: "",
    CodeMX: "",
    CodeLAI: "",
    CodeLVText: "",
    CodeBaoGia: "",
    Discount: "",
    SaleMan: "",
    Province: "",
    Limit_Cash: "",
    Limit_Gold: "",
    DueDayNum: "",
    DueDayNum4Gold: "",
    Status:0,
    StatusText:""
  },
  fieldValidateStone: [
    { key: "Code", Des: "Mã khách hàng" },
    { key: "Name", Des: "Tên khách hàng" }
  ],
  page: 1,
  total: 500,
  list_user: [],
  list_data_baogia: [],
  listCustomerConfig: [],
  objDataConfig: {
    ID: "",
    IdCustomer: "",
    CodeLH: "",
    CodeMX: "",
    CodeLAI: "",
    CodeLV: "",
    CodeBaoGia: "",
    Discount: "",
    groupKey: "",
    groupKeyText: "",
    groupKeyfullText: "",
    IsApply:1,
    DPCode:''
  },
  objDataConfigDefault: {
    ID: "",
    IdCustomer: "",
    CodeLH: "",
    CodeMX: "",
    CodeLAI: "",
    CodeLV: "",
    CodeBaoGia: "",
    Discount: "",
    groupKey: "",
    groupKeyText: "",
    groupKeyfullText: "",
    IsApply:1,
    DPCode:''
  },
  list_data_customer_combo: []
};
const Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
     case GET_LIST_DPOLICY:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_INPUT_DATA_CONFIG:
      return {
        ...state,
        ...action.payload
      };
    case ADD_CUSTOMER_CONFIG:
      return {
        ...state,
        ...action.payload
      };
    case CLICK_ROW_DATA_CUSTOMER_CONFIG:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_CUSTOMER_CONFIG:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_BAO_GIA_IN_CUSTOME:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_USER:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_FILTER_VALUE_HEADER:
      return {
        ...state,
        ...action.payload
      };
    case CLEAR_INPUT_STONE:
      return {
        ...state,
        ...action.payload
      };
    case RESET_DATA_STONE:
      return {
        ...INITIAL_STATE
      };
    case CHANGE_PAGE_TABLE:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_INPUT_DATA:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_NUMBER_STONE_BY_ID:
      return {
        ...state,
        ...action.payload
      };
    case ARRAY_ITEM_TAB_STONE:
      return {
        ...state,
        ...action.payload
      };
    case DELETE_ITEM_ALL:
      return {
        ...state,
        allChecked: false
      };
    case CHECK_ALL_ROW:
      return {
        ...state,
        ...action.payload
      };
    case CLICK_ROW_DATA:
      return {
        ...state,
        ...action.payload
      };
    case DELETE_ITEM:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_ITEM:
      return {
        ...state,
        ...action.payload
      };
    case ADD_NEW_ITEM:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_CUSTOMER:
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
