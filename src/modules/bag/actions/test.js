export const InsertBagListSplitOdd = (listItemCreateBag, list_stone_save, list_stone_save_split) => {
    return (dispatch, getState) => {
        let { listItemCreateBag, list_stone_save, list_stone_save_split, itemDetailCreateBag, list_stone_save_split_custom } = getState().bag
        let listItemCreateBag_temp = listItemCreateBag.filter(x => x.Value != 0)
        let list_stone_save_temp = []
        let list_stone_split_save_temp = []
        let list_stone_split_save_custom_temp = []
        let totalqty = 0;
        listItemCreateBag_temp.map((item, i) => {
            item.StatusWeight = StatusWeight
            totalqty = totalqty + parseFloat(item.Value)
        })
        listItemCreateBag_temp.map((item, i) => {
            let { TypeSplitStone } = item
            if (item.IdOdd == "1") {
                if (i == 0) {
                    list_stone_save.map((item2) => {
                        let itemInfo = listItemCreateBag_temp.filter(x => x.IdProduct + x.ColorParent == item2.IdProductParent + item2.ColorParent)
                        let item_data = _.clone(item2, true)
                        item_data.qty = parseFloat(itemInfo[0].Value)
                        item_data.totalqty = totalqty
                        if (item_data.PrimaryStone == 1) {
                            item_data.numofstone = item_data.sl2//parseFloat(item_data.sl) * parseFloat(item.Value)
                            item_data.totalstoneprimary = parseFloat(item_data.sl) * totalqty
                        } else {
                            item_data.numofstone = item_data.sl2
                            // item_data.numofstone = totalqty * parseFloat(item_data.sl)
                        }
                        if (item_data.PrimaryStone == 1) {
                            item_data.weightperqty = parseFloat(item_data.Weight)
                        } else {
                            item_data.weightperqty = parseFloat(item_data.Weight) * parseFloat(itemInfo[0].Value) / totalqty
                        }
                        list_stone_save_temp.push(item_data)
                    })

                    /////////////////////////////// tính tỷ lệ cho màu đá sau khi tách
                    list_stone_save_split.map((item2) => {
                        let itemInfo = listItemCreateBag_temp.filter(x => x.IdProduct + x.ColorParent == item2.IdProductParent + item2.ColorParent)
                        let item_data = _.clone(item2, true)
                        item_data.qty = parseFloat(itemInfo[0].Value)
                        item_data.totalqty = totalqty
                        item_data.numofstone = parseFloat(item_data.sl2)
                        item_data.weightperqty = TypeSplitStone == 'TYPE_SPLIT_STONE_1' ? parseFloat((item_data.Weight) * parseFloat(itemInfo[0].Value)) / totalqty : parseFloat(item_data.Weight)
                        list_stone_split_save_temp.push(item_data)
                    })
                    /////////////////////////////// tính tỷ lệ cho màu đá còn lại
                    list_stone_save_split_custom.map((item2) => {
                        let itemInfo = listItemCreateBag_temp.filter(x => x.IdProduct + x.ColorParent == item2.IdProductParent + item2.ColorParent)
                        let item_data = _.clone(item2, true)
                        item_data.qty = parseFloat(itemInfo[0].Value)
                        item_data.totalqty = totalqty
                        item_data.numofstone = parseFloat(item_data.sl2)
                        item_data.weightperqty = TypeSplitStone == 'TYPE_SPLIT_STONE_1' ? parseFloat((item_data.Weight) * parseFloat(itemInfo[0].Value)) / totalqty : 0
                        list_stone_split_save_custom_temp.push(item_data)
                    })
                }
            }
            else {
                list_stone_save.map((item2) => {
                    let itemInfo = listItemCreateBag_temp.filter(x => x.IdProduct + x.ColorParent == item2.IdProductParent + item2.ColorParent)
                    let item_data = _.clone(item2, true)
                    item_data.qty = parseFloat(itemInfo[0].Value)
                    item_data.totalqty = totalqty
                    if (item_data.PrimaryStone == 1) {
                        item_data.numofstone = item_data.sl2 //parseFloat(item_data.sl) * parseFloat(item.Value)
                    } else {
                        item_data.numofstone = item_data.sl2
                        // item_data.numofstone = totalqty * parseFloat(item_data.sl)
                    }
                    if (item_data.PrimaryStone == 1) {
                        item_data.weightperqty = parseFloat(item_data.Weight)
                    } else {
                        item_data.weightperqty = parseFloat(item_data.Weight) * parseFloat(itemInfo[0].Value) / totalqty
                    }
                    if (item2.IdProduct + item2.ColorParent == item.IdProduct + item.Color) {
                        list_stone_save_temp.push(item_data)
                    }
                })
                /////////////////////////////// tính tỷ lệ cho màu đá sau khi tách
                list_stone_save_split.map((item2) => {
                    let itemInfo = listItemCreateBag_temp.filter(x => x.IdProduct + x.ColorParent == item2.IdProductParent + item2.ColorParent)
                    let item_data = _.clone(item2, true)
                    item_data.qty = parseFloat(itemInfo[0].Value)
                    item_data.totalqty = totalqty
                    item_data.numofstone = parseFloat(item_data.sl2)
                    item_data.weightperqty = TypeSplitStone == 'TYPE_SPLIT_STONE_1' ? parseFloat((item_data.Weight) * parseFloat(itemInfo[0].Value)) / totalqty : parseFloat(item_data.Weight)
                    if (item2.IdProduct + item2.ColorParent == item.IdProduct + item.Color) {
                        list_stone_split_save_temp.push(item_data)
                    }
                })
                /////////////////////////////// tính tỷ lệ cho màu đá còn lại
                list_stone_save_split_custom.map((item2) => {
                    let itemInfo = listItemCreateBag_temp.filter(x => x.IdProduct + x.ColorParent == item2.IdProductParent + item2.ColorParent)
                    let item_data = _.clone(item2, true)
                    item_data.qty = parseFloat(itemInfo[0].Value)
                    item_data.totalqty = totalqty
                    item_data.numofstone = parseFloat(item_data.sl2)
                    item_data.weightperqty = TypeSplitStone == 'TYPE_SPLIT_STONE_1' ? parseFloat((item_data.Weight) * parseFloat(itemInfo[0].Value)) / totalqty : 0
                    if (item2.IdProduct + item2.ColorParent == item.IdProduct + item.Color) {
                        list_stone_split_save_custom_temp.push(item_data)
                    }
                })
            }
        })


        //update is split
        list_stone_save_temp = list_stone_save_temp.map((item) => {
            let check = list_stone_save_split.filter(x => x.IdProductColorParentColorStone == item.IdProductColorParentColorStone)
            if (check.length > 0) {
                item.issplit = 1
            } else {
                item.issplit = 0
            }
            return item
        })
        var IdBag_temp = itemDetailCreateBag.Id

        return new Promise((resolve, reject) => {
            Promise.all([
                axios.post(`${Config.API_URL_USER}bag/insert_bag_list`, { data: listItemCreateBag_temp, IdBag: IdBag_temp, IdOrder: listItemCreateBag_temp[0].IdOrder }),
                axios.post(`${Config.API_URL_USER}bag/insert_stone_list`, { data: list_stone_save_temp, IdBag: IdBag_temp }),
                axios.post(`${Config.API_URL_USER}bag/insert_stone_split_list`, { data: list_stone_split_save_temp, IdBag: IdBag_temp, dataCustom: list_stone_split_save_custom_temp })                    // axios.post(`${Config.API_URL_USER}products/add_list_casting`, { data: data_temp2 })
            ])
                .then((response) => {
                    dispatch({
                        type: SAVE_BAG_LIST,
                        payload: {
                            isSaveBag: true
                        }
                    })
                    // dispatch(resetDataBag())
                    resolve(response)
                })
        }, (err) => {
            reject(err)
        })
    }
}