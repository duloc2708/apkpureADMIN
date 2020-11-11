
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import ListUser from './ListUser'
import ListFunction from './ListFunction'
const { Translate, I18n } = ReactReduxI18n;
class PermisionPageFormView extends React.Component {
    componentDidMount() {


    }
    ChangeButton(value) {
      //  this.props.exportDataDynamic()
    }
    render() {
        return (
            <div className="container">
                <AlertCustom onRef={ref => (this.child = ref)} />
                <section >
                    <BrackcrumFromView title="Phân quyền chức năng" />
                    <div className="main__content">
                        {/* <ToolbarFormView parentObject={this} /> */}
                        <hr/>
                        <div className="row">
                            <div className="col-md-6">
                                <ListUser />
                            </div>
                            <div className="col-md-6">
                                <ListFunction />
                            </div>
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
        ...ReactRouterRedux.routerActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(PermisionPageFormView)
