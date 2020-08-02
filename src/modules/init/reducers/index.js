import { GET_ALL_TABLE_CONFIG, GET_ALL_PARAMS } from "../types";

const INITIAL_STATE = {
  list_table_config: [],
  list_data_all: []
};
const Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_PARAMS:
      return {
        ...state,
        ...action.payload
      };
    case GET_ALL_TABLE_CONFIG:
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
