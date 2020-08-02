import {
  BootstrapTable,
  TableHeaderColumn,
  ButtonGroup
} from "react-bootstrap-table";
import * as tableConfigActions from "modules/table_config/actions/form";
import Toolbar from "../toolbar/Toolbar";
import * as toolbarActions from "modules/toolbar/actions/form";

class TableConfigFormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: []
    };
  }
  componentDidMount() {
    this.props.getListData();
  }

  AddNew() {
    this.props.openModalDetailUsers(true);
  }
  delButton(cell, row, enumObject, rowIndex) {
    return (
      <button
        className="btn btn-danger btn-icon"
        type="button"
        onClick={() => this.onDeleteProductSelected(cell, row)}
      >
        Xoá
      </button>
    );
  }
  editButton(cell, row, enumObject, rowIndex) {
    return (
      <button
        className="btn btn-warning btn-icon"
        type="button"
        onClick={() => this.props.editInputItemUsers(row)}
      >
        sửa
      </button>
    );
  }
  onDeleteProductSelected(row) {
    var txt;
    var r = confirm(`Bạn có muốn xoá chuyên mục này ?`);
    if (r == true) {
      this.props.deleteUsers(row.id).then(res => {
        alert("cập nhật chuyên mục thành công!");
        this.props.getListUsers();
      });
    }
  }
  _checkClickRow(item, status) {
    this.props.editDataOtherList(item);
  }
  ChangeButtonToolbar(item) {
    switch (item.key) {
      case "ADD":
        this.props.clearData();
        break;
      case "SAVE":
        this.props.saveOtherList().then(res => {
          this.props.getListData();
          this.child._addNotification(`Cập nhật thành công!`, "success");
        });
        break;
      default:
        break;
    }
    this.props.changeStatusButton(item);
  }
  _onRemove(item) {
    this.props.removeData(item).then(res => {
      this.child._addNotification(`Cập nhật thành công!`, "success");
      this.props.getListData();
    });
  }
  render() {
    let { listHeader, list_data, objData } = this.props.tableConfig;
    return (
      <div style={{ margin: "10px", marginBottom: "50px", height: "500px" }}>
        <AlertCustom onRef={ref => (this.child = ref)} />
        <Toolbar parentObject={this} />
        <br />
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="table-responsive" style={{ marginTop: "10px" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th key={`check_all`}>
                      <input type="checkbox" checked={false} />
                    </th>
                    {listHeader.map((item, i) => {
                      return <th key={item.code}>{item.label}</th>;
                    })}
                    <th key={`th_remove`}>{`Xoá`}</th>
                  </tr>
                </thead>
                <tbody>
                  {list_data.map((itemDta, i) => {
                    return (
                      <tr
                        key={itemDta.id}
                        // onClick={() =>
                        //   that._checkClickRow(itemDta, !itemDta.checked)
                        // }
                      >
                        <td>{itemDta.code}</td>
                        <td>{itemDta.title}</td>
                        <td>
                          <button onClick={() => this._onRemove(itemDta)}>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ i18n, tableConfig }, ownProps) => {
  return {
    i18n,
    ownProps,
    tableConfig
  };
};
const mapDispatchToProps = dispatch => {
  return Redux.bindActionCreators(
    {
      ...ReactRouterRedux.routerActions,
      ...toolbarActions,
      ...tableConfigActions
    },
    dispatch
  );
};
export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(TableConfigFormView);
