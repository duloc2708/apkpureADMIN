import Select from 'react-select';
import 'react-select/dist/react-select.css';
import * as reportActions from 'modules/report/actions/form'

class ComboboxOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: ''
        }
    }
    handleChange(selectedOption) {
        this.setState({ selectedOption });
        const type = Helper.getParam(window.location.href, 'type')
        switch (type) {
            case "001":
                this.props.getStoneSummaryByOrder(selectedOption.value)
                break;
            case "002":
                this.props.getStoneBagSummaryByOrder(selectedOption.value)
                break;
            default:
                break;
        }
    }
    componentDidMount() {
        this.setState({ selectedOption: this.props.value })
    }
    render() {
        let { list_data } = this.props
        const { selectedOption } = this.state;
        let arr_temp = []
        list_data.map((item) => {
            arr_temp.push({
                value: item.IdOrder,
                label: item.IdOrderName,
                name: item.IdOrderName
            })
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
    header
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        header
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...reportActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ComboboxOrder)
