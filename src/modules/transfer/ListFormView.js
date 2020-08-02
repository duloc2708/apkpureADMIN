import * as transfer_Actions from 'modules/transfer/actions/form'
import * as listActions from 'modules/list/actions/form'
import * as headerActions from 'modules/header/actions/form'
import * as toolbarActions from 'modules/toolbar/actions/form'
import * as commonActions from 'modules/common/actions/form'
import {STATUS_TRANS_04, STATUS_TRANS_02} from './Constant'
class ListFormView extends React.Component {
    constructor() {
        super()
        this.state = {
            codeTransfer: ''
        }
    }

    componentWillUnmount() {
        this.props.resetInfoPage()
    }
    _onClickRow(item, checked) {
        this.props.clickCheckRowData(item, checked)
    }

    _onRowDetail(item, checked) {
        this.props.clickCheckRowData(item, checked)
    }
    _EditCasting() {
        this.props.isEditCasting(true)
    }
    componentDidMount() {
      let list = ["TF_TYPE"];
      this.props.getListTypeByListCode(list);
    }
    _onSearch() {
        // this.props.resetInfoPage().then(() => {
        //     this.props.getListDataCdTurn(this.refs.codeTransfer && this.refs.codeTransfer.value)
        // })
    }
    _handleInput(e) {
        // this.setState({ codeTransfer: e.target.value })
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
    _accept(item, status) {
      console.log('status>>',status)
      let obj = {
        keyMap: item.keyMap,
        StatusValue: status
      };
      this.props.validateTransfer(obj).then(res => {
        const { data } = res.data;
        if (data && data[0]) {
          const result = data[0].OUTPUT;
          if (result == "ok") {
            if (item.Status == STATUS_TRANS_02) {
                this.child._addNotification(`Phiếu này đã được xác nhận`, 'warning')
            } else if (item.Status == STATUS_TRANS_04) {
                this.child._addNotification(`Phiếu này đã hoàn thành`, 'warning')
            } else {
                var r = confirm(`Bạn cón muốn xác nhận phiếu này ?`);
                if (r == true) {
                    this.props.accept(item.keyMap).then(res => {
                        this.child._addNotification(`Cập nhật thành công.`, 'success')
                        this.props.getListDataTransfer()
                    })

                }
            }
          } else {
            this.child._addNotification(result, "warning");
          }
        }
      })

    }
    _finish(item, status) {
      let obj = {
        keyMap: item.keyMap,
        StatusValue: status
      };
      this.props.validateTransfer(obj).then(res => {
        const { data } = res.data;
        if (data && data[0]) {
          const result = data[0].OUTPUT;
          if (result == "ok") {
            if (item.Status == STATUS_TRANS_04) {
                this.child._addNotification(`Phiếu này đã hoàn thành!`, 'warning')
            } else if (!item.Status) {
                this.child._addNotification(`Vui lòng xác nhận trước!`, 'warning')
            } else {
                var r = confirm(`Bạn cón muốn hoàn thành phiếu này ?`);
                if (r == true) {
                    this.props.finish(item.keyMap).then(res => {
                        this.child._addNotification(`Cập nhật thành công.`, 'success')
                        this.props.getListDataTransfer()
                    })
                }
            }
          } else {
            this.child._addNotification(result, "warning");
          }
        }
      })

    }
    _onNext(obj) {
        // this.props.getListDataCdTurn(obj.params)
    }
    _onPrevious(obj) {
        // this.props.getListDataCdTurn(obj.params)
    }
    _onChangePage(obj) {
        // this.props.getListDataCdTurn(this.refs.codeTransfer && this.refs.codeTransfer.value)
    }
    onClickButtonPermission(obj) {
        let { data, nameBtn } = obj
        let { item, checked, typePrint, status, codeCustom } = data
        switch (nameBtn) {
            case "PRINT":
              this.props.printDetail(item);
              break;
            case 'EDIT':
                this._EditCasting(item)
                this.props.updateButtonToolbar('EDIT')
                this.props.clickCheckRowData(item, checked)
                this.props.getListGoldDetail(item.keyMap)
                break;
            case 'DETAIL':
                this._EditCasting(item)
                this.props.clickCheckRowData(item, checked)
                this.props.getListGoldDetail(item.keyMap)
                break;
            case 'ACCEPT_ORDER':
                this._accept(item, STATUS_TRANS_02)
                break;
            case 'COMPlETED_OUTPUT':
                this._finish(item, STATUS_TRANS_04)
                break;
            default:
                break
        }
    }
    changeSortTable(item) {
        // this.props.sortDataListTurnInOut(item)
    }
    onChangeFilterTable(obj) {
        // this.props.onChangeFilterListTurnInOut(obj)
    }
    render() {
        let { list_data, listHeaderTable, objConfig } = this.props.transfer
        let { IsIncludeInOut } = objConfig
        let type = Helper.getParam(window.location.href, 'type');
        if(type==0){
          list_data=list_data.filter(x=>x.TransType!=='TF_TYPE_03')
        }else {
          list_data=list_data.filter(x=>x.TransType==='TF_TYPE_03')
        }
        return (
            <div >
                <AlertCustom onRef={ref => (this.child = ref)} />
                <div className="form__personnal">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="form-group ">
                                <div className="left">
                                    <label htmlFor="name">Mã phiếu</label>
                                </div>
                                <div className="right">
                                    <input className="name form-control"
                                        value={this.state.codeTransfer}
                                        onChange={(e) => this._handleInput(e)}
                                        type="text"
                                        ref="codeTransfer"
                                        id="codeTransfer"
                                        name="codeTransfer" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="form-group">
                                <div className="left"
                                // onClick={() => this._onSearch()}
                                >
                                    <button className="btn btn-primary">Tìm kiếm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <CustomTable idTable='tableListTransfer'
                    idBody='bodyListTransfer'
                    list_col={listHeaderTable} list_data={list_data} parentObject={this} />
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
    transfer,
    header,
    toolbar
}, ownProps) => {
    return {
        userAuth,
        i18n,
        list,
        common,
        ownProps,
        transfer,
        header,
        toolbar
    }
}

const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...transfer_Actions,
        ...listActions,
        ...headerActions,
        ...toolbarActions,
        ...commonActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListFormView)
