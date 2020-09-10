import * as transferActions from 'modules/transfer/actions/form'
import * as modalActions from 'modules/modal/actions/form'
import * as dimmerActions from 'modules/dimmer/actions/form'
const { Translate, I18n } = ReactReduxI18n;
import {STATUS_TRANS_04, STATUS_TRANS_02} from './Constant'

class ListGoldCook extends React.Component {
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
    onKeyPressInput(){

    }
    ChangeValueCell(obj) {
        this.props.updateCellInput(obj)
    }
    handleClick(){
      console.log('handleClick>>')
    }
    _onChangeValueLV(e) {
      let { objSearchGold } = this.props.transfer;
      let objSearchGoldTemp = _.clone(objSearchGold, true);
      objSearchGoldTemp["valueLV"] = e.target.value;
      this.props.updateInputSearch(objSearchGoldTemp)
    }
    render() {
        let {listHeaderGoldCook, listGoldCook,objSearchGold } = this.props.transfer
        let {
          TransType,
          Status,
          TypeGoldWarm,
          TotalWeightAfterWarm
        } = this.props.transfer.objData;
        let totalTF_Weight10 = 0;
        let totalWeightAfterCook = 0;

        let listGoldCookTemp=listGoldCook;
        let blockInput = [STATUS_TRANS_04,STATUS_TRANS_02].indexOf(Status)!=-1? true : false;

        if (objSearchGold.valueLV) {
            listGoldCookTemp = listGoldCookTemp.filter(x=>x.ValueLV.toString().indexOf(objSearchGold.valueLV)!==-1 )
        }
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
                                listHeaderGoldCook.map((item, i) => {
                                    let { key, title } = item;
                                    return (
                                        <th style={{"textAlign":"left"}} key={`thead_${key}`} scope="col">{title}</th>
                                    )
                                })

                            }
                        </tr>
                    </thead>
                    <tbody>
                        {listGoldCookTemp && listGoldCookTemp.map((item, i) => {
                            let {
                                IdStore,
                                ValueLV,
                                TF_Weight,
                                TF_Weight_Hold,
                                totalGoldCook,
                                totalGoldCook10,
                                Gold_Lost,
                                checked
                              } = item;
                            totalTF_Weight10=totalTF_Weight10+totalGoldCook10;
                            let calTotalGoldCook =TotalWeightAfterWarm?Helper.round(ValueLV*TotalWeightAfterWarm/totalGoldCook,4):0;
                            totalWeightAfterCook=totalWeightAfterCook+calTotalGoldCook
                            return (
                                <tr key={`data_${i}`}>
                                    <td><input checked={checked} type="checkbox" onChange={()=>this.props.changeStatusInput(IdStore,checked)}/></td>
                                    <td>{IdStore}</td>
                                    <td>{ValueLV}</td>
                                    <td>{Helper.round(totalGoldCook,4)}</td>
                                    <td>{Helper.round(totalGoldCook10,4)}</td>
                                    <td>{calTotalGoldCook}</td>
                                    <td>{Helper.round(TF_Weight_Hold,4)}</td>
                                    <td>{Helper.round(Gold_Lost || 0,4)}</td>
                                </tr>)
                        })}
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td><b>Tổng TL vàng quy 10</b></td>
                          <td>{Helper.round(totalTF_Weight10,4)}</td>
                          <td><b>Tổng TL vàng sau nấu:</b> {Helper.round(totalWeightAfterCook,4)}</td>
                        </tr>
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
export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ListGoldCook)
