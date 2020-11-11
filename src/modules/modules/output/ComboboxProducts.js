import VirtualizedSelect from 'react-virtualized-select';
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import * as stoneActions from 'modules/stone/actions/form'
import * as castingActions from 'modules/casting/actions/form'
import * as productsActions from 'modules/products/actions/form'
import * as orderActions from 'modules/order/actions/form'
import * as outputActions from 'modules/output/actions/form'

class ComboboxProducts extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedOption: ''
        }
    }
    handleChange(selectedOption) {
        this.setState({ selectedOption });
        this.props.selectOrderOutPut(selectedOption);
    }
    render() {
        let { list_data } = this.props
        let { default_product } = this.props.order
        const { selectedOption } = this.state;
        let arr_temp = []
        list_data.map((item) => {
            if (item.Id) {
                let data_temp = _.clone(default_product, true);
                data_temp["value"] = item.Id
                data_temp["label"] = item.Name
                data_temp["price_basic"] = item.Price
                data_temp["price"] = item.Price
                data_temp["url_image"] = item.Image
                data_temp["IdOdd"] = item.IdOdd
                arr_temp.push(data_temp)
            }

        })

        return (
            <VirtualizedSelect ref="citySelect"
                options={arr_temp}
                clearable
                name="select-city"
                value={selectedOption}
                onChange={(e) => this.handleChange(e)}
                searchable
            />
        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    stone,
    header,
    order
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        stone,
        header,
        order
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...stoneActions,
        ...castingActions,
        ...productsActions,
        ...orderActions,
        ...outputActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ComboboxProducts)
