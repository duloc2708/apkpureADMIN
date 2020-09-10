import * as cd_turn_inout_Actions from 'modules/cd_turn_inout/actions/form'
import * as listActions from 'modules/list/actions/form'
import * as headerActions from 'modules/header/actions/form'
import * as toolbarActions from 'modules/toolbar/actions/form'
import * as commonActions from 'modules/common/actions/form'

class ListCastingProcFormView extends React.Component {
    constructor() {
        super()
        this.state = {
            codeTurnInout: ''
        }
    }

    componentWillUnmount() {
        this.props.resetInfoPage()
    }
    _onClickRow(item, checked) {
        this.props.clickCheckRowTurnInout(item, checked)
    }

    _onRowDetail(item, checked) {
        this.props.clickCheckRowTurnInout(item, checked)
    }
    _EditCasting() {
        this.props.isEditCasting(true)
    }
    componentDidMount() {
        let type = Helper.getParam(window.location.href, 'type')
        this.props.getListDataCdTurn('')
        this.props.getListCustomer()
        this.props.getDataProductsNotAccept()
        KeyboardJS.bind('enter', (event) => {
            if ($('#codeTurnInout').is(':focus')) {
                this._onSearch()
            }
        })
        // lấy danh sách danh mục dùng chung theo từng loại
        let list = ['L', 'LH', 'MX', 'DSM', 'LV', 'TURN_TRANS_TYPE']
        this.props.getListTypeByListCode(list).then(() => {
            let { list_data_all } = this.props.list
            // lấy danh sách trả hàng, tái xuất
            let list_data_allTemp = _.clone(list_data_all, true)
            list_data_allTemp = list_data_allTemp.filter(x => x.type_code == 'TURN_TRANS_TYPE' && x.DisplayType == type)
            this.props.getListTurnType(list_data_allTemp)
        })
        // lấy danh sách nhân viên
        this.props.getDataWoker('EMPLOYEE')
        this.props.getListDataBaoGiaInCdTurn()
        // khơi tạo value ban đầu
        this.props.initData()

        if (type == 1) {
            this.props.getDataProductsInv()
            this.props.getListTurnByIn()
        }
    }
    _onSearch() {
        this.props.resetInfoPage().then(() => {
            this.props.getListDataCdTurn(this.refs.codeTurnInout && this.refs.codeTurnInout.value)
        })
    }
    _handleInput(e) {
        this.setState({ codeTurnInout: e.target.value })
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
    _acceptTurnInOut(item, status) {
        if (item.Status == 'STATUS_TURN_INOUT_02') {
            this.child._addNotification(`Phiếu này đã được xác nhận`, 'warning')
        } else if (item.Status == 'STATUS_TURN_INOUT_03') {
            this.child._addNotification(`Phiếu này đã hoàn thành`, 'warning')
        } else {
            var r = confirm(`Bạn cón muốn xác nhận phiếu này ?`);
            if (r == true) {
                this.props.acceptTurnInout(item.keyMap).then(res => {
                    this.child._addNotification(`Cập nhật thành công.`, 'success')
                    this.props.getListDataCdTurn(this.refs.codeTurnInout && this.refs.codeTurnInout.value)
                    this.props.getDataProductsNotAccept()('')
                })

            }
        }
    }
    _finishTurnInout(item, status) {
        if (item.Status == 'STATUS_TURN_INOUT_03') {
            this.child._addNotification(`Phiếu này đã hoàn thành!`, 'warning')
        } else if (!item.Status) {
            this.child._addNotification(`Vui lòng xác nhận trước!`, 'warning')
        } else {
            var r = confirm(`Bạn cón muốn hoàn thành phiếu này ?`);
            if (r == true) {
                this.props.finishTurnInout(item.keyMap).then(res => {
                    this.child._addNotification(`Cập nhật thành công.`, 'success')
                    this.props.getListDataCdTurn(this.refs.codeTurnInout && this.refs.codeTurnInout.value)
                })
            }
        }
    }
    _onNext(obj) {
        this.props.getListDataCdTurn(obj.params)
    }
    _onPrevious(obj) {
        this.props.getListDataCdTurn(obj.params)
    }
    _onChangePage(obj) {
        this.props.getListDataCdTurn(this.refs.codeTurnInout && this.refs.codeTurnInout.value)
    }
    onClickButtonPermission(obj) {
        let { data, nameBtn } = obj
        let { item, checked, status, codeCustom } = data
        switch (nameBtn) {
            case 'EDIT':
                this._EditCasting(item)
                this.props.updateButtonToolbar('EDIT')
                this.props.clickCheckRowTurnInout(item, checked)
                this.props.getListProductDetailTurn(item)
                break;
            case 'DETAIL':
                this._EditCasting(item)
                this.props.clickCheckRowTurnInout(item, checked)
                this.props.getListProductDetailTurn(item)
                break;
            case 'ACCEPT_ORDER':
                this._acceptTurnInOut(item, status)
                break;
            case 'COMPlETED_OUTPUT':
                this._finishTurnInout(item, status)
                break;
            case 'PRINT':
                this.props.printDetail(item, codeCustom)
                break;
            default:
                break
        }
    }
    changeSortTable(item) {
        this.props.sortDataListTurnInOut(item)
    }
    onChangeFilterTable(obj) {
        this.props.onChangeFilterListTurnInOut(obj)
    }
    render() {
        let { list_data, listHeaderTableCustomIn, listHeaderTableCustomOut } = this.props.cd_turn_inout
        let type = Helper.getParam(window.location.href, 'type')
        let listHeaderTableCustom = type == 0 ? listHeaderTableCustomIn : listHeaderTableCustomOut
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
                                        value={this.state.codeTurnInout}
                                        onChange={(e) => this._handleInput(e)}
                                        type="text"
                                        ref="codeTurnInout"
                                        id="codeTurnInout"
                                        name="codeTurnInout" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
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
                <CustomTable idTable='tableListTurnInOut'
                    idBody='bodyListTurnInOut'
                    list_col={listHeaderTableCustom} list_data={list_data} parentObject={this} />
                <PagingTable type="product" parentObject={this} />
            </div >
        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    list,
    common,
    cd_turn_inout,
    header,
    toolbar
}, ownProps) => {
    return {
        userAuth,
        i18n,
        list,
        common,
        ownProps,
        cd_turn_inout,
        header,
        toolbar
    }
}

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...cd_turn_inout_Actions,
        ...listActions,
        ...headerActions,
        ...toolbarActions,
        ...commonActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListCastingProcFormView)
