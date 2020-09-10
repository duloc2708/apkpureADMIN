import {
  GET_LIST_DATA_TURN_INOUT,
  CLICK_ROW_DATA,
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
  GET_LIST_CUSTOMER_CONFIG,
  GET_LIST_IDSTORES,
  GET_LIST_DATA_TRANSFER,
  GET_LIST_GOLD_TRANSFER,
  UPDATE_CELL_INPUT_SEARCH,
  GET_LIST_DATA_GOLD_COOK
} from "../types";
const type = Helper.getParam(window.location.href, "type");
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
    Customer_groupKey: "",
    DayConfirmF: '',
    Gold_Lost_T:''
  },
  listHeaderTable:[
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
      key: "TransTypeName",
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
      key: "StatusName",
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
      key: "PRINT",
      title: "In",
      type: "button",
      format: "",
      class: "",
      icon: "fa fa-print"
    },
    {
      key: "EDIT",
      title: "Sửa/Xem",
      type: "button",
      class: "",
      format: "",
      icon: "fa fa-pencil-square-o"
    }
  ],
  listHeaderGold: [
    { key: "TYPE", title: "Loại vàng", type: "text", class: "" },
    { key: "WEIGHTGOLD", title: "TL vàng", type: "text", class: "" },
    { key: "WEIGHGOLD10", title: "TL vàng quy 10", type: "text", class: "" },
    { key: "COLUMN3", title: "TL vàng sau nấu", type: "text", class: "" },
    { key: "COLUMN4", title: "Hao hụt", type: "text", class: "" },
    { key: "COLUMN5", title: "Tồn kho", type: "text", class: "" },
    { key: "COLUMN6", title: "Tồn kho quy 10", type: "text", class: "" },
    { key: "COLUMN7", title: "Tồn kho BAG", type: "text", class: "" }
  ],
  listHeaderGoldCook: [
    { key: "ID", title: "#", type: "text", class: "" },
    { key: "TYPE", title: "Kho worker", type: "text", class: "" },
    { key: "WEIGHTGOLD", title: "Loại vàng", type: "text", class: "" },
    { key: "COLUMN3", title: "TL vàng đi nấu", type: "text", class: "" },
    { key: "COLUMN5", title: "TL vàng quy 10", type: "text", class: "" },
    { key: "COLUMN7", title: "TL vàng sau nấu ", type: "text", class: "" },
    { key: "COLUMN6", title: "Tồn kho BAG", type: "text", class: "" },
    { key: "COLUMN4", title: "Hao hụt", type: "text", class: "" }
  ],
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
  isLoadingTableProducts: false,
  list_turn_type: [],
  listCdTurnInDefault: [],
  listCdTurnIn: [],
  listOutputByCustomer: [],
  listCustomerConfig: [],

  list_data: [],
  list_data_gold:[],
  list_data_idstores:[],
  objData:{
    IdTransfer:'',
  	keyMap:'',
  	TransType:type==0?'TF_TYPE_01':'TF_TYPE_03',
    TransTypeName:'',
  	TransDesc:'',
  	IdStore_From:'',
  	IdStore_To:'',
  	Status:'STATUS_TRANS_01',
  	DayMake:new Date(),
  	DayConfirm:'',
  	Due_Date:'',
  	Notes:'',
    TypeGoldWarm:'',
    TotalWeightAfterWarm:'',
    TotalWeightBeforeCook:'',
    Gold_Lost_T:'',
    DayConfirmF: ''
  },
  objDataDetail:{
    IdTransferdetail:'',
    keyMap:'',
    ValueLV_From:'',
    ValueLV_To:'',
    TF_Weight_From:'',
    TF_Weight_To:'',
    Status:'',
    TF_Weight:'',
    TF_Weight10:'',
    TF_Weight_Hold:'',
    WeightAfterWarm:''
  },
  objSearchGold:{
    valueLV:''
  },
  listGoldCook:[]
};
const Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LIST_DATA_GOLD_COOK:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_DATA_TRANSFER:
      return {
        ...state,
        ...action.payload
      };
      case GET_LIST_GOLD_TRANSFER:
        return {
          ...state,
          ...action.payload
        };
    case GET_LIST_IDSTORES:
      return {
        ...state,
        ...action.payload
      };
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
    case CLICK_ROW_DATA:
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
