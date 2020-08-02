import * as permisionActions from 'modules/permision.page/actions/form'
const { Translate, I18n } = ReactReduxI18n;
class ListReport extends React.Component {
    _onClickRow(item, check) {
        this.props.updateListReportByUser(item, check).then(() => {
        })
    }
    render() {
        let { list_report, listHeaderReport } = this.props.permision
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {
                                listHeaderReport.map((item, i) => {
                                    let { key, title } = item
                                    return (
                                        <th style={{ "textAlign": "left" }} key={`thead_${key}`} scope="col">{title}</th>
                                    )
                                })

                            }
                        </tr>
                    </thead>
                    <tbody>
                        {list_report && list_report.map((item, i) => {
                            let { ORDERBY, CODE, TITLE, checked } = item
                            return (
                                <tr key={`data_${i}`}>
                                    <th scope="row">
                                        <label>
                                            <input type="checkbox" checked={checked} onChange={() => this._onClickRow(item, !checked)} />
                                        </label>
                                    </th>
                                    <td>{i + 1}</td>
                                    <td>{CODE}</td>
                                    <td>{TITLE}</td>
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
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListReport)
