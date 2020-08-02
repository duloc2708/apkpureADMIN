import TabCreateBag from './TabCreateBag'
import TabListUpdateBag from './TabListUpdateBag'
import TabListBagStone from './TabListBagStone'
import { getListTypeByListCode } from 'modules/list/actions/form'

import * as productsActions from 'modules/products/actions/form'
class DetailFormView extends React.Component {
    constructor() {
        super();
        this.state = {
            mpm: '',
            lv: '',
            lh: '',
            listTab: [
                { key: "tab1", title: "Tạo bag" },
                { key: "tab2", title: "Nhập đá" },
                { key: "tab3", title: "Danh sách bag" }
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
                com.push(<TabCreateBag key={key} />)
                break;
            case "tab2":
                com.push(<TabListUpdateBag key={key} />)
                break;
            case "tab3":
                com.push(<TabListBagStone key={key} />)
                break;
            default:
                com.push(<TabCreateBag key={key} />)
                break
        }
        return com
    }
    componentWillUnmount() {
        //this.props.resetDataProducts()
    }
    componentDidMount() {
        // get list type
        let list = ['DSM', 'STATUS_BAG_PRODUCT', 'TYPE_SPLIT_STONE', 'TYPE_STONE']
        this.props.getListTypeByListCode(list)
    }
    render() {
        let { listTab, tab } = this.state
        let { isSave } = this.props
        return (
            <div className="main__content">
                <div className="main__content__right">
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
                    {this._renderTab(tab, isSave)}
                </div>
            </div>

        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    list,
    header,
    products,
    toolbar
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        list,
        header,
        products,
        toolbar
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...productsActions,
        getListTypeByListCode
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(DetailFormView)

