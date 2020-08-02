
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import ListUser from './ListUser'
import ListFunction from './ListFunction'
import ListButton from './ListButton'
import ListReport from './ListReport'
import * as permisionActions from 'modules/permision.page/actions/form'


const { Translate, I18n } = ReactReduxI18n;
class PermisionPageFormView extends React.Component {
    constructor() {
        super();
        this.state = {
            mpm: '',
            lv: '',
            lh: '',
            listTab: [
                { key: "tab1", title: "Chức năng" },
                { key: "tab2", title: "Báo cáo" }
            ],
            tab: 'tab1'
        }
    }
    componentDidMount() {
        this.props.getListDataReport()
    }
    ChangeButton(value) {
        //  this.props.exportDataDynamic()
    }
    _renderTab(key) {
        let com = []
        switch (key) {
            case "tab1":
                com.push(<ListFunction key={key} />)
                break;
            case "tab2":
                com.push(<ListReport key={key} />)
                break;
            default:
                com.push(<ListFunction key={key} />)
                break
        }
        return com
    }
    _changeTab(key) {
        this.setState({ tab: key })
    }
    render() {
        let { listTab, tab } = this.state
        return (
            <div className="container">
                <AlertCustom onRef={ref => (this.child = ref)} />
                <section >
                    <BrackcrumFromView title="Phân quyền chức năng/báo cáo" />
                    <div className="main__content">
                        {/* <ToolbarFormView parentObject={this} /> */}
                        <hr />
                        <div className="row">
                            <div className="col-md-4">
                                <ListUser />
                            </div>
                            <div className="col-md-8">

                                <div className="list__file">
                                    <ul className="nav nav-pills">
                                        {listTab.map((item, i) => {
                                            return (
                                                <li key={`tab_${i}`} onClick={() => this._changeTab(item.key)} className={`${tab == item.key ? 'active' : ''}`}>
                                                    <a data-toggle="tab">{item.title}</a>
                                                </li>
                                            )
                                        })
                                        }

                                    </ul>
                                </div>
                                {this._renderTab(tab)}
                            </div>
                            {/* <div className="col-md-5">
                                <ListButton />
                            </div> */}
                        </div>
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
    toolbar,
    permision
}, ownProps) => {
    return {
        toolbar,
        userAuth,
        i18n,
        ownProps,
        report,
        header, permision
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...permisionActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PermisionPageFormView)
