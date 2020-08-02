import * as headerActions from 'modules/header/actions/form'
import * as listActions from 'modules/list/actions/form'

class ComboboxByTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value_default: props.value,
            is_default: false,
            listData: []
        }
    }

    _onChangeValue(e) {
        let { tableName, id, keyInput } = this.props
        this.setState({ value_default: e.target.value })
        this.props.parentObject.ChangeValueComboboxByTable({ id: id, value: e.target.value, key: keyInput });
    }
    componentDidMount() {
        let { tableName, is_default, value, disable } = this.props
        this.props.getDataByTable(tableName)
            .then(res => {
                let { data } = res.data
                let data_temp = []
                data_temp.push({ id: -1, code: "", name: "-- empty --", status: 1 })
                data.map((item, i) => {
                    data_temp.push(item)
                })
                this.setState({ listData: data_temp, value_default: value })
            })

    }
    componentWillReceiveProps(nextProps) {
        let { value, tableName } = nextProps
        let code = this.props.tableName
        this.setState({ value_default: value });

    }
    render() {
        let { tableName, disable, value, width } = this.props
        let { value_default, listData } = this.state
        return (
            <select style={{ "width": width ? width : '' }} disabled={disable} onChange={(e) => this._onChangeValue(e)} value={value_default}>
                {
                    listData && listData.map((item, i) => {
                        let { code, name } = item
                        return (<option key={`${tableName + i}`} value={code}>{name}</option>)
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
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ComboboxMultiple)

