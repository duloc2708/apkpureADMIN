import "react-datepicker/dist/react-datepicker.css";
import TabProduct from "./TabProduct";
import TabProductSearch from "./TabProductSearch";
import * as cd_turn_inout_Actions from "modules/cd_turn_inout/actions/form";
import ComboboxCustomer from "./ComboboxCustomer";
import {
  updateInfoPage,
  resetInfoPage,
  updateTotalInPage
} from "modules/common/actions/form";
import ComboboxOutput from "./ComboboxOutput";
class DetailFormView extends React.Component {
  constructor() {
    super();
  }
  ChangeValueCombobox(obj) {
    let { id, value } = obj;
    if (
      ["SCodeLV", "SCodeLH", "SCodeMX", "SIdCustomer", "SColor"].indexOf(id) !=
      -1
    ) {
      let { objSearch } = this.props.cd_turn_inout;
      let objDataTemp = _.clone(objSearch, true);
      objDataTemp[id] = value;
      this.props.updateInputItemSearch(objDataTemp);
    } else if (id == "Trans_Type" && value == "TURN_TRANS_TYPE_04") {
      // nếu xuất nấu thì mặc định chọn KH là sakura
      let { objData, listCustomer } = this.props.cd_turn_inout;
      let { list_data_all } = this.props.list;
      let list_data_allTemp = _.clone(list_data_all, true);
      let objDataTemp = _.clone(objData, true);

      let DataListCustomer = listCustomer.filter(x => x.Code == "SAJI00");
      let { Code, Name } = DataListCustomer[0];
      objDataTemp["IdCustomer"] = Code;
      objDataTemp["nameCustomer"] = Name;
      objDataTemp[id] = value;
      this.props.updateInputItem(objDataTemp);

      let { objSearch } = this.props.cd_turn_inout;
      let objDataTempSearch = _.clone(objSearch, true);
      objDataTempSearch["SIdCustomer"] = Code;
      this.props.updateInputItemSearch(objDataTempSearch);
    }
    // nếu là hàng hồi thì sẽ LAI về 0
    else if (id == "Trans_Type" && value == "TURN_TRANS_TYPE_01") {
      let { objData } = this.props.cd_turn_inout;
      let objDataTemp = _.clone(objData, true);
      objDataTemp["codeLAI"] = "0";
      objDataTemp["ValueLAI"] = "0";
      objDataTemp[id] = value;
      this.props.updateInputItem(objDataTemp);
    } else {
      let { objData } = this.props.cd_turn_inout;
      let objDataTemp = _.clone(objData, true);
      objDataTemp[id] = value;
      this.props.updateInputItem(objDataTemp).then(() => {
        if (id == "IdRef") {
          this.props.findProducts(true);
          // this._onSearch()
        }
      });
    }
  }
  onChangFilter(checked) {
    let { objSearch } = this.props.cd_turn_inout;
    let objDataTemp = _.clone(objSearch, true);
    objDataTemp["Is_Filter"] = checked;
    if (!checked) {
      objDataTemp["SCodeLV"] = "";
      objDataTemp["SCodeLH"] = "";
      objDataTemp["SCodeMX"] = "";
    }
    this.props.updateInputItemSearch(objDataTemp);
  }
  _onChange(e) {
    let { id, value } = e.target;
    let { objData } = this.props.cd_turn_inout;
    let objDataTemp = _.clone(objData, true);
    objDataTemp[id] = value;
    this.props.updateInputItem(objDataTemp);
  }
  _onChangeSearch(e) {
    let { id, value } = e.target;
    let { objSearch } = this.props.cd_turn_inout;
    let objDataTemp = _.clone(objSearch, true);
    objDataTemp[id] = value;
    this.props.updateInputItemSearch(objDataTemp);
  }
  handleChangeDate(date) {
    let { objData } = this.props.cd_turn_inout;
    let objDataTemp = _.clone(objData, true);
    objDataTemp["ValueDate"] = date;
    this.props.updateInputItem(objDataTemp);
  }
  ChangeValueComboboxByTable(obj) { }
  componentWillUnmount() {
    this.props.resetInfoPage().then(() => {
      this.props.resetData();
    });
  }
  _onSearch() {
    let {
      IdProduct
    } = this.props.cd_turn_inout.objSearch;
    let { Trans_Type, IdCustomer } = this.props.cd_turn_inout.objData;
    let type = Helper.getParam(window.location.href, "type");
    // nếu trả hàng bắt buộc chọn khách hàng
    if (type == 0 && !IdCustomer) {
      alert("Vui lòng chọn khách hàng!");
    } else if (!IdProduct && !Is_Filter) {
      alert("Vui lòng nhập mã sản phẩm cần tìm!");
    } else if (type == 1 && Trans_Type == "TURN_TRANS_TYPE_03" && !IdCustomer) {
      alert("Vui lòng chọn khách hàng để lấy bảng giá");
    } else {
      this.props.resetInfoPage().then(() => {
        this.props.updateTotalInPage(10).then(() => {
          this.props.findProducts();
        });
      });
    }
  }
  ChangeValueComboboxMulti(obj) {
    let { key, data, keyValue } = obj;
    let { objData, listCustomerConfig, objSearch } = this.props.cd_turn_inout;

    let { valueParams, value } = data || {};
    let objDataTemp = _.clone(objData, true);

    if (key === "Customer_groupKey") {
      let itemData = listCustomerConfig.find(x => x.code === data);
      objDataTemp["Customer_groupKey"] = data;
      objDataTemp["codeLV"] = itemData.CodeLV;
      objDataTemp["codeLH"] = itemData.CodeLH;
      objDataTemp["codeMX"] = itemData.CodeMX;
      objDataTemp["codeLAI"] = itemData.CodeLAI;
      objDataTemp["ValueLV"] = itemData.ValueLV;
      objDataTemp["ValueLH"] = itemData.ValueLH;
      objDataTemp["ValueMX"] = itemData.ValueMX;
      objDataTemp["ValueLAI"] = itemData.ValueLAI;
      objDataTemp["CodeBaoGia"] = itemData.CodeBaoGia;
      objDataTemp["discount"] = itemData.Discount;
      this.props.updateInputItem(objDataTemp);

      let objDataSearchTemp = _.clone(objSearch, true);
      objDataSearchTemp["SCodeLV"] = itemData.CodeLV;
      objDataSearchTemp["SCodeLH"] = itemData.CodeLH;
      objDataSearchTemp["SCodeMX"] = itemData.CodeMX;
      objDataSearchTemp["CodeBaoGia"] = itemData.CodeBaoGia;
      this.props.updateInputItemSearch(objDataSearchTemp);
      // lấy danh sách báo giá
      this.props.getListProductsByPrice(itemData.CodeBaoGia);
    } else {
      objDataTemp[key] = value;
      objDataTemp[keyValue] = valueParams;
      this.props.updateInputItem(objDataTemp);
    }
  }
  componentDidMount() {
    KeyboardJS.bind("enter", event => {
      if (
        $("#IdProduct").is(":focus") ||
        $("#IdOutput").is(":focus") ||
        $("#Weight").is(":focus")
      ) {
        this._onSearch();
      }
    });
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
  _onCollapse() {
    if ($("#collapse-show").css("display") == "none") {
      $("#collapse-show").css({ display: "" });
    } else {
      $("#collapse-show").css({ display: "none" });
    }
  }
  _onButtonAddProduct() {
    this.props.addProductCdTurnInOut();
    // setTimeout(() => {
    //     $('#tbodyProduct > tbody  > tr').each(function (i, item) {
    //         let all_rows = $('#tbodyProduct >tbody >tr').length;
    //         if (i == all_rows - 1) {
    //             $(item).find('input, textarea')[0].focus()
    //         }
    //     });
    // }, 200)
  }
  render() {
    let {
      IdTurn,
      Staff_Id,
      TicketCode,
      IdCustomer,
      Trans_Type,
      codeLV,
      DayMake,
      Status,
      nameCustomer,
      IdOutput,
      IdRef,
      Customer_groupKey
    } = this.props.cd_turn_inout.objData;
    let {
      list_products_search,
      list_worker,
      objConfig,
      objSearch,
      listCustomer,
      list_turn_type,
      isRenderSearch,
      listCustomerConfig
    } = this.props.cd_turn_inout;

    let {
      listCdTurnIn,
      listOutputByCustomer
    } = this.props.cd_turn_inout;
    let {
      IdProduct,
      Weight,
      SCodeLV,
      SCodeLH,
      SCodeMX,
      Is_Filter,
      SIdCustomer,
      SColor
    } = objSearch;
    let heightList =
      list_products_search.length + 1 > 6
        ? "600px"
        : 100 * (list_products_search.length + 1) + "px";
    let type = Helper.getParam(window.location.href, "type");
    let blockInput = Status == "STATUS_TURN_INOUT_02" ? true : false;
    return (
      <div className="main__content">
        <div className="row">
          <div className="col-md-12">
            <div className="main__content__right">
              <div className="form__personnal">
                <AlertCustom onRef={ref => (this.child = ref)} />
                <div className="panel panel-default">
                  <div className="panel-heading">Thông tin chung</div>
                  <div className="panel-body">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="left">
                            <label htmlFor="name">Loại</label>
                          </div>
                          <div className="right">
                            <Combobox
                              disable={blockInput}
                              type_code="TURN_TRANS_TYPE"
                              value={Trans_Type}
                              data_order={list_turn_type}
                              id="Trans_Type"
                              parentObject={this}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="left">
                            <label htmlFor="name">Ngày trả</label>
                          </div>
                          <div className="right">
                            <InputDateFormat
                              value={DayMake}
                              parentObject={this}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="left">
                            <label htmlFor="name">Mã trả hàng</label>
                          </div>
                          <div className="right">
                            <input
                              readOnly={true}
                              className="name form-control"
                              value={TicketCode}
                              onChange={e => this._onChange(e)}
                              type="text"
                              id="TicketCode"
                              name="name"
                              required=""
                            />
                          </div>
                        </div>
                      </div>
                      {Trans_Type == "TURN_TRANS_TYPE_04" ? (
                        <div className="col-md-3">
                          <div className="form-group">
                            <div className="left">
                              <label htmlFor="name">NV nhận nấu</label>
                            </div>
                            <div className="right">
                              <Combobox
                                disable={blockInput}
                                type_code="Staff_Id"
                                value={Staff_Id}
                                data_order={list_worker}
                                id="Staff_Id"
                                parentObject={this}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                          ""
                        )}
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="left">
                            <label htmlFor="name">Mã khách hàng</label>
                          </div>
                          <div className="right">
                            <ComboboxCustomer
                              disable={blockInput}
                              id="IdCustomer"
                              value={{
                                value: IdCustomer,
                                label: IdCustomer,
                                name: nameCustomer
                              }}
                              list_data={listCustomer}
                            />
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
                              value={nameCustomer}
                              type="text"
                              id="NameKH"
                              name="NameKH"
                              required=""
                            />
                            <span className="wpcf-not-valid-tip wpcf-display-none"></span>
                          </div>
                        </div>
                      </div>
                      {/* {Trans_Type != "TURN_TRANS_TYPE_01" ? (
                        <div className="col-md-3">
                          <div className="form-group">
                            <div className="left">
                              <label htmlFor="name">Bảng giá</label>
                            </div>
                            <div className="right">
                              <ComboboxMultipleBaoGia
                                comboOther={"CodeBaoGia"}
                                list_data_other={list_data_baogia_parse}
                                id="CodeBaoGia"
                                value={CodeBaoGia}
                                keyValue="CodeBaoGia"
                                Customer={IdCustomer}
                                value={CodeBaoGia}
                                parentObject={this}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )} */}
                      {type == 0 ? (
                        <div className="col-md-3">
                          <div className="form-group">
                            <div className="left">
                              <label htmlFor="name">Mã PX</label>
                            </div>
                            <div className="right">
                              <ComboboxOutput
                                value={{
                                  value: IdOutput,
                                  label: IdOutput,
                                  name: IdOutput
                                }}
                                list_data={listOutputByCustomer}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                          ""
                        )}
                      {type == 1 ? (
                        <div className="col-md-3">
                          <div className="form-group">
                            <div className="left">
                              <label htmlFor="name">Phiếu trả hàng</label>
                            </div>
                            <div className="right">
                              <Combobox
                                type_code="IdRef"
                                data_order={listCdTurnIn}
                                value={IdRef}
                                id="IdRef"
                                parentObject={this}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                          ""
                        )}
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <div className="left" style={{ width: "20%" }}>
                            <label htmlFor="name">Cấu hình loại vàng</label>
                          </div>
                          <div className="right" style={{ width: "77%" }}>
                            <ComboboxMultiple
                              disable={blockInput}
                              comboOther={"Customer_groupKey"}
                              list_data_other={listCustomerConfig}
                              id="Customer_groupKey"
                              value={Customer_groupKey}
                              parentObject={this}
                            />
                            {/* <ComboboxMultipleByCustomer disable={blockInput} keyValue='ValueLV' Customer={IdCustomer} type_code='LV' id='codeLV' value={codeLV} parentObject={this} /> */}
                            {/* <Combobox disable={blockInput} type_code='LV' value={codeLV} id='codeLV' parentObject={this} /> */}
                          </div>
                        </div>
                      </div>{" "}
                    </div>

                    <div className="clearfix"></div>
                  </div>
                </div>
                {Status != "STATUS_TURN_INOUT_02" && !isRenderSearch ? (
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <span>Thông tin tìm kiếm và kết quả</span>
                      <i
                        onClick={() => this._onCollapse()}
                        className="fa fa-caret-down"
                        style={{ "font-size": "24px", float: "right" }}
                      ></i>
                    </div>
                    <div className="panel-body" id="collapse-show">
                      <div className="row">
                        {type == 0 ? (
                          <div className="col-md-3">
                            <div className="form-group">
                              `{" "}
                              <div className="left">
                                <label htmlFor="name">Mã khách hàng</label>
                              </div>
                              <div className="right">
                                <ComboboxCustomer
                                  id="SIdCustomer"
                                  value={{
                                    value: SIdCustomer,
                                    label: SIdCustomer,
                                    name: SIdCustomer
                                  }}
                                  list_data={listCustomer}
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                            ""
                          )}
                        <div className="col-md-3">
                          <div className="form-group">
                            <div className="left">
                              <label htmlFor="name">Mã SP</label>
                            </div>
                            <div className="right">
                              <input
                                className="name form-control"
                                value={IdProduct}
                                onChange={e => this._onChangeSearch(e)}
                                type="text"
                                id="IdProduct"
                                name="name"
                                required=""
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <div className="left">
                              <label htmlFor="name">TL đá</label>
                            </div>
                            <div className="right">
                              <input
                                className="name form-control"
                                value={Weight}
                                onChange={e => this._onChangeSearch(e)}
                                type="text"
                                id="Weight"
                                name="Weight"
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
                              <label htmlFor="name">Loại vàng</label>
                            </div>
                            <div className="right">
                              <Combobox
                                type_code="LV"
                                value={SCodeLV}
                                id="SCodeLV"
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
                              <Combobox
                                type_code="LH"
                                value={SCodeLH}
                                id="SCodeLH"
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
                              <Combobox
                                type_code="MX"
                                value={SCodeMX}
                                id="SCodeMX"
                                parentObject={this}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="form-group">
                            <div className="left">
                              <label htmlFor="name">Màu</label>
                            </div>
                            <div className="right">
                              <Combobox
                                type_code="DSM"
                                value={SColor}
                                id="SColor"
                                parentObject={this}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-1" style={{ marignLeft: "1%" }}>
                          <div className="form-group">
                            <div onClick={() => this._onSearch()}>
                              <input
                                type="checkbox"
                                // id={item.value}
                                // name={item.value} key={item.value}
                                checked={Is_Filter}
                                onChange={() => this.onChangFilter(!Is_Filter)}
                              />
                            </div>
                            <button
                              id="cd_turn_inout_search"
                              onClick={() => this._onSearch()}
                              className="btn btn-primary"
                            >
                              Tìm
                            </button>
                          </div>
                        </div>
                      </div>
                      {Status != "STATUS_TURN_INOUT_02" &&
                        list_products_search.length > 0 ? (
                          <div className="row">
                            <div className="col-md-12">
                              <div className="left">
                                {/* <label htmlFor="name">Sản phẩm được tìm thấy</label> */}
                              </div>
                              <div className="form-group">
                                <div style={{ width: "100%" }}>
                                  <TabProductSearch
                                    heightList={heightList}
                                    key={"order"}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      <div className="clearfix"></div>
                    </div>
                  </div>
                ) : (
                    ""
                  )}
                <div className="row">
                  <div className="col-md-12">
                    <div className="left">
                      <label htmlFor="name">Danh sách sản phẩm</label>
                    </div>
                    <div className="form-group">
                      <div style={{ width: "100%" }}>
                        <button onClick={() => this._onButtonAddProduct()}>
                          Thêm sản phẩm
                        </button>
                        <TabProduct key={"order"} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (
  { userAuth, i18n, list, toolbar, cd_turn_inout, header },
  ownProps
) => {
  return {
    userAuth,
    i18n,
    ownProps,
    list,
    toolbar,
    cd_turn_inout,
    header
  };
};
const mapDispatchToProps = dispatch => {
  return Redux.bindActionCreators(
    {
      ...ReactRouterRedux.routerActions,
      ...cd_turn_inout_Actions,
      updateInfoPage,
      resetInfoPage,
      updateTotalInPage
    },
    dispatch
  );
};
export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailFormView);
