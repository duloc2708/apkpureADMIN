import * as productsActions from 'modules/products/actions/form'
const { Translate, I18n } = ReactReduxI18n;
class TabPrice extends React.Component {
    render() {
        let { listPrice, listHeaderTabPrice } = this.props.products
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {
                                listHeaderTabPrice.map((item, i) => {
                                    let { key, title } = item
                                    return (
                                        <th style={{"textAlign":"left"}} key={`thead_${key}`} scope="col">{title}</th>
                                    )
                                })

                            }
                        </tr>
                    </thead>
                    <tbody>
                        {listPrice && listPrice.map((item, i) => {
                            let { SalepriceID, Basicprice, Saleprice } = item
                            return (
                                <tr key={`price_${i}`}>
                                    <td>{SalepriceID}</td>
                                    <td>{SportConfig.function._formatMoney(Basicprice)}</td>
                                    <td>{SportConfig.function._formatMoney(Saleprice)}</td>
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
    header,
    products
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        header,
        products
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TabPrice)
