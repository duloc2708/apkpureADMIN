import * as castingProcActions from "modules/ticket_proc/actions/form";
const { Translate, I18n } = ReactReduxI18n;
class ModalGoldWeightFormView extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {}
  _onKeyPressGold() {}
  _onSearchGold() {
    this.props.filterSearchGold();
  }
  _onChangeValueLV(e) {
    let { objSearchGold } = this.props.ticket_proc;
    let objSearchGoldTemp = _.clone(objSearchGold, true);
    objSearchGoldTemp["valueLV"] = e.target.value;
    this.props.changeSearchGold(objSearchGoldTemp);
  }
  _onShow(e, status) {
    let { objSearchGold } = this.props.ticket_proc;
    let objSearchGoldTemp = _.clone(objSearchGold, true);
    objSearchGoldTemp["isHasInput"] = status;
    this.props.changeSearchGold(objSearchGoldTemp);
  }
  _onChangeWeight(e, item) {
    let value = e.target.value;
    let obj = {
      key: e.target.id,
      value: value
    };
    if (value > item.TF_Weight) {
      this.child._addNotification(`Vượt mức tồn kho!`, "error");
      return;
    }
    this.props.changeWeightGold(obj);
  }
  render() {
    let {
      listHeaderGoldWeight,
      listWeightGold,
      listGoldSelected,
      objConfig,
      objSearchGold,
      objData
    } = this.props.ticket_proc;
    let totalWeight = 0;
    if (objSearchGold.valueLV) {
      listGoldSelected = listGoldSelected.filter(
        x => x.ValueLV === parseFloat(objSearchGold.valueLV)
      );
    }
    if (objSearchGold.isHasInput) {
      listGoldSelected = listGoldSelected.filter(
        x => x.TF_Weight_Default != ""
      );
    }
    listGoldSelected.forEach(item => {
      totalWeight += parseFloat(item.TF_Weight_Default || 0);
    });
    return (
      <div style={{ height: "350px" }}>
        <AlertCustom onRef={ref => (this.child = ref)} />

        <div className="row">
          <div className="col-md-4">
            <div className="form-group ">
              Mã ticket: <label htmlFor="name">{objData.CodeTicket}</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group ">
              Loại vàng cần đúc: <label htmlFor="name">{objData.CodeLV}</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group ">
              TL vàng ước tính (gr):{" "}
              <label htmlFor="name">{objData.GoldWeight_Estimate}</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <input
              onChange={e => this._onChangeValueLV(e)}
              placeholder="Tìm kiếm ..."
              className="name form-control"
              type="text"
              value={objSearchGold.valueLV}
              id="valueLV"
              name="valueLV"
            />
          </div>
          <div className="col-md-3">
            <div className="right">
              <input
                onChange={e => this._onShow(e, !objSearchGold.isHasInput)}
                type="checkbox"
                checked={objSearchGold.isHasInput}
                id="isHasInput"
                name="isHasInput"
              />
              TL đã nhập
            </div>
          </div>
        </div>
        <table className="table table-fixed">
          <thead>
            <tr>
              {listHeaderGoldWeight.map((item, i) => {
                let { key, title, col } = item;
                return (
                  <th
                    className={`col-xs-${col}`}
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
            {listGoldSelected &&
              listGoldSelected.map((item, i) => {
                const { ValueLV, TF_Weight, TF_Weight_Default, orderby,TF_Weight_Convert } = item;
                let TF_Weight_Default_Li = "";
                let TF_Weight_Convert_Li = "";
                let LV = parseFloat(objData.ValueLV || 0);
                if (TF_Weight_Default) {
                  TF_Weight_Default_Li = Helper.round(
                    TF_Weight_Default / 0.0375,
                    1
                  );
                  TF_Weight_Convert_Li = Helper.round(
                    TF_Weight_Convert / 0.0375,
                    1
                  );
                }
                return (
                  <tr key={`data_${i}`} id={`tr_${i}`}>
                    <td className="col-xs-1">{ValueLV}</td>
                    <td className="col-xs-1">
                      {Helper.round(TF_Weight / 0.0375, 1)}
                    </td>
                    <td className="col-xs-2">{Helper.round(TF_Weight, 4)}</td>
                    <td className="col-xs-2">
                      <input
                        onChange={e => this._onChangeWeight(e, item)}
                        onKeyDown={e => this._onKeyPressGold(e, i)}
                        id={orderby}
                        className={`name form-control`}
                        type="text"
                        value={TF_Weight_Default}
                        name="TF_Weight_Default"
                      />
                    </td>
                    <td className="col-xs-2">{TF_Weight_Default_Li}</td>
                    <td className="col-xs-2">{TF_Weight_Convert}</td>
                    <td className="col-xs-2">{TF_Weight_Convert_Li}</td>
                  </tr>
                );
                // }
              })}
          </tbody>
        </table>
        <div style={{ float: "right" }}>
          Tổng cộng TL loại vàng cần đúc (gr):{" "}
          <b>{objData.Gold_Weight_IN_T}</b> (li):{" "}
          <b>{Helper.round(objData.Gold_Weight_IN_T/0.0375,1)}</b>
        </div>
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
)(ModalGoldWeightFormView);
