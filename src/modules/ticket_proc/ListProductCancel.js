import * as castingProcActions from "modules/ticket_proc/actions/form";
const { Translate, I18n } = ReactReduxI18n;
const { STATUS_PRODUCT_CANCEL, STATUS_PROCESS_FINISH } = require("./Constant");

class ListProductCancel extends React.Component {
  constructor() {
    super();
  }
  _onChangeInput(e, type, item) {
    let value = e.target.value;
    let obj = {
      id: e.target.id,
      key: type,
      value: value
    };
    if (type == "QtyCancelTemp" && parseFloat(value) > parseFloat(item.QtyRemainTemp)) {
      this.child._addNotification("Số lượng còn lại không đủ!", "warning");
      obj = {
        ...obj,
        value: ""
      };
    }
    if (type == "WeightGoldReturn" && parseFloat(item.QtyCancelTemp || 0) == 0) {
      this.child._addNotification("Vui lòng nhập số lượng huỷ!", "warning");
      obj = {
        ...obj,
        value: ""
      };
    }

    this.props.changeInputProductCancel(obj);
  }

  _onAccept(item) {
    let { status } = this.props.toolbar;
    let { itemDetail, listProductCancel } = this.props.ticket_proc;

    if (status === "ADD") {
      this.child._addNotification("Quy trình này chưa được tạo!", "warning");
      return;
    }

    if (
      parseFloat(item.QtyCancelTemp || 0) <= 0 ||
      parseFloat(item.WeightGoldReturn) <= 0
    ) {
      this.child._addNotification(
        "Vui lòng nhập Sl huỷ/TL Vàng Nhập Kho",
        "warning"
      );
      return;
    }

    let totalWeightGoldReturn = _.sumBy(listProductCancel, function(item) {
      return parseFloat(item.WeightGoldReturn || 0);
    });
    console.log('totalWeightGoldReturn>>>',totalWeightGoldReturn, itemDetail.Gold_Weight_IN_T)
    if (totalWeightGoldReturn > parseFloat(itemDetail.Gold_Weight_IN_T)) {
      this.child._addNotification(
        "Tổng TL Vàng Nhập Kho đang vượt TL Vàng Ra",
        "error"
      );
      return;
    }
    var r = confirm(`Bạn muốn xác nhận huỷ sản phẩm này!`);
    if (r == true) {
      let itemNew = item;
      itemNew.keyTicket = Helper.generateUUIDV4();
      this.props.updateProductCancel(itemNew).then(res => {
        this.props.updateItem().then(() => {
          this.props.acceptProductCancel(itemNew).then(() => {
            // clear stone weight waset
            this.props.getListStoneWaxsetByIdBag(itemNew.IdBag);
            this.child._addNotification("Xác nhận thành công", "success");
          });
        });
      });
    }
  }
  render() {
    let {
      objSearchGold,
      objData,
      objBagDetail,
      listProductCancel,
      listHeaderProductCancel
    } = this.props.ticket_proc;
    listProductCancel = listProductCancel.filter(
      x => x.IdBag == objBagDetail.IdBag
    );
    return (
      <div style={{ height: "350px" }}>
        <AlertCustom onRef={ref => (this.child = ref)} />
        <table className="table table-fixed">
          <thead>
            <tr>
              {listHeaderProductCancel.map((item, i) => {
                let { key, title, col } = item;
                return (
                  <th
                    className={`col-xs-${col}`}
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
            {listProductCancel &&
              listProductCancel.map((item, i) => {
                const {
                  orderby,
                  IdBag,
                  Color,
                  ColorName,
                  ColorParent,
                  IdProduct,
                  IdProductParent,
                  QtyRemain,
                  QtyCancelTemp,
                  WeightGoldReturn,
                  isConfirmed,
                  QtyRemainTemp
                } = item;
                const isBlock =
                  isConfirmed == 1 || objData.Status == STATUS_PROCESS_FINISH
                    ? true
                    : false;
                return (
                  <tr key={`data_${i}`} id={`tr_${i}`}>
                    <td className="col-xs-1">{i + 1}</td>
                    <td className="col-xs-2">{IdProduct}</td>
                    <td className="col-xs-1">{ColorName}</td>
                    <td className="col-xs-2">{QtyRemainTemp=== null? QtyRemain:QtyRemainTemp}</td>
                    <td className="col-xs-2">
                      <input
                        readOnly={isBlock}
                        onChange={e =>
                          this._onChangeInput(e, "QtyCancelTemp", item)
                        }
                        id={orderby}
                        className={`name form-control`}
                        type="text"
                        value={QtyCancelTemp}
                        name="QtyCancelTemp"
                      />
                    </td>
                    <td className="col-xs-2">
                      <input
                        readOnly={isBlock}
                        onChange={e =>
                          this._onChangeInput(e, "WeightGoldReturn", item)
                        }
                        id={orderby}
                        className={`name form-control`}
                        type="text"
                        value={WeightGoldReturn}
                        name="WeightGoldReturn"
                      />
                    </td>
                    <td className="col-xs-1">
                      {isBlock ? STATUS_PRODUCT_CANCEL : ""}
                    </td>
                    <td className="col-xs-1">
                      {isBlock ? (
                        ""
                      ) : (
                        <button onClick={() => this._onAccept(item)}>
                          <i className="fa fa-check" aria-hidden="true"></i>
                        </button>
                      )}
                    </td>
                  </tr>
                );
                // }
              })}
          </tbody>
        </table>
        <div style={{ float: "right" }}></div>
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
)(ListProductCancel);
