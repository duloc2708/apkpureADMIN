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
        let {listHeaderGoldCook, listGoldCook } = this.props.transfer
        let {
          TransType,
          Status,
          TypeGoldWarm
        } = this.props.transfer.objData;
        let totalTF_Weight10 = 0;
        let listGoldCookTemp=listGoldCook;
        let blockInput = [STATUS_TRANS_04,STATUS_TRANS_02].indexOf(Status)!=-1? true : false;

        return (
            <div>
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
                                totalGoldCook10
                              } = item;
                            totalTF_Weight10=totalTF_Weight10+totalGoldCook10;
                            return (
                                <tr key={`data_${i}`}>
                                    <td>{IdStore}</td>
                                    <td>{ValueLV}</td>
                                    <td>{Helper.round(totalGoldCook,4)}</td>
                                    <td>{Helper.round(totalGoldCook10,4)}</td>
                                    <td>{Helper.round(TF_Weight_Hold,4)}</td>
                                </tr>)
                        })}
                        <tr>
                          <td></td>
                          <td></td>
                          <td><b>Tổng TL vàng quy 10</b></td>
                          <td>{Helper.round(totalTF_Weight10,4)}</td>
                          <td></td>
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
