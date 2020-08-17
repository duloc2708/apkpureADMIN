import * as castingProcActions from "modules/ticket_proc/actions/form";
import * as listActions from "modules/list/actions/form";
import * as headerActions from "modules/header/actions/form";
import * as toolbarActions from "modules/toolbar/actions/form";
import * as commonActions from "modules/common/actions/form";
const {
  PARTIAL_STONE,
  STATUS_PROCESS_ACCEPT,
  STATUS_PROCESS_FINISH
} = require("./Constant");

const typeProcess = Helper.getParam(window.location.href, "type");

class ListCastingProcFormView extends React.Component {
  constructor() {
    super();
    this.state = {
      codeCasting: ""
    };
  }

  componentWillUnmount() {
    this.props.resetInfoPage();
  }
  _onClickRow(item, checked) {
    this.props.clickCheckRowCasting(item, checked);
  }

  _onRowDetail(item, checked) {
    this.props.clickCheckRowCasting(item, checked);
  }
  _EditCasting() {
    this.props.isEditCasting(true);
  }
  changeKeyCode(value, e) {
    let { status } = this.props.toolbar;
    if (status !== "EDIT") {
      // ctrl+ enter
      if (value == "CTRL_ENTER") {
        $(":input[type='text']:enabled:visible:first").focus();
      }
    }
  }
  componentDidMount() {
    // get list type
    const list = ["LV", "LD", "LH"];
    this.props.getConfigProcess().then(() => {
      this.props.getDataWoker("EMPLOYEE").then(() => {
        this.props.getListBagInTicket();
        this.props.getListHeaderTable();
      });
    });

    // focus ô input đầu tiên
    $(":input[type='text']:enabled:visible:first").focus();
    // sự kiện gõ enter tìm kiếm
    KeyboardJS.bind("enter", event => {
      if ($("#codeCasting").is(":focus")) {
        this._onSearch();
      }
    });


    // link tu man hinh tim kiem bag
    const referId = Helper.getParam(window.location.href, "referId");
    if (referId) {
      this.props.getListTypeByListCode(list).then(() => {
        this.props.updateButtonToolbar("EDIT");
        this.props.isEditCasting(true);
        this.props.getTicketProcDetail(referId).then((data) => {
          this.props.clickCheckRowCasting(data, true).then(() => {
            this.props.getDataDetailByCode();
            this.props.getDataDetailStoneByCode(referId);
          });
        })
      });


    } else {
      this.props.getListTypeByListCode(list);
      this.props.getListDataTicketProc("");
    }
  }
  _onSearch() {
    this.props.resetInfoPage().then(() => {
      this.props.getListDataTicketProc(
        this.refs.codeCasting && this.refs.codeCasting.value
      );
    });
  }
  _handleInput(e) {
    this.setState({ codeCasting: e.target.value });
  }
  _validateBag() {
    let isValid = true;
    let str = "";
    let type = 0;
    let { listBagSelected } = this.props.ticket_proc;
    listBagSelected.forEach(item => {
      if (
        typeProcess === "WAX_SETTING" &&
        (item.statusBag === PARTIAL_STONE || !item.statusBag)
      ) {
        isValid = false;
        type = 1;
        str += item.IdBag + ",";
      }
    });
    if (!isValid) {
      this.child._addNotification(
        `Vui lòng nhập đầy đủ worker các Bag: ${str}`,
        "warning"
      );
    }
    return isValid;
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

  _acceptStatus(obj) {
    this.props.acceptStatus(obj).then(res => {
      this.child._addNotification(`Cập nhật thành công`, "success");
      this.props.getListDataTicketProc(
        this.refs.codeCasting && this.refs.codeCasting.value
      );
    });
  }
  _acceptOrder(item, Status) {
    let obj = {
      CodeTicket: item.CodeTicket,
      StatusValue: Status
    };
    this.props.validateTicket(obj).then(res => {
      const { data } = res.data;
      if (data && data[0]) {
        const result = data[0].OUTPUT;
        if (result == "ok") {
          this.props.getDataDetailByCode(item.CodeTicket).then(data => {
            if (!this._validateBag()) {
              return;
            }

            if (
              [STATUS_PROCESS_ACCEPT, STATUS_PROCESS_FINISH].indexOf(
                item.Status
              ) === -1 &&
              Status == STATUS_PROCESS_ACCEPT
            ) {
              var r = confirm(`Bạn cón muốn xác nhận?`);
              if (r == true) {
                this._acceptStatus(obj);
              }
            } else if (
              item.Status === STATUS_PROCESS_ACCEPT &&
              Status === STATUS_PROCESS_FINISH
            ) {
              var r = confirm(`Bạn cón muốn hoàn thành ?`);
              if (r == true) {
                this._acceptStatus(obj);
              }
            }
          });
        } else {
          this.child._addNotification(result, "warning");
        }
      }
    });
  }

  _onNext(obj) {
    this.props.getListDataOrder(obj.params);
  }
  _onPrevious(obj) {
    this.props.getListDataOrder(obj.params);
  }
  _onChangePage(obj) {
    this.props.getListDataTicketProc(
      this.refs.codeCasting && this.refs.codeCasting.value
    );
  }
  onClickButtonPermission(obj) {
    let { data, nameBtn } = obj;
    let { item, checked, typePrint, Status } = data;
    switch (nameBtn) {
      case "PRINT":
        this.props.printDetail(item);
        break;
      case "EDIT":
        this._EditCasting(item);
        this.props.updateButtonToolbar("EDIT");
        this.props.clickCheckRowCasting(item, checked).then(() => {
          this.props.getDataDetailByCode();
          this.props.getDataDetailStoneByCode(item.CodeTicket);
        });
        break;
      case "DETAIL":
        this._EditCasting(item);
        this.props.clickCheckRowCasting(item, checked).then(() => {
          this.props.getDataDetailByCode();
          this.props.getDataDetailStoneByCode(item.CodeTicket);
        });
        break;
      case "ACCEPT_ORDER":
        this._acceptOrder(item, Status);
        break;
      case "COMPlETED_OUTPUT":
        this._acceptOrder(item, Status);
        break;
      default:
        break;
    }
  }
  render() {
    let { list_data, listHeaderTable, objConfig } = this.props.ticket_proc;
    let { IsIncludeInOut, WorkerInTicket } = objConfig;
    IsIncludeInOut = 0
    return (
      <div>
        <ConfigKeyCode parentObject={this} />
        <AlertCustom onRef={ref => (this.child = ref)} />
        <div className="form__personnal">
          <div className="row">
            <div className="col-md-5">
              <div className="form-group ">
                <div className="left">
                  <label htmlFor="name">Mã / tên sản phẩm</label>
                </div>
                <div className="right">
                  <input
                    className="name form-control"
                    value={this.state.codeCasting}
                    onChange={e => this._handleInput(e)}
                    type="text"
                    ref="codeCasting"
                    id="codeCasting"
                    name="codeCasting"
                  />
                  <span className="wpcf-not-valid-tip wpcf-display-none"></span>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group">
                <div
                  className="left"
                // onClick={() => this._onSearch()}
                >
                  <button className="btn btn-primary">Tìm kiếm</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              {/* <th scope="col">
                <label>
                  <input
                    type="checkbox"
                    //onChange={() => this._checkAllRow(allChecked)}
                  />
                </label>
              </th> */}
              {listHeaderTable.map((item, i) => {
                let { key, title } = item;
                if (WorkerInTicket != 1 && key == "WORKER") {
                  return;
                }
                return (
                  <th
                    style={{ textAlign: "left" }}
                    key={`thead_${key}`}
                    scope="col"
                  >
                    {title}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {list_data &&
              list_data.map((item, i) => {
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
                  Worker,
                  StatusName,
                  checked
                } = item;
                const columns = [];
                if (WorkerInTicket == 1) {
                  columns.push(<td>{Worker}</td>);
                }
                columns.push(
                  <td>{Helper.round(Waxset_Weight_T || 0, 4)}</td>,
                  <td>{Helper.round(Product_Weight_OUT_T || 0, 4)}</td>,
                  <td>{Helper.round(Broken_Weight_OUT_T || 0, 4)}</td>,
                  <td>{Helper.round(Gold_Weight_OUT_T || 0, 4)}</td>
                );
                if (IsIncludeInOut != 0) {
                  columns.push(
                    <td>{Helper.round(Product_Weight_IN_T || 0, 4)}</td>,
                    <td>{Helper.round(Broken_Weight_IN_T || 0, 4)}</td>,
                    <td>{Helper.round(Gold_Weight_IN_T || 0, 4)}</td>
                  );
                }
                columns.push(<td>{Helper.round(Gold_Lost_T || 0, 4)}</td>);
                return (
                  <tr
                    tabIndex={i}
                    key={`data_${IdTicket}`}
                  // onDoubleClick={() => this._onClickRowDouble(item, !checked)}
                  >
                    {/* <th scope="row">
                      <label>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => this._onClickRow(item, !checked)}
                        />
                      </label>
                    </th> */}
                    <td>{CodeTicket}</td>
                    <td>{Name}</td>
                    <td>
                      {moment
                        .utc(ValueDate || new Date())
                        .format("DD/MM/YYYY HH:mm:ss")}
                    </td>
                    <td>{CodeLV}</td>
                    {columns}
                    <td>{StatusName}</td>
                    <ButtonPermission
                      type="ACCEPT_ORDER"
                      key="ACCEPT_ORDER"
                      nameBtn="ACCEPT_ORDER"
                      icon={`fa fa-check`}
                      data={{ item: item, Status: STATUS_PROCESS_ACCEPT }}
                      parentObject={this}
                    />
                    <ButtonPermission
                      type="COMPlETED_OUTPUT"
                      key="COMPlETED_OUTPUT"
                      nameBtn="COMPlETED_OUTPUT"
                      icon={`fa fa-check`}
                      data={{ item: item, Status: STATUS_PROCESS_FINISH }}
                      parentObject={this}
                    />
                    <ButtonPermission
                      type="EDIT"
                      key="EDIT"
                      nameBtn="EDIT"
                      icon={`fa fa-pencil-square-o`}
                      data={{
                        item: item,
                        checked: checked ? checked : !checked
                      }}
                      parentObject={this}
                    />
                    <ButtonPermission
                      type="PRINT"
                      key="PRINT"
                      nameBtn="PRINT"
                      icon={`fa fa-print`}
                      data={{
                        item: item
                      }}
                      parentObject={this}
                    />
                    <ButtonPermission
                      type="DETAIL"
                      key="DETAIL"
                      nameBtn="DETAIL"
                      icon={`fa fa-info-circle`}
                      data={{
                        item: item,
                        checked: checked ? checked : !checked
                      }}
                      parentObject={this}
                    />
                  </tr>
                );
              })}
          </tbody>
        </table>
        <PagingTable type="product" parentObject={this} />
      </div>
    );
  }
}

const mapStateToProps = (
  { userAuth, i18n, common, ticket_proc, header, toolbar },
  ownProps
) => {
  return {
    userAuth,
    i18n,
    common,
    ownProps,
    ticket_proc,
    header,
    toolbar
  };
};

const mapDispatchToProps = dispatch => {
  return Redux.bindActionCreators(
    {
      ...ReactRouterRedux.routerActions,
      ...castingProcActions,
      ...listActions,
      ...headerActions,
      ...toolbarActions,
      ...commonActions
    },
    dispatch
  );
};
export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(ListCastingProcFormView);
