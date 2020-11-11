import VirtualizedSelect from 'react-virtualized-select';
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import * as stoneActions from 'modules/stone/actions/form'
import * as castingActions from 'modules/casting/actions/form'
import * as productsActions from 'modules/products/actions/form'

class ComboboxListTab extends React.Component {
    constructor() {
        super()
    }
    handleChange(selectedOption) {
        let { type } = this.props
        if (selectedOption) {
            switch (type) {
                case "stone":
                    this.props.clickCheckRowTabStone(selectedOption);
                    break;
                case "casting":
                    this.props.clickCheckRowTabCasting(selectedOption);
                    break;
                case "mould":
                    this.props.clickCheckRowTabMould(selectedOption);
                    break;
                case "products":
                    this.props.clickCheckRowProductsCombobox(selectedOption);
                    break;
                default:
                    break;
            }
        }
        this.props.selectOptionData(selectedOption)

    }
    render() {
        let { list_data } = this.props
        const { selectedOption } = this.props.products;
        let arr_temp = []
        list_data.map((item) => {
            if (item.Id)
                arr_temp.push({ value: item.Id, label: item.Name, sl: 1 })
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
    products
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        stone,
        header,
        products
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...stoneActions,
        ...castingActions,
        ...productsActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ComboboxListTab)
