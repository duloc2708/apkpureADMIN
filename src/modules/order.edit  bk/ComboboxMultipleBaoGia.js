import * as headerActions from 'modules/header/actions/form'
import * as listActions from 'modules/list/actions/form'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import * as orderActions from 'modules/order/actions/form'

class ComboboxMultipleBaoGia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_default: false,
            listDataDefault: [],
            listData: [],
            selectedOption: '',
            is_update: false,
            is_edit: false,
            valueState: ''
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

    componentDidMount() {
        let { value, type_code, Customer, id, comboOther, list_data_other } = this.props
        if (list_data_other.length > 0) {
            let findItem = list_data_other.filter(x => x.value == value)
            let item_selected = ''
            if (value) {
                item_selected = { value: findItem[0].code, label: findItem[0].name, name: findItem[0].name, valueParams: findItem[0].valueParams }
            }
            this.setState({ listData: list_data_other, selectedOption: item_selected })
        }
    }
    componentWillReceiveProps(nextProps) {
        let { value, type_code, Customer, id, comboOther, list_data_other } = this.props
        let { Customer: CustomerTemp } = nextProps
        let { listData, valueState } = this.state
        let listDataTemp = [],
            item_selected = ''
        if (list_data_other.length > 0 && value != valueState) {
            if (value) {
                let arrData = value.split(',')
                if (value.indexOf(',') == -1) {
                    let findItem = list_data_other.filter(x => x.value == value)
                    item_selected = { value: findItem[0].code, label: findItem[0].name, name: findItem[0].name, valueParams: findItem[0].valueParams }
                    this.props.getListProductsByPrice(value)
                }
                arrData.map(item => {
                    let itemData = list_data_other.filter(x => x.value == item)
                    listDataTemp.push(itemData[0])
                })
            }
            this.setState({ listData: listDataTemp, selectedOption: item_selected, valueState: value })
        }
    }
    handleChange(selectedOption) {
        let { value, id, type_code, keyValue } = this.props
        let list_arr = ''
        this.setState({ selectedOption });
        this.props.getListProductsByPrice(selectedOption.value)
    }
    render() {
        let { type_code, disable, value, Customer } = this.props
        let { listData } = this.state
        const { selectedOption } = this.state;
        let arr_temp = []
        listData.map((item) => {
            arr_temp.push({ value: item.value || item.code, label: item.name, name: item.name, valueParams: item.valueParams })
        })
        return (
            <Select
                deleteRemoves={false}
                name="form-field-name"
                value={selectedOption}
                onChange={(selectedOption) => this.handleChange(selectedOption)}
                options={arr_temp}
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
        ...listActions,
        ...orderActions
    }, dispatch)
}
module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ComboboxMultipleBaoGia)