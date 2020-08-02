import * as bagActions from 'modules/bag/actions/form'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import ComboboxByTable from '../common/ComboboxByTable'

import ListStoneSplit from './ListStoneSplit'
import ComboboxChildrenProduct from './ComboboxChildrenProduct'
const { Translate, I18n } = ReactReduxI18n;

class FormSplitStone extends React.Component {
    constructor() {
        super()
    }
    componentDidMount() {
        $(".allownumericwithdecimal").on("keypress keyup blur", function (event) {
            //this.value = this.value.replace(/[^0-9\.]/g,'');
            $(this).val($(this).val().replace(/[^0-9\.]/g, ''));
            if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        });
        let { listItemCreateBag } = this.props.bag
        $(`#${listItemCreateBag[0].IdOrderProduct || 0}`).focus()
    }
    handleChange(date, IdOrderProduct, type) {
        let objData = {}
        objData.key = type
        objData.id = IdOrderProduct
        objData.value = date.format('YYYY-MM-DD HH:mm:ss')
        this.props.updateCellBag(objData)
    }
    ChangeValueCell(value) {

        this.props.updateCellBag(value)
    }
    _updateStone(item) {
        this.props.clickRowDataCreateBag(item)
        this.forceUpdate()
    }
    _removeProducts(item) {
        this.props.removeProductsInListBag(item)
    }

    ChangeValueComboboxIdProductChildren(obj) {
        this.props.updateIdChildrenProduct(obj)
    }
    ChangeValueComboboxByTable(value) {
        this.props.updateCellBag(value)
    }
    changeRemark(e, IdOrderProduct) {
        let objData = {}
        objData.id = IdOrderProduct
        objData.key = "Remark"
        objData.value = e.target.value
        this.props.updateCellBag(objData)
    }

    _onSplitStone() {
        let value = this.refs.qtySplit.value || 0, total = 0
        let { itemStoneSplit, list_stone_save_split, itemDetailCreateBag } = this.props.bag
        let { TypeSplitStone } = itemDetailCreateBag
        if (itemStoneSplit.Color == '001') {
            this.child._addNotification('Vui lòng chọn màu đá!', 'warning')
            return
        } else {
            let checkSame = list_stone_save_split.filter(x =>
                x.Color == itemStoneSplit.Color && x.IdProductColorParentColorStone == itemStoneSplit.IdProductColorParentColorStone)
            if (checkSame.length > 0) {
                this.child._addNotification('Màu đã tồn tại!', 'warning')
                return
            }
        }

        if (value > 0) {
            // tách theo pcs
            if (TypeSplitStone == 'TYPE_SPLIT_STONE_1') {
                let { listItemCreateBag } = this.props.bag
                const sumsTotalQty = [
                    ...listItemCreateBag.reduce(
                        (map, item) => {
                            const { IdChildrenProduct: key, Value } = item;
                            const prev = map.get(key);

                            if (prev) {
                                prev.Value = parseInt(prev.Value) + parseInt(Value)
                            } else {
                                map.set(key, Object.assign({}, item))
                            }

                            return map
                        },
                        new Map()
                    ).values()
                ]
                let valueTotal = parseInt(value) * parseInt(sumsTotalQty[0].Value)
                if (valueTotal > parseInt(itemStoneSplit.sl2)) {
                    this.child._addNotification('Số lượng đá đã hết!', 'warning')
                } else {
                    this.props.SplitStone(valueTotal)

                    setTimeout(() => {
                        $(`#idTableListStoneSplit > tbody  > tr`).each(function (i, item) {
                            if (i == list_stone_save_split.length - 1) {
                                $(item).find('input, textarea')[0].focus()
                            }
                        });
                    }, 100)

                }
                // Tách theo pcs màu
            } else {

                let { listItemCreateBag, itemDetailCreateBag } = this.props.bag
                let valueTotal = parseInt(value) * parseInt(itemDetailCreateBag.Value)
                if (valueTotal > parseInt(itemStoneSplit.sl2)) {
                    this.child._addNotification('Số lượng đá đã hết!', 'warning')
                } else {
                    this.props.SplitStone(valueTotal)

                    setTimeout(() => {
                        $(`#idTableListStoneSplit > tbody  > tr`).each(function (i, item) {
                            if (i == list_stone_save_split.length - 1) {
                                $(item).find('input, textarea')[0].focus()
                            }
                        });
                    }, 100)
                }
            }
        } else {
            this.child._addNotification('Vui lòng nhập số lượng!', 'warning')
        }
    }

    ChangeValueCombobox(obj) {
        let { itemStoneSplit } = this.props.bag
        let itemStoneSplit_temp = _.clone(itemStoneSplit)
        itemStoneSplit_temp.Color = obj.value
        this.props.updateColorItemSplit(itemStoneSplit_temp)
    }
    render() {
        let { itemStoneSplit, itemDetailCreateBag } = this.props.bag
        let { Color, sl2, IdStone, remain } = itemStoneSplit
        let lbNumber = ''
        if (itemDetailCreateBag.TypeSplitStone == "TYPE_SPLIT_STONE_2") {
            lbNumber = 'Số lượng tách/pcs theo màu'
        } else {
            lbNumber = 'Số lượng tách/pcs'
        }
        return (
            <div className="form__personnal">
                <AlertCustom onRef={ref => (this.child = ref)} />
                <div className="row">
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Tổng đá</label>
                            </div>
                            <div className="right" >
                                <input readOnly={true} className="name form-control" value={remain || 0} type="text" id="IdOrder" name="name" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Còn lại</label>
                            </div>
                            <div className="right" >
                                <input readOnly={true} className="name form-control" value={sl2 || 0} type="text" id="IdOrder" name="name" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Mã đá</label>
                            </div>
                            <div className="right">
                                <input readOnly={true} className="name form-control" value={IdStone || ''} type="text" id="namecustomer" name="namecustomer" required="" /><span className="wpcf-not-valid-tip wpcf-display-none" ></span>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="row">

                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">{lbNumber}</label>
                            </div>
                            <div className="right">
                                <input autoFocus style={{ "height": "25px" }} ref="qtySplit" className="name form-control" type="text" id="namecustomer" name="namecustomer" required="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">Màu đá</label>
                            </div>
                            <div className="right">
                                <Combobox type_code='DSM' keyInput="Color" value={Color || '001'} id={'12'} parentObject={this} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className="left">
                                <label htmlFor="name">&nbsp;</label>
                            </div>
                            <div className="right">
                                <button onClick={() => this._onSplitStone()}>Tách</button>
                            </div>
                        </div>
                    </div>
                </div>
                <ListStoneSplit idTable="idTableListStoneSplit" />

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
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(FormSplitStone)