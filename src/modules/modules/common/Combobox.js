import * as headerActions from 'modules/header/actions/form'
import * as listActions from 'modules/list/actions/form'

class Combobox extends React.Component {
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
        data.push({ id: -1, code: "", name: "-- empty --", type_code: code, status: 1 })
        data_temp.map((item, i) => {
            data.push(item)
        })
        return data
    }
    _onChangeValue(e) {
        let { type_code, id, keyInput } = this.props
        this.setState({ value_default: e.target.value })
        this.props.parentObject.ChangeValueCombobox({ id: id, value: e.target.value, key: keyInput });
    }
    componentDidMount() {
        let { type_code, is_default, value, disable } = this.props
        let { list_data_all } = this.props.list
        this.props.getDataByCode(type_code)
            .then(res => {
                let { data } = res.data
                let data_temp = []
                data_temp.push({ id: -1, code: "", name: "-- empty --", type_code: type_code, status: 1 })
                data.map((item, i) => {
                    data_temp.push(item)
                })
                this.setState({ listData: data_temp, value_default: value })
            })

    }
    componentWillReceiveProps(nextProps) {
        let { value, type_code } = nextProps
        let code = this.props.type_code
        this.setState({ value_default: value });

    }
    render() {
        let { type_code, disable, value } = this.props
        let { value_default, listData } = this.state
        return (
            <select disabled={disable} onChange={(e) => this._onChangeValue(e)} value={value_default}>
                {
                    listData && listData.map((item, i) => {
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
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Combobox)

