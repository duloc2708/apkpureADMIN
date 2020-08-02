import * as headerActions from 'modules/header/actions/form'
import { default as NumberFormat } from "react-number-format";

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    _getDataByCode(code) {
        let { list_other_all } = this.props.header
        let data = []
        let data_temp = []
        if (list_other_all) {
            data_temp = list_other_all && list_other_all.filter(x => x.type_code == code)
        }
        data.push({ id: -1, code: "", name: "-- empty --", type_code: code, status: 1 })
        data_temp.map((item, i) => {
            data.push(item)
        })
        return data
    }
    _onChangeValue(e) {
        let { type_code, id } = this.props
        this.setState({ value_default: e.target.value })
        this.props.parentObject.ChangeValueCombobox({ id: id, value: e.target.value });
    }
    componentDidMount() {
        $(".allownumericwithdecimal").on("keypress keyup blur", function (event) {
            //this.value = this.value.replace(/[^0-9\.]/g,'');
            $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
            if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });
        this.setState({ value: this.props.value })
    }
    _onChange(e) {
        e.stopPropagation();
        let { id, keyInput, other, IdGroup } = this.props
        this.setState({ value: e.target.value })
        this.props.parentObject.ChangeValueCell({ id: id, value: e.target.value, key: keyInput, other: other, IdGroup: IdGroup || '' });
    }
    componentWillReceiveProps(nextProps) {
        let { value } = nextProps
        // let code = this.props.type_code
        this.setState({ value: value });

    }
    _splitDecimal(value) {
        let string = value;
        let stringFirts = string.split(".")[0];
        let stringLast = string.split(".")[1];
        let result = string;
        if (stringLast) {
            stringLast = stringLast.substring(0, 2);
            result = stringFirts + "." + stringLast;
        }
        return result;
    }
    __onKeyPressInput(e, id, tabIndex, typeInput, index, idTable) {
        if (e.key == 'Enter') {
            this.props.parentObject.onKeyPressInput({ typeInput: typeInput, index: index, e: e, id: id, tabIndex: tabIndex, idTable: idTable });
        }
    }
    handleClick(e) {
        e.stopPropagation();
        this.props.parentObject.handleClick();
    }
    render() {
        let { value } = this.state
        let { id, idInput, keyInput, width, type, readOnly, typeInput, classInput, index, tabIndex, idTable } = this.props
        return (
            <td>
                <input
                    onClick={(e) => this.handleClick(e)}
                    onKeyPress={(e) => this.__onKeyPressInput(e, id, tabIndex, keyInput, index, idTable)}
                    readOnly={readOnly || false}
                    id={idInput}
                    style={{ "width": `${width ? width : "100%"}` }}
                    type={type ? type : 'text'}
                    className={`name form-control ${type ? 'allownumericwithdecimal' : ''} ${classInput}`}
                    value={value}
                    onChange={e => this._onChange(e)}
                    name="name" required="" />
                {/* {
                    typeInput == 'text' ?
                        <input readOnly={readOnly || false}
                            id={id}
                            style={{ "width": `${width ? width : "100%"}` }}
                            type={type ? type : 'text'}
                            className={`name form-control ${type ? 'allownumericwithdecimal' : ''}`}
                            value={value}
                            onChange={e => this._onChange(e.target.value)}
                            type={'text'} name="name" required="" />
                        :
                        <NumberFormat
                            displayType={readOnly ? 'text' : 'input'}
                            style={{ width: `${width ? width : "100%"}` }}
                            value={value}
                            thousandSeparator={true}
                            prefix={""}
                            onValueChange={values => {
                                const { formattedValue, value } = values;
                                this._onChange(value)
                            }}
                        />
                } */}
            </td>
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
module.exports = ReactRedux.connect(mapStateToProps, null)(Cell)

