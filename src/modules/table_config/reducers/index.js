import { GET_LIST_TABLE } from "../types";

const INITIAL_STATE = {
  list_data: [],
  objData: {
    id: ""
  },
  listHeader: [
    { code: "code", label: "Mã" },
    { code: "title", label: "Tiêu đề" }
  ]
};
const Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LIST_TABLE:
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
