import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ListBag from "./ListBag";
import ComboboxByTable from "../common/ComboboxByTable";
import * as castingProcActions from "modules/ticket_proc/actions/form";
const typeProcess = Helper.getParam(window.location.href, "type");
import SearchBag from "./SearchBag";
const {
  LIST_PROCESS_PREV_SPURE,
  STATUS_PROCESS_ACCEPT,
  STATUS_PROCESS_FINISH
} = require("./Constant");

import ModalGoldWeightFormView from "./ModalGoldWeightFormView";
const customStyles = {
  content: {
    top: "52%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};
class DetailFormView extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    // set focus when open form detail
    $("#input_lv")
      .attr("tabindex", -1)
      .focus();
    this.props.getDataSkeleton();

    let { status } = this.props.toolbar;
    if (typeProcess === "CASTING") {
      if (status === "ADD") {
        this.props.getAllGold();
      } else {
        this.props.getAllGoldByTicket();
      }
    }
  }
  ChangeValueComboboxMulti(obj) {
    let { key, data } = obj;
    let objData = {};
    objData.key = key;
    objData.value = data;
    if (key === "Skeleton") {
      // update list bag by codeSkeleton
      this.props.getDataDetailByCode(data);
      // fill GoldWeightEstime
      const { listSkeletionDefault } = this.props.ticket_proc;
      const findData = listSkeletionDefault.find(x => x.CodeTicket === data);
      if (findData) {
        let objDataNew = {};
        objDataNew.key = "GoldWeight_Estimate";
        objDataNew.value = Helper.round(findData.GoldWeight_Estimate, 4);
        this.props.updateInputItemProcess(objDataNew);

        let objDataLV = {};
        objDataLV.key = "CodeLV";
        objDataLV.value = findData.CodeLV;
        this.props.updateInputItemProcess(objDataLV);
      }
      $(`#tr_1`)
        .find("input, textarea")[0]
        .focus();
    }
    this.props.updateInputItemProcess(objData);
  }
  ChangeValueCombobox(obj) {
    let { id, value } = obj;
    let objData = {};
    objData.key = id;
    objData.value = value;

    this.props.updateInputItemProcess(objData);
    if (id === "CodeLV") {
      if (typeProcess === "CASTING") {
        setTimeout(() => {
          $("#input_skeleton_product")
            .attr("tabindex", -2)
            .focus();
        }, 100);
      } else {
        if (typeProcess === "SKELETON") {
          $("#input_lh")
            .attr("tabindex", -1)
            .focus();
        } else {
          $(`#tr_1`)
            .find("input, textarea")[0]
            .focus();
        }
      }
    }
    if (id === "CodeLH") {
      $(`#tr_1`)
        .find("input, textarea")[0]
        .focus();
    }
  }
  _onChange(e) {
    const { listBagSelected } = this.props.ticket_proc;
    if (listBagSelected.length === 0) {
      this.child._addNotification(`Vui lòng cập nhật bag trước!`, "warning");
      return;
    }
    let { id, value } = e.target;
    let objData = {};
    objData.key = id;
    objData.value = value;
    this.props.updateInputItemProcess(objData);
  }
  handleChangeDate(date) {
    let objData = {};
    objData.key = "ValueDate";
    objData.value = date;
    this.props.updateInputItemProcess(objData);
  }
  ChangeValueComboboxByTable(obj) { }
  componentWillUnmount() {
    this.props.resetDataCastingProc();
  }
  closeModal() {
    this.props.showFormGold(false);
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
      CodeLH,
      ValueLH,
      Notes,
      Waxset_Weight_T,
      Product_Weight_IN_T,
      Broken_Weight_IN_T,
      Gold_Weight_IN_T,
      Product_Weight_OUT_T,
      Broken_Weight_OUT_T,
      Gold_Weight_OUT_T,
      Gold_Lost_T,
      Worker,
      WorkerName,
      SkeletonWeight,
      GoldWeight_Estimate,
      Gold_Weight2Store_T,
      Status,
      Skeleton,
      Product_Skeleton_Weight,
      Handset_Weight_T,
      AddGoldWeight_T,
      BackGoldWeight_T,
      CancelGoldWeight_T
    } = this.props.ticket_proc.objData;
    let {
      isShowGold,
      list_worker,
      objConfig,
      listSkeletion,
      listBagSelected
    } = this.props.ticket_proc;
    const countBag = listBagSelected.filter(x => x.IdOrder != "");
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
    let {
      IsInputweightbyM_OUT,
      IsInputweightbyM_IN,
      IsGoldTypeRequest,
      WorkerInTicket,
      IsUsePriorData,
      IsAdditionalWeight
    } = objConfig;
    let listControlWeight = [];
    let { status: Satustoolbar } = this.props.toolbar;

    let isBlock =
      [STATUS_PROCESS_FINISH, STATUS_PROCESS_ACCEPT].indexOf(Status) !== -1 ? true : false;


    let listControls = [];
    if (CodeLV) {
      listSkeletion = listSkeletion.filter(x => x.CodeLV === CodeLV);
    }
    if (typeProcess === "SKELETON") {
      listControls.push(
        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <div className="left">
                <label htmlFor="name">TL cây</label>
              </div>
              <div className="right">
                <input
                  className="name form-control"
                  value={Product_Skeleton_Weight}
                  onChange={e => this._onChange(e)}
                  type="number"
                  step="0.0001"
                  min="0"
                  id="Product_Skeleton_Weight"
                  name="Product_Skeleton_Weight"
                  required=""
                />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <div className="left">
                <label htmlFor="name">TL chân đế</label>
              </div>
              <div className="right">
                <input
                  readOnly={
                    IsInputweightbyM_IN == 1 || typeProcess === "SKELETON"
                      ? false
                      : true
                  }
                  className="name form-control"
                  value={SkeletonWeight}
                  onChange={e => this._onChange(e)}
                  type="number"
                  step="0.0001"
                  min="0"
                  id="SkeletonWeight"
                  name="SkeletonWeight"
                  required=""
                />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <div className="left">
                <label htmlFor="name">TL waxset</label>
              </div>
              <div className="right">
                <input
                  readOnly={true}
                  className="name form-control"
                  value={Helper.round(Waxset_Weight_T, 4)}
                  onChange={e => this._onChange(e)}
                  type="number"
                  id="Waxset_Weight_T"
                  name="Waxset_Weight_T"
                  required=""
                />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <div className="left">
                <label>TL vàng UT (gr)</label>
              </div>
              <div className="right">
                <input
                  readOnly={true}
                  className="name form-control"
                  value={(Product_Skeleton_Weight && SkeletonWeight) && GoldWeight_Estimate || ''}
                  onChange={e => this._onChange(e)}
                  type="number"
                  id="GoldWeight_Estimate"
                  name="GoldWeight_Estimate"
                  required=""
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (typeProcess === "CASTING") {
      listControls.push(
        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <div className="left">
                <label htmlFor="name">Cây đúc</label>
              </div>

              <div className="right" id="input_skeleton_product">
                {Satustoolbar === "ADD" ? (
                  <ComboboxMultiple
                    comboOther={"Skeleton"}
                    list_data_other={listSkeletion}
                    id="Skeleton"
                    value={Skeleton}
                    parentObject={this}
                  />
                ) : (
                    Skeleton
                  )}
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <div className="left">
                <label htmlFor="name">TL vàng tính</label>
              </div>
              <div className="right">
                <input
                  readOnly={true}
                  className="name form-control"
                  value={GoldWeight_Estimate}
                  onChange={e => this._onChange(e)}
                  type="number"
                  id="GoldWeight_Estimate"
                  name="GoldWeight_Estimate"
                  required=""
                />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <div className="left">
                <label htmlFor="name">TL vàng vào đúc</label>
              </div>
              <div className="right">
                <div>
                  <div style={{ float: "left", width: "80%" }}>
                    <input
                      readOnly={true}
                      className="name form-control"
                      value={Gold_Weight_IN_T || ""}
                      onChange={e => this._onChange(e)}
                      type="number"
                      id="Gold_Weight_IN_T"
                      name="Gold_Weight_IN_T"
                      required=""
                    />
                  </div>
                  <div style={{ float: "left", width: "30px" }}>
                    <button onClick={() => this.props.showFormGold(true)}>
                      <i className="fa fa-calculator" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <div className="left">
                <label htmlFor="name">TL vàng theo bag</label>
              </div>
              <div className="right">
                <input
                  readOnly={true}
                  className="name form-control"
                  value={Gold_Weight_OUT_T || ""}
                  onChange={e => this._onChange(e)}
                  type="number"
                  step="0.0001"
                  min="0"
                  id="Gold_Weight_OUT_T"
                  name="Gold_Weight_OUT_T"
                  required=""
                />
              </div>
            </div>
          </div>
        </div>,
        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <div className="left">
                <label>TL Carot trả</label>
              </div>
              <div className="right">
                <input
                  className="name form-control allownumericwithdecimal"
                  value={
                    [null, ""].indexOf(Gold_Weight2Store_T) !== -1
                      ? ""
                      : Helper.round(Gold_Weight2Store_T, 4)
                  }
                  onChange={e => this._onChange(e)}
                  type="number"
                  step="0.0001"
                  min="0"
                  id="Gold_Weight2Store_T"
                  name="Gold_Weight2Store_T"
                  required=""
                />
              </div>
            </div>
          </div>
          {typeProcess === "CASTING" ? (
            <div>
              <div className="col-md-3">
                <div className="form-group">
                  <div className="left">
                    <label htmlFor="name">TL vàng dư</label>
                  </div>
                  <div className="right" >
                    <input
                      readOnly={IsAdditionalWeight == 1 ? false : true}
                      className="name form-control"
                      value={BackGoldWeight_T}
                      onChange={e => this._onChange(e)}
                      type="number"
                      id="BackGoldWeight_T"
                      name="BackGoldWeight_T"
                      required=""
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-group">
                  <div className="left">
                    <label htmlFor="name">Vàng bổ sung</label>
                  </div>
                  <div className="right">
                    <input
                      readOnly={true}
                      className="name form-control"
                      value={AddGoldWeight_T}
                      onChange={e => this._onChange(e)}
                      type="number"
                      id="AddGoldWeight_T"
                      name="AddGoldWeight_T"
                      required=""
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
              ""
            )}
          <div className="col-md-3">
            <div className="form-group">
              <div className="left">
                <label>Hao hụt (gr)</label>
              </div>
              <div className="right">
                <input
                  readOnly={true}
                  className="name form-control"
                  value={Gold_Lost_T}
                  onChange={e => this._onChange(e)}
                  type="number"
                  id="Gold_Lost_T"
                  name="Gold_Lost_T"
                  required=""
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (["WAX_SETTING", "SKELETON", "CASTING"].indexOf(typeProcess) === -1) {
      listControls.push(
        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <div className="left">
                <label htmlFor="name">TL vàng vào (gr)</label>
              </div>
              <div className="right">
                <input
                  readOnly={IsUsePriorData == 1 ? true : false}
                  className="name form-control"
                  value={Gold_Weight_IN_T}
                  onChange={e => this._onChange(e)}
                  type="number"
                  id="Gold_Weight_IN_T"
                  name="Gold_Weight_IN_T"
                  required=""
                />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <div className="left">
                <label htmlFor="name">TL Vàng ra (gr)</label>
              </div>
              <div className="right">
                <input
                  readOnly={true}
                  className="name form-control"
                  value={Gold_Weight_OUT_T}
                  onChange={e => this._onChange(e)}
                  type="number"
                  id="Gold_Weight_OUT"
                  name="Gold_Weight_OUT"
                  required=""
                />
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <div className="left">
                <label htmlFor="name">Hao hụt (gr)</label>
              </div>
              <div className="right">
                <input
                  readOnly={true}
                  className="name form-control"
                  value={Gold_Lost_T}
                  onChange={e => this._onChange(e)}
                  type="number"
                  id="Gold_Lost_T"
                  name="Gold_Lost_T"
                  required=""
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="main__content">
        <Modal
          isOpen={isShowGold}
          style={customStyles}
          // onAfterOpen={() => this.afterOpenModal()}
          onRequestClose={() => this.closeModal()}
          contentLabel="Example Modal"
        >
          <div>
            <div style={{ textAlign: "right" }}>
              <button onClick={() => this.closeModal()}>Đóng</button>
            </div>
          </div>
          <ModalGoldWeightFormView />
        </Modal>
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
                            <label htmlFor="name">Loại vàng</label>
                          </div>
                          <div className="right" id="input_lv">
                            <Combobox
                              disable={
                                Satustoolbar === "ADD"
                                  ? countBag == 0
                                    ? false
                                    : true
                                  : true
                              }
                              type_code="LV"
                              value={CodeLV}
                              id="CodeLV"
                              parentObject={this}
                            />
                          </div>
                        </div>
                      </div>
                      {typeProcess === "SKELETON" ? (
                        <div className="col-md-3">
                          <div className="form-group">
                            <div className="left">
                              <label htmlFor="name">L/H</label>
                            </div>
                            <div className="right" id="input_lh">
                              <Combobox
                                disable={
                                  Satustoolbar === "ADD"
                                    ? countBag == 0
                                      ? false
                                      : true
                                    : true
                                }
                                type_code="LH"
                                value={CodeLH}
                                id="CodeLH"
                                parentObject={this}
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
                      {typeProcess === "CASTING" ? (
                        <div className="col-md-3">
                          <div className="form-group">
                            <div className="left">
                              <label htmlFor="name">TL vàng huỷ</label>
                            </div>
                            <div className="right">
                              <input
                                readOnly={true}
                                className="name form-control"
                                value={CancelGoldWeight_T}
                                onChange={e => this._onChange(e)}
                                type="text"
                                id="CancelGoldWeight_T"
                                name="CancelGoldWeight_T"
                                required=""
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                          ""
                        )}
                    </div>

                    {listControls}

                    {WorkerInTicket == 1 ? (
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <div style={{ width: "20%" }}>
                              <label htmlFor="name">Mã</label>
                            </div>
                            <div style={{ width: "78%" }}>
                              <ComboboxMultiple
                                disable={isBlock}
                                comboOther={"Worker"}
                                list_data_other={list_worker}
                                id="Worker"
                                value={Worker}
                                parentObject={this}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <div style={{ width: "20%" }}>
                              <label htmlFor="name">Ghi chú</label>
                            </div>
                            <div style={{ width: "78%" }}>
                              <input
                                readOnly={isBlock}
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
                    ) : (
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <div className="left" style={{ width: "10%" }}>
                                <label htmlFor="name">Ghi chú</label>
                              </div>
                              <div className="right" style={{ width: "90%" }}>
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
                      )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <div style={{ width: "100%" }}>
                        <div>
                          {["CASTING", "WAX_SETTING"].indexOf(typeProcess) ===
                            -1 && Status !== STATUS_PROCESS_ACCEPT ? (
                              <SearchBag key={"SearchBag"} />
                            ) : (
                              ""
                            )}
                          <ListBag key={"order"} />
                        </div>
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
  { userAuth, i18n, list, toolbar, ticket_proc, header },
  ownProps
) => {
  return {
    list,
    userAuth,
    i18n,
    ownProps,
    toolbar,
    ticket_proc,
    header
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
)(DetailFormView);
