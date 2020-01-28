import {
  GET_LIST_OTHER_LISTS,
  ADD_OTHER_LISTS,
  UPDATE_OTHER_LISTS,
  EDIT_OTHER_LISTS,
  INIT_OTHER_LISTS,
  CHANGE_INPUT_OTHER_LISTS
} from "../types";
import { changeStatusButton } from "modules/toolbar/actions/form";

export const getListData = () => {
  return (dispatch, getState) => {
    let { type, listField, objData } = getState().other_list;
    return new Promise((resolve, reject) => {
      axios.get(`${Config.API_URL}parameter-settings/${type}`).then(
        response => {
          const { data } = response.data;
          const parsesData = [];
          data.forEach(item => {
            const objNew = { checked: false };
            Object.keys(item).forEach(key => {
              if (objData.hasOwnProperty(key)) {
                objNew[key] = item[key];
              }
            });
            parsesData.push(objNew);
          });
          dispatch({
            type: GET_LIST_OTHER_LISTS,
            payload: {
              list_data: parsesData
            }
          });
          resolve(response);
        },
        err => {
          reject(err);
        }
      );
    });
  };
};

export const initConfigTable = value => {
  return (dispatch, getState) => {
    let { objData } = getState().other_list;
    let { title, list_table_config: list_table_configTemp } = getState().init;
    let currentURL = document.URL;
    let url = new URL(currentURL);
    let codeParams = url.searchParams.get("code");

    // init list field
    let listFieldTemp = [];
    list_table_configTemp.forEach(item => {
      if (item.code === codeParams) {
        title = item.title;
        item.list_fields.forEach(listField => {
          listFieldTemp.push(listField);
        });
      }
    });

    // init Object list field
    let objDataTemp = { ...objData };
    listFieldTemp.forEach(itemField => {
      objDataTemp[itemField.code] = "";
    });
    dispatch({
      type: INIT_OTHER_LISTS,
      payload: {
        title: title,
        objData: objDataTemp,
        type: codeParams,
        listField: listFieldTemp
      }
    });
  };
};
export const editDataCommon = value => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: EDIT_OTHER_LISTS,
        payload: null
      });
    });
  };
};
export const updateInputOtherList = obj => {
  return (dispatch, getState) => {
    const { listField, objData } = getState().other_list;
    const listFieldTemp = _.clone(listField, true);
    listFieldTemp.map(field => {
      if (field.code === obj.key) {
        field.value = obj.value;
      }
      return field;
    });
    let objDataTemp = {
      ...objData,
      [obj.key]: obj.value
    };
    dispatch({
      type: CHANGE_INPUT_OTHER_LISTS,
      payload: {
        listField: listFieldTemp,
        objData: objDataTemp
      }
    });
  };
};

export const removeData = item => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${Config.API_URL}parameter-settings/${item.id}`)
        .then(
          response => {
            resolve(response);
          },
          err => {
            reject(err);
          }
        );
    });
  };
};

export const saveOtherList = () => {
  return (dispatch, getState) => {
    const { type, objData } = getState().other_list;
    let newData = {
      ...objData,
      group: type
    };
    return new Promise((resolve, reject) => {
      if (newData.id) {
        axios
          .patch(`${Config.API_URL}parameter-settings/${newData.id}`, newData)
          .then(
            response => {
              resolve(response);
            },
            err => {
              reject(err);
            }
          );
      } else {
        delete newData.id;
        axios.post(`${Config.API_URL}parameter-settings`, newData).then(
          response => {
            resolve(response);
          },
          err => {
            reject(err);
          }
        );
      }
    });
  };
};

export const editDataOtherList = obj => {
  return (dispatch, getState) => {
    let { list_data, listField } = getState().other_list;
    let list_dataTemp = _.clone(list_data, true);
    let listFieldTemp = _.clone(listField, true);
    // cập nhật check row
    list_dataTemp.map(item => {
      item.checked = false;
      if (item.id === obj.id) {
        item.checked = true;
      }
    });
    // cập nhật value
    listFieldTemp.map(item => {
      Object.keys(obj).forEach(key => {
        if (item.code === key) {
          item.value = obj[key];
          return;
        }
      });
      return item;
    });
    dispatch({
      type: EDIT_OTHER_LISTS,
      payload: {
        list_data: list_dataTemp,
        objData: obj,
        listField: listFieldTemp
      }
    });
    dispatch(changeStatusButton({ key: "ADD" }));
  };
};
export const clearData = () => {
  return (dispatch, getState) => {
    const { objData, list_data, listField } = getState().other_list;
    let list_dataTemp = _.clone(list_data, true);
    const newObjData = Object.keys(objData).reduce((accumulator, current) => {
      accumulator[current] = "";
      return accumulator;
    }, {});
    let newListField = _.clone(listField, true);
    newListField.map(item => (item.value = ""));
    list_dataTemp.map(item => (item.checked = false));
    dispatch({
      type: ADD_OTHER_LISTS,
      payload: {
        listField: newListField,
        list_data: list_dataTemp,
        objData: newObjData
      }
    });
  };
};
