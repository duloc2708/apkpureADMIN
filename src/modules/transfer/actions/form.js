import {
  GET_LIST_OUTPUT_BY_CUSTOMER,
  GET_LIST_DATA_TURN_INOUT,
  CLICK_ROW_DATA,
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
  GET_LIST_CUSTOMER_CONFIG,
  GET_LIST_IDSTORES,
  GET_LIST_DATA_TRANSFER,
  GET_LIST_GOLD_TRANSFER,
  UPDATE_CELL_INPUT_SEARCH,
  GET_LIST_DATA_GOLD_COOK
} from "../types";
import {
  updateInfoPage,
  resetInfoPage,
  updateTotalInPage
} from "modules/common/actions/form";
const type = Helper.getParam(window.location.href, "type");
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
    let { objSearch, objData } = getState().transfer;
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
export const accept = keyMap => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${Config.API_URL_USER}transfer/accept`, { keyMap: keyMap })
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
export const finish = keyMap => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${Config.API_URL_USER}transfer/finish`, { keyMap: keyMap })
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
    let { listProductSelected } = getState().transfer;
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
    let { listProductSelected, objData } = getState().transfer;
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
    let { listCdTurnInDefault, objData, objSearch } = getState().transfer;
    let objData_temp = _.clone(objData, true);
    let objSearch_temp = _.clone(objSearch, true);
    let { list_data_all } = getState().list;
    let list_data_allTemp = _.clone(list_data_all, true);
    let { value: valueCode, name } = value || {};

    dispatch(getListCustomerConfig(valueCode)).then(res => {
      let { listCustomerConfig } = getState().transfer;
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
    } = getState().transfer;
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
    let { objSearch, objData } = getState().transfer;
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
    let { objSearch } = getState().transfer;
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
    let { objData } = getState().transfer;
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
    } = getState().transfer;
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
    let { listProductSelected } = getState().transfer;
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



export const findProducts = (loadAll = false) => {
  return (dispatch, getState) => {
    let { objSearch, objData, CodeBaoGiaTemp } = getState().transfer;
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
    let { default_product } = getState().transfer;
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
    let { listProductSelected, default_product } = getState().transfer;
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
    let { listProductSelected, objData } = getState().transfer;
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
export const calGoldWarmDetail = (objData) => {
  return (dispatch, getState) => {
    let { list_data_gold } = getState().transfer;
    let temp = _.clone(list_data_gold, true);
    temp=temp.map((item, i) => {
      if (item.TF_Weight_From) {
        item.TF_Weight_To = objData.TypeGoldWarm && (item.TF_Weight_From * item.ValueLV_From / objData.TypeGoldWarm) || '';
      }
      return item;
    });

    dispatch({
      type: UPDATE_CELL_INPUT,
      payload: {
        list_data_gold: temp
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
    let { listProductSelected, objConfig } = getState().transfer;
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
    let { listProductSelected, list_products } = getState().transfer;
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
    let { listProductSelected, default_product } = getState().transfer;
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
    let { listProductSelected } = getState().transfer;
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
    let { objData } = getState().transfer;
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


export const getListDataTransfer = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios.get(`${Config.API_URL_USER}transfer/get_list_data`).then(
        response => {
          let { data } = response.data;
          dispatch({
            type: GET_LIST_DATA_TRANSFER,
            payload: {
              list_data: data || []
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

export const getListGoldDetail = (keyMap = '') => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios.get(`${Config.API_URL_USER}transfer/get_list_gold_detail`, { params: { keyMap } }).then(
        response => {
          let { data } = response.data;
          dispatch({
            type: GET_LIST_GOLD_TRANSFER,
            payload: {
              list_data_gold: data || []
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

export const getListIdStores = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios.get(`${Config.API_URL_USER}transfer/get_stores`).then(
        response => {
          let { data } = response.data;
          dispatch({
            type: GET_LIST_IDSTORES,
            payload: {
              list_data_idstores: data || []
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

export const getListBalanceByIdStore = (IdStore) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios.get(`${Config.API_URL_USER}transfer/get_tf_balance_by_idstore`, { params: { IdStore } }).then(
        response => {
          let { data } = response.data;
          dispatch({
            type: GET_LIST_IDSTORES,
            payload: {
              list_data_gold: data || []
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

export const updateInputSearch = obj => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_CELL_INPUT_SEARCH,
      payload: {
        objSearchGold: obj
      }
    });
  };
};

export const updateCellInput = obj => {
  return (dispatch, getState) => {
    let { list_data_gold, objConfig, objData } = getState().transfer;
    let temp = _.clone(list_data_gold, true);
    temp.map((item, i) => {
      if (i == obj.id) {
        item[obj.key] = obj.value;
        if (item.TF_Weight_From) {
          item.TF_Weight_To = objData.TypeGoldWarm && (item.TF_Weight_From * item.ValueLV_From / objData.TypeGoldWarm) || '';
        }
      }
      return item;
    });
    dispatch({
      type: UPDATE_CELL_INPUT,
      payload: {
        list_data_gold: temp
      }
    });
  };
};

export const getNumberAuto = () => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios.get(`${Config.API_URL_USER}transfer/generate_number_transfer`).then(
        response => {
          let { data } = response.data;
          let {
            objData
          } = getState().transfer;
          const objData_temp = _.clone(objData, true);
          let numberGen = (data && data[0].value) || "0000000";
          objData_temp["keyMap"] = numberGen;
          dispatch({
            type: GENERATE_NUMBER,
            payload: {
              objData: objData_temp
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

const mappingListDataGold = (list_gold, objData) => {
  let list_gold_temp = _.clone(list_gold, true);
  let objData_temp = _.clone(objData, true);
  let sumTF_Weight_To = 0;
  list_gold_temp = list_gold_temp.map(item => {
    item.totalGoldCook=''
    item.totalGoldCook10=''
    item.IdStore_From=''
    item.IdStore_To=''
    item.Gold_Lost=''
    item.keyMap = objData.keyMap
    item.TF_Weight_To = parseFloat(list_gold_temp.TF_Weight_To || 0)
    // truong hop chuyen kho thi LoaiVang, TL vang TO=FROM
    if (objData.TransType == 'TF_TYPE_01') {
      item.ValueLV_To = item.ValueLV_From
      item.TF_Weight_To = item.TF_Weight_From
    }
    // truong hop nau
    if (objData.TransType == 'TF_TYPE_02') {
      if (item.TF_Weight_From && objData.TypeGoldWarm) {
        item.TF_Weight_To = item.TF_Weight_From * item.ValueLV_From / objData.TypeGoldWarm;
      }
      item.ValueLV_To = objData.TypeGoldWarm;

      sumTF_Weight_To += parseFloat(item.TF_Weight_To || 0)
    }
    return item;
  })
  list_gold_temp = list_gold_temp.filter(x => parseFloat(x.TF_Weight_To || 0) > 0);

  if (objData.TransType == 'TF_TYPE_02') {
    objData_temp = {
      ...objData_temp,
      Gold_Lost_T: (sumTF_Weight_To - (objData.TotalWeightAfterWarm || 0))
    }
  }
  objData_temp = {
    ...objData_temp,
    TotalWeightLH:'',
    Gold_Lost_T: Helper.round(objData_temp.Gold_Lost_T,4)
  }

  return {
    list_data_gold: list_gold_temp,
    objData: objData_temp
  };
}
const mappingListDataGoldCook = (listGoldCook, objData) => {

  let objData_temp = _.clone(objData, true);
  objData_temp.IdStore_From = 'SAJIHH';
  objData_temp.IdStore_To = 'SAJITG';
  objData_temp.TotalWeightBeforeCook = Helper.round(objData_temp.TotalWeightBeforeCook, 4);
  objData_temp = {
    ...objData_temp,
    Gold_Lost_T: Helper.round(objData_temp.TotalWeightBeforeCook - objData.TotalWeightAfterWarm || 0, 4)
  };
  let list_gold_temp = _.clone(listGoldCook, true);
  list_gold_temp = list_gold_temp.filter(x => parseFloat(x.TF_Weight_From || 0) > 0);

  // list_gold_temp=list_gold_temp.filter(x=>x.checked);
  list_gold_temp = list_gold_temp.map(item => {
    item.keyMap = objData.keyMap;
    item.IdStore_From = item.IdStore_From || item.IdStore;
    item.IdStore_To = 'SAJITG';
    item.ValueLV_From =  item.ValueLV_From || item.ValueLV;
    item.ValueLV_To = objData_temp.TypeGoldWarm;
    item.totalGoldCook = Helper.round(item.totalGoldCook, 4);
    item.totalGoldCook10 = Helper.round(item.totalGoldCook10, 4);
    item.TF_Weight_Hold = Helper.round(item.TF_Weight_Hold, 4);
    // item.TF_Weight_To = Helper.round((item.TF_Weight -item.TF_Weight_Hold)/objData_temp.TotalWeightBeforeCook*objData_temp.TotalWeightAfterWarm,4);
    item.IsDeleted=-1;
    item.Gold_Lost=item.Gold_Lost||null;
    item.WeightAfterWarm=Helper.round(item.ValueLV*objData_temp.TotalWeightAfterWarm/item.totalGoldCook,4)
    return item;
  })
  return {
    list_data_gold: list_gold_temp,
    objData: objData_temp
  };
}

export const addNewItem = data => {
  return (dispatch, getState) => {
    let {
      objData,
      list_data_gold,
      listGoldCook
    } = getState().transfer;
    return new Promise(
      (resolve, reject) => {
        axios
          .post(`${Config.API_URL_USER}transfer/add`, {
            objData: type == 0 ? mappingListDataGold(list_data_gold, objData).objData : mappingListDataGoldCook(list_data_gold, objData).objData,
            list_data_gold: type == 0 ? mappingListDataGold(list_data_gold, objData).list_data_gold : mappingListDataGoldCook(list_data_gold, objData).list_data_gold
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
export const updateItem = data => {
  let ListProduct_temp = _.clone(data);
  return (dispatch, getState) => {
    let {
      objData,
      list_data_gold,
      listGoldCook
    } = getState().transfer;
    return new Promise(
      (resolve, reject) => {
        axios
          .post(`${Config.API_URL_USER}transfer/update`, {
            objData: type == 0 ? mappingListDataGold(list_data_gold, objData).objData : mappingListDataGoldCook(list_data_gold, objData).objData,
            list_data_gold: type == 0 ? mappingListDataGold(list_data_gold, objData).list_data_gold : mappingListDataGoldCook(list_data_gold, objData).list_data_gold
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
export const clickCheckRowData = (value, checked) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let { list_data, objSearch } = getState().transfer;
      let objData = _.clone(value, true);

      if (value) {
        objData.DayMake = moment(objData.DayMake || new Date());
        dispatch({
          type: CLICK_ROW_DATA,
          payload: {
            objData: objData
          }
        });
      } else {
        dispatch({
          type: CLICK_ROW_DATA,
          payload: {
            objData: { ...objData, keyMap: '' }
          }
        });
      }

      resolve(CLICK_ROW_DATA);
    });
  };
};
export const validateTransfer = obj => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios.post(`${Config.API_URL_USER}transfer/validate_transfer`, obj).then(
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
export const printDetail = (itemDetail) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${Config.API_URL_USER}transfer/print_detail`,
          { keyMap: itemDetail.keyMap, Info: itemDetail },
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
export const getListGoldCook = obj => {
  return (dispatch, getState) => {
    const { objData } = getState().transfer;
    return new Promise((resolve, reject) => {
      axios.get(`${Config.API_URL_USER}transfer/get_gold_cook?keyMap=${objData.keyMap || ''}`).then(
        response => {
          let { data } = response.data;
          let TotalWeightBeforeCook = data.reduce((acc, item) => {
            return acc + item.totalGoldCook10 || 0
          }, 0);
          const { status } = getState().toolbar;
          if(status=='EDIT'){
            data=data.map(item=>{
              item.checked=true
              return item;
            })
          }
          dispatch({
            type: GET_LIST_DATA_GOLD_COOK,
            payload: {
              listGoldCook: data,
              objData: {
                ...objData,
                TotalWeightBeforeCook
              }
            }
          })
          resolve(response);
        },
        err => {
          reject(err);
        }
      );
    });
  };
};

export const changeStatusInput = (IdStore,checked) => {
  return (dispatch, getState) => {
    const {listGoldCook} =getState().transfer;

    let listGoldCookTemp=_.clone(listGoldCook,true);
    listGoldCookTemp=listGoldCookTemp.map(item=>{
      if(item.IdStore==IdStore){
        item.checked=!checked
      }
      return item;
    });

    dispatch({
      type: GET_LIST_GOLD_TRANSFER,
      payload: {
        listGoldCook: listGoldCookTemp
      }
    });
  };
};
