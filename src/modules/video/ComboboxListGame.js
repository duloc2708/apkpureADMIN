import Select from 'react-select';
// import 'react-select/dist/react-select.css';
import * as videoActions from 'modules/video/actions/form'

class ComboboxListGame extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: ''
        }
    }
    handleChange(selectedOption) {
        this.setState({ selectedOption });
        this.props.addListGame(selectedOption)
    }
    componentDidMount() {
        this.setState({ selectedOption: this.props.value })
    }
    render() {
        let { list_data, disable } = this.props
        console.log('list_data', list_data)

        const { selectedOption } = this.state;
        let arr_temp = []
        list_data.map((item) => {
            arr_temp.push({
                value: item.title,
                label: item.title,
                name: item.title
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
    i18n,
    video
},
    ownProps) => {
    return {
        i18n,
        ownProps,
        video
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...videoActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ComboboxListGame)

