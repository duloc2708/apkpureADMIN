import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import TabProduct from "./TabProduct";
import ComboboxByTable from "../common/ComboboxByTable";
import ListGold from "./ListGold";
import * as transferActions from "modules/transfer/actions/form";
import { STATUS_TRANS_04, STATUS_TRANS_02 } from './Constant'

import {
  updateInfoPage,
  resetInfoPage,
  updateTotalInPage
} from "modules/common/actions/form";
class DetailFormView extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: moment()
    };
  }
  componentDidMount() {
    this.props.getListIdStores();
  }
  ChangeValueCombobox(obj) {
    let { id, value } = obj;
    let { objData } = this.props.transfer;

    if (id == 'IdStore_From') {
      this.props.getListBalanceByIdStore(value)
    }
    if (value === 'TF_TYPE_02') {
      objData = {
        ...objData,
        IdStore_From: 'SAJIKO',
        IdStore_To: 'SAJIKO'
      }
    }
    this.props.updateInputItem({
      ...objData,
      [id]: value
    });
  }

  ChangeValueComboboxMulti(obj) {
    let { objData } = this.props.transfer;
    this.props.updateInputItem({
      ...objData,
      [obj.key]: obj.data
    });
    if (obj.key == 'IdStore_From') {
      this.props.getListBalanceByIdStore(obj.data)
    }
  }

  _onChange(e) {
    let { id, value } = e.target;
    let { objData } = this.props.transfer;
    let objDataTemp = _.clone(objData, true);
    objDataTemp[id] = value;
    if (id == 'TypeGoldWarm' && value > 100) {
      alert('Loại vàng nấu tối đa 100');
      return;
    }
    this.props.updateInputItem(objDataTemp);

    // tinh lai trong luong vang sau nau chi tiet
    if(id == 'TypeGoldWarm'){
      this.props.calGoldWarmDetail(objDataTemp);
    }
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

  _onCollapse() {
    if ($("#collapse-show").css("display") == "none") {
      $("#collapse-show").css({ display: "" });
    } else {
      $("#collapse-show").css({ display: "none" });
    }
  }

  render() {
    let {
      IdTransfer,
      keyMap,
      TransType,
      TransDesc,
      IdStore_From,
      IdStore_To,
      Status,
      DayMake,
      DayConfirm,
      Due_Date,
      Notes,
      TypeGoldWarm,
      TotalWeightAfterWarm,
      DayConfirmF,
      Gold_Lost_T,
      TotalWeightLH
    } = this.props.transfer.objData;
    let { objConfig, objSearch, list_turn_type } = this.props.transfer;
    let { list_config_process } = this.props.header;
    let parseData = [];
    list_config_process.map(itemn => {
      parseData.push({
        id: itemn.Code,
        code: itemn.Code,
        name: itemn.Name,
        type_code: "CodeProcess"
      });
    });
    let { IsGoldTypeRequest } = objConfig;
    let type = Helper.getParam(window.location.href, "type");
    let blockInput = [STATUS_TRANS_04, STATUS_TRANS_02].indexOf(Status) != -1 ? true : false;
    const { list_data_idstores } = this.props.transfer;

    const { status } = this.props.toolbar
    const blockByStatusToolbar = status === 'EDIT' ? true : false
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
                              disable={blockByStatusToolbar}
                              type_code="TF_TYPE"
                              value={TransType}
                              id="TransType"
                              parentObject={this}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="left">
                            <label htmlFor="name">Mã chuyển kho</label>
                          </div>
                          <div className="right">
                            <input
                              readOnly={keyMap}
                              className="name form-control"
                              value={keyMap}
                              onChange={e => this._onChange(e)}
                              type="text"
                              id="keyMap"
                              name="name"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="left">
                            <label htmlFor="dateofbirth">Ngày thực hiện</label>
                          </div>
                          <div className="right">
                            <DatePicker
                              readOnly={blockInput}
                              dateFormat="DD/MM/YYYY"
                              selected={this.state.startDate}
                              onChange={e => this.handleChange(e)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="left">
                            <label htmlFor="name">Từ kho</label>
                          </div>
                          <div className="right">
                            <ComboboxMultiple
                              disable={blockInput}
                              comboOther={"IdStore_From"}
                              list_data_other={list_data_idstores}
                              id="IdStore_From"
                              value={IdStore_From}
                              parentObject={this}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="left">
                            <label htmlFor="name">Đến kho</label>
                          </div>
                          <div className="right">
                            <ComboboxMultiple
                              disable={blockInput}
                              comboOther={"IdStore_To"}
                              list_data_other={list_data_idstores}
                              id="IdStore_To"
                              value={IdStore_To}
                              parentObject={this}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <div style={{ width: "20%" }}>
                            <label htmlFor="name">Ghi chú </label>
                          </div>
                          <div style={{ width: "80%" }}>
                            <textarea
                              readOnly={blockInput}
                              onChange={(e) => this._onChange(e)}
                              rows="1"
                              style={{ width: "100%" }}
                              className="name form-control"
                              value={Notes}
                              type="text"
                              id="Notes"
                              name="Notes"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-group">
                          <div className="left">
                            <label htmlFor="name">
                              Tổng TL hao hụt
                          </label>
                          </div>
                          <div className="right">
                            <input
                              readOnly={true}
                              className="name form-control"
                              value={Gold_Lost_T}
                              onChange={e => this._onChange(e)}
                              type="text"
                              id="Gold_Lost_T"
                              name="Gold_Lost_T"
                            />
                          </div>
                        </div>
                      </div>
                      {TransType !== "TF_TYPE_01" ? (
                        <div>
                          <div className="col-md-3">
                            <div className="form-group">
                              <div className="left">
                                <label htmlFor="name">Loại vàng nấu</label>
                              </div>
                              <div className="right">
                                <input
                                  readOnly={blockInput}
                                  className="name form-control"
                                  value={TypeGoldWarm}
                                  onChange={e => this._onChange(e)}
                                  type="number"
                                  id="TypeGoldWarm"
                                  name="TypeGoldWarm"
                                  required=""
                                  max="100"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="form-group">
                              <div className="left">
                                <label htmlFor="name">
                                  Tổng TL hội
                                </label>
                              </div>
                              <div className="right">
                                <input
                                  readOnly={blockInput}
                                  className="name form-control"
                                  value={TotalWeightLH}
                                  onChange={e => this._onChange(e)}
                                  type="text"
                                  id="TotalWeightLH"
                                  name="TotalWeightLH"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3">
                            <div className="form-group">
                              <div className="left">
                                <label htmlFor="name">
                                  Tổng TL vàng sau nấu
                                </label>
                              </div>
                              <div className="right">
                                <input
                                  readOnly={blockInput}
                                  className="name form-control"
                                  value={TotalWeightAfterWarm}
                                  onChange={e => this._onChange(e)}
                                  type="text"
                                  id="TotalWeightAfterWarm"
                                  name="TotalWeightAfterWarm"
                                />
                              </div>
                            </div>
                          </div>
                          
                        </div>
                      ) : (
                          ""
                        )}

                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <ListGold key={"ListGold"} />
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
  { userAuth, i18n, list, toolbar, transfer, header },
  ownProps
) => {
  return {
    userAuth,
    i18n,
    ownProps,
    list,
    toolbar,
    transfer,
    header
  };
};
const mapDispatchToProps = dispatch => {
  return Redux.bindActionCreators(
    {
      ...ReactRouterRedux.routerActions,
      ...transferActions,
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
