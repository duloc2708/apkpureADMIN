import * as modalActions from "modules/modal/actions/form";
import * as dimmerActions from "modules/dimmer/actions/form";
import LoginFormView from "modules/login/LoginFormView";
import ToolbarFormView from "modules/toolbar/ToolbarFormView";
import BrackcrumFromView from "modules/brackcrum/BrackcrumFromView";
import * as castingProcActions from "modules/ticket_proc_wax_setting/actions/form";
import WaxSettingModalStoneFormView from "./WaxSettingModalStoneFormView";
import Modal from "react-modal";
import {
  validateAddBag
} from "../ticket_proc/Util";
const {
  Translate,
  I18n
} = ReactReduxI18n;
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
class ListBag extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() { }
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
    imageData.onload = function () {
      callBack(true);
    };
    imageData.onerror = function () {
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
  _onKeyPressCheckBag(e, IdBag, index) {
    let that = this;
    if (e.key == "Enter") {
      let IdBagTemp =
        IdBag.length < numPad ? IdBag.padStart(numPad, "0") : IdBag;
      // cập nhật ID bag Mới
      let {
        id
      } = e.target;
      let obj = {
        id: id,
        value: IdBagTemp,
        key: "IdBag"
      };
      that.props.updateCellBag(obj).then(() => {
        const {
          listBagSelected,
          objDataOrder,
          list_products_by_baogia,
          objConfig,
          objData
        } = this.props.ticket_proc_wax_setting;

        const {
          list_bag_default
        } = this.props.ticket_proc;
        obj.IdBag = IdBagTemp;
        const objBag = validateAddBag(
          obj,
          objData,
          objConfig,
          list_bag_default,
          listBagSelected
        );
        if (objBag) {
          that.props.updateExistBagWaxSetting(objBag).then(() => {
            // focus bag tiếp theo
            that._onButtonAddProduct();
          });
        }

      });
    }
  }


  _addProduct(e) {
    let {
      objDataOrder,
      listProductsSelected
    } = this.props.order;
    if (e.key == "Enter") {
      let {
        objDataOrder
      } = this.props.order;
      this._funcAddProduct(listProductsSelected);
    }
  }
  _onButtonAddProduct() {
    let {
      objData
    } = this.props.ticket_proc_wax_setting;
    if (!objData.CodeLV) {
      alert("Vui lòng chọn loại vàng!");
      return false;
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
  _funcAddExistProduct(id, value) {
    let {
      list_products
    } = this.props.order;
    let list_products_temp = _.clone(list_products, true);
    let check = list_products_temp.filter(
      x => x.value.toUpperCase() === value.toUpperCase()
    );
    let filename = Config.API_URL_IMAGE + check[0].url_image;
    let that = this;
    this.checkImageExists(filename, function (existsImage) {
      if (existsImage == true) {
        that.props.addExistProduct(value);
        setTimeout(() => {
          setTimeout(() => {
            $(`#tr_${id + 1}`)
              .find("input, textarea")[1]
              .focus();
          }, 200);
          that.props.updateExistBag(check[0]);
        }, 200);
      } else {
        alert("Hình ảnh không tồn tại.");
      }
    });
  }

  _onChangeSize(e) {
    let {
      id,
      value
    } = e.target;
    let obj = {
      id: id,
      value: value,
      key: "size"
    };
    this.props.updateCellProducts(obj);
  }
  ChangeValueComboboxMulti(obj) {
    let {
      key,
      data,
      type_code
    } = obj;
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
    let {
      id,
      value
    } = e.target;
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
    let {
      typeInput,
      index
    } = obj;
    if (typeInput == "sl") {
      $(`#tr_${orderby}`)
        .find("input, textarea")[2]
        .focus();
    }
  }
  checkSameProducts(e) {
    let isCheck = true,
      type = 0;
    let {
      listProductsSelected
    } = this.props.order;
    let listProductsSelected_temp = listProductsSelected;
    let productdup = "",
      colordup = "";
    if (listProductsSelected.length > 0) {
      listProductsSelected.map((item, i) => {
        let {
          value,
          color
        } = item;
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
  handleClick() { }
  _ShowFormStone(item) {
    this.props.showFormStone(true);
    this.props.updateBagDetail(item);
  }
  _saveWeightStone() {
    let {
      listStoneWaxset
    } = this.props.ticket_proc_wax_setting;
    let checkType = 0;
    let message = "";
    listStoneWaxset.forEach(product => {
      if (!product.Worker) {
        checkType = 2;
        message = `Vui lòng chọn worker cho sản phẩm ${product.IdProduct}`;
        return false;
      }
      if (!product.QtyAssignProduct) {
        checkType = 3;
        message = `Vui lòng nhập số lượng cho sản phẩm ${product.IdProduct}`;
        return false;
      }

      let sum = 0;
      listStoneWaxset.forEach(productDetail => {
        if (product.IdGroup === productDetail.IdGroup) {
          sum = sum + productDetail.QtyAssignProduct;
        }
      });
      if (sum != product.QtyProduct) {
        checkType = 1;
        message = `Vui lòng nhập đủ số lượng gán đá của sản phẩm ${product.IdProduct}`;
        return false;
      }
    });

    if (checkType != 0) {
      this.child._addNotification(message, "warning");
    } else {
      this.child._addNotification("Cập nhật đá thành công!!!", "success");
    }
  }
  closeModal() {
    this.props.showFormStone(false);
  }
  changeKeyCode(value, e) {
    let that = this;


    if (value == "ALT_UP") {
      const lastTabIndex = $("table tr:last").attr("tabIndex");
      if (e.target.tabIndex == lastTabIndex) {
        $("tr[tabindex=1]").focus();
      } else {
        const tabIndexNext = e.target.tabIndex - 1;
        if (lastTabIndex == e.target.tabIndex) {
          $(`tr[tabindex=${1}]`).focus();
        } else {
          $(`tr[tabindex=${tabIndexNext}]`).focus();
        }
      }
      setTimeout(() => {
        $(window).scrollTop(0);
      }, 100);
    }
    // alt + arrow down
    if (value == "ALT_DOWN") {
      if (e.target.tabIndex == "CodeTicket") {
        $("tr[tabindex=1]").focus();
      } else {
        const tabIndexNext = e.target.tabIndex + 1;
        const lastTabIndex = $("table tr:last").attr("tabIndex");
        if (lastTabIndex == e.target.tabIndex) {
          $(`tr[tabindex=${1}]`).focus();
        } else {
          $(`tr[tabindex=${tabIndexNext}]`).focus();
        }
      }
      setTimeout(() => {
        $(window).scrollTop(0);
      }, 100);
    }
    // khi edit bag  alt+e
    if (value == "ALT_E") {
      const {
        listBagSelected
      } = that.props.ticket_proc_wax_setting;
      const getItem = listBagSelected.find(
        x => x.IdBag == e.target.getAttribute("id")
      );
      if (getItem) that._ShowFormStone(getItem);
    }

    // khi xoá bag  alt+d
    if (value == "ALT_D") {
      const {
        listBagSelected
      } = that.props.ticket_proc_wax_setting;

      const getItem = listBagSelected.find(
        x => x.IdBag == e.target.getAttribute("id")
      );
      if (getItem) that._onRemove(getItem);
    }
    // khi đóng popup đá alt+c
    if (value == "ALT_C") {
      that.props.showFormStone(false);
    }
  }
  render() {
    let {
      status
    } = this.props.toolbar;
    let {
      listHeaderBagWaxSetting,
      listBagSelected,
      isEditProducts,
      isShowStone,
      objConfig,
      list_worker,
      list_bag_combobox
    } = this.props.ticket_proc_wax_setting;
    let {
      objData
    } = this.props.ticket_proc_wax_setting;
    let totalmoney = 0;
    let totalgoldweight = 0;
    let totalmoneydiscount = 0;
    let {
      IsIncludeInOut,
      WorkerInTicket,
      PriorProcessName
    } = objConfig;
    listBagSelected = _.orderBy(listBagSelected, "index", "desc");
    let total_Waxset_Weight = 0,
      total_Product_Weight_IN = 0,
      total_Broken_Weight_IN = 0,
      total_Gold_Weight_IN = 0,
      total_Product_Weight_OUT = 0,
      total_Broken_Weight_OUT = 0,
      total_Gold_Weight_OUT = 0;
    return (
      <div>
        <AlertCustom onRef={ref => (this.child = ref)} />
        <ConfigKeyCode parentObject={this} />
        <Modal
          isOpen={isShowStone}
          // onAfterOpen={() => this.afterOpenModal()}
          // onRequestClose={() => this.closeModal()}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div>
            <div style={{ textAlign: "right" }}>
              {/* <button onClick={() => this._saveWeightStone()}>Lưu</button> */}
              <button onClick={() => this.closeModal()}>Đóng</button>
            </div>
          </div>
          <WaxSettingModalStoneFormView />
          <hr />
        </Modal>
        <button onClick={() => this._onButtonAddProduct()}>Thêm bag</button>
        <table className="table table-striped">
          <thead>
            <tr>
              {listHeaderBagWaxSetting.map((item, i) => {
                let { key, title } = item;
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
                  index,
                  CodeProcess,
                  CodeTicket,
                  IdBag,
                  IdOrder,
                  ValueLV,
                  Notes,
                  Gold_Lost,
                  Worker,
                  orderby,
                  strProducts,
                  sumQtyProduct,
                  sumQtyStoneWaxset,
                  strWorkers,
                  statusBag
                } = item;
                return (
                  <tr key={`data_${i}`} id={IdBag} tabIndex={i + 1}>
                    <td>{i + 1}</td>

                    <td style={{ width: `150px` }}>
                      <div>
                        <div style={{ float: "left", width: "110px" }}>
                          <input
                            onKeyDown={e =>
                              this._onKeyPressCheckBag(e, IdBag, index)
                            }
                            // readOnly={isEditProducts == 'block' ? true : IdBag}
                            id={orderby}
                            className={`name form-control`}
                            type="text"
                            value={IdBag}
                            onChange={e => this._onChangeProduct(e)}
                            name="IdBag"
                          />
                        </div>
                        <div style={{ float: "left", width: "40px" }}>
                          <button onClick={() => this._ShowFormStone(item)}>
                            <i className="fa fa-edit" aria-hidden="true"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>{strProducts}</td>
                    <td>{sumQtyProduct}</td>
                    <td>{sumQtyStoneWaxset}</td>
                    <td>{strWorkers}</td>
                    <td>{IdOrder}</td>
                    <td>{statusBag}</td>
                    <td onClick={() => this._onRemove(item)}>
                      <button>
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                );
                // }
              })}
          </tbody>
        </table>

      </div>
    );
  }
}

const mapStateToProps = (
  { userAuth, i18n, header, ticket_proc_wax_setting, ticket_proc, toolbar },
  ownProps
) => {
  return {
    userAuth,
    i18n,
    ownProps,
    header,
    ticket_proc_wax_setting,
    toolbar,
    ticket_proc
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
