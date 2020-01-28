import { CHANGE_STATUS_TOOLBAR } from "../types";
export const changeStatusButton = obj => {
  return (dispatch, getState) => {
    console.log("obj>>>>>>", obj);
    const { listButton } = getState().toolbar;
    const listButtonTemp = _.clone(listButton, true);
    const code_value = obj.key;
    listButtonTemp.map(item => {
      item.status = true;
      if (["ADD", "EDIT"].indexOf(code_value) != -1 || !obj) {
        if (["SAVE"].indexOf(item.key) != -1) {
          item.status = false;
        }
      }
      if (["SAVE"].indexOf(code_value) != -1) {
        if (["ADD"].indexOf(item.key) != -1) {
          item.status = false;
        }
      }
      return item;
    });
    dispatch({
      type: CHANGE_STATUS_TOOLBAR,
      payload: {
        listButton: listButtonTemp
      }
    });
  };
};
