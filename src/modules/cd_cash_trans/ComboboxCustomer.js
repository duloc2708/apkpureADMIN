import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { selectCustomerCash, updateListOutput, getRemainingDebt } from 'modules/cd_cash_trans/actions/form'

class ComboboxCustomer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: ''
        }
    }
    handleChange(selectedOption) {
        this.setState({ selectedOption });
        this.props.selectCustomerCash(selectedOption);
        this.props.updateListOutput(selectedOption.value);
        this.props.getRemainingDebt();

    }
    componentDidMount() {
        this.setState({ selectedOption: this.props.value })
    }
    render() {
        let { list_data, disable } = this.props
        const { selectedOption } = this.state;
        let arr_temp = []
        list_data.map((item) => {
            if (item.Id)
                arr_temp.push({
                    value: item.Code,
                    label: item.Code,
                    name: item.Name,
                    CodeLH: item.CodeLH,
                    CodeMX: item.CodeMX,
                    CodeLV: item.CodeLV,
                    CodeLAI: item.CodeLAI,
                    Discount: item.Discount,
                    SaleMan: item.SaleMan,
                    SaleManName: item.SaleManName,
                    Is_Beneficiary: item.Is_Beneficiary
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
        selectCustomerCash,
        updateListOutput,
        getRemainingDebt
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ComboboxCustomer)
