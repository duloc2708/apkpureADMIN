import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import WaxSettingListBag from "./WaxSettingListBag";
import ComboboxByTable from "../common/ComboboxByTable";
import * as WaxSettingProcActions from "modules/ticket_proc_wax_setting/actions/form";
class DetailProcWaxSettingFormView extends React.Component {
  constructor() {
    super();
  }
  ChangeValueComboboxMulti(obj) {
    let { key, data } = obj;
    let { objData } = this.props.ticket_proc_wax_setting;
    objData[key] = data;
    this.props.updateInputItemCasting(objData);
  }
  ChangeValueCombobox(obj) {
    let { id, value } = obj;
    let { objData } = this.props.ticket_proc_wax_setting;
    let objDataTemp = _.clone(objData, true);
    objDataTemp[id] = value;
    this.props.updateInputItemCasting(objDataTemp);
  }
  _onChange(e) {
    let { id, value } = e.target;
    let { objData } = this.props.ticket_proc_wax_setting;
    let objDataTemp = _.clone(objData, true);
    objDataTemp[id] = value;
    this.props.updateInputItemCasting(objDataTemp);
  }
  handleChangeDate(date) {
    let { objData } = this.props.ticket_proc_wax_setting;
    let objDataTemp = _.clone(objData, true);
    objDataTemp["ValueDate"] = date;
    this.props.updateInputItemCasting(objDataTemp);
  }
  ChangeValueComboboxByTable(obj) {}
  componentWillUnmount() {
    this.props.resetDataCastingProc();
  }
  render() {
    let {
      IdTicket,
      CodeProcess,
      CodeTicket,
      Name,
      ValueDate,
      CodeLV,
      ValueLV,
      Notes,
      Waxset_Weight_T,
      Product_Weight_IN_T,
      Broken_Weight_IN_T,
      Gold_Weight_IN_T,
      Product_Weight_OUT_T,
      Broken_Weight_OUT_T,
      Gold_Weight_OUT_T,
      Gold_Lost_T,
      Worker
    } = this.props.ticket_proc_wax_setting.objData;
    let { list_worker, objConfig } = this.props.ticket_proc_wax_setting;
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
    let { IsGoldTypeRequest, WorkerInTicket } = objConfig;
    return (
      <div className="main__content">
        <div className="row">
          <div className="col-md-12">
            <div className="main__content__right">
              <div className="form__personnal">
                <AlertCustom onRef={ref => (this.child = ref)} />
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-group">
                      <div className="left">
                        <label htmlFor="name">Mã ticket</label>
                      </div>
                      <div className="right">
                        <input
                          readOnly={true}
                          className="name form-control"
                          value={CodeTicket}
                          onChange={e => this._onChange(e)}
                          type="text"
                          id="CodeTicket"
                          name="name"
                          required=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <div className="left">
                        <label htmlFor="name">Tên</label>
                      </div>
                      <div className="right">
                        <input
                          className="name form-control"
                          value={Name}
                          onChange={e => this._onChange(e)}
                          type="text"
                          id="Name"
                          name="name"
                          required=""
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
                        {/* <input type="date" name="dateofbirth" id="DayMake" /> */}
                        <DatePicker
                          dateFormat="DD/MM/YYYY"
                          selected={ValueDate}
                          onChange={e => this.handleChangeDate(e)}
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
                        <Combobox
                          //disable={IsGoldTypeRequest == 1 ? false : true}
                          type_code="LV"
                          value={CodeLV}
                          id="CodeLV"
                          parentObject={this}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <div className="left" style={{ width: "10%" }}>
                        <label htmlFor="name">Ghi chú</label>
                      </div>
                      <div className="right" style={{ width: "89%" }}>
                        <input
                          className="name form-control"
                          value={Notes}
                          onChange={e => this._onChange(e)}
                          type="text"
                          id="Notes"
                          name="name"
                          required=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <div style={{ width: "100%" }}>
                        <WaxSettingListBag key={"order"} />
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
  { userAuth, i18n, list, toolbar, ticket_proc_wax_setting, header },
  ownProps
) => {
  return {
    userAuth,
    i18n,
    ownProps,
    toolbar,
    ticket_proc_wax_setting,
    header
  };
};
const mapDispatchToProps = dispatch => {
  return Redux.bindActionCreators(
    {
      ...ReactRouterRedux.routerActions,
      ...WaxSettingProcActions
    },
    dispatch
  );
};
export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailProcWaxSettingFormView);
