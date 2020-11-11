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

import TabConfigFormView from "./TabConfigFormView";

import Select from "react-select";
import "react-select/dist/react-select.css";
const { Translate, I18n } = ReactReduxI18n;
class CustomerFormView extends React.Component {
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
  componentWillUnmount() {
    this.props.resetInfoPage();
    this.props.resetDataCustomer();
    this.props.updateButtonToolbar("");
  }
  componentDidMount() {
    let { page, total } = this.props.common;
    let paramsDefault = {
      page: page,
      total: total
    };
    this.props.getListDataCustomer(paramsDefault);
    this.props.getListDataCustomerAll();
    let params = {
      page: 1,
      total: 5000
    };
    this.props.getListDataBaoGiaInCustomer(params);
    this.props.getListDataUser(params);
    this.props.getListDpolicy()
  }
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
    if (objData.Code.length!=6 )
    {
        this.child._addNotification(
            "Mã khách hàng phải nhập 6 ký tự",
            "warning"
          );
        result=false;
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
  _change_CustomerStatus(value) {
    let { objData } = this.props.customer;
    let objDataNew = _.clone(objData, true);
    objDataNew["Status"] = value;
    this.props.updateInputItem(objDataNew);
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
    let { key, data } = obj;
    if (
      [
        "CodeLV",
        "CodeLH",
        "CodeMX",
        "CodeLAI",
        "CodeBaoGia",
        "IdCustomer"
      ].indexOf(key) != -1
    ) {
      let { objDataConfig } = this.props.customer;
      objDataConfig[key] = data;
      this.props.updateInputItemConfig(objDataConfig);
      if (key == "IdCustomer") {
        this.props.getListCustomerConfig(data);
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
        label: Name,
        name: Name
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
  _onReplaceStr(str, oldstr, newstr) {
    if (!str) return;
    str = str.replace(oldstr, newstr);
    if (str.indexOf(oldstr) > -1) {
      while (str.indexOf(oldstr) > -1) {
        str = str.replace(oldstr, newstr);
      }
    }
    return str;
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
      Status,
      StatusText,
      CodeLVText
    } = this.props.customer.objData;
    let {
      CodeLH,
      CodeMX,
      CodeLAI,
      CodeLV,
      CodeBaoGia,
      Discount,
      IdCustomer
    } = objDataConfig;
    let list_data_baogia_parse = this._parseDataComboBaoGia(list_data_baogia);
    let list_data_customer_parse = this._parseDataComboCustomer(list_data);
    return (
      <div className="container">
        <AlertCustom onRef={ref => (this.child = ref)} />

        <section>
          <BrackcrumFromView title="Quản lý khách hàng" />
          <div className="main__content">
            <ToolbarFormView parentObject={this} />
            <div className="form__personnal">
              <div className="main__content__right">
                <div className="list__file">
                  <ul className="nav nav-pills">
                    {listTab.map((item, i) => {
                      return (
                        <li
                          key={`tab_${i}`}
                          onClick={() => this._changeTab(item.key)}
                          className={`${tab == item.key ? "active" : ""}`}
                        >
                          <a data-toggle="tab">{item.title}</a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                {tab === "tab1" ? (
                  <div>
                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-group ">
                          <div className="left">
                            <label htmlFor="name">Mã khách hàng</label>
                          </div>
                          <div className="right">
                            <input
                              className="name form-control"
                              value={Code}
                              onChange={e => this._handleInput(e)}
                              type="text"
                              ref="Code"
                              id="Code"
                              name="Code"
                              required=""
                            />
                            <span className="wpcf-not-valid-tip wpcf-display-none"></span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="left">
                            <label htmlFor="name">Tên khách hàng</label>
                          </div>
                          <div className="right">
                            <input
                              className="name form-control"
                              type="text"
                              value={Name}
                              onChange={e => this._handleInput(e)}
                              ref="Name"
                              id="Name"
                              name="Name"
                              required=""
                            />
                            <span className="wpcf-not-valid-tip wpcf-display-none"></span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="left">
                            <label htmlFor="Phone">Tem hiệu khách</label>
                          </div>
                          <div className="right">
                            <input
                              className="name form-control"
                              type="text"
                              value={Phone}
                              onChange={e => this._handleInput(e)}
                              ref="Phone"
                              id="Phone"
                              name="Phone"
                              required=""
                            />
                            <span className="wpcf-not-valid-tip wpcf-display-none"></span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group ">
                          <div className="left">
                            <label htmlFor="IdentifyCardNumber">
                              Card Number
                            </label>
                          </div>
                          <div className="right">
                            <input
                              className="name form-control"
                              type="text"
                              value={IdentifyCardNumber}
                              onChange={e => this._handleInput(e)}
                              ref="IdentifyCardNumber"
                              id="IdentifyCardNumber"
                              name="IdentifyCardNumber"
                              required=""
                            />
                            <span className="wpcf-not-valid-tip wpcf-display-none"></span>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="left">
                            <label htmlFor="name">Tỉnh thành</label>
                          </div>
                          <div className="right">
                            <ComboboxMultiple
                              type_code="PROV"
                              id="Province"
                              value={Province}
                              parentObject={this}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="left">
                            <label htmlFor="name">Địa chỉ</label>
                          </div>
                          <div className="right">
                            <input
                              className="name form-control"
                              type="text"
                              value={Address}
                              onChange={e => this._handleInput(e)}
                              ref="Address"
                              id="Address"
                              name="Address"
                              required=""
                            />
                            <span className="wpcf-not-valid-tip wpcf-display-none"></span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="left">
                            <label htmlFor="name">HM CNợ tiền</label>
                          </div>
                          <div className="right">
                            <input
                              className="name form-control"
                              value={Limit_Cash}
                              onChange={e => this._handleInput(e)}
                              type="number"
                              ref="Limit_Cash"
                              id="Limit_Cash"
                              name="Limit_Cash"
                              required=""
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="left">
                            <label htmlFor="name">HM CNợ vàng</label>
                          </div>
                          <div className="right">
                            <input
                              className="name form-control"
                              value={Limit_Gold}
                              onChange={e => this._handleInput(e)}
                              type="number"
                              ref="Limit_Gold"
                              id="Limit_Gold"
                              name="Limit_Gold"
                              required=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="left">
                            <label htmlFor="name">Saleman</label>
                          </div>
                          <div className="right">
                            <ComboboxMultiple
                              comboOther={"SaleMan"}
                              list_data_other={list_user}
                              id="SaleMan"
                              value={SaleMan}
                              parentObject={this}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="left">
                            <label htmlFor="name">Số ngày CNợ tiền</label>
                          </div>
                          <div className="right">
                            <input
                              className="name form-control"
                              value={DueDayNum}
                              onChange={e => this._handleInput(e)}
                              type="number"
                              ref="DueDayNum"
                              id="DueDayNum"
                              name="DueDayNum"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="left">
                            <label htmlFor="name">Số ngày CNợ vàng</label>
                          </div>
                          <div className="right">
                            <input
                              className="name form-control"
                              value={DueDayNum4Gold}
                              onChange={e => this._handleInput(e)}
                              type="number"
                              ref="DueDayNum4Gold"
                              id="DueDayNum4Gold"
                              name="DueDayNum4Gold"
                            />
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
                                  ref="Status"
                                  checked={Status == 0 ? true : false}
                                  onChange={() =>
                                    this._change_CustomerStatus(
                                      Status == 0 ? 1 : 0
                                    )
                                  }
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <TabConfigFormView />
                )}
              </div>
            </div>
            {tab === "tab1" ? (
              <div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">
                        <label>
                          <input
                            type="checkbox"
                            checked={allChecked}
                            onChange={() =>
                              this._checkAllRowCustomer(allChecked)
                            }
                          />
                        </label>
                      </th>
                      {listHeaderTable.map((item, i) => {
                        let { key, title } = item;
                        return (
                          <th
                            style={{ textAlign: "left" }}
                            key={key}
                            scope="col"
                          >
                            {title}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th></th>
                      {listHeaderTable.map((item, i) => {
                        let { title, key, valueFilter } = item;
                        return (
                          <td key={"input" + i + key}>
                            <input
                              className="name form-control"
                              type="text"
                              onKeyPress={e => this._onKeyDown(e, key)}
                              value={valueFilter}
                              onChange={e => this._onFilterData(e, key)}
                              id={key}
                              name="name"
                              required=""
                            />
                          </td>
                        );
                      })}
                    </tr>
                    {list_data &&
                      list_data.map((item, i) => {
                        let {
                          Id,
                          Code,
                          Name,
                          Address,
                          Phone,
                          SaleMan,
                          CodeLH,
                          CodeMX,
                          CodeLAI,
                          CodeLVText,
                          Discount,
                          checked,
                          CodeBaoGia,
                          LastTradeDate,
                          LastOrder,
                          Status,
                          StatusText
                        } = item;
                        CodeLVText = this._onReplaceStr(CodeLVText, "$", "\n");
                        
                        return (
                          <tr
                            key={`data_${i}`}
                            onClick={() => this._onClickRow(item)}
                          >
                            <th scope="row">
                              <label>
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => this._checkClickRow(item)}
                                />
                              </label>
                            </th>
                            <td>{Code}</td>
                            <td>{Name}</td>
                            <td>{Phone}</td>
                            <td>{SaleMan}</td>
                            <td>
                              {LastOrder == null
                                ? ""
                                : moment.utc(LastOrder).format("DD/MM/YYYY")}
                            </td>
                            <td>
                              {LastTradeDate == null
                                ? ""
                                : moment
                                    .utc(LastTradeDate)
                                    .format("DD/MM/YYYY")}
                            </td>
                            <td style={{ textAlign: "left" }}>
                              {StatusText}
                            </td>
                            <td className="new-line">{CodeLVText}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <PagingTable type="stone" parentObject={this} />
              </div>
            ) : (
              <div>
                <hr />
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th></th>
                      {listHeaderTableTab2.map((item, i) => {
                        let { key, title } = item;
                        return (
                          <th
                            style={{ textAlign: "left" }}
                            key={key}
                            scope="col"
                          >
                            {title}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {listCustomerConfig &&
                      listCustomerConfig.map((item, i) => {
                        const findNameDp = list_dpolicy.find(x=>x.code==item.DPCode)
                        return (
                          <tr
                            key={`CustomerConfig_${i}`}
                            onClick={() => this._checkClickRowConfig(item)}
                          >
                            <th scope="row">
                              <label>
                                <input
                                  type="checkbox"
                                  checked={item.checked}
                                  onChange={() =>
                                    this._checkClickRowConfig(item)
                                  }
                                />
                              </label>
                            </th>
                            <td>{item.NameLV}</td>
                            <td>{item.NameLH}</td>
                            <td>{item.NameMX}</td>
                            <td>{item.NameLAI}</td>
                            <td>
                              {this.ConvertBaogiaCodeToNameList(
                                item.CodeBaoGia
                              )}
                            </td>
                            <td>{findNameDp && findNameDp.name|| ''}</td>
                            <td style={{ textAlign: "left" }}>
                              {item.IsApply == 1
                                ? "Hoạt động"
                                : "Ngưng hoạt động"}
                            </td>
                            <td onClick={() => this._onRemove(item)}>
                              <button>
                                <i
                                  className="fa fa-trash-o"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
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
)(CustomerFormView);
