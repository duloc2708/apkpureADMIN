import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import DetailFormView from './DetailFormView'
import * as bagActions from 'modules/bag/actions/form'

class BagFormView extends React.Component {
    componentWillUnmount() {
        this.props.resetDataBag()
    }
    render() {
        return (
            <div className="container">
                <section >
                    {/* <BrackcrumFromView /> */}
                    <div className="main__content">
                        <ToolbarFormView parentObject={this} />
                        <DetailFormView />
                    </div>
                </section>
            </div>
        )
    }
}
const mapStateToProps = ({
    userAuth,
    i18n,
    bag
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        bag
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...bagActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(BagFormView)
