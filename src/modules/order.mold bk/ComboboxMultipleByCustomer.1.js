import * as headerActions from 'modules/header/actions/form'
import * as listActions from 'modules/list/actions/form'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import * as orderActions from 'modules/order/actions/form'

class ComboboxMultipleByCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            is_default: false,
            listDataDefault: [],
            listData: [],
            selectedOption: '',
            is_update: false,
            is_edit: false
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
        let { type_code, is_default, value, disable, Customer, id, comboOther, list_data_other } = this.props
        let { is_edit } = this.state
        if (!value) {
            // if (id == 'CodeBaoGia') {
            //     this.setState({ listData: list_data_other, listDataDefault: list_data_other });
            // } else {

            // }
            this.props.getDataByCode(type_code)
                .then(res => {
                    let { data } = res.data
                    let data_temp = []
                    data.map((item, i) => {
                        data_temp.push(item)
                    })
                    let arr_data = []
                    let arr_convert = value.split(',')
                    arr_convert.map((item) => {
                        let findItem = data_temp.filter(x => x.code == item)
                        if (findItem.length > 0) {
                            arr_data.push({ value: item, label: findItem[0].name, name: findItem[0].name, valueParams: findItem[0].valueParams })
                        }
                    })
                    this.setState({ listData: data_temp, listDataDefault: data_temp });
                })

        } else {
            this.props.getDataByCode(type_code)
                .then(res => {
                    let { data } = res.data
                    let data_temp = []
                    data.map((item, i) => {
                        data_temp.push(item)
                    })
                    let arr_data = []
                    let arr_convert = value.split(',')
                    arr_convert.map((item) => {
                        let findItem = data_temp.filter(x => x.code == item)
                        if (findItem.length > 0) {
                            arr_data.push({ value: item, label: findItem[0].name, name: findItem[0].name, valueParams: findItem[0].valueParams })
                        }
                    })
                    this.props.getDataByCodeByCustomer(id, Customer)
                        .then(resCus => {
                            let { data } = resCus.data
                            if (data && data[0]) {
                                if (id == 'CodeBaoGia') {

                                    let arr_convert_value = value.split(',')
                                    let item_selected = ''
                                    arr_convert_value.map((itemVal) => {
                                        let findItemVal = list_data_other.filter(x => x.value === itemVal)
                                        if (findItemVal.length > 0) {
                                            item_selected = findItemVal[0]
                                        }
                                    })

                                    this.setState({ listData: list_data_other, listDataDefault: list_data_other, selectedOption: item_selected, is_edit: true });
                                }
                                else {
                                    let value_by_customer = data[0].value, arr_data_cus = []
                                    let arr_convert_customer = value_by_customer.split(',')
                                    arr_convert_customer.map((itemCus) => {
                                        let findItem = data_temp.filter(x => x.code == itemCus)
                                        if (findItem.length > 0) {
                                            arr_data_cus.push({ value: itemCus, label: findItem[0].name, name: findItem[0].name, valueParams: findItem[0].valueParams })
                                        }
                                    })

                                    let arr_convert_value = value.split(',')
                                    let item_selected = ''
                                    arr_convert_value.map((itemVal) => {
                                        let findItemVal = arr_data_cus.filter(x => x.value == itemVal)
                                        if (findItemVal.length > 0) {
                                            item_selected = { value: itemVal, label: findItemVal[0].name, name: findItemVal[0].name, valueParams: findItemVal[0].valueParams }
                                        }
                                    })
                                    this.setState({ listData: arr_data_cus, listDataDefault: arr_data_cus, selectedOption: item_selected, is_edit: true });

                                }
                            }
                        })
                })
        }

    }
    componentWillReceiveProps(nextProps) {
        let { value, type_code, Customer, id, comboOther, list_data_other } = nextProps
        let { listData, is_update, listDataDefault, is_edit } = this.state

        if (!is_edit) {
            if (!is_update) {
                this.props.getDataByCodeByCustomer(id, Customer)
                    .then(res => {
                        if (id == 'CodeBaoGia') {
                            let { data } = res.data

                            if (data && data[0]) {
                                let value_by_customer = data[0].value
                                let listData_temp = list_data_other, arr_data = []
                                let arr_convert = value_by_customer.split(',')
                                let item_selected = ''
                                arr_convert.map((item) => {
                                    let findItem = listData_temp.filter(x => x.value == item)
                                    if (findItem.length > 0) {
                                        arr_data.push(findItem[0])
                                    }
                                    //gán măc định data nếu chỉ có 1 item
                                    if (arr_convert.length == 1) {
                                        item_selected = { value: findItem[0].value, label: findItem[0].name, name: findItem[0].name, valueParams: findItem[0].valueParams }
                                        this.props.parentObject.updateComboDynamic({ type: id, value: item_selected ? item_selected.value : '', valueParams: item_selected.valueParams });

                                    }
                                })

                                if (item_selected.value) {
                                    this.setState({
                                        listData: arr_data, is_update: true, selectedOption: item_selected
                                    });
                                } 
                                else {
                                    if(!this.state.selectedOption){
                                        this.setState({
                                            listData: arr_data, is_update: true
                                        });
                                    }
                                 
                                }


                                // else {
                                //     this.setState({
                                //         listData: arr_data, is_update: true
                                //     });
                                // }

                            }
                        } else {
                            let { data } = res.data
                            if (data && data[0]) {
                                let value_by_customer = data[0].value
                                let listData_temp = listDataDefault, arr_data = []
                                let arr_convert = value_by_customer.split(',')
                                let item_selected = ''
                                arr_convert.map((item) => {
                                    let findItem = listData_temp.filter(x => x.code == item)
                                    if (findItem.length > 0) {
                                        arr_data.push({ value: findItem[0].code, label: findItem[0].name, name: findItem[0].name, valueParams: findItem[0].valueParams })
                                    }
                                    //gán măc định data nếu chỉ có 1 item
                                    if (arr_convert.length == 1) {
                                        item_selected = { value: findItem[0].code, label: findItem[0].name, name: findItem[0].name, valueParams: findItem[0].valueParams }
                                    }
                                })
                                this.props.parentObject.updateComboDynamic({ type: id, value: item_selected ? item_selected.value : '', valueParams: item_selected.valueParams });
                                this.setState({
                                    listData: arr_data, is_update: true, selectedOption: item_selected
                                });
                            }
                        }


                    })


            } else {
                if (Customer != this.props.Customer) {

                    this.props.getDataByCodeByCustomer(id, Customer)
                        .then(res => {
                            let { data } = res.data
                            if (data && data[0]) {
                                if (id == 'CodeBaoGia') {

                                    let value_by_customer = data[0].value
                                    let listData_temp = list_data_other, arr_data = []
                                    let arr_convert = value_by_customer.split(',')
                                    let item_selected = ''
                                    arr_convert.map((item) => {
                                        let findItem = listData_temp.filter(x => x.value == item)
                                        if (findItem.length > 0) {
                                            arr_data.push(findItem[0])
                                        }
                                        //gán măc định data nếu chỉ có 1 item
                                        if (arr_convert.length == 1) {
                                            item_selected = { value: findItem[0].value, label: findItem[0].name, name: findItem[0].name, valueParams: findItem[0].valueParams }
                                            this.props.parentObject.updateComboDynamic({ type: id, value: item_selected ? item_selected.value : '', valueParams: item_selected.valueParams });

                                        }
                                    })
                                    this.setState({
                                        listData: arr_data,
                                        selectedOption: item_selected
                                    });

                                } else {
                                    let value_by_customer = data[0].value
                                    let listData_temp = listDataDefault, arr_data = []
                                    let arr_convert = value_by_customer.split(',')
                                    let item_selected = ''
                                    arr_convert.map((item) => {
                                        let findItem = listData_temp.filter(x => x.code == item)
                                        if (findItem.length > 0) {
                                            arr_data.push({ value: findItem[0].code, label: findItem[0].name, name: findItem[0].name, valueParams: findItem[0].valueParams })
                                        }
                                        //gán măc định data nếu chỉ có 1 item
                                        if (arr_convert.length == 1) {
                                            item_selected = { value: findItem[0].code, label: findItem[0].name, name: findItem[0].name, valueParams: findItem[0].valueParams }
                                        }
                                    })
                                    this.props.parentObject.updateComboDynamic({ type: id, value: item_selected ? item_selected.value : '', valueParams: item_selected.valueParams });
                                    this.setState({
                                        listData: arr_data,
                                        selectedOption: item_selected
                                    });
                                }
                            }

                        })

                }
            }

        }

    }
    handleChange(selectedOption) {
        let { value, id, type_code, keyValue } = this.props
        let list_arr = ''
        this.setState({ selectedOption });
        this.props.parentObject.ChangeValueComboboxMulti({ keyValue: keyValue, key: id, data: selectedOption });
    }
    // handleChange(selectedOption) {
    //     let { value, id, type_code } = this.props
    //     let list_arr = ''
    //     this.setState({ selectedOption });
    //     selectedOption.map((item) => {
    //         list_arr = list_arr + '' + item.value + '' + ','
    //     })
    //     this.props.parentObject.ChangeValueComboboxMulti({ key: id, data: list_arr ? list_arr.substring(0, list_arr.length - 1) : list_arr });
    // }
    render() {
        let { type_code, disable, value, Customer } = this.props
        let { listData } = this.state
        const { selectedOption } = this.state;
        let arr_temp = []
        listData.map((item) => {
            arr_temp.push({ value: item.value || item.code, label: item.name, name: item.name, valueParams: item.valueParams })
        })
        if (type_code == 'CodeBaoGia') {

        }

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
module.exports = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ComboboxMultipleByCustomer) 
