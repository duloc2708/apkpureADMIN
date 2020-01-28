import {
  BootstrapTable,
  TableHeaderColumn,
  ButtonGroup
} from "react-bootstrap-table";
import ListFieldFormView from "./ListFieldFormView";
import * as usersActions from "modules/users/actions/form";
import * as otherListActions from "modules/other_list/actions/form";
import Toolbar from "../toolbar/Toolbar";
import * as toolbarActions from "modules/toolbar/actions/form";

class OtherListFormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: []
    };
  }
  componentWillMount() {
    this.props.initConfigTable();
  }
  componentDidMount() {
    this.props.getListData();
  }

  onDeleteRow(_id) {}
  onClickProductSelected(cell, row, rowIndex) {
    // temp_time_up = '';
    this.showRow(row);
  }
  cellButton(cell, row, enumObject, rowIndex) {
    return (
      <button
        className="btn btn-success btn-icon"
        type="button"
        onClick={() => this.onClickProductSelected(cell, row, rowIndex)}
      >
        Cập nhật
      </button>
    );
  }
  onAfterSaveCell(value, name) {
    let id = "ID";
    let column = name;
    let obj = {};
    obj["_id"] = value["_id"];
    obj["COLUMN"] = name;
    obj["VALUE"] = value[name];
    fetch(URL_AUTH_API + "/typearticles_update", {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    });
  }

  addTodo(value) {
    this.setState({ isOpen: false, result: [] });
    //window.location.reload();
    //this.loaddata();
    setTimeout(() => {
      this.loaddata();
    }, 1000);
  }
  addCancel() {
    this.setState({ isOpen: false });
  }
  componentWillUnmount() {
    this.props.clearDataUsers();
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
  _onRemove(item){
    this.props.removeData(item).then(res => {
      this.child._addNotification(`Cập nhật thành công!`, "success");
      this.props.getListData();
    });
  }
  render() {
    var selectRowProp = {
      clickToSelect: true,
      clickToSelectAndEditCell: true,
      mode: "radio"
    };
    const cellEditProps = {
      mode: "dbclick",
      blurToSave: true,
      afterSaveCell: this.onAfterSaveCell
    };
    const options = {
      onDeleteRow: this.onDeleteRow,
      paginationPosition: "bottom"
    };
    let { title, listField, list_data, objData } = this.props.other_list;
    let that = this;
    return (
      <div style={{ margin: "10px", marginBottom: "50px", height: "500px" }}>
        <AlertCustom onRef={ref => (this.child = ref)} />
        <Toolbar parentObject={this} />
        <br />
        <ListFieldFormView parentObject={this} />
        <div className="panel panel-default">
          <div className="panel-body">
            <div className="table-responsive" style={{ marginTop: "10px" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th key={`check_all`}>
                      <input type="checkbox" checked={false} />
                    </th>
                    {listField.map((item, i) => {
                      return <th key={item.code}>{item.label}</th>;
                    })}
                    <th key={`th_remove`}>{`Xoá`}</th>
                  </tr>
                </thead>
                <tbody>
                  {list_data.map((itemDta, i) => {
                    let listCol = [];
                    Object.keys(itemDta).forEach(function(item) {
                      if (item === "checked") {
                        listCol.push(
                          <td key={`td_${i}_${item}`}>
                            <input
                              type="checkbox"
                              checked={itemDta[item]}
                              onChange={() =>
                                that._checkClickRow(itemDta, !itemDta[item])
                              }
                            />
                          </td>
                        );
                      } else {
                        if (item !== "id") {
                          listCol.push(
                            <td key={`td_${i}_${item}`}>{itemDta[item]}</td>
                          );
                        }
                      }
                    });
                    return (
                      <tr
                        key={itemDta.id}
                        onClick={() =>
                          that._checkClickRow(itemDta, !itemDta.checked)
                        }
                      >
                        {listCol}
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

const mapStateToProps = ({ i18n, users, other_list }, ownProps) => {
  return {
    i18n,
    ownProps,
    users,
    other_list
  };
};
const mapDispatchToProps = dispatch => {
  return Redux.bindActionCreators(
    {
      ...ReactRouterRedux.routerActions,
      ...usersActions,
      ...otherListActions,
      ...toolbarActions
    },
    dispatch
  );
};
export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(OtherListFormView);
