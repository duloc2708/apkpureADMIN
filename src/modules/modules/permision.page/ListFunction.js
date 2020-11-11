import * as permisionActions from 'modules/permision.page/actions/form'
const { Translate, I18n } = ReactReduxI18n;
class ListFunction extends React.Component {
    componentDidMount() {
        this.props.getListFunction()
    }
    _onClickRow(item, checked) {
        let { itemUser } = this.props.permision
        if (itemUser && itemUser.username) {
            this.props.saveListFunction(item, checked)
        }
    }
    render() {
        let { list_user, listHeaderFunction, list_function } = this.props.permision
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {
                                listHeaderFunction.map((item, i) => {
                                    let { key, title } = item
                                    return (
                                        <th style={{ "textAlign": "left" }} key={`thead_${key}`} scope="col">{title}</th>
                                    )
                                })

                            }
                        </tr>
                    </thead>
                    <tbody>
                        {list_function && list_function.map((item, i) => {
                            let { name, checked } = item
                            return (
                                <tr key={`data_${i}`}>
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
    permision
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        permision
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...permisionActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListFunction)
