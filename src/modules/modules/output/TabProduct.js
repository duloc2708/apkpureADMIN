import * as outputActions from 'modules/output/actions/form'
import * as bagActions from 'modules/bag/actions/form'

import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import ComboboxProducts from './ComboboxProducts'

import ReactTooltip from 'react-tooltip'
const { Translate, I18n } = ReactReduxI18n;
class TabProduct extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        this._loadData()
    }
    _loadData() {
        var currentURL = document.URL;
        var url = new URL(currentURL);
        var codeURL = url.searchParams.get("code");
        var that = this
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
    _onView(item) {
        let { objDataOutput } = this.props.output
        let { IdProduct, Color } = item
        this.props.getListBag(objDataOutput.IdOrder, IdProduct, Color)

    }
    _onKeyPressCheckProduct(e, IdProduct, index) {
        if (e.key == 'Enter') {
            let { ListProductByOrderOutputDefault, ListProductByOrderOutput } = this.props.output
            let list_products_temp = _.clone(ListProductByOrderOutputDefault, true)
            let listProductFind = list_products_temp.filter(x => x.IdProductParent.toUpperCase() === IdProduct.toUpperCase())
            if (listProductFind.length == 0) {
                alert('Sản phẩm không tồn tại!.')
            } else {

                let IdGroupNew = Helper.generateUUIDV4()
                let IdProductParentColor_temp = ''
                let listProductFind_temp = []
                listProductFind.map((item) => {
                    let item_temp = _.clone(item, true)
                    if (IdProductParentColor_temp == '') {
                        item_temp.IdGroup = IdGroupNew
                        IdProductParentColor_temp = item_temp.IdProductParentColor
                    } else {
                        if (item_temp.IdProductParentColor != IdProductParentColor_temp) {
                            let IdGroupNewTemp = Helper.generateUUIDV4()
                            IdGroupNew = IdGroupNewTemp
                            item_temp.IdGroup = IdGroupNewTemp
                        } else {
                            item_temp.IdGroup = IdGroupNew
                        }
                        IdProductParentColor_temp = item.IdProductParentColor

                    }
                    listProductFind_temp.push(item_temp)
                })
                this.props.updateExistProduct(listProductFind_temp)

                setTimeout(() => {
                    $('#tbodyProduct > tbody  > tr').each(function (i, item) {
                        let all_rows = $('#tbodyProduct >tbody >tr').length;
                        if (i == all_rows - 1) {
                            $(item).find('input, textarea')[1].focus()
                        }
                    });
                }, 200)
            }
        }
    }
    _onKeyPressWeightCustom(e, weight, index) {
        if (e.key == 'Enter') {
            if (1 == 1) {
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
        }
    }

    _onChangeProduct(e) {
        let { id, value } = e.target
        let obj = {
            id: id, value: value, key: "IdProductParent"
        }
        this.props.updateCellProducts(obj)
    }
    onKeyPressInput(obj) {
        let { typeInput, index, id, tabIndex } = obj
        if (typeInput == 'WeightCustom') {
            if (1 == 1) {
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
        } else {
            $(`#${id + '_' + (tabIndex + 1)}`).focus();
        }
    }
    _onAddProductonRow(IdGroup) {
        let { status } = this.props.toolbar
        // if (status == 'EDIT') {
        //     alert('Đơn hàng đã tồn tại!')
        //     return
        // }

        const { ListProductByOrderOutput } = this.props.output
        let list_products_temp = _.clone(ListProductByOrderOutput, true)
        let listProductFind = list_products_temp.filter(x => x.IdGroup == IdGroup)

        let IdGroupNew = Helper.generateUUIDV4()
        let IdProductParentColor_temp = ''
        let listProductFind_temp = []
        let IdGroupNewTemp = Helper.generateUUIDV4()
        listProductFind.map((item) => {
            let item_temp = _.clone(item, true)
            let strId = item_temp.IdGroupStt, IdGroupSttNew = ''
            let listId = strId.split("_")
            item_temp.IdGroup = IdGroupNewTemp
            IdGroupSttNew = listId[0] + '_' + (parseInt(listId[1]) + 1) + '_' + listId[2]
            item_temp.IdGroupStt = IdGroupSttNew
            item_temp.NumberTemp = ''
            item_temp.Weight = ''
            item_temp.WeightProduct = ''
            item_temp.WeightCustom = ''
            item_temp.remark = ''
            listProductFind_temp.push(item_temp)
        })        
        this.props.updateExistProduct(listProductFind_temp)


        // let { objDataOrder, listProductsSelected, isEditProducts } = this.props.order

        // this.props.addProductonRow()
        // setTimeout(() => {
        //     $('#tbodyProduct > tbody  > tr').each(function (i, item) {
        //         let all_rows = $('#tbodyProduct >tbody >tr').length;
        //         if (i == all_rows - 1) {
        //             $(item).find('input, textarea')[0].focus()
        //         }
        //     });
        // }, 200)
    }
    handleClick() {

    }
    render() {
        let { list_data, allChecked, listHeaderTabProduct } = this.props.stone
        let { list_products, listProductsSelected } = this.props.output
        let { listHeaderTableProductsByCombobox } = this.props.products
        let { list_order_combobox } = this.props.bag
        let { ListProductByOrderOutput, listHeaderProducts, list_bag } = this.props.output
        let { status } = this.props.toolbar
        if (status != 'ADD') {
            listHeaderProducts = listHeaderProducts.filter(x => x.key != 'SLREMAIN')
        }
        // table{
        //     height: 86px; 
        //     display: inline-block;
        //     overflow-y: scroll;
        //   }
        let ListProductByOrderOutputSort = _.orderBy(ListProductByOrderOutput, ['IdGroupStt'], ['asc'])
        return (
            <table
                id="tbodyProduct"
                style={{
                    "height": `${this.props.heightList}`,
                    "display": "inline-block",
                    "overflowY": "scroll",

                }}
                className="table table-striped">
                <thead>
                    <tr>
                        {
                            listHeaderProducts.map((item, i) => {
                                let { key, title } = item
                                return (
                                    <th style={{ "textAlign": "left" }} key={`thead_${key}`} scope="col">{title}</th>
                                )
                            })

                        }
                    </tr>
                </thead>
                <tbody >
                    {ListProductByOrderOutputSort && ListProductByOrderOutputSort.map((item, i) => {
                        let { IdOrder, IdProduct, IdProductParent, Color, Number, NumberTemp, stt, ProductsEachOutput,
                            Weight, WeightAvgProduct, WeightAvg, WeightProduct, WeightCustom, IdOdd, sttOther, index, IdGroup, isExists, remark, IdGroupStt,url_image } = item
                               // set url image
                        let filename = url_image ? Config.API_URL_IMAGE + url_image : "images/image-not-found.jpg"

                        return (
                            <tr id={`tr_c${sttOther}`} key={`data_${IdOrder}_${i}`} >
                                {/* <td>
                                    {
                                        IdOdd == 0 ? '' : <LinkProduct id={IdProductParent} />c
                                    }
                                </td> */}
                                <td><button onClick={() => this._onAddProductonRow(IdGroup)}><i className="fa fa-plus" aria-hidden="true"></i></button></td>
                                <td>
                                        <div style={{ "border": "1px solid black", "display": "inline-block", "padding": "2px 2px" }}>
                                            <img src={filename} width="90px" height="85px" parentObject={this} />
                                        </div>
                                </td>
                                <td>
                                    <input
                                        onKeyDown={(e) => this._onKeyPressCheckProduct(e, IdProductParent, index)}
                                        readOnly={status == 'EDIT' ? IdProductParent ? true : false : false}
                                        id={sttOther}
                                        style={{ "width": `95px` }}
                                        className={`name form-control`}
                                        type='text'
                                        value={IdProductParent}
                                        onChange={e => this._onChangeProduct(e)}
                                        name="IdProductParent" />
                                </td>
                                
                                <td>{IdProduct}</td>
                                <td>
                                    <Combobox width="42px" disable={true} type_code='DSM' keyInput="color" id={IdProduct} value={Color} parentObject={this} />
                                </td>
                                <Cell readOnly={status == 'EDIT' ? false : isExists ? false : true} IdGroup={IdGroup} type="" width="53px" tabIndex={1} idInput={sttOther + '_1'} id={sttOther} value={NumberTemp || ''} keyInput="NumberTemp" parentObject={this} />
                                <Cell readOnly={status == 'EDIT' ? false : isExists ? false : true} type="text" width="72px" tabIndex={2} idInput={sttOther + '_2'} id={sttOther} value={Weight || ''} keyInput="Weight" parentObject={this} />
                                <Cell readOnly={status == 'EDIT' ? false : isExists ? false : true} type="text" width="76px" tabIndex={3} idInput={sttOther + '_3'} id={sttOther} value={WeightProduct || ''} keyInput="WeightProduct" parentObject={this} />
                                <Cell readOnly={status == 'EDIT' ? false : isExists ? false : true} type="text" width="76px" tabIndex={4} idInput={sttOther + '_4'} id={sttOther} value={WeightCustom || ''} keyInput="WeightCustom" parentObject={this} />
                                <td>
                                    <Cell
                                        width="90px"
                                        id={sttOther} value={remark || ''} className={`name form-control`}
                                        keyInput="remark" parentObject={this} name="remark" />
                                </td>
                                <td width="72px">{Helper.round(Weight / (0.0375 * NumberTemp) || 0, 1)}</td>
                                <td width="72px">{Helper.round(((WeightProduct - Weight) / 0.0375) / NumberTemp || 0, 1)}</td>
                                <td width="72px">{Helper.round((WeightProduct - Weight) / 0.0375 || 0, 1)}</td>
                                <td width="72px">{Helper.round(WeightProduct / 0.0375 || 0, 1)}</td>
                                {status == 'ADD' ? <td>{Number - (ProductsEachOutput || 0)}</td> : ''}
                                <td>{Number || ''}</td>
                                <td data-tip="hello world" className="button" >
                                    <div onMouseEnter={() => this._onView(item)} >
                                        <i className="fa fa-list-ol" aria-hidden="true" data-tip data-for='global'></i>
                                        <ReactTooltip id='global' aria-haspopup='true' role='example'>
                                            <p>Danh sách bag</p>
                                            <table >
                                                <thead>
                                                    <tr>
                                                        <th style={{ "color": "#fff" }} key={`thead_${0}`} scope="col">{'Mã bag'}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {list_bag.length > 0 && list_bag.map((item, i) => {
                                                        let { IdBag } = item
                                                        return (
                                                            <tr style={{ "color": "#fff" }} key={`dataDetail_${i}`}>
                                                                <td style={{ "textAlign": "center" }}>{IdBag || ''}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </ReactTooltip>
                                    </div>
                                </td>
                                <td onClick={() => this._onRemove(item)}><button><i className="fa fa-trash-o" aria-hidden="true"></i></button></td>

                            </tr>)
                    })}
                </tbody>
            </table>
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
        output, toolbar
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...outputActions,
        ...bagActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(TabProduct)
