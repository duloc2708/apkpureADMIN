import * as modalActions from "modules/modal/actions/form";
import * as dimmerActions from "modules/dimmer/actions/form";
import LoginFormView from "modules/login/LoginFormView";
import ToolbarFormView from "modules/toolbar/ToolbarFormView";
import BrackcrumFromView from "modules/brackcrum/BrackcrumFromView";
import * as castingProcActions from "modules/ticket_proc/actions/form";
const { Translate, I18n } = ReactReduxI18n;
class WaxSettingModalStoneFormView extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  _changeStatus(status) {
    this.setState({ status: !status });
  }
  _checkClickRow(item) {
    // this.props.clickCheckRowTabStone(item)
  }
  _checkAllRow(value) {
    this.props.checkAllRow(!value);
  }
  _myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  ChangeValueCell(obj) {
    if (obj.key == "BrokenQty") {
      this.props.updateCellBrokenQty(obj);
    }
  }
  _onRemove(item) {
    var r = confirm(I18n.t(`alert.delete`));
    if (r == true) {
      this.props.removeItemProduct(item);
    }
  }

  _onChangeQty(e) {
    let { id, value } = e.target;
    let obj = {
      id: id,
      value: value,
      key: "QtyAssignProduct"
    };
    this.props.updateCellStoneWaxSetting(obj);
  }

  handleClick() {}
  ChangeValueComboboxMulti(obj) {
    let { key, data } = obj;
    let objData = {
      id: key,
      value: data,
      key: "Worker"
    };
    this.props.updateCellStoneWaxSetting(objData);
  }

  render() {
    let {
      listStoneWaxset,
      listHeaderModalStoneBroken,
      objBagDetail,
      typeInOut,
      list_worker,
      objConfig
    } = this.props.ticket_proc;
    let totalWeightBroken = 0;
    let { WorkerInTicket } = objConfig;
    listStoneWaxset = listStoneWaxset.filter(
      x => x.IdBag === objBagDetail.IdBag
    );
    return (
      <div style={{ height: "350px" }}>
        <AlertCustom onRef={ref => (this.child = ref)} />
        <table className="table table-striped">
          <thead>
            <tr>
              <th
                style={{ textAlign: "left" }}
                key={`thead_${`plus`}`}
                scope="col"
              ></th>
              {listHeaderModalStoneBroken.map((item, i) => {
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
          <tbody id="table_product">
            {listStoneWaxset &&
              listStoneWaxset.map((item, i) => {
                let {
                  orderby,
                  Id,
                  INOUT,
                  IdTicket,
                  IdTicketDetail,
                  CodeProcess,
                  CodeTicket,
                  IdBag,
                  IdOrder,
                  IdProduct,
                  IdProductParent,
                  IdStone,
                  Color,
                  ColorName,
                  QtyProduct,
                  QtyStonePcs,
                  QtyStone,
                  AvgStone,
                  WeightPerQty,
                  BrokenQty,
                  BrokenWeight,
                  BrokenRate,
                  Worker,
                  QtyAssignProduct,
                  IdGroup
                } = item;
                return (
                  <tr key={`data_${i}`} id={`tr_${orderby}`}>
                    <td>
                      <button onClick={() => this._onSplitProduct(item)}>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                      </button>
                    </td>
                    <td>{i + 1}</td>
                    <td>{IdBag}</td>
                    <td style={{ width: `280px` }} id={`tr_${i}_worker`}>
                      <ComboboxMultiple
                        comboOther={"Worker"}
                        list_data_other={list_worker}
                        id={orderby}
                        value={Worker}
                        parentObject={this}
                      />
                    </td>
                    {/* <td style={{ width: `100px` }}>
                      <input
                        id={orderby}
                        className={`name form-control`}
                        type="text"
                        value={QtyAssignProduct}
                        onChange={e => this._onChangeQty(e)}
                        name="QtyAssignProduct"
                      />
                    </td> */}
                    <td>{QtyAssignProduct}</td>
                    <td>{IdProduct}</td>
                    <td>{QtyProduct}</td>
                    <td>{QtyStone}</td>
                    <td>{IdStone}</td>
                    <td>{IdOrder}</td>
                    <td onClick={() => this._onRemove(item)}>
                      <button>
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                );
                // }
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (
  { userAuth, i18n, header, ticket_proc, toolbar },
  ownProps
) => {
  return {
    userAuth,
    i18n,
    ownProps,
    header,
    ticket_proc,
    toolbar
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
)(WaxSettingModalStoneFormView);
