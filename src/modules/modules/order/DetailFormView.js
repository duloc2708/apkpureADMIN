import ListImageFormView from './ListImageFormView'
import TabOrder from './TabOrder';
import TabProduct from './TabProduct';
import TabCasting from './TabCasting';
import * as orderActions from 'modules/order/actions/form'
class DetailFormView extends React.Component {
    constructor() {
        super();
        this.state = {
            mpm: '',
            lv: '',
            lh: '',
            listTab: [
                { key: "tab1", title: "Thông tin đơn hàng" },
                // { key: "tab2", title: "Danh sách sản phẩm" }
            ],
            tab: 'tab1'
        }
    }
    _changeTab(key) {
        this.setState({ tab: key })
    }
    _renderTab(key, isSave) {
        let com = []
        switch (key) {
            case "tab1":
                com.push(<TabOrder key={key} />)
                break;
            case "tab2":
                com.push(<TabProduct   key={key}/>)
                break;
            // case "tab3":
            //     com.push(<TabCasting  key={key} />)
            //     break;
            default:
                com.push(<TabOrder  key={key} />)
                break
        }
        return com
    }

    render() {
        let { listTab, tab } = this.state
        let { isSave } = this.props
        return (
            <div className="main__content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="main__content__right">
                            {this._renderTab(tab, isSave)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    order,
    header
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        order,
        header
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...orderActions,
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(DetailFormView)
