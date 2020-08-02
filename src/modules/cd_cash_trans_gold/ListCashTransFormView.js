
import * as CashTransActions from 'modules/cd_cash_trans_gold/actions/form'
import * as listActions from 'modules/list/actions/form'
import * as headerActions from 'modules/header/actions/form'
import * as toolbarActions from 'modules/toolbar/actions/form'
import * as commonActions from 'modules/common/actions/form'

class ListCashTransFormView extends React.Component {
    constructor() {
        super()
        this.state = {
            codeCashTrans: ''
        }
    }

    componentWillUnmount() {
        this.props.resetInfoPage()
    }
    _onClickRow(item, checked) {
        this.props.clickCheckRowCasting(item, checked)
    }


    _onRowDetail(item, checked) {
        this.props.clickCheckRowCasting(item, checked)
    }
    _EditCasting() {
        this.props.isEditCasting(true)
    }
    componentDidMount() {
        this.props.getListDataCashTrans('')
        this.props.getDataUsers('USERS')
        this.props.getListCustomer()
        this.props.getListOutput()
        // get list type
        let list = ['PAYMENT_TYPE', 'PAYMENT_CASH_GOLD']
        this.props.getListTypeByListCode(list)
        KeyboardJS.bind('enter', (event) => {
            if ($('#codeCashTrans').is(':focus')) {
                this._onSearch()
            }
        })
    }
    _onSearch() {
        this.props.resetInfoPage().then(() => {
            this.props.getListDataCashTrans(this.refs.codeCashTrans && this.refs.codeCashTrans.value)
        })
    }
    _handleInput(e) {
        this.setState({ codeCashTrans: e.target.value })
    }
    _renderPage(page) {
        let data = [];
        for (var i = 1; i <= 10; i++) {
            data.push(<li key={`page_${i}`} className={`page-item ${i == page ? 'active' : ''}`}>
                <a className={`page-link`} onClick={(e) => this._onChangePage(e)}>{i}</a>
            </li>);
        }
        return data;
    }

    _onPrint(item, type) {
        // this.props.printOrderDetail(item, type)
    }
    _acceptOrder(item, status) {
        if (item.Status == 'STATUS_TRANS_01') {
            var r = confirm(`Bạn cón muốn xác nhận phiếu thu này ?`);
            if (r == true) {
                this.props.acceptStatus(item.IdTicket).then(res => {
                    this.child._addNotification(`Cập nhật thành công`, 'success')
                    this.props.getListDataCashTrans(this.refs.codeCashTrans && this.refs.codeCashTrans.value)
                })
            }
        }

    }
    _completeTicket(item, status) {
        if (item.Status == 'STATUS_TRANS_02') {
            var r = confirm(`Bạn cón muốn hoàn thành phiếu thu này ?`);
            if (r == true) {
                this.props.completeTicket(item.IdTicket).then(res => {
                    this.child._addNotification(`Cập nhật thành công`, 'success')
                    this.props.getListDataCashTrans(this.refs.codeCashTrans && this.refs.codeCashTrans.value)
                })
            }
        } else if (item.Status != 'STATUS_TRANS_04') {
            alert('Vui lòng xác nhận trước khi hoàn thành')
        }

    }
    _onNext(obj) {
        this.props.getListDataOrder(obj.params)
    }
    _onPrevious(obj) {
        this.props.getListDataOrder(obj.params)
    }
    _onChangePage(obj) {
        this.props.getListDataCashTrans(this.refs.codeCashTrans && this.refs.codeCashTrans.value)
    }
    onClickButtonPermission(obj) {
        let { data, nameBtn } = obj
        let { item, checked, typePrint, status } = data
        switch (nameBtn) {
            case 'EDIT':
                this._EditCasting(item)
                this.props.updateButtonToolbar('EDIT')
                this.props.clickCheckRowCasting(item, checked).then(() => {
                    this.props.getDataDetailByCode()
                    this.props.getDataDetailStoneByCode()
                })
                break;
            case 'DETAIL':
                this._EditCasting(item)
                this.props.clickCheckRowCasting(item, checked).then(() => {
                    this.props.getDataDetailByCode()
                    this.props.getDataDetailStoneByCode()
                })
                break;
            case 'ACCEPT_CASH_TRANS':
                this._acceptOrder(item, status)
                break;
            case 'COMPlETED_CASH_TRANS':
                this._completeTicket(item, status)
                break;
            case 'PRINT':
                this.props.printDetail(item)
                break;
            default:
                break
        }
    }
    changeSortTable(item) {
        this.props.sortDataListCash(item)
    }
    onChangeFilterTable(obj) {
        this.props.onChangeFilterListCash(obj)
    }
    render() {
        let { list_data, listHeaderTable, objConfig } = this.props.cd_cash_trans_gold
        let { IsIncludeInOut } = objConfig
        return (
            <div >
                <AlertCustom onRef={ref => (this.child = ref)} />
                <div className="form__personnal">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="form-group ">
                                <div className="left">
                                    <label htmlFor="name">Mã PT / max KH</label>
                                </div>
                                <div className="right">
                                    <input className="name form-control"
                                        value={this.state.codeCashTrans}
                                        onChange={(e) => this._handleInput(e)}
                                        type="text"
                                        ref="codeCashTrans"
                                        id="codeCashTrans"
                                        name="codeCashTrans" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <div className="left"
                                    onClick={() => this._onSearch()}
                                >
                                    <button className="btn btn-primary">Tìm kiếm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <CustomTable
                    idTable='tableListCash'
                    idBody='bodyListCash'
                    list_col={listHeaderTable}
                    list_data={list_data}
                    parentObject={this}
                />
                < PagingTable type="product" parentObject={this} />
            </div >
        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    common,
    cd_cash_trans_gold,
    header,
    toolbar
}, ownProps) => {
    return {
        userAuth,
        i18n,
        common,
        ownProps,
        cd_cash_trans_gold,
        header,
        toolbar
    }
}

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...CashTransActions,
        ...listActions,
        ...headerActions,
        ...toolbarActions,
        ...commonActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListCashTransFormView)

