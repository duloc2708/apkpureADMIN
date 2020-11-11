import * as orderActions from "modules/order/actions/form";
import ComboboxCustomer from "./ComboboxCustomer";
import TabProduct from "./TabProduct";
import TabBag from "./TabBag";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { I18n } from "react-redux-i18n";
import ComboboxMultipleByCustomer from "./ComboboxMultipleByCustomer";
import ComboboxMultipleBaoGia from "./ComboboxMultipleBaoGia";
let oldUserInfo = SportConfig._getCookie("userInfo");
try {
  oldUserInfo = JSON.parse(SportConfig.function._base64.decode(oldUserInfo));
} catch (e) {
  oldUserInfo = null;
}
class ComboboxMultipleByCustomerByOrder extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: moment()
    };
  }
  ChangeValueCombobox(obj) {
    let { id, value } = obj;
    let { objDataOrder } = this.props.order;
    objDataOrder[id] = value;
    this.props.updateInputItem(objDataOrder);
  }
  _onChange(e) {
    let { id, value } = e.target;
    let { objDataOrder } = this.props.order;
    objDataOrder[id] = value;
    this.props.updateInputItem(objDataOrder);
  }
  ChangeValueCell(obj){
        let { key, value } = obj        
        if (key==="discount")
        {          
          if (parseFloat(value)>'10')
          {
           this.child._addNotification(
            'Giảm giá không được vượt quá 10% giá trị đơn hàng',
            "warning"
            ); 
           value=0
           // return;
          }
          let { objDataOrder } = this.props.order
          let objDataOrder_temp = _.clone(objDataOrder, true)
        
          objDataOrder_temp["discount"] = value
          this.props.updateInputItem(objDataOrder_temp)
          // console.log('objDataOrder',objDataOrder)
          return;
        }
    }
  componentDidMount() {
    this.props.getListCustomer().then(() => {
      this.props.getListColorOrder();
    });
    let { DayMake } = this.props.order.objDataOrder;
    this.setState({
      startDate: moment(DayMake)
    });

    $(".allownumericwithdecimal").on("keypress keyup blur", function(event) {
      //this.value = this.value.replace(/[^0-9\.]/g,'');
      $(this).val(
        $(this)
          .val()
          .replace(/[^0-9\.]/g, "")
      );
      if (
        (event.which != 46 ||
          $(this)
            .val()
            .indexOf(".") != -1) &&
        (event.which < 48 || event.which > 57)
      ) {
        event.preventDefault();
      }
    });
  }
  handleChange(date) {
    this.setState({
      startDate: date
    });
    let { objDataOrder } = this.props.order;
    objDataOrder["DayMake"] = date.format("YYYY-MM-DD HH:mm:ss");
    this.props.updateInputItem(objDataOrder);
  }
 handleClick(obj)
 {

 }
  _acceptOrder(status) {
    let { objDataOrder, listProductsSelected } = this.props.order;
    if (objDataOrder.IdOrder && listProductsSelected.length == 0) {
      this.child._addNotification(
        I18n.t(`order.not_exists_products`),
        "warning"
      );
    } else if (
      objDataOrder.StatusOrder == "STATUS_ORDER_02" &&
      status == "STATUS_ORDER_02"
    ) {
      this.child._addNotification(I18n.t(`order.order_accept`), "warning");
    } else if (objDataOrder.StatusOrder == "STATUS_ORDER_03") {
      this.child._addNotification(I18n.t(`order.order_cancel`), "warning");
    } else if (!objDataOrder.IdOrder) {
      this.child._addNotification(I18n.t(`order.order_not_exists`), "warning");
    } else {
      this.props.acceptOrder(objDataOrder.IdOrder, status).then(res => {
        let { data } = res.data;
        if (data.value == 2) {
          this.child._addNotification(
            I18n.t(`order.order_not_exists`),
            "warning"
          );
        } else if (data.value == 3) {
          this.child._addNotification(I18n.t(`order.created_bag`), "warning");
        } else {
          this.child._addNotification(
            I18n.t(`order.order_udpate_status`),
            "success"
          );
        }
      });
    }
  }
  ChangeValueComboboxMulti(obj) {
    let { key, data, keyValue } = obj;
    let { objDataOrder, listCustomerConfig } = this.props.order;
    let { valueParams, value } = data || {};
    let itemData = listCustomerConfig.find(x => x.code === data);
    let objDataOrder_temp = _.clone(objDataOrder, true);

    if (key === "Customer_groupKey") {
      objDataOrder_temp["Customer_groupKey"] = data;
      objDataOrder_temp["CodeLV"] = itemData.CodeLV;
      objDataOrder_temp["CodeLH"] = itemData.CodeLH;
      objDataOrder_temp["CodeMX"] = itemData.CodeMX;
      objDataOrder_temp["CodeLAI"] = itemData.CodeLAI;
      objDataOrder_temp["ValueLV"] = itemData.ValueLV;
      objDataOrder_temp["ValueLH"] = itemData.ValueLH;
      objDataOrder_temp["ValueMX"] = itemData.ValueMX;
      objDataOrder_temp["ValueLAI"] = itemData.ValueLAI;
      objDataOrder_temp["CodeBaoGia"] = itemData.CodeBaoGia;
      // objDataOrder_temp["discount"] = itemData.Discount;
      this.props.updateInputItem(objDataOrder_temp);
      this.props.getListProductsByPrice(
        objDataOrder_temp.CodeBaoGia,
        objDataOrder_temp
      );
    } else {
    }
  }
  updateComboDynamic(obj) {
    this.props.updateDynamicCombobox(obj.type, obj.value, obj.valueParams);
    let { list_products_by_baogia } = this.props.order;
  }
  _onPrintbag() {
    let { listBagSelected } = this.props.order;
    let listId = "";
    listBagSelected.map(item => {
      if (item.checked) {
        listId = listId + item.IdBag + ",";
      }
    });

    if (!listId) {
      alert("Vui lòng chọn dòng cần in!");
      return;
    }
    let pr = "?idbag=" + listId;
    window.open(Routes.bagDetail.view + pr, "header", 'fullscreen="yes"', true);
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
  ConvertBaogiaCodeToNameList(value) {
    let { list_data_baogia } = this.props.order;
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
  render() {
    let {
      listCustomer,
      namecustomer,
      list_data_baogia,
      listCustomerConfig,
      isCopy
    } = this.props.order;
    let {
      IdOrder,
      IdCustomer,
      Deadline,
      StartWeek,
      FinishWeek,
      TotalFinish,
      TotalBags,
      IdCreater,
      DayMake,
      Status,
      Remark,
      CodeLd,
      StatusOrder,
      StatusBag,
      StatusTransfer,
      CodeKH,
      NameKH,
      CodeLH,
      CodeLV,
      CodeMX,
      CodeLAI,
      CodeBaoGia,
      discount,
      Customer_groupKey
    } = this.props.order.objDataOrder;
    let { status,listButtonPer } = this.props.toolbar;
    
    

    let checkPermisson = listButtonPer.filter(x => x == 'ALLOW_DISCOUNT')
    // console.log('checkPermisson', checkPermisson)
    let allow_Discount=false;
    if (checkPermisson.length>0 || oldUserInfo.user_name.toUpperCase() == 'ADMIN')
    {
      allow_Discount=true;
    }
    const styleLabel = { "border-style": "groove", padding: "2px" };
    return (
      <div className="form__personnal">
        <AlertCustom onRef={ref => (this.child = ref)} />
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <div className="left">
                <label htmlFor="name">Mã đơn hàng</label>
              </div>
              <div className="right">
                <input
                  readOnly={true}
                  className="name form-control"
                  value={IdOrder}
                  onChange={e => this._onChange(e)}
                  type="text"
                  id="IdOrder"
                  name="name"
                  required=""
                />
                <span className="wpcf-not-valid-tip wpcf-display-none"></span>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <div className="left">
                <label htmlFor="dateofbirth">Ngày nhập đơn hàng</label>
              </div>
              <div className="right">
                {/* <input type="date" name="dateofbirth" id="DayMake" /> */}
                <DatePicker
                  dateFormat="DD/MM/YYYY"
                  selected={this.state.startDate}
                  onChange={e => this.handleChange(e)}
                />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <div className="left">
                <label htmlFor="dateofbirth">Loại đơn</label>
              </div>
              <div className="right">
                <Combobox
                  type_code="LD"
                  id="CodeLd"
                  value={CodeLd}
                  parentObject={this}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <div className="left">
                <label htmlFor="name">Mã khách hàng</label>
              </div>
              <div className="right">
                <ComboboxCustomer
                  disabled={status == "ADD" || isCopy ? false : true}
                  value={{ value: CodeKH, label: CodeKH, name: NameKH }}
                  list_data={listCustomer}
                />
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <div className="left">
                <label htmlFor="name">Tên khách hàng</label>
              </div>
              <div className="right">
                <Cell
                  className="name form-control"
                  readOnly="true"
                  value={NameKH}
                  type="text"
                  id="NameKH"
                  name="NameKH"
                  required=""
                />
                <span className="wpcf-not-valid-tip wpcf-display-none"></span>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <div className="left">
                <label htmlFor="name">Trạng thái đơn hàng</label>
              </div>
              <div className="right">
                <Combobox
                  disable={true}
                  type_code="STATUS_ORDER"
                  id="StatusOrder"
                  value={StatusOrder}
                  parentObject={this}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <div className="left" style={{ width: "20%" }}>
                <label htmlFor="name">Cấu hình loại vàng</label>
              </div>
              <div className="right" style={{ width: "50%" }}>
                <ComboboxMultiple
                  disable={status == "ADD" || isCopy ? false : true}
                  comboOther={"Customer_groupKey"}
                  list_data_other={listCustomerConfig}
                  id="Customer_groupKey"
                  value={Customer_groupKey}
                  parentObject={this}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            {/* <label htmlFor="name">{groupConfigText}</label> */}
          </div>
        </div>
        {allow_Discount==false ? (
                      ""
                    ) : 
          ( <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <div className="left">
                <label htmlFor="name">Giảm giá % trên đơn hàng</label>
              </div>
              <div className="right">                
                 <Cell
                    type="text"
                    value={discount || 0 }   
                    keyInput="discount" id={discount} parentObject={this} 
                    width="100px"
                    className={`name form-control`}                    
                  />
              </div>
            </div>
          </div>
          </div>
          )}    
          
          {/*<div className="col-md-3">
            <div className="form-group">
              <div className="left">
                <label htmlFor="name">Loại hội</label>
              </div>
              <div className="right">
                <label htmlFor="name" style={styleLabel}>
                  {this.ConvertCodeToNameList(CodeLH, "LH")}
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <div className="left">
                <label htmlFor="name">Màu xi</label>
              </div>
              <div className="right">
                <label htmlFor="name" style={styleLabel}>
                  {this.ConvertCodeToNameList(CodeMX, "MX")}
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <div className="left">
                <label htmlFor="name">Lai</label>
              </div>
              <div className="right">
                <label htmlFor="name" style={styleLabel}>
                  {this.ConvertCodeToNameList(CodeLAI, "L")}
                </label>
              </div>
            </div>
          </div>
        </div>
       */}
        <div className="row">
          <div className="col-md-12">
            {/* <div className="left">
                            <label htmlFor="name">Danh sách sản phẩm</label>
                        </div> */}
            <div className="form-group">
              <div style={{ width: "100%" }}>
                <TabProduct key={"order"} />
              </div>
            </div>
          </div>
        </div>

        <hr />
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <div className="left">
                <button onClick={() => this._onPrintbag()}>In Bag</button>
              </div>
              <div style={{ width: "100%" }}>
                <TabBag key={"order"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (
  { userAuth, i18n, header, order, toolbar, baogia, list },
  ownProps
) => {
  return {
    userAuth,
    i18n,
    ownProps,
    header,
    order,
    toolbar,
    baogia,
    list
  };
};
const mapDispatchToProps = dispatch => {
  return Redux.bindActionCreators(
    {
      ...ReactRouterRedux.routerActions,
      ...orderActions
    },
    dispatch
  );
};
export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(ComboboxMultipleByCustomerByOrder);
