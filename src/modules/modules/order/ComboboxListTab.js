import Select from 'react-select';
import 'react-select/dist/react-select.css';
import * as stoneActions from 'modules/stone/actions/form'
import * as castingActions from 'modules/casting/actions/form'
import * as productsActions from 'modules/products/actions/form'

class ComboboxListTab extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedOption: ''
        }
    }
    handleChange(selectedOption) {
        this.setState({ selectedOption });
        if (selectedOption) {
            let { type } = this.props
            switch (type) {
                case "stone":
                    this.props.clickCheckRowTabStone(selectedOption);
                    break;
                case "casting":
                    this.props.clickCheckRowTabCasting(selectedOption);
                default:
                    break;
            }
        }
    }
    render() {
        let { list_data } = this.props
        const { selectedOption } = this.state;
        let arr_temp = []
        list_data.map((item) => {
            if (item.Id)
                arr_temp.push({ value: item.Id, label: item.Name, sl: 1 })
        })
        return (
            <Select
                deleteRemoves={false}
                name="form-field-name"
                value={selectedOption}
                onChange={(selectedOption) => this.handleChange(selectedOption)}
                options={arr_temp}
            />
        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    stone,
    header
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        stone,
        header
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
