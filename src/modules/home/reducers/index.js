import { IS_RENDER_CONTENT } from "../types";

const INITIAL_STATE = {
  is_render: false
};
const Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IS_RENDER_CONTENT:
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
