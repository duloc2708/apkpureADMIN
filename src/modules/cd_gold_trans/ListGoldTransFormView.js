
import * as goldTransActions from 'modules/cd_gold_trans/actions/form'
import * as listActions from 'modules/list/actions/form'
import * as headerActions from 'modules/header/actions/form'
import * as toolbarActions from 'modules/toolbar/actions/form'
import * as commonActions from 'modules/common/actions/form'

class ListGoldTransFormView extends React.Component {
    constructor() {
        super()
        this.state = {
            codeGoldTrans: ''
        }
    }

    componentWillUnmount() {
        this.props.resetInfoPage()
    }
    _onClickRow(item, checked) {
        this.props.clickCheckRowGoldTrans(item, checked)
    }


    _onRowDetail(item, checked) {
        this.props.clickCheckRowGoldTrans(item, checked)
    }
    _EditCasting() {
        this.props.isEditCasting(true)
    }
    componentDidMount() {
        this.props.getListDataGoldTrans('')
        this.props.getListCustomer()
        this.props.getListOutput()
        this.props.getListDataUser()
        // this.props.getListBagInCastingProc()
        // this.props.getDataWoker('EMPLOYEE').then(() => {
        //     this.props.getConfigProcess()
        // })

        KeyboardJS.bind('enter', (event) => {
            if ($('#codeGoldTrans').is(':focus')) {
                this._onSearch()
            }
        })
        // // get list type
        // let list = ['DSM']
        // this.props.getListTypeByListCode(list)
    }
    _onSearch() {
        this.props.resetInfoPage().then(() => {
            this.props.getListDataGoldTrans(this.refs.codeGoldTrans && this.refs.codeGoldTrans.value)
        })
    }
    _handleInput(e) {
        this.setState({ codeGoldTrans: e.target.value })
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
                    this.props.getListDataGoldTrans(this.refs.codeGoldTrans && this.refs.codeGoldTrans.value)
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
                    this.props.getListDataGoldTrans(this.refs.codeGoldTrans && this.refs.codeGoldTrans.value)
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
        this.props.getListDataGoldTrans(this.refs.codeGoldTrans && this.refs.codeGoldTrans.value)
    }
    onClickButtonPermission(obj) {
        let { data, nameBtn } = obj
        let { item, checked, typePrint, status } = data
        switch (nameBtn) {
            case 'EDIT':
                this._EditCasting(item)
                this.props.updateButtonToolbar('EDIT')
                this.props.clickCheckRowGoldTrans(item, checked).then(() => {
                    this.props.getDataDetailByCode()

                })
                break;
            case 'DETAIL':
                this._EditCasting(item)
                this.props.clickCheckRowGoldTrans(item, checked).then(() => {
                    this.props.getDataDetailByCode()
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
        this.props.sortDataListGold(item)
    }
    onChangeFilterTable(obj) {
        this.props.onChangeFilterListGold(obj)
    }
    render() {
        let { list_data, listHeaderTable, listHeaderTableCustom, objConfig } = this.props.cd_gold_trans
        let { IsIncludeInOut } = objConfig
        return (
            <div >
                <AlertCustom onRef={ref => (this.child = ref)} />
                <div className="form__personnal">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="form-group ">
                                <div className="left">
                                    <label htmlFor="name">Mã / tên sản phẩm</label>
                                </div>
                                <div className="right">
                                    <input className="name form-control"
                                        value={this.state.codeGoldTrans}
                                        onChange={(e) => this._handleInput(e)}
                                        type="text"
                                        ref="codeGoldTrans"
                                        id="codeGoldTrans"
                                        name="codeGoldTrans" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <div className="left"
                                    onClick={() => this._onSearch()}>
                                    <button className="btn btn-primary">Tìm kiếm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <CustomTable
                    idTable='tableListGold'
                    idBody='bodyListGold'
                    list_col={listHeaderTableCustom}
                    list_data={list_data}
                    parentObject={this}
                />
                <PagingTable type="product" parentObject={this} />
            </div>
        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    common,
    cd_gold_trans,
    header,
    toolbar
}, ownProps) => {
    return {
        userAuth,
        i18n,
        common,
        ownProps,
        cd_gold_trans,
        header,
        toolbar
    }
}

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...goldTransActions,
        ...listActions,
        ...headerActions,
        ...toolbarActions,
        ...commonActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListGoldTransFormView)

