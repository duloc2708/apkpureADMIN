import * as userActions from 'modules/login/actions/form'
import * as toolbarActions from 'modules/toolbar/actions/form'
import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
import LoginFormView from 'modules/login/LoginFormView'
import ToolbarFormView from 'modules/toolbar/ToolbarFormView'
import BrackcrumFromView from 'modules/brackcrum/BrackcrumFromView'
import * as bagActions from 'modules/bag/actions/form'
import DetailFormView from './DetailFormView'
import FormSplitStone from './FormSplitStone'
const { Translate, I18n } = ReactReduxI18n;

class ListStoneSplit extends React.Component {
    constructor() {
        super()
        this.state = {
            code: '',
            name: '',
            status: false,
            id: 0,
            isShow: false
        }
    }

    _onClickRow(IdOrder, checked) {
        this.props.clickCheckRowOrderInBag(IdOrder, checked)
    }
    _onRowEdit(item, checked) {
        this.props.isEditOrder(true)
        this.props.updateButtonToolbar('EDIT')
        this.props.clickCheckRowOrder(item, checked)
    }
    _onRowDetail(item, checked) {
        this.props.clickCheckRowOrder(item, checked)
        this.props.isEditOrder(true)
    }
    componentDidMount() {
        let { page, total } = this.props.bag
        let params = {
            page: page,
            total: total
        }
        // this.props.getListDataOrderInBag(params).then(res => {
        //     let currentURL = document.URL;
        //     let url = new URL(currentURL);
        //     let IdOrder = url.searchParams.get("IdOrder");
        //     if (IdOrder)
        //         this.props.clickCheckRowOrderInBag(IdOrder, true)
        // })
    }

    ChangeValueCell(value) {
        this.props.updateCellStoneSplit(value)
    }

    ChangeValueCombobox(obj) {
        if (obj.key == 'TypeStone') {
            this.props.updateTypeStoneByStoneSplit(obj)
        } else {
            this.props.updateIdProductColor(obj)
        }

    }
    split() {
        //    this.props.showSplitStone(false)
    }
    _onRemove(item) {
        this.props.removeStoneSplit(item)
    }
    render() {
        let { idTable } = this.props
        let { list_stone_save_split, itemDetailCreateBag, itemStoneSplit } = this.props.bag
        let IdProduct_temp = itemDetailCreateBag.IdOdd == "1" ? itemDetailCreateBag.IdChildrenProduct : itemDetailCreateBag.IdProduct
        list_stone_save_split = list_stone_save_split.filter((item) => item.IdProductColorParentColorStone == itemStoneSplit.IdProductColorParentColorStone)
        return (
            <div>

                <table className="table table-striped" id={idTable}>
                    <thead>
                        <tr>
                            <th style={{ "textAlign": "left" }} key={`thead_${1}`} scope="col">{'Số lượng'}</th>
                            <th style={{ "textAlign": "left" }} key={`thead_${2}`} scope="col">{'Mã'}</th>
                            <th style={{ "textAlign": "left" }} key={`thead_${3}`} scope="col">{'Màu'}</th>
                            <th style={{ "textAlign": "left" }} key={`thead_${4}`} scope="col">{'Loại đá'}</th>
                            <th style={{ "textAlign": "left" }} key={`thead_${5}`} scope="col">{'Tổng trọng lượng'}</th>
                            <th style={{ "textAlign": "left" }} key={`thead_${6}`} scope="col">{'Quy đổi'}</th>
                            <th style={{ "textAlign": "left" }} key={`thead_${7}`} scope="col">{'Trọng lượng TB'}</th>
                            <th style={{ "textAlign": "left" }} key={`thead_${8}`} scope="col">{'Tách'}</th>

                        </tr>
                    </thead>
                    <tbody>
                        {list_stone_save_split.map((item, i) => {
                            let { IdStone, Color, value, Weight, PrimaryStone, IdProduct, IdProductColorStone, IdProductColorParentColorStone, ColorParent, IdProductParent, sl2, Exchange, SplitIdProductColorParentColorStone, TypeStone, AvgStone } = item
                            AvgStone = Weight / sl2
                            return (
                                <tr key={`dataDetail_${i}`}>
                                    <td style={{ "textAlign": "left", "fontWeight": PrimaryStone == 1 ? 'bold' : '' }}>
                                        {sl2 || ''}
                                    </td>
                                    <td style={{ "textAlign": "left", "fontWeight": PrimaryStone == 1 ? 'bold' : '' }}>
                                        {IdStone}
                                    </td>
                                    <td style={{ "textAlign": "left" }}>
                                        <Combobox disable={true} type_code='DSM' keyInput="Color" value={PrimaryStone || Color ? Color : '001'} id={IdProductParent + ColorParent + IdStone + '/' + IdStone} parentObject={this} />
                                    </td>
                                    <td style={{ "textAlign": "left" }}>
                                        <Combobox disable={false} type_code='TYPE_STONE' keyInput="TypeStone" value={TypeStone ? TypeStone : 'TYPE_STONE_1'} id={SplitIdProductColorParentColorStone} parentObject={this} />
                                    </td>
                                    <Cell type="text" width="100px" value={Weight || ''} keyInput="value" id={SplitIdProductColorParentColorStone} parentObject={this} />
                                    <td >
                                        {Exchange}
                                    </td>
                                    <td style={{ "textAlign": "left" }}>
                                        {sl2 == 0 ? '' : Helper.round(AvgStone, 4)}
                                    </td>
                                    <td onClick={() => this._onRemove(item)}><button><i className="fa fa-trash-o" aria-hidden="true"></i></button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = ({
    userAuth,
    i18n,
    order,
    header,
    bag
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        order,
        header,
        bag
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...userActions,
        ...bagActions,
        ...toolbarActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListStoneSplit)
