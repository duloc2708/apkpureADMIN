const {
  STATUS_TF_TRANS_01_CODE,
  STATUS_TF_TRANS_01_NAME
} = require("./Constant");
const typeProcess = Helper.getParam(window.location.href, "type");

export const validateAddBag = (
  IdBag,
  objDataParent,
  objConfig,
  listBagSystem,
  listBagSelected,
  BagFound
) => {
  let {
    IsGoldTypeRequest,
    IsAllowProduct_NotSameGold,
    IsUsePriorData
  } = objConfig;
  let list_bag_default_temp = _.clone(listBagSystem, true);

  let check = list_bag_default_temp.find(x => x.IdBag.toUpperCase() === IdBag);
  if (!objDataParent.CodeLV) {
    alert("Vui lòng chọn loại vàng");
    return false;
  }
  if (!check) {
    alert("Bag này không tồn tại/đã sản xuất!");
    return false;
  }
  let objBag = _.clone(check);
  // Kiểm tra config có thuộc loại vàng trong quy trình
  if (IsGoldTypeRequest == 1) {
    if (objBag.codeLV != objDataParent.CodeLV) {
      alert(
        `Bag ${IdBag} (LV:${objBag.codeLV}) này không thuộc loại vàng trên!.`
      );
      return false;
    }
  }
  // Kiểm tra config các sản phầm trong bag phải thuộc loại vàng
  if (IsAllowProduct_NotSameGold == 1) {
    if (objBag.codeLV != objDataParent.CodeLV) {
      alert("Sản phẩm của Bag này không thuộc loại vàng trên");
      return false;
    }
  }

  if (typeProcess === "SKELETON") {
    if (!objDataParent.CodeLH) {
      alert("Vui lòng chọn loại hội");
      return false;
    }
    if (objBag.CodeLH != objDataParent.CodeLH) {
      alert("Sản phẩm của Bag này không thuộc loại hội trên");
      return false;
    }
  }

  // Kiểm tra bag nhập trùng
  let checkList = listBagSelected.filter(
    x => x.IdBag === IdBag && x.IdOrder != ""
  );
  if (checkList && checkList.length >= 1) {
    alert("Bag này đã tồn tại!");
    return false;
  }

  objBag.isNew = false;

  const maxValue = Math.max(...listBagSelected.map(x => x.orderby), 0);
  objBag.orderby = maxValue + 1;
  objBag.IdBag = IdBag;
  objBag.Worker = "";
  objBag.Qty_Product_Cancel = "";
  objBag.Gold_Weight_Pay = "";
  objBag.Qty_Product_Remain = objBag.Qty_Product_Remain || objBag.QtyCreated;
  objBag.Qty_Product_RemainTemp = objBag.Qty_Product_Remain;
  // trường hợp tìm thấy bag để add
  if (IsUsePriorData != 0) {
    objBag.Broken_Weight_IN = objBag.Broken_Weight_OUT;
    objBag.Gold_Weight_IN = objBag.Gold_Weight_OUT;
    objBag.Product_Weight_IN = objBag.Product_Weight_OUT;
  }

  objBag.Gold_Weight_OUT = 0;
  objBag.Product_Weight_OUT = 0;
  objBag.Broken_Weight_OUT = 0;

  objBag.Status = STATUS_TF_TRANS_01_CODE;
  objBag.statusName = STATUS_TF_TRANS_01_NAME;
  objBag.TotalWeightGoldCancel = "";
  objBag.AddGoldWeight = "";
  return objBag;
};
