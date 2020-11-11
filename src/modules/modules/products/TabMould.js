import * as userActions from 'modules/login/actions/form'
import * as productsActions from 'modules/products/actions/form'
import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import * as stoneActions from 'modules/stone/actions/form'
import ComboboxListTab from './ComboboxListTab'

const { Translate, I18n } = ReactReduxI18n;
class TabMould extends React.Component {
    constructor() {
        super()
    }
    componentDidMount() {
        this._loadData()
    }
    _loadData() {
        this.props.getListDataMould()
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
        // this.props.clickCheckRowTabStone(item)
    }
    _checkAllRow(value) {
        this.props.checkAllRow(!value)
    }
    _myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    ChangeValueCell(value) {
        this.props.updateNumberMouldById(value)
    }
    _onRemove(item){
        var r = confirm(I18n.t(`alert.delete`));
        if (r == true) {
            this.props.removeItemMould(item)
            }
        
    }
    render() {
        let {  listMould, listHeaderTableMould,listMouldSelected} = this.props.products
        return (
            <div>
                <ComboboxListTab type={"mould"} list_data={listMould} />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {
                                listHeaderTableMould.map((item, i) => {
                                    let { key, title } = item
                                    return (
                                        <th key={`thead_${key}`} scope="col">{title}</th>
                                    )
                                })

                            }
                        </tr>
                    </thead>
                    <tbody>
                        {listMouldSelected && listMouldSelected.map((item, i) => {
                            let { value, label, sl } = item
                            if (value && value.length > 0) {
                                return (
                                    <tr key={`data_${i}`} onClick={() => this._onClickRow(item)}>
                                        <td>{label || ''}</td>
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
    stone,
    header,
    products
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        stone,
        header,
        products
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...userActions,
        ...stoneActions,
        ...productsActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TabMould)
