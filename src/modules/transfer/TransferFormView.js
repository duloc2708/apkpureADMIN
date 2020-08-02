import DetailFormView from "./DetailFormView";
import CookDetailFormView from "./CookDetailFormView";

import ListFormView from "./ListFormView";
const { Translate, I18n } = ReactReduxI18n;
import ToolbarFormView from "modules/toolbar/ToolbarFormView";
import * as toolbarActions from "modules/toolbar/actions/form";
import * as transfer_Actions from "modules/transfer/actions/form";
import BrackcrumFromView from "modules/brackcrum/BrackcrumFromView";
const type = Helper.getParam(window.location.href, "type");

class TransferFormView extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    this.props.getListDataTransfer();
  }
  componentWillUnmount() {
    this.props.resetData();
  }
  _validateSave() {
    const { objData, list_data_gold } = this.props.transfer;
    const {
      keyMap,
      TransType,
      TransDesc,
      IdStore_From,
      IdStore_To,
      Status,
      DayConfirmF
    } = objData;
    let checktype = 0;

    if(type==0){
      if (checktype == 0 && !objData.TransType) checktype = 1;
      if (checktype == 0 && !objData.IdStore_From) checktype = 2;
      if (checktype == 0 && !objData.IdStore_To) checktype = 3;
      let checkMaxTF_Weight = list_data_gold.find(
        x => x.TF_Weight_From > x.TF_Weight
      );
      if (checktype == 0 && checkMaxTF_Weight) {
        checktype = 4;
      };
      if(checktype == 0 && objData.TransType=='TF_TYPE_02' ){
        if(!objData.TypeGoldWarm){
          checktype = 5;
        }
        if(!objData.TotalWeightAfterWarm){
          checktype = 6;
        };
        const sumTotalWeightAfterWarm=  list_data_gold.reduce((acc,item)=>{
          return acc+parseFloat(item.TF_Weight_To||0);
        },0);
        if(objData.TotalWeightAfterWarm>sumTotalWeightAfterWarm){
            checktype = 7;
        }
      }
      switch (checktype) {
        case 7:
          alert("TL vàng sau nấu phải nhỏ hơn hoặc bằng tổng TL vàng sau nấu chi tiết !");
          break;
        case 6:
          alert("Vui lòng nhập Tổng TL vàng sau nấu!");
          break;
        case 5:
          alert("Vui lòng nhập Loại vàng nấu!");
          break;
        case 1:
          alert("Vui lòng chọn loại!");
          break;
        case 2:
          alert("Vui lòng chọn từ kho");
          break;
        case 3:
          alert("Vui lòng chọn đến kho");
          break;
        case 4:
          alert(
            "TL vàng thực hiện chuyển kho hoặc thu hồi không được lớn hơn tồn kho"
          );
          break;
        default:
          break;
      }
      if ([1, 2, 3, 4,5, 6,7].indexOf(checktype) != -1) {
        return false;
      }
    }else {
      if (checktype == 0 && !objData.TypeGoldWarm) checktype = 2;
      if (checktype == 0 && !objData.TotalWeightAfterWarm) checktype = 3;
      switch (checktype) {
        case 2:
          alert("Vui lòng nhập Loại vàng nấu");
          break;
        case 3:
          alert("Vui lòng nhập TL vàng nhập kho");
          break;
        default:
          break;
      }
      if ([ 2, 3].indexOf(checktype) != -1) {
        return false;
      }
    }

    return true;
  }
  ChangeButton(value) {
    let valueTemp = value;
    let isStatus = true;
    let { objData, listProductSelected, isSave } = this.props.transfer;
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
              this.props.getNumberAuto().then(() => {
                this.props.addNewItem().then(res => {
                  this.props.updateButtonToolbar("EDIT").then(() => {
                    this.child._addNotification(
                      "Cập nhật thành công!!!",
                      "success"
                    );
                    // this.props.addListProductByOrder()
                  });
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
              this.props.updateItem().then(res => {
                this.props.updateButtonToolbar("").then(() => {
                  this.props.resetData().then(() => {
                    this.child._addNotification(
                      "Cập nhật thành công!!!",
                      "success"
                    );
                    this.props.getListDataTransfer("");
                  });
                });
              });
            } else {
              this.props.getNumberAuto().then(() => {
                this.props.addNewItem().then(res => {
                  this.props.updateButtonToolbar("").then(() => {
                    this.props.resetData().then(() => {
                      this.child._addNotification(
                        "Cập nhật thành công!!!",
                        "success"
                      );
                      this.props.getListDataTransfer("");
                    });
                  });
                });
              });
            }
          } else {
            isStatus = false;
            break;
          }
          break;

          break;
        case "ADD":
          this.props.updateButtonToolbar(valueTemp);
          this.props.isEditCasting(true);
          this.props.initAdd();
          break;
        case "CANCEL":
          var r = confirm(`Bạn có muốn huỷ/thoát form này? `);
          if (r == true) {
            this.props.clickCheckRowData(undefined, false)
            this.props.updateButtonToolbar(valueTemp);
            this.props.getListDataTransfer("");
          } else {
            isStatus = false;
          }
          break;
        case "DELETE":
          break;
        default:
          break;
      }
    }
  }
  render() {
    let { objData } = this.props.transfer;
    let { list_config_process } = this.props.header;
    const type = Helper.getParam(window.location.href, "type");
    return (
      <div className="container">
        <AlertCustom onRef={ref => (this.child = ref)} />
        <section>
          <BrackcrumFromView title={`Phiếu ${type==0?'chuyển kho':'nấu heo'}`} />
          <div className="main__content">
            <ToolbarFormView isPopup={true} parentObject={this} />
            {objData.keyMap ? (
              <div>
                {type==0?<DetailFormView />:<CookDetailFormView />}

              </div>

            ) : (
              <ListFormView parentObject={this} />
            )}
          </div>
        </section>
      </div>
    );
  }
}

// lấy ALL dữ liệu từ các reducer
const mapStateToProps = (
  { userAuth, i18n, transfer, toolbar, header },
  ownProps
) => {
  return {
    userAuth,
    i18n,
    ownProps,
    transfer,
    toolbar,
    header
  };
};
const mapDispatchToProps = dispatch => {
  return Redux.bindActionCreators(
    {
      ...ReactRouterRedux.routerActions,
      ...toolbarActions,
      ...transfer_Actions
    },
    dispatch
  );
};
export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(TransferFormView);
