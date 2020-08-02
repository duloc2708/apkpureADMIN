import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { updateInfoOutput, findProducts } from 'modules/cd_turn_inout/actions/form'

class ComboboxOutput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: ''
        }
    }
    handleChange(selectedOption) {
        this.setState({ selectedOption });
        this.props.updateInfoOutput(selectedOption).then(()=>{
            this.props.findProducts(true);
        });
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
        updateInfoOutput,
        findProducts
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ComboboxOutput)
