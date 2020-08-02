import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { selectOutputCash } from 'modules/cd_cash_trans/actions/form'

class ComboboxOutput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: ''
        }
    }
    handleChange(selectedOption) {
        this.setState({ selectedOption });
        this.props.selectOutputCash(selectedOption);
    }
    componentDidMount() {
        this.setState({ selectedOption: this.props.value })
    }
    render() {
        let { list_data, disable } = this.props
        const { selectedOption } = this.state;
        let arr_temp = []
        list_data.map((item) => {
            arr_temp.push({
                value: item.IdOutput,
                label: item.IdOutput,
                name: item.IdOutput,
                IdOrder: item.IdOrder,
                total_gold_adjust: item.total_gold_adjust
            })
        })

        return (
            <Select
                disabled={disable}
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
        selectOutputCash,
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ComboboxOutput)
