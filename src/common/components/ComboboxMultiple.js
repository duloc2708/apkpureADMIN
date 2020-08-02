import * as headerActions from 'modules/header/actions/form'
import * as listActions from 'modules/list/actions/form'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
class ComboboxMultiple extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_default: false,
            listData: [],
            selectedOption: ''
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
    setDataExistsOther(value, list_data_other) {
        let arr_convert = value.split(','), arr_data = []
        arr_convert.map((item) => {
            let findItem = list_data_other.filter(x => x.code == item)
            if (findItem.length > 0) {
                arr_data.push({ value: findItem[0].code, label: findItem[0].name, name: findItem[0].name })
            }
        })
        this.setState({ selectedOption: arr_data })
    }
    componentDidMount() {
        let { type_code, is_default, value, disable, list_data_other, comboOther } = this.props
        if (comboOther && value && list_data_other) {
            this.setDataExistsOther(value, list_data_other)
        } else {
            this.props.getDataByCode(type_code)
                .then(res => {
                    let { data } = res
                    let data_temp = []
                    data_temp.push({ id: -1, code: "", name: "-- empty --", type_code: type_code, status: 1 })
                    data.map((item, i) => {
                        data_temp.push(item)
                    })
                    if (value) {
                        let arr_data = []
                        let arr_convert = value.split(',')
                        arr_convert.map((item) => {
                            let findItem = data_temp.filter(x => x.code == item)
                            if (findItem.length > 0) {
                                arr_data.push({ value: findItem[0].code, label: findItem[0].name, name: findItem[0].name })
                            }
                        })
                        this.setState({ listData: data_temp, selectedOption: arr_data });
                    } else {
                        this.setState({ listData: data_temp })
                    }
                })
        }


    }
    componentWillReceiveProps(nextProps) {
        let { value, type_code, list_data_other, comboOther } = nextProps

        let { listData } = this.state
        let code = this.props.type_code, arr_data = []
        // Cập nhật value vào combo từ danh mục dùng chung
        if (value && !comboOther) {
            let arr_convert = value.split(',')
            arr_convert.map((item) => {
                let findItem = listData.filter(x => x.code == item)
                if (findItem.length > 0) {
                    arr_data.push({ value: findItem[0].code, label: findItem[0].name, name: findItem[0].name })
                }
            })
        }
        //cập nhật value vào combo từ data khác
        if (comboOther && value && list_data_other) {
            this.setDataExistsOther(value, list_data_other)
            return false
        }
        this.setState({ selectedOption: arr_data });
    }
    handleChange(selectedOption) {

        let { value, id, type_code, comboOther } = this.props
        let list_arr = ''
        this.setState({ selectedOption });
        selectedOption.map((item) => {
            list_arr = list_arr + '' + item.value + '' + ','
        })
        this.props.parentObject.ChangeValueComboboxMulti({ type_code: comboOther ? comboOther : '', key: id, data: list_arr ? list_arr.substring(0, list_arr.length - 1) : list_arr });


    }
    render() {
        let { type_code, disable, value, list_data_other } = this.props
        let { listData } = this.state

        const { selectedOption } = this.state;
        let arr_temp = []
        // trường hợp là combo từ table khác

        if (list_data_other && list_data_other.length > 0) {
            list_data_other.map((item) => {
                if (item.code)
                    arr_temp.push({ value: item.code, label: item.name, name: item.name })
            })

        }
        // nếu là danh mục dùng chung
        else {
            listData.map((item) => {
                if (item.code)
                    arr_temp.push({ value: item.code, label: item.name, name: item.name })
            })
        }
        return (
            <Select
                deleteRemoves={false}
                name="form-field-name"
                value={selectedOption}
                onChange={(selectedOption) => this.handleChange(selectedOption)}
                options={arr_temp}
                multi={true}
                disabled={disable}
            />
        )
    }
}
const mapStateToProps = ({
    header,
    i18n,
    list
}, ownProps) => {
    return {
        header,
        i18n,
        list
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...listActions
    }, dispatch)
}
module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ComboboxMultiple) 
