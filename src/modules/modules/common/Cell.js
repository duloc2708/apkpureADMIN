import * as headerActions from 'modules/header/actions/form'
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
        let { id, keyInput } = this.props
        this.setState({ value: e })
        this.props.parentObject.ChangeValueCell({ id: id, value: e, key: keyInput });
    }
    componentWillReceiveProps(nextProps) {
        let { value} = nextProps        
        // let code = this.props.type_code
        this.setState({ value: value });

    }
    render() {
        let { value } = this.state
        let { id, keyInput, width, type } = this.props
        return (
            <td>
                <input id={id} style={{ "width": `${width ? width : "100%"}` }} type={type ? type : 'text'} className={`name form-control ${type ? 'allownumericwithdecimal' : ''}`} value={value} onChange={e => this._onChange(e.target.value)} type={'text'} name="name" required="" />
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
export default ReactRedux.connect(mapStateToProps, null)(Cell)

