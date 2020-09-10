import * as transferActions from 'modules/transfer/actions/form'
import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
const { Translate, I18n } = ReactReduxI18n;
import { STATUS_TRANS_04, STATUS_TRANS_02 } from './Constant'

class ListGold extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        // this._loadData()
    }
    _loadData() {
        // this.props.getListBagByOrder()
    }

    _onView() {

        // $(".dropdown2").show(500)

    }
    onKeyPressInput() {

    }
    ChangeValueCell(obj) {
        this.props.updateCellInput(obj)
    }
    handleClick() {
        console.log('handleClick>>')
    }
    _onChangeValueLV(e) {
        let { objSearchGold } = this.props.transfer;
        let objSearchGoldTemp = _.clone(objSearchGold, true);
        objSearchGoldTemp["valueLV"] = e.target.value;
        this.props.updateInputSearch(objSearchGoldTemp)
    }
    render() {
        let { listHeaderGold, list_data_gold, objSearchGold } = this.props.transfer
        let {
            TransType,
            Status,
            TypeGoldWarm
        } = this.props.transfer.objData;
        let totalWeightFrom10 = 0;
        let totalTF_Weight10 = 0;
        let totalWeightAfterWarmParse = 0;
        let list_data_goldTemp = list_data_gold;
        if (objSearchGold.valueLV) {
            list_data_goldTemp = list_data_goldTemp.filter(x => x.ValueLV_From.toString().indexOf(objSearchGold.valueLV) !==-1 )
        }
        let blockInput = [STATUS_TRANS_04, STATUS_TRANS_02].indexOf(Status) != -1 ? true : false;

        return (
            <div>
                <div className="row">
                    <div className="col-md-3">
                        <input
                            readOnly={blockInput}
                            onChange={e => this._onChangeValueLV(e)}
                            placeholder="Tìm kiếm ..."
                            className="name form-control"
                            type="text"
                            value={objSearchGold.valueLV}
                            id="valueLV"
                            name="valueLV"
                        />
                    </div>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            {
                                listHeaderGold.map((item, i) => {
                                    let { key, title } = item;
                                    if (key == 'COLUMN3' && TransType == 'TF_TYPE_01') {
                                        return '';
                                    }
                                    return (
                                        <th style={{ "textAlign": "left" }} key={`thead_${key}`} scope="col">{title}</th>
                                    )
                                })

                            }
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td><b>Tổng TL vàng quy 10</b></td>
                            <td>{Helper.round(totalWeightFrom10, 4)}</td>
                            {TransType == 'TF_TYPE_01' ? '' :
                                <td>{Helper.round(totalWeightAfterWarmParse, 4)}</td>}
                            <td><b>Tổng TL tồn kho 10</b></td>
                            <td>{Helper.round(totalTF_Weight10, 4)}</td>
                            <td></td>
                        </tr>
                        {list_data_goldTemp && list_data_goldTemp.map((item, i) => {
                            let {
                                IdTransferdetail,
                                keyMap,
                                ValueLV_From,
                                ValueLV_To,
                                TF_Weight_From,
                                TF_Weight_To,
                                Status,
                                TF_Weight,
                                TF_Weight10,
                                TF_Weight_Hold,
                                indexCell,
                                Gold_Lost
                            } = item;
                            const TF_Weight_From10 = TF_Weight_From && TF_Weight_From * ValueLV_From / 100 || '';
                            totalWeightFrom10 = totalWeightFrom10 + (TF_Weight_From10 || 0);
                            totalTF_Weight10 = totalTF_Weight10 + (TF_Weight10 || 0);
                            totalWeightAfterWarmParse = totalWeightAfterWarmParse + (TF_Weight_To || 0);
                            return (
                                <tr key={`data_${i}`}>
                                    <td>{ValueLV_From}</td>
                                    <Cell readOnly={blockInput} width="100px" id={i} value={TF_Weight_From} keyInput="TF_Weight_From" parentObject={this} />
                                    <td>{Helper.round(TF_Weight_From10 || 0, 4)}</td>
                                    {TransType == 'TF_TYPE_02' ? <td>{Helper.round(TF_Weight_To || 0, 4)}</td> : ''}
                                    <td>{Helper.round(Gold_Lost || 0, 4)}</td>
                                    <td>{Helper.round(TF_Weight || 0, 4)}</td>
                                    <td>{Helper.round(TF_Weight10 || 0, 4)}</td>
                                    <td>{Helper.round(TF_Weight_Hold || 0, 4)}</td>
                                </tr>)
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
    transfer
}, ownProps) => {
    return {
        userAuth,
        i18n,
        ownProps,
        transfer
    }
}
const mapDispatchToProps = (dispatch) => {
    return Redux.bindActionCreators({
        ...ReactRouterRedux.routerActions,
        ...transferActions
    }, dispatch)
}
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListGold)
