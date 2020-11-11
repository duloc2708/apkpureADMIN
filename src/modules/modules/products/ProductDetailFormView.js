import ListImageFormView from './ListImageFormView'
import TabProDuct from './TabProDuct';
import TabStone from './TabStone';
import TabCasting from './TabCasting';
import TabMould from './TabMould';
import * as productsActions from 'modules/products/actions/form'
class ProductDetailFormView extends React.Component {
    constructor() {
        super();
        this.state = {
            mpm: '',
            lv: '',
            lh: '',
            listTab: [
                { key: "tab1", title: "Thông tin sản phẩm" },
                // { key: "tab2", title: "Danh sách khuôn" },
                { key: "tab3", title: "Danh sách đá" },
                { key: "tab4", title: "Danh sách casting" },
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
                com.push(<TabProDuct key={key} />)
                break;
            // case "tab2":
            //     com.push(<TabMould key={key} />)
            //     break;
            case "tab3":
                com.push(<TabStone key={key} />)
                break;
            case "tab4":
                com.push(<TabCasting key={key} />)
                break;
            default:
                com.push(<TabProDuct key={key} />)
                break
        }
        return com
    }
    componentWillUnmount() {
        this.props.resetDataProducts()
    }
    componentDidMount() {
        let { itemDetail } = this.props.products
        var currentURL = document.URL;
        var url = new URL(currentURL);
        var id = url.searchParams.get("idproduct");
        this.props.getDetailProduct(id)
    }
    render() {
        let { listTab, tab } = this.state
        let { isSave } = this.props
        return (
            <div className="container">
                <section >
                    {/* <BrackcrumFromView /> */}
                    <div className="main__content">
                        <div className="main__content">
                            <div className="row">
                                <div className="col-md-3">
                                    <ListImageFormView />
                                </div>
                                <div className="col-md-9">
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
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ProductDetailFormView)

