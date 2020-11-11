import * as headerActions from 'modules/header/actions/form'
import * as listActions from 'modules/list/actions/form'

class ComboboxColor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value_default: props.value,
            is_default: false,
            listData: []
        }
    }
    _getDataByCode(code) {
        let { list_other_all } = this.props.header
        let data = []
        let data_temp = []
        if (list_other_all) {
            data_temp = list_other_all && list_other_all.filter(x => x.type_code == code)
        }
        data.push({ id: -1, code: "", name: "-- Chọn --", type_code: code, status: 1 })
        data_temp.map((item, i) => {
            data.push(item)
        })
        return data
    }
    _onChangeValue(e) {
        let { type_code, id, keyInput } = this.props
        this.setState({ value_default: e.target.value })
        this.props.parentObject.ChangeValueComboboxColor({ id: id, value: e.target.value, key: keyInput });
    }
    componentDidMount() {
        let { type_code, is_default, value, disable, typecb, listdatacb } = this.props
        let { list_data_all } = this.props.list

        if (typecb) {
            this.setState({ listData: listdatacb, value_default: value })
        } else {
            let list_data_all_temp = list_data_all.filter(x => x.type_code == type_code)
            if (list_data_all_temp.length == 0) {
                this.props.getDataByCode(type_code)
                    .then(res => {
                        let { data } = res.data
                        let data_temp = []
                        data_temp.push({ id: -1, code: "", name: "-- Chọn --", type_code: type_code, status: 1 })
                        data.map((item, i) => {
                            data_temp.push(item)
                        })
                        this.setState({ listData: data_temp, value_default: value })
                    })
            } else {
                let data_temp = []
                data_temp.push({ id: -1, code: "", name: "-- Chọn --", type_code: type_code, status: 1 })
                list_data_all_temp.map((item, i) => {
                    data_temp.push(item)
                })
                this.setState({ listData: list_data_all_temp, value_default: value })
            }

        }
    }
    componentWillReceiveProps(nextProps) {
        let { value, type_code } = nextProps
        this.setState({ value_default: value });

    }
    render() {
        let { type_code, disable, value, data_filter } = this.props
        let { value_default, listData } = this.state
        let data = []
        // trường hợp tách nhiều màu
        if (data_filter && data_filter.length > 1) {
            listData.map(item => {
                let checkExist = data_filter.filter(x => x.Color == item.code)
                if (checkExist.length > 0) {
                    data.push(item)
                }
            })
        } else {
            data = listData
        }
        return (
            <select disabled={disable} onChange={(e) => this._onChangeValue(e)} value={value_default}>
                {
                    data && data.map((item, i) => {
                        let { code, name, id, status } = item
                        return (<option key={`${type_code + i}`} value={code}>{name}</option>)
                    })
                }
            </select>
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
module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ComboboxColor) 
