import * as modalActions from "modules/modal/actions/form";
import * as dimmerActions from "modules/dimmer/actions/form";
import LoginFormView from "modules/login/LoginFormView";
import ToolbarFormView from "modules/toolbar/ToolbarFormView";
import BrackcrumFromView from "modules/brackcrum/BrackcrumFromView";
import * as castingProcActions from "modules/ticket_proc/actions/form";
const { Translate, I18n } = ReactReduxI18n;
class ModalStoneBrokenFormView extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  _changeStatus(status) {
    this.setState({ status: !status });
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

  ChangeValueCell(obj) {
    if (obj.key == "BrokenQty") {
      // let { listStoneWaxset } = this.props.ticket_proc;
      // let find = listStoneWaxset.find(x => x.orderby === obj.id);
      // if (parseInt(obj.value) > find.QtyStonePcs) {
      //   this.child._addNotification(
      //     `Số lượng đá rớt phải nhỏ hơn số lượng đá !`,
      //     "error"
      //   );
      //   return false;
      // }
      this.props.updateCellBrokenQty(obj);
    }
  }
  _onRemove(item) {
    var r = confirm(I18n.t(`alert.delete`));
    if (r == true) {
      this.props.removeItemStone(item);
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
      let {
        list_bag_default,
        objDataOrder,
        list_products_by_baogia
      } = this.props.ticket_proc;
      let list_bag_default_temp = _.clone(list_bag_default, true);
      let check = list_bag_default_temp.filter(
        x => x.Id.toUpperCase() === IdBag.toUpperCase()
      );
      if (check.length == 0) {
        alert("Bag này không tồn tại!.");
      } else {
        setTimeout(() => {
          $(`#tr_${index}`)
            .find("input, textarea")[1]
            .focus();
        }, 200);
        that.props.updateExistBag(check[0]);
      }
    }
  }
  _addProduct(e) {
    let { objDataOrder, listProductsSelected } = this.props.order;
    if (e.key == "Enter") {
      let { objDataOrder } = this.props.order;
      this._funcAddProduct(listProductsSelected);
    }
  }
  _onButtonAddProduct(index) {
    let {
      objDataOrder,
      listProductsSelected,
      isEditProducts,
      list_products_by_baogia
    } = this.props.order;
    let { status } = this.props.toolbar;
    if (!objDataOrder.IdCustomer) {
      alert("Vui lòng chọn khách hàng");
      return;
    }
    if (!objDataOrder.CodeBaoGia) {
      alert("Vui lòng chọn bảng giá");
      return;
    }
    this._funcAddProduct(listProductsSelected);
    if (list_products_by_baogia.length == 0) {
      this.props.getListProductsByPrice(objDataOrder.CodeBaoGia);
    }
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
    let { list_products } = this.props.order;
    let list_products_temp = _.clone(list_products, true);
    let check = list_products_temp.filter(
      x => x.value.toUpperCase() === value.toUpperCase()
    );
    let filename = Config.API_URL_IMAGE + check[0].url_image;
    let that = this;
    this.checkImageExists(filename, function(existsImage) {
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
    let { id, value } = e.target;
    let obj = {
      id: id,
      value: value,
      key: "size"
    };
    this.props.updateCellProducts(obj);
  }
  _onChangeProduct(e) {
    let { id, value } = e.target;
    let obj = {
      id: id,
      value: value,
      key: "IDBag"
    };
    this.props.updateCellBag(obj);
  }
  onKeyPressInput(obj) {
    let { typeInput, index } = obj;
    if (typeInput == "sl") {
      $(`#tr_${index}`)
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
  ChangeValueComboboxMulti(obj) {
    let { key, data } = obj;
    let objData = {
      id: key,
      value: data,
      key: "Worker"
    };
    this.props.updateCellWorkerInStone(objData);
  }
  _onChangeQty(e, item) {
    let value = e.target.value;
    let obj = {
      key: "BrokenQty",
      id: e.target.id,
      value: value
    };
    if (parseInt(value || 0) > item.QtyStonePcs) {
      this.child._addNotification(
        `Số lượng đá rớt phải nhỏ hơn số lượng đá !`,
        "error"
      );
      return;
    }
    this.props.updateCellBrokenQty(obj);
  }
  _onChangeValueProduct(e) {
    this.props.changeProductSearch({
      IdProduct: e.target.value
    });
  }
  render() {
    let {
      listHeaderModalStoneBroken,
      listStoneWaxset,
      objBagDetail,
      typeInOut,
      list_worker,
      objConfig,
      objSearchProduct
    } = this.props.ticket_proc;
    let listStoneWaxsetFilter = listStoneWaxset.filter(
      x => x.IdBag == objBagDetail.IdBag && x.INOUT === typeInOut
    );
    let totalWeightBroken = 0;
    let { WorkerInTicket } = objConfig;

    if (objSearchProduct.IdProduct) {
      listStoneWaxsetFilter = listStoneWaxset.filter(
        x => x.IdProduct.indexOf(objSearchProduct.IdProduct)!==-1
      );
    }
    return (
      <div style={{ height: "350px" }}>
        <AlertCustom onRef={ref => (this.child = ref)} />
        <div className="row">
          <div className="col-md-3">
            <input
              onChange={e => this._onChangeValueProduct(e)}
              placeholder="Tìm kiếm ..."
              className="name form-control"
              type="text"
              value={objSearchProduct.IdProduct}
              id="IdProduct"
              name="IdProduct"
            />
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              {listHeaderModalStoneBroken.map((item, i) => {
                let { key, title } = item;
                if (key == "WORKER" && WorkerInTicket != -3) {
                  return;
                }
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
            {listStoneWaxsetFilter &&
              listStoneWaxsetFilter.map((item, i) => {
                let {
                  orderby,
                  Id,
                  INOUT,
                  IdTicket,
                  IdTicketDetail,
                  CodeProcess,
                  CodeTicket,
                  IdBag,
                  IdOrder,
                  IdProduct,
                  IdProductParent,
                  IdStone,
                  Color,
                  ColorName,
                  QtyProduct,
                  QtyStonePcs,
                  QtyStone,
                  AvgStone,
                  WeightPerQty,
                  BrokenQty,
                  BrokenWeight,
                  BrokenRate,
                  Worker,
                  isColor,
                  ColorParent,
                  ColorParentName,
                  ColorB
                } = item;
                totalWeightBroken = totalWeightBroken + BrokenWeight;
                console.log(isColor)
                return (
                  <tr
                    key={`data_${i}`}
                    id={`tr_${orderby}`}
                    style={{ "backgroundColor": `${ColorB? ColorB : ""}`}}
                  >
                    <td>{i + 1}</td>
                    <td>{IdBag}</td>
                    <td>{IdOrder}</td>
                    <td>{IdProduct}</td>
                    <td>{ColorParentName}</td>
                    <td>{IdStone}</td>
                    <td>{ColorName}</td>
                    {/* <Cell readOnly={blockInput} id={index} value={Qty} width="50px" keyInput="Qty" parentObject={this} /> */}
                    <input
                      onChange={e => this._onChangeQty(e, item)}
                      id={orderby}
                      className={`name form-control`}
                      type="text"
                      value={BrokenQty}
                      name="BrokenQty"
                    />
                    <td>{Helper.round(BrokenWeight, 4)}</td>
                    <td>{AvgStone}</td>
                    <td>{QtyStonePcs}</td>
                    <td>{Helper.round(BrokenRate, 2)}%</td>
                    <td>
                      {WorkerInTicket === 3 ? (
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
                  </tr>
                );
                // }
              })}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <b>Tổng TL đá rớt : {Helper.round(totalWeightBroken, 4)}</b>
              </td>
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
export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalStoneBrokenFormView);
