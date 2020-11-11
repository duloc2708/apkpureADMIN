import * as userActions from 'modules/login/actions/form'
import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import * as reportActions from 'modules/report/actions/form'
import * as toolbarActions from 'modules/toolbar/actions/form'
import * as commonActions from 'modules/common/actions/form'
import ComboboxOrder from './ComboboxOrder'
const { Translate, I18n } = ReactReduxI18n;
class ReportFormView extends React.Component {
    constructor() {
        super()

    }

    componentWillUnmount() {
        this.props.updateButtonToolbar('')
    }
    componentDidMount() {
        this._loadData()
        this.props.getLisOrderInReport()

    }
    _loadData() {
        const type = Helper.getParam(window.location.href, 'type')
        switch (type) {
            case "001":
                this.props.getStoneSummaryByOrder('')
                break;
            case "002":
                this.props.getStoneBagSummaryByOrder('')
                break;
            default:
                break;
        }
    }
    ChangeButton(value) {
        this.props.exportDataDynamic()        
    }
    render() {
        let { list_data, listColByReport, listOrder } = this.props.report
        let { listReport } = SportConfig || {}
        const type = Helper.getParam(window.location.href, 'type')
        listReport = listReport.filter(x => x.type == type)
        return (
            <div className="container">
                <AlertCustom onRef={ref => (this.child = ref)} />
                <section >
                    <BrackcrumFromView title={`${listReport[0] && listReport[0].title || ''}`} />
                    <div className="main__content">
                        <ToolbarFormView parentObject={this} isReport={true} />
                        <div className="form__personnal">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="form-group ">
                                        <div className="left">
                                            <label htmlFor="name">Đơn hàng</label>
                                        </div>
                                        <div className="right">
                                            <ComboboxOrder value={{}} list_data={listOrder} />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    {
                                        listColByReport.map((item, i) => {
                                            let { key, title } = item
                                            return (
                                                <th style={{ "textAlign": "left" }} key={key} scope="col">{title}</th>
                                            )
                                        })

                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr>
                                    <th></th>
                                    {
                                        listColByReport.map((item, i) => {
                                            let { key, type } = item
                                            return (
                                                <td key={i}>
                                                    <input className="name form-control" type={type} id={key} name="name" required="" />
                                                </td>
                                            )
                                        })
                                    }
                                </tr> */}
                                {list_data && list_data.map((item, i) => {
                                    let { IdStone, SLD } = item
                                    let tr_rows = [], td_rows = []
                                    Object.keys(item).map((key, ii) => {
                                        td_rows.push(<td key={`${key + i + ii}`}>{item[key]}</td>)
                                    })
                                    tr_rows.push(<tr style={{ "textAlign": "left" }} key={`data_${i}`} >
                                        {td_rows}
                                    </tr>)
                                    return tr_rows
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    report,
    header,
    toolbar
}, ownProps) => {
    return {
        toolbar,
        userAuth,
        i18n,
        ownProps,
        report,
        header
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...userActions,
        ...reportActions,
        ...toolbarActions,
        ...commonActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ReportFormView)
