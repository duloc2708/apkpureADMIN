import * as headerActions from 'modules/header/actions/form'
import { default as NumberFormat } from "react-number-format";

class InputNumberFormat extends React.Component {
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
        // let code = this.props.type_code
        this.setState({ value: nextProps.value });
    }

    _changeMoneyPayment(value, id, keyInput) {
        let obj = { id: id, value: value.replace(/\,/g, ''), key: keyInput }
        this.setState({ value: value })
        this.props.parentObject.changeValueNumber(obj);
    }
    _splitDecimal(value, toFixedNum) {
        let string = value;
        let stringFirts = string.split(".")[0];
        let stringLast = string.split(".")[1];
        let result = string;
        if (stringLast) {
            stringLast = stringLast.substring(0, toFixedNum);
            result = stringFirts + "." + stringLast;
        }
        return result;
    }
    _onKeyPress(e, obj) {
        if (e.key == 'Enter') {            
            this.props.parentObject.onKeyPressInput(obj);
        }
    }
    render() {
        let { value } = this.state
        let { toFixedNum, id, idInput, keyInput, width, type, readOnly, typeInput, classInput, index, tabIndex, idTable } = this.props
        return (
            <NumberFormat
                value={value || ''}
                thousandSeparator={true}
                prefix={""}
                onKeyPress={(e) => this._onKeyPress(e, { key: keyInput, value: value })}
                onValueChange={values => {
                    const { formattedValue, value } = values;
                    this._changeMoneyPayment(this._splitDecimal(formattedValue, toFixedNum), id, keyInput)
                }}
            />
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
module.exports = ReactRedux.connect(mapStateToProps, null)(InputNumberFormat)

