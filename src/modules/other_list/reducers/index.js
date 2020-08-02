import {
  GET_LIST_OTHER_LISTS,
  ADD_OTHER_LISTS,
  UPDATE_OTHER_LISTS,
  EDIT_OTHER_LISTS,
  INIT_OTHER_LISTS,
  CHANGE_INPUT_OTHER_LISTS
} from "../types";

const INITIAL_STATE = {
  title: "",
  list_data: [],
  objData: {
    id: ""
  },
  data: "",
  type: "",
  listField: [],
  list_table_config: [
    {
      code: "dm1",
      list_fields: [
        {
          type: "textbox",
          code: "code",
          label: "Mã",
          value: "",
          orderBy: 1
        },
        {
          type: "textbox",
          code: "name",
          label: "Tên",
          value: "",
          orderBy: 2
        },
        {
          type: "number",
          code: "currency",
          label: "Số tiền",
          value: "",
          orderBy: 3
        },
        {
          type: "date",
          code: "datetime",
          label: "Ngày",
          value: "",
          orderBy: 4
        }
      ]
    },
    {
      code: "dm2",
      list_fields: [
        {
          type: "textbox",
          code: "code",
          label: "Mã"
        },
        {
          type: "textbox",
          code: "name",
          label: "Tên"
        },
        {
          type: "date",
          code: "datetime",
          label: "Ngày"
        }
      ]
    }
  ]
};
const Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_INPUT_OTHER_LISTS:
      return {
        ...state,
        ...action.payload
      };
    case INIT_OTHER_LISTS:
      return {
        ...state,
        ...action.payload
      };
    case GET_LIST_OTHER_LISTS:
      return {
        ...state,
        ...action.payload
      };
    case ADD_OTHER_LISTS:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_OTHER_LISTS:
      return {
        ...state,
        ...action.payload
      };
    case EDIT_OTHER_LISTS:
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
