import * as modalActions from "modules/modal/actions/form";
import * as dimmerActions from "modules/dimmer/actions/form";
import LoginFormView from "modules/login/LoginFormView";
import ToolbarFormView from "modules/toolbar/ToolbarFormView";
import BrackcrumFromView from "modules/brackcrum/BrackcrumFromView";
import * as castingProcActions from "modules/ticket_proc/actions/form";
import ModalStoneBrokenFormView from "./ModalStoneBrokenFormView";
import WaxSettingModalStoneFormView from "./WaxSettingModalStoneFormView";
import ListProductCancel from "./ListProductCancel";

const {
  LIST_PROCESS_PREV_SPURE,
  STATUS_PROCESS_ACCEPT,
  STATUS_PROCESS_FINISH,
  STATUS_TF_TRANS_01_CODE,
  STATUS_TF_TRANS_02_CODE,
  STATUS_TF_TRANS_04_CODE,
  FIELDS_MODAL
} = require("./Constant");
const { ASSIGN_WORKERS, BROKEN_STONES, CANCEL_PRODUCTS } = FIELDS_MODAL;
import Modal from "react-modal";
import { validateAddBag } from "./Util";

const typeProcess = Helper.getParam(window.location.href, "type");

const { Translate, I18n } = ReactReduxI18n;
const numPad = 9;
const customStyles = {
  content: {
    top: "52%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};
Modal.setAppElement("#app");

const CloseButton = () => <button>Close modal</button>;

class ListBag extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    $(":input[type='text']:enabled:visible:first").focus();

    $(document).ready(function() {
      $("#menuscontainer").blur(function() {
        alert("aaa");
      });
    });
  }

  _changeStatus(status) {
    this.setState({
      status: !status
    });
  }
  _checkClickRow(item) {
    // this.props.clickCheckRowTabStone(item)
  }
  _checkAllRow(value) {
    this.props.checkAllRow(!value);
  }
  _myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  ChangeValueCell(value) {
    this.props.updateCellBag(value);
  }
  _onRemove(item) {
    var r = confirm(I18n.t(`alert.delete`));
    if (r == true) {
      this.props.removeItemBag(item);
    }
  }
  ChangeValueCombobox(obj) {
    // if (obj.value == '' && obj.key == 'color') {
    //     obj.value = '005'
    // }
    // this.props.updateCellProducts(obj)
  }
  _onView(item) {
    this.props.getSetProduct(item.value);
    // $(".dropdown2").show(500)
  }
  checkImageExists(imageUrl, callBack) {
    var imageData = new Image();
    imageData.onload = function() {
      callBack(true);
    };
    imageData.onerror = function() {
      callBack(false);
    };
    imageData.src = imageUrl;
  }
  checkImage(imageSrc) {
    var img = new Image();
    try {
      let url = "http://stag.zzb8.co/images/logo.png?v=2.0";
      img.src = url;
      if (img.width == 0) {
        console.log("src>>>>>>>", img);

        return false;
      } else {
        return true;
      }
    } catch (err) {
      return false;
    }
  }
  _onKeyPressCheckBag(e, IdBag) {
    let that = this;
    if (e.key == "Enter") {
      let { isBlockSearch } = this.props.ticket_proc;
      // if (isBlockSearch) {
      //   return;
      // }
      let IdBagTemp =
        IdBag.length < numPad ? IdBag.padStart(numPad, "0") : IdBag;
      // cập nhật ID bag Mới
      let { id } = e.target;
      let obj = {
        id: id,
        value: IdBagTemp,
        key: "IdBag"
      };
      that.props.updateCellBag(obj).then(() => {
        let { listBagSelected, objConfig, objData } = this.props.ticket_proc;
        that.props.findBagDefault(IdBagTemp).then(data => {
          if (data.value == 0) {
            alert("Bag này không tìm thấy!");
            return;
          }
          let objReturn = data[0];
          if (objReturn.Msg != "OK") {
            alert(objReturn.Msg);
            return;
          }
          const objBagNew = validateAddBag(
            IdBagTemp,
            objData,
            objConfig,
            data,
            listBagSelected
          );
          if (objBagNew) {
            that.props.updateExistBag2(objBagNew).then(listBagSelected => {
              if (typeProcess === "WAX_SETTING") {
                that.props.getStonesByBag(objBagNew);
              }
              that._focusNextRow(listBagSelected.length);
            });
          }
        });
      });
    }
  }
  _focusNextRow(index) {
    setTimeout(() => {
      $(`#tr_${index}`)
        .find("input, textarea")[0]
        .focus();
    }, 200);
  }
  _addProduct(e) {
    let { objDataOrder, listProductsSelected } = this.props.order;
    if (e.key == "Enter") {
      let { objDataOrder } = this.props.order;
      this._funcAddProduct(listProductsSelected);
    }
  }
  _onButtonAddProduct(index) {
    let { objData, listBagSelected } = this.props.ticket_proc;
    if (!objData.CodeLV) {
      alert("Vui lòng chọn loại vàng!");
      return;
    }
    // if exists record new then don't insert again
    const existNew = listBagSelected.find(x => x.isNew);
    if (existNew) {
      return;
    }
    this.props.addItemBagNew();
  }
  _funcAddProduct(listProductsSelected) {
    this.props.addProduct();
    setTimeout(() => {
      $(`#tr_${listProductsSelected.length + 1}`)
        .find("input, textarea")[0]
        .focus();
    }, 200);
  }

  _onChangeSize(e) {
    let { id, value } = e.target;
    let obj = {
      id: id,
      value: value,
      key: "size"
    };
    this.props.updateCellProducts(obj);
  }
  ChangeValueComboboxMulti(obj) {
    let { key, data, type_code } = obj;
    let objData = {
      id: key,
      value: data,
      key: type_code
    };
    if (type_code == "IdBag") {
      this.props.updateCellBag(objData).then(() => {
        this.props.updateExistBagByProcess(objData);
      });
    } else {
      this.props.updateCellBag(objData);
    }
  }
  _onChangeProduct(e) {
    let { id, value } = e.target;
    if (value.length <= numPad) {
      let obj = {
        id: id,
        value: value,
        key: "IdBag"
      };
      this.props.updateCellBag(obj);
    }
  }
  onKeyPressInput(obj) {
    let { typeInput, index } = obj;
    if (typeInput == "sl") {
      $(`#tr_${orderby}`)
        .find("input, textarea")[2]
        .focus();
    }
  }
  checkSameProducts(e) {
    let isCheck = true,
      type = 0;
    let { listProductsSelected } = this.props.order;
    let listProductsSelected_temp = listProductsSelected;
    let productdup = "",
      colordup = "";
    if (listProductsSelected.length > 0) {
      listProductsSelected.map((item, i) => {
        let { value, color } = item;
        if (color == "000" || !color) {
          type = 1;
          return false;
        }
        let check = listProductsSelected_temp.filter(
          x => x.value == value && x.color == color
        );
        if (check.length > 1) {
          colordup = x.color;
          type = 2;
          return false;
        }
      });
    }
    switch (type) {
      // case 1:
      //     this.child._addNotification(I18n.t(`order.please_input_color`), 'warning')
      //     isCheck = false
      //     break;
      case 2:
        this.child._addNotification(
          I18n.t(`order.same_id_products`),
          "warning"
        );
        isCheck = false;
        break;
      default:
        break;
    }
    return isCheck;
  }
  handleClick() {}
  _ShowFormStone(type, item) {
    this.props.showFormStone(true);
    this.props.updateTypeInOut(type);
    this.props.updateBagDetail(item);
    // check if not exists list stone then get stone by BagId
    let { listStoneWaxset } = this.props.ticket_proc;
    const stones = listStoneWaxset.filter(x => x.IdBag === item.IdBag);
    if (stones.length === 0) {
      this.props.getListStoneWaxsetByIdBag(item.IdBag);
    }
  }
  _saveWeightStone() {
    this.child._addNotification("Cập nhật đá thành công!!!", "success");
    // this.props.saveWeightStone()
  }
  closeModal() {
    this.props.showFormStone(false);
  }
  _renderTotal(
    IsIncludeInOut,
    total_Waxset_Weight,
    total_Product_Weight_OUT,
    total_Broken_Weight_OUT,
    total_Gold_Weight_OUT,
    total_Product_Weight_IN,
    total_Broken_Weight_IN,
    total_Gold_Weight_IN
  ) {
    let colTotal = [];

    if (IsIncludeInOut != 0) {
      colTotal.push(
        <td></td>,
        <td></td>,
        <td></td>,
        <td></td>,
        <td></td>,
        <td></td>,
        <td>
          <b>Tổng TL đá waxset </b>: {Helper.round(total_Waxset_Weight, 4)}
        </td>,
        <td>
          <b>Tổng TL (vàng + đá) Trừ đá rớt(I) </b>:{" "}
          {Helper.round(total_Product_Weight_IN, 4)}
        </td>,
        <td>
          <b>Tổng TL đá rớt(I) </b>: {Helper.round(total_Broken_Weight_IN, 4)}{" "}
        </td>,
        <td>
          <b>Tổng TL vàng(I) </b>: {Helper.round(total_Gold_Weight_IN, 4)}{" "}
        </td>,
        <td>
          <b>Tổng TL (vàng + đá) Trừ đá rớt(O) </b>:{" "}
          {Helper.round(total_Product_Weight_OUT, 4)}{" "}
        </td>,
        <td>
          <b>Tổng TL đá rớt(O) </b>: {Helper.round(total_Broken_Weight_OUT, 4)}
        </td>,
        <td>
          <b>Tổng TL vàng(O) </b>: {Helper.round(total_Gold_Weight_OUT, 4)}{" "}
        </td>
      );
    } else {
      if (["SKELETON", "WAX_SETTING"].indexOf(typeProcess) === -1) {
        colTotal.push(
          <td></td>,
          <td></td>,
          <td></td>,
          <td></td>,
          <td></td>,
          <td>
            <b>Tổng TL đá waxset </b>: {Helper.round(total_Waxset_Weight, 4)}
          </td>,
          <td>
            <b>Tổng TL (vàng + đá) Trừ đá rớt </b>:{" "}
            {Helper.round(total_Product_Weight_OUT, 4)}{" "}
          </td>,
          <td>
            <b>Tổng TL đá rớt </b>: {Helper.round(total_Broken_Weight_OUT, 4)}
          </td>,
          <td>
            <b>Tổng TL vàng </b>: {Helper.round(total_Gold_Weight_OUT, 4)}{" "}
          </td>
        );
      } else {
        // trường hợp lên
        if (["SKELETON"].indexOf(typeProcess) === -1) {
          colTotal.push(<td></td>, <td></td>, <td></td>, <td></td>);
        }
        colTotal.push(
          <td></td>,
          <td></td>,
          <td></td>,
          <td></td>,
          <td></td>,
          <td>
            <b>Tổng TL đá waxset </b>: {Helper.round(total_Waxset_Weight, 4)}
          </td>
        );
      }
    }
    return colTotal;
  }
  _onChangeQtyCancel(e, item) {
    const { value, id } = e.target;
    if (parseInt(value || 0) > parseInt(item.Qty_Product_Remain || 0)) {
      this.child._addNotification("Số lượng còn lại không đủ!", "warning");
      return;
    }
    let obj = {
      id: id,
      value: value,
      key: "Qty_Product_Cancel"
    };
    this.props.updateCellBag(obj);
  }
  _onAccept(item, Status) {
    let { status } = this.props.toolbar;

    if (status === "ADD") {
      this.child._addNotification(
        "Vui lòng lưu phiếu trước khi huỷ sản phẩm",
        "warning"
      );
      return;
    }
    let { objData } = this.props.ticket_proc;
    let obj = {
      CodeTicket: item.CodeTicket,
      StatusValue: Status,
      IdBag: item.IdBag
    };
    this.props.validateTicket(obj).then(res => {
      const { data } = res.data;
      if (data && data[0]) {
        const result = data[0].OUTPUT;
        if (result == "ok") {
          let valid = false;
          if (
            [STATUS_TF_TRANS_02_CODE, STATUS_TF_TRANS_04_CODE].indexOf(
              item.Status
            ) === -1 &&
            Status == STATUS_TF_TRANS_02_CODE
          ) {
            var r = confirm(`Bạn cón muốn xác nhận đi?`);
            if (r == true) {
              valid = true;
            }
          } else if (
            item.Status === STATUS_TF_TRANS_02_CODE &&
            Status === STATUS_TF_TRANS_04_CODE
          ) {
            var r = confirm(`Bạn cón muốn xác nhận về ?`);
            if (r == true) {
              valid = true;
            }
          }
          if (valid) {
            this.props.acceptStatusBag(obj);
            this.props.getDataDetailByCode(item.CodeTicket);
            this.child._addNotification(`Xác nhận thành công`, "success");
          }
        } else {
          this.child._addNotification(result, "warning");
        }
      }
    });
  }
  _showTypeModal(type, item) {
    const { status } = this.props.toolbar;
    if (status == "ADD" && type == CANCEL_PRODUCTS) {
      this.child._addNotification(
        "Vui lòng lưu phiếu trước khi huỷ sản phẩm",
        "warning"
      );
      return;
    }
    this.props.showFormStone(true, type);
    this.props.updateBagDetail(item);
    let { listStoneWaxset } = this.props.ticket_proc;
    const stones = listStoneWaxset.filter(x => x.IdBag === item.IdBag);
    if (stones.length === 0) {
      this.props.getListStoneWaxsetByIdBag(item.IdBag);
    }
    this.props.getProductsByBag(item.IdBag);
  }
  _renderModal(type) {
    let data = [];
    switch (type) {
      case ASSIGN_WORKERS:
        data.push(<WaxSettingModalStoneFormView />);
        break;
      case BROKEN_STONES:
        data.push(<ModalStoneBrokenFormView />);
        break;
      case CANCEL_PRODUCTS:
        data.push(<ListProductCancel />);
        break;
    }
    return data;
  }
  _showTooltip(item) {
    this.props.updateActiveToolTipBag(item);
  }
  render() {
    let { status } = this.props.toolbar;
    let {
      listHeaderBag,
      listBagSelected,
      isEditProducts,
      isShowStone,
      objConfig,
      list_worker,
      list_bag_combobox,
      typeModal
    } = this.props.ticket_proc;
    let { objData } = this.props.ticket_proc;
    let totalmoney = 0;
    let totalgoldweight = 0;
    let totalmoneydiscount = 0;
    let {
      IsIncludeInOut,
      WorkerInTicket,
      PriorProcessName,
      IsIncludeHandset
    } = objConfig;
    IsIncludeInOut = 0;
    listBagSelected = _.orderBy(listBagSelected, "orderby", "asc");
    let total_Waxset_Weight = 0,
      total_Product_Weight_IN = 0,
      total_Broken_Weight_IN = 0,
      total_Gold_Weight_IN = 0,
      total_Product_Weight_OUT = 0,
      total_Broken_Weight_OUT = 0,
      total_Gold_Weight_OUT = 0;
    let isBlock =
      [STATUS_PROCESS_FINISH].indexOf(objData.Status) !== -1 ? true : false;
    if (
      objData.Status === STATUS_PROCESS_ACCEPT &&
      LIST_PROCESS_PREV_SPURE.indexOf(typeProcess) === -1
    ) {
      isBlock = false;
    }
    return (
      <div>
        <AlertCustom onRef={ref => (this.child = ref)} />
        <Modal
          isOpen={isShowStone}
          // onAfterOpen={() => this.afterOpenModal()}
          onRequestClose={() => this.closeModal()}
          style={customStyles}
          contentLabel="Example Modal"
          closeButton={CloseButton}
        >
          <div>
            <div style={{ textAlign: "right" }}>
              <button onClick={() => this.closeModal()}>Đóng</button>
            </div>
          </div>
          {this._renderModal(typeModal)}
        </Modal>
        {typeProcess !== "CASTING" ? (
          <button onClick={() => this._onButtonAddProduct()}>Thêm Bag</button>
        ) : (
          ""
        )}

        <table className="table table-striped">
          <thead>
            <tr>
              {listHeaderBag.map((item, i) => {
                let { key, title } = item;
                // if (WorkerInTicket != 2 && key == "WORKER") {
                //   return;
                // }
                return (
                  <th
                    style={{ textAlign: "left" }}
                    key={`thead_${key}`}
                    scope="col"
                  >
                    {title}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody id="table_product">
            {listBagSelected &&
              listBagSelected.map((item, i) => {
                let {
                  statusName,
                  index,
                  CodeProcess,
                  CodeTicket,
                  IdBag,
                  IdOrder,
                  ValueLV,
                  Notes,
                  Waxset_Weight,
                  Handset_Weight,
                  Product_Weight_IN,
                  Broken_Weight_IN,
                  Gold_Weight_IN,
                  Product_Weight_OUT,
                  Broken_Weight_OUT,
                  Gold_Weight_OUT,
                  Gold_Lost,
                  Worker,
                  orderby,
                  // DateOrder,
                  strProducts,
                  sumQtyProduct,
                  sumQtyStoneWaxset,
                  strWorkers,
                  Status,
                  statusBag,
                  isNew,
                  Qty_Product_Remain,
                  Qty_Product_Cancel,
                  Gold_Weight_Pay,
                  TotalWeightGoldCancel,
                  isActive
                } = item;
                total_Waxset_Weight = total_Waxset_Weight + Waxset_Weight;
                total_Product_Weight_IN =
                  total_Product_Weight_IN + Product_Weight_IN;
                total_Broken_Weight_IN =
                  total_Broken_Weight_IN + Broken_Weight_IN;
                total_Gold_Weight_IN = total_Gold_Weight_IN + Gold_Weight_IN;
                total_Product_Weight_OUT =
                  total_Product_Weight_OUT + Product_Weight_OUT;
                total_Broken_Weight_OUT =
                  total_Broken_Weight_OUT + Broken_Weight_OUT;
                total_Gold_Weight_OUT = total_Gold_Weight_OUT + Gold_Weight_OUT;

                let renderCols = [];
                renderCols.push(
                  <td>
                    <div>
                      <div style={{ float: "left", width: "90px" }}>
                        <input
                          onKeyDown={e => this._onKeyPressCheckBag(e, IdBag)}
                          readOnly={typeProcess == "CASTING" ? true : isBlock}
                          id={orderby}
                          className={`name form-control`}
                          type="text"
                          value={IdBag}
                          onChange={e => this._onChangeProduct(e)}
                          name="IdBag"
                        />
                      </div>
                      <div
                        style={{
                          float: "left",
                          width: "40px",
                          display: `${
                            typeProcess === "WAX_SETTING" ? "block" : "none"
                          }`
                        }}
                      >
                        <button
                          onClick={() =>
                            this._showTypeModal(
                              typeProcess === "WAX_SETTING"
                                ? ASSIGN_WORKERS
                                : BROKEN_STONES,
                              item
                            )
                          }
                        >
                          <i className="fa fa-edit" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                );

                if (IsIncludeInOut != 0) {
                  renderCols.push(
                    <td>
                      <Cell
                        readOnly={isBlock}
                        width="80px"
                        id={orderby}
                        value={Product_Weight_IN || ""}
                        className={`name form-control`}
                        keyInput="Product_Weight_IN"
                        parentObject={this}
                        name="Product_Weight_IN"
                      />
                    </td>,
                    <td>
                      <div>
                        <div style={{ float: "left", width: "70px" }}>
                          <Cell
                            readOnly={true}
                            width="70px"
                            id={orderby}
                            value={Helper.round(Broken_Weight_IN || "", 4)}
                            className={`name form-control`}
                            keyInput="Broken_Weight_IN"
                            parentObject={this}
                            name="Broken_Weight_IN"
                          />
                        </div>
                        <div style={{ float: "left", width: "40px" }}>
                          <button
                            onClick={() => this._ShowFormStone("IN", item)}
                          >
                            <i
                              className="fa fa-calculator"
                              aria-hidden="true"
                            ></i>
                          </button>
                        </div>
                      </div>
                    </td>,
                    <td>{Helper.round(Gold_Weight_IN || 0, 4) || ""}</td>
                  );
                }

                if (["SKELETON", "WAX_SETTING"].indexOf(typeProcess) === -1) {
                  renderCols.push(
                    <td>
                      <Cell
                        readOnly={isBlock}
                        width="90px"
                        id={orderby}
                        value={Product_Weight_OUT || ""}
                        className={`name form-control`}
                        keyInput="Product_Weight_OUT"
                        parentObject={this}
                        name="Product_Weight_OUT"
                      />
                    </td>,
                    <td>
                      <div style={{ float: "left", width: "120px" }}>
                        <div style={{ float: "left", width: "80px" }}>
                          <Cell
                            readOnly={true}
                            width="70px"
                            id={orderby}
                            value={Helper.round(Broken_Weight_OUT || 0, 4)}
                            className={`name form-control`}
                            keyInput="Broken_Weight_OUT"
                            parentObject={this}
                            name="Broken_Weight_OUT"
                          />
                        </div>
                        <div style={{ float: "left", width: "40px" }}>
                          <button
                            onClick={() =>
                              this._showTypeModal(BROKEN_STONES, item)
                            }
                          >
                            <i
                              className="fa fa-calculator"
                              aria-hidden="true"
                            ></i>
                          </button>
                        </div>
                      </div>
                    </td>,
                    <td>{Helper.round(Gold_Weight_IN || 0, 4) || ""}</td>,
                    <td>{Helper.round(Gold_Weight_OUT || 0, 4) || ""}</td>,
                    <td>
                      {WorkerInTicket == 2 ? (
                        <ComboboxMultiple
                          comboOther={"Worker"}
                          list_data_other={list_worker}
                          id={orderby}
                          value={Worker}
                          parentObject={this}
                        />
                      ) : (
                        ""
                      )}
                    </td>
                  );
                }
                if (["WAX_SETTING"].indexOf(typeProcess) !== -1) {
                  renderCols.push(
                    <td>{strProducts}</td>,
                    <td>{sumQtyProduct}</td>,
                    <td>{sumQtyStoneWaxset}</td>,
                    <td>{strWorkers}</td>,
                    <td>{statusBag}</td>
                  );
                }
                renderCols.push(
                  <td>{Helper.round(Waxset_Weight || 0, 4) || ""}</td>,
                  <td>
                    {IsIncludeHandset == 1
                      ? Helper.round(Handset_Weight || 0, 4) || ""
                      : ""}
                  </td>,
                  <td>{IdOrder}</td>
                  // <td>{moment.utc(DateOrder).format("DD/MM/YYYY")}</td>
                );
                if (["WAX_SETTING", "SKELETON"].indexOf(typeProcess) === -1) {
                  renderCols.push(<td>{TotalWeightGoldCancel}</td>);
                }
                renderCols.push(
                  <td>{statusName}</td>,
                  <td onClick={() => this._onRemove(item)}>
                    {!Status || Status == STATUS_TF_TRANS_01_CODE ? (
                      <button>
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                      </button>
                    ) : (
                      ""
                    )}
                  </td>
                );
                return (
                  <tr id="menuscontainer" key={`data_${i}`} id={`tr_${i + 1}`}>
                    <td>
                      <a
                        style={{ marginLeft: "10px" }}
                        onClick={() => this._showTooltip(item)}
                      >
                        <i className="fa fa-ellipsis-v"></i>
                      </a>
                      <div
                        className={`dropdown-menu dropdown-menu-right ${
                          isActive ? "show" : ""
                        }`}
                        x-placement="top-end"
                        style={{
                          width: "100px",
                          position: "absolute",
                          willChange: "transform",
                          top: `${50 * (i + 1)}px`,
                          left: "0px",
                          marginLeft: "40px",
                          paddingRight: "10px"
                        }}
                      >
                        <ul
                          style={{ float: "right", "list-style-type": "none" }}
                        >
                          <li>
                            <a
                              className="dropdown-item"
                              onClick={() =>
                                this._onAccept(item, STATUS_TF_TRANS_02_CODE)
                              }
                            >
                              <i className="fa fa-check" /> Xác nhận đi
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              onClick={() =>
                                this._onAccept(item, STATUS_TF_TRANS_04_CODE)
                              }
                            >
                              <i className="fa fa-check" /> Xác nhận về
                            </a>
                          </li>
                          <li>
                            <a
                              className="dropdown-item"
                              onClick={() =>
                                this._showTypeModal(CANCEL_PRODUCTS, item)
                              }
                            >
                              <i className="fa fa-trash-o m-r-5" /> Huỷ sản phẩm
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item">
                              <i className="fa fa-plus" /> Bổ sung casting
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                    {renderCols}
                  </tr>
                );
                // }
              })}
            <tr>
              {this._renderTotal(
                IsIncludeInOut,
                total_Waxset_Weight,
                total_Product_Weight_OUT,
                total_Broken_Weight_OUT,
                total_Gold_Weight_OUT,
                total_Product_Weight_IN,
                total_Broken_Weight_IN,
                total_Gold_Weight_IN
              )}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (
  { userAuth, i18n, header, ticket_proc, toolbar },
  ownProps
) => {
  return {
    userAuth,
    i18n,
    ownProps,
    header,
    ticket_proc,
    toolbar
  };
};
const mapDispatchToProps = dispatch => {
  return Redux.bindActionCreators(
    {
      ...ReactRouterRedux.routerActions,
      ...castingProcActions
    },
    dispatch
  );
};
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListBag);
