import {
    GET_LIST_GOLD_TRANS,
    CLICK_ROW_DATA_GOLD_TRANS,
    IS_EDIT_CASTING,
    GET_ALL_BAG_IN_CASTING_PROC,
    UPDATE_CELL_INPUT_BY_BAG,
    INIT_ADD_CASTING_PROC,
    GET_LIST_WORKER,
    GENERATE_NUMBER_GOLD_TRANS,
    CLEAR_DATA_CASTING_PROC,
    UPDATE_EXISTS_BAG,
    SHOW_FORM_STONE, GET_LIST_WAXSET_BY_BAG,
    GET_CONFIG_PROCESS_TICKET,
    GET_LIST_HEADER_TABLE,
    ADD_ITEM_GOLD_WEIGHT,
    GET_LIST_TICKET_DETAIL,
    UPDATE_BROKEN_QTY_STONE,
    UPDATE_TYPE_IN_OUT,
    UPDATE_BAG_DETAIL,
    GET_LIST_CUSTOMER_GOLD_TRANS,
    SELECT_CUSTOMER_GOLD,
    GET_LIST_OUTPUT_BY_CUSTOMER,
    GET_LIST_OUTPUT_GOLD,
    GET_LIST_USER_CD_TRANS,
    SELECT_SALE_MAN,
    SORT_DATA_LIST_GOLD,
    ADD_NEW_ITEM
} from '../types'
import { updateInfoPage, resetInfoPage } from 'modules/common/actions/form'

export const getListOutputByCustomer = () => {
    return (dispatch, getState) => {
        let { objData } = getState().cd_gold_trans
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}cash_trans/get_list_output_by_customer`,
                { params: { IdCustomer: objData.IdCustomer } })
                .then((response) => {
                    let { data } = response.data
                    dispatch({
                        type: GET_LIST_OUTPUT_BY_CUSTOMER,
                        payload: {
                            listOutputByCustomer: data
                        }
                    })
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getRemainingDebt = () => {
    return (dispatch, getState) => {
        let { objData } = getState().cd_gold_trans
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}gold_trans/get_remmainig_debt`, { params: { IdCustomer: objData.IdCustomer } })
                .then((response) => {
                    let { data } = response.data
                    let objDataTemp = _.clone(objData, true)
                    objDataTemp["Remaining_Debt"] = data[0] && data[0].Open_Balance || 0
                    dispatch({
                        type: UPDATE_CELL_INPUT_BY_BAG,
                        payload: {
                            objData: objDataTemp
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListOutput = (params) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}output`, { params: { page: 1, total: 50000 } })
                .then((response) => {
                    let { data } = response.data
                    dispatch({
                        type: GET_LIST_OUTPUT_GOLD,
                        payload: {
                            listOutputDefault: data || []
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const onChangeFilterListGold = (obj) => {
    return (dispatch, getState) => {
        dispatch(getListDataGoldTrans('', '', '', obj.id, obj.value))
    }
}
export const sortDataListGold = (obj) => {
    return (dispatch, getState) => {
        let { listHeaderTableCustom } = getState().cd_gold_trans
        let temp = _.clone(listHeaderTableCustom, true)
        temp = temp.map(item => {
            if (obj.key == item.key) {
                let sortBy = ''
                if (item.sortBy == 'up') {
                    item.sortBy = 'down'
                    sortBy = 'DESC'
                } else {
                    item.sortBy = 'up'
                    sortBy = 'ASC'
                }
                dispatch(getListDataGoldTrans('', item.key, sortBy))
            } else {
                item.sortBy = ''
            }
            return item;
        })
        dispatch({
            type: SORT_DATA_LIST_GOLD,
            payload: {
                listHeaderTableCustom: temp
            }
        })
    }
}
export const selectOutputGold = (value) => {
    return (dispatch, getState) => {
        let { objData } = getState().cd_gold_trans
        let { status } = getState().toolbar
        let objData_temp = _.clone(objData, true)
        let { value: IdOutput, IdOrder } = value || {}
        objData_temp["IdOutput"] = IdOutput
        objData_temp["IdRef"] = IdOrder
        dispatch({
            type: SELECT_CUSTOMER_GOLD,
            payload: {
                objData: objData_temp
            }
        })
    }
}

export const selectSaleman = (value) => {
    return (dispatch, getState) => {
        let { objData } = getState().cd_gold_trans
        let { status } = getState().toolbar
        let objData_temp = _.clone(objData, true)
        let { value: valueData, name } = value || {}
        objData_temp["SaleMan"] = valueData
        objData_temp["SaleManName"] = name
        dispatch({
            type: SELECT_SALE_MAN,
            payload: {
                objData: objData_temp
            }
        })
    }
}
export const selectCustomerCash = (value) => {
    return (dispatch, getState) => {
        let { objData } = getState().cd_gold_trans
        let { status } = getState().toolbar
        let objData_temp = _.clone(objData, true)
        let { value: valueCode, name, Discount, SaleMan, SaleManName, Is_Beneficiary } = value || {}
        objData_temp["IdCustomer"] = valueCode
        objData_temp["nameCustomer"] = name
        objData_temp["SaleMan"] = SaleMan
        objData_temp["SaleManName"] = SaleManName
        objData_temp["Beneficiary"] = Is_Beneficiary == 1 ? valueCode : ''
        dispatch({
            type: SELECT_CUSTOMER_GOLD,
            payload: {
                objData: objData_temp
            }
        })
        dispatch(getListOutputByCustomer())
    }
}
export const copyDataWeight = (obj) => {
    return (dispatch, getState) => {
        let { listGoldSelected, default_item } = getState().cd_gold_trans
        let objClone = _.clone(obj, true)
        let objTemp = _.clone(default_item, true)
        let listGoldSelectedNew = _.clone(listGoldSelected, true)
        // objTemp["PaymentWeight"] = objClone.PaymentWeight
        // objTemp["PaymentWeight_Real"] = objClone.PaymentWeight
        // listGoldSelectedNew.splice(objClone.orderby + 1, 0, objTemp)
        // cập nhật lại index
        listGoldSelectedNew = listGoldSelectedNew.map((item, i) => {
            if (item.orderby == obj.orderby) {
                item.PaymentWeight_Real = item.PaymentWeight
                item.PaymentWeight_RealGram = item.PaymentWeightGram

            }
            item.orderby = i
            return item
        })
        listGoldSelectedNew = _.orderBy(listGoldSelectedNew, 'orderby', 'asc')
        dispatch({
            type: ADD_ITEM_GOLD_WEIGHT,
            payload: {
                listGoldSelected: listGoldSelectedNew
            }
        })
    }
}
export const copyDataGold = (obj) => {
    return (dispatch, getState) => {
        let { listGoldSelected, default_item } = getState().cd_gold_trans
        let objClone = _.clone(obj, true)
        let objTemp = _.clone(default_item, true)
        let listGoldSelectedNew = _.clone(listGoldSelected, true)
        objTemp["ValueLV_Draft"] = objClone.ValueLV_Draft
        objTemp["ValueLV_Confirm"] = objClone.ValueLV_Confirm
        objTemp["ValueLV_Real"] = objClone.ValueLV_Real
        // đẩy item vào dưới vị trí item hiện tại
        // listGoldSelectedNew.splice(objClone.orderby + 1, 0, objTemp)
        // cập nhật lại index
        listGoldSelectedNew = listGoldSelectedNew.map((item, i) => {
            if (item.orderby == obj.orderby) {
                item.ValueLV_Confirm = item.ValueLV_Draft
                item.ValueLV_Real = item.ValueLV_Draft
            }
            item.orderby = i
            return item
        })
        listGoldSelectedNew = _.orderBy(listGoldSelectedNew, 'orderby', 'asc')
        dispatch({
            type: ADD_ITEM_GOLD_WEIGHT,
            payload: {
                listGoldSelected: listGoldSelectedNew
            }
        })
    }
}
export const updateListOutput = (value) => {
    return (dispatch, getState) => {
        let { listOutputDefault, objData } = getState().cd_gold_trans
        let listOutputDefaultTemp = _.clone(listOutputDefault, true)
        let objDataTemp = _.clone(objData, true)
        listOutputDefaultTemp = listOutputDefaultTemp.filter(x => x.IdCustomer == value)
        objDataTemp['IdOutput'] = ''
        objDataTemp["IdRef"] = ''
        dispatch({
            type: GET_LIST_OUTPUT_GOLD,
            payload: {
                listOutput: listOutputDefaultTemp,
                objData: objDataTemp
            }
        })
    }
}
export const printDetail = (item) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}gold_trans/print_detail`,
                { Info: item, type: 1 },
                {
                    responseType: 'arraybuffer',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/xlsx'
                    }
                })
                .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), "excel.xlsx");
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `Phiếu thu_${item.CodeTicket}.xlsx`); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListDataUser = (params = { page: 1, total: 5000 }) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}customer/get_list_user`, { params: { page: params.page, total: params.total } })
                .then((response) => {
                    let { data } = response.data
                    dispatch({
                        type: GET_LIST_USER_CD_TRANS,
                        payload: {
                            list_user: data || []
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListCustomer = (params) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}customer`, { params: { page: 1, total: 50000 } })
                .then((response) => {
                    let { data } = response
                    dispatch({
                        type: GET_LIST_CUSTOMER_GOLD_TRANS,
                        payload: {
                            listCustomer: data || []
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const acceptStatus = (id) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}gold_trans/accept_status`, { params: { IdTicket: id } })
                .then((response) => {
                    let { data } = response.data
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const completeTicket = (id) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}gold_trans/complete_ticket`, { params: { IdTicket: id } })
                .then((response) => {
                    let { data } = response.data
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const saveWeightStone = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let { listStoneWaxset } = getState().cd_gold_trans
            axios.post(`${Config.API_URL_USER}gold_trans/insert_list_stone_waxset`,
                { listStoneWaxset: listStoneWaxset })
                .then((response) => {
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListStoneWaxsetByIdBag = (obj) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let { listStoneWaxset } = getState().cd_gold_trans
            let listStoneWaxsetTemp = _.clone(listStoneWaxset, true)
            console.log('listStoneWaxsetTemp', listStoneWaxsetTemp);

            axios.get(`${Config.API_URL_USER}gold_trans/get_list_stone_waxset_bag`,
                {
                    params: { IdBag: obj.IdBag }
                })
                .then((response) => {
                    let { data } = response.data
                    console.log('');

                    data.map(item => {
                        let itemExists = listStoneWaxsetTemp.filter(x => x.IdPrimaryStone == item.IdPrimaryStone)
                        if (itemExists.length == 0) {
                            console.log('item', item);

                            listStoneWaxsetTemp.push(item)
                        }
                    })
                    dispatch({
                        type: GET_LIST_WAXSET_BY_BAG,
                        payload: {
                            listStoneWaxset: listStoneWaxsetTemp
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}

export const showFormStone = (value) => {
    return (dispatch, getState) => {
        dispatch({
            type: SHOW_FORM_STONE,
            payload: {
                isShowStone: value,
                objBagDetail: {}
            }
        })
    }
}
export const getConfigProcess = (value) => {
    return (dispatch, getState) => {
        const { list_config_process } = getState().header
        let list_config_processTemp = _.clone(list_config_process, true)
        const type = Helper.getParam(window.location.href, 'type')
        list_config_processTemp = list_config_processTemp.filter(x => x.Code == type)
        dispatch({
            type: GET_CONFIG_PROCESS_TICKET,
            payload: {
                objConfig: list_config_processTemp && list_config_processTemp[0] || {}
            }
        })
    }
}


export const updateTypeInOut = (type) => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_TYPE_IN_OUT,
            payload: {
                typeInOut: type
            }
        })
    }
}
export const resetDataCastingProc = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            dispatch({
                type: CLEAR_DATA_CASTING_PROC,
                payload: null
            })
            resolve(CLEAR_DATA_CASTING_PROC)
        }, (err) => {
            reject(err)
        })
    }
}
export const getNumberAuto = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}gold_trans/get_auto_number`)
                .then((response) => {
                    let { data } = response.data
                    let { objData, listGoldSelected, objConfig, default_item } = getState().cd_gold_trans
                    let objData_temp = _.clone(objData, true)
                    let default_item_temp = _.clone(default_item, true)
                    let listGoldSelectedTemp = _.clone(listGoldSelected, true)
                    let numberGen = (data && data[0].value || '')
                    objData_temp["CodeTicket"] = numberGen
                    default_item_temp["CodeTicket"] = numberGen
                    listGoldSelectedTemp.map(x => x.CodeTicket = numberGen)
                    dispatch({
                        type: GENERATE_NUMBER_GOLD_TRANS,
                        payload: {
                            objData: objData_temp,
                            listGoldSelected: listGoldSelectedTemp,
                            default_item: default_item_temp
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}

export const addNewItem = (data) => {
    let ListProduct_temp = _.clone(data)
    return (dispatch, getState) => {
        dispatch({
            type: ADD_NEW_ITEM,
            payload: {
              isSave: true
            }
          });
        let { objData, listGoldSelected } = getState().cd_gold_trans
        listGoldSelected.map(x => x.CodeTicket = objData.CodeTicket)
        // sum total 
        let TPaymentWeight_T = 0
            , TPaymentWeight_Real_T = 0
            , TPaymentWeight10_T = 0
            , TPaymentWeight10_Real_T = 0
        let listGoldSelectedTemp = _.clone(listGoldSelected, true)
        listGoldSelectedTemp.map(item => {
            let { PaymentWeight
                , PaymentWeight_Real
                , PaymentWeight10
                , PaymentWeight10_Real } = item
            TPaymentWeight_T = TPaymentWeight_T + PaymentWeight
            TPaymentWeight_Real_T = TPaymentWeight_Real_T + PaymentWeight_Real
            TPaymentWeight10_T = TPaymentWeight10_T + PaymentWeight10
            TPaymentWeight10_Real_T = TPaymentWeight10_Real_T + PaymentWeight10_Real
            return item
        })
        objData["PaymentWeight_T"] = TPaymentWeight_T
        objData["PaymentWeight_Real_T"] = TPaymentWeight_Real_T
        objData["PaymentWeight10_T"] = TPaymentWeight10_T
        objData["PaymentWeight10_Real_T"] = TPaymentWeight10_Real_T
        if (!objData["Notes"]) {
            objData["Notes"] = objData["IdCustomer"] + ' trả vàng'
        }
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}gold_trans/add`, {
                objData: objData,
                listGoldSelected: listGoldSelectedTemp
            })
                .then((response) => {
                    dispatch({
                        type: ADD_NEW_ITEM,
                        payload: {
                          isSave: false
                        }
                      });
                    resolve(response)
                })
        }, (err) => {
            reject(err)
        })
    }
}
export const updateItem = (data) => {
    let ListProduct_temp = _.clone(data)
    return (dispatch, getState) => {
        dispatch({
            type: ADD_NEW_ITEM,
            payload: {
              isSave: true
            }
          });
        let { objData, listGoldSelected } = getState().cd_gold_trans
        listGoldSelected.map(x => x.CodeTicket = objData.CodeTicket)
        // sum total 
        let TPaymentWeight_T = 0
            , TPaymentWeight_Real_T = 0
            , TPaymentWeight10_T = 0
            , TPaymentWeight10_Real_T = 0
        let listGoldSelectedTemp = _.clone(listGoldSelected, true)
        listGoldSelectedTemp.map(item => {
            let { PaymentWeight
                , PaymentWeight_Real
                , PaymentWeight10
                , PaymentWeight10_Real } = item
            TPaymentWeight_T = TPaymentWeight_T + PaymentWeight
            TPaymentWeight_Real_T = TPaymentWeight_Real_T + PaymentWeight_Real
            TPaymentWeight10_T = TPaymentWeight10_T + PaymentWeight10
            TPaymentWeight10_Real_T = TPaymentWeight10_Real_T + PaymentWeight10_Real
            return item
        })
        objData["PaymentWeight_T"] = Helper.roundNumber(TPaymentWeight_T, 1)
        objData["PaymentWeight_Real_T"] = Helper.roundNumber(TPaymentWeight_Real_T, 1)
        objData["PaymentWeight10_T"] = Helper.roundNumber(TPaymentWeight10_T, 1)
        objData["PaymentWeight10_Real_T"] = Helper.roundNumber(TPaymentWeight10_Real_T, 1)
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}gold_trans/update`,
                {
                    objData: objData,
                    listGoldSelected: listGoldSelectedTemp
                })
                .then((response) => {
                    dispatch({
                        type: ADD_NEW_ITEM,
                        payload: {
                          isSave: false
                        }
                      });
                    resolve(response)
                })
        }, (err) => {
            reject(err)
        })
    }
}


export const deleteItemWeightGold = (item) => {
    return (dispatch, getState) => {
        let { objData, listGoldSelected } = getState().cd_gold_trans
        listGoldSelected = listGoldSelected.filter(x => x.orderby != item.orderby)
        dispatch({
            type: ADD_ITEM_GOLD_WEIGHT,
            payload: {
                listGoldSelected: listGoldSelected
            }
        })
    }
}

export const getDataWoker = (tableName) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}common/list_combobox_by_table`, { params: { tableName: tableName } })
                .then((response) => {
                    let { data } = response.data
                    let data_temp = []
                    data.map((item, i) => {
                        data_temp.push(item)
                    })
                    dispatch({
                        type: GET_LIST_WORKER,
                        payload: {
                            list_worker: data_temp
                        }
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}

export const updateInputItemCasting = (obj) => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_CELL_INPUT_BY_BAG,
            payload: {
                objData: obj
            }
        })
    }
}

export const initAddCastingProc = () => {
    return (dispatch, getState) => {
        let { listGoldSelected, default_item } = getState().cd_gold_trans
        let listGoldSelectedClone = _.clone(listGoldSelected, true)
        let default_item_temp = _.clone(default_item, true)
        listGoldSelectedClone.push(default_item_temp)
        dispatch({
            type: INIT_ADD_CASTING_PROC,
            payload: {
                listGoldSelected: listGoldSelectedClone
            }
        })
        dispatch(getNumberAuto())
    }
}

export const updateCellBrokenQty = (obj) => {
    return (dispatch, getState) => {
        let { listStoneWaxset, typeInOut, totalWeightBroken, listGoldSelected, objConfig } = getState().cd_gold_trans
        let { IsIncludeInOut } = objConfig
        let temp = _.clone(listStoneWaxset, true);
        let listGoldSelectedTemp = _.clone(listGoldSelected, true);
        let totalWeightBrokenTemp = 0
        let IdBagInStone = ''
        temp.map((item, i) => {
            if (item.orderby == obj.id) {
                let { AvgStone, QtyProduct } = item
                let valueTemp = obj.value
                let AvgStoneTemp = parseFloat(AvgStone || 0)
                valueTemp = parseFloat(valueTemp || 0)
                item['BrokenWeight'] = (valueTemp * AvgStoneTemp)
                item['BrokenRate'] = valueTemp / (AvgStoneTemp * parseInt(QtyProduct || 0))
                item[obj.key] = obj.value
                IdBagInStone = item.IdBag
            }
            totalWeightBrokenTemp = totalWeightBrokenTemp + item.BrokenWeight
            return item
        })

        // Tính lại trọng lượng đá rớt 1 lần nữa
        listGoldSelectedTemp.map(item => {
            if (item.IdBag == IdBagInStone) {
                let { Waxset_Weight, Product_Weight_IN, Product_Weight_OUT } = item
                let Waxset_WeightTemp = parseFloat(Waxset_Weight || 0)
                if (typeInOut == 'IN') {
                    let valueTemp = Product_Weight_IN
                    item.Broken_Weight_IN = totalWeightBrokenTemp
                    item['Gold_Weight_IN'] = (valueTemp * item.Broken_Weight_IN) - Waxset_WeightTemp
                } else {
                    let valueTemp = Product_Weight_OUT
                    item.Broken_Weight_OUT = totalWeightBrokenTemp
                    item['Gold_Weight_OUT'] = (valueTemp * item.Broken_Weight_OUT) - Waxset_WeightTemp
                }
                if (IsIncludeInOut == 1) {
                    item['Gold_Lost'] = item.Gold_Weight_IN - item.Gold_Weight_OUT
                }

            }
            return item
        })
        console.log('listGoldSelectedTemp>>>>>', listGoldSelectedTemp);

        dispatch({
            type: UPDATE_BROKEN_QTY_STONE,
            payload: {
                listStoneWaxset: temp,
                totalWeightBroken: totalWeightBrokenTemp,
                listGoldSelected: listGoldSelectedTemp
            }
        })
    }
}
function round(value, precision) {
    if (Number.isInteger(precision)) {
        var shift = Math.pow(10, precision);
        return Math.round(value * shift) / shift;
    } else {
        return Math.round(value);
    }
}
export const updateCellBag = (obj) => {
    return (dispatch, getState) => {
        let { listGoldSelected, objConfig } = getState().cd_gold_trans
        let temp = _.clone(listGoldSelected, true);
        let { IsIncludeInOut } = objConfig
        temp.map((item, i) => {
            if (parseInt(item.orderby) === parseInt(obj.id)) {
                let { PaymentWeight_Real, ValueLV_Confirm, ValueLV_Real } = item
                let valueTemp = obj.value
                let PaymentWeight_RealTemp = parseFloat(PaymentWeight_Real || 0)
                let ValueLV_ConfirmTemp = parseFloat(ValueLV_Confirm || 0)
                let ValueLV_RealTemp = parseFloat(ValueLV_Real || 0)
                ValueLV_ConfirmTemp = ValueLV_ConfirmTemp
                ValueLV_RealTemp = ValueLV_RealTemp
                valueTemp = parseFloat(valueTemp || 0)

                switch (obj.key) {
                    case 'PaymentWeight_RealGram':
                        let parseLyReal = Helper.roundNumber(parseFloat(obj.value / 0.0375), 1)
                        item[obj.key] = parseFloat(obj.value)
                        item['PaymentWeight_Real'] = parseLyReal
                        item['PaymentWeight10'] = parseFloat((parseLyReal * ValueLV_ConfirmTemp) / 100)
                        item['PaymentWeight10_Real'] = parseFloat(parseLyReal * ValueLV_RealTemp) / 100
                        break;
                    case 'ValueLV_Confirm':
                        item[obj.key] = parseFloat(obj.value)
                        item['PaymentWeight10'] = parseFloat(valueTemp * PaymentWeight_RealTemp) / 100
                        break;
                    case 'ValueLV_Real':
                        item[obj.key] = parseFloat(obj.value)
                        item['PaymentWeight10_Real'] = parseFloat(valueTemp * PaymentWeight_RealTemp) / 100
                        break;
                    case 'PaymentWeightGram':
                        let parseLy = Helper.roundNumber(parseFloat(obj.value / 0.0375), 1)
                        item['PaymentWeight'] = parseLy // quy gram ra ly
                        item[obj.key] = parseFloat(obj.value)
                        break;
                    default:
                        item[obj.key] = obj.value
                        break;
                }

            }
            return item
        })
        dispatch({
            type: UPDATE_CELL_INPUT_BY_BAG,
            payload: null
        })
    }
}

export const updateExistBag = (data) => {
    return (dispatch, getState) => {
        let { listGoldSelected, list_products } = getState().cd_gold_trans
        let listGoldSelected_temp = _.clone(listGoldSelected, true)
        let listGoldSelectedConvert = []
        listGoldSelected_temp.map((item, i) => {
            let item_temp = _.clone(item, true)
            let itemBag = _.clone(data, true)
            itemBag.isExists = true
            if (item_temp.IdBag.toUpperCase() == itemBag.Id.toUpperCase() && item_temp.isNew) {
                itemBag.isNew = false
                itemBag.orderby = item_temp.orderby
                itemBag.CodeProcess = item_temp.CodeProcess
                itemBag.CodeTicket = item_temp.CodeTicket
                itemBag.orderby = item_temp.orderby
                itemBag.created_by = item_temp.created_by
                listGoldSelectedConvert.push(itemBag)
            } else {
                listGoldSelectedConvert.push(item_temp)
            }
        })
        dispatch({
            type: UPDATE_EXISTS_BAG,
            payload: {
                listGoldSelected: listGoldSelectedConvert
            }
        })

    }
}

export const addItemBagNew = () => {
    return (dispatch, getState) => {
        let { listGoldSelected, default_item } = getState().cd_gold_trans
        let default_item_temp = _.clone(default_item, true)
        let listGoldSelected_temp = _.clone(listGoldSelected, true)
        default_item_temp.orderby = listGoldSelected_temp.length
        listGoldSelected_temp.push(default_item_temp)
        listGoldSelected_temp = _.orderBy(listGoldSelected_temp, 'orderby', 'asc')
        dispatch({
            type: ADD_ITEM_GOLD_WEIGHT,
            payload: {
                listGoldSelected: listGoldSelected_temp
            }
        })
    }
}

export const removeItemBag = (obj) => {
    return (dispatch, getState) => {
        let { listGoldSelected } = getState().cd_gold_trans
        let listGoldSelectedTemp = _.clone(listGoldSelected, true)
        listGoldSelectedTemp = listGoldSelectedTemp.filter(x => x.orderby != obj.orderby)
        dispatch({
            type: GET_LIST_TICKET_DETAIL,
            payload: {
                listGoldSelected: listGoldSelectedTemp
            }
        })
    }
}
export const isEditCasting = (value) => {
    return (dispatch) => {
        dispatch({
            type: IS_EDIT_CASTING,
            payload: {
                isDetail: value
            }
        })
    }
}
export const clickCheckRowGoldTrans = (value, checked) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let { list_data } = getState().cd_gold_trans
            var list_temp = _.clone(list_data, true);
            list_temp.map((item, i) => {
                item.checked = false
                if (item.IdTicket == value.IdTicket) {
                    item.checked = checked
                }
                return item
            })
            let objData = _.clone(value, true)
            objData.DayMake = moment(objData.DayMake || new Date())
            dispatch({
                type: CLICK_ROW_DATA_GOLD_TRANS,
                payload: {
                    list_data: list_temp,
                    itemDetail: objData,
                    objData: objData
                }
            })
            dispatch(getListOutputByCustomer())
            resolve(CLICK_ROW_DATA_GOLD_TRANS)
        })

    }
}
export const getListDataGoldTrans = (value = '', sortKey = '', sortBy = '', keyFilter = '', valueFilter = '') => {
    return (dispatch, getState) => {
        let { page, total, endPage } = getState().common
        let pageParams = {
            page: page,
            total: total
        }
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}gold_trans`, {
                params:
                {
                    page: page,
                    total: total,
                    key: value,
                    SortKey: sortKey,
                    SortBy: sortBy,
                    ColFilter: keyFilter,
                    ColValue: valueFilter
                }
            })
                .then((response) => {
                    let { data } = response.data
                    let data_temp = data
                    data_temp.map(item => item.checked = false)
                    let totalRows = data_temp && data_temp[0] && data_temp[0].totalRows
                    dispatch({
                        type: GET_LIST_GOLD_TRANS,
                        payload: {
                            list_data: data_temp || [],
                            isDetail: false
                        }
                    })
                    dispatch(updateInfoPage(totalRows))
                    resolve(response)
                }, (err) => {

                    reject(err)
                })
        })
    }
}
export const getListBagInCastingProc = (value = '') => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}gold_trans/get_all_bag`)
                .then((response) => {
                    let { data } = response.data
                    let data_temp = data
                    dispatch({
                        type: GET_ALL_BAG_IN_CASTING_PROC,
                        payload: {
                            list_bag_default: data_temp || []
                        }
                    })
                    resolve(response)
                }, (err) => {

                    reject(err)
                })
        })
    }
}
export const getDataDetailByCode = (value = '') => {
    return (dispatch, getState) => {
        let { objData } = getState().cd_gold_trans
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}gold_trans/get_ticket_detail`, { params: { keyMap: objData.keyMap } })
                .then((response) => {
                    let { data } = response.data
                    let data_temp = data
                    dispatch({
                        type: GET_LIST_TICKET_DETAIL,
                        payload: {
                            listGoldSelected: data
                        }
                    })
                    resolve(response)
                }, (err) => {

                    reject(err)
                })
        })
    }
}

export const updateBagDetail = (obj) => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_BAG_DETAIL,
            payload: {
                objBagDetail: obj
            }
        })
    }
}