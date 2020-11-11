import * as orderActions from 'modules/order/actions/form'
const { Translate, I18n } = ReactReduxI18n;
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
class ListStone extends React.Component {


    render() {
        let { listHeaderStone, list_stone_by_order, infoStone } = this.props.order

        return (
            <div id="list_stone" style={{ "background": "white", "width":"500px" }}>
                <div style={{ "margin": "20px", "paddingTop": "10px" }} className="form__personnal">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <div className="left">
                                    <label htmlFor="name">Mã đơn hàng</label>
                                </div>
                                <div className="right" >
                                    <label htmlFor="name">{infoStone.IdOrder}</label>
                                    {/* <input readOnly={true} className="name form-control" value={'13131'} type="text" id="IdOrder" name="name" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <div className="left">
                                    <label htmlFor="dateofbirth">Ngày đơn hàng</label>
                                </div>
                                <div className="right">
                                    <label htmlFor="dateofbirth">
                                        {moment(infoStone.DayMake).format('DD/MM/YYYY')}</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <div className="left">
                                    <label htmlFor="dateofbirth">Khách hàng</label>
                                </div>
                                <div className="right">
                                    <label htmlFor="name">{infoStone.NameKH}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group" style={{ "background": "white" }}>
                                <div style={{ width: "100%", "background": "white" }}>
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                {
                                                    listHeaderStone.map((item, i) => {
                                                        return (
                                                            <th style={{ "textAlign": "left" }} key={`thead_${i}`} scope="col">{item.title}</th>

                                                        )
                                                    })
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list_stone_by_order && list_stone_by_order.map((item, i) => {
                                                let { IdStone, SLD } = item
                                                return (
                                                    <tr key={`data_${i}`} >
                                                        <td>{IdStone}</td>
                                                        <td>{SLD}</td>
                                                        
                                                    </tr>
                                                )
                                            })
                                            }
                                        </tbody>
                                    </table>
                                </div>
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
    order
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        order
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...orderActions,
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListStone)