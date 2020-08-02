import * as userActions from "modules/login/actions/form";
import * as modalActions from "modules/modal/actions/form";
import * as dimmerActions from "modules/dimmer/actions/form";
import LoginFormView from "modules/login/LoginFormView";
import ToolbarFormView from "modules/toolbar/ToolbarFormView";
import BrackcrumFromView from "modules/brackcrum/BrackcrumFromView";
import * as customerActions from "modules/customer/actions/form";
import * as toolbarActions from "modules/toolbar/actions/form";
import * as commonActions from "modules/common/actions/form";
import { getListDataBaoGia } from "modules/baogia/actions/form";

import Select from "react-select";
import "react-select/dist/react-select.css";
const { Translate, I18n } = ReactReduxI18n;
class TabConfigFormView extends React.Component {
  constructor() {
    super();
    this.state = {
      listTab: [
        { key: "tab1", title: "Thông tin khách hàng" },
        // { key: "tab2", title: "Danh sách khuôn" },
        { key: "tab3", title: "Thông tin cấu hình" }
      ],
      tab: "tab1"
    };
  }
  _clearInput() {
    let { objData } = this.props.customer;
    let objData_temp = _.clone(objData, true);
    Object.keys(objData_temp).forEach(function(key) {
      objData_temp[key] = "";
    });
    this.props.clearInputStone(objData_temp);
  }

  componentDidMount() {}
  _loadData() {
    this.props.getListDataCustomer();
  }
  ChangeButton(value) {
    let value_temp = value;
    let isStatus = true;
    let { objData } = this.props.customer;
    let { status } = this.props.toolbar;

    switch (value_temp) {
      case "ADD":
        this._clearInput();
        break;
      case "SAVE":
        if (status == "") {
          isStatus = false;
          break;
        }
        if (this._checkValidate()) {
          if (status == "EDIT") {
            this.props.updateItemCustomer().then(res => {
              value_temp = "";
              this.child._addNotification(`Update thành công`, "success");
              this._loadData();
            });
          } else {
            this.props
              .checkCodeExistsByTable({
                field: "Code",
                value: objData.Code,
                table: "CUSTOMER"
              })
              .then(res => {
                let { value } = res.data.data;
                if (value == 1) {
                  this.child._addNotification(
                    I18n.t(`list.exist_params`),
                    "warning"
                  );
                  isStatus = false;
                } else {
                  this.props.addNewItemCustomer().then(res => {
                    value_temp = "";
                    this.child._addNotification(`Insert thành công`, "success");
                    this._clearInput();
                    this._loadData();
                  });
                }
              });
          }
        } else {
          isStatus = false;
        }
        break;
      case "SAVEANDCLOSE":
        if (status == "") {
          isStatus = false;
          break;
        }
        if (this._checkValidate()) {
          if (status == "EDIT") {
            this.props.updateItemCustomer().then(res => {
              value_temp = "";
              this.child._addNotification(`Update thành công`, "success");
              this._loadData();
            });
          } else {
            this.props
              .checkCodeExistsByTable({
                field: "Code",
                value: objData.Code,
                table: "CUSTOMER"
              })
              .then(res => {
                let { value } = res.data.data;
                if (value == 1) {
                  this.child._addNotification(
                    I18n.t(`list.exist_params`),
                    "warning"
                  );
                  isStatus = false;
                } else {
                  this.props.addNewItemCustomer().then(res => {
                    value_temp = "";
                    this.child._addNotification(`Insert thành công`, "success");
                    this._clearInput();
                    this._loadData();
                  });
                }
              });
          }
        } else {
          isStatus = false;
        }

        break;
      case "EDIT":
        if (!objData.Id) {
          isStatus = false;
          this.child._addNotification(
            I18n.t(`alert.please_select_rows`),
            "warning"
          );
        }
        break;
      case "DELETE":
        var txt;
        var r = confirm(I18n.t(`alert.delete`));
        if (r == true) {
          this._deleteItem();
        } else {
          isStatus = false;
        }
        value_temp = "";
        break;
      default:
        value_temp = "";
        break;
    }
    setTimeout(() => {
      if (isStatus) this.props.updateButtonToolbar(value_temp);
    }, 200);
  }
  _deleteItem() {
    let { allChecked, objData } = this.props.customer;
    if (!allChecked) {
      this.props.deleteItemCustomer({ id: objData.Id }).then(res => {
        this.child._addNotification(`Xoá thành công`, "success");
        this._loadData();
      });
    } else {
      this.props.deleteAllItemCustomer().then(res => {
        this.child._addNotification(`Xoá thành công`, "success");
        this._loadData();
      });
    }
    this._clearInput();
  }
  _checkValidate() {
    let result = true;
    let temp = "";
    let { fieldValidateStone, objData } = this.props.customer;
    let key_validate = "";
    fieldValidateStone.map(item => {
      if (!objData[item.key]) {
        if (!key_validate) {
          key_validate = item.key;
        }
        temp = temp + item.Des + ",";
      }
    });
    if (temp) {
      result = false;
      this.child._addNotification(
        `vui lòng nhập ${temp.substring(0, temp.length - 1)}`,
        "warning"
      );
      $(`#${key_validate}`).focus();
    }
    return result;
  }
  _addNewItem() {
    if (this._checkValidate()) {
      this.props.addNewItemCustomer().then(res => {
        this.child._addNotification(`Insert thành công`, "success");
        this._clearInput();
        this._loadData();
      });
    }
  }

  _onClickRow(item) {
    let { status } = this.props.toolbar;
    if (status == "" || status == "CANCEL") {
      this.props.clickCheckRowStone(item);
    }
  }
  _handleInput(e) {
    let { id, value } = e.target;
    let { objData } = this.props.customer;
    objData[id] = value;
    this.props.updateInputItem(objData);
  }
  _handleInputConfig(e) {
    let { id, value } = e.target;
    let { objDataConfig } = this.props.customer;
    objDataConfig[id] = value;
    this.props.updateInputItemConfig(objDataConfig);
  }
  _changeStatus(status) {
    this.setState({ status: !status });
  }
  _checkClickRow(item) {
    this.props.clickCheckRow(item);
  }
  _checkClickRowConfig(item) {
    this.props.clickCheckRowConfig(item);
  }
  _checkAllRowCustomer(value) {
    this.props.checkAllRowCustomer(!value);
  }
  _renderPage(page) {
    let data = [];
    for (var i = 1; i <= 10; i++) {
      data.push(
        <li
          key={`page_${i}`}
          className={`page-item ${i == page ? "active" : ""}`}
        >
          <a className={`page-link`} onClick={e => this._onChangePage(e)}>
            {i}
          </a>
        </li>
      );
    }
    return data;
  }
  ChangeValueCombobox(obj) {
    let { id, value } = obj;
    let { objData } = this.props.customer;
    objData[id] = value;
    this.props.updateInputItem(objData);
  }

  ChangeValueComboboxMulti(obj) {
    console.log("obj>>", obj);
    let { key, data } = obj;
    if (
      [
        "CodeLV",
        "CodeLH",
        "CodeMX",
        "CodeLAI",
        "CodeBaoGia",
        "IdCustomer",
        "IsApply",
        "DPCode"
      ].indexOf(key) != -1
    ) {
      let { objDataConfig, list_dpolicy } = this.props.customer;
      objDataConfig[key] = data;
      this.props.updateInputItemConfig(objDataConfig);
      if (key == "IdCustomer") {
        this.props.getListCustomerConfig(data);
      }
      if (key == "CodeLAI") {
        if (["0", "1"].indexOf(data) !== -1) {
          let objDpolicy = list_dpolicy.find(x => x.DType == data);
          objDataConfig["DPCode"] = objDpolicy.code;
          this.props.updateInputItemConfig(objDataConfig);
        }else{
          objDataConfig["DPCode"] = '';
          this.props.updateInputItemConfig(objDataConfig);
      }
      }
    } else {
      let { objData } = this.props.customer;
      objData[key] = data;
      this.props.updateInputItem(objData);
    }
  }
  ConvertCodeToNameList(value, code) {
    let { list_data_all } = this.props.list;
    let data = [],
      data_temp = [],
      result = "";
    if (list_data_all) {
      data_temp =
        list_data_all && list_data_all.filter(x => x.type_code === code);
    }
    data_temp.map(item => {
      if (value) {
        let arr_parse_value = value.split(",");
        arr_parse_value.map(item_parse => {
          if (item_parse == item.code) {
            result = result + item.name + ", ";
          }
        });
      }
    });

    if (result) result = result.substring(0, result.length - 2);
    return result;
  }
  ConvertBaogiaCodeToNameList(value) {
    let { list_data_baogia } = this.props.customer;
    let list_data_baogia_parse = list_data_baogia;
    let list_data_all = list_data_baogia;
    let data = [],
      data_temp = [],
      result = "";
    if (list_data_all) {
      data_temp = list_data_baogia;
    }
    data_temp.map(item => {
      if (value) {
        let arr_parse_value = value.split(",");
        arr_parse_value.map(item_parse => {
          if (item_parse == item.Pricecode) {
            result = result + item.Pricename + ", ";
          }
        });
      }
    });
    if (result) result = result.substring(0, result.length - 2);
    return result;
  }
  _onFilterData(e, code) {
    this.props.updateValueFilterHeaderCustomer({
      code: code,
      value: e.target.value
    });
  }
  _onKeyDown(e, key) {
    if (e.charCode == 13) {
      let params = {
        page: 1,
        total: 500,
        key: key,
        value: e.target.value
      };
      this.props.getListDataCustomerSearch(params);
    }
  }
  _onNext(obj) {
    this.props.getListDataCustomer(obj.params);
  }
  _onPrevious(obj) {
    this.props.getListDataCustomer(obj.params);
  }
  _onChangePage(obj) {
    this.props.getListDataCustomer(obj.params);
  }
  _parseDataComboBaoGia(data) {
    let arr_data = [];
    data.map(item => {
      let { Pricename, Pricecode } = item;
      arr_data.push({
        value: Pricecode,
        code: Pricecode,
        label: Pricename,
        name: Pricename
      });
    });
    return arr_data;
  }
  _parseDataComboCustomer(data) {
    let arr_data = [];
    data.map(item => {
      let { Name, Code } = item;
      arr_data.push({
        value: Code,
        code: Code,
        label: Code,
        name: Code
      });
    });
    return arr_data;
  }
  _changeTab(key) {
    this.setState({ tab: key });
  }
  _loadConfig() {
    let { objDataConfig } = this.props.customer;
    this.props.getListCustomerConfig(objDataConfig.IdCustomer);
  }
  _onRemove(item) {
    this.props.removeConfig(item).then(() => {
      this.child._addNotification(`Cập nhật thành công`, "success");
      this._loadConfig();
    });
  }
  _addConfig() {
    this.props.addConfig();
  }
  _validateConfig() {
    let { listCustomerConfig, objDataConfig } = this.props.customer;
    let type = 0;
    // listCustomerConfig.forEach(item => {
    //   if (!objDataConfig.ID && item.CodeLV === objDataConfig.CodeLV) {
    //     type = 1;
    //     return;
    //   }
    // });
    // if (type == 1) {
    //   this.child._addNotification(`Loại vàng bị trùng!`, "warning");
    //   return false;
    // }
    return true;
  }
  _saveConfig() {
    let { objDataConfig, listCustomerConfig } = this.props.customer;
    if (!objDataConfig.IdCustomer) {
      this.child._addNotification(`Vui lòng chọn khách hàng`, "warning");
      return;
    }
    if (!this._validateConfig()) {
      return;
    }
    this.props.saveCustomerConfig().then(() => {
      this.child._addNotification(`Cập nhật thành công`, "success");
      this._loadConfig();
    });
  }
  _change_ConfigStatus(value) {
    let { objDataConfig } = this.props.customer;
    let objDataNew = _.clone(objDataConfig, true);
    objDataNew["IsApply"] = value;
    console.log("objDataNew>>", objDataNew);
    this.props.updateInputItemConfig(objDataNew);
  }
  render() {
    let { listTab, tab } = this.state;
    let {
      list_data,
      allChecked,
      listHeaderTable,
      page,
      list_user,
      listHeaderTableTab2,
      list_data_baogia,
      listCustomerConfig,
      objDataConfig,
      list_data_customer_combo,
      list_dpolicy
    } = this.props.customer;
    let {
      Id,
      Code,
      Name,
      Address,
      Phone,
      IdentifyCardNumber,
      SaleMan,
      Province,
      Limit_Cash,
      Limit_Gold,
      DueDayNum,
      DueDayNum4Gold,
      Status
    } = this.props.customer.objData;
    let {
      CodeLH,
      CodeMX,
      CodeLAI,
      CodeLV,
      CodeBaoGia,
      Discount,
      IdCustomer,
      IsApply,
      DPCode
    } = objDataConfig;
    let list_data_baogia_parse = this._parseDataComboBaoGia(list_data_baogia);
    let list_data_customer_parse = this._parseDataComboCustomer(
      list_data_customer_combo
    );
    return (
      <div>
        <AlertCustom onRef={ref => (this.child = ref)} />
        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <div className="left">
                <label htmlFor="name">Khách hàng</label>
              </div>
              <div className="right" style={{ fontSize: "11px !important" }}>
                <ComboboxMultiple
                  comboOther={"IdCustomer"}
                  list_data_other={list_data_customer_parse}
                  id="IdCustomer"
                  value={IdCustomer}
                  parentObject={this}
                />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <div className="left">
                <label htmlFor="name">Loại vàng</label>
              </div>
              <div className="right">
                <ComboboxMultiple
                  type_code="LV"
                  id="CodeLV"
                  value={CodeLV}
                  parentObject={this}
                />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <div className="left">
                <label htmlFor="name">Loại hội</label>
              </div>
              <div className="right">
                <ComboboxMultiple
                  type_code="LH"
                  id="CodeLH"
                  value={CodeLH}
                  parentObject={this}
                />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <div className="left">
                <label htmlFor="name">Màu xi</label>
              </div>
              <div className="right">
                <ComboboxMultiple
                  type_code="MX"
                  id="CodeMX"
                  value={CodeMX}
                  parentObject={this}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <div className="left">
                <label htmlFor="name">Bảng giá</label>
              </div>
              <div className="right">
                <ComboboxMultiple
                  comboOther={"CodeBaoGia"}
                  list_data_other={list_data_baogia_parse}
                  id="CodeBaoGia"
                  value={CodeBaoGia}
                  parentObject={this}
                />
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="form-group ">
              <div className="left">
                <label htmlFor="name">Lai</label>
              </div>
              <div className="right">
                <ComboboxMultiple
                  type_code="L"
                  id="CodeLAI"
                  value={CodeLAI}
                  parentObject={this}
                />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <div className="left">
                <label htmlFor="name">Discount</label>
              </div>
              <div className="right">
                <ComboboxMultiple
                  comboOther={"DPCode"}
                  list_data_other={list_dpolicy}
                  id="DPCode"
                  value={DPCode}
                  parentObject={this}
                />
                <span className="wpcf-not-valid-tip wpcf-display-none"></span>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <div className="left">
                <label htmlFor="name">Hoạt động</label>
              </div>
              <div className="right">
                <div className="checkbox">
                  <label>
                    <input
                      type="checkbox"
                      ref="IsApply"
                      id="IsApply"
                      checked={IsApply == 1 ? true : false}
                      onChange={e =>
                        this._change_ConfigStatus(IsApply == 1 ? 0 : 1)
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => this._addConfig()}
                >
                  Thêm mới
                </button>
                &nbsp;
                <button
                  onClick={() => this._saveConfig()}
                  className="btn btn-primary"
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (
  { userAuth, i18n, customer, header, toolbar, list, baogia, common },
  ownProps
) => {
  return {
    toolbar,
    userAuth,
    i18n,
    ownProps,
    customer,
    header,
    list,
    baogia,
    common
  };
};
const mapDispatchToProps = dispatch => {
  return Redux.bindActionCreators(
    {
      ...ReactRouterRedux.routerActions,
      ...userActions,
      ...customerActions,
      ...toolbarActions,
      ...commonActions,
      getListDataBaoGia
    },
    dispatch
  );
};
export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(TabConfigFormView);
