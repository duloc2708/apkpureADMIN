import { CHANGE_STATUS_TOOLBAR } from "../types";

const INITIAL_STATE = {
  listButton: [
    {
      key: "ADD",
      name: "Thêm mới",
      class: "btn btn-primary",
      status: false,
      icon: "fa fa-plus"
    },
    // {
    //   key: "EDIT",
    //   class: "btn btn-warning",
    //   status: true,
    //   name: "Sửa",
    //   icon: "fas fa-edit"
    // },
    {
      key: "SAVE",
      class: "btn btn-success",
      status: true,
      name: "Lưu",
      icon: "far fa-save"
    }
  ]
};
const Reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_STATUS_TOOLBAR:
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
