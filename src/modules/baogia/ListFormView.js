import * as userActions from 'modules/login/actions/form'
import * as toolbarActions from 'modules/toolbar/actions/form'
import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import * as baogiaActions from 'modules/baogia/actions/form'
import * as orderActions from 'modules/order/actions/form'
import * as commonActions from 'modules/common/actions/form'

import DetailFormView from './DetailFormView'

const { Translate, I18n } = ReactReduxI18n;
class ListProductFormView extends React.Component {
    constructor() {
        super()
        this.state = {
            code: '',
            name: '',
            status: false,
            id: 0,
            inputSearch: ''
        }
    }
    _onClickRow(item, checked) {
        this.props.clickCheckRowBaoGia(item, checked)
    }
    _onClickRowDouble(item, checked) {
        this.props.clickCheckRowBaoGia(item, checked)
        this.props.isEditBaoGia(true)
    }
    _onRowEdit(item, checked) {
        this.props.isEditBaoGia(true)
        this.props.updateButtonToolbar('EDIT')
        this.props.clickCheckRowBaoGia(item, checked)
    }
    _onRowDetail(item, checked) {
        this.props.clickCheckRowBaoGia(item, checked)
        this.props.isEditBaoGia(true)
    }
    componentDidMount() {
        let { page, total } = this.props.common
        let params = {
            page: page,
            total: total
        }
        this.props.getListDataBaoGia(params)
        KeyboardJS.bind('enter', (event) => {
            if ($('#code_baogia').is(':focus')) {
                this._onSearch()
            }
        })
    }
    _onSearch() {
        if (this.refs.code_baogia) {
            this.props.getListDataBySearch(this.refs.code_baogia.value)
        }
    }
    _handleInput(e) {
        this.setState({ code: e.target.value })
        this.props.parentObject.ChangeInput(e.target.value);
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
    _onChangePage(value) {
        this.props.ChangePage(parseInt(value.target.text))
        let { page, total } = this.props.order
        let params = {
            page: parseInt(value.target.text),
            total: total
        }
        this.props.getListDataBaoGia(params)
    }
    _onPrint(item) {
        this.props.printBaoGiaDetail(item)
    }
    _onNext(obj) {
        this.props.getListDataOrder(obj.params)
    }
    _onPrevious(obj) {
        this.props.getListDataOrder(obj.params)
    }
    _onChangePage(obj) {
        this.props.getListDataOrder(obj.params)
    }
    _roundIt(num, precision) {
        var rounder = Math.pow(10, precision);
        return (Math.round(num * rounder) / rounder).toFixed(precision)
    }
    render() {
        let { list_data, allChecked, listHeaderTable, list_pricetype } = this.props.baogia
        let { page } = this.props.common
        return (
            <div>
                <div className="form__personnal">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="form-group ">
                                <div className="left">
                                    <label htmlFor="name">Mã/Tên bảng giá</label>
                                </div>
                                <div className="right">
                                    <input className="name form-control"
                                        value={this.state.code}
                                        onChange={(e) => this._handleInput(e)}
                                        type="text"
                                        ref="code_baogia"
                                        id="code_baogia"
                                        name="code_baogia" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="form-group">
                                <div className="left" onClick={() => this._onSearch()}>
                                    <button className="btn btn-primary">Tìm kiếm</button>
                                    {/* <button style={{ "marginLeft": "10px" }} className="btn btn-primary" onClick={() => this._onPrint('type1')}>In mẫu 1</button>
                                    <button style={{ "marginLeft": "10px" }} className="btn btn-primary" onClick={() => this._onPrint('type2')}>In mẫu 2</button> */}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">
                                <label>
                                    <input type="checkbox" Checked={allChecked}
                                    //onChange={() => this._checkAllRow(allChecked)}
                                    />
                                </label>
                            </th>
                            {
                                listHeaderTable.map((item, i) => {
                                    let { key, title } = item
                                    return (
                                        <th style={{ "textAlign": "left" }} key={`thead_${key}`} scope="col">{title}</th>
                                    )
                                })

                            }
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <th></th>
                            {
                                listHeaderTable.map((item, i) => {
                                    let { key, type } = item
                                    return (
                                        <td key={`thead_${key}`}>
                                            <input className="name form-control" type={type} id={key} name="name" required="" />
                                        </td>
                                    )
                                })
                            }
                        </tr> */}
                        {list_data && list_data.map((item, i) => {
                            let {
                                Pricecode
                                , Pricename
                                , PriceType
                                , Ratio
                                , Updatedate
                                , IsDisable
                                , Remark
                                , checked
                            } = item
                            PriceType = list_pricetype.filter(x => x.value == PriceType)
                            return (
                                <tr key={`data_${Pricecode}_${i}`} onDoubleClick={() => this._onClickRowDouble(item, !checked)}>
                                    <th scope="row">
                                        <label>
                                            <input type="checkbox" checked={checked} onChange={() => this._onClickRow(item, !checked)} />
                                        </label>
                                    </th>
                                    <td>{Pricecode}</td>
                                    <td>{Pricename}</td>
                                    <td>{PriceType && PriceType[0] && PriceType[0].text}</td>
                                    <td>{Ratio}%</td>
                                    <td>{moment.utc(Updatedate).format('DD/MM/YYYY HH:mm:ss')}</td>
                                    <td><button onClick={() => this._onRowEdit(item, !checked)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button></td>
                                    <td onClick={() => this._onPrint(item)}><button><i className="fa fa-print" aria-hidden="true"></i></button></td>

                                </tr>)
                        })}
                    </tbody>
                </table>
                <PagingTable type="product" parentObject={this} />
            </div>

        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    order,
    header,
    baogia,
    common
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        order,
        header,
        baogia,
        common
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...userActions,
        ...baogiaActions,
        ...toolbarActions,
        ...commonActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListProductFormView)