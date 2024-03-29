import * as userActions from 'modules/login/actions/form'
import * as toolbarActions from 'modules/toolbar/actions/form'
import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import * as productsActions from 'modules/products/actions/form'
import * as bagActions from 'modules/bag/actions/form'
import * as commonActions from 'modules/common/actions/form'

import BagDetailStone from './BagDetailStone'
import ListOrder from './ListOrder'
import Modal from 'react-modal';
const { Translate, I18n } = ReactReduxI18n;
const customStyles = {
    content: {
        width: '75%',
        top: '50%',
        left: '50%',
        right: 'auto',        
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};
Modal.setAppElement('#yourAppElement')
class TabListBagStone extends React.Component {
    constructor() {
        super()
        this.state = {
            codeBag: '',
            name: '',
            status: false,
            id: 0
        }
    }
    componentWillUnmount() {
        this.props.resetInfoPage()
    }
    _onClickRow(item, checked) {
        this.props.clickCheckRowProducts(item, checked)
        // this.props.updateButtonToolbar('EDIT')
    }
    _onClickRowDouble(item, checked) {
        let { Id, Name, IdType, IdUnit, Decription, Numb, Weight } = item
        this.props.clickCheckRowProducts(item, checked)
        this.props.isEdit(true)
        // this.props.updateButtonToolbar('EDIT')
    }
    componentDidMount() {
        let { page, total } = this.props.common
        let params = {
            page: page,
            total: total
        }
        this.props.getListDataBag(params)
        KeyboardJS.bind('enter', (event) => {
            if ($('#codeBag').is(':focus')) {
                this._onSearch()
            }
        })
    }
    _onSearch() {
        //  this.props.getListDataBagBySearch(this.refs.codeBag && this.refs.codeBag.value || '')
    }
    _handleInput(e) {
        this.setState({ codeBag: e.target.value })
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
        let { page, total } = this.props.products
        let params = {
            page: parseInt(value.target.text),
            total: total
        }
        this.props.getListDataBag(params)
    }
    _onClickRow(item, checked) {
        this.props.clickCheckRowBag(item, checked)
    }
    _onViewDetail(item, checked) {
        let { listItemCheckBag } = this.props.bag
        if (listItemCheckBag.length > 1) {
            alert('Vui lòng chọn 1 dòng để xem!')
            return
        }
        this.props.clickCheckRowProducts(item, checked)
        setTimeout(() => {
            let { itemDetail } = this.props.bag
            if (itemDetail.Id) {
                this.props.getListDetailByBag(itemDetail.Id)
                this.props.showModal(true)
            }
        }, 100)
    }
    __printReport(_printReport) {

    }
    closeModal() {
        this.props.showModal(false)
        this.props.resetDataBag()
        let { page, total } = this.props.bag
        let params = {
            page: page,
            total: total
        }
        this.props.getListDataBag(params)
    }
    _onPrint() {
        this.props.printBagDetail()
    }

    _onViewPrint(item) {
        let { itemDetailCreateBag, isSaveBag } = this.props.bag
        if (itemDetailCreateBag.Id) {
            let pr = '?idbag=' + itemDetailCreateBag.Id
            window.open(Routes.bagDetail.view + pr, 'header', "width=1248,height=700", true)
        }

    }
    _onViewPrintDetail() {
        let { listItemCheckBag } = this.props.bag
        if (listItemCheckBag.length == 0) {
            alert('Vui lòng chọn dòng cần in!')
            return
        }
        let listId = ''
        listItemCheckBag.map((item) => {
            listId = listId + item.Id + ','
        })
        let pr = '?idbag=' + listId
        window.open(Routes.bagDetail.view + pr, 'header', "width=1248,height=700", true)

    }
    saveBag() {
        this.props.saveStoneList().then(res => {
            this.child._addNotification(I18n.t(`alert.updatesuccess`), 'success')
        })
    }
    _onNext(obj) {
        this.props.getListDataBag(obj.params)
    }
    _onPrevious(obj) {
        this.props.getListDataBag(obj.params)
    }
    _onChangePage(obj) {
        this.props.getListDataBag(obj.params)
    }
    render() {
        let { list_data, allChecked, listHeaderTable, page } = this.props.products
        let { listHeaderBag, ListBag, isShow } = this.props.bag
        return (
            <div>
                <AlertCustom onRef={ref => (this.child = ref)} />

                <Modal
                    isOpen={isShow}
                    onRequestClose={() => this.closeModal()}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <BagDetailStone />
                    <hr />
                    <div style={{ "textAlign": "right" }}>
                        <button onClick={() => this._onViewPrint()} >In bag</button>
                        <button onClick={() => this.saveBag()}>Lưu</button>
                        <button onClick={() => this.closeModal()}>Đóng</button>
                    </div>
                </Modal>
                <div className="form__personnal">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="form-group ">
                                <div className="left">
                                    <label htmlFor="name">Mã bag / đơn hàng/ sản phẩm</label>
                                </div>
                                <div className="right">
                                    <input className="name form-control"
                                        value={this.state.codeBag}
                                        onChange={(e) => this._handleInput(e)}
                                        type="text"
                                        ref="codeBag"
                                        id="codeBag"
                                        name="codeBag" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <div className="left" onClick={() => this._onSearch()}>
                                    <button className="btn btn-primary">Tìm kiếm</button>
                                    <button style={{ "marginLeft": "10px" }} className="btn btn-primary" onClick={() => this._onPrint()}>In</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {
                                listHeaderBag.map((item, i) => {
                                    let { key, title } = item
                                    return (
                                        <th style={{ "textAlign": "left" }} key={`thead_${key}`} scope="col">{title}</th>
                                    )
                                })

                            }
                        </tr>
                    </thead>
                    <tbody>
                        {ListBag.length > 0 && ListBag.map((item, i) => {
                            let { Id, IdOrder, IdProduct, QtyBag, checked, StatusName, StatusPrintName } = item
                            return (
                                <tr key={`data_${Id}`} >
                                    <th scope="row">
                                        <label>
                                            <input type="checkbox" checked={checked} onChange={() => this._onClickRow(item, !checked)} />
                                        </label>
                                    </th>
                                    <td>{Id}</td>
                                    <td>{IdOrder}</td>
                                    <td><LinkProduct id={IdProduct} /></td>
                                    <td>{QtyBag}</td>
                                    <td onClick={() => this._onViewDetail(item, !checked)}><button><i className="fa fa-info-circle" aria-hidden="true"></i></button></td>
                                    <td onClick={() => this._onViewPrintDetail(item)}><button><i className="fa fa-print" aria-hidden="true"></i></button></td>
                                    <td>{StatusName}</td>
                                    <td>{StatusPrintName}</td>
                                </tr>)
                        })}
                    </tbody>
                </table>
                <PagingTable type="bag" parentObject={this} />

            </div>

        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    products,
    header,
    bag,
    common
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        products,
        header,
        bag,
        common
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...userActions,
        ...productsActions,
        ...toolbarActions,
        ...bagActions,
        ...commonActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TabListBagStone)
