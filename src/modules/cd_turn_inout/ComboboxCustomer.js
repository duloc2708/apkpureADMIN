import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { selectCustomerCash, updateListOutput, selectCustomerSearch } from 'modules/cd_turn_inout/actions/form'

class ComboboxCustomer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: ''
        }
    }
    handleChange(selectedOption) {
        this.setState({ selectedOption });
        let { id } = this.props
        if (id == 'IdCustomer') {
            this.props.selectCustomerCash(selectedOption);
        }
        if (id == 'SIdCustomer') {
            this.props.selectCustomerSearch(selectedOption);
        }
    }
    componentDidMount() {
        this.setState({ selectedOption: this.props.value })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ selectedOption: nextProps.value })
    }
    render() {
        let { list_data, disable } = this.props
        const { selectedOption } = this.state;
        let arr_temp = []
        if (list_data && list_data.length > 0) {
            list_data.map((item) => {
                if (item.Id)
                    arr_temp.push({
                        value: item.Code,
                        label: item.Code,
                        name: item.Name,
                        CodeBaoGia: item.CodeBaoGia,
                        CodeLH: item.CodeLH,
                        CodeMX: item.CodeMX,
                        CodeLV: item.CodeLV,
                        CodeLAI: item.CodeLAI,
                        Discount: item.Discount,
                        SaleMan: item.SaleMan,
                        CodeLH: item.CodeLH,
                        Is_Beneficiary: item.Is_Beneficiary
                    })
            })
        }

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
        selectCustomerSearch
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ComboboxCustomer)
