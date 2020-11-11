import Select from 'react-select';
import 'react-select/dist/react-select.css';
import * as stoneActions from 'modules/stone/actions/form'
import * as castingActions from 'modules/casting/actions/form'
import * as productsActions from 'modules/products/actions/form'
import * as outputActions from 'modules/output/actions/form'

class ComboboxCustomer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: ''
        }
    }
    handleChange(selectedOption) {        
        this.setState({ selectedOption });
        this.props.selectCustomerInOutOut(selectedOption);
    }
    componentDidMount(){
        this.setState({selectedOption:this.props.value})
    }
    render() {
        let { list_data } = this.props
        const { selectedOption } = this.state;
        let arr_temp = []
        list_data.map((item) => {
            if (item.Id)
                arr_temp.push({ value: item.Id, label: item.Id, name: item.Name })
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
    header,
    order,
    output
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        stone,
        header,
        output
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...stoneActions,
        ...castingActions,
        ...productsActions,
        ...outputActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ComboboxCustomer)
