import {
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
  GET_ALL_BAG_IN_TICKET
} from "../types";
import { updateInfoPage, resetInfoPage } from "modules/common/actions/form";
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
export const getListStoneWaxsetByIdBag = obj => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let { listStoneWaxset } = getState().ticket_proc;
      let findlistStoneWaxset = listStoneWaxset.filter(
        x => x.IdBag === obj.IdBag
      );
      if (findlistStoneWaxset.length == 0) {
        axios
          .get(`${Config.API_URL_USER}ticket_proc/get_list_stone_waxset_bag`, {
            params: { IdBag: obj.IdBag }
          })
          .then(
            response => {
              let { data } = response.data;
              dispatch({
                type: GET_LIST_WAXSET_BY_BAG,
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
      } else {
        resolve(GET_LIST_WAXSET_BY_BAG);
      }
    });
  };
};

export const showFormStone = value => {
  return (dispatch, getState) => {
    dispatch({
      type: SHOW_FORM_STONE,
      payload: {
        isShowStone: value,
        objBagDetail: {}
      }
    });
  };
};
export const getConfigProcess = value => {
  return (dispatch, getState) => {
    const { list_config_process } = getState().header;
    let list_config_processTemp = _.clone(list_config_process, true);
    const type = Helper.getParam(window.location.href, "type");
    list_config_processTemp = list_config_processTemp.filter(
      x => x.Code == type
    );
    dispatch({
      type: GET_CONFIG_PROCESS_TICKET,
      payload: {
        objConfig: (list_config_processTemp && list_config_processTemp[0]) || {}
      }
    });
    dispatch(
      getListBagInTicket(
        (list_config_processTemp &&
          list_config_processTemp[0].PriorProcessName) ||
        ""
      )
    );
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
      axios.get(`${Config.API_URL_USER}ticket_proc/get_auto_number`).then(
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
          objData_temp["CodeProcess"] = objConfig.Code || "";
          default_bag_temp["CodeTicket"] = numberGen;
          default_bag_temp["CodeProcess"] = objConfig.Code || "";
          listBagSelectedTemp.map(x => (x.CodeTicket = numberGen));
          listBagSelectedTemp.map(x => (x.CodeProcess = objConfig.Code || ""));
          dispatch({
            type: GENERATE_NUMBER_ID_CASTING,
            payload: {
              objData: objData_temp,
              listBagSelected: listBagSelectedTemp,
              default_bag: default_bag_temp
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
            listStoneWaxset
          } = getState().ticket_proc;
          listStoneWaxset.map(x => (x.CodeTicket = objData.CodeTicket));
          axios
            .post(`${Config.API_URL_USER}ticket_proc/add`, {
              objData: objData,
              listBag: listBagSelected,
              listStone: listStoneWaxset
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
    let { objData, listBagSelected, listStoneWaxset } = getState().ticket_proc;
    listStoneWaxset.map(x => (x.CodeTicket = objData.CodeTicket));
    return new Promise(
      (resolve, reject) => {
        axios
          .post(`${Config.API_URL_USER}ticket_proc/update`, {
            objData: objData,
            listBag: listBagSelected,
            listStone: listStoneWaxset
          })
          .then(response => {
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

export const updateInputItemCasting = obj => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_CELL_INPUT_BY_BAG,
      payload: {
        objData: obj
      }
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
// export const updateCellBrokenQty = obj => {
//   return (dispatch, getState) => {
//     let {
//       listStoneWaxset,
//       typeInOut,
//       totalWeightBroken,
//       listBagSelected,
//       objConfig
//     } = getState().ticket_proc;
//     let temp = _.clone(listStoneWaxset, true);
//     temp.map((item, i) => {
//       if (item.orderby == obj.id) {
//         const valueTemp = isNaN(obj.value) ? "" : parseFloat(obj.value);
//         item[obj.key] = valueTemp;
//         item["QtyStonePcs"] = valueTemp * item.QtyStonePcsDefault;
//       }
//       return item;
//     });
//     console.log('aa<<')
//     dispatch({
//       type: UPDATE_CELL_TICKET_STONE,
//       payload: {
//         listStoneWaxset: temp
//       }
//     });
//   };
// };
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
      groupProducts.forEach(g => {
        if (strWorkersTemp.indexOf(g.Worker) == -1) {
          strWorkersTemp += g.Worker + " ,";
        }
        if (g.QtyAssignProduct) {
          sumQtyAssignProduct += g.QtyAssignProduct;
        }
      });
      item.strWorkers = strWorkersTemp.substr(0, strWorkersTemp.length - 1);
      if (item.strWorkers) item.statusBag = "Đã gắn đá";
      else {
        item.statusBag = "Chưa gắn đá";
      }
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
export const acceptStatus = CodeTicket => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${Config.API_URL_USER}ticket_proc/accept_status`, { CodeTicket })
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
export const updateCellBag = obj => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let { listBagSelected, objConfig } = getState().ticket_proc;
      let temp = _.clone(listBagSelected, true);
      let { IsIncludeInOut } = objConfig;
      temp.map((item, i) => {
        if (parseInt(item.orderby) === parseInt(obj.id)) {
          let { Broken_Weight_OUT, Broken_Weight_IN, Waxset_Weight } = item;
          let valueTemp = obj.value;
          let Broken_Weight_OUTTemp = parseFloat(Broken_Weight_OUT || 0);
          let Broken_Weight_INTemp = parseFloat(Broken_Weight_IN || 0);
          let Waxset_WeightTemp = parseFloat(Waxset_Weight || 0);
          valueTemp = parseFloat(valueTemp || 0);
          switch (obj.key) {
            // trường hợp OUT nhập TL (Vàng + Đá) Trừ Đá Rớt
            // (TL (Vàng + Đá) Trừ Đá Rớt + Tổng TL đá rớt ) - trọng lượng waxset
            case "Product_Weight_OUT":
              item["Gold_Weight_OUT"] =
                valueTemp * Broken_Weight_OUTTemp - Waxset_WeightTemp;
              break;
            // tương tự trường hợp OUT
            case "Product_Weight_IN":
              item["Gold_Weight_IN"] =
                valueTemp * Broken_Weight_INTemp - Waxset_WeightTemp;
              break;
            default:
              break;
          }
          if (IsIncludeInOut == 1) {
            item["Gold_Lost"] = item.Gold_Weight_IN - item.Gold_Weight_OUT;
          }
          item[obj.key] = obj.value;
        }
        return item;
      });
      dispatch({
        type: UPDATE_CELL_INPUT_BY_BAG,
        payload: {
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
      objConfig
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
        itemBag.index = item_temp.index;
        itemBag.CodeProcess = item_temp.CodeProcess;
        itemBag.CodeTicket = item_temp.CodeTicket;
        itemBag.orderby = item_temp.orderby;
        itemBag.created_by = item_temp.created_by;
        // cập nhật output của bag trước vào input của proccess hiện tại
        if (objConfig.IsIncludeInOut != 0) {
          itemBag.Broken_Weight_IN = itemBag.Broken_Weight_OUT;
          itemBag.Broken_Weight_OUT = null;
          itemBag.Gold_Weight_IN = itemBag.Gold_Weight_OUT;
          itemBag.Gold_Weight_OUT = null;
          itemBag.Product_Weight_IN = itemBag.Product_Weight_OUT;
          itemBag.Product_Weight_OUT = null;
        }
        listBagSelectedConvert.push(itemBag);
      } else {
        listBagSelectedConvert.push(item_temp);
      }
    });
    dispatch({
      type: UPDATE_EXISTS_BAG,
      payload: {
        listBagSelected: listBagSelectedConvert
      }
    });
    dispatch(
      getDataDetailStoneByCode(
        objBag[0].CodeTicket,
        objConfig.IsIncludeInOut != 0
      )
    );
  };
};
export const removeItemProduct = obj => {
  return (dispatch, getState) => {
    let { listStoneWaxset } = getState().ticket_proc_wax_setting;
    let listStoneWaxsetNew = _.clone(listStoneWaxset, true);
    listStoneWaxsetNew = listStoneWaxsetNew.filter(
      x => x.orderby !== obj.orderby
    );
    listStoneWaxsetNew.map((item, i) => {
      if (item.IdGroup === obj.IdGroup) {
        let num = parseInt(i) + 1;
        item.orderby = item.IdGroup + "_" + num;
      }
      return item;
    });
    dispatch({
      type: UPDATE_CELL_TICKET_STONE,
      payload: {
        listStoneWaxset: listStoneWaxsetNew
      }
    });
  };
};
export const addSplitProduct = obj => {
  return (dispatch, getState) => {
    let { listStoneWaxset } = getState().ticket_proc_wax_setting;
    let listStoneWaxsetNew = _.clone(listStoneWaxset, true);
    let itemNew = _.clone(obj, true);
    let lengthByIdGroup = listStoneWaxsetNew.filter(
      x => x.IdGroup === obj.IdGroup
    );
    let num = lengthByIdGroup.length + 1;
    itemNew.Worker = "";
    itemNew.orderby = obj.IdGroup + "_" + num;
    itemNew.QtyAssignProduct = obj.QtyProduct - obj.QtyAssignProduct;
    listStoneWaxsetNew.push(itemNew);
    dispatch({
      type: UPDATE_CELL_TICKET_STONE,
      payload: {
        listStoneWaxset: listStoneWaxsetNew
      }
    });
  };
};
export const updateExistBagWaxSetting = objData => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.API_URL_USER}ticket_proc/get_list_stone_waxset_bag`, {
          params: { IdBag: objData.Id }
        })
        .then(
          response => {
            let { data } = response.data;

            let {
              listBagSelected,
              list_products,
              listStoneWaxset
            } = getState().ticket_proc;
            let listBagSelected_temp = _.clone(listBagSelected, true);
            let listBagSelectedConvert = [];
            // insert data vào bag
            listBagSelected_temp.map((item, i) => {
              let item_temp = _.clone(item, true);
              let itemBag = _.clone(objData, true);
              itemBag.isExists = true;
              if (
                item_temp.IdBag.toUpperCase() == itemBag.Id.toUpperCase() &&
                item_temp.isNew
              ) {
                itemBag.isNew = false;
                itemBag.index = item_temp.index;
                itemBag.CodeProcess = item_temp.CodeProcess;
                itemBag.CodeTicket = item_temp.CodeTicket;
                itemBag.orderby = item_temp.orderby;
                itemBag.created_by = item_temp.created_by;

                itemBag.IsDone = 0;
                itemBag.strProducts = "";
                itemBag.sumQtyProduct = 0; // tổng số lượng sp theo bag
                itemBag.sumQtyStoneWaxset = 0; // tổng số lượng đá gắn waset
                itemBag.statusBag = "Chưa gắn đá";
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
              } else {
                listBagSelectedConvert.push(item_temp);
              }
              // sum đá theo sản phẩm
              let groupListStoneWaxset = [
                ...data
                  .reduce((map, item) => {
                    const { IdProduct: key, QtyStonePcs, IdStone } = item;
                    const prev = map.get(key);
                    const strStone = IdStone + `(${QtyStonePcs}) ,`;
                    if (prev) {
                      prev.IdStone += strStone;
                      prev.QtyStonePcs += QtyStonePcs;
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
                for (let i = 1; i <= product.QtyProduct; i++) {
                  let itemProduct = _.clone(product, true);
                  itemProduct.orderby = itemProduct.orderby + `_split_${i}`;
                  itemProduct.QtyAssignProduct = 1;
                  listBreakDownProduct.push(itemProduct);
                }
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
                  listStoneWaxset: [
                    ...listStoneWaxset,
                    ...listBreakDownProduct
                  ],
                  listStoneWaxsetDefault: data,
                  listBagSelected: listBagSelectedConvert
                }
              });
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

export const addItemBagNew = () => {
  return (dispatch, getState) => {
    let { listBagSelected, default_bag } = getState().ticket_proc;
    let default_bag_temp = _.clone(default_bag, true);
    let listBagSelected_temp = _.clone(listBagSelected, true);
    default_bag_temp.orderby = listBagSelected_temp.length;
    default_bag_temp.index = listBagSelected_temp.length;
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
    let { listBagSelected } = getState().ticket_proc;
    let listBagSelectedTemp = _.clone(listBagSelected, true);
    listBagSelectedTemp = listBagSelectedTemp.filter(
      x => x.orderby != obj.orderby
    );
    dispatch({
      type: GET_LIST_TICKET_DETAIL,
      payload: {
        listBagSelected: listBagSelectedTemp
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
      let { list_data } = getState().ticket_proc;
      var list_temp = _.clone(list_data, true);
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
      resolve(CLICK_ROW_DATA_CASTING);
    });
  };
};
export const getListDataTicketProc = (value = "") => {
  return (dispatch, getState) => {
    const type = Helper.getParam(window.location.href, "type");
    let { page, total, endPage } = getState().common;
    let pageParams = {
      page: page,
      total: total
    };
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.API_URL_USER}ticket_proc`, {
          params: { page: page, total: total, key: value, CodeProcess: type }
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
export const getListBagInTicket = CodeProcess => {
  return (dispatch, getState) => {
    let { objConfig } = getState().ticket_proc;
    return new Promise((resolve, reject) => {
      axios.get(`${Config.API_URL_USER}ticket_proc/get_all_bag_ticket`).then(
        response => {
          let { data } = response.data;
          let list_bag_combobox = [];
          data = data.filter(x => x.CodeProcess !== objConfig.Code);
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
export const getDataDetailByCode = (value = "") => {
  return (dispatch, getState) => {
    let { objData } = getState().ticket_proc;
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.API_URL_USER}ticket_proc/get_ticket_detail`, {
          params: { CodeTicket: objData.CodeTicket }
        })
        .then(
          response => {
            let { data } = response.data;
            let data_temp = data;
            dispatch({
              type: GET_LIST_TICKET_DETAIL,
              payload: {
                listBagSelected: data
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
