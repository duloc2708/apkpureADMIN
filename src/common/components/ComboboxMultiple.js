import Select from "react-select";
import "react-select/dist/react-select.css";

class ComboboxMultiple extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_default: false,
            listData: [],
            selectedOption: ""
        };
    }
    setDataExistsOther(value, list_data_other) {
        let arr_convert = value.split(","),
            arr_data = [];
        arr_convert.map(item => {
            let findItem = list_data_other.filter(x => x.code == item);
            if (findItem.length > 0) {
                arr_data.push({
                    code: findItem[0].code,
                    value: findItem[0].code,
                    label: findItem[0].name,
                    name: findItem[0].name
                });
            }
        });
        this.setState({ selectedOption: arr_data });
    }
    componentDidMount() {
        let {
            type_code,
            is_default,
            value,
            disable,
            list_data_other,
            comboOther
        } = this.props;
        if (value && list_data_other) {
            this.setDataExistsOther(value, list_data_other);
        }
    }
    componentWillReceiveProps(nextProps) {
        let { value, type_code, list_data_other, comboOther } = nextProps;

        let { listData } = this.state;
        let code = this.props.type_code,
            arr_data = [];
        //cập nhật value vào combo từ data khác
        if (value && list_data_other) {
            this.setDataExistsOther(value, list_data_other);
            return false;
        }
        this.setState({ selectedOption: arr_data });
    }
    handleChange(selectedOption) {
        let { value, id, type_code, multi, comboOther } = this.props;
        console.log("selectedOption>>", selectedOption);
        this.setState({ selectedOption });
        if (multi) {
            let list_arr = "";
            selectedOption.map(item => {
                list_arr = list_arr + "" + item.value + "" + ",";
            });
            this.props.parentObject.ChangeValueComboboxMulti({
                type_code: comboOther,
                key: id,
                data: list_arr
                    ? list_arr.substring(0, list_arr.length - 1)
                    : list_arr
            });
        } else {
            this.props.parentObject.ChangeValueComboboxMulti({
                type_code: comboOther,
                key: id,
                data: selectedOption.value
            });
        }
    }
    render() {
        let {
            css,
            type_code,
            disable,
            value,
            list_data_other,
            multi
        } = this.props;
        let { listData } = this.state;

        const { selectedOption } = this.state;
        let arr_temp = [];
        // trường hợp là combo từ table khác

        if (list_data_other && list_data_other.length > 0) {
            list_data_other.map(item => {
                if (item.code)
                    arr_temp.push({
                        code: item.code,
                        value: item.code,
                        label: item.name,
                        name: item.name
                    });
            });
        }
        return (
            <Select
                className={css}
                deleteRemoves={false}
                name="form-field-name"
                value={selectedOption}
                onChange={selectedOption => this.handleChange(selectedOption)}
                options={arr_temp}
                multi={multi}
                disabled={disable}
            />
        );
    }
}
const mapStateToProps = ({ header, i18n }, ownProps) => {
    return {
        header,
        i18n
    };
};
const mapDispatchToProps = dispatch => {
    return Redux.bindActionCreators(
        {
            ...ReactRouterRedux.routerActions
        },
        dispatch
    );
};
module.exports = ReactRedux.connect(
    mapStateToProps,
    mapDispatchToProps
)(ComboboxMultiple);
