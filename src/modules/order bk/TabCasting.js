import * as userActions from 'modules/login/actions/form'
import * as productsActions from 'modules/products/actions/form'
import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import * as castingActions from 'modules/casting/actions/form'
import ComboboxListTab from './ComboboxListTab'

const { Translate, I18n } = ReactReduxI18n;
class TabCasting extends React.Component {
    constructor() {
        super()
        this.state = {
            Id: '',
            Name: '',
            Decription: '',
            IdType: '',
            IdUnit: '',
            Numb: '',
            Weight: ''
        }
    }
    _clearInput() {
        this.setState({
            Id: '',
            Name: '',
            Decription: '',
            IdType: '',
            IdUnit: '',
            Numb: '',
            Weight: ''
        })
    }
    componentDidMount() {
        this._loadData()
    }
    _loadData() {
        var currentURL = document.URL;
        var url = new URL(currentURL);
        var codeURL = url.searchParams.get("code");
        var that = this
        this.props.getListData()
        this.props.getListCastingByProducts()
    }
    ChangeButton(value) {
        switch (value) {
            case "SAVE":
                this._addNewItem()
                break;
            case "EDIT":
                this._editItem()
                break;
            case "DELETE":
                this._deleteItem()
                break;
            default:
                break;
        }
    }
    _deleteItem() {
        let { id } = this.state
        let { allChecked } = this.props.casting
        if (!allChecked) {
            this.props.deleteItem({ id: id }).then(res => {
                alert('Xoá thành công')
                this._loadData()
            })
        } else {
            this.props.deleteAllItem().then(res => {
                alert('Xoá thành công')
                this._loadData()
            })
        }
        this._clearInput()
    }
    _checkValidate() {
        let result = true
        let { code, name, status } = this.state
        if (!code) {
            $('#code').addClass('has-error')
            alert('vui lòng nhập mã tham số !')
            return false
        } else {
            $('#code').removeClass('has-error')
        }
        if (!name) {
            $('#name').addClass('has-error')
            alert('vui lòng nhập tên tham số !')
            return false
        } else {
            $('#name').removeClass('has-error')
        }
        return result
    }
    _addNewItem() {
        if (this._checkValidate()) {
            let { code, name, status } = this.state
            let { type_code } = this.props.casting
            let obj = {
                code: code || '',
                name: name || '',
                type_code: type_code,
                status: status ? 1 : 0
            }
            this.props.addNewItem(obj).then(res => {
                alert('Insert thành công')
                this._clearInput()
                this._loadData()
            })
        }
    }
    _editItem() {
        let { id, code, name, status } = this.state
        if (id == 0) {
            alert('Vui lòng chọn dòng cần sửa')
            return
        }
        if (this._checkValidate()) {
            let { type_code } = this.props.casting
            let obj = {
                id: id,
                code: code || '',
                name: name || '',
                type_code: type_code,
                status: status ? 1 : 0
            }
            this.props.updateItem(obj).then(res => {
                alert('Update thành công')
                this._loadData()
            })
        }
    }
    _onClickRow(item) {
        let { Id, Name, IdType, IdUnit, Decription, Numb, Weight } = item
        this.setState({
            Id, Name, IdType, IdUnit, Decription, Numb, Weight
        });
        this.props.clickCheckRow(item)
    }
    _handleInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }
    _changeStatus(status) {
        this.setState({ status: !status });
    }
    _checkClickRow(item) {
        // this.props.clickCheckRowTabcasting(item)
    }
    _checkAllRow(value) {
        this.props.checkAllRow(!value)
    }
    _myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    }
    _filterFunction() {
        var input, filter, ul, li, a, i;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        div = document.getElementById("myDropdown");
        a = div.getElementsByTagName("a");
        for (i = 0; i < a.length; i++) {
            if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
                a[i].style.display = "";
            } else {
                a[i].style.display = "none";
            }
        }
    }
    ChangeValueCell(value) {
        var r = confirm(I18n.t(`alert.delete`));
        if (r == true) {
            this.props.updateNumberCastingById(value)
            } 
        
    }
    _onRemove(item){
        var r = confirm(I18n.t(`alert.delete`));
        if (r == true) {
            this.props.removeItemCasting(item)
            } 
        
        
    }
    render() {
        let { list_data, allChecked, listHeaderTabCasting, listSelected } = this.props.casting
        let { listCastingSelected } = this.props.products

        return (
            <div>
                <ComboboxListTab type={"casting"} list_data={list_data} />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {
                                listHeaderTabCasting.map((item, i) => {
                                    let { key, title } = item
                                    return (
                                        <th key={`thead_${key}`} scope="col">{title}</th>
                                    )
                                })

                            }
                        </tr>
                    </thead>
                    <tbody>
                        {listCastingSelected && listCastingSelected.map((item, i) => {
                            let { value, label, sl } = item
                            if (value && value.length > 0) {
                                return (
                                    <tr key={`data_${i}`}>
                                        <td>{value || ''}</td>
                                        <Cell value={sl} id={value} parentObject={this} />
                                        <td onClick={() => this._onRemove(item)}><button><i className="fa fa-trash-o" aria-hidden="true"></i></button></td>
                                    </tr>)
                            }
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    casting,
    header,
    products
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        casting,
        header,
        products
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...userActions,
        ...castingActions,
        ...productsActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TabCasting)
