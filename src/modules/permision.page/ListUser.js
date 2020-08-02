import * as permisionActions from 'modules/permision.page/actions/form'
const { Translate, I18n } = ReactReduxI18n;
class ListUser extends React.Component {
    componentDidMount() {
        this.props.getListUser()
    }
    _onClickRow(item, check) {
        this.props.resetListFunctionReport().then(() => {
            this.props.getListFunctionByUser(item)
            this.props.getListReportByUser(item)
        })
    }
    render() {
        let { list_user, listHeaderUser } = this.props.permision
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {
                                listHeaderUser.map((item, i) => {
                                    let { key, title } = item
                                    return (
                                        <th style={{ "textAlign": "left" }} key={`thead_${key}`} scope="col">{title}</th>
                                    )
                                })

                            }
                        </tr>
                    </thead>
                    <tbody>
                        {list_user && list_user.map((item, i) => {
                            let { username, checked } = item
                            return (
                                <tr key={`data_${i}`}>
                                    <th scope="row">
                                        <label>
                                            <input  type="checkbox" checked={checked} onChange={() => this._onClickRow(item, !checked)} />
                                        </label>
                                    </th>
                                    <td>{username}</td>
                                    <td>{username}</td>
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
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListUser)
