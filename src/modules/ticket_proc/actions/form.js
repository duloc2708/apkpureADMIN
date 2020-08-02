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
  LOADING_TICKET_PROC,
  UPDATE_DEFAULT_BAG,
  REMOVE_ITEM_BAG,
  GET_ALL_BAG_IN_TICKET,
  GET_TICKET_SKELETON,
  SHOW_FORM_GOLD,
  GET_ALL_GOLD,
  CHANGE_OBJ_SEARCH_GOLD,
  CHANGE_WEIGHT_GOLD,
  GET_LIST_PRODUCT_BY_BAG,
  CHANGE_INPUT_PRODUCT_CANCEL,
  CHANGE_INPUT_PRODUCT_SEARCH
} from "../types";
const { FULL_STONE, PARTIAL_STONE, NONE_STONE } = require("../Constant");
let oldUserInfo = SportConfig._getCookie("userInfo");
try {
  oldUserInfo = JSON.parse(SportConfig.function._base64.decode(oldUserInfo));
} catch (e) {
  oldUserInfo = null;
}
let username = (oldUserInfo && oldUserInfo.user_name) || "";

const typeProcess = Helper.getParam(window.location.href, "type");

import { updateInfoPage, resetInfoPage } from "modules/common/actions/form";

const calGoldWeightEstimate = obj => {
  obj["GoldWeight_Estimate"] = Helper.round(
    15 *
      (parseFloat(obj["Product_Skeleton_Weight"] || 0) -
        parseFloat(obj["SkeletonWeight"] || 0) -
        parseFloat(obj["Waxset_Weight_T"] || 0)),
    4
  );
  return obj;
};

const parseGetListGold = (data, objData) => {
  data = data.map((item, i) => {
    item.orderby = i;
    item.TF_Weight_Default = item.TF_Weight_Default
      ? item.TF_Weight_Default
      : "";
    item.CodeTicket = objData.CodeTicket;
    return item;
  });
  return data;
};
export const getAllGoldByTicket = () => {
  return (dispatch, getState) => {
    let { objData } = getState().ticket_proc;
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.API_URL_USER}ticket_proc/get_all_gold_by_ticket`, {
          params: {
            CodeTicket: objData.CodeTicket,
            Status: objData.Status || ""
          }
        })
        .then(
          response => {
            let { data } = response.data;
            data = parseGetListGold(data, objData);
            dispatch({
              type: GET_ALL_GOLD,
              payload: {
                listGoldSelectedDefault: data,
                listGoldSelected: data
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
export const getAllGold = () => {
  return (dispatch, getState) => {
    let { objData } = getState().ticket_proc;
    return new Promise((resolve, reject) => {
      axios.get(`${Config.API_URL_USER}ticket_proc/get_all_gold`).then(
        response => {
          let { data } = response.data;
          data = parseGetListGold(data, objData);
          dispatch({
            type: GET_ALL_GOLD,
            payload: {
              listGoldSelectedDefault: data,
              listGoldSelected: data
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
export const updateCellStoneWaxSetting = obj => {
  return (dispatch, getState) => {
    let { listStoneWaxset, listBagSelected } = getState().ticket_proc;
    let temp = _.clone(listStoneWaxset, true);
    let listBagSelectedTemp = _.clone(listBagSelected, true);

    temp.map((item, i) => {
      if (item.orderby == obj.id) {
        if (obj.key == "QtyAssignProduct") {
          const valueTemp = isNaN(obj.value) ? "" : parseFloat(obj.value);
          item[obj.key] = valueTemp;
          item["QtyStonePcs"] = valueTemp * item.QtyStonePcsDefault;
        } else {
          item[obj.key] = obj.value || "";
        }
      }
      return item;
    });

    listBagSelectedTemp.map(item => {
      let groupProducts = temp.filter(product => product.IdBag === item.IdBag);
      let strWorkersTemp = "";
      let sumQtyAssignProduct = 0;
      let countWorker = 0;
      item.statusBag = "";
      groupProducts.forEach(g => {
        if (strWorkersTemp.indexOf(g.Worker) == -1)
          strWorkersTemp += g.Worker + " ,";
        if (g.QtyAssignProduct) sumQtyAssignProduct += g.QtyAssignProduct;
        if (g.Worker) ++countWorker;
      });
      // join list worker
      item.strWorkers = strWorkersTemp.substr(0, strWorkersTemp.length - 1);
      // update status assign for worker
      if (countWorker > 0) {
        if (countWorker === groupProducts.length) {
          item.statusBag = FULL_STONE;
        }
        if (countWorker < groupProducts.length) {
          item.statusBag = PARTIAL_STONE;
        }
      }
      countWorker = 0;
      return item;
    });
    dispatch({
      type: UPDATE_CELL_TICKET_STONE,
      payload: {
        listStoneWaxset: temp,
        listBagSelected: listBagSelectedTemp
      }
    });
  };
};

export const findBagInProcess = value => {
  return (dispatch, getState) => {
    let { objSearch } = getState().ticket_proc;

    let { page, total, endPage } = getState().common;
    let objSearchTemp = _.clone(objSearch, true);
    objSearchTemp.page = page;
    objSearchTemp.total = total;
    objSearchTemp.key = value;
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.API_URL_USER}ticket_proc/find_bag_process`, {
          params: objSearchTemp
        })
        .then(
          response => {
            let { data } = response.data;
            let totalRows = data && data[0] && data[0].length;
            dispatch({
              type: FIND_BAG_IN_PROCESS,
              payload: {
                listBagInProcess: data
              }
            });
            dispatch(updateInfoPage(totalRows));
            resolve(response);
          },
          err => {
            reject(err);
          }
        );
    });
  };
};

export const changeInputProductCancel = obj => {
  return (dispatch, getState) => {
    let { listProductCancel } = getState().ticket_proc;
    let listProductCancelTemp = _.clone(listProductCancel, true);
    listProductCancelTemp.map(item => {
      if (item.orderby == obj.id) {
        if (obj.key === "QtyCancel") {
          if (obj.value) {
            item["QtyRemain"] = parseInt(item.QtyRemain) - parseInt(obj.value);
          } else {
            item["QtyRemain"] = parseInt(item.QtyRemainTemp);
          }
        }
        item[obj.key] = obj.value;
      }
      return item;
    });
    dispatch({
      type: CHANGE_INPUT_PRODUCT_CANCEL,
      payload: {
        listProductCancel: listProductCancelTemp
      }
    });
  };
};

export const changeWeightGold = obj => {
  return (dispatch, getState) => {
    let { listGoldSelected, objData } = getState().ticket_proc;
    let listGoldSelectedTemp = _.clone(listGoldSelected, true);
    let objDataTemp = _.clone(objData, true);
    let totalWeight = 0;
    listGoldSelectedTemp.map(item => {
      if (item.orderby == obj.key) {
        item.TF_Weight_Default = obj.value;
        item.TF_Weight_Convert = Helper.round(
          (item.ValueLV * parseFloat(item.TF_Weight_Default || 0)) /
            objData.ValueLV,
          4
        );
      }
      totalWeight +=
        (parseFloat(item.TF_Weight_Default || 0) * item.ValueLV) /
        parseFloat(objData.ValueLV || 0);
      return item;
    });
    objDataTemp["Gold_Weight_IN_T"] = Helper.round(totalWeight, 4);
    objDataTemp["Gold_Lost_T"] = Helper.round(
      totalWeight -
        parseFloat(objDataTemp["Gold_Weight_OUT_T"] || 0) -
        parseFloat(objDataTemp["Gold_Weight2Store_T"] || 0),
      4
    );
    if (objDataTemp["Gold_Lost_T"] < 0) objDataTemp["Gold_Lost_T"] = null;
    dispatch({
      type: CHANGE_WEIGHT_GOLD,
      payload: {
        listGoldSelected: listGoldSelectedTemp,
        objData: objDataTemp
      }
    });
  };
};

export const changeSearchGold = obj => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_OBJ_SEARCH_GOLD,
      payload: { objSearchGold: obj }
    });
  };
};

export const filterSearchGold = () => {
  return (dispatch, getState) => {
    let { listGoldSelectedDefault } = getState().ticket_proc;

    dispatch({
      type: GET_ALL_GOLD,
      payload: { listGoldSelected: listGoldSelectedDefault }
    });
  };
};

export const loadingProc = status => {
  return (dispatch, getState) => {
    dispatch({
      type: LOADING_TICKET_PROC,
      payload: { isSave: status }
    });
  };
};
export const saveWeightStone = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let { listStoneWaxset } = getState().ticket_proc;
      axios
        .post(`${Config.API_URL_USER}ticket_proc/insert_list_stone_waxset`, {
          listStoneWaxset: listStoneWaxset
        })
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
const indexColor=(data)=>{
  let dataNew= [];
  let comboIdStonePcs=""
  let bg ="";
  data.forEach((item,i) => {
    // if(i==0){
    //     bg =getRandomColor();
    //     item.isColor=bg
    //     comboIdStonePcs=item.IdStone+item.QtyStonePcs
    // }
    // if(comboIdStonePcs!=item.IdStone+item.QtyStonePcs){
    //   bg =getRandomColor();
    //   item.isColor=bg
    // }
    // if(comboIdStonePcs==item.IdStone+item.QtyStonePcs){
    //   item.isColor=bg
    // }
    // comboIdStonePcs=item.IdStone+item.QtyStonePcs;
    // console.log(item.QtyStonePcs)
    // if(item.QtyStonePcs>0){
    //
    // }
      dataNew.push(item)
  });
  return  dataNew
}
export const getListStoneWaxsetByIdBag = IdBag => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let {
        objConfig,
        listStoneWaxset,
        typeInOut,
        listBagSelected
      } = getState().ticket_proc;
      let findlistStoneWaxset = listStoneWaxset.filter(
        x => x.INOUT === typeInOut && x.IdBag === IdBag
      );
      if (findlistStoneWaxset.length == 0) {
        axios
          .get(`${Config.API_URL_USER}ticket_proc/get_list_stone_waxset_bag`, {
            params: { IdBag: IdBag }
          })
          .then(
            response => {
              let { data } = response.data;
              const genNum = Helper.generateUUIDV4();
              data.map(item => {
                item.INOUT = typeInOut;
                item.QtyAssignProduct = null;
                item.orderby = item.orderby + typeInOut;
                item.IdGroup = genNum;
                return item;
              });
              // break da
              const listBreakDownProduct = [];
              data.forEach(product => {
                // for (let i = 1; i <= product.QtyProduct; i++) {
                //   let itemProduct = _.clone(product, true);
                //   itemProduct.orderby = itemProduct.orderby + `_split_${i}`;
                //   itemProduct.QtyProduct = 1;
                //   listBreakDownProduct.push(itemProduct);
                // }
                let itemProduct = _.clone(product, true);
                listBreakDownProduct.push(itemProduct);
              });

              let dataNew = [...listStoneWaxset, ...listBreakDownProduct];
              // parse Color by Group Product

              dataNew=indexColor(dataNew)

              // clear stone Weight
              let listBagSelectedTemp = _.clone(listBagSelected, true);
              // cal weight again

              listBagSelectedTemp = listBagSelectedTemp.map(item => {
                item.Broken_Weight_OUT = null;
                item = {
                  ...calWeightDetailBag(item, objConfig)
                };
                return item;
              });

              dispatch({
                type: GET_LIST_WAXSET_BY_BAG,
                payload: {
                  listBagSelected: listBagSelectedTemp,
                  listStoneWaxset: dataNew
                }
              });
              resolve(response);
            },
            err => {
              reject(err);
            }
          );
      } else {
        resolve(GET_LIST_WAXSET_BY_BAG);
      }
    });
  };
};
export const updateActiveToolTipBag = (obj, status) => {
  return (dispatch, getState) => {
    let { listBagSelected } = getState().ticket_proc;
    let listBagSelectedTemp = _.clone(listBagSelected, true);
    listBagSelectedTemp.map(item => {
      item.isActive = false;
      if (item.IdBag == obj.IdBag) {
        item.isActive = status;
      }
      return item;
    });
    dispatch({
      type: UPDATE_CELL_INPUT_BY_BAG,
      payload: {
        listBagSelected: listBagSelectedTemp
      }
    });
  };
};
export const updateInputItemProcess = obj => {
  return (dispatch, getState) => {
    let { objConfig, objData, listBagSelected } = getState().ticket_proc;
    let {
      IsInputweightbyM_OUT,
      IsInputweightbyM_IN,
      IsGoldTypeRequest,
      IsSameWeight_IN,
      IsSameWeight_OUT,
      WorkerInTicket
    } = objConfig;
    let objDataTemp = _.clone(objData, true);
    let { key, value } = obj;
    objDataTemp[key] = value;
    if (
      [
        "Product_Skeleton_Weight",
        "SkeletonWeight",
        "Product_Weight_IN_T",
        "Product_Weight_OUT_T",
        "Gold_Weight_IN_T"
      ].indexOf(key) != -1
    ) {
      //Trọng lượng vàng hao hụt
      objDataTemp["Gold_Lost_T"] = Helper.round(
        parseFloat(objDataTemp["Gold_Weight_IN_T"] || 0) -
          parseFloat(objDataTemp["Gold_Weight_OUT_T"] || 0),
        4
      );
      if (objDataTemp["Gold_Lost_T"] < 0) objDataTemp["Gold_Lost_T"] = null;
      //if (IsInputweightbyM_OUT == 1) {
      //Estimate trọng lượng vàng cần đúc
      objDataTemp = calGoldWeightEstimate(objDataTemp);
      // if (objDataTemp["GoldWeight_Estimate"] <= 0) {
      //   objDataTemp["GoldWeight_Estimate"] = "";
      // }
      //}
    }
    if (key === "Gold_Weight2Store_T" || key === "BackGoldWeight_T") {
      const TotalWeightGoldCancel = _.sumBy(listBagSelected, itemProduct => {
        return parseFloat(itemProduct.TotalWeightGoldCancel || 0);
      });

      objDataTemp["CancelGoldWeight_T"] = TotalWeightGoldCancel;
      objDataTemp["Gold_Lost_T"] = Helper.round(
        parseFloat(objDataTemp["Gold_Weight_IN_T"] || 0) -
          parseFloat(objDataTemp["Gold_Weight_OUT_T"] || 0) -
          parseFloat(objDataTemp["Gold_Weight2Store_T"] || 0) -
          parseFloat(objDataTemp["BackGoldWeight_T"] || 0) -
          parseFloat(objDataTemp["CancelGoldWeight_T"] || 0) +
          parseFloat(objDataTemp["AddGoldWeight_T"] || 0),
        4
      );
    }

    if (key === "CodeLV") {
      const { list_data_all } = getState().list;
      const data = list_data_all.find(x => x.code == value);
      if (data) {
        objDataTemp["ValueLV"] = data.valueParams;
      }
    }
    if (key === "codeLH") {
      const { list_data_all } = getState().list;
      const data = list_data_all.find(x => x.code == value);
      if (data) {
        objDataTemp["ValueLH"] = data.valueParams;
      }
    }
    if (key === "Worker") {
      const { list_worker } = getState().ticket_proc;
      const data = list_worker.find(x => x.code == value);
      if (data) {
        objDataTemp["WorkerName"] = data.label;
      }
    }
    dispatch({
      type: UPDATE_CELL_INPUT_BY_BAG,
      payload: {
        objData: objDataTemp
      }
    });
  };
};
export const getListHeaderTable = () => {
  return (dispatch, getState) => {
    let {
      objConfig,
      listHeaderTableNotIntOut,
      listHeaderTableInOut,
      listHeaderBagNotInOut,
      listHeaderBagInOut,
      listHeaderBagWaxSetting,
      listHeaderBagSkeleton,
      listHeaderTableSKELETON,
      listHeaderModalStoneWaxSetting,
      listHeaderModalStoneBroken
    } = getState().ticket_proc;
    let { IsIncludeInOut } = objConfig;
    let listHeaderTable = [],
      listHeaderBag = [];
    listHeaderTable = listHeaderTableNotIntOut;
    listHeaderBag = listHeaderBagNotInOut;
    //trường hợp gắn đá
    if (typeProcess === "WAX_SETTING") {
      listHeaderBag = listHeaderBagWaxSetting;
      listHeaderModalStoneBroken = listHeaderModalStoneWaxSetting;
    }

    //trường hợp leen
    if (typeProcess === "SKELETON") {
      listHeaderBag = listHeaderBagSkeleton;
    }
    dispatch({
      type: GET_LIST_HEADER_TABLE,
      payload: {
        listHeaderTable: listHeaderTable,
        listHeaderBag: listHeaderBag,
        listHeaderModalStoneBroken: listHeaderModalStoneBroken
      }
    });
  };
};

export const showFormGold = value => {
  return (dispatch, getState) => {
    dispatch({
      type: SHOW_FORM_GOLD,
      payload: {
        isShowGold: value
      }
    });
  };
};
export const updateListStoneHasCancel = () => {
  return (dispatch, getState) => {
    let { listStoneWaxset, listProductCancel } = getState().ticket_proc;
    let listStoneWaxsetTemp = _.clone(listStoneWaxset, true);
    dispatch({
      type: SHOW_FORM_STONE,
      payload: {
        isShowStone: value,
        typeModal: type,
        objBagDetail: {}
      }
    });
  };
};
export const showFormStone = (value, type) => {
  return (dispatch, getState) => {
    dispatch({
      type: SHOW_FORM_STONE,
      payload: {
        isShowStone: value,
        typeModal: type,
        objBagDetail: {}
      }
    });
  };
};
export const getConfigProcess = () => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      axios.get(`${Config.API_URL_USER}common/list_config_process`).then(
        response => {
          let { data } = response.data;
          data = data.filter(x => x.Code == typeProcess);
          dispatch({
            type: GET_CONFIG_PROCESS_TICKET,
            payload: {
              objConfig: (data && data[0]) || {}
            }
          });
          resolve(GET_CONFIG_PROCESS_TICKET);
        },
        err => {
          reject(err);
        }
      );
    });
  };
};

export const updateTypeInOut = type => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_TYPE_IN_OUT,
      payload: {
        typeInOut: type
      }
    });
  };
};
export const addProductNew = () => {
  return (dispatch, getState) => {
    return new Promise(
      (resolve, reject) => {
        dispatch({
          type: CLEAR_DATA_CASTING_PROC,
          payload: null
        });
        resolve(CLEAR_DATA_CASTING_PROC);
      },
      err => {
        reject(err);
      }
    );
  };
};
export const resetDataCastingProc = () => {
  return (dispatch, getState) => {
    return new Promise(
      (resolve, reject) => {
        dispatch({
          type: CLEAR_DATA_CASTING_PROC,
          payload: null
        });
        resolve(CLEAR_DATA_CASTING_PROC);
      },
      err => {
        reject(err);
      }
    );
  };
};
export const getNumberAutoTicketProc = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let { objConfig } = getState().ticket_proc;
      let { PREFIX } = objConfig;
      axios
        .get(`${Config.API_URL_USER}ticket_proc/get_auto_number`, {
          params: { code: PREFIX }
        })
        .then(
          response => {
            let { data } = response.data;
            let {
              objData,
              listBagSelected,
              objConfig,
              default_bag
            } = getState().ticket_proc;
            let objData_temp = _.clone(objData, true);
            let default_bag_temp = _.clone(default_bag, true);
            let listBagSelectedTemp = _.clone(listBagSelected, true);
            let numberGen = (data && data[0].value) || "0000000";

            objData_temp["CodeTicket"] = numberGen;
            objData_temp["Name"] = numberGen;
            objData_temp["CodeProcess"] = objConfig.Code || "";

            default_bag_temp["CodeTicket"] = numberGen;
            default_bag_temp["Name"] = numberGen;
            default_bag_temp["CodeProcess"] = objConfig.Code || "";

            listBagSelectedTemp.map(x => (x.CodeTicket = numberGen));
            listBagSelectedTemp.map(
              x => (x.CodeProcess = objConfig.Code || "")
            );

            dispatch({
              type: GENERATE_NUMBER_ID_CASTING,
              payload: {
                objData: objData_temp,
                listBagSelected: listBagSelectedTemp
              }
            });
            dispatch(changeDefaultObjBag(default_bag_temp));
            resolve(response);
          },
          err => {
            reject(err);
          }
        );
    });
  };
};
const sumTotalObjData = (objData, listBagSelected) => {
  let objDataNew = _.clone(objData, true);
  let sumWaxset_Weight_T = 0;
  let sumHandset_Weight_T = 0;
  let sumProduct_Weight_IN_T = 0;
  let sumBroken_Weight_IN_T = 0;
  let sumGold_Weight_IN_T = 0;
  let sumProduct_Weight_OUT_T = 0;
  let sumBroken_Weight_OUT_T = 0;
  let sumGold_Weight_OUT_T = 0;
  let sumGold_Lost_T = 0;
  let sumGold_Cancel = 0;
  let sumAddGoldWeight = 0;
  listBagSelected.forEach(elm => {
    sumBroken_Weight_OUT_T += parseFloat(elm.Broken_Weight_OUT || 0);
    sumBroken_Weight_IN_T += parseFloat(elm.Broken_Weight_IN || 0);
    sumWaxset_Weight_T += parseFloat(elm.Waxset_Weight || 0);
    sumProduct_Weight_IN_T += parseFloat(elm.Product_Weight_IN || 0);
    sumProduct_Weight_OUT_T += parseFloat(elm.Product_Weight_OUT || 0);
    sumGold_Weight_OUT_T += parseFloat(elm.Gold_Weight_OUT || 0);
    sumHandset_Weight_T += parseFloat(elm.Handset_Weight || 0);
    sumGold_Cancel += parseFloat(elm.TotalWeightGoldCancel || 0);
    sumAddGoldWeight += parseFloat(elm.AddGoldWeight || 0);
  });
  objDataNew.Handset_Weight_T = Helper.round(sumHandset_Weight_T, 4);
  objDataNew.Waxset_Weight_T = Helper.round(sumWaxset_Weight_T, 4);
  objDataNew.Product_Weight_IN_T = Helper.round(sumProduct_Weight_IN_T, 4);
  objDataNew.Broken_Weight_IN_T = Helper.round(sumBroken_Weight_IN_T, 4);
  objDataNew.Product_Weight_OUT_T = Helper.round(sumProduct_Weight_OUT_T, 4);
  objDataNew.Broken_Weight_OUT_T = Helper.round(sumBroken_Weight_OUT_T, 4);
  objDataNew.Gold_Weight_OUT_T = Helper.round(sumGold_Weight_OUT_T, 4);
  objDataNew.CancelGoldWeight_T = Helper.round(sumGold_Cancel, 4);
  // if SKELETON then calculator
  if (typeProcess == "SKELETON") {
    objDataNew = calGoldWeightEstimate(objDataNew);
  }

  if (objDataNew.Gold_Weight_IN_T && objDataNew.Gold_Weight_OUT_T) {
    objDataNew.Gold_Lost_T = Helper.round(
      objDataNew.Gold_Weight_IN_T -
        objDataNew.Gold_Weight_OUT_T -
        objDataNew.CancelGoldWeight_T -
        objDataNew.Gold_Weight2Store_T -
        parseFloat(objDataNew.BackGoldWeight_T || 0) +
        sumAddGoldWeight,
      4
    );
  }

  return objDataNew;
};
const parseListBag = (data, listProductCancel, objConfig) => {
  let listBagSelectedTemp = _.clone(data);
  listBagSelectedTemp = listBagSelectedTemp.filter(x => x.IdBag && !x.isNew);
  listBagSelectedTemp = listBagSelectedTemp.map(item => {
    if (item.IsDone === false) {
      item.IsDone = 0;
    }
    if (item.IsDone === true) {
      item.IsDone = 1;
    }
    item.created_date = new Date();
    item.created_by = username;

    if (objConfig.IsIncludeHandset === 1) {
      item.Gold_Weight_OUT = Helper.round(
        parseFloat(item.Product_Weight_OUT || 0) +
          parseFloat(item.Broken_Weight_OUT || 0) -
          parseFloat(item.Waxset_Weight || 0) -
          parseFloat(item.Handset_Weight || 0),
        4
      );
      item.Gold_Lost = Helper.round(
        parseFloat(item.Gold_Weight_IN || 0) -
          parseFloat(item.Gold_Weight_OUT || 0),
        4
      );
    }
    return item;
  });
  return listBagSelectedTemp;
};
const parseListProductCancel = (data, objData) => {
  const newData = data.filter(x => x.QtyCancel);
  newData.map(item => {
    item.CodeTicket = objData.CodeTicket;
    item.CodeProcess = objData.CodeProcess;
    item.QtyCancel = parseInt(item.QtyCancel || 0);
    item.QtyRemain = parseInt(item.QtyRemain || 0);
    item.created_date = item.created_date || "";
    item.isConfirmed = item.isConfirmed || "";
    item.confirm_by = item.confirm_by || "";
    return item;
  });
  return newData;
};
const parseListGold = (data, objData) => {
  let newData = data.filter(x => x.TF_Weight_Default != "");
  newData = newData.map(item => {
    return {
      created_date: item.date_create ? item.date_create : new Date(),
      TF_Weight_Convert: item.TF_Weight_Convert,
      ValueLV_Convert: objData.ValueLV,
      orderby: item.orderby,
      CodeTicket: objData.CodeTicket,
      TF_Weight_Default: item.TF_Weight_Default,
      ValueLV: item.ValueLV
    };
  });
  return newData;
};
export const addNewItem = data => {
  let ListProduct_temp = _.clone(data);
  return (dispatch, getState) => {
    dispatch(loadingProc(true));
    return new Promise(
      (resolve, reject) => {
        dispatch(getNumberAutoTicketProc()).then(() => {
          let {
            objData,
            listBagSelected,
            listStoneWaxset,
            objConfig,
            typeInOut,
            listProductCancel,
            listGoldSelected
          } = getState().ticket_proc;
          listStoneWaxset.map(x => (x.CodeTicket = objData.CodeTicket));
          listStoneWaxset.map(x => (x.INOUT = typeInOut));

          const listProductCancelTemp = parseListProductCancel(
            listProductCancel,
            objData
          );

          let listBagSelectedTemp = parseListBag(
            listBagSelected,
            listProductCancelTemp,
            objConfig
          );
          axios
            .post(`${Config.API_URL_USER}ticket_proc/add`, {
              ProcessPrev: objConfig.PriorProcessName,
              objData: sumTotalObjData(objData, listBagSelectedTemp),
              listBag: listBagSelectedTemp,
              listStone: listStoneWaxset,
              listGoldSelected: parseListGold(listGoldSelected, objData),
              listProductCancel: listProductCancelTemp
            })
            .then(response => {
              dispatch(loadingProc(false));
              resolve(response);
            });
        });
      },
      err => {
        reject(err);
      }
    );
  };
};
export const updateItem = data => {
  let ListProduct_temp = _.clone(data);
  return (dispatch, getState) => {
    dispatch(loadingProc(true));
    let {
      objConfig,
      objData,
      listBagSelected,
      listStoneWaxset,
      listGoldSelected,
      typeInOut,
      listProductCancel
    } = getState().ticket_proc;
    listStoneWaxset.map(x => (x.CodeTicket = objData.CodeTicket));
    listStoneWaxset.map(x => (x.INOUT = typeInOut));

    const listProductCancelTemp = parseListProductCancel(
      listProductCancel,
      objData
    );

    let listBagSelectedTemp = parseListBag(
      listBagSelected,
      listProductCancelTemp,
      objConfig
    );
    const objDataNew = sumTotalObjData(objData, listBagSelectedTemp);
    return new Promise(
      (resolve, reject) => {
        axios
          .post(`${Config.API_URL_USER}ticket_proc/update`, {
            objData: objDataNew,
            listBag: listBagSelectedTemp,
            listStone: listStoneWaxset,
            listGoldSelected: parseListGold(listGoldSelected, objData),
            listProductCancel: listProductCancelTemp
          })
          .then(response => {
            dispatch({
              type: UPDATE_CELL_INPUT_BY_BAG,
              payload: {
                objData: objDataNew
              }
            });
            dispatch(loadingProc(false));
            resolve(response);
          });
      },
      err => {
        reject(err);
      }
    );
  };
};

export const getDataWoker = tableName => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.API_URL_USER}common/list_combobox_by_table`, {
          params: { tableName: tableName }
        })
        .then(
          response => {
            let { data } = response.data;
            let data_temp = [];
            data.map((item, i) => {
              data_temp.push(item);
            });
            dispatch({
              type: GET_LIST_WORKER,
              payload: {
                list_worker: data_temp
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

export const initAddCastingProc = () => {
  return (dispatch, getState) => {
    let { listBagSelected, default_bag } = getState().ticket_proc;
    let listBagSelectedClone = _.clone(listBagSelected, true);
    let default_bag_temp = _.clone(default_bag, true);
    listBagSelectedClone.push(default_bag_temp);
    dispatch({
      type: INIT_ADD_CASTING_PROC,
      payload: {
        listBagSelected: listBagSelectedClone
      }
    });
    dispatch(getNumberAutoTicketProc());
  };
};
export const updateCellWorkerInStone = obj => {
  return (dispatch, getState) => {
    let { listStoneWaxset } = getState().ticket_proc;
    let temp = _.clone(listStoneWaxset, true);
    temp.map((item, i) => {
      if (item.orderby == obj.id) {
        item[obj.key] = obj.value;
      }
      return item;
    });
    dispatch({
      type: UPDATE_CELL_TICKET_STONE,
      payload: {
        listStoneWaxset: temp
      }
    });
  };
};
const calTotalChangeWeightBag = (listBag, objData) => {
  let sumGoldWeightOut = 0;
  let sumGoldWeightIN = 0;
  let sumWeightWaxset = 0;
  let sumGold_Weight_Pay = 0;
  let sumGold_Cancel = 0;
  let sumAddGoldWeight = 0;

  listBag.forEach(item => {
    sumGoldWeightOut += parseFloat(item.Gold_Weight_OUT || 0);
    sumGoldWeightIN += parseFloat(item.Gold_Weight_IN || 0);
    sumWeightWaxset += parseFloat(item.Waxset_Weight || 0);
    sumGold_Weight_Pay += parseFloat(item.Gold_Weight_Pay || 0);
    sumGold_Cancel += parseFloat(item.TotalWeightGoldCancel || 0);
    sumAddGoldWeight += parseFloat(item.AddGoldWeight || 0);
  });

  // objData.Gold_Weight2Store_T = sumGold_Weight_Pay;

  if (typeProcess == "CASTING") {
    sumGoldWeightIN = objData.Gold_Weight_IN_T;
  }

  let newObjData = {
    ...objData,
    Waxset_Weight_T: Helper.round(sumWeightWaxset, 4),
    Gold_Weight_IN_T: Helper.round(sumGoldWeightIN, 4),
    Gold_Weight_OUT_T: Helper.round(sumGoldWeightOut, 4),
    AddGoldWeight_T: Helper.round(sumAddGoldWeight, 4),
    CancelGoldWeight_T: Helper.round(sumGold_Cancel, 4),
    Gold_Lost_T: Helper.round(
      sumGoldWeightIN -
        sumGoldWeightOut -
        objData.Gold_Weight2Store_T -
        sumGold_Cancel -
        (objData.BackGoldWeight_T || 0) +
        sumAddGoldWeight,
      4
    )
  };
  if (typeProcess == "SKELETON") {
    newObjData = calGoldWeightEstimate(newObjData);
  }
  return newObjData;
};
const calGoldWeightAfterHandset = item => {
  let result = Helper.round(
    parseFloat(item.Gold_Weight_OUT || 0) -
      parseFloat(item.Handset_Weight || 0),
    4
  );
  return result;
};

export const updateCellBrokenQty = obj => {
  return (dispatch, getState) => {
    let {
      objData,
      listStoneWaxset,
      typeInOut,
      totalWeightBroken,
      listBagSelected,
      objConfig
    } = getState().ticket_proc;
    let { IsIncludeInOut, IsIncludeHandset } = objConfig;
    let temp = _.clone(listStoneWaxset, true);
    let listBagSelectedTemp = _.clone(listBagSelected, true);
    let totalWeightBrokenTemp = 0;
    let IdBagInStone = "";
    temp.map((item, i) => {
      if (item.orderby == obj.id) {
        let { AvgStone, QtyProduct } = item;
        let valueTemp = obj.value;
        let AvgStoneTemp = parseFloat(AvgStone || 0);
        valueTemp = parseFloat(valueTemp || 0);
        item["BrokenWeight"] = valueTemp * AvgStoneTemp;
        item["BrokenRate"] = Helper.round(
          (valueTemp * 100) / parseInt(item["QtyStonePcs"] || 0),
          2
        );
        item[obj.key] = valueTemp;
        IdBagInStone = item.IdBag;
      }
      if (item.INOUT == typeInOut) {
        totalWeightBrokenTemp =
          totalWeightBrokenTemp + parseFloat(item.BrokenWeight || 0);
      }
      return item;
    });

    // Tính lại trọng lượng đá rớt 1 lần nữa
    listBagSelectedTemp.map(item => {
      if (item.IdBag == IdBagInStone) {
        let { Waxset_Weight, Product_Weight_IN, Product_Weight_OUT } = item;
        let Waxset_WeightTemp = parseFloat(Waxset_Weight || 0);

        if (typeInOut == "IN") {
          let valueTemp = Product_Weight_IN;
          item.Broken_Weight_IN = totalWeightBrokenTemp;
          item["Gold_Weight_IN"] = Helper.round(
            valueTemp +
              parseFloat(item.Broken_Weight_IN || 0) -
              Waxset_WeightTemp,
            4
          );
        } else {
          let valueTemp = Product_Weight_OUT;
          item.Broken_Weight_OUT = totalWeightBrokenTemp;

          item["Gold_Weight_OUT"] = Helper.round(
            parseFloat(valueTemp || 0) +
              parseFloat(item.Broken_Weight_OUT || 0) -
              parseFloat(Waxset_WeightTemp || 0),
            4
          );
          if (item["Gold_Weight_OUT"] < 0) item["Gold_Weight_OUT"] = null;
        }
        if (IsIncludeInOut == 1) {
          item["Gold_Lost"] = Helper.round(
            item.Gold_Weight_IN - item.Gold_Weight_OUT,
            4
          );
          if (item["Gold_Lost"] < 0) item["Gold_Lost"] = null;
        }
        if (IsIncludeHandset == 1) {
          item["Gold_Weight_OUT"] = calGoldWeightAfterHandset(item);
        }
      }
      return item;
    });

    dispatch({
      type: UPDATE_CELL_TICKET_STONE,
      payload: {
        objData: calTotalChangeWeightBag(listBagSelectedTemp, objData),
        listStoneWaxset: temp,
        totalWeightBroken: totalWeightBrokenTemp,
        listBagSelected: listBagSelectedTemp
      }
    });
  };
};
export const updateProductCancel = item => {
  const isConfirmed = 1;
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let {
        listProductCancel,
        listBagSelected,
        objData
      } = getState().ticket_proc;
      let listProductCancelTemp = _.clone(listProductCancel, true);

      listProductCancelTemp.map(itemTemp => {
        if (itemTemp.orderby === item.orderby) {
          itemTemp.isConfirmed = isConfirmed;
          itemTemp.confirm_by = username;
          itemTemp.created_date = new Date();
        }
        return itemTemp;
      });

      let listBagSelectedNew = _.clone(listBagSelected);
      listBagSelectedNew.map(item => {
        const listProductCancelByBag = listProductCancelTemp.filter(
          x => x.IdBag === item.IdBag && x.isConfirmed == 1
        );
        const totalWeightGoldReturn = _.sumBy(listProductCancelByBag, function(
          itemProduct
        ) {
          return parseFloat(itemProduct.WeightGoldReturn || 0);
        });
        if (totalWeightGoldReturn > 0) {
          item.TotalWeightGoldCancel = totalWeightGoldReturn || "";
        }

        return item;
      });
      const objDataNew = calTotalChangeWeightBag(
        listBagSelectedNew,
        _.clone(objData, true)
      );
      dispatch({
        type: CHANGE_INPUT_PRODUCT_CANCEL,
        payload: {
          objData: objDataNew,
          listStoneWaxset: [],
          listStoneWaxsetDefault: [],
          listBagSelected: listBagSelectedNew,
          listProductCancel: listProductCancelTemp
        }
      });
      resolve(CHANGE_INPUT_PRODUCT_CANCEL);
    });
  };
};
export const acceptProductCancel = item => {
  const isConfirmed = 1;
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${Config.API_URL_USER}ticket_proc/ticket_proc_accept_product_cancel`,
          {
            keyTicket: item.keyTicket,
            isConfirmed
          }
        )
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
export const acceptStatusBag = obj => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${Config.API_URL_USER}ticket_proc/accept_status_bag`, obj)
        .then(
          response => {
            let { data } = response.data;
            resolve(response);
          },
          err => {
            reject(err);
          }
        );
    });
  };
};
export const calWeightDetailBag = (objItem, objConfig) => {
  let {
    IsIncludeHandset,
    IsIncludeInOut,
    IsInputweightbyM_IN,
    IsInputweightbyM_OUT,
    IsSameWeight_IN,
    IsSameWeight_OUT
  } = objConfig;

  let item = _.clone(objItem);
  let { Broken_Weight_OUT, Broken_Weight_IN, Waxset_Weight } = item;

  let Broken_Weight_OUTTemp = parseFloat(Broken_Weight_OUT || 0);
  let Broken_Weight_INTemp = parseFloat(Broken_Weight_IN || 0);
  let Waxset_WeightTemp = parseFloat(Waxset_Weight || 0);

  if (IsInputweightbyM_OUT == 1 && IsSameWeight_OUT == 1) {
    item.Gold_Weight_OUT = item.Product_Weight_OUT;
  } else {
    // (TL (Vàng + Đá) Trừ Đá Rớt + Tổng TL đá rớt ) - trọng lượng waxset
    item.Gold_Weight_OUT = Helper.round(
      parseFloat(item.Product_Weight_OUT || 0) +
        parseFloat(Broken_Weight_OUTTemp || 0) -
        parseFloat(Waxset_WeightTemp || 0),
      4
    );
    if (IsIncludeHandset == 1) {
      item.Gold_Weight_OUT = calGoldWeightAfterHandset(item);
    }
    if (item.Gold_Weight_OUT < 0) item.Gold_Weight_OUT = null;
  }
  // item["Gold_Weight_IN"] = Helper.round(
  //   item["Product_Weight_IN"] + Broken_Weight_INTemp - Waxset_WeightTemp,
  //   4
  // );
  item.Gold_Lost = Helper.round(
    parseFloat(item.Gold_Weight_IN || 0) -
      parseFloat(item.Gold_Weight_OUT || 0),
    4
  );
  if (item.Gold_Lost < 0) item.Gold_Lost = null;

  console.log(item.Gold_Weight_OUT);
  return item;
};
export const acceptStatus = obj => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios.post(`${Config.API_URL_USER}ticket_proc/accept_status`, obj).then(
        response => {
          let { data } = response.data;
          resolve(response);
        },
        err => {
          reject(err);
        }
      );
    });
  };
};
export const updateCellBag = obj => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let { listBagSelected, objConfig, objData } = getState().ticket_proc;
      let temp = _.clone(listBagSelected, true);
      temp = temp.map((item, i) => {
        let itemTemp = _.clone(item);
        if (parseInt(itemTemp.orderby) === parseInt(obj.id)) {
          itemTemp[obj.key] =
            (obj.key != "IdBag" &&
              $.isNumeric(obj.value) &&
              parseFloat(obj.value)) ||
            obj.value;
          itemTemp = {
            ...calWeightDetailBag(itemTemp, objConfig)
          };
        }
        return itemTemp;
      });
      const objDataNew = calTotalChangeWeightBag(temp, _.clone(objData, true));
      dispatch({
        type: UPDATE_CELL_INPUT_BY_BAG,
        payload: {
          objData: objDataNew,
          listBagSelected: temp
        }
      });
      resolve(UPDATE_CELL_INPUT_BY_BAG);
    });
  };
};

export const updateExistBagByProcess = data => {
  return (dispatch, getState) => {
    let {
      listBagSelected,
      list_products,
      list_bag_ticket,
      objConfig,
      objData
    } = getState().ticket_proc;
    let list_bag_ticket_temp = _.clone(list_bag_ticket, true);
    let objBag = list_bag_ticket_temp.filter(x => x.IdBag === data.value);
    let listBagSelected_temp = _.clone(listBagSelected, true);
    let listBagSelectedConvert = [];

    listBagSelected_temp.map((item, i) => {
      let item_temp = _.clone(item, true);
      let itemBag = _.clone(objBag[0], true);
      itemBag.isExists = true;
      if (
        item_temp.IdBag.toUpperCase() == itemBag.IdBag.toUpperCase() &&
        item_temp.isNew
      ) {
        itemBag.isNew = false;
        // itemBag.index = item_temp.index;
        itemBag.CodeProcess = item_temp.CodeProcess;
        itemBag.CodeTicket = item_temp.CodeTicket;
        itemBag.orderby = item_temp.orderby;
        itemBag.created_by = item_temp.created_by;

        listBagSelectedConvert.push(itemBag);
      } else {
        listBagSelectedConvert.push(item_temp);
      }
    });
    dispatch({
      type: UPDATE_EXISTS_BAG,
      payload: {
        objData: calTotalChangeWeightBag(listBagSelectedConvert, objData),
        listBagSelected: listBagSelectedConvert
      }
    });
    dispatch(getListStoneWaxsetByIdBag(data.value));
  };
};

export const updateExistBag2 = objBag => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let {
        listBagSelected,
        list_products,
        objData,
        default_bag
      } = getState().ticket_proc;
      let listBagSelected_temp = _.clone(listBagSelected, true);
      let listBagSelectedConvert = [];
      let initOrder = listBagSelected_temp.length;
      const maxValue = Math.max(...listBagSelected_temp.map(x => x.orderby), 0);

      listBagSelected_temp.forEach((item, i) => {
        if (item.isNew) {
          item.IdBag = "";
          item.orderby = maxValue + 2;
        }
        listBagSelectedConvert.push(item);
      });

      let itemBagNew = {
        ...default_bag,
        ..._.clone(objBag, true)
      };
      itemBagNew.orderby = objBag.orderby;
      itemBagNew.CodeProcess = objData.CodeProcess;
      itemBagNew.CodeTicket = objData.CodeTicket;
      listBagSelectedConvert.push(itemBagNew);

      // sum total Weight Waxset
      let sumWeightWaxset = 0;
      listBagSelectedConvert.forEach(item => {
        sumWeightWaxset += item.Waxset_Weight;
      });
      const objDataNew = {
        ...objData
      };
      dispatch({
        type: UPDATE_EXISTS_BAG,
        payload: {
          objData: calTotalChangeWeightBag(listBagSelectedConvert, objDataNew),
          listBagSelected: listBagSelectedConvert,
          isBlockSearch: false
        }
      });
      resolve(listBagSelectedConvert);
    });
  };
};

export const getStonesByBag = objBag => {
  alert('aaa')
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.API_URL_USER}ticket_proc/get_list_stone_waxset_bag`, {
          params: { IdBag: objBag.IdBag }
        })
        .then(
          response => {
            let { listStoneWaxset, listBagSelected } = getState().ticket_proc;
            let { data } = response.data;
            // sum đá theo sản phẩm
            let groupListStoneWaxset = [
              ...data
                .reduce((map, item) => {
                  const {
                    IdProduct: key,
                    QtyStone,
                    QtyStonePcs,
                    IdStone
                  } = item;
                  const prev = map.get(key);
                  const strStone = IdStone + `(${QtyStonePcs}) ,`;
                  if (prev) {
                    prev.IdStone += strStone;
                    prev.QtyStonePcs += QtyStonePcs;
                    prev.QtyStone += QtyStone;
                  } else {
                    item.IdStone = strStone;
                    map.set(key, Object.assign({}, item));
                  }
                  return map;
                }, new Map())
                .values()
            ];
            groupListStoneWaxset.map(product => {
              const genNum = Helper.generateUUIDV4();
              product.QtyStonePcsDefault = product.QtyStonePcs;
              product.IdGroup = genNum;
              product.orderby = genNum + "_1";
              product.QtyAssignProduct = "";
              product.IdStone = product.IdStone.substr(
                0,
                product.IdStone.length - 1
              );
              return product;
            });
            // break down sản phẩm
            const listBreakDownProduct = [];
            groupListStoneWaxset.forEach(product => {
              // for (let i = 1; i <= product.QtyProduct; i++) {
              //   let itemProduct = _.clone(product, true);
              //   itemProduct.orderby = itemProduct.orderby + `_split_${i}`;
              //   itemProduct.QtyAssignProduct = 1;
              //   listBreakDownProduct.push(itemProduct);
              // }
              let itemProduct = _.clone(product, true);
              listBreakDownProduct.push(itemProduct);
            });
            // join products
            let listBagSelectedTemp = _.clone(listBagSelected, true);
            listBagSelectedTemp.map(itemBag => {
              if (itemBag.IdBag === objBag.IdBag) {
                // duyêt danh sách đá mới
                data.forEach((stone, indexStone) => {
                  if (itemBag.strProducts.indexOf(`${stone.IdProduct}`) == -1) {
                    itemBag.strProducts = itemBag.strProducts + stone.IdProduct;
                    itemBag.strProducts = itemBag.strProducts + ",";
                  }
                  itemBag.sumQtyStoneWaxset =
                    (itemBag.sumQtyStoneWaxset || 0) + stone.QtyStone;
                  itemBag.sumQtyProduct = stone.QtyProduct;
                });
                // case not exitst stone when assign product, qty default
                itemBag.statusBag = itemBag.strProducts ? "" : NONE_STONE;
                itemBag.strProducts =
                  (itemBag.strProducts && itemBag.strProducts.slice(0, -1)) ||
                  itemBag.IdProduct;
                itemBag.sumQtyProduct = itemBag.sumQtyProduct
                  ? itemBag.sumQtyProduct
                  : itemBag.QtyCreated;
              }
              return itemBag;
            });

            dispatch({
              type: GET_LIST_WAXSET_BY_BAG,
              payload: {
                listStoneWaxset: [...listStoneWaxset, ...listBreakDownProduct],
                listStoneWaxsetDefault: data,
                listBagSelected: listBagSelectedTemp
              }
            });
          },
          err => {
            reject(err);
          }
        );
    });
  };
};
export const updateExistBag = data => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let {
        listBagSelected,
        list_products,
        objConfig,
        objData
      } = getState().ticket_proc;
      let listBagSelected_temp = _.clone(listBagSelected, true);
      let listBagSelectedConvert = [];
      let initOrder = listBagSelected_temp.length + 1;
      let totalWeightGoldOut = 0;
      listBagSelected_temp.forEach((item, i) => {
        if (item.isNew) {
          item.IdBag = "";
          item.orderby = initOrder + 1;
        }
        listBagSelectedConvert.push(item);
      });

      let itemBagNew = _.clone(data, true);
      itemBagNew.isNew = false;
      itemBagNew.CodeProcess = objData.CodeProcess;
      itemBagNew.CodeTicket = objData.CodeTicket;
      itemBagNew.orderby = initOrder;
      listBagSelectedConvert.push(itemBagNew);
      let objDataTemp = _.clone(objData, true);
      dispatch({
        type: UPDATE_EXISTS_BAG,
        payload: {
          objData: calTotalChangeWeightBag(listBagSelectedConvert, objDataTemp),
          listBagSelected: listBagSelectedConvert,
          isBlockSearch: false
        }
      });
      resolve(listBagSelectedConvert);
    });
  };
};
export const updateExistBagWaxSetting = inputData => {
  alert('aaa')
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.API_URL_USER}ticket_proc/get_list_stone_waxset_bag`, {
          params: { IdBag: inputData.Id }
        })
        .then(
          response => {
            let { data } = response.data;

            let {
              listBagSelected,
              list_products,
              default_bag,
              listStoneWaxset,
              objData
            } = getState().ticket_proc;
            let listBagSelected_temp = _.clone(listBagSelected, true);
            let listBagSelectedConvert = [];
            let initOrder = listBagSelected_temp.length + 1;
            listBagSelected_temp.forEach((item, i) => {
              if (item.isNew) {
                item.IdBag = "";
                item.orderby = initOrder + 1;
              }
              listBagSelectedConvert.push(item);
            });

            let itemBag = _.clone(inputData, true);
            itemBag = {
              ...itemBag,
              CodeProcess: objData.CodeProcess,
              CodeTicket: objData.CodeTicket,
              IdGroup: ""
            };
            itemBag.isNew = false;
            itemBag.orderby = initOrder;
            itemBag.IsDone = 0;
            itemBag.strProducts = "";
            itemBag.sumQtyProduct = 0; // tổng số lượng sp theo bag
            itemBag.sumQtyStoneWaxset = 0; // tổng số lượng đá gắn waset
            itemBag.statusBag = "";
            itemBag.strWorkers = ""; // TODO danh sách worker
            // duyêt danh sách đá mới
            data.forEach((stone, indexStone) => {
              if (itemBag.strProducts.indexOf(`${stone.IdProduct}`) == -1) {
                itemBag.strProducts = itemBag.strProducts + stone.IdProduct;
                itemBag.strProducts = itemBag.strProducts + ",";
              }
              itemBag.sumQtyStoneWaxset =
                itemBag.sumQtyStoneWaxset + stone.QtyStonePcs;
              itemBag.sumQtyProduct = stone.QtyProduct;
            });
            itemBag.strProducts = itemBag.strProducts.slice(0, -1);
            listBagSelectedConvert.push(itemBag);
            // sum đá theo sản phẩm
            let groupListStoneWaxset = [
              ...data
                .reduce((map, item) => {
                  const {
                    IdProduct: key,
                    QtyStonePcs,
                    QtyStone,
                    IdStone
                  } = item;
                  const prev = map.get(key);
                  const strStone = IdStone + `(${QtyStonePcs}) ,`;
                  if (prev) {
                    prev.IdStone += strStone;
                    prev.QtyStonePcs += QtyStonePcs;
                    prev.QtyStone += QtyStone;
                  } else {
                    item.IdStone = strStone;
                    map.set(key, Object.assign({}, item));
                  }
                  return map;
                }, new Map())
                .values()
            ];
            groupListStoneWaxset.map(product => {
              const genNum = Helper.generateUUIDV4();
              product.QtyStonePcsDefault = product.QtyStonePcs;
              product.IdGroup = genNum;
              product.orderby = genNum + "_1";
              product.QtyAssignProduct = "";
              product.IdStone = product.IdStone.substr(
                0,
                product.IdStone.length - 1
              );
              return product;
            });
            // break down sản phẩm
            const listBreakDownProduct = [];
            groupListStoneWaxset.forEach(product => {
              // for (let i = 1; i <= product.QtyProduct; i++) {
              //   let itemProduct = _.clone(product, true);
              //   itemProduct.orderby = itemProduct.orderby + `_split_${i}`;
              //   itemProduct.QtyAssignProduct = 1;
              //   listBreakDownProduct.push(itemProduct);
              // }
              let itemProduct = _.clone(product, true);
              listBreakDownProduct.push(itemProduct);
            });
            // sum total Weight Waxset
            let sumWeightWaxset = 0;
            listBagSelectedConvert.forEach(item => {
              sumWeightWaxset += item.Waxset_Weight;
            });
            let objDataProcess = getState().ticket_proc.objData;
            let objDataNew = {
              ...objDataProcess,
              Waxset_Weight_T: sumWeightWaxset
            };
            dispatch({
              type: GET_LIST_WAXSET_BY_BAG,
              payload: {
                objData: objDataNew,
                listStoneWaxset: [...listStoneWaxset, ...listBreakDownProduct],
                listStoneWaxsetDefault: data,
                listBagSelected: listBagSelectedConvert
              }
            });

            resolve(listBagSelectedConvert);
          },
          err => {
            reject(err);
          }
        );
    });
  };
};
export const calTotalWeightWaxset = data => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let { objData } = getState().ticket_proc;
      let objDataTemp = _.clone(objData, true);
      let total = 0;
      data.forEach(item => {
        if (item.Waxset_Weight) {
          total += item.Waxset_Weight;
        }
      });
      objDataTemp.Waxset_Weight_T = total;
      dispatch({
        type: UPDATE_CELL_INPUT_BY_BAG,
        payload: {
          objData: objDataTemp
        }
      });
    });
  };
};
export const changeDefaultObjBag = obj => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_DEFAULT_BAG,
      payload: {
        default_bag: obj
      }
    });
  };
};
export const addItemBagNew = () => {
  return (dispatch, getState) => {
    let { listBagSelected, default_bag } = getState().ticket_proc;
    let default_bag_temp = _.clone(default_bag, true);
    let listBagSelected_temp = _.clone(listBagSelected, true);
    const maxValue = Math.max(...listBagSelected.map(x => x.orderby), 0);
    default_bag_temp.orderby = maxValue + 1;
    default_bag_temp.index = maxValue + 1;
    listBagSelected_temp.push(default_bag_temp);
    dispatch({
      type: ADD_ITEM_BAG,
      payload: {
        listBagSelected: listBagSelected_temp
      }
    });
  };
};

export const removeItemBag = obj => {
  return (dispatch, getState) => {
    let { listBagSelected, listStoneWaxset, objData } = getState().ticket_proc;
    let listBagSelectedTemp = _.clone(listBagSelected, true);
    let listStoneWaxsetTemp = _.clone(listStoneWaxset, true);
    // remove item bag
    listBagSelectedTemp = listBagSelectedTemp.filter(x => x.IdBag != obj.IdBag);
    // remove stones by bag
    listStoneWaxsetTemp = listStoneWaxsetTemp.filter(x => x.IdBag != obj.IdBag);

    dispatch({
      type: REMOVE_ITEM_BAG,
      payload: {
        objData: sumTotalObjData(objData, listBagSelectedTemp),
        listStoneWaxset: listStoneWaxsetTemp,
        listBagSelected: listBagSelectedTemp
      }
    });
  };
};
export const changeProductSearch = obj => {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_INPUT_PRODUCT_SEARCH,
      payload: {
        objSearchProduct: obj
      }
    });
  };
};
export const isEditCasting = value => {
  return dispatch => {
    dispatch({
      type: IS_EDIT_CASTING,
      payload: {
        isDetail: value
      }
    });
  };
};
export const clickCheckRowCasting = (value, checked) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let { list_data, default_bag } = getState().ticket_proc;
      let list_temp = _.clone(list_data, true);
      list_temp.map((item, i) => {
        item.checked = false;
        if (item.IDCasting == value.IDCasting) {
          item.checked = checked;
        }
        return item;
      });
      let objData = _.clone(value, true);
      objData.ValueDate = moment(objData.ValueDate || new Date());
      dispatch({
        type: CLICK_ROW_DATA_CASTING,
        payload: {
          list_data: list_temp,
          itemDetail: objData,
          objData: objData
        }
      });
      // update info general to bag default when edit row
      let default_bag_temp = _.clone(default_bag, true);
      default_bag_temp.CodeProcess = objData.CodeProcess;
      default_bag_temp.CodeTicket = objData.CodeTicket;
      dispatch(changeDefaultObjBag(default_bag_temp));
      resolve(CLICK_ROW_DATA_CASTING);
    });
  };
};
export const getListDataTicketProc = (value = "") => {
  return (dispatch, getState) => {
    let { page, total, endPage } = getState().common;
    let pageParams = {
      page: page,
      total: total
    };
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.API_URL_USER}ticket_proc`, {
          params: {
            page: page,
            total: total,
            key: value,
            CodeProcess: typeProcess
          }
        })
        .then(
          response => {
            let { data } = response.data;
            let data_temp = data;
            data_temp.map(item => (item.checked = false));
            let totalRows = data_temp && data_temp[0] && data_temp[0].totalRows;
            dispatch({
              type: GET_LIST_CASTING_PROC,
              payload: {
                list_data: data_temp || [],
                isDetail: false
              }
            });
            dispatch(updateInfoPage(totalRows));

            resolve(response);
          },
          err => {
            reject(err);
          }
        );
    });
  };
};
export const getListBagInTicket = () => {
  return (dispatch, getState) => {
    let { objConfig } = getState().ticket_proc;
    return new Promise((resolve, reject) => {
      axios.get(`${Config.API_URL_USER}ticket_proc/get_all_bag_ticket`).then(
        response => {
          let { data } = response.data;
          let list_bag_combobox = [];
          data = data.filter(x => x.CodeProcess !== objConfig.Code);
          data = data.filter(x => x.CodeProcess === objConfig.PriorProcessName);
          data = data.filter(x => !x.IsDone);
          data.forEach(item => {
            list_bag_combobox.push({
              code: item.IdBag,
              id: item.IdBag,
              label: item.IdBag,
              name: item.IdBag,
              value: item.IdBag
            });
          });
          dispatch({
            type: GET_ALL_BAG_IN_TICKET,
            payload: {
              list_bag_ticket: data || [],
              list_bag_combobox: list_bag_combobox || []
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
export const findBagDefault = (value = "") => {
  return (dispatch, getState) => {
    let { objConfig } = getState().ticket_proc;
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.API_URL_USER}ticket_proc/find_bag_default`, {
          params: {
            IdBag: value,
            CodeProcess: objConfig.Code
          }
        })
        .then(
          response => {
            let { data } = response.data;
            dispatch({
              type: GET_LIST_TICKET_DETAIL,
              payload: {
                isBlockSearch: true
              }
            });
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  };
};
export const validateTicket = obj => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios.post(`${Config.API_URL_USER}ticket_proc/validate_ticket`, obj).then(
        response => {
          let { data } = response.data;
          resolve(response);
        },
        err => {
          reject(err);
        }
      );
    });
  };
};
export const getDataDetailByCode = (value = "") => {
  return (dispatch, getState) => {
    let { objData } = getState().ticket_proc;
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.API_URL_USER}ticket_proc/get_ticket_detail`, {
          params: { CodeTicket: value || objData.CodeTicket }
        })
        .then(
          response => {
            let { data } = response.data;
            let data_temp = data;
            data_temp.map(item => {
              item.Qty_Product_RemainTemp = item.Qty_Product_Remain;
              if (item.Qty_Product_Cancel > 0) {
                item.Qty_Product_RemainTemp =
                  item.Qty_Product_Remain + item.Qty_Product_Cancel;
              }
              return item;
            });
            dispatch({
              type: GET_LIST_TICKET_DETAIL,
              payload: {
                listBagSelected: data_temp
              }
            });
            resolve(data_temp);
          },
          err => {
            reject(err);
          }
        );
    });
  };
};
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const getDataDetailStoneByCode = (
  CodeTicket,
  IsIncludeInOut = false
) => {
  return (dispatch, getState) => {
    let { objConfig } = getState().ticket_proc;
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.API_URL_USER}ticket_proc/get_ticket_detail_stone`, {
          params: { CodeTicket }
        })
        .then(
          response => {
            let { data } = response.data;
            let data_temp = data;
            if (IsIncludeInOut) {
              data = data.map(x => {
                x.INOUT = "IN";
                x.orderby = x.orderby.replace("OUT", "IN");
                return x;
              });
            }

            const groupProductByOrder = _.chain(data)
              .groupBy("strProducts")
              .map(function(v, i) {
                return {
                  IdProduct: i,
                  IdOrder: _.map(v, "IdOrder"),
                  IdBag: _.map(v, "IdBag")
                };
              })
              .value();


            // parse Color by Group Product
            data=indexColor(data)
            dispatch({
              type: GET_LIST_TICKET_DETAIL,
              payload: {
                listStoneWaxset: data
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

export const updateBagDetail = obj => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_BAG_DETAIL,
      payload: {
        objBagDetail: obj
      }
    });
  };
};
export const getProductsByBag = IdBag => {
  return (dispatch, getState) => {
    let { listProductCancel, objData } = getState().ticket_proc;
    let listProductCancelTemp = listProductCancel;
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${Config.API_URL_USER}ticket_proc/ticket_proc_get_products_by_bag`,
          {
            params: {
              IdBag: IdBag,
              CodeTicket: objData.CodeTicket
            }
          }
        )
        .then(res => {
          const { data } = res.data;
          data.map((item, i) => {
            item.orderby = item.IdBag + "_" + (i + 1);
            item.CodeProcess = objData.CodeProcess;
            item.CodeTicket = objData.CodeTicket;
            item.QtyRemainTemp = item.QtyRemain;
            return item;
          });
          let checkBag = listProductCancel.filter(
            x => x.IdBag === data[0].IdBag
          );
          if (checkBag.length == 0) {
            listProductCancelTemp = [...listProductCancelTemp, ...data];
          }
          dispatch({
            type: GET_LIST_PRODUCT_BY_BAG,
            payload: {
              listProductCancel: listProductCancelTemp
            }
          });
          resolve(GET_LIST_PRODUCT_BY_BAG);
        });
    });
  };
};
export const getProductsByTicket = CodeTicket => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${Config.API_URL_USER}ticket_proc/ticket_proc_get_products_by_ticket`,
          {
            params: {
              CodeTicket: CodeTicket
            }
          }
        )
        .then(
          response => {
            let { data } = response.data;

            let { status } = getState().toolbar;

            data.map((item, i) => {
              if (status == "ADD") {
                item.QtyRemainTemp = parseInt(item.QtyRemain || 0);
                item.QtyCancel = "";
                item.WeightGoldReturn = "";
                item.isConfirmed = "";
                item.created_date = "";
                item.confirm_by = "";
              } else {
                item.QtyRemainTemp =
                  parseInt(item.QtyRemain || 0) + parseInt(item.QtyCancel || 0);
              }
              return item;
            });
            dispatch({
              type: GET_LIST_PRODUCT_BY_BAG,
              payload: {
                listProductCancel: data
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
export const getDataSkeleton = () => {
  return (dispatch, getState) => {
    let { objData } = getState().ticket_proc;
    return new Promise((resolve, reject) => {
      axios.get(`${Config.API_URL_USER}ticket_proc/get_ticket_skeleton`).then(
        response => {
          let { data } = response.data;
          let listSkeletionTemp = [];
          data.forEach(item => {
            listSkeletionTemp.push({
              code: item.CodeTicket,
              value: item.CodeTicket,
              name: item.Name,
              label: item.Name,
              CodeLV: item.CodeLV
            });
          });
          dispatch({
            type: GET_TICKET_SKELETON,
            payload: {
              listSkeletion: listSkeletionTemp,
              listSkeletionDefault: data
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

export const getTicketProcDetail = (CodeTicket) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios.get(`${Config.API_URL_USER}ticket_proc/ticket_proc_detail`,{params: { CodeTicket }}).then(
        response => {
          let { data } = response.data;
          const objData=data[0]
          dispatch({
            type: UPDATE_CELL_INPUT_BY_BAG,
            payload: {
              objData
            }
          });
          resolve(objData);
        },
        err => {
          reject(err);
        }
      );
    });
  };
};
export const printDetail = (itemDetail) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${Config.API_URL_USER}ticket_proc/print_detail`,
          { keyTicket: itemDetail.CodeTicket,Info: itemDetail},
          {
            responseType: "arraybuffer",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/xlsx"
            }
          }
        )
        .then(
          response => {
            const url = window.URL.createObjectURL(
              new Blob([response.data], {
                type:
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              }),
              "excel.xlsx"
            );
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "transfer" + ".xlsx"); //or any other extension
            document.body.appendChild(link);
            link.click();
            resolve(response);
          },
          err => {
            reject(err);
          }
        );
    });
  };
};
