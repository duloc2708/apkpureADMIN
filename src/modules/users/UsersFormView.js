
import { BootstrapTable, TableHeaderColumn, ButtonGroup } from 'react-bootstrap-table';
import DetailFormView from './DetailFormView';
import * as usersActions from 'modules/users/actions/form'
class UsersFormView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: []
        }
    }
    componentDidMount() {
        this.props.getListUsers()
    };


    onDeleteRow(_id) {

    }
    onClickProductSelected(cell, row, rowIndex) {
        // temp_time_up = '';
        this.showRow(row)
    }
    cellButton(cell, row, enumObject, rowIndex) {
        return (
            <button className="btn btn-success btn-icon"
                type="button"
                onClick={() =>
                    this.onClickProductSelected(cell, row, rowIndex)}
            >
                Cập nhật
            </button>
        )
    }
    onAfterSaveCell(value, name) {
        let id = "ID";
        let column = name;
        let obj = {};
        obj["_id"] = value["_id"];
        obj["COLUMN"] = name;
        obj["VALUE"] = value[name];
        fetch(URL_AUTH_API + '/typearticles_update', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
    }

    addTodo(value) {
        this.setState({ isOpen: false, result: [] })
        //window.location.reload();
        //this.loaddata();
        setTimeout(() => {
            this.loaddata();
        }, 1000)

    }
    addCancel() {
        this.setState({ isOpen: false })
    }
    componentWillUnmount() {
        this.props.clearDataUsers()
    }
    AddNew() {
        this.props.openModalDetailUsers(true)
    };
    delButton(cell, row, enumObject, rowIndex) {
        return (
            <button className="btn btn-danger btn-icon"
                type="button"
                onClick={() =>
                    this.onDeleteProductSelected(cell, row)}
            >
                Xoá
            </button>
        )
    }
    editButton(cell, row, enumObject, rowIndex) {
        return (
            <button className="btn btn-warning btn-icon"
                type="button"
                onClick={() => this.props.editInputItemUsers(row)} >
                sửa
            </button>
        )
    }
    onDeleteProductSelected(row) {
        var txt;
        var r = confirm(`Bạn có muốn xoá chuyên mục này ?`);
        if (r == true) {
            this.props.deleteUsers(row.id).then(res => {
                alert('cập nhật chuyên mục thành công!')
                this.props.getListUsers()
            })
        }
    }
    render() {
        var selectRowProp = { clickToSelect: true, clickToSelectAndEditCell: true, mode: "radio" };
        const cellEditProps = {
            mode: "dbclick",
            blurToSave: true,
            afterSaveCell: this.onAfterSaveCell
        };
        const options = {
            onDeleteRow: this.onDeleteRow,
            paginationPosition: 'bottom'
        };
        let { list_data, listHeader, isOpen } = this.props.users
        return (
            <div style={{ "margin": "10px", "marginBottom": "50px", "height": "500px" }} >
                <ButtonAddNew parentObject={this} />
                {isOpen ? <DetailFormView parentObject={this} /> : ''}
                {
                    !isOpen ?
                        <div className="table-responsive" style={{ "marginTop": "10px" }}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        {
                                            listHeader.map((item, i) => {
                                                return (
                                                    <th key={item.key}>{item.title}</th>
                                                )
                                            })
                                        }

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        list_data.map((item, i) => {
                                            let { id, username, email, status, fullname } = item
                                            return (
                                                <tr key={id}>
                                                    <td>{username}</td>
                                                    <td>{fullname}</td>
                                                    <td>{email}</td>
                                                    <td>{status}</td>
                                                    <td><button
                                                        onClick={() => this.props.editInputItemUsers(item)}
                                                        className="btn btn-warning btn-icon"
                                                        type="button">Cập nhật</button></td>
                                                    <td><button
                                                        onClick={() => this.onDeleteProductSelected(item)}
                                                        className="btn btn-danger btn-icon"
                                                        type="button">Xoá</button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        : ''}
            </div>
        );

    }
}



const mapStateToProps = ({
    i18n,
    users
}, ownProps) => {
    return {
        i18n,
        ownProps,
        users
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...usersActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(UsersFormView)


