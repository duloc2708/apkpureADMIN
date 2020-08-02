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
class TabStone extends React.Component {
    constructor() {
        super()
    }
    componentDidMount() {
        this._loadData()
    }
    _loadData() {
        this.props.getListDataStoneInProducts()
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

    ChangeValueCell(value) {
        this.props.updateNumberStoneById(value)
    }
    ChangePrimaryStone(item, checked) {
        this.props.updatePrimaryStoneById(item, checked)
    }

    _onRemove(item) {
        var r = confirm(I18n.t(`alert.delete`));
        if (r == true) {
            this.props.removeItemStone(item)
            }
        
    }
    render() {
        let { list_data, allChecked } = this.props.stone
        let { listStoneSelected, listStone, listHeaderTabStone } = this.props.products
        return (
            <div>
                <ComboboxListTab type={"stone"} list_data={listStone} />
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {
                                listHeaderTabStone.map((item, i) => {
                                    let { key, title } = item
                                    return (
                                        <th key={`thead_${key}`} scope="col">{title}</th>
                                    )
                                })

                            }
                        </tr>
                    </thead>
                    <tbody>
                        {listStoneSelected && listStoneSelected.map((item, i) => {
                            let { value, label, sl, PrimaryStone } = item
                            if (value && value.length > 0) {
                                return (
                                    <tr key={`data_${i}`} onClick={() => this._onClickRow(item)}>
                                        <td>{value || ''}</td>
                                        <td><input type="checkbox" checked={PrimaryStone ? true : false} onChange={() => this.ChangePrimaryStone(item, !PrimaryStone)} /></td>
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
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TabStone)
