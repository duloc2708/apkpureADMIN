import {
    GET_LIST_CASH_TRANS,
    CLICK_ROW_CASH_TRANS,
    IS_EDIT_CASTING,
    GET_ALL_BAG_IN_CASTING_PROC,
    UPDATE_CELL_INPUT_CASH,
    INIT_ADD_CASTING_PROC,
    GET_LIST_USER,
    GENERATE_NUMBER_ID_CASH_TRANS,
    CLEAR_DATA_CASTING_PROC,
    UPDATE_EXISTS_BAG,
    SHOW_FORM_STONE, GET_LIST_WAXSET_BY_BAG,
    GET_CONFIG_PROCESS_TICKET,
    GET_LIST_HEADER_TABLE,
    ADD_ITEM_BAG,
    GET_LIST_TICKET_DETAIL,
    UPDATE_BROKEN_QTY_STONE,
    UPDATE_TYPE_IN_OUT,
    UPDATE_BAG_DETAIL,
    GET_LIST_CUSTOMER,
    GET_LIST_OUTPUT,
    SELECT_CUSTOMER_CASH,
    GET_LIST_OUTPUT_BY_CUSTOMER,
    SELECT_SALE_MAN_TRANS,
    SORT_DATA_LIST_CASH,
    ADD_NEW_ITEM
} from '../types'
import { updateInfoPage, resetInfoPage } from 'modules/common/actions/form'
export const onChangeFilterListCash = (obj) => {
    return (dispatch, getState) => {
        dispatch(getListDataCashTrans('', '', '', obj.id, obj.value))
    }
}
export const sortDataListCash = (obj) => {
    return (dispatch, getState) => {
        let { listHeaderTable } = getState().cd_cash_trans
        let temp = _.clone(listHeaderTable, true)
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
                dispatch(getListDataCashTrans('', item.key, sortBy))
            } else {
                item.sortBy = ''
            }
            return item;
        })
        dispatch({
            type: SORT_DATA_LIST_CASH,
            payload: {
                listHeaderTable: temp
            }
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
                        type: GET_LIST_OUTPUT,
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
export const deleteItem = (params) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}cash_trans/delete`, params)
                .then((response) => {
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const printDetail = (item) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}cash_trans/print_detail`,
                { Info: item, type: 0 },
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
export const updateListOutput = (value) => {
    return (dispatch, getState) => {
        let { listOutputDefault, objData } = getState().cd_cash_trans
        let listOutputDefaultTemp = _.clone(listOutputDefault, true)
        let objDataTemp = _.clone(objData, true)
        listOutputDefaultTemp = listOutputDefaultTemp.filter(x => x.IdCustomer == value)
        objDataTemp['IdOutput'] = ''
        objDataTemp["IdRef"] = ''
        dispatch({
            type: GET_LIST_OUTPUT,
            payload: {
                listOutput: listOutputDefaultTemp,
                objData: objDataTemp
            }
        })
    }
}
export const selectOutputCash = (value) => {
    return (dispatch, getState) => {
        let { objData } = getState().cd_cash_trans
        let { status } = getState().toolbar
        let objData_temp = _.clone(objData, true)
        let { value: IdOutput, IdOrder } = value || {}
        objData_temp["IdOutput"] = IdOutput
        objData_temp["IdRef"] = IdOrder
        dispatch({
            type: SELECT_CUSTOMER_CASH,
            payload: {
                objData: objData_temp
            }
        })
    }
}
export const selectCustomerCash = (value) => {
    return (dispatch, getState) => {
        let { objData } = getState().cd_cash_trans
        let { status } = getState().toolbar
        let objData_temp = _.clone(objData, true)
        let { value: valueCode, name, Discount, SaleMan, SaleManName, Is_Beneficiary } = value || {}
        objData_temp["IdCustomer"] = valueCode
        objData_temp["nameCustomer"] = name
        objData_temp["SaleMan"] = SaleMan
        objData_temp["SaleManName"] = SaleManName
        objData_temp["Beneficiary"] = Is_Beneficiary == 1 ? valueCode : ''
        dispatch({
            type: SELECT_CUSTOMER_CASH,
            payload: {
                objData: objData_temp
            }
        })
    }
}
export const saveWeightStone = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let { listStoneWaxset } = getState().cd_cash_trans
            axios.post(`${Config.API_URL_USER}ticket_proc/insert_list_stone_waxset`,
                { listStoneWaxset: listStoneWaxset })
                .then((response) => {
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getListOutputByCustomer = () => {
    return (dispatch, getState) => {
        let { objData } = getState().cd_cash_trans
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
export const acceptStatus = (id) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}cash_trans/accept_status`, { params: { IdTicket: id } })
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
            axios.get(`${Config.API_URL_USER}cash_trans/complete_ticket`, { params: { IdTicket: id } })
                .then((response) => {
                    let { data } = response.data
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
            let { listStoneWaxset } = getState().cd_cash_trans
            let listStoneWaxsetTemp = _.clone(listStoneWaxset, true)
            axios.get(`${Config.API_URL_USER}ticket_proc/get_list_stone_waxset_bag`,
                {
                    params: { IdBag: obj.IdBag }
                })
                .then((response) => {
                    let { data } = response.data
                    data.map(item => {
                        let itemExists = listStoneWaxsetTemp.filter(x => x.IdPrimaryStone == item.IdPrimaryStone)
                        if (itemExists.length == 0) {
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


export const getListHeaderTable = () => {
    return (dispatch, getState) => {
        let { objConfig, listHeaderTableNotIntOut, listHeaderTableInOut, listHeaderBagNotInOut, listHeaderBagInOut } = getState().cd_cash_trans
        let { IsIncludeInOut } = objConfig
        let listHeaderTable = [], listHeaderBag = []
        if (IsIncludeInOut == 0) {
            listHeaderTable = listHeaderTableNotIntOut
            listHeaderBag = listHeaderBagNotInOut
        } else {
            listHeaderTable = listHeaderTableInOut
            listHeaderBag = listHeaderBagInOut

        }
        dispatch({
            type: GET_LIST_HEADER_TABLE,
            payload: {
                listHeaderTable: listHeaderTable,
                listHeaderBag: listHeaderBag
            }
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
export const getNumberAutoCashTrans = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}cash_trans/get_auto_number`)
                .then((response) => {
                    let { data } = response.data
                    let { objData } = getState().cd_cash_trans
                    let objData_temp = _.clone(objData, true)
                    let numberGen = (data && data[0].value || 'PTH000001')
                    objData_temp["CodeTicket"] = numberGen
                    dispatch({
                        type: GENERATE_NUMBER_ID_CASH_TRANS,
                        payload: {
                            objData: objData_temp
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
        let { objData } = getState().cd_cash_trans
        if (!objData["Notes"]) {
            objData["Notes"] = objData["IdCustomer"] + ' trả tiền'
        }
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}cash_trans/add`, {
                objData: objData
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
        let { objData } = getState().cd_cash_trans
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}cash_trans/update`,
                {
                    objData: objData
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

export const getDataUsers = (tableName) => {
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
                        type: GET_LIST_USER,
                        payload: {
                            list_user: data_temp
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
                        type: GET_LIST_CUSTOMER,
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
export const updateInputItemCash = (obj) => {
    return (dispatch, getState) => {
        dispatch({
            type: UPDATE_CELL_INPUT_CASH,
            payload: {
                objData: obj
            }
        })
    }
}

export const initAddCastingProc = () => {
    return (dispatch, getState) => {
        let { listBagSelected, default_bag } = getState().cd_cash_trans
        let listBagSelectedClone = _.clone(listBagSelected, true)
        let default_bag_temp = _.clone(default_bag, true)
        listBagSelectedClone.push(default_bag_temp)
        dispatch({
            type: INIT_ADD_CASTING_PROC,
            payload: {
                listBagSelected: listBagSelectedClone
            }
        })
        dispatch(getNumberAutoCashTrans())
    }
}

export const updateCellBrokenQty = (obj) => {
    return (dispatch, getState) => {
        let { listStoneWaxset, typeInOut, totalWeightBroken, listBagSelected, objConfig } = getState().cd_cash_trans
        let { IsIncludeInOut } = objConfig
        let temp = _.clone(listStoneWaxset, true);
        let listBagSelectedTemp = _.clone(listBagSelected, true);
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
        listBagSelectedTemp.map(item => {
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
        console.log('listBagSelectedTemp>>>>>', listBagSelectedTemp);

        dispatch({
            type: UPDATE_BROKEN_QTY_STONE,
            payload: {
                listStoneWaxset: temp,
                totalWeightBroken: totalWeightBrokenTemp,
                listBagSelected: listBagSelectedTemp
            }
        })
    }
}
export const updateCellBag = (obj) => {
    return (dispatch, getState) => {
        let { listBagSelected, objConfig } = getState().cd_cash_trans
        let temp = _.clone(listBagSelected, true);
        let { IsIncludeInOut } = objConfig

        temp.map((item, i) => {
            if (parseInt(item.index) === parseInt(obj.id)) {
                console.log('updateCellBag>>>>>>', obj);
                console.log('item>>>>>>', item);
                let { Broken_Weight_OUT, Broken_Weight_IN, Waxset_Weight } = item
                let valueTemp = obj.value
                let Broken_Weight_OUTTemp = parseFloat(Broken_Weight_OUT || 0)
                let Broken_Weight_INTemp = parseFloat(Broken_Weight_IN || 0)
                let Waxset_WeightTemp = parseFloat(Waxset_Weight || 0)
                valueTemp = parseFloat(valueTemp || 0)
                switch (obj.key) {
                    // trường hợp OUT nhập TL (Vàng + Đá) Trừ Đá Rớt 
                    // (TL (Vàng + Đá) Trừ Đá Rớt + Tổng TL đá rớt ) - trọng lượng waxset
                    case 'Product_Weight_OUT':
                        item['Gold_Weight_OUT'] = (valueTemp * Broken_Weight_OUTTemp) - Waxset_WeightTemp
                        break;
                    // tương tự trường hợp OUT
                    case 'Product_Weight_IN':
                        item['Gold_Weight_IN'] = (valueTemp * Broken_Weight_INTemp) - Waxset_WeightTemp
                        break;
                    default:
                        break;
                }
                if (IsIncludeInOut == 1) {
                    item['Gold_Lost'] = item.Gold_Weight_IN - item.Gold_Weight_OUT
                }
                item[obj.key] = obj.value
            }
            return item
        })
        dispatch({
            type: UPDATE_CELL_INPUT_CASH,
            payload: {
                listBagSelected: temp
            }
        })
    }
}

export const updateExistBag = (data) => {
    return (dispatch, getState) => {
        let { listBagSelected, list_products } = getState().cd_cash_trans
        let listBagSelected_temp = _.clone(listBagSelected, true)
        let listBagSelectedConvert = []
        listBagSelected_temp.map((item, i) => {
            let item_temp = _.clone(item, true)
            let itemBag = _.clone(data, true)
            itemBag.isExists = true
            if (item_temp.IdBag.toUpperCase() == itemBag.Id.toUpperCase() && item_temp.isNew) {
                itemBag.isNew = false
                itemBag.index = item_temp.index
                itemBag.CodeProcess = item_temp.CodeProcess
                itemBag.CodeTicket = item_temp.CodeTicket
                itemBag.orderby = item_temp.orderby
                itemBag.created_by = item_temp.created_by
                listBagSelectedConvert.push(itemBag)
            } else {
                listBagSelectedConvert.push(item_temp)
            }
        })
        dispatch({
            type: UPDATE_EXISTS_BAG,
            payload: {
                listBagSelected: listBagSelectedConvert
            }
        })

    }
}

export const addItemBagNew = () => {
    return (dispatch, getState) => {
        let { listBagSelected, default_bag } = getState().cd_cash_trans
        let default_bag_temp = _.clone(default_bag, true)
        let listBagSelected_temp = _.clone(listBagSelected, true)
        default_bag_temp.orderby = listBagSelected_temp.length
        default_bag_temp.index = listBagSelected_temp.length
        listBagSelected_temp.push(default_bag_temp)
        dispatch({
            type: ADD_ITEM_BAG,
            payload: {
                listBagSelected: listBagSelected_temp
            }
        })
    }
}

export const removeItemBag = (obj) => {
    return (dispatch, getState) => {
        let { listBagSelected } = getState().cd_cash_trans
        let listBagSelectedTemp = _.clone(listBagSelected, true)
        listBagSelectedTemp = listBagSelectedTemp.filter(x => x.orderby != obj.orderby)
        dispatch({
            type: GET_LIST_TICKET_DETAIL,
            payload: {
                listBagSelected: listBagSelectedTemp
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
export const clickCheckRowCasting = (value, checked) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            let { list_data } = getState().cd_cash_trans
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
                type: CLICK_ROW_CASH_TRANS,
                payload: {
                    list_data: list_temp,
                    itemDetail: objData,
                    objData: objData
                }
            })
            dispatch(getListOutputByCustomer())
            resolve(CLICK_ROW_CASH_TRANS)
        })

    }
}
export const selectSaleman = (value) => {
    return (dispatch, getState) => {
        let { objData } = getState().cd_cash_trans
        let { status } = getState().toolbar
        let objData_temp = _.clone(objData, true)
        let { value: valueData, name } = value || {}
        objData_temp["SaleMan"] = valueData
        objData_temp["SaleManName"] = name
        dispatch({
            type: SELECT_SALE_MAN_TRANS,
            payload: {
                objData: objData_temp
            }
        })
    }
}
export const getRemainingDebt = () => {
    return (dispatch, getState) => {
        let { objData } = getState().cd_cash_trans
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}cash_trans/get_remmainig_debt`, { params: { IdCustomer: objData.IdCustomer } })
                .then((response) => {
                    let { data } = response.data
                    let objDataTemp = _.clone(objData, true)
                    objDataTemp["Remaining_Debt"] = data[0] && data[0].Open_Balance || 0
                    dispatch({
                        type: UPDATE_CELL_INPUT_CASH,
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
export const getListDataCashTrans = (value = '', sortKey = '', sortBy = '', keyFilter = '', valueFilter = '') => {
    return (dispatch, getState) => {
        let { page, total, endPage } = getState().common
        let pageParams = {
            page: page,
            total: total
        }
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}cash_trans`, {
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
                    data_temp = data_temp.filter(x => x.Payment_Type_Gold != 1)
                    dispatch({
                        type: GET_LIST_CASH_TRANS,
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
            axios.get(`${Config.API_URL_USER}ticket_proc/get_all_bag`)
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
        let { objData } = getState().cd_cash_trans
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}ticket_proc/get_ticket_detail`, { params: { CodeTicket: objData.CodeTicket } })
                .then((response) => {
                    let { data } = response.data
                    let data_temp = data
                    dispatch({
                        type: GET_LIST_TICKET_DETAIL,
                        payload: {
                            listBagSelected: data
                        }
                    })
                    resolve(response)
                }, (err) => {

                    reject(err)
                })
        })
    }
}
export const getDataDetailStoneByCode = (value = '') => {
    return (dispatch, getState) => {
        let { objData } = getState().cd_cash_trans
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}ticket_proc/get_ticket_detail_stone`, { params: { CodeTicket: objData.CodeTicket } })
                .then((response) => {
                    let { data } = response.data
                    let data_temp = data
                    dispatch({
                        type: GET_LIST_TICKET_DETAIL,
                        payload: {
                            listStoneWaxset: data
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