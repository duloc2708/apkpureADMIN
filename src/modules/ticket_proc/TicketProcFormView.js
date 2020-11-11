import DetailCastingProcFormView from "./DetailCastingProcFormView";
import ListCastingProcFormView from "./ListCastingProcFormView";
const { Translate, I18n } = ReactReduxI18n;
import ToolbarFormView from "modules/toolbar/ToolbarFormView";
import * as toolbarActions from "modules/toolbar/actions/form";
import * as castingProcActions from "modules/ticket_proc/actions/form";
import BrackcrumFromView from "modules/brackcrum/BrackcrumFromView";
const {
  LIST_PROCESS_PREV_SPURE,
  STATUS_PROCESS_ACCEPT
} = require("./Constant");
const typeProcess = Helper.getParam(window.location.href, "type");

class TicketProcFormView extends React.Component {
  constructor() {
    super();
    this.state = {
      inputSearch: ""
    };
  }
  componentWillUnmount() {
    this.props.resetDataCastingProc();
  }
  _redirectCurrentPage(){
    const type = Helper.getParam(window.location.href, "type");
    const referId = Helper.getParam(window.location.href, "referId");
    if(referId){
      window.location.href = (window.location.pathname+'?type='+type);
    }

  }
  _validateSave() {
    let {
      objData,
      listBagSelected,
      isSave,
      objConfig
    } = this.props.ticket_proc;
    let {
      IsIncludeInOut,
      Code,
      WorkerInTicket,
      IsAllowProduct_NotSameGold,
      IsGoldTypeRequest
    } = objConfig;

    let type = null;
    let message = "";
    let strBag = "";

    // validate common
    // if (listBagSelected.length === 0) {
    //   message = `Vui lòng cập nhật danh sách Bag !`;
    //   type = 1;
    // }
    if (!objData.CodeLV && IsGoldTypeRequest==1) {
      message = `Vui lòng nhập loại vàng !`;
      type = 1;
    }
    // validate from SKELETON
    if (!type && typeProcess === "SKELETON") {
      // if (!objData.SkeletonWeight) {
      //   message = `Vui lòng cập nhật trọng lượng chân đế!`;
      //   type = 1;
      // }
      // if (!objData.Product_Skeleton_Weight) {
      //   (message = `Vui lòng cập nhật trọng lượng cây!`), (type = 1);
      // }
      // if (
      //   objData.SkeletonWeight &&
      //   objData.Product_Skeleton_Weight &&
      //   parseFloat(objData.SkeletonWeight) >=
      //     parseFloat(objData.Product_Skeleton_Weight)
      // ) {
      //   (message = `Trọng lượng chân đế phải nhỏ hơn trọng lượng cây!`),
      //     (type = 1);
      // }
      // if (objData.GoldWeight_Estimate <= 0) {
      //   message = `Trọng lượng ước tính phải > 0 !`;
      //   type = 1;
      // }
    }
    // validate from CASTING
    if (!type && typeProcess === "CASTING") {
      if (!objData.Gold_Weight_IN_T) {
        message = `Vui lòng cập nhật trọng lượng vàng vào !`;
        type = 1;
      }
      // if (
      //   objData.Gold_Weight_IN_T &&
      //   objData.Gold_Weight_IN_T < objData.GoldWeight_Estimate
      // ) {
      //   message = `Trọng lượng vàng vào chưa đủ !`;
      //   type = 1;
      // }
      // listBagSelected.forEach(bag => {
      //   if (!bag.Product_Weight_OUT) {
      //     type = 1;
      //     message = `Vui lòng cập nhật đầy đủ TL(Vàng+ Đá) bag ${bag.IdBag}!`;
      //     return false;
      //   }
      // });
      // if (objData.Gold_Lost_T <= 0) {
      //   message = `Hao hụt < 0, vui lòng kiểm tra lại !`;
      //   type = 1;
      // }
    }
    // validate begin spure  -> last
    // if (!type && LIST_PROCESS_PREV_SPURE.indexOf(typeProcess) === -1) {
    //   if (
    //     objData.Gold_Weight_IN_T &&
    //     objData.Gold_Weight_OUT_T &&
    //     objData.Gold_Weight_OUT_T > objData.Gold_Weight_IN_T
    //   ) {
    //     message = `Tổng trọng lượng vàng RA không thể lớn hơn VÀO !`;
    //     type = 1;
    //   }
    //   if (
    //     objData.Broken_Weight_OUT_T &&
    //     objData.Product_Weight_IN_T &&
    //     objData.Broken_Weight_OUT_T > objData.Product_Weight_IN_T
    //   ) {
    //     message = `Tổng trọng lượng sản phẩm RA không thể lớn hơn VÀO !`;
    //     type = 1;
    //   }
    // }

    listBagSelected = listBagSelected.filter(x => x.IdBag);

    if (!type) {
      listBagSelected.forEach(bag => {
        if (IsIncludeInOut != 0) {
          if (!bag.Product_Weight_IN || !bag.Product_Weight_OUT) {
            type = 2;
            message = "Vui lòng nhập đầy đủ trọng lượng";

            return false;
          }
          // if (bag.Product_Weight_IN > bag.Product_Weight_OUT) {
          //   type = 3;
          //   message = "Trọng lượng O phải lớn hớn I";
          //   return false;
          // }
        }
        if (WorkerInTicket == 2) {
          if (!bag.Worker) {
            strBag += bag.IdBag + ",";
            type = 5;
          }
        }
      });
    }
    // same product
    if (!type && IsAllowProduct_NotSameGold == 0) {
      const groupProductByOrder = _.chain(listBagSelected)
        .groupBy("strProducts")
        .map(function(v, i) {
          return {
            IdProduct: i,
            IdOrder: _.map(v, "IdOrder"),
            IdBag: _.map(v, "IdBag")
          };
        })
        .value();
      //Tam che
      // groupProductByOrder.forEach(group => {
      //   if (group.IdOrder.length > 1) {
      //     let itemIdOrder = "";
      //     group.IdOrder.forEach(item => {
      //       if (itemIdOrder && itemIdOrder != item) {
      //         type = 6;
      //         message = `Sản phẩm ${group.IdProduct} tồn tại trên bag (${group.IdBag.toString()})
      //         khác đơn hàng (${group.IdOrder.toString()})`;
      //       }
      //       itemIdOrder = item;
      //     });
      //   }
      // });
    }
    // require input Worker when config info detail
    if (!type && WorkerInTicket == 1 && !objData.Worker) {
      type = 4;
      message = "Vui lòng nhập thông tin Worker";
    }
    // require input Worker when config bag detail
    if (type == 5) {
      message = `Vui lòng nhập thông tin Worker các bag ${strBag}`;
    }
    if (type) {
      this.child._addNotification(message, "warning");
      return false;
    }
    return true;
  }

  ChangeButton(value) {
    let valueTemp = value;
    let isStatus = true;
    let { objData, listBagSelected, isSave } = this.props.ticket_proc;
    let { status } = this.props.toolbar;
    if (isSave) {
      alert("Dữ liệu hệ thống đang lưu, vui lòng đợi!");
    } else {
      switch (valueTemp) {
        case "PRINT":
          break;
        case "SAVE":
          if (status == "") {
            isStatus = false;
            break;
          }
          if (this._validateSave()) {
            if (status == "EDIT") {
              console.log('status',status)
              this.props.updateItem().then(res => {
                this.props.updateButtonToolbar("EDIT").then(() => {
                  this.child._addNotification(
                    "Cập nhật thành công!!!",
                    "success"
                  );
                  // this.props.addListProductByOrder()
                });
              });
            } else {
              this.props.addNewItem().then(res => {
                this.props.updateButtonToolbar("EDIT").then(() => {
                  this.child._addNotification(
                    "Cập nhật thành công!!!",
                    "success"
                  );
                  // this.props.addListProductByOrder()
                });
              });
            }
          } else {
            isStatus = false;
            break;
          }
          break;

        case "SAVEANDCLOSE":
          if (status == "") {
            isStatus = false;
            break;
          }
          if (this._validateSave()) {
            if (status == "EDIT") {
              console.log('status',status)
              this.props.updateItem().then(res => {
                this.props.updateButtonToolbar("").then(() => {
                  this.props.resetDataCastingProc().then(() => {
                    this.child._addNotification(
                      "Cập nhật thành công!!!",
                      "success"
                    );
                    this.props.getListDataTicketProc("");
                    this._redirectCurrentPage();
                  });
                });
              });
            } else {
              this.props.addNewItem().then(res => {
                this.props.updateButtonToolbar("").then(() => {
                  this.props.resetDataCastingProc().then(() => {
                    this.child._addNotification(
                      "Cập nhật thành công!!!",
                      "success"
                    );
                    this.props.getListDataTicketProc("");
                    this._redirectCurrentPage();
                  });
                });
              });
            }            
          } else {
            isStatus = false;
            break;
          }
          break;

         
        case "ADD":
          this.props.updateButtonToolbar(valueTemp);
          this.props.isEditCasting(true);
          this.props.initAddCastingProc();
          break;
        case "EDIT":
          if (objData.IDCasting) {
            this.props.isEditCasting(true);
            this.props.getDataDetailByCode();
            this.props.getDataDetailStoneByCode(objData.CodeTicket);
            this.props.updateButtonToolbar(valueTemp);
          } else {
            isStatus = false;
            this.child._addNotification(
              "Vui lòng chọn dòng cần sửa !!!",
              "warning"
            );
          }
          break;
        case "CANCEL":
          var r = confirm(`Bạn có muốn huỷ/thoát form này? `);
          if (r == true) {
            this.props.isEditCasting(false);
            this.props.updateButtonToolbar(valueTemp);
            this._redirectCurrentPage();
          } else {
            isStatus = false;
          }
          break;
        case "DELETE":
          // isStatus = false
          // if (objDataOrder && objDataOrder.IdOrder) {
          //     var r = confirm(I18n.t(`alert.delete`));
          //     if (r == true) {
          //         this.props.deleteItemOrder({ id: objDataOrder.IdOrder }).then(res => {
          //             this.child._addNotification('Xoá thành công', 'success')
          //             this.props.getListDataOrder()
          //         })
          //     }
          // } else {
          //     this.child._addNotification(I18n.t(`alert.please_select_delete`), 'warning')
          // }
          break;
        default:
          break;
      }
    }
  }
  _renderForm(isDetail, type) {
    if (isDetail) {
      return <DetailCastingProcFormView />;
    } else {
      return <ListCastingProcFormView parentObject={this} />;
    }
  }
  render() {
    let { isDetail } = this.props.ticket_proc;
    let { list_config_process } = this.props.header;
    const type = Helper.getParam(window.location.href, "type");
    let listReport = list_config_process.filter(x => x.Code == type);
    return (
      <div className="container">
        <AlertCustom onRef={ref => (this.child = ref)} />
        <section>
          <BrackcrumFromView
            title={`Quy trình ${(listReport[0] && listReport[0].Name) || ""}`}
          />
          <div className="main__content">
            <ToolbarFormView isPopup={true} parentObject={this} />
            {this._renderForm(isDetail, type)}
          </div>
        </section>
      </div>
    );
  }
}

// lấy ALL dữ liệu từ các reducer
const mapStateToProps = (
  { userAuth, i18n, ticket_proc, toolbar, header },
  ownProps
) => {
  return {
    userAuth,
    i18n,
    ownProps,
    ticket_proc,
    toolbar,
    header
  };
};
const mapDispatchToProps = dispatch => {
  return Redux.bindActionCreators(
    {
      ...ReactRouterRedux.routerActions,
      // ...userActions,
      // ...listActions,
      // ...productsActions,
      ...toolbarActions,
      ...castingProcActions
      // resetInfoPage
    },
    dispatch
  );
};
export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketProcFormView);
