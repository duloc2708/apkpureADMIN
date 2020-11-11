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
    }

    componentDidMount() {
        this._loadData()
    }
    _loadData() {
        this.props.getListDataCastingInProducts()
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

    ChangeValueCell(value) {
        this.props.updateNumberCastingById(value)
    }
    _onRemove(item){
        var r = confirm(I18n.t(`alert.delete`));
        if (r == true) {
            this.props.removeItemCasting(item)
            }
        
    }
    render() {
        let { list_data, allChecked, listHeaderTabCasting, listSelected } = this.props.casting
        let { listCastingSelected, listCasting } = this.props.products

        return (
            <div>
                <ComboboxListTab type={"casting"} list_data={listCasting} />
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
