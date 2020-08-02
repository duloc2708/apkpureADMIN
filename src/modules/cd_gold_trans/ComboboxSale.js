import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { selectSaleman } from 'modules/cd_gold_trans/actions/form'

class ComboboxSale extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: ''
        }
    }
    handleChange(selectedOption) {
        this.setState({ selectedOption });
        this.props.selectSaleman(selectedOption);
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
        list_data.map((item) => {
            arr_temp.push({
                value: item.value,
                label: item.label,
                name: item.name
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
        selectSaleman,
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ComboboxSale)
