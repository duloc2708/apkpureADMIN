import VirtualizedSelect from 'react-virtualized-select';
import 'react-select/dist/react-select.css'
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import * as bagActions from 'modules/bag/actions/form'
class ComboboxOrder extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedOption: ''
        }
    }
    handleChange(selectedOption) {
        this.setState({ selectedOption });
        this.props.selectOrder(selectedOption);
    }
    render() {
        let { list_data } = this.props
        const { selectedOption } = this.state;
        return (
            <VirtualizedSelect ref="citySelect"
                options={list_data}
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
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ComboboxOrder)
