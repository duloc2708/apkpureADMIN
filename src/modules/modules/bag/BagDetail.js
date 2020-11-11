import * as bagActions from 'modules/bag/actions/form'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import ComboboxByTable from '../common/ComboboxByTable'
import { log } from 'util';
const { Translate, I18n } = ReactReduxI18n;
import ListStoneDetail from './ListStoneUpdate'
class BagDetail extends React.Component {
    constructor() {
        super()
    }
    _viewStone(item) {
        this.props.getListStoneByProductsDetail(item)
    }
    render() {
        let { listItemCreateBag } = this.props.bag
        let Id_temp, IdOrder_temp, DateCreated_temp, DateProcess_temp, EmployeeId_temp;
        if (listItemCreateBag.length > 0) {
            let { Id, IdOrder, DateCreated, DateProcess, EmployeeId } = listItemCreateBag[0];
            Id_temp = Id;
            IdOrder_temp = IdOrder;
            DateCreated_temp = DateCreated;
            DateProcess_temp = DateProcess;
            EmployeeId_temp = EmployeeId
        }
        return (
            <div className="form__personnal">
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="left">
                            </div>
                            <div className="right" >
                                <input readOnly={true} className="name form-control" value={Id_temp || ''} type="text" id="IdOrder" name="name" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Mã đơn hàng</label>
                            </div>
                            <div className="right">
                                <input readOnly={true} className="name form-control" value={IdOrder_temp || ''} type="text" id="namecustomer" name="namecustomer" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Ngày tạo bag</label>
                            </div>
                            <div className="right">
                                <DatePicker
                                    readOnly={false}
                                    selected={moment(DateCreated_temp)}
                                    dateFormat="DD/MM/YYYY" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Ngày Process</label>
                            </div>
                            <div className="right">
                                <DatePicker
                                    readOnly={false}
                                    selected={moment(DateProcess_temp)}
                                    dateFormat="DD/MM/YYYY" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Worker</label>
                            </div>
                            <div className="right">
                                <ComboboxByTable width={'150px'} tableName='EMPLOYEE' keyInput="EmployeeId" value={EmployeeId_temp} />
                            </div>

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <div style={{ width: "100%" }}>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th key={`thead_${1}`} scope="col">{'Mã sản phẩm'}</th>
                                            <th key={`thead_${0}`} scope="col">{'Màu'}</th>
                                            <th key={`thead_${4}`} scope="col">{'Số lượng đã tạo'}</th>
                                            <th key={`thead_${5}`} scope="col">{'Xem đá '}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listItemCreateBag.map((item, i) => {
                                            let { Color, IdOrderProduct, Value, IdProduct, ProductsEachBag, Number } = item
                                            return (
                                                <tr key={`dataDetail_${i}`}>
                                                    <td style={{ "textAlign": "left" }}>
                                                        <LinkProduct id={IdProduct} />
                                                    </td>
                                                    <td style={{ "textAlign": "left" }}>
                                                        <Combobox type_code='DSM' keyInput="Color" value={Color} id={IdOrderProduct} parentObject={this} />
                                                    </td>

                                                    <td style={{ "textAlign": "left" }}>
                                                        {ProductsEachBag}
                                                    </td>
                                                    <td><button onClick={() => this._viewStone(item)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                <ListStoneDetail />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}


const mapStateToProps = ({
    userAuth,
    i18n,
    bag
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        bag
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...bagActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(BagDetail)