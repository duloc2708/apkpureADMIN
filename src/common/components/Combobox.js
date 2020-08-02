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

    _getDataByCode(data, code) {
        let data_temp = []
        data_temp.push({ id: -1, code: "", name: "-- Chọn --", type_code: code, status: 1 })
        data.map((item, i) => {
            data_temp.push(item)
        })
        return data_temp
    }
    _onChangeValue(e) {
        let { type_code, id, keyInput } = this.props
        this.setState({ value_default: e.target.value })
        this.props.parentObject.ChangeValueCombobox({ id: id, value: e.target.value, key: keyInput });
    }
    componentDidMount() {
        let { type_code, is_default, value, disable, typecb, listdatacb, data_order } = this.props
        let { list_data_all } = this.props.list
        if (data_order && data_order.length > 0) {
            this.setState({ listData: data_order })
        } else {
            if (typecb) {
                this.setState({ listData: listdatacb, value_default: value })
            } else {
                let list_data_all_temp = list_data_all.filter(x => x.type_code == type_code)
                this.setState({ listData: list_data_all_temp, value_default: value })
            }
        }
    }
    componentWillUnmount() {
        this.setState({ value_default: '', listData: [], is_default: false });
    }
    componentWillReceiveProps(nextProps) {
        let { value, type_code, data_order } = nextProps
        if(data_order){
            this.setState({ value_default: value, listData: data_order });
        }else{
            this.setState({ value_default: value });
        }
    }

    render() {
        let { type_code, disable, value, width } = this.props
        let { value_default, listData } = this.state
        listData = this._getDataByCode(listData, type_code)
        return (
            <select style={{"width":"120px"}} className="name form-control" disabled={disable} onChange={(e) => this._onChangeValue(e)} value={value_default || ''}>
                {
                    listData && listData.map((item, i) => {
                        let { code, name, id, status } = item
                        return (<option key={`${type_code + i}`} value={code}>{name}</option>)
                    })
                }
            </select >
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
module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Combobox) 
