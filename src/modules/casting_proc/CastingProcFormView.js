import DetailCastingProcFormView from './DetailCastingProcFormView'
import ListCastingProcFormView from './ListCastingProcFormView'
const { Translate, I18n } = ReactReduxI18n;
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
class CastingProcFormView extends React.Component {
    constructor() {
        super()
        this.state = {
            inputSearch: ''
        }
    }
    render() {
        let { isDetail } = this.props.casting_proc
        return (
            <div className="container">
                <AlertCustom onRef={ref => (this.child = ref)} />
                <section >
                    {/* <BrackcrumFromView /> */}
                    <div className="main__content">
                        <ToolbarFormView isPopup={true} parentObject={this} />
                        {isDetail ?
                            <DetailCastingProcFormView /> :
                            <ListCastingProcFormView parentObject={this} />
                        }
                    </div>
                </section>
            </div>
        )
    }
}

// lấy ALL dữ liệu từ các reducer
const mapStateToProps = ({
    userAuth,
    i18n,
    casting_proc,
    toolbar
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        casting_proc,
        toolbar
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        // ...userActions,
        // ...listActions,
        // ...productsActions,
        // ...toolbarActions,
        // resetInfoPage
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(CastingProcFormView)
