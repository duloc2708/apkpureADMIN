import * as headerActions from 'modules/header/actions/form'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
class InputDateFormat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    componentDidMount() {
        let { width } = this.props
        $('input[type=text]').addClass('form-control');
        $('input[type=text]').attr("style", `width:${width}`);
        this.setState({ value: this.props.value })
    }
    componentWillReceiveProps(nextProps) {
        let { value } = nextProps
        // let code = this.props.type_code
        this.setState({ value: value });

    }
    _handleChangeDate(e) {
        this.props.parentObject.handleChangeDate(e);
    }
    render() {
        let { value } = this.state
        let { toFixedNum, id, idInput, keyInput, width, type, readOnly, typeInput, classInput, index, tabIndex, idTable } = this.props
        return (
            <DatePicker
            dateFormat="DD/MM/YYYY"
            selected={value} onChange={(e) => this._handleChangeDate(e)} />
        )
    }
}
const mapStateToProps = ({
    header,
    i18n
}, ownProps) => {
    return {
        header,
        i18n
    }
}
module.exports = ReactRedux.connect(mapStateToProps, null)(InputDateFormat)

