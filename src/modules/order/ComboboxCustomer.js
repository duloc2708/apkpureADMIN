import Select from "react-select";
import "react-select/dist/react-select.css";
import * as stoneActions from "modules/stone/actions/form";
import * as castingActions from "modules/casting/actions/form";
import * as productsActions from "modules/products/actions/form";
import * as orderActions from "modules/order/actions/form";

class ComboboxCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: ""
        };
    }
    handleChange(selectedOption) {
        if (selectedOption.Status === 1) {
            alert('Khách hàng này đã bị khóa');
            return false
        }
        console.log('selectedOption',selectedOption)
        if (selectedOption.CheckCashLimit === 1 && selectedOption.Last_CashDebt>selectedOption.Limit_Cash ) {
            alert('Khách hàng ' + selectedOption.value + ' tạm khóa do công nợ tiền công (' + SportConfig.function._formatMoney(selectedOption.Last_CashDebt) + ') vượt hạn mức cho phép là ' + SportConfig.function._formatMoney(selectedOption.Limit_Cash));
            return false
        }
        if (selectedOption.CheckGoldLimit === 1 && 
                 selectedOption.Last_GoldDebt> selectedOption.Limit_Gold)  {
            alert('Khách hàng ' + selectedOption.value + ' tạm khóa do công nợ vàng (' + SportConfig.function._formatMoney(selectedOption.Last_GoldDebt) + ') vượt hạn mức cho phép là ' + SportConfig.function._formatMoney(selectedOption.Limit_Gold));
            return false
        }
        this.setState({ selectedOption });
        this.props.selectCustomer(selectedOption).then(data => {
            //   if (data.CodeBaoGia) {
            //     this.props.getListProductsByPrice(data.CodeBaoGia,data);
            //   }
        });
    }
    componentDidMount() {
        this.setState({ selectedOption: this.props.value });
    }
    render() {
        let { list_data, disable } = this.props;
        const { selectedOption } = this.state;
        let arr_temp = [];
        list_data.map(item => {
            if (item.Id)
                arr_temp.push({
                    value: item.Code,
                    label: item.Code,
                    name: item.Name,
                    CodeLH: item.CodeLH,
                    CodeMX: item.CodeMX,
                    CodeLV: item.CodeLV,
                    CodeLAI: item.CodeLAI,
                    Discount: item.Discount,
                    CodeBaoGia: item.CodeBaoGia,
                    Status: item.Status,
                    Limit_Cash: item.Limit_Cash,
                    Limit_Gold: item.Limit_Gold,
                    Last_GoldDebt: item.Last_GoldDebt,
                    Last_CashDebt: item.Last_CashDebt,
                    CheckCashLimit: item.CheckCashLimit,
                    CheckGoldLimit: item.CheckGoldLimit
                });
        });

        return (
            <Select
                disabled={disable}
                deleteRemoves={false}
                name="form-field-name"
                value={selectedOption}
                onChange={selectedOption => this.handleChange(selectedOption)}
                options={arr_temp}
            />
        );
    }
}

const mapStateToProps = (
    { userAuth, i18n, stone, header, order },
    ownProps
) => {
    return {
        userAuth,
        i18n,
        ownProps,
        stone,
        header,
        order
    };
};
const mapDispatchToProps = dispatch => {
    return Redux.bindActionCreators(
        {
            ...ReactRouterRedux.routerActions,
            ...stoneActions,
            ...castingActions,
            ...productsActions,
            ...orderActions
        },
        dispatch
    );
};
export default ReactRedux.connect(
    mapStateToProps,
    mapDispatchToProps
)(ComboboxCustomer);
