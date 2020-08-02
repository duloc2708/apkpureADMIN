import {
    GET_DETAIL_BAG_REPORT,
    UDDATE_TYPE_BAG,
    INSERT_BAG_LIST_ID
} from '../types'


export const deleteListBagId = (numGen) => {
    return (dispatch, state) => {
        return new Promise((resolve, rejects) => {
            axios.get(`${Config.API_URL_USER}bag/deleteListBagId`, { params: { numGen: numGen } })
                .then((response) => {

                    resolve(response)
                }, (err) => {
                    rejects(err)
                })
        })
    }
}

export const insertListIdBagTemp = (numGen, data) => {
    return (dispatch, getState) => {
        return new Promise((resolve, rejects) => {
            axios.post(`${Config.API_URL_USER}bag/insertListIdBagTemp`, { data: data, numGen: numGen })
                .then((response) => {
                    dispatch({
                        type: INSERT_BAG_LIST_ID,
                        payload: null
                    })
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}

export const updateTypeBag = (type) => {
    return (dispatch, getState) => {
        dispatch({
            type: UDDATE_TYPE_BAG,
            payload: {
                type_bag: type
            }
        })
    }
}
export const printBagPhamtom = () => {
    return (dispatch, getState) => {
        let { itemDetail } = getState().bag
        return new Promise((resolve, reject) => {
            axios.post(`${Config.API_URL_USER}bag/print_detail_bag_phantom`)
                .then((response) => {

                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
export const getItemBagDetailByListId = (numGen, list_bag_id) => {
    return (dispatch, getState) => {
        let { list_report_bag } = getState().bagDetail
        return new Promise((resolve, reject) => {
            Promise.all([
                axios.get(`${Config.API_URL_USER}bag/get_item_detail_bag_new`, { params: { numGen: numGen } }),
                axios.get(`${Config.API_URL_USER}bag/get_header_total_color_new`, { params: { numGen: numGen } }),
                axios.get(`${Config.API_URL_USER}bag/get_list_stone_detail_new`, { params: { numGen: numGen } })
            ])
                .then((response) => {
                    var { data: listItemDetail } = response[0].data
                    let listImg = []
                    listItemDetail.map(item => {
                        listImg.push({ IdBag: item.Id, Image: item.Image })
                    })
                    axios.post(`${Config.API_URL_USER}common/get_list_img_base64`, { data: listImg })
                        .then((response2) => {
                            let { data: listImage} = response2.data
                            let { data: listHeaderColor } = response[1].data
                            let { data: listStoneWeight } = response[2].data
                            let listHeaderColorDefault = listHeaderColor.filter(x => x.IdBag == '')
                            list_bag_id.map((Id) => {
                                let itemDetailTemp = listItemDetail.filter(x => x.Id == Id)
                                let listHeaderColorTemp = []
                                if (listHeaderColorDefault.length > 0) {
                                    listHeaderColorTemp.push(listHeaderColorDefault[0])
                                }
                                listHeaderColor.map(itemColor => {
                                    if (itemColor.IdBag == Id) {
                                        listHeaderColorTemp.push(itemColor)
                                    }
                                })
                                let listStoneWeightTemp = listStoneWeight.filter(x => x.IdBag == Id)
                                let data_base_64 = listImage.filter(x => x.IdBag == Id)
                                
                                let objData = {
                                    itemDetail: itemDetailTemp[0],
                                    list_stone_by_color: listHeaderColorTemp,
                                    get_list_stone_detail: listStoneWeightTemp,
                                    url_image: data_base_64[0] && data_base_64[0].Image || ''
                                }
                                list_report_bag.push(objData)
                            })
                            dispatch({
                                type: GET_DETAIL_BAG_REPORT,
                                payload: {
                                    list_report_bag: list_report_bag
                                }
                            })
                            resolve(response)
                        })

                })
        }, (err) => {
            reject(err)
        })
    }
}
export const getItemBagDetail = (value) => {
    return (dispatch, getState) => {
        let { list_report_bag } = getState().bagDetail
        return new Promise((resolve, reject) => {
            Promise.all([
                axios.get(`${Config.API_URL_USER}bag/get_item_detail_bag`, { params: { IdBag: value } }),
                axios.get(`${Config.API_URL_USER}bag/get_header_total_color`, { params: { IdBag: value } }),
                axios.get(`${Config.API_URL_USER}bag/get_list_stone_detail`, { params: { IdBag: value } })
            ])
                .then((response) => {
                    let { data } = response[0].data
                    let list_stone_by_color = response[1].data.data
                    let get_list_stone_detail_temp = response[2].data.data
                    axios.post(`${Config.API_URL_USER}common/get_img_base64`, { image: data[0] && data[0].Image || '' })
                        .then((response2) => {
                            let data_base_64 = response2.data.data
                            list_report_bag.push(
                                {
                                    itemDetail: data && data[0] || '',
                                    list_stone_by_color: list_stone_by_color,
                                    get_list_stone_detail: get_list_stone_detail_temp,
                                    url_image: data_base_64
                                }
                            )
                            dispatch({
                                type: GET_DETAIL_BAG_REPORT,
                                payload: {
                                    itemDetail: data && data[0] || '',
                                    list_stone_by_color: list_stone_by_color,
                                    get_list_stone_detail: get_list_stone_detail_temp,
                                    url_image: data_base_64,
                                    list_report_bag: list_report_bag
                                }
                            })
                        })
                    resolve(response)
                })
        }, (err) => {
            reject(err)
        })

    }
}
export const checkCodeExistsPrintBag = (IdBag) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}bag/check_code_exists_print_bag`,
                { params: { IdBag: IdBag } })
                .then((response) => {
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}

export const updateStatusPrintBag = (IdBag) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            axios.get(`${Config.API_URL_USER}bag/update_status_print_bag`,
                { params: { IdBag: IdBag } })
                .then((response) => {
                    resolve(response)
                }, (err) => {
                    reject(err)
                })
        })
    }
}
