import * as ticketProcessActions from "modules/ticket_proc/actions/form";
import { validateAddBag } from "./Util";
const {
  STATUS_PROCESS_ACCEPT,
  LIST_PROCESS_PREV_SPURE
} = require("./Constant");
const typeProcess = Helper.getParam(window.location.href, "type");

class SearchBag extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    KeyboardJS.bind("enter", event => {
      if ($("#params_bag").is(":focus")) {
        this._onSearchBag();
      }
    });
  }
  _onSearchBag() {
    const valueSearch = this.refs.params_bag && this.refs.params_bag.value;
    if (valueSearch) {
      this.props.findBagInProcess(valueSearch);
    }
  }
  _onAddBagRow(item) {
    let {
      listBagInProcess,
      objConfig,
      objData,
      listBagSelected
    } = this.props.ticket_proc;
    item.Id = item.IdBag;
    item.isSearch = true;

    const finData = listBagInProcess.find(
      x => x.CodeProcess == typeProcess && x.IdBag == item.IdBag
    );
    if (finData) {
      alert(`Bag ${item.IdBag} đã được tạo ở quy trình này!`);
      return;
    }
    const objBag = validateAddBag(
      item.IdBag,
      objData,
      objConfig,
      listBagInProcess,
      listBagSelected,
      item
    );

    if (objBag)
      this.props.updateExistBag(objBag).then(() => {
        this.props.getProductsByTicket(objBag.CodeTicket);
      });
  }
  _onAddAllBag() {
    let {
      listBagInProcess,
      listBagSelected,
      objConfig,
      objData
    } = this.props.ticket_proc;
    let type = 0;
    let strBag = "";
    listBagInProcess.forEach((item, i) => {
      if (!type && item.CodeProcess == typeProcess) {
        strBag += item.IdBag + ",";
        type = 1;
      }
      if (!type && !item.Status) {
        strBag += item.IdBag + ",";
        type = 2;
      }
    });
    if (type == 1) {
      alert(`Bag ${strBag} đã được tạo ở quy trình này!`);
    }
    if (type == 2) {
      alert(`Bag ${strBag} chưa xác nhận ở quy trình trước đó!`);
    }
    let invalid = true;
    listBagInProcess.forEach(item => {
      if (invalid) {
        const objBag = validateAddBag(
          item.IdBag,
          objData,
          objConfig,
          listBagInProcess,
          listBagSelected
        );
        if (!objBag) {
          invalid = false;
        }
      }
    });

    if (invalid) {
      listBagInProcess.forEach(item => {
        let objDataParent = _.clone(objData, true);
        const objBag = validateAddBag(
          item.IdBag,
          objDataParent,
          objConfig,
          listBagInProcess,
          listBagSelected
        );
        if (objBag) {
          this.props.updateExistBag(_.clone(objBag, true)).then(() => {
            // if (LIST_PROCESS_PREV_SPURE.indexOf(typeProcess) === -1) {
            //   that.props.getProductsByTicket(objBag.CodeTicketPrev);
            // }
            // this.props.getProductsByTicket(objBag.CodeTicket);
          });
        }
      });
    }
  }

  render() {
    let {
      objData,
      listHeaderBagSearch,
      listBagInProcess
    } = this.props.ticket_proc;
    return (
      <div id="table-search">
        <div className="row">
          <div className="col-md-12">
            <div className="form-group ">
              <div className="left">
                <input
                  style={{ width: "100%" }}
                  className="name form-control"
                  type="text"
                  ref="params_bag"
                  id="params_bag"
                  name="params_bag"
                />
                <span className="wpcf-not-valid-tip wpcf-display-none"></span>
              </div>
              <div
                onClick={() => this._onSearchBag()}
                style={{ paddingLeft: "10px" }}
                className="right"
              >
                <button
                  className="btn btn-primary"
                  onClick={() => this._onSearchBag()}
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th style={{ textAlign: "left" }} key={`thead_all`} scope="col">
                <label>
                  <td>
                    <button onClick={() => this._onAddAllBag()}>
                      <i className="fa fa-plus" aria-hidden="true"></i>
                    </button>
                  </td>
                </label>
              </th>
              {listHeaderBagSearch.map((item, i) => {
                let { key, title } = item;
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
          <tbody id="table_bag_search">
            {listBagInProcess.length > 0 &&
              listBagInProcess.map((item, i) => {
                const {
                  CodeTicket,
                  IdBag,
                  IdOrder,
                  created_date,
                  ProcessName,
                  StatusProcess,
                  codeLV,
                  codeLH,
                  nameLH
                } = item;
                return (
                  <tr key={`bag_${item.IdBag}_${CodeTicket}`}>
                    <td>
                      <button onClick={() => this._onAddBagRow(item)}>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                      </button>
                    </td>
                    <td>{CodeTicket}</td>
                    <td>{IdBag}</td>
                    <td>{codeLV}</td>
                    <td>{nameLH}</td>
                    <td>{IdOrder}</td>
                    <td>{ProcessName}</td>
                    <td>
                      {moment
                        .utc(created_date || new Date())
                        .format("DD/MM/YYYY HH:mm:ss")}
                    </td>
                    <td>{StatusProcess}</td>
                  </tr>
                );
              })}
            {listBagInProcess.length == 0 ? (
              <tr key={`bag_no_data`}>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  Không tìm thấy dữ liệu
                </td>
              </tr>
            ) : (
              ""
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ userAuth, i18n, header, ticket_proc }, ownProps) => {
  return {
    userAuth,
    i18n,
    ownProps,
    header,
    ticket_proc
  };
};
const mapDispatchToProps = dispatch => {
  return Redux.bindActionCreators(
    {
      ...ReactRouterRedux.routerActions,
      ...ticketProcessActions
    },
    dispatch
  );
};
export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBag);
