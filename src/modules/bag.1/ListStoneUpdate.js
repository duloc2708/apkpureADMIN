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
import Modal from 'react-modal';
import FormSplitStoneUpdate from './FormSplitStoneUpdate';
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};
Modal.setAppElement('#yourAppElement')
class ListStoneUpdate extends React.Component {
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
    onKeyPressInput(obj) {
        let { typeInput, index, id, tabIndex, idTable } = obj
        $(`#${idTable} > tbody  > tr`).each(function (i, item) {
            if (i == index + 1) {
                $(item).find('input:text')[0].focus()
            }
        });
    }
    handleClick() {

    }
    ChangeValueCell(value) {
        this.props.updateCellStone(value)
    }
    ChangeValueCombobox(obj) {
        if (obj.key == 'TypeStone') {
            this.props.updateTypeStoneByStone(obj)
        } else {
            this.props.updateIdProductColor(obj)
        }

    }

    closeModal() {
        this.props.showStoneSplit(false)
    }
    split(item) {
        // if (item.remain > 0) {
        //     this.props.updateItemStoneSplit(item)
        // } else {
        //     this.child._addNotification('Vui lòng nhập số lượng!', 'warning')
        // }
        this.props.updateItemStoneSplit(item)

    }
    _checkClickRow(item, checkval) {
        let { listItemCreateBag } = this.props.bag
        let check = checkval//true
        listItemCreateBag.map((item) => {
            if (parseInt(item.Value) > 0) {
                // check = false
                return
            }
        })
        this.props.updatePrimaryStone(item, checkval)
    }
    render() {
        let { idTable } = this.props
        let { list_stone_save, itemDetailCreateBag, isShowSplitStone } = this.props.bag
        let IdProduct_temp = itemDetailCreateBag.IdOdd == "1" ? itemDetailCreateBag.IdChildrenProduct : itemDetailCreateBag.IdProduct
        list_stone_save = list_stone_save.filter((item) => item.IdProduct == IdProduct_temp && item.ColorParent == itemDetailCreateBag.Color)
        return (
            <div>
                <AlertCustom onRef={ref => (this.child = ref)} />
                <Modal
                    isOpen={isShowSplitStone}
                    // onAfterOpen={() => this.afterOpenModal()}
                    // onRequestClose={() => this.closeModal()}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <FormSplitStoneUpdate />
                    <hr />
                    <div style={{ "textAlign": "right" }}>
                        {/* <button style={{ "marignLeft": "10px", "marignRight": "10px" }} onClick={() => this.saveStone()}>Lưu</button> */}
                        <button onClick={() => this.closeModal()}>Lưu và Đóng</button>
                    </div>
                </Modal>
                <table className="table table-striped" id={idTable}>
                    <thead>
                        <tr>
                            <th style={{ "textAlign": "left" }} key={`thead_${1}`} scope="col">{'Số lượng'}</th>
                            <th style={{ "textAlign": "left" }} key={`thead_${9}`} scope="col">{'Sl đá/pc'}</th>
                            <th style={{ "textAlign": "left" }} key={`thead_${10}`} scope="col">{'Đá handset'}</th>
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
                        {list_stone_save.map((item, i) => {
                            let { IdStone, Color, numofstone, value, Weight, PrimaryStone, IdProduct, IdProductColorStone, IdProductColorParentColorStone, ColorParent, IdProductParent, sl2, exchange, TypeStone, AvgStone, IdProductParentIdProductStoneColor, sl } = item
                            AvgStone = Weight / sl2
                            return (
                                <tr key={`dataDetail_${i}`}>
                                    <td style={{ "textAlign": "left", "fontWeight": PrimaryStone == 1 ? 'bold' : '' }}>
                                        {sl2 || 0}
                                    </td>
                                    <td style={{ "textAlign": "left", "fontWeight": PrimaryStone == 1 ? 'bold' : '' }}>
                                        {sl || ''}
                                    </td>
                                    <td><input
                                        checked={PrimaryStone ? true : false} onChange={() => this._checkClickRow(item, !PrimaryStone)}
                                        type="checkbox" checked={PrimaryStone == 1 ? true : false} /></td>
                                    <td style={{ "textAlign": "left", "fontWeight": PrimaryStone == 1 ? 'bold' : '' }}>
                                        {IdStone}
                                    </td>
                                    <td style={{ "textAlign": "left" }}>
                                        <Combobox disable={true} type_code='DSM' keyInput="Color" value={PrimaryStone || Color ? Color : '001'} id={IdProductParent + ColorParent + IdStone + '/' + IdStone} parentObject={this} />
                                    </td>
                                    <td style={{ "textAlign": "left" }}>
                                        <Combobox disable={false} type_code='TYPE_STONE' keyInput="TypeStone" value={TypeStone ? TypeStone : 'TYPE_STONE_1'} id={IdProductColorParentColorStone} parentObject={this} />
                                    </td>
                                    <Cell idTable={idTable} index={i} type="text" width="100px" value={Weight || ''} keyInput="value" id={itemDetailCreateBag.IdOdd == "1" ? IdProductParentIdProductStoneColor : IdProductColorStone} parentObject={this} />
                                    <td >
                                        {exchange}
                                    </td>
                                    <td style={{ "textAlign": "left" }}>
                                        {sl2 == 0 ? 0 : Helper.round(AvgStone, 4)}
                                    </td>
                                    <td >
                                        {PrimaryStone !== 1 ?
                                            <button onClick={() => this.split(item)}><i className="fa fa-columns" aria-hidden="true"></i></button>
                                            : ''
                                        }
                                    </td>
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
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListStoneUpdate)
