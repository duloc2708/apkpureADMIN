import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import TabProduct from "./TabProduct";
import ComboboxByTable from "../common/ComboboxByTable";
import ListGoldCook from "./ListGoldCook";
import * as transferActions from "modules/transfer/actions/form";
import {STATUS_TRANS_04, STATUS_TRANS_02} from './Constant'

import {
  updateInfoPage,
  resetInfoPage,
  updateTotalInPage
} from "modules/common/actions/form";
class CookDetailFormView extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: moment()
    };
  }
  componentDidMount(){
    this.props.getListGoldCook();
  }
  ChangeValueCombobox(obj) {
    let { id, value } = obj;
    let { objData } = this.props.transfer;
    this.props.updateInputItem({...objData,
      [id]:value
    });
    if(id=='IdStore_From'){
        this.props.getListBalanceByIdStore(value)
    }
  }

  _onChange(e) {
    let { id, value } = e.target;
    let { objData } = this.props.transfer;
    let objDataTemp = _.clone(objData, true);
    objDataTemp[id] = value;
    if(id=='TypeGoldWarm' && value>100){
      alert('Loại vàng nấu tối đa 100');
      return;
    }
    this.props.updateInputItem(objDataTemp);
  }
  handleChangeDate(date) {
    let { objData } = this.props.cd_turn_inout;
    let objDataTemp = _.clone(objData, true);
    objDataTemp["ValueDate"] = date;
    this.props.updateInputItem(objDataTemp);
  }
  ChangeValueComboboxByTable(obj) {}
  componentWillUnmount() {
    this.props.resetInfoPage().then(() => {
      this.props.resetData();
    });
  }

  ChangeValueComboboxMulti(obj) {
    console.log("obj>>>", obj);

    // this.props.updateInputItem(objDataTemp);
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
      TotalWeightBeforeCook,
      DayConfirmF
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
    let blockInput = [STATUS_TRANS_04,STATUS_TRANS_02].indexOf(Status)!=-1? true : false;
    const { list_data_idstores } = this.props.transfer;

    const { status } = this.props.toolbar
    const blockByStatusToolbar= status==='EDIT'?true:false
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
                            <label htmlFor="dateofbirth">Ngày nấu</label>
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
                            <label htmlFor="name">
                              Tổng TL trước khi nấu quy 10
                            </label>
                          </div>
                          <div className="right">
                            <input
                              readOnly={true}
                              className="name form-control"
                              value={Helper.round(TotalWeightBeforeCook,4)}
                              onChange={e => this._onChange(e)}
                              type="text"
                              id="TotalWeightBeforeCook"
                              name="TotalWeightBeforeCook"
                            />
                          </div>
                        </div>
                      </div>
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
                            <label htmlFor="name">TL vàng nhập kho quy 10</label>
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
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <div style={{ width: "10%" }}>
                            <label htmlFor="name">Ghi chú </label>
                          </div>
                          <div style={{ width: "90%" }}>
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
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <ListGoldCook key={"ListGoldCook"} />
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
)(CookDetailFormView);
