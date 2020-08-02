import * as permisionActions from 'modules/permision.page/actions/form'
const { Translate, I18n } = ReactReduxI18n;
class ListButton extends React.Component {
    componentDidMount() {
        this.props.getListButton()
    }
    _onClickRow(item, checked) {
        let { itemUser } = this.props.permision
        if (itemUser && itemUser.username) {
            this.props.saveListButton(item, checked)
        }
    }
    render() {
        let { list_button } = this.props.permision
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th style={{ "textAlign": "left" }} key={`thead_btncheck`} scope="col"></th>
                            <th style={{ "textAlign": "left" }} key={`thead_btnaction`} scope="col">{'Action'}</th>

                        </tr>
                    </thead>
                    <tbody>
                        {list_button && list_button.map((item, i) => {
                            let { name, checked, code } = item
                            return (
                                <tr key={`data_${code}`}>
                                    <th scope="row">
                                        <label>
                                            <input type="checkbox" checked={checked} onChange={() => this._onClickRow(item, !checked)} />
                                        </label>
                                    </th>
                                    <td>{name}</td>
                                </tr>)
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
    permision,
    toolbar
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        permision,
        toolbar
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...permisionActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListButton)
