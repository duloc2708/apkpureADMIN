import * as outputActions from 'modules/output/actions/form'
import * as bagActions from 'modules/bag/actions/form'

import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import ComboboxProducts from './ComboboxProducts'

import ReactTooltip from 'react-tooltip'
import TabProduct from './TabProduct'

const { Translate, I18n } = ReactReduxI18n;
import Modal from 'react-modal';

class ListOrder extends React.Component {
    constructor() {
        super()
        this.state = {
            code: '',
            name: '',
            status: false,
            id: 0
        }
    }
    _onClickRow(IdOrder, checked) {
        if (checked) {
            this.props.clickCheckRowOrderInOutPut(IdOrder, checked)
            setTimeout(() => {
                $('#tbodyProduct > tbody  > tr').each(function (i, item) {
                    let all_rows = $('#tbodyProduct >tbody >tr').length;
                    if (i == all_rows - 1) {
                        $(item).find('input, textarea')[0].focus()
                    }
                });
            }, 300)
        }
    }
    componentDidMount() {
        this._loadData()
        KeyboardJS.bind('enter', (event) => {
            if ($('#code_in_output').is(':focus')) {
                this._onSearch()
            }
        })
    }
    _onSearch() {
        this.props.getListDataOrderInOutPutBySearch(this.refs.code_in_output.value)
    }
    _handleInput(e) {
        this.setState({ code: e.target.value })
    }
    _loadData() {
        this.props.getListDataOrderInOutPut()
    }

    _handleInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }
    _changeStatus(status) {
        this.setState({ status: !status });
    }
    _myFunction() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    ChangeValueCell(value) {
        this.props.updateCellProductsByOutput(value)
    }
    _onRemove(item) {
        var r = confirm(I18n.t(`alert.delete`));
        if (r == true) {
            this.props.removeItemProductsInOutput(item)
        }

    }
    ChangeValueCombobox(obj) {
        this.props.updateCellProductsByOutput(obj)
    }
    _onView() {

        // $(".dropdown2").show(500)

    }
    closeModal() {
        this.props.closeModalProduct(false)
    }
    _onRowDetail() {
        this.props.closeModalProduct(true)
    }
    _onButtonAddProduct() {
        // let { objDataOrder, listProductsSelected, isEditProducts } = this.props.order
        // let { status } = this.props.toolbar
        // if (status == 'EDIT') {
        //     alert('Đơn hàng đã tồn tại!')
        //     return
        // }
        this.props.addProduct()
        setTimeout(() => {
            $('#tbodyProduct > tbody  > tr').each(function (i, item) {
                let all_rows = $('#tbodyProduct >tbody >tr').length;
                if (i == all_rows - 1) {
                    $(item).find('input, textarea')[0].focus()
                }
            });
        }, 200)
    }
    _acceptOrder(IdOrder, checked) {
        if (checked) {
            alert('Đơn hàng này đang xử lý, vui lòng cập nhật đơn hàng khác!')
        } else {
            var r = confirm('Bạn muốn hoàn thành đơn hàng này!');
            if (r == true) {
                this.props.acceptOrderCompleted(IdOrder, 'STATUS_ORDER_04')
            }
        }

    }
    render() {
        let { list_data, allChecked, listHeaderTabProduct } = this.props.stone
        let { list_products, listProductsSelected, list_order_in_output, isShowProduct } = this.props.output
        let { listHeaderTableProductsByCombobox } = this.props.products
        let { list_order_combobox } = this.props.bag
        let { listHeaderTableOrderOutPut, height, ListProductByOrderOutput } = this.props.output
        let heightList = (ListProductByOrderOutput.length + 1) > 6 ? "600px" : (height * (ListProductByOrderOutput.length + 1)) + "px"
        let customStyles = {
            content: {
                height: heightList,
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
            }
        };
        return (
            <div className="col-md-12">
                {/* <Modal
                    isOpen={isShowProduct}
                    onRequestClose={() => this.closeModal()}
                    style={customStyles}
                    contentLabel="Example Modal">
                    <div>
                        <TabProduct heightProduct={heightList} key={'order'} />
                    </div>
                    <div className="modal-footer">
                        <div style={{ "textAlign": "right" }}>
                            <button onClick={() => this.closeModal()}>Đóng</button>
                        </div>
                    </div>

                </Modal> */}
                <div className="left">
                    <label htmlFor="name">Tìm đơn hàng theo mã/ngày/loại</label>
                </div>
                <div className="form-group">
                    <div style={{ width: "100%" }}>

                        <div className="form-group ">
                            <div className="left">
                                <input style={{ width: "100%" }} className="name form-control"

                                    type="text"
                                    ref="code_in_output"
                                    id="code_in_output"
                                    name="code_in_output" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                            <div onClick={() => this._onSearch()} style={{ "paddingLeft": "10px" }} className="right">
                                <button className="btn btn-primary">Tìm kiếm</button>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            {
                                                listHeaderTableOrderOutPut.map((item, i) => {
                                                    let { key, title } = item
                                                    return (
                                                        <th style={{ "textAlign": "left" }} key={`thead_${key}`} scope="col">{title}</th>
                                                    )
                                                })

                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list_order_in_output && list_order_in_output.map((item, i) => {
                                            let { IdOrder, IdCustomer, DayMake, checked, TypeOrder,
                                                StatusOrderName, StatusOrderBagName, StatusOrderTransferName, ProductsEachBag } = item
                                            return (
                                                <tr key={`data_${IdOrder}`} >
                                                    <th scope="row">
                                                        <label>
                                                            <input type="checkbox" checked={checked} onChange={() => this._onClickRow(IdOrder, !checked)} />
                                                        </label>
                                                    </th>
                                                    <td>{IdOrder}</td>
                                                    <td>{IdCustomer}</td>
                                                    <td>{moment(DayMake).format('DD/MM/YYYY HH:mm:ss')}</td>
                                                    <td>{TypeOrder}</td>
                                                    <td><button onClick={() => this._onRowDetail()}><i className="fa fa-info-circle" aria-hidden="true"></i></button></td>
                                                    <td><button onClick={() => this._acceptOrder(IdOrder, checked)}><i className="fa fa-check" aria-hidden="true"></i></button></td>
                                                </tr>)
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            {/* <div className="col-md-7">
                                <TabProduct key={'order'} />

                            </div> */}
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <button onClick={() => this._onButtonAddProduct()}>Thêm sản phẩm</button>
                                <TabProduct heightProduct={heightList} key={'order'} />
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
    stone,
    header,
    products,
    order,
    bag,
    output,
    toolbar
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        stone,
        header,
        products,
        order,
        bag,
        output,
        toolbar
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...outputActions,
        ...bagActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListOrder)
