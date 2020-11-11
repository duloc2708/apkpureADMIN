import {
  FIND_BAG_IN_PROCESS,
  GET_LIST_CASTING_PROC,
  CLICK_ROW_DATA_CASTING,
  IS_EDIT_CASTING,
  GET_ALL_BAG_IN_CASTING_PROC,
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
  CONFIRM_BAG_DETAIL,
  LOADING_TICKET_PROC,
  GET_ALL_BAG_IN_TICKET,
  UPDATE_DEFAULT_BAG,
  REMOVE_ITEM_BAG,
  GET_TICKET_SKELETON,
  SHOW_FORM_GOLD,
  GET_ALL_GOLD,
  CHANGE_OBJ_SEARCH_GOLD,
  CHANGE_WEIGHT_GOLD,
  GET_LIST_PRODUCT_BY_BAG,
  CHANGE_INPUT_PRODUCT_CANCEL,
  CHANGE_INPUT_PRODUCT_SEARCH
} from "../types";
let oldUserInfo = SportConfig._getCookie("userInfo");
try {
  oldUserInfo = JSON.parse(SportConfig.function._base64.decode(oldUserInfo));
} catch (e) {
  oldUserInfo = null;
}
let username = (oldUserInfo && oldUserInfo.user_name) || "";

const INITIAL_STATE = {
  typeModal: "",
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
    CodeProcess: "",
    CodeTicket: "",
    Name: "",
    ValueDate: moment(),
    CodeLV: "",
    ValueLV: "",
    CodeLH: "",
    ValueLH: "",
    Notes: "",
    Waxset_Weight_T: "",
    Product_Weight_IN_T: "",
    Broken_Weight_IN_T: "",
    Gold_Weight_IN_T: "",
    Product_Weight_OUT_T: "",
    Broken_Weight_OUT_T: "",
    Gold_Weight_OUT_T: "",
    Gold_Lost_T: "",
    Worker: "",
    WorkerName: "",
    Status: "",
    created_by: username,
    SkeletonWeight: "",
    GoldWeight_Estimate: "",
    Gold_Weight2Store_T: "",
    Skeleton: "",
    Product_Skeleton_Weight: "",
    AddGoldWeight_T: "",
    BackGoldWeight_T: "",
    Handset_Weight_T: "",
    CancelGoldWeight_T: ""
  },
  listHeaderTableNotIntOut: [
    {
      key: "IDCASTING",
      title: "Số ticket",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "NAME",
      title: "Tên",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "DATE",
      title: "Ngày T/hiện",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "CODELV",
      title: "Loại vàng",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "CODELVLH",
      title: "Loại Hội",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "WORKER",
      title: "Worker",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "WEIGHTWAXSET",
      title: "TL waxset",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "WEIGHTPRODUCTIN",
      title: "TL Sản phẩm",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "WEIGHTBROKENIN",
      title: "TL đá rớt",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "WEIGHTGOLDIN",
      title: "TL vàng",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "GOLDLOST",
      title: "Vàng hao hụt",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "    ",
      title: "Trạng thái",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "ACCEPT_ORDER",
      title: "X/N đi",
      type: "text",
      class: ""
    },
    {
      key: "COMPlETED_OUTPUT",
      title: "X/N về",
      type: "text",
      class: ""
    },
    {
      key: "EDIT",
      title: "Sửa",
      type: "text",
      class: ""
    },
    {
      key: "PRINT",
      title: "In",
      type: "text",
      class: ""
    }
  ],
  listHeaderTableInOut: [
    {
      key: "IDCASTING",
      title: "Số ticket",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "NAME",
      title: "Tên",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "DATE",
      title: "Ngày thực hiện",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "CODELV",
      title: "Loại vàng",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "WORKER",
      title: "Worker",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "WEIGHTWAXSET",
      title: "TL waxset",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "WEIGHTPRODUCTIN",
      title: "TL Sản phẩm(I)",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "WEIGHTBROKENIN",
      title: "TL đá rớt(I)",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "WEIGHTGOLDIN",
      title: "TL vàng(I)",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "WEIGHTPRODUCTOUT",
      title: "TL Sản phẩm(O)",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "WEIGHTBROKENOUT",
      title: "TL đá rớt(O)",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "WEIGHTGOLDOUT",
      title: "TL vàng(O)",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "GOLDLOST",
      title: "Vàng hao hụt",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "STATUS",
      title: "Trạng thái",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "ACCEPT_ORDER",
      title: "X/N đi",
      type: "text",
      class: ""
    },
    {
      key: "COMPlETED_OUTPUT",
      title: "X/N về",
      type: "text",
      class: ""
    },
    {
      key: "EDIT",
      title: "Sửa",
      type: "text",
      class: ""
    },
    {
      key: "PRINT",
      title: "In",
      type: "text",
      class: ""
    },
    {
      key: "DETAIL",
      title: "Chi tiết",
      type: "text",
      class: ""
    }
  ],
  listHeaderTable: [],
  listHeaderBag: [],
  listHeaderBagSkeleton: [
    { key: "STT", title: "STT", type: "text", class: "" },
    { key: "IDBAG", title: "Số bag", type: "text", class: "" },
    { key: "TLWASET", title: "TL đá waxset", type: "text", class: "" },
    { key: "TLHANDSET", title: "TL đá handset", type: "text", class: "" },
    { key: "ORDER", title: "Đơn hàng", type: "text", class: "" },
    // {
    //   key: "DATEORDER",
    //   title: "Ngày đơn hàng",
    //   type: "text",
    //   class: ""
    // },
    { key: "INOUT", title: "Đi/Về", type: "text", class: "" },
    {
      key: "BTNREMOVE",
      title: "Xoá",
      type: "text",
      class: ""
    }
  ],
  listHeaderBagWaxSetting: [
    { key: "STT", title: "STT", type: "text", class: "" },
    { key: "IDBAG", title: "Số bag", type: "text", class: "" },
    { key: "LISTPRODUCT", title: "Mã SP", type: "text", class: "" },
    { key: "QTYPERPRODUCT", title: "SL theo bag", type: "text", class: "" },
    { key: "TOTALSTONE", title: "Tổng SL đá gắn ", type: "text", class: "" },
    { key: "WORKER", title: "Worker", type: "text", class: "" },
    { key: "STATUS", title: "Trạng thái", type: "text", class: "" },
    { key: "TLWASET", title: "TL đá waxset", type: "text", class: "" },
    { key: "TLHANDSET", title: "TL đá handset", type: "text", class: "" },
    { key: "ORDER", title: "Đơn hàng", type: "text", class: "" },
    // { key: "DATEORDER", title: "Ngày đơn hàng", type: "text", class: "" },
    { key: "INOUT", title: "Đi/Về", type: "text", class: "" },
    { key: "BTNREMOVE", title: "Xoá", type: "text", class: "" }
  ],
  listHeaderBagNotInOut: [
    { key: "STT", title: "STT", type: "text", class: "" },
    { key: "IDBAG", title: "Số bag", type: "text", class: "" },
    {
      key: "TLPRODUCT",
      title: "TL(V+đá-rớt) ",
      type: "text",
      class: ""
    },
    { key: "TLBROKEN", title: "đá rớt ", type: "text", class: "" },
    { key: "TLGOLDIN", title: "vàng vào ", type: "text", class: "" },
    { key: "TLGOLDOUT", title: "vàng ra", type: "text", class: "" },
    { key: "TLGOLDLOST", title: "Hao hụt", type: "text", class: "" },
    { key: "WORKER", title: "Worker", type: "text", class: "" },
    { key: "TLWASET", title: "đá waxset", type: "text", class: "" },
    { key: "TLHANDSET", title: "đá handset", type: "text", class: "" },
    { key: "IDORDER", title: "Đơn hàng", type: "text", class: "" },
    // { key: "DATEORDER", title: "Ngày đơn hàng", type: "text", class: "" },
    { key: "WEIGHTCANCEL", title: "TL huỷ", type: "text", class: "" },
    // { key: "WEIGHTCASTING", title: "TL casting", type: "text", class: "" },
    { key: "INOUT", title: "Đi/Về", type: "text", class: "" },
    { key: "BTNREMOVE", title: "Xoá", type: "text", class: "" }
  ],
  listHeaderBagInOut: [
    {
      key: "STT",
      title: "STT",
      type: "text",
      class: ""
    },
    {
      key: "IDBAG",
      title: "Số bag",
      type: "text",
      class: ""
    },
    {
      key: "TLPRODUCTIN",
      title: "TL (Vàng + đá - rớt)(I)",
      type: "text",
      class: ""
    },
    {
      key: "TLBROKENIN",
      title: "TL đá rớt(I) ",
      type: "text",
      class: ""
    },
    {
      key: "TLGOLDIN",
      title: "TL vàng(I) ",
      type: "text",
      class: ""
    },
    {
      key: "TLPRODUCTOUT",
      title: "TL (Vàng + đá - rớt)(0)",
      type: "text",
      class: ""
    },
    {
      key: "TLBROKENOUT",
      title: "TL đá rớt(O) ",
      type: "text",
      class: ""
    },
    {
      key: "TLGOLDOUT",
      title: "TL vàng(O) ",
      type: "text",
      class: ""
    },
    {
      key: "WORKER",
      title: "Worker",
      type: "text",
      class: ""
    },
    {
      key: "TLWASET",
      title: "TL đá waxset",
      type: "text",
      class: ""
    },
    { key: "TLHANDSET", title: "TL đá handset", type: "text", class: "" },
    {
      key: "IDORDER",
      title: "Đơn hàng",
      type: "text",
      class: ""
    },
    // {
    //   key: "DATEORDER",
    //   title: "Ngày đơn hàng",
    //   type: "text",
    //   class: ""
    // },
    { key: "WEIGHTCANCEL", title: "TL huỷ", type: "text", class: "" },
    // { key: "WEIGHTCASTING", title: "TL casting", type: "text", class: "" },
    { key: "INOUT", title: "Đi/Về", type: "text", class: "" },
    {
      key: "BTNREMOVE",
      title: "Xoá",
      type: "text",
      class: ""
    }
  ],
  listHeaderModalStoneWaxSetting: [
    { key: "STT", title: "STT", type: "text", class: "" },
    { key: "IDBAG", title: "Số Bag", type: "text", class: "" },
    { key: "WORKER", title: "Worker", type: "text", class: "" },
    { key: 'COPY', title: '', type: '', class: '' },
    { key: "QTYASSIGNSTONE", title: "Số lượng SP", type: "text", class: "" },
    { key: "IDPRODUCT", title: "Mã SP", type: "text", class: "" },
    {
      key: "QTYPERBAGPCS",
      title: "SL SP theo BAG (Pcs)",
      type: "text",
      class: ""
    },
    { key: "TOTALSTONE", title: "Tổng SL đá gắn", type: "text", class: "" },
    { key: "LISTSTONE", title: "Chi tiết đá", type: "text", class: "" },
    { key: "ORDER", title: "Đơn hàng", type: "text", class: "" },
    { key: "DELETE", title: "Xoá", type: "text", class: "" }
  ],
  listHeaderModalStoneBroken: [
    { key: "STT", title: "STT", type: "text", class: "" },
    { key: "IDBAG", title: "Số Bag", type: "text", class: "" },
    { key: "IDORDER", title: "Đơn hàng", type: "text", class: "" },
    { key: "IDPRODUCT", title: "Mã SP", type: "text", class: "" },
    { key: "COLORNAMEPARENT", title: "Màu", type: "text", class: "" },
    { key: "IDSTONE", title: "Mã đá", type: "text", class: "" },
    { key: "COLORSTONE", title: "Màu đá", type: "text", class: "" },
    { key: "TOTALQTYSTONE", title: "Tổng SL Đá Rớt", type: "text", class: "" },
    { key: "WEIGHTSTONE", title: "Tổng TL Đá rớt", type: "text", class: "" },
    { key: "TLBQ", title: "TLBQ 1pc ", type: "text", class: "" },
    { key: "QTYSTONEPC", title: "SL đá/PCs", type: "text", class: "" },
    { key: "PERCENT", title: "Tỉ lệ rớt đá", type: "text", class: "" },
    { key: "WORKER", title: "Worker", type: "text", class: "" }
  ],
  listStoneWaxset: [],
  listBagSelected: [],
  isEditProducts: "",
  list_bag_default: [],
  list_bag_ticket: [],
  default_bag: {
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
    created_date: "",
    created_by: username,
    IdGroup: "",
    IsDone: 0,
    strProducts: "",
    sumQtyProduct: "",
    sumQtyStoneWaxset: "",
    statusBag: "",
    strWorkers: "",
    AddGoldWeight: ""
  },
  isSave: false,
  list_worker: [],
  isShowStone: false,
  totalWeightBroken: 0,
  typeInOut: "OUT",
  objBagDetail: "",
  listHeaderSearchBag: [
    {
      key: "STT",
      title: "STT",
      type: "text",
      class: ""
    },
    {
      key: "IDBAG",
      title: "Số Bag",
      type: "text",
      class: ""
    },
    {
      key: "IDORDER",
      title: "Đơn hàng",
      type: "text",
      class: ""
    },
    {
      key: "IDPRODUCT",
      title: "Mã SP",
      type: "text",
      class: ""
    },
    {
      key: "SLCPBAG",
      title: "SLSP theo BAG",
      type: "text",
      class: ""
    },
    {
      key: "IDSTONE",
      title: "Mã đá",
      type: "text",
      class: ""
    },
    {
      key: "COLORSTONE",
      title: "Màu đá",
      type: "text",
      class: ""
    },
    {
      key: "TOTALQTYSTONE",
      title: "Tổng SL Đá Rớt",
      type: "text",
      class: ""
    },
    {
      key: "WEIGHTSTONE",
      title: "Tổng TL Đá rớt",
      type: "text",
      class: ""
    },
    {
      key: "TLBQ",
      title: "TLBQ 1pc ",
      type: "text",
      class: ""
    },
    {
      key: "QTYSTONEPC",
      title: "SL đá/PCs",
      type: "text",
      class: ""
    },
    {
      key: "PERCENT",
      title: "Tỉ lệ rớt đá",
      type: "text",
      class: ""
    },
    {
      key: "WORKER",
      title: "Worker",
      type: "text",
      class: ""
    }
  ],
  listHeaderBagSearch: [
    {
      key: "IDTICKET",
      title: "Số ticket",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "IDBAG",
      title: "Mã Bag",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "LV",
      title: "Loại vàng",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "LH",
      title: "Loại Hội",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "NAME",
      title: "Mã đơn hàng",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "PROCESS",
      title: "Quy trình",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "DATE",
      title: "Ngày tạo",
      type: "text",
      class: "",
      valueFilter: ""
    },
    {
      key: "STATUS",
      title: "Trạng thái",
      type: "text",
      class: "",
      valueFilter: ""
    }
  ],
  listHeaderGoldWeight: [
    {
      key: "VALUELV",
      title: "Tuổi vàng ",
      type: "text",
      class: "",
      valueFilter: "",
      col: 1
    },
    {
      key: "REMAINGR",
      title: "Tồn kho (li)",
      type: "text",
      class: "",
      valueFilter: "",
      col: 1
    },
    {
      key: "RAGGRMLY",
      title: "Tồn kho (gr)",
      type: "text",
      class: "",
      valueFilter: "",
      col: 2
    },
    {
      key: "WEIGHTGR",
      title: "TL vàng (gr) ",
      type: "text",
      class: "",
      valueFilter: "",
      col: 2
    },
    {
      key: "WEIGHTLY",
      title: "TL vàng (li) ",
      type: "text",
      class: "",
      valueFilter: "",
      col: 2
    },
    {
      key: "CONVERTGR",
      title: "TL loại vàng cần đúc (gr) ",
      type: "text",
      class: "",
      valueFilter: "",
      col: 2
    },
    {
      key: "CONVERLY",
      title: "TL loại vàng cần đúc (li) ",
      type: "text",
      class: "",
      valueFilter: "",
      col: 2
    }
  ],
  listBagInProcess: [],
  objSearch: {},
  listSkeletion: [],
  listSkeletionDefault: [],
  listGoldSelectedDefault: [],
  listGoldSelected: [],
  isShowGold: false,
  listWeightGold: [],
  objSearchGold: {
    valueLV: "",
    isHasInput: false
  },
  isBlockSearch: false,
  listHeaderProductCancel: [
    { key: "STT", title: "STT", type: "text", class: "", col: 1 },
    { key: "PRODUCT", title: "Sản phẩm", type: "text", class: "", col: 2 },
    { key: "COLOR", title: "Màu", type: "text", class: "", col: 1 },
    { key: "QTYREMAIN", title: "SL còn lại", type: "text", class: "", col: 2 },
    { key: "QTYCANCEL", title: "SL huỷ", type: "text", class: "", col: 2 },
    {
      key: "WEIGHT",
      title: "TL Vàng Nhập Kho",
      type: "text",
      class: "",
      col: 2
    },
    { key: "STATUS", title: "Trạng thái", type: "text", class: "", col: 1 },
    { key: "CONFIRM", title: "Xác nhận", type: "text", class: "", col: 1 },
    { key: "CONFIRMBY", title: "", type: "text", class: "", col: 1 }
  ],
  listProductCancel: [],
  objSearchProduct: {
    IdProduct: ""
  }
};
const Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_INPUT_PRODUCT_SEARCH:
      return {
        ...state,
        ...action.payload
      };
    case CHANGE_INPUT_PRODUCT_CANCEL:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_PRODUCT_BY_BAG:
      return {
        ...state,
        ...action.payload
      };
    case CHANGE_WEIGHT_GOLD:
      return {
        ...state,
        ...action.payload
      };
    case CHANGE_OBJ_SEARCH_GOLD:
      return {
        ...state,
        ...action.payload
      };
    case GET_ALL_GOLD:
      return {
        ...state,
        ...action.payload
      };
    case SHOW_FORM_GOLD:
      return {
        ...state,
        ...action.payload
      };
    case GET_TICKET_SKELETON:
      return {
        ...state,
        ...action.payload
      };
    case REMOVE_ITEM_BAG:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_DEFAULT_BAG:
      return {
        ...state,
        ...action.payload
      };
    case FIND_BAG_IN_PROCESS:
      return {
        ...state,
        ...action.payload
      };
    case GET_ALL_BAG_IN_TICKET:
      return {
        ...state,
        ...action.payload
      };
    case LOADING_TICKET_PROC:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_BAG_DETAIL:
      return {
        ...state,
        ...action.payload
      };
    case CONFIRM_BAG_DETAIL:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_TYPE_IN_OUT:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_CELL_TICKET_STONE:
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
    case GENERATE_NUMBER_ID_CASTING:
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
    case UPDATE_CELL_INPUT_BY_BAG:
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
    case CLICK_ROW_DATA_CASTING:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_CASTING_PROC:
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
