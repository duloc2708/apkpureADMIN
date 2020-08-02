import {
  GET_LIST_OUTPUT_BY_CUSTOMER,
  GET_LIST_DATA_TURN_INOUT,
  CLICK_ROW_DATA_TURN_INOUT,
  IS_EDIT_CASTING,
  GET_ALL_BAG_IN_CASTING_PROC,
  UPDATE_CELL_INPUT,
  INIT_ADD_CASTING_PROC,
  GET_LIST_WORKER,
  GENERATE_NUMBER,
  CLEAR_DATA_TURN_INOUT,
  UPDATE_EXISTS_BAG,
  SHOW_FORM_STONE,
  GET_LIST_WAXSET_BY_BAG,
  GET_CONFIG_PROCESS_TICKET,
  GET_LIST_HEADER_TABLE,
  ADD_ITEM_BAG,
  GET_LIST_TICKET_DETAIL,
  UPDATE_BROKEN_QTY_STONE,
  UPDATE_TYPE_IN_OUT,
  UPDATE_BAG_DETAIL,
  UPDATE_TYPE_TURN,
  UPDATE_CELL_INPUT_SEARCH,
  GET_LIST_PRODUCTS_SEARCH,
  GET_LIST_CUSTOMER_IN_CD_TURN,
  SELECT_CUSTOMER_IN_CD_TURN,
  ADD_PRODUCTS_NEW,
  LOADING_PRODUCTS,
  GET_LIST_TURN_TYPE,
  GET_LIST_PRODUCTS_DETAIL_TURN,
  INIT_DATA_CD_TURN,
  GET_LIST_PRODUCTS_INV,
  GET_LIST_BAO_GIA_IN_TURN_CD,
  GET_LIST_PRODUCTS_NOT_ACCEPT,
  GET_LIST_TURN_IN,
  GET_LIST_PRODUCTS_BY_PRICE_CD_TURN,
  GET_LIST_PRODUCTS_SET,
  GET_LIST_CUSTOMER_CONFIG
} from "../types";
import {
  updateInfoPage,
  resetInfoPage,
  updateTotalInPage
} from "modules/common/actions/form";

export const getListTurnByIn = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.API_URL_USER}cd_turn_inout`, {
          params: {
            page: 1,
            total: 1000,
            key: "",
            SortKey: "",
            SortBy: "",
            ColFilter: "",
            ColValue: ""
          }
        })
        .then(
          response => {
            let { data } = response.data;
            let type = Helper.getParam(window.location.href, "type");
            let data_temp = data;
            let parseData = [];
            if (type == 1) {
              // lấy danh sách phiếu xuất trả, hàng hồi
              data_temp = data_temp.filter(
                x =>
                  x.Turn_Type == "TURN_TYPE_01" &&
                  x.Trans_Type != "TURN_TRANS_TYPE_01"
              );
            }
            data_temp.map(item => {
              parseData.push({
                value: item.TicketCode,
                name: item.TicketCode,
                label: item.TicketCode,
                IdCustomer: item.IdCustomer,
                Status: item.Status
              });
            });
            parseData = parseData.filter(
              x => x.Status == "STATUS_TURN_INOUT_02"
            );
            dispatch({
              type: GET_LIST_TURN_IN,
              payload: {
                listCdTurnInDefault: parseData,
                listCdTurnIn: parseData
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
export const getDataProductsNotAccept = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.API_URL_USER}cd_turn_inout/get_list_products_not_accept`)
        .then(
          response => {
            let { data } = response.data;
            dispatch({
              type: GET_LIST_PRODUCTS_NOT_ACCEPT,
              payload: {
                listProductsNotAccept: data
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
export const printDetail = (itemDetail, type) => {
  return (dispatch, getState) => {
    let { list_data } = getState().cd_turn_inout;
    let typeParams = Helper.getParam(window.location.href, "type");
    let listId = "";
    let data = [];
    let idreport = Helper.generateUUIDV4();
    let stringFile = "";
    let strPrefix = "";
    if (typeParams == 0) {
      strPrefix = "Phiếu trả hàng_";
    } else {
      strPrefix = "Phiếu tái xuất_";
    }
    list_data.map(item => {
      if (item.checked) {
        data.push({ idreport: idreport, keyMap: item.keyMap });
        listId = listId + item.keyMap + ",";
        stringFile = stringFile + item.keyMap + "_";
      }
    });
    if (listId) {
      listId = listId.substr(0, listId.length - 1);
      stringFile = stringFile.substr(0, stringFile.length - 1); //+ '_' + itemDetail.IdOrder.substr(7, itemDetail.IdOrder.length - 6)
    } else {
      listId = itemDetail.keyMap;
      stringFile = strPrefix + itemDetail.keyMap;
    }

    if (data.length == 0) {
      data.push({ idreport: idreport, keyMap: itemDetail.keyMap });
    }
    if (data.length <= 1) {
      stringFile = strPrefix + itemDetail.keyMap;
    } else {
      stringFile = strPrefix + stringFile;
    }
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${Config.API_URL_USER}cd_turn_inout/print_detail`,
          { idreport: idreport, data: data, Info: itemDetail, type: type },
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
            link.setAttribute("download", stringFile + ".xlsx"); //or any other extension
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
export const getListDataBaoGiaInCdTurn = (params = { page: 1, total: 50 }) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.API_URL_USER}baogia`, {
          params: { page: params.page, total: params.total }
        })
        .then(
          response => {
            let { data } = response.data;
            let data_temp = _.clone(data, true);
            data_temp.map(item => (item.checked = false));
            dispatch({
              type: GET_LIST_BAO_GIA_IN_TURN_CD,
              payload: {
                list_data_baogia: data_temp || []
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
export const getDataProductsInv = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.API_URL_USER}cd_turn_inout/get_list_inventy_products`)
        .then(
          response => {
            let { data } = response.data;
            let data_temp = [];
            data.map((item, i) => {
              data_temp.push(item);
            });
            dispatch({
              type: GET_LIST_PRODUCTS_INV,
              payload: {
                list_products_inv: data_temp
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
export const getListProductsSet = () => {
  return (dispatch, getState) => {
    let { username } = getState().header;
    return new Promise((resolve, reject) => {
      axios.get(`${Config.API_URL_USER}cd_turn_inout/get_product_set`).then(
        response => {
          let { data } = response;
          dispatch({
            type: GET_LIST_PRODUCTS_SET,
            payload: {
              list_products_set: data
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
export const initData = () => {
  return (dispatch, getState) => {
    let { objSearch, objData } = getState().cd_turn_inout;
    let type = Helper.getParam(window.location.href, "type");
    objSearch["Inv"] = type == 0 ? 0 : 1;
    objData["Trans_Type"] =
      type == 0 ? "TURN_TRANS_TYPE_02" : "TURN_TRANS_TYPE_03";
    dispatch({
      type: INIT_DATA_CD_TURN,
      payload: {
        objSearch: objSearch
      }
    });
  };
};
export const checkInventyProduct = obj => {
  return (dispatch, getState) => {
    let { username } = getState().header;
    return new Promise((resolve, reject) => {
      axios
        .post(`${Config.API_URL_USER}cd_turn_inout/check_inventy_products`, obj)
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
export const acceptTurnInout = keyMap => {
  return (dispatch, getState) => {
    let { username } = getState().header;
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.API_URL_USER}cd_turn_inout/accept`, {
          params: { keyMap: keyMap, username: username }
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
export const finishTurnInout = keyMap => {
  return (dispatch, getState) => {
    let { username } = getState().header;
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.API_URL_USER}cd_turn_inout/finish`, {
          params: { keyMap: keyMap, username: username }
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
export const onChangeFilterListTurnInOut = obj => {
  return (dispatch, getState) => {
    dispatch(getListDataCdTurn("", "", "", obj.id, obj.value));
  };
};
export const getListTurnType = data => {
  return (dispatch, getState) => {
    dispatch({
      type: GET_LIST_TURN_TYPE,
      payload: {
        list_turn_type: data
      }
    });
  };
};

export const sortDataListTurnInOut = obj => {
  return (dispatch, getState) => {
    let { listHeaderTableCustom } = getState().cd_gold_trans;
    let temp = _.clone(listHeaderTableCustom, true);
    temp = temp.map(item => {
      if (obj.key == item.key) {
        let sortBy = "";
        if (item.sortBy == "up") {
          item.sortBy = "down";
          sortBy = "DESC";
        } else {
          item.sortBy = "up";
          sortBy = "ASC";
        }
        dispatch(getListDataGoldTrans("", item.key, sortBy));
      } else {
        item.sortBy = "";
      }
      return item;
    });
    dispatch({
      type: SORT_DATA_LIST_GOLD,
      payload: {
        listHeaderTableCustom: temp
      }
    });
  };
};
export const addProductsAll = list_products_search => {
  return (dispatch, getState) => {
    let { listProductSelected } = getState().cd_turn_inout;
    let listProductSelectedTemp = _.clone(list_products_search, true);
    let type = Helper.getParam(window.location.href, "type");
    listProductSelectedTemp.map(x => (x.OrderIndex = 0));
    if (type == 1) {
      listProductSelectedTemp.map(x => (x.QtySearch = x.Qty));
    } else {
      listProductSelectedTemp.map(x => (x.QtySearch = x.Qty));
    }
    listProductSelectedTemp.map((item, i) => {
      item.OrderIndexCell = i + 1;
      item.OrderIndex = (item.IdProductParent || item.IdProduct) + item.Color;
      return item;
    });
    listProductSelectedTemp = _.orderBy(
      listProductSelectedTemp,
      "OrderIndex",
      "asc"
    );
    dispatch({
      type: ADD_PRODUCTS_NEW,
      payload: {
        listProductSelected: listProductSelectedTemp
      }
    });
  };
};
export const addProductsNew = data => {
  return (dispatch, getState) => {
    let { listProductSelected, objData } = getState().cd_turn_inout;
    let listProductSelectedTemp = _.clone(listProductSelected, true);
    let listProductSelectedNew = [];
    let lengthData = listProductSelectedTemp.length;

    data.map(x => (x.OrderIndex = 0));
    data.map(x => (x.QtySearch = x.Qty));
    data.map(x => (x.Qty = ""));

    data.map((item, i) => {
      item.OrderIndexCell = lengthData + "_" + i;
    });

    listProductSelectedTemp = listProductSelectedTemp.map((item, i) => {
      item.OrderIndex = i + 1;
      return item;
    });
    listProductSelectedNew = [...listProductSelectedTemp, ...data];
    listProductSelectedNew = _.orderBy(
      listProductSelectedNew,
      "OrderIndex",
      "asc"
    );
    dispatch({
      type: ADD_PRODUCTS_NEW,
      payload: {
        listProductSelected: listProductSelectedNew
      }
    });
  };
};
export const getListCustomerConfig = IdCustomer => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.API_URL_USER}customer/get_list_customer_config`, {
          params: { IdCustomer }
        })
        .then(
          response => {
            let { data } = response.data;
            data.map(item => {
              item.code = item.groupKey;
              item.label = item.groupKeyfullText;
              item.name = item.groupKeyfullText;
              item.value = item.groupKey;
              return item;
            });
            dispatch({
              type: GET_LIST_CUSTOMER_CONFIG,
              payload: {
                listCustomerConfig: data || []
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
export const selectCustomerCash = value => {
  return (dispatch, getState) => {
    let typeIntOut = Helper.getParam(window.location.href, "type");
    let { listCdTurnInDefault, objData, objSearch } = getState().cd_turn_inout;
    let objData_temp = _.clone(objData, true);
    let objSearch_temp = _.clone(objSearch, true);
    let { list_data_all } = getState().list;
    let list_data_allTemp = _.clone(list_data_all, true);
    let { value: valueCode, name } = value || {};

    dispatch(getListCustomerConfig(valueCode)).then(res => {
      let { listCustomerConfig } = getState().cd_turn_inout;
      if (listCustomerConfig.length == 1) {
        objData_temp = {
          ...objData_temp,
          codeLV: listCustomerConfig[0].CodeLV,
          codeLH: listCustomerConfig[0].CodeLH,
          codeMX: listCustomerConfig[0].CodeMX,
          codeLAI: listCustomerConfig[0].CodeLAI,
          ValueLV: listCustomerConfig[0].ValueLV,
          ValueLH: listCustomerConfig[0].ValueLH,
          ValueMX: listCustomerConfig[0].ValueMX,
          ValueLAI: listCustomerConfig[0].ValueLAI,
          CodeBaoGia: listCustomerConfig[0].CodeBaoGia,
          discount: listCustomerConfig[0].Discount,
          Customer_groupKey: listCustomerConfig[0].groupKey
        };
        objSearch_temp = {
          ...objSearch_temp,
          CodeBaoGia: listCustomerConfig[0].CodeBaoGia,
          SCodeLV: listCustomerConfig[0].CodeLV,
          SCodeLH: listCustomerConfig[0].CodeLH,
          SCodeMX: listCustomerConfig[0].CodeMX
        };
      }
      objData_temp["IdCustomer"] = valueCode;
      objData_temp["nameCustomer"] = name;
      //   // nếu là hàng hồi thì LAI sẽ  = 0
      if (objData.Trans_Type == "TURN_TRANS_TYPE_01") {
        objData_temp["codeLAI"] = "0";
        bjData_temp["ValueLAI"] = "0";
      }
      // nếu là loại tái xuất thì không update field search khách hàng
      objSearch_temp["SIdCustomer"] = typeIntOut == "0" ? valueCode : "";
      objSearch_temp["Is_Filter"] = true;
      dispatch({
        type: SELECT_CUSTOMER_IN_CD_TURN,
        payload: {
          objData: objData_temp,
          objSearch: objSearch_temp,
          CodeBaoGiaTemp: objSearch_temp.CodeBaoGia
        }
      });

      if (typeIntOut == "1") {
        let listCdTurnInByCustomer = listCdTurnInDefault.filter(
          x => x.IdCustomer == valueCode
        );
        dispatch({
          type: GET_LIST_TURN_IN,
          payload: {
            listCdTurnIn: listCdTurnInByCustomer
          }
        });
      }
      // lấy danh sách xuất hàng
      dispatch(getListOutputByCustomer());
      // lấy danh sách báo giá
      if (valueCode && objSearch_temp.CodeBaoGia) {
        dispatch(getListProductsByPrice(objSearch_temp.CodeBaoGia));
      }
    });
  };
};

export const updateBaoGiaCdTurnInOut = value => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: UPDATE_CELL_INPUT_SEARCH,
        payload: {
          CodeBaoGiaTemp: value
        }
      });
      dispatch(getListProductsByPrice(value));
      resolve(UPDATE_CELL_INPUT_SEARCH);
    });
  };
};

export const addProductCdTurnInOut = () => {
  return (dispatch, getState) => {
    let {
      objData,
      default_product,
      listProductSelected
    } = getState().cd_turn_inout;
    let default_product_temp = _.clone(default_product, true);
    default_product_temp.isManual = true;
    default_product_temp.index = listProductSelected.length + 1;
    default_product_temp.OrderIndexCell = listProductSelected.length + 1;
    default_product_temp.OrderIndex = listProductSelected.length + 1;
    let listProductSelected_temp = _.clone(listProductSelected, true);
    listProductSelected_temp.push(default_product_temp);
    dispatch({
      type: ADD_PRODUCTS_NEW,
      payload: {
        listProductSelected: listProductSelected_temp
      }
    });
  };
};
export const updateInfoOutput = obj => {
  return (dispatch, getState) => {
    let { objSearch, objData } = getState().cd_turn_inout;
    let objData_temp = _.clone(objData, true);
    objData_temp["IdOutput"] = obj.value || "";

    let objDataSearch_temp = _.clone(objSearch, true);
    objDataSearch_temp["IdOutput"] = obj.value || "";

    return new Promise((resolve, reject) => {
      dispatch({
        type: UPDATE_CELL_INPUT_SEARCH,
        payload: {
          objData: objData_temp,
          objSearch: objDataSearch_temp
        }
      });
      resolve(UPDATE_CELL_INPUT_SEARCH);
    });
  };
};

export const selectCustomerSearch = value => {
  return (dispatch, getState) => {
    let { objSearch } = getState().cd_turn_inout;
    let objData_temp = _.clone(objSearch, true);
    let { value: valueCode, name } = value || {};
    objData_temp["SIdCustomer"] = valueCode;
    dispatch({
      type: UPDATE_CELL_INPUT_SEARCH,
      payload: {
        objSearch: objData_temp
      }
    });
  };
};

export const getListProductDetailTurn = objData => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.API_URL_USER}cd_turn_inout/get_list_products_detail`, {
          params: { keyMap: objData.keyMap }
        })
        .then(
          response => {
            let { data } = response.data;
            dispatch({
              type: GET_LIST_PRODUCTS_DETAIL_TURN,
              payload: {
                listProductSelected: data || []
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
export const getListOutputByCustomer = () => {
  return (dispatch, getState) => {
    let { objData } = getState().cd_turn_inout;
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.API_URL_USER}cash_trans/get_list_output_by_customer`, {
          params: { IdCustomer: objData.IdCustomer }
        })
        .then(
          response => {
            let { data } = response.data;
            dispatch({
              type: GET_LIST_OUTPUT_BY_CUSTOMER,
              payload: {
                listOutputByCustomer: data
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
export const getListCustomer = params => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.API_URL_USER}customer`, {
          params: { page: 1, total: 50000 }
        })
        .then(
          response => {
            let { data } = response;
            dispatch({
              type: GET_LIST_CUSTOMER_IN_CD_TURN,
              payload: {
                listCustomer: data || []
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

export const getListHeaderTable = () => {
  return (dispatch, getState) => {
    let {
      objConfig,
      listHeaderTableNotIntOut,
      listHeaderTableInOut,
      listHeaderBagNotInOut,
      listHeaderBagInOut
    } = getState().cd_turn_inout;
    let { IsIncludeInOut } = objConfig;
    let listHeaderTable = [],
      listHeaderBag = [];
    if (IsIncludeInOut == 0) {
      listHeaderTable = listHeaderTableNotIntOut;
      listHeaderBag = listHeaderBagNotInOut;
    } else {
      listHeaderTable = listHeaderTableInOut;
      listHeaderBag = listHeaderBagInOut;
    }
    dispatch({
      type: GET_LIST_HEADER_TABLE,
      payload: {
        listHeaderTable: listHeaderTable,
        listHeaderBag: listHeaderBag
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
  };
};
export const removeItemProduct = item => {
  return (dispatch, getState) => {
    let { listProductSelected } = getState().cd_turn_inout;
    let listProductSelectedTemp = _.clone(listProductSelected, true);
    listProductSelectedTemp = listProductSelectedTemp.filter(
      x => x.OrderIndex != item.OrderIndex
    );
    listProductSelectedTemp = listProductSelectedTemp.map((item, i) => {
      item.OrderIndex = i;
      return item;
    });
    dispatch({
      type: GET_LIST_TICKET_DETAIL,
      payload: {
        listProductSelected: listProductSelectedTemp
      }
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
export const resetData = () => {
  return (dispatch, getState) => {
    return new Promise(
      (resolve, reject) => {
        dispatch({
          type: CLEAR_DATA_TURN_INOUT,
          payload: null
        });
        resolve(CLEAR_DATA_TURN_INOUT);
      },
      err => {
        reject(err);
      }
    );
  };
};
export const getNumberAuto = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios.get(`${Config.API_URL_USER}cd_turn_inout/get_auto_number`).then(
        response => {
          let { data } = response.data;
          let {
            objData,
            objSearch,
            listProductSelected,
            objConfig,
            default_product
          } = getState().cd_turn_inout;
          let objData_temp = _.clone(objData, true);
          let default_product_temp = _.clone(default_product, true);
          let numberGen = (data && data[0].value) || "0000000";
          let type = Helper.getParam(window.location.href, "type");
          objData_temp["TicketCode"] = numberGen;
          objData_temp["CodeProcess"] = objConfig.Code || "";
          objData_temp["Turn_Type"] =
            type == 0 ? "TURN_TYPE_01" : "TURN_TYPE_02";
          objData_temp["Inv"] = type == 0 ? 0 : 1;
          default_product_temp["TicketCode"] = numberGen;
          default_product_temp["CodeProcess"] = objConfig.Code || "";
          objSearch["Inv"] = type == 0 ? 0 : 1;
          dispatch({
            type: GENERATE_NUMBER,
            payload: {
              objData: objData_temp,
              default_product: default_product_temp
            }
          });

          // lấy 10 record hiển thị tìm kiếm sp
          // dispatch(updateTotalInPage(10))
          resolve(response);
        },
        err => {
          reject(err);
        }
      );
    });
  };
};

const updateOrderByOrg = data => {
  let newData = [];
  let IdProductParentTemp = "";
  let orderby_org = 0;
  data.forEach(item => {
    if (item.IdProductParent !== IdProductParentTemp) {
      orderby_org = orderby_org + 1;
    }
    item.orderby_org = orderby_org;
    IdProductParentTemp = item.IdProductParent;
    newData.push(item);
  });
  return newData;
};

export const updateItem = data => {
  let ListProduct_temp = _.clone(data);
  return (dispatch, getState) => {
    let {
      objData,
      listProductSelected,
      CodeBaoGiaTemp
    } = getState().cd_turn_inout;
    listProductSelected.map(x => (x.TicketCode = objData.TicketCode));
    // trường hợp xuất hàng hồi thì update loại tồn kho
    if (objData.Trans_Type == "TURN_TRANS_TYPE_01") {
      listProductSelected.map(x => (x.Inv_Type = 1));
    }
    // trường hợp xuất hàng nấu thì k cần WeightCustom
    if (objData.Trans_Type == "TURN_TRANS_TYPE_04") {
      listProductSelected.map(x => (x.WeightCustom = ""));
    }
    // trường hợp khác loại tái xuất không update weight custom
    if (objData.Trans_Type != "TURN_TRANS_TYPE_03") {
      // listProductSelected.map(x => x.WeightCustom = '')
    } else {
      listProductSelected.map(x => (x.ValueLAI = objData.ValueLAI));
      listProductSelected.map(x => (x.CodeLAI = objData.CodeLAI));
    }
    // tính lại ammount
    listProductSelected = listProductSelected.map(item => {
      item.amount = Helper.roundNumberPerThousand(
        item.price * parseInt(item.Qty)
      );
      item.org_amount = Helper.roundNumberPerThousand(
        item.price * parseInt(item.Qty)
      );
      item.org_price = Helper.roundNumberPerThousand(item.price);
      return item;
    });
    let objDataTemp = _.clone(objData, true);
    let type = Helper.getParam(window.location.href, "type");
    if (CodeBaoGiaTemp && type == 1) {
      objDataTemp["CodeBaoGia"] = CodeBaoGiaTemp;
    }
    listProductSelected = listProductSelected.map(item => {
      if (objDataTemp.Trans_Type !== "TURN_TRANS_TYPE_04") {
        item.CodeLV = objData.codeLV;
        item.CodeLH = objData.codeLH;
        item.CodeMX = objData.codeMX;
        item.CodeLAI = objData.codeLAI;
        item.ValueLAI = objData.ValueLAI;
        item.ValueLH = objData.ValueLH;
        item.valueLV = objData.ValueLV;
        item.ValueMX = objData.ValueMX;
        if (!item.Genkey)
          item.Genkey =
            item.IdProduct +
            item.IdProductParent +
            item.Color +
            item.CodeLV +
            item.CodeLH +
            item.CodeLAI;
      }
      return item;
    });

    return new Promise(
      (resolve, reject) => {
        axios
          .post(`${Config.API_URL_USER}cd_turn_inout/update`, {
            objData: objDataTemp,
            listProductSelected: updateOrderByOrg(listProductSelected)
          })
          .then(response => {
            resolve(response);
          });
      },
      err => {
        reject(err);
      }
    );
  };
};
export const addNewItem = data => {
  let ListProduct_temp = _.clone(data);
  return (dispatch, getState) => {
    let {
      objData,
      listProductSelected,
      CodeBaoGiaTemp
    } = getState().cd_turn_inout;
    listProductSelected.map(x => (x.TicketCode = objData.TicketCode));
    // trường hợp xuất hàng hồi thì update loại tồn kho
    if (objData.Trans_Type == "TURN_TRANS_TYPE_01") {
      listProductSelected.map(x => (x.Inv_Type = "1"));
    }
    // trường hợp xuất hàng nấu thì k cần WeightCustom
    if (objData.Trans_Type == "TURN_TRANS_TYPE_04") {
      listProductSelected.map(x => (x.WeightCustom = ""));
    }
    // trường hợp khác loại tái xuất không update weight custom
    if (objData.Trans_Type != "TURN_TRANS_TYPE_03") {
      // listProductSelected.map(x => x.WeightCustom = '')
    } else {
      listProductSelected.map(x => (x.ValueLAI = objData.ValueLAI));
      listProductSelected.map(x => (x.CodeLAI = objData.CodeLAI));
    }
    // tính lại ammount
    listProductSelected = listProductSelected.map(item => {
      item.amount = Helper.roundNumberPerThousand(
        item.price * parseInt(item.Qty)
      );
      item.org_amount = Helper.roundNumberPerThousand(
        item.price * parseInt(item.Qty)
      );
      item.org_price = Helper.roundNumberPerThousand(item.price);
      return item;
    });

    let objDataTemp = _.clone(objData, true);
    let type = Helper.getParam(window.location.href, "type");
    if (type == 1) {
      objDataTemp["CodeBaoGia"] = CodeBaoGiaTemp;
    } else {
      objDataTemp["CodeBaoGia"] = "";
    }

    listProductSelected = listProductSelected.map(item => {
      if (objDataTemp.Trans_Type !== "TURN_TRANS_TYPE_04") {
        item.CodeLV = objData.codeLV;
        item.CodeLH = objData.codeLH;
        item.CodeMX = objData.codeMX;
        item.CodeLAI = objData.codeLAI;
        item.ValueLAI = objData.ValueLAI;
        item.ValueLH = objData.ValueLH;
        item.valueLV = objData.ValueLV;
        item.ValueMX = objData.ValueMX;
        if (!item.Genkey) {
          item.Genkey =
            item.IdProduct +
            item.IdProductParent +
            item.Color +
            item.CodeLV +
            item.CodeLH +
            item.CodeLAI;
        }
      }
      return item;
    });
    return new Promise(
      (resolve, reject) => {
        axios
          .post(`${Config.API_URL_USER}cd_turn_inout/add`, {
            objData: objDataTemp,
            listProductSelected: updateOrderByOrg(listProductSelected)
          })
          .then(response => {
            resolve(response);
          });
      },
      err => {
        reject(err);
      }
    );
  };
};

export const findProducts = (loadAll = false) => {
  return (dispatch, getState) => {
    let { objSearch, objData, CodeBaoGiaTemp } = getState().cd_turn_inout;
    let { page, total, endPage } = getState().common;
    let objSearchTemp = _.clone(objSearch, true);
    // reset lại sản phẩm tìm kiếm nếu chọn null phiếu trẩ hàng
    if (objSearchTemp.TicketCode && !objData.IdRef) {
      objSearchTemp.TicketCode = objData.IdRef;
      dispatch({
        type: GET_LIST_PRODUCTS_SEARCH,
        payload: {
          list_products_search: [],
          listProductSelected: [],
          objSearch: objSearchTemp,
          isRenderSearch: false
        }
      });
    } else {
      dispatch({
        type: LOADING_PRODUCTS,
        payload: {
          isLoadingTableProducts: true
        }
      });
      objSearchTemp.page = page;
      objSearchTemp.total = total;
      objSearchTemp.TicketCode = objData.IdRef;
      objSearchTemp["CodeBaoGia"] = CodeBaoGiaTemp;

      return new Promise(
        (resolve, reject) => {
          if (objSearchTemp.IdOutput) {
            objSearchTemp["total"] = 1000;
            dispatch(updateTotalInPage(1000));
          } else {
            objSearchTemp["total"] = 10;
            dispatch(updateTotalInPage(10));
          }
          axios
            .post(
              `${Config.API_URL_USER}cd_turn_inout/find_list_products`,
              objSearchTemp
            )
            .then(response => {
              let { data } = response.data;
              let data_temp = data;
              let totalRows =
                data_temp && data_temp[0] && data_temp[0].totalRows;
              if (data_temp.length == 0) {
                alert(`Không tìm thấy sản phẩm này!`);
              }
              // nếu là hàng hồi thì sẽ xét mặc định LAI = 0, giá,tiền  = 0
              if (objData.Trans_Type == "TURN_TRANS_TYPE_01") {
                data_temp.map(x => (x.ValueLAI = "0"));
                data_temp.map(x => (x.CodeLAI = "0"));
                data_temp.map(x => (x.amount = "0"));
                data_temp.map(x => (x.amountgroup = "0"));
                data_temp.map(x => (x.org_amount = "0"));
                data_temp.map(x => (x.org_price = "0"));
                data_temp.map(x => (x.price = "0"));
              }
              if (objData.Trans_Type == "TURN_TRANS_TYPE_03") {
                data_temp = data_temp.filter(x => x.Inv_Type == 0);
              }
              data_temp.map(x => (x.checked = false));
              if (loadAll) {
                data_temp.map((item, i) => {
                  item.isManual = false;
                  item.OrderIndex = item.IdGroup;
                  item.OrderIndexCell = i;
                  return item;
                });
                dispatch({
                  type: GET_LIST_PRODUCTS_SEARCH,
                  payload: {
                    listProductSelected: data_temp,
                    isRenderSearch: true,
                    objSearch: objSearchTemp
                  }
                });
              } else {
                dispatch({
                  type: GET_LIST_PRODUCTS_SEARCH,
                  payload: {
                    list_products_search: data_temp,
                    isLoadingTableProducts: false,
                    objSearch: objSearchTemp
                  }
                });
              }
              dispatch(updateInfoPage(totalRows));
              resolve(response);
            });
        },
        err => {
          reject(err);
        }
      );
    }
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
export const getListProductsByPrice = (value = "") => {
  return (dispatch, getState) => {
    let { default_product } = getState().cd_turn_inout;
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.API_URL_USER}order/products`, {
          params: { page: 0, total: 100000, PriceCode: value }
        })
        .then(
          response => {
            let { data } = response;
            let list_data = [],
              data_temp_convert = [];
            data.map(item => {
              let data_temp = _.clone(default_product, true);
              data_temp["IdProduct"] = item.Id;
              data_temp["IdProductParent"] = item.Id;
              data_temp["price"] = item.Price;
              data_temp["price_basic"] = item.Price;
              data_temp["url_image"] = item.Image;
              data_temp["WeightCustom"] = item.Weight;
              data_temp["IdOdd"] = item.IdOdd;
              data_temp["Weight"] = item.Weight;
              data_temp_convert.push(data_temp);
            });
            dispatch({
              type: GET_LIST_PRODUCTS_BY_PRICE_CD_TURN,
              payload: {
                list_products_by_baogia: data_temp_convert || []
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
export const addProductSet = data => {
  return (dispatch, getState) => {
    let { listProductSelected, default_product } = getState().cd_turn_inout;
    let listProductsSelected_temp = _.clone(listProductSelected, true);
    let genKey = Helper.generateUUIDV4();
    data.map((itemProduct, i) => {
      let productTemp = _.clone(default_product, true);
      productTemp.OrderIndexCell =
        genKey + "_" + listProductSelected.length + i;
      productTemp.OrderIndex = genKey;
      productTemp.isManual = true;
      productTemp.isNew = false;
      productTemp.IdProduct = itemProduct.IdProduct;
      productTemp.IdProductParent = itemProduct.IdProductParent;
      productTemp.url_image = itemProduct.url_image;
      productTemp.WeightCustom = itemProduct.WeightCustom;
      listProductsSelected_temp.push(productTemp);
    });
    listProductsSelected_temp = listProductsSelected_temp.filter(
      x => x.isNew == false
    );
    dispatch({
      type: ADD_PRODUCTS_NEW,
      payload: {
        listProductSelected: listProductsSelected_temp
      }
    });
  };
};
export const updateExistProduct = itemProduct => {
  return (dispatch, getState) => {
    let { listProductSelected, objData } = getState().cd_turn_inout;
    let listProductsSelected_temp = _.clone(listProductSelected, true);
    let dataNew = [];
    listProductsSelected_temp.map((item, i) => {
      let item_temp = _.clone(item, true);
      if (item.IdProduct == itemProduct.IdProduct && item.Color == "001") {
        itemProduct.index = item_temp.OrderIndexCell;
        itemProduct.OrderIndexCell = item_temp.OrderIndexCell;
        itemProduct.OrderIndex = item_temp.OrderIndexCell;
        itemProduct.isManual = item_temp.isManual;
        itemProduct.Color = "001";
        item_temp = itemProduct;
      }
      dataNew.push(item_temp);
    });
    dispatch({
      type: ADD_PRODUCTS_NEW,
      payload: {
        listProductSelected: dataNew
      }
    });
  };
};

export const updateInputItem = obj => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      dispatch({
        type: UPDATE_CELL_INPUT,
        payload: {
          objData: obj
        }
      });
      resolve(UPDATE_CELL_INPUT);
    });
  };
};
export const updateInputItemSearch = obj => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_CELL_INPUT_SEARCH,
      payload: {
        objSearch: obj
      }
    });
  };
};
export const initAdd = () => {
  return (dispatch, getState) => {
    dispatch(getNumberAuto());
  };
};
export const updateTurnType = type => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_TYPE_TURN,
      payload: {
        typeTurn: type == 0 ? false : true
      }
    });
  };
};

export const updateCellTurnInout = obj => {
  return (dispatch, getState) => {
    let { listProductSelected, objConfig } = getState().cd_turn_inout;
    let { list_data_all } = getState().list;
    let list_data_allTemp = _.clone(list_data_all, true);
    let temp = _.clone(listProductSelected, true);
    temp.map((item, i) => {
      let { Qty } = item;
      if (
        ["Weight", "WeightProduct", "REMARK", "WeightCustom"].indexOf(
          obj.key
        ) != -1
      ) {
        if (item.OrderIndexCell == obj.id) {
          if (obj.key == "Weight") {
            item["WeightAvg"] = parseFloat(obj.value) / parseInt(Qty);
          }
          if (obj.key == "WeightProduct") {
            item["WeightAvgProduct"] = parseFloat(obj.value) / parseInt(Qty);
          }
          item[obj.key] = obj.value;
        }
      } else {
        if (obj.key == "IdProductParent") {
          if (item.OrderIndex == obj.id) {
            item["IdProduct"] = obj.value;
            item["IdProductParent"] = obj.value;
          }
        } else {
          if (item.OrderIndex == obj.id) {
            item[obj.key] = obj.value;
          }
        }
      }
      return item;
    });
    dispatch({
      type: UPDATE_CELL_INPUT,
      payload: {
        listProductSelected: temp
      }
    });
  };
};
export const updateExistBag = data => {
  return (dispatch, getState) => {
    let { listProductSelected, list_products } = getState().cd_turn_inout;
    let listProductSelected_temp = _.clone(listProductSelected, true);
    let listProductSelectedConvert = [];
    listProductSelected_temp.map((item, i) => {
      let item_temp = _.clone(item, true);
      let itemBag = _.clone(data, true);
      itemBag.isExists = true;
      if (
        item_temp.IdBag.toUpperCase() == itemBag.Id.toUpperCase() &&
        item_temp.isNew
      ) {
        itemBag.isNew = false;
        itemBag.OrderIndex = item_temp.OrderIndex;
        itemBag.CodeProcess = item_temp.CodeProcess;
        itemBag.TicketCode = item_temp.TicketCode;
        itemBag.orderby = item_temp.orderby;
        itemBag.created_by = item_temp.created_by;
        listProductSelectedConvert.push(itemBag);
      } else {
        listProductSelectedConvert.push(item_temp);
      }
    });
    dispatch({
      type: UPDATE_EXISTS_BAG,
      payload: {
        listProductSelected: listProductSelectedConvert
      }
    });
  };
};

export const addItemBagNew = () => {
  return (dispatch, getState) => {
    let { listProductSelected, default_product } = getState().cd_turn_inout;
    let default_product_temp = _.clone(default_product, true);
    let listProductSelected_temp = _.clone(listProductSelected, true);
    default_product_temp.orderby = listProductSelected_temp.length;
    default_product_temp.OrderIndex = listProductSelected_temp.length;
    listProductSelected_temp.push(default_product_temp);
    dispatch({
      type: ADD_ITEM_BAG,
      payload: {
        listProductSelected: listProductSelected_temp
      }
    });
  };
};

export const removeItemBag = obj => {
  return (dispatch, getState) => {
    let { listProductSelected } = getState().cd_turn_inout;
    let listProductSelectedTemp = _.clone(listProductSelected, true);
    listProductSelectedTemp = listProductSelectedTemp.filter(
      x => x.orderby != obj.orderby
    );
    dispatch({
      type: GET_LIST_TICKET_DETAIL,
      payload: {
        listProductSelected: listProductSelectedTemp
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
export const clickCheckRowTurnInout = (value, checked) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let { list_data, objSearch } = getState().cd_turn_inout;
      var list_temp = _.clone(list_data, true);
      list_temp.map((item, i) => {
        // item.checked = false
        if (item.TicketCode == value.TicketCode) {
          item.checked = checked;
        }
        return item;
      });
      let objData = _.clone(value, true);
      objData.DayMake = moment(objData.DayMake || new Date());
      objSearch["CodeBaoGia"] = value.CodeBaoGia || "";
      dispatch({
        type: CLICK_ROW_DATA_TURN_INOUT,
        payload: {
          list_data: list_temp,
          itemDetail: objData,
          objData: objData,
          objSearch: objSearch
        }
      });
      dispatch(getListCustomerConfig(objData.IdCustomer));
      resolve(CLICK_ROW_DATA_TURN_INOUT);
    });
  };
};
export const getListDataCdTurn = (
  value = "",
  sortKey = "",
  sortBy = "",
  keyFilter = "",
  valueFilter = ""
) => {
  return (dispatch, getState) => {
    let { page, total, endPage } = getState().common;
    let pageParams = {
      page: page,
      total: total
    };
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.API_URL_USER}cd_turn_inout`, {
          params: {
            page: page,
            total: total,
            key: value,
            SortKey: sortKey,
            SortBy: sortBy,
            ColFilter: keyFilter,
            ColValue: valueFilter
          }
        })
        .then(
          response => {
            let { data } = response.data;
            let type = Helper.getParam(window.location.href, "type");
            let data_temp = data;
            data_temp.map(item => (item.checked = false));
            if (type == 0) {
              // lấy danh sách phiếu xuất trả, hàng hồi
              data_temp = data_temp.filter(x => x.Turn_Type == "TURN_TYPE_01");
            } else {
              // lấy danh sách phiếu tái xuất, nấu
              data_temp = data_temp.filter(x => x.Turn_Type == "TURN_TYPE_02");
            }
            let totalRows = data_temp && data_temp[0] && data_temp[0].totalRows;
            dispatch({
              type: GET_LIST_DATA_TURN_INOUT,
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
export const getListBagInCastingProc = (value = "") => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios.get(`${Config.API_URL_USER}cd_turn_inout/get_all_bag`).then(
        response => {
          let { data } = response.data;
          let data_temp = data;
          dispatch({
            type: GET_ALL_BAG_IN_CASTING_PROC,
            payload: {
              list_bag_default: data_temp || []
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
    let { objData } = getState().cd_turn_inout;
    return new Promise((resolve, reject) => {
      axios
        .get(`${Config.API_URL_USER}cd_turn_inout/get_ticket_detail`, {
          params: { TicketCode: objData.TicketCode }
        })
        .then(
          response => {
            let { data } = response.data;
            let data_temp = data;
            dispatch({
              type: GET_LIST_TICKET_DETAIL,
              payload: {
                listProductSelected: data
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
